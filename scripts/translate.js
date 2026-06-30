/**
 * ============================================================
 *  AI-Powered i18n Translation Generator
 *
 *  Reads the Chinese (zh) dictionary from i18n.js and uses
 *  Anthropic Claude to auto-translate into any target language.
 *
 *  Usage:
 *    node scripts/translate.js ja     # Generate Japanese translations
 *    node scripts/translate.js ko     # Generate Korean translations
 *    node scripts/translate.js fr     # Generate French translations
 *    node scripts/translate.js all    # Generate all missing languages
 * ============================================================
 */
'use strict';

const fs = require('fs');
const path = require('path');
const https = require('https');

// ===== Config =====
const I18N_PATH = path.join(__dirname, '..', 'js', 'i18n.js');
const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY || process.env.LLM_API_KEY;
// Default target languages when "all" is specified
const ALL_LANGUAGES = ['ja', 'ko', 'fr', 'de', 'es'];

// ===== 1. Extract Chinese dictionary from i18n.js =====
function extractChineseDict() {
    const content = fs.readFileSync(I18N_PATH, 'utf-8');

    // Find the zh: { ... } block — everything between the first /* Nav */ and the next top-level key
    const zhMatch = content.match(/zh:\s*\{([\s\S]*?)\n\s{8}\/\\\* en/);
    if (!zhMatch) {
        console.error('Could not extract Chinese dictionary. Check i18n.js format.');
        process.exit(1);
    }

    const zhBlock = zhMatch[1];
    const dict = {};

    // Extract all key-value pairs
    // Matches: 'key': 'value', or "key": "value",
    const re = /['"]([\w.]+)['"]\s*:\s*['"]([^'"]*)['"]/g;
    let match;
    while ((match = re.exec(zhBlock)) !== null) {
        dict[match[1]] = match[2];
    }

    return dict;
}

// ===== 2. Call Anthropic API for batch translation =====
function callAnthropic(prompt, langName) {
    return new Promise((resolve, reject) => {
        const data = JSON.stringify({
            model: 'claude-sonnet-4-20250514',
            max_tokens: 4000,
            temperature: 0.3,
            system: `You are a professional translator. Translate the given Chinese text into ${langName}.
Key rules:
1. Preserve ALL HTML tags exactly as-is (e.g., <br/>, <span class="...">, <strong>)
2. Preserve emojis and special characters (🔥, ✅, →, etc.)
3. Keep the same meaning but make it sound natural in ${langName}
4. For technical terms (AI, MVP, API, PRD, Demo Day), keep the English term
5. Output ONLY a JSON object with the same keys — no explanation, no markdown`,
            messages: [{
                role: 'user',
                content: `Translate the following Chinese key-value pairs into ${langName}.
Return a valid JSON object with the same keys but ${langName} values.
Preserve all HTML tags exactly as they are.

Chinese dictionary:
${JSON.stringify(prompt, null, 2)}`
            }]
        });

        const options = {
            hostname: 'api.anthropic.com',
            path: '/v1/messages',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': ANTHROPIC_API_KEY,
                'anthropic-version': '2023-06-01'
            }
        };

        const req = https.request(options, (res) => {
            let body = '';
            res.on('data', chunk => body += chunk);
            res.on('end', () => {
                try {
                    const parsed = JSON.parse(body);
                    const text = parsed.content?.[0]?.text || '';
                    // Extract JSON from response (it may have markdown fences)
                    const jsonMatch = text.match(/\{[\s\S]*\}/);
                    if (jsonMatch) {
                        resolve(JSON.parse(jsonMatch[0]));
                    } else {
                        reject(new Error('No JSON found in response: ' + text.slice(0, 200)));
                    }
                } catch (e) {
                    reject(new Error(`Parse error: ${e.message}\nBody: ${body.slice(0, 300)}`));
                }
            });
        });

        req.on('error', reject);
        req.write(data);
        req.end();
    });
}

// ===== 3. Inject translated dict back into i18n.js =====
function injectTranslation(langCode, translatedDict) {
    let content = fs.readFileSync(I18N_PATH, 'utf-8');

    // Build the translation block
    const keys = Object.keys(translatedDict);
    const indent = '            ';
    let block = `        ${langCode}: {\n`;
    block += `${indent}/* Auto-generated via translate.js */\n`;

    // Add meta keys first
    const metaKeys = keys.filter(k => k.startsWith('meta.'));
    metaKeys.forEach(key => {
        block += `${indent}'${key}': '${escapeValue(translatedDict[key])}',\n`;
    });

    // Group by section
    const sections = {};
    keys.forEach(key => {
        if (key.startsWith('meta.')) return;
        const section = key.split('.')[0];
        if (!sections[section]) sections[section] = [];
        sections[section].push(key);
    });

    Object.keys(sections).forEach(section => {
        block += `\n${indent}/* ${section} */\n`;
        sections[section].forEach(key => {
            block += `${indent}'${key}': '${escapeValue(translatedDict[key])}',\n`;
        });
    });

    block += '        },';

    // Insert before the closing '};' of LANG
    const insertPoint = content.lastIndexOf('};');
    if (insertPoint === -1) {
        console.error('Could not find insertion point in i18n.js');
        process.exit(1);
    }

    // Find the last language block and insert after it
    const langEnd = content.lastIndexOf('        },');
    if (langEnd === -1) {
        console.error('Could not find language block end');
        process.exit(1);
    }

    content = content.slice(0, langEnd + 10) + '\n' + block + '\n' + content.slice(langEnd + 10);

    fs.writeFileSync(I18N_PATH, content, 'utf-8');
    console.log(`✅ Injected ${Object.keys(translatedDict).length} translations for '${langCode}' into ${I18N_PATH}`);
}

function escapeValue(val) {
    return val
        .replace(/\\/g, '\\\\')
        .replace(/'/g, "\\'")
        .replace(/\n/g, '\\n');
}

// ===== 4. Language name map =====
const LANG_NAMES = {
    ja: 'Japanese',
    ko: 'Korean',
    fr: 'French',
    de: 'German',
    es: 'Spanish',
    pt: 'Portuguese',
    vi: 'Vietnamese',
    th: 'Thai',
    ru: 'Russian',
    ar: 'Arabic',
    hi: 'Hindi',
};

// ===== Main =====
async function main() {
    const targetLang = process.argv[2] || 'ja';

    if (!ANTHROPIC_API_KEY) {
        console.error('❌ Please set ANTHROPIC_API_KEY environment variable');
        console.error('   export ANTHROPIC_API_KEY=sk-ant-...');
        process.exit(1);
    }

    const languages = targetLang === 'all' ? ALL_LANGUAGES : [targetLang];

    console.log('📖 Extracting Chinese dictionary...');
    const zhDict = extractChineseDict();
    console.log(`   Found ${Object.keys(zhDict).length} translation keys\n`);

    for (const lang of languages) {
        const langName = LANG_NAMES[lang] || lang;
        console.log(`🌐 Translating into ${langName} (${lang})...`);

        try {
            const translated = await callAnthropic(zhDict, langName);
            const keyCount = Object.keys(translated).length;
            console.log(`   Received ${keyCount} translations`);

            // Check for missing keys
            const missing = Object.keys(zhDict).filter(k => !translated[k]);
            if (missing.length > 0) {
                console.warn(`   ⚠️  Missing ${missing.length} keys, filling with Chinese source`);
                missing.forEach(k => { translated[k] = zhDict[k]; });
            }

            injectTranslation(lang, translated);
            console.log(`   ✅ ${langName} complete!`);
        } catch (e) {
            console.error(`   ❌ Failed: ${e.message}`);
        }
    }

    console.log('\n🎉 Done! Run `node scripts/translate.js ja` again to update.');
}

main();

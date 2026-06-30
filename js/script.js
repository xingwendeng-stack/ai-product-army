/**
 * ============================================================
 *  Entry Point — AI产品军团实战
 *
 *  Load order: agent-core → agents → app → UI init
 * ============================================================
 */
'use strict';

document.addEventListener('DOMContentLoaded', () => {

    // ===== 0. Initialize i18n (before any UI rendering) =====
    if (window.I18n) {
        window.I18n.init();
        // Re-apply i18n on dynamic content changes
        document.addEventListener('i18n:changed', () => {
            // Re-trigger agent status update so dynamic labels refresh
            const statusEl = document.querySelector('.agent-status-text');
            if (statusEl && window.I18n) {
                const state = statusEl.dataset.state || 'idle';
                statusEl.textContent = window.I18n.t('agent.status_' + state);
            }
        });
    }

    // ===== 1. Original UI Interactions (unchanged) =====

    // Navbar Scroll
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', window.pageYOffset > 60);
    }, { passive: true });

    // Mobile Hamburger
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('open');
        });
    }
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('open');
        });
    });

    // Animated Counters
    const counters = document.querySelectorAll('.stat-number');
    const animateCounter = (el) => {
        const target = parseInt(el.getAttribute('data-target'));
        const steps = 60;
        let current = 0, step = 0;
        const timer = setInterval(() => {
            step++;
            current = Math.min(current + target / steps, target);
            el.textContent = Math.round(current);
            if (step >= steps || current >= target) {
                el.textContent = target;
                clearInterval(timer);
            }
        }, 2000 / steps);
    };
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    counters.forEach(c => counterObserver.observe(c));

    // FAQ Accordion
    document.querySelectorAll('.faq-question').forEach(btn => {
        btn.addEventListener('click', () => {
            const item = btn.parentElement;
            const isActive = item.classList.contains('active');
            document.querySelectorAll('.faq-item').forEach(f => f.classList.remove('active'));
            if (!isActive) item.classList.add('active');
        });
    });

    // Back to Top
    const backToTop = document.getElementById('backToTop');
    if (backToTop) {
        window.addEventListener('scroll', () => {
            backToTop.classList.toggle('visible', window.pageYOffset > 500);
        }, { passive: true });
        backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
    }

    // Smooth Scroll for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            const targetId = anchor.getAttribute('href');
            if (targetId === '#') return;
            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                const navHeight = navbar.offsetHeight;
                window.scrollTo({
                    top: target.getBoundingClientRect().top + window.pageYOffset - navHeight,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Testimonial Auto-Scroll
    const track = document.querySelector('.testimonial-track');
    if (track) {
        let scrollPos = 0;
        track.querySelectorAll('.testimonial-card').forEach(c => track.appendChild(c.cloneNode(true)));
        const maxScroll = (track.scrollWidth / 2) - track.parentElement.offsetWidth;
        let interval = setInterval(() => {
            scrollPos = scrollPos >= maxScroll ? 0 : scrollPos + 1;
            track.style.transform = `translateX(-${scrollPos}px)`;
        }, 30);
        const slider = document.getElementById('testimonialSlider');
        slider.addEventListener('mouseenter', () => clearInterval(interval));
        slider.addEventListener('mouseleave', () => {
            interval = setInterval(() => {
                scrollPos = scrollPos >= maxScroll ? 0 : scrollPos + 1;
                track.style.transform = `translateX(-${scrollPos}px)`;
            }, 30);
        });
    }

    // Scroll Reveal Animations
    const revealEls = document.querySelectorAll(
        '.mission-card, .problem-card, .roadmap-item, .module-card, ' +
        '.feature-card, .showcase-card, .pricing-card, .testimonial-card, ' +
        '.faq-item, .section-header'
    );
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
    revealEls.forEach((el, i) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = `opacity 0.6s ease-out, transform 0.6s ease-out`;
        el.style.transitionDelay = `${(i % 6) * 0.08}s`;
        revealObserver.observe(el);
    });

    // Parallax Glow
    const heroGlow = document.querySelector('.hero-glow');
    if (heroGlow) {
        document.querySelector('.hero').addEventListener('mousemove', (e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            heroGlow.style.transform = `translate(${((e.clientX - rect.left) / rect.width - 0.5) * 40}px, ${((e.clientY - rect.top) / rect.height - 0.5) * 40}px)`;
        });
    }

    // ===== 2. Agent-Native Runtime Initialization =====
    // Load order: agent-core.js → agents.js → app.js
    // (Script loading in HTML ensures this order)

    if (window.AgentCore && window.AGENT_DEFINITIONS) {
        // Small delay to ensure DOM is fully ready
        setTimeout(() => {
            if (window.AgentApp) {
                window.AgentApp.init();
                console.log('✅ Agent-Native runtime started');
            } else {
                console.warn('⚠️ AgentApp not loaded, retrying...');
                // Fallback: try again
                const check = setInterval(() => {
                    if (window.AgentApp) {
                        window.AgentApp.init();
                        clearInterval(check);
                    }
                }, 100);
                setTimeout(() => clearInterval(check), 5000);
            }
        }, 100);
    } else {
        console.warn('⚠️ AgentCore or AGENT_DEFINITIONS not found');
        console.log('Agent core:', !!window.AgentCore, 'Defs:', !!window.AGENT_DEFINITIONS);
    }

    console.log('🔥 AI产品军团实战 · Agent-Native 版已加载');
});

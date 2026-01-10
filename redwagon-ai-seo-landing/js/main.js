/**
 * RedWagon AI SEO Landing Page JavaScript
 * High-conversion interactions and form handling
 * 
 * @package RedWagon_AI_SEO_Landing
 * @version 1.0.0
 */

(function() {
    'use strict';

    // DOM Ready
    document.addEventListener('DOMContentLoaded', function() {
        initializeApp();
    });

    /**
     * Initialize all app functionality
     */
    function initializeApp() {
        initFormHandlers();
        initScrollEffects();
        initFAQAccordion();
        initCountdownTimer();
        initAnalytics();
        initLazyLoading();
        initSmoothScrolling();
        initFormValidation();
        initExitIntent();
    }

    /**
     * Form Submission Handlers
     */
    function initFormHandlers() {
        const forms = document.querySelectorAll('.audit-form');
        
        forms.forEach(form => {
            form.addEventListener('submit', handleFormSubmission);
        });
    }

    /**
     * Handle form submission with AJAX
     */
    function handleFormSubmission(e) {
        e.preventDefault();
        
        const form = e.target;
        const submitButton = form.querySelector('.cta-button');
        const websiteUrl = form.querySelector('input[name="website_url"]').value;
        const email = form.querySelector('input[name="email"]')?.value || '';
        
        // Validate URL
        if (!isValidURL(websiteUrl)) {
            showError(form, 'Please enter a valid website URL (e.g., https://example.com)');
            return;
        }
        
        // Show loading state
        setLoadingState(submitButton, true);
        
        // Track form submission
        trackEvent('form_submit', {
            form_location: getFormLocation(form),
            website_url: websiteUrl
        });
        
        // Simulate AI audit process
        simulateAuditProcess(form, websiteUrl, email);
    }

    /**
     * Simulate AI audit process with progress
     */
    function simulateAuditProcess(form, websiteUrl, email) {
        const submitButton = form.querySelector('.cta-button');
        const progressSteps = [
            'Analyzing website structure...',
            'Checking page speed...',
            'Scanning for SEO issues...',
            'Analyzing competitors...',
            'Generating recommendations...',
            'Finalizing your report...'
        ];
        
        let currentStep = 0;
        
        const progressInterval = setInterval(() => {
            if (currentStep < progressSteps.length) {
                submitButton.innerHTML = progressSteps[currentStep];
                currentStep++;
            } else {
                clearInterval(progressInterval);
                completeAuditProcess(form, websiteUrl, email);
            }
        }, 800);
    }

    /**
     * Complete audit process and redirect
     */
    function completeAuditProcess(form, websiteUrl, email) {
        const submitButton = form.querySelector('.cta-button');
        
        // Send data to server
        const formData = new FormData();
        formData.append('action', 'audit_request');
        formData.append('website_url', websiteUrl);
        formData.append('email', email);
        formData.append('nonce', redwagon_ajax.nonce);
        
        fetch(redwagon_ajax.ajax_url, {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                // Track conversion
                trackEvent('audit_completed', {
                    website_url: websiteUrl,
                    email: email
                });
                
                // Show success message
                submitButton.innerHTML = '✓ Audit Complete! Redirecting...';
                submitButton.style.background = '#27ca3f';
                
                // Redirect to results page
                setTimeout(() => {
                    window.location.href = `/audit-results/?url=${encodeURIComponent(websiteUrl)}`;
                }, 1500);
            } else {
                showError(form, data.data || 'Something went wrong. Please try again.');
                setLoadingState(submitButton, false);
            }
        })
        .catch(error => {
            console.error('Error:', error);
            showError(form, 'Network error. Please check your connection and try again.');
            setLoadingState(submitButton, false);
        });
    }

    /**
     * Form validation
     */
    function initFormValidation() {
        const inputs = document.querySelectorAll('.form-input');
        
        inputs.forEach(input => {
            input.addEventListener('blur', validateInput);
            input.addEventListener('input', clearErrors);
        });
    }

    function validateInput(e) {
        const input = e.target;
        const value = input.value.trim();
        
        if (input.type === 'url') {
            if (value && !isValidURL(value)) {
                showInputError(input, 'Please enter a valid URL (e.g., https://example.com)');
            }
        } else if (input.type === 'email') {
            if (value && !isValidEmail(value)) {
                showInputError(input, 'Please enter a valid email address');
            }
        }
    }

    function clearErrors(e) {
        const input = e.target;
        clearInputError(input);
    }

    /**
     * Scroll effects and animations
     */
    function initScrollEffects() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, observerOptions);
        
        // Observe elements for animation
        const animateElements = document.querySelectorAll(
            '.problem-item, .feature-item, .testimonial-item, .faq-item'
        );
        
        animateElements.forEach(el => {
            observer.observe(el);
        });
        
        // Sticky CTA on scroll
        initStickyCTA();
    }

    /**
     * Sticky CTA that appears on scroll
     */
    function initStickyCTA() {
        const stickyCTA = createStickyCTA();
        let isVisible = false;
        
        window.addEventListener('scroll', () => {
            const scrollPercent = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
            
            if (scrollPercent > 25 && !isVisible) {
                stickyCTA.classList.add('visible');
                isVisible = true;
            } else if (scrollPercent <= 25 && isVisible) {
                stickyCTA.classList.remove('visible');
                isVisible = false;
            }
        });
    }

    function createStickyCTA() {
        const stickyCTA = document.createElement('div');
        stickyCTA.className = 'sticky-cta';
        stickyCTA.innerHTML = `
            <div class="sticky-cta-content">
                <span class="sticky-cta-text">Get Your FREE AI SEO Audit</span>
                <button class="cta-button primary" onclick="scrollToForm()">Start Now</button>
            </div>
        `;
        
        // Add CSS
        const style = document.createElement('style');
        style.textContent = `
            .sticky-cta {
                position: fixed;
                bottom: 0;
                left: 0;
                right: 0;
                background: linear-gradient(45deg, #ff6b6b, #ee5a24);
                color: white;
                padding: 1rem;
                transform: translateY(100%);
                transition: transform 0.3s ease;
                z-index: 1000;
                box-shadow: 0 -4px 20px rgba(0,0,0,0.1);
            }
            .sticky-cta.visible {
                transform: translateY(0);
            }
            .sticky-cta-content {
                display: flex;
                align-items: center;
                justify-content: space-between;
                max-width: 1200px;
                margin: 0 auto;
            }
            .sticky-cta-text {
                font-weight: 700;
                font-size: 1.1rem;
            }
            @media (max-width: 768px) {
                .sticky-cta-content {
                    flex-direction: column;
                    gap: 1rem;
                    text-align: center;
                }
            }
        `;
        
        document.head.appendChild(style);
        document.body.appendChild(stickyCTA);
        
        return stickyCTA;
    }

    /**
     * FAQ Accordion functionality
     */
    function initFAQAccordion() {
        const faqItems = document.querySelectorAll('.faq-item');
        
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            
            question.addEventListener('click', () => {
                const isActive = item.classList.contains('active');
                
                // Close all other items
                faqItems.forEach(otherItem => {
                    otherItem.classList.remove('active');
                });
                
                // Toggle current item
                if (!isActive) {
                    item.classList.add('active');
                }
                
                // Track FAQ interaction
                trackEvent('faq_click', {
                    question: question.textContent
                });
            });
        });
    }

    /**
     * Countdown timer for urgency
     */
    function initCountdownTimer() {
        const countdownElement = document.getElementById('countdown-days');
        if (!countdownElement) return;
        
        // Set countdown to 7 days from now
        const endDate = new Date();
        endDate.setDate(endDate.getDate() + 7);
        
        function updateCountdown() {
            const now = new Date().getTime();
            const distance = endDate.getTime() - now;
            
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            
            if (days > 0) {
                countdownElement.textContent = days;
            } else if (hours > 0) {
                countdownElement.textContent = hours + ' hours';
            } else {
                countdownElement.textContent = 'few hours';
            }
        }
        
        updateCountdown();
        setInterval(updateCountdown, 3600000); // Update every hour
    }

    /**
     * Analytics and tracking
     */
    function initAnalytics() {
        // Track page view
        trackEvent('page_view', {
            page: 'landing_page',
            timestamp: new Date().toISOString()
        });
        
        // Track scroll depth
        trackScrollDepth();
        
        // Track time on page
        trackTimeOnPage();
    }

    function trackScrollDepth() {
        const scrollDepths = [25, 50, 75, 90];
        const tracked = new Set();
        
        window.addEventListener('scroll', () => {
            const scrollPercent = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
            
            scrollDepths.forEach(depth => {
                if (scrollPercent >= depth && !tracked.has(depth)) {
                    tracked.add(depth);
                    trackEvent('scroll_depth', { depth: depth });
                }
            });
        });
    }

    function trackTimeOnPage() {
        const startTime = Date.now();
        
        // Track time milestones
        const milestones = [30, 60, 120, 300]; // seconds
        const tracked = new Set();
        
        setInterval(() => {
            const timeOnPage = Math.floor((Date.now() - startTime) / 1000);
            
            milestones.forEach(milestone => {
                if (timeOnPage >= milestone && !tracked.has(milestone)) {
                    tracked.add(milestone);
                    trackEvent('time_on_page', { seconds: milestone });
                }
            });
        }, 10000);
    }

    /**
     * Lazy loading for images
     */
    function initLazyLoading() {
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.classList.remove('lazy');
                        imageObserver.unobserve(img);
                    }
                });
            });
            
            document.querySelectorAll('img[data-src]').forEach(img => {
                imageObserver.observe(img);
            });
        }
    }

    /**
     * Smooth scrolling for anchor links
     */
    function initSmoothScrolling() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    /**
     * Exit intent popup
     */
    function initExitIntent() {
        let exitIntentShown = false;
        
        document.addEventListener('mouseleave', (e) => {
            if (e.clientY <= 0 && !exitIntentShown) {
                showExitIntentPopup();
                exitIntentShown = true;
            }
        });
    }

    function showExitIntentPopup() {
        const popup = document.createElement('div');
        popup.className = 'exit-intent-popup';
        popup.innerHTML = `
            <div class="popup-overlay">
                <div class="popup-content">
                    <button class="popup-close">&times;</button>
                    <h3>Wait! Don't Miss Your FREE AI SEO Audit</h3>
                    <p>Get instant insights that could increase your traffic by 40%</p>
                    <form class="audit-form popup-form">
                        <input type="url" name="website_url" placeholder="Enter your website URL" required>
                        <button type="submit" class="cta-button primary">Get My Free Audit</button>
                    </form>
                </div>
            </div>
        `;
        
        // Add popup styles
        const style = document.createElement('style');
        style.textContent = `
            .exit-intent-popup {
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                z-index: 10000;
                animation: fadeIn 0.3s ease;
            }
            .popup-overlay {
                background: rgba(0,0,0,0.8);
                width: 100%;
                height: 100%;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            .popup-content {
                background: white;
                padding: 2rem;
                border-radius: 12px;
                max-width: 500px;
                width: 90%;
                text-align: center;
                position: relative;
            }
            .popup-close {
                position: absolute;
                top: 1rem;
                right: 1rem;
                background: none;
                border: none;
                font-size: 1.5rem;
                cursor: pointer;
            }
            .popup-form {
                margin-top: 1rem;
            }
            .popup-form input {
                width: 100%;
                margin-bottom: 1rem;
            }
            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
        `;
        
        document.head.appendChild(style);
        document.body.appendChild(popup);
        
        // Handle popup close
        popup.querySelector('.popup-close').addEventListener('click', () => {
            popup.remove();
        });
        
        popup.querySelector('.popup-overlay').addEventListener('click', (e) => {
            if (e.target === e.currentTarget) {
                popup.remove();
            }
        });
        
        // Handle popup form
        popup.querySelector('.audit-form').addEventListener('submit', handleFormSubmission);
        
        // Track exit intent
        trackEvent('exit_intent_shown');
    }

    /**
     * Utility Functions
     */
    function isValidURL(string) {
        try {
            const url = new URL(string);
            return url.protocol === 'http:' || url.protocol === 'https:';
        } catch (_) {
            return false;
        }
    }

    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function setLoadingState(button, loading) {
        if (loading) {
            button.disabled = true;
            button.style.opacity = '0.7';
            button.style.cursor = 'not-allowed';
        } else {
            button.disabled = false;
            button.style.opacity = '1';
            button.style.cursor = 'pointer';
            button.innerHTML = button.getAttribute('data-original-text') || 'Get My FREE AI Audit';
        }
    }

    function showError(form, message) {
        let errorDiv = form.querySelector('.form-error');
        if (!errorDiv) {
            errorDiv = document.createElement('div');
            errorDiv.className = 'form-error';
            form.appendChild(errorDiv);
        }
        
        errorDiv.textContent = message;
        errorDiv.style.cssText = `
            color: #e74c3c;
            background: rgba(231, 76, 60, 0.1);
            padding: 1rem;
            border-radius: 6px;
            margin-top: 1rem;
            border: 1px solid rgba(231, 76, 60, 0.3);
        `;
        
        setTimeout(() => {
            errorDiv.remove();
        }, 5000);
    }

    function showInputError(input, message) {
        input.style.borderColor = '#e74c3c';
        
        let errorSpan = input.parentNode.querySelector('.input-error');
        if (!errorSpan) {
            errorSpan = document.createElement('span');
            errorSpan.className = 'input-error';
            input.parentNode.appendChild(errorSpan);
        }
        
        errorSpan.textContent = message;
        errorSpan.style.cssText = `
            color: #e74c3c;
            font-size: 0.9rem;
            margin-top: 0.5rem;
            display: block;
        `;
    }

    function clearInputError(input) {
        input.style.borderColor = '';
        const errorSpan = input.parentNode.querySelector('.input-error');
        if (errorSpan) {
            errorSpan.remove();
        }
    }

    function getFormLocation(form) {
        if (form.closest('#hero')) return 'hero';
        if (form.closest('#offer')) return 'offer';
        if (form.closest('#final-cta')) return 'final-cta';
        if (form.closest('.exit-intent-popup')) return 'exit-intent';
        return 'unknown';
    }

    function trackEvent(eventName, parameters = {}) {
        // Google Analytics 4
        if (typeof gtag !== 'undefined') {
            gtag('event', eventName, parameters);
        }
        
        // Facebook Pixel
        if (typeof fbq !== 'undefined') {
            fbq('track', eventName, parameters);
        }
        
        // Console log for debugging
        console.log('Event tracked:', eventName, parameters);
    }

    /**
     * Global functions
     */
    window.scrollToForm = function() {
        const firstForm = document.querySelector('.audit-form');
        if (firstForm) {
            firstForm.scrollIntoView({ behavior: 'smooth', block: 'center' });
            firstForm.querySelector('input[name="website_url"]').focus();
        }
    };

    // Add CSS animations
    const animationStyles = document.createElement('style');
    animationStyles.textContent = `
        .animate-in {
            animation: slideInUp 0.6s ease forwards;
        }
        
        @keyframes slideInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .problem-item,
        .feature-item,
        .testimonial-item,
        .faq-item {
            opacity: 0;
            transform: translateY(30px);
            transition: all 0.6s ease;
        }
    `;
    
    document.head.appendChild(animationStyles);

})();
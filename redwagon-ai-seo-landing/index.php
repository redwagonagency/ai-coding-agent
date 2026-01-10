<?php
/**
 * RedWagon.agency AI SEO Audit Landing Page
 * High-conversion WordPress landing page template
 * 
 * @package RedWagon_AI_SEO_Landing
 * @version 1.0.0
 */

get_header(); ?>

<main id="main-content" class="landing-page">
    
    <!-- Hero Section -->
    <section class="hero-section" id="hero">
        <div class="container">
            <div class="hero-content">
                <div class="hero-text">
                    <h1 class="hero-headline">
                        Get Your <span class="highlight">FREE AI-Powered SEO Audit</span> 
                        & Discover Hidden Revenue Opportunities
                    </h1>
                    <p class="hero-subheadline">
                        Our advanced AI analyzes 200+ SEO factors in minutes to uncover exactly 
                        what's blocking your website from ranking #1 on Google. Get actionable 
                        insights that drive real results.
                    </p>
                    
                    <!-- Primary CTA -->
                    <div class="cta-container">
                        <form class="audit-form" id="hero-form">
                            <div class="form-group">
                                <input type="url" 
                                       id="website-url" 
                                       name="website_url" 
                                       placeholder="Enter your website URL" 
                                       required 
                                       class="form-input">
                                <button type="submit" class="cta-button primary">
                                    Get My FREE AI Audit
                                    <span class="cta-arrow">→</span>
                                </button>
                            </div>
                            <p class="form-disclaimer">
                                ✓ No credit card required • ✓ Results in 60 seconds • ✓ 100% Free
                            </p>
                        </form>
                    </div>
                    
                    <!-- Trust Indicators -->
                    <div class="trust-indicators">
                        <div class="trust-item">
                            <span class="trust-number">10,000+</span>
                            <span class="trust-text">Websites Audited</span>
                        </div>
                        <div class="trust-item">
                            <span class="trust-number">4.9/5</span>
                            <span class="trust-text">Client Rating</span>
                        </div>
                        <div class="trust-item">
                            <span class="trust-number">24hrs</span>
                            <span class="trust-text">Average Response</span>
                        </div>
                    </div>
                </div>
                
                <div class="hero-visual">
                    <div class="audit-preview">
                        <div class="preview-header">
                            <div class="preview-dots">
                                <span></span><span></span><span></span>
                            </div>
                            <span class="preview-title">AI SEO Audit Report</span>
                        </div>
                        <div class="preview-content">
                            <div class="audit-score">
                                <div class="score-circle">
                                    <span class="score-number">73</span>
                                    <span class="score-label">SEO Score</span>
                                </div>
                            </div>
                            <div class="audit-items">
                                <div class="audit-item critical">
                                    <span class="item-icon">⚠️</span>
                                    <span class="item-text">5 Critical Issues Found</span>
                                </div>
                                <div class="audit-item warning">
                                    <span class="item-icon">⚡</span>
                                    <span class="item-text">12 Quick Wins Identified</span>
                                </div>
                                <div class="audit-item success">
                                    <span class="item-icon">✅</span>
                                    <span class="item-text">23 Optimizations Complete</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Problem/Solution Section -->
    <section class="problem-solution-section" id="problem">
        <div class="container">
            <div class="section-header">
                <h2>Is Your Website Invisible to Your Ideal Customers?</h2>
                <p class="section-subtitle">
                    Most businesses lose thousands in revenue because their websites have hidden SEO issues
                </p>
            </div>
            
            <div class="problems-grid">
                <div class="problem-item">
                    <div class="problem-icon">📉</div>
                    <h3>Dropping Rankings</h3>
                    <p>Your competitors are outranking you for keywords that should be yours</p>
                </div>
                <div class="problem-item">
                    <div class="problem-icon">🐌</div>
                    <h3>Slow Loading Speed</h3>
                    <p>Page speed issues are costing you visitors and search rankings</p>
                </div>
                <div class="problem-item">
                    <div class="problem-icon">📱</div>
                    <h3>Mobile Issues</h3>
                    <p>Mobile optimization problems are hurting your Google rankings</p>
                </div>
                <div class="problem-item">
                    <div class="problem-icon">🔍</div>
                    <h3>Technical SEO Gaps</h3>
                    <p>Hidden technical issues are preventing search engines from finding you</p>
                </div>
            </div>
            
            <div class="solution-content">
                <h3 class="solution-headline">Our AI-Powered Solution Finds & Fixes These Issues Automatically</h3>
                <p class="solution-text">
                    RedWagon.agency's proprietary AI technology scans your entire website in minutes, 
                    identifying exactly what's holding back your SEO performance and providing a 
                    step-by-step roadmap to fix it.
                </p>
                
                <div class="cta-secondary">
                    <button class="cta-button secondary" onclick="scrollToForm()">
                        Start My Free AI Audit Now
                    </button>
                </div>
            </div>
        </div>
    </section>

    <!-- Features Section -->
    <section class="features-section" id="features">
        <div class="container">
            <div class="section-header">
                <h2>What's Included in Your FREE AI SEO Audit</h2>
                <p class="section-subtitle">
                    Get a comprehensive analysis worth $500 - completely free
                </p>
            </div>
            
            <div class="features-grid">
                <div class="feature-item">
                    <div class="feature-icon">🤖</div>
                    <h3>AI-Powered Analysis</h3>
                    <p>Advanced algorithms analyze 200+ SEO factors in real-time</p>
                    <ul class="feature-list">
                        <li>Technical SEO audit</li>
                        <li>Content optimization</li>
                        <li>Competitor analysis</li>
                    </ul>
                </div>
                
                <div class="feature-item">
                    <div class="feature-icon">⚡</div>
                    <h3>Instant Results</h3>
                    <p>Get your comprehensive audit report in under 60 seconds</p>
                    <ul class="feature-list">
                        <li>Real-time scanning</li>
                        <li>Immediate insights</li>
                        <li>Priority recommendations</li>
                    </ul>
                </div>
                
                <div class="feature-item">
                    <div class="feature-icon">📊</div>
                    <h3>Actionable Insights</h3>
                    <p>Clear, step-by-step recommendations you can implement today</p>
                    <ul class="feature-list">
                        <li>Priority-ranked issues</li>
                        <li>Implementation guides</li>
                        <li>ROI projections</li>
                    </ul>
                </div>
                
                <div class="feature-item">
                    <div class="feature-icon">🎯</div>
                    <h3>Competitor Intelligence</h3>
                    <p>See exactly what your competitors are doing to outrank you</p>
                    <ul class="feature-list">
                        <li>Keyword gap analysis</li>
                        <li>Backlink opportunities</li>
                        <li>Content strategies</li>
                    </ul>
                </div>
            </div>
        </div>
    </section>

    <!-- Social Proof Section -->
    <section class="social-proof-section" id="testimonials">
        <div class="container">
            <div class="section-header">
                <h2>Join 10,000+ Businesses Growing with RedWagon.agency</h2>
            </div>
            
            <div class="testimonials-grid">
                <div class="testimonial-item">
                    <div class="testimonial-content">
                        <div class="stars">★★★★★</div>
                        <p>"The AI audit found issues our previous agency missed for months. 
                        We saw a 40% increase in organic traffic within 8 weeks!"</p>
                    </div>
                    <div class="testimonial-author">
                        <div class="author-info">
                            <strong>Sarah Chen</strong>
                            <span>CEO, TechStart Solutions</span>
                        </div>
                    </div>
                </div>
                
                <div class="testimonial-item">
                    <div class="testimonial-content">
                        <div class="stars">★★★★★</div>
                        <p>"Finally, an SEO audit that actually makes sense! The recommendations 
                        were clear and we could implement them immediately."</p>
                    </div>
                    <div class="testimonial-author">
                        <div class="author-info">
                            <strong>Mike Rodriguez</strong>
                            <span>Marketing Director, GrowthCorp</span>
                        </div>
                    </div>
                </div>
                
                <div class="testimonial-item">
                    <div class="testimonial-content">
                        <div class="stars">★★★★★</div>
                        <p>"The AI found technical issues that were costing us thousands in lost 
                        revenue. ROI was immediate after implementing their fixes."</p>
                    </div>
                    <div class="testimonial-author">
                        <div class="author-info">
                            <strong>Jennifer Walsh</strong>
                            <span>Founder, Digital Dynamics</span>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- Company Logos -->
            <div class="company-logos">
                <p class="logos-text">Trusted by leading companies:</p>
                <div class="logos-grid">
                    <div class="logo-item">TechStart</div>
                    <div class="logo-item">GrowthCorp</div>
                    <div class="logo-item">Digital Dynamics</div>
                    <div class="logo-item">InnovateCo</div>
                    <div class="logo-item">ScaleUp Inc</div>
                </div>
            </div>
        </div>
    </section>

    <!-- Urgency/Scarcity Section -->
    <section class="urgency-section" id="offer">
        <div class="container">
            <div class="urgency-content">
                <div class="urgency-badge">⏰ Limited Time Offer</div>
                <h2>Get Your FREE $500 AI SEO Audit Today</h2>
                <p class="urgency-text">
                    We're offering our premium AI SEO audit (normally $500) completely FREE 
                    for the next <span id="countdown-days">7</span> days. Don't miss out on 
                    discovering what's costing you traffic and revenue.
                </p>
                
                <div class="offer-features">
                    <div class="offer-item">
                        <span class="checkmark">✓</span>
                        <span>Complete 200+ point SEO analysis</span>
                    </div>
                    <div class="offer-item">
                        <span class="checkmark">✓</span>
                        <span>Competitor intelligence report</span>
                    </div>
                    <div class="offer-item">
                        <span class="checkmark">✓</span>
                        <span>Priority-ranked action plan</span>
                    </div>
                    <div class="offer-item">
                        <span class="checkmark">✓</span>
                        <span>15-minute strategy call (optional)</span>
                    </div>
                </div>
                
                <!-- CTA Form -->
                <div class="cta-container">
                    <form class="audit-form" id="offer-form">
                        <div class="form-group">
                            <input type="url" 
                                   name="website_url" 
                                   placeholder="Enter your website URL" 
                                   required 
                                   class="form-input">
                            <input type="email" 
                                   name="email" 
                                   placeholder="Your email address" 
                                   required 
                                   class="form-input">
                            <button type="submit" class="cta-button primary large">
                                Claim My FREE $500 Audit
                            </button>
                        </div>
                        <p class="form-disclaimer">
                            ✓ Instant access • ✓ No spam ever • ✓ Unsubscribe anytime
                        </p>
                    </form>
                </div>
            </div>
        </div>
    </section>

    <!-- FAQ Section -->
    <section class="faq-section" id="faq">
        <div class="container">
            <div class="section-header">
                <h2>Frequently Asked Questions</h2>
            </div>
            
            <div class="faq-grid">
                <div class="faq-item">
                    <h3 class="faq-question">How long does the AI audit take?</h3>
                    <div class="faq-answer">
                        <p>Our AI technology analyzes your website in under 60 seconds. You'll receive 
                        your comprehensive report immediately after entering your website URL.</p>
                    </div>
                </div>
                
                <div class="faq-item">
                    <h3 class="faq-question">Is this really free?</h3>
                    <div class="faq-answer">
                        <p>Yes! This is our premium AI SEO audit (normally $500) offered completely free. 
                        No credit card required, no hidden fees, no strings attached.</p>
                    </div>
                </div>
                
                <div class="faq-item">
                    <h3 class="faq-question">What makes your AI different?</h3>
                    <div class="faq-answer">
                        <p>Our proprietary AI analyzes 200+ SEO factors including technical issues, 
                        content optimization, competitor analysis, and provides actionable recommendations 
                        ranked by priority and potential impact.</p>
                    </div>
                </div>
                
                <div class="faq-item">
                    <h3 class="faq-question">Do I need technical knowledge to understand the report?</h3>
                    <div class="faq-answer">
                        <p>Not at all! Our reports are designed for business owners and marketers. 
                        Each recommendation includes clear explanations and step-by-step implementation guides.</p>
                    </div>
                </div>
                
                <div class="faq-item">
                    <h3 class="faq-question">What happens after I get my audit?</h3>
                    <div class="faq-answer">
                        <p>You'll receive your detailed report instantly. Optionally, you can book a 
                        15-minute strategy call with our SEO experts to discuss your results and next steps.</p>
                    </div>
                </div>
                
                <div class="faq-item">
                    <h3 class="faq-question">Can you help implement the recommendations?</h3>
                    <div class="faq-answer">
                        <p>Absolutely! While the audit is free, we offer done-for-you SEO services 
                        to implement the recommendations and drive results for your business.</p>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Final CTA Section -->
    <section class="final-cta-section" id="final-cta">
        <div class="container">
            <div class="final-cta-content">
                <h2>Ready to Unlock Your Website's Hidden Potential?</h2>
                <p class="final-cta-text">
                    Don't let another day pass with SEO issues costing you traffic and revenue. 
                    Get your FREE AI-powered audit now and start seeing results within days.
                </p>
                
                <div class="final-stats">
                    <div class="stat-item">
                        <span class="stat-number">10,000+</span>
                        <span class="stat-label">Websites Improved</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-number">40%</span>
                        <span class="stat-label">Average Traffic Increase</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-number">60 sec</span>
                        <span class="stat-label">Audit Completion Time</span>
                    </div>
                </div>
                
                <!-- Final CTA Form -->
                <div class="cta-container">
                    <form class="audit-form" id="final-form">
                        <div class="form-group">
                            <input type="url" 
                                   name="website_url" 
                                   placeholder="Enter your website URL" 
                                   required 
                                   class="form-input">
                            <button type="submit" class="cta-button primary extra-large">
                                Get My FREE AI Audit Now
                                <span class="cta-arrow">→</span>
                            </button>
                        </div>
                        <p class="form-disclaimer">
                            Join 10,000+ businesses already growing with RedWagon.agency
                        </p>
                    </form>
                </div>
            </div>
        </div>
    </section>

</main>

<?php get_footer(); ?>

<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "AI SEO Audit",
  "provider": {
    "@type": "Organization",
    "name": "RedWagon.agency",
    "url": "https://redwagon.agency"
  },
  "description": "Free AI-powered SEO audit that analyzes 200+ factors to improve website rankings",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD",
    "availability": "https://schema.org/InStock"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "reviewCount": "1247"
  }
}
</script>
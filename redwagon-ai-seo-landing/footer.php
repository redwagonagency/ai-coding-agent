<!-- Footer Section -->
<footer class="footer-section" id="footer">
    <div class="container">
        <div class="footer-content">
            <div class="footer-main">
                <div class="footer-brand">
                    <h3>RedWagon.agency</h3>
                    <p>AI-powered SEO audits and digital marketing solutions that drive real results for your business.</p>
                </div>
                
                <div class="footer-links">
                    <div class="footer-column">
                        <h4>Services</h4>
                        <ul>
                            <li><a href="#" rel="noopener">AI SEO Audits</a></li>
                            <li><a href="#" rel="noopener">SEO Optimization</a></li>
                            <li><a href="#" rel="noopener">Content Marketing</a></li>
                            <li><a href="#" rel="noopener">PPC Management</a></li>
                        </ul>
                    </div>
                    
                    <div class="footer-column">
                        <h4>Company</h4>
                        <ul>
                            <li><a href="#" rel="noopener">About Us</a></li>
                            <li><a href="#" rel="noopener">Case Studies</a></li>
                            <li><a href="#" rel="noopener">Blog</a></li>
                            <li><a href="#" rel="noopener">Contact</a></li>
                        </ul>
                    </div>
                    
                    <div class="footer-column">
                        <h4>Legal</h4>
                        <ul>
                            <li><a href="#" rel="noopener">Privacy Policy</a></li>
                            <li><a href="#" rel="noopener">Terms of Service</a></li>
                            <li><a href="#" rel="noopener">Cookie Policy</a></li>
                            <li><a href="#" rel="noopener">GDPR</a></li>
                        </ul>
                    </div>
                    
                    <div class="footer-column">
                        <h4>Connect</h4>
                        <ul class="social-links">
                            <li><a href="#" rel="noopener" aria-label="LinkedIn">LinkedIn</a></li>
                            <li><a href="#" rel="noopener" aria-label="Twitter">Twitter</a></li>
                            <li><a href="#" rel="noopener" aria-label="Facebook">Facebook</a></li>
                            <li><a href="mailto:hello@redwagon.agency" aria-label="Email">Email</a></li>
                        </ul>
                    </div>
                </div>
            </div>
            
            <div class="footer-bottom">
                <div class="footer-bottom-content">
                    <p>&copy; <?php echo date('Y'); ?> RedWagon.agency. All rights reserved.</p>
                    <div class="footer-badges">
                        <span class="badge">🔒 SSL Secured</span>
                        <span class="badge">⚡ Fast Loading</span>
                        <span class="badge">📱 Mobile Optimized</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</footer>

<!-- Back to Top Button -->
<button id="back-to-top" class="back-to-top" aria-label="Back to top">
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M7 14L12 9L17 14" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
</button>

<style>
/* Footer Styles */
.footer-section {
    background: #2c3e50;
    color: white;
    padding: 3rem 0 1rem;
    margin-top: 4rem;
}

.footer-content {
    max-width: 1200px;
    margin: 0 auto;
}

.footer-main {
    display: grid;
    grid-template-columns: 1fr 2fr;
    gap: 3rem;
    margin-bottom: 2rem;
}

.footer-brand h3 {
    color: #ffd700;
    margin-bottom: 1rem;
    font-size: 1.5rem;
}

.footer-brand p {
    opacity: 0.8;
    line-height: 1.6;
}

.footer-links {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 2rem;
}

.footer-column h4 {
    color: #ffd700;
    margin-bottom: 1rem;
    font-size: 1.1rem;
}

.footer-column ul {
    list-style: none;
}

.footer-column li {
    margin-bottom: 0.5rem;
}

.footer-column a {
    color: rgba(255, 255, 255, 0.8);
    text-decoration: none;
    transition: color 0.3s ease;
}

.footer-column a:hover {
    color: #ffd700;
}

.footer-bottom {
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    padding-top: 2rem;
}

.footer-bottom-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 1rem;
}

.footer-badges {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
}

.badge {
    background: rgba(255, 255, 255, 0.1);
    padding: 0.25rem 0.75rem;
    border-radius: 20px;
    font-size: 0.85rem;
    border: 1px solid rgba(255, 255, 255, 0.2);
}

/* Back to Top Button */
.back-to-top {
    position: fixed;
    bottom: 2rem;
    right: 2rem;
    width: 50px;
    height: 50px;
    background: linear-gradient(45deg, #ff6b6b, #ee5a24);
    color: white;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    z-index: 1000;
    box-shadow: 0 4px 15px rgba(255, 107, 107, 0.4);
}

.back-to-top.visible {
    opacity: 1;
    visibility: visible;
}

.back-to-top:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 25px rgba(255, 107, 107, 0.6);
}

/* Responsive Footer */
@media (max-width: 768px) {
    .footer-main {
        grid-template-columns: 1fr;
        gap: 2rem;
    }
    
    .footer-links {
        grid-template-columns: repeat(2, 1fr);
        gap: 1.5rem;
    }
    
    .footer-bottom-content {
        flex-direction: column;
        text-align: center;
    }
    
    .footer-badges {
        justify-content: center;
    }
    
    .back-to-top {
        bottom: 1rem;
        right: 1rem;
        width: 45px;
        height: 45px;
    }
}

@media (max-width: 480px) {
    .footer-links {
        grid-template-columns: 1fr;
        gap: 1rem;
    }
    
    .footer-section {
        padding: 2rem 0 1rem;
    }
}
</style>

<script>
// Back to Top Button Functionality
document.addEventListener('DOMContentLoaded', function() {
    const backToTopButton = document.getElementById('back-to-top');
    
    // Show/hide button based on scroll position
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
    });
    
    // Smooth scroll to top
    backToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        
        // Track back to top click
        if (typeof gtag !== 'undefined') {
            gtag('event', 'back_to_top_click');
        }
    });
});

// Footer link tracking
document.querySelectorAll('.footer-column a').forEach(link => {
    link.addEventListener('click', function(e) {
        if (typeof gtag !== 'undefined') {
            gtag('event', 'footer_link_click', {
                'link_text': this.textContent,
                'link_url': this.href
            });
        }
    });
});
</script>

<?php wp_footer(); ?>

<!-- Schema Markup for Organization -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "RedWagon.agency",
  "url": "<?php echo home_url(); ?>",
  "logo": "<?php echo get_template_directory_uri(); ?>/images/logo.png",
  "description": "AI-powered SEO audits and digital marketing solutions",
  "address": {
    "@type": "PostalAddress",
    "addressCountry": "US"
  },
  "contactPoint": {
    "@type": "ContactPoint",
    "contactType": "customer service",
    "email": "hello@redwagon.agency",
    "availableLanguage": "English"
  },
  "sameAs": [
    "https://www.linkedin.com/company/redwagon-agency",
    "https://twitter.com/redwagonagency"
  ],
  "foundingDate": "2020",
  "numberOfEmployees": "10-50",
  "slogan": "AI-Powered Growth Marketing"
}
</script>

<!-- Service Schema -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "AI SEO Audit",
  "description": "Free comprehensive AI-powered SEO audit that analyzes 200+ factors to improve website performance and search rankings",
  "provider": {
    "@type": "Organization",
    "name": "RedWagon.agency"
  },
  "serviceType": "SEO Audit",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD",
    "availability": "https://schema.org/InStock",
    "validFrom": "<?php echo date('Y-m-d'); ?>",
    "description": "Free AI-powered SEO audit"
  },
  "areaServed": "Worldwide",
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "SEO Services",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Technical SEO Audit"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Content Optimization"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Competitor Analysis"
        }
      }
    ]
  }
}
</script>

</body>
</html>
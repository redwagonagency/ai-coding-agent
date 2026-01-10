<?php
/**
 * RedWagon AI SEO Landing Page Functions
 * 
 * @package RedWagon_AI_SEO_Landing
 * @version 1.0.0
 */

// Prevent direct access
if (!defined('ABSPATH')) {
    exit;
}

/**
 * Theme Setup
 */
function redwagon_theme_setup() {
    // Add theme support
    add_theme_support('html5', array(
        'search-form',
        'comment-form',
        'comment-list',
        'gallery',
        'caption',
    ));
    
    add_theme_support('title-tag');
    add_theme_support('post-thumbnails');
    
    // Remove unnecessary WordPress features for landing page
    remove_action('wp_head', 'wp_generator');
    remove_action('wp_head', 'wlwmanifest_link');
    remove_action('wp_head', 'rsd_link');
    remove_action('wp_head', 'wp_shortlink_wp_head');
    remove_action('wp_head', 'adjacent_posts_rel_link_wp_head');
    remove_action('wp_head', 'feed_links', 2);
    remove_action('wp_head', 'feed_links_extra', 3);
}
add_action('after_setup_theme', 'redwagon_theme_setup');

/**
 * Enqueue Scripts and Styles
 */
function redwagon_enqueue_assets() {
    // Enqueue main stylesheet
    wp_enqueue_style(
        'redwagon-style',
        get_stylesheet_uri(),
        array(),
        '1.0.0'
    );
    
    // Enqueue main JavaScript
    wp_enqueue_script(
        'redwagon-main',
        get_template_directory_uri() . '/js/main.js',
        array(),
        '1.0.0',
        true
    );
    
    // Localize script for AJAX
    wp_localize_script('redwagon-main', 'redwagon_ajax', array(
        'ajax_url' => admin_url('admin-ajax.php'),
        'nonce' => wp_create_nonce('redwagon_nonce'),
    ));
    
    // Preload critical resources
    echo '<link rel="preload" href="' . get_stylesheet_uri() . '" as="style">';
    echo '<link rel="preload" href="' . get_template_directory_uri() . '/js/main.js" as="script">';
}
add_action('wp_enqueue_scripts', 'redwagon_enqueue_assets');

/**
 * Add Critical CSS Inline
 */
function redwagon_critical_css() {
    ?>
    <style id="critical-css">
        /* Critical above-the-fold CSS */
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; }
        .hero-section { 
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 4rem 0 6rem;
            min-height: 100vh;
            display: flex;
            align-items: center;
        }
        .container { max-width: 1200px; margin: 0 auto; padding: 0 1rem; }
        .hero-content { display: grid; grid-template-columns: 1fr 1fr; gap: 3rem; align-items: center; }
        .hero-headline { font-size: clamp(2rem, 5vw, 3.5rem); font-weight: 800; margin-bottom: 1.5rem; }
        .highlight { color: #ffd700; }
        .cta-button { 
            padding: 1rem 2rem; 
            background: linear-gradient(45deg, #ff6b6b, #ee5a24);
            color: white;
            border: none;
            border-radius: 8px;
            font-weight: 700;
            cursor: pointer;
            transition: transform 0.3s ease;
        }
        .form-input { padding: 1rem 1.5rem; border-radius: 8px; border: 2px solid rgba(255,255,255,0.3); }
        @media (max-width: 768px) { 
            .hero-content { grid-template-columns: 1fr; text-align: center; }
        }
    </style>
    <?php
}
add_action('wp_head', 'redwagon_critical_css', 1);

/**
 * SEO Meta Tags
 */
function redwagon_seo_meta() {
    ?>
    <meta name="description" content="Get your FREE AI-powered SEO audit from RedWagon.agency. Discover hidden revenue opportunities and fix SEO issues in 60 seconds. 10,000+ websites improved.">
    <meta name="keywords" content="AI SEO audit, free SEO analysis, website optimization, RedWagon agency, SEO tools">
    <meta name="robots" content="index, follow">
    <meta name="author" content="RedWagon.agency">
    
    <!-- Open Graph -->
    <meta property="og:title" content="FREE AI SEO Audit - RedWagon.agency">
    <meta property="og:description" content="Get your FREE AI-powered SEO audit and discover hidden revenue opportunities. Results in 60 seconds.">
    <meta property="og:type" content="website">
    <meta property="og:url" content="<?php echo home_url(); ?>">
    <meta property="og:image" content="<?php echo get_template_directory_uri(); ?>/images/og-image.jpg">
    
    <!-- Twitter Card -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="FREE AI SEO Audit - RedWagon.agency">
    <meta name="twitter:description" content="Get your FREE AI-powered SEO audit and discover hidden revenue opportunities.">
    <meta name="twitter:image" content="<?php echo get_template_directory_uri(); ?>/images/twitter-card.jpg">
    
    <!-- Canonical URL -->
    <link rel="canonical" href="<?php echo home_url(); ?>">
    <?php
}
add_action('wp_head', 'redwagon_seo_meta');

/**
 * Performance Optimizations
 */
function redwagon_performance_optimizations() {
    // Remove query strings from static resources
    if (!is_admin()) {
        add_filter('script_loader_src', 'redwagon_remove_query_strings', 15, 1);
        add_filter('style_loader_src', 'redwagon_remove_query_strings', 15, 1);
    }
    
    // Disable emoji scripts
    remove_action('wp_head', 'print_emoji_detection_script', 7);
    remove_action('wp_print_styles', 'print_emoji_styles');
    
    // Remove WordPress version from RSS
    add_filter('the_generator', '__return_empty_string');
}
add_action('init', 'redwagon_performance_optimizations');

function redwagon_remove_query_strings($src) {
    $parts = explode('?ver', $src);
    return $parts[0];
}

/**
 * AJAX Handler for Form Submissions
 */
function redwagon_handle_audit_request() {
    // Verify nonce
    if (!wp_verify_nonce($_POST['nonce'], 'redwagon_nonce')) {
        wp_die('Security check failed');
    }
    
    $website_url = sanitize_url($_POST['website_url']);
    $email = sanitize_email($_POST['email']);
    
    // Validate inputs
    if (!filter_var($website_url, FILTER_VALIDATE_URL)) {
        wp_send_json_error('Please enter a valid website URL');
        return;
    }
    
    if ($email && !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        wp_send_json_error('Please enter a valid email address');
        return;
    }
    
    // Store lead data
    $lead_data = array(
        'website_url' => $website_url,
        'email' => $email,
        'timestamp' => current_time('mysql'),
        'ip_address' => $_SERVER['REMOTE_ADDR'],
        'user_agent' => $_SERVER['HTTP_USER_AGENT']
    );
    
    // Save to database or send to CRM
    redwagon_save_lead($lead_data);
    
    // Send response
    wp_send_json_success(array(
        'message' => 'Audit request received! Redirecting to your results...',
        'redirect_url' => home_url('/audit-results/?url=' . urlencode($website_url))
    ));
}
add_action('wp_ajax_audit_request', 'redwagon_handle_audit_request');
add_action('wp_ajax_nopriv_audit_request', 'redwagon_handle_audit_request');

/**
 * Save Lead Data
 */
function redwagon_save_lead($lead_data) {
    global $wpdb;
    
    $table_name = $wpdb->prefix . 'redwagon_leads';
    
    // Create table if it doesn't exist
    $charset_collate = $wpdb->get_charset_collate();
    $sql = "CREATE TABLE IF NOT EXISTS $table_name (
        id mediumint(9) NOT NULL AUTO_INCREMENT,
        website_url varchar(255) NOT NULL,
        email varchar(100),
        timestamp datetime DEFAULT CURRENT_TIMESTAMP,
        ip_address varchar(45),
        user_agent text,
        status varchar(20) DEFAULT 'new',
        PRIMARY KEY (id)
    ) $charset_collate;";
    
    require_once(ABSPATH . 'wp-admin/includes/upgrade.php');
    dbDelta($sql);
    
    // Insert lead data
    $wpdb->insert(
        $table_name,
        $lead_data,
        array('%s', '%s', '%s', '%s', '%s')
    );
    
    // Send notification email
    redwagon_send_lead_notification($lead_data);
}

/**
 * Send Lead Notification
 */
function redwagon_send_lead_notification($lead_data) {
    $to = get_option('admin_email');
    $subject = 'New AI SEO Audit Request';
    $message = "New audit request received:\n\n";
    $message .= "Website: " . $lead_data['website_url'] . "\n";
    $message .= "Email: " . ($lead_data['email'] ?: 'Not provided') . "\n";
    $message .= "Time: " . $lead_data['timestamp'] . "\n";
    $message .= "IP: " . $lead_data['ip_address'] . "\n";
    
    wp_mail($to, $subject, $message);
}

/**
 * Add Google Analytics / GTM
 */
function redwagon_tracking_codes() {
    ?>
    <!-- Google Tag Manager -->
    <script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
    'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
    })(window,document,'script','dataLayer','GTM-XXXXXXX');</script>
    <!-- End Google Tag Manager -->
    
    <!-- Facebook Pixel -->
    <script>
    !function(f,b,e,v,n,t,s)
    {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
    n.callMethod.apply(n,arguments):n.queue.push(arguments)};
    if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
    n.queue=[];t=b.createElement(e);t.async=!0;
    t.src=v;s=b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t,s)}(window, document,'script',
    'https://connect.facebook.net/en_US/fbevents.js');
    fbq('init', 'XXXXXXXXXXXXXXXXX');
    fbq('track', 'PageView');
    </script>
    <noscript><img height="1" width="1" style="display:none"
    src="https://www.facebook.com/tr?id=XXXXXXXXXXXXXXXXX&ev=PageView&noscript=1"
    /></noscript>
    <!-- End Facebook Pixel -->
    <?php
}
add_action('wp_head', 'redwagon_tracking_codes');

/**
 * Add GTM Body Code
 */
function redwagon_gtm_body() {
    ?>
    <!-- Google Tag Manager (noscript) -->
    <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-XXXXXXX"
    height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
    <!-- End Google Tag Manager (noscript) -->
    <?php
}
add_action('wp_body_open', 'redwagon_gtm_body');

/**
 * Custom Admin Menu for Leads
 */
function redwagon_admin_menu() {
    add_menu_page(
        'SEO Audit Leads',
        'Audit Leads',
        'manage_options',
        'redwagon-leads',
        'redwagon_leads_page',
        'dashicons-chart-line',
        30
    );
}
add_action('admin_menu', 'redwagon_admin_menu');

/**
 * Leads Admin Page
 */
function redwagon_leads_page() {
    global $wpdb;
    $table_name = $wpdb->prefix . 'redwagon_leads';
    $leads = $wpdb->get_results("SELECT * FROM $table_name ORDER BY timestamp DESC LIMIT 100");
    
    ?>
    <div class="wrap">
        <h1>SEO Audit Leads</h1>
        <table class="wp-list-table widefat fixed striped">
            <thead>
                <tr>
                    <th>Website URL</th>
                    <th>Email</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                <?php foreach ($leads as $lead): ?>
                <tr>
                    <td><a href="<?php echo esc_url($lead->website_url); ?>" target="_blank"><?php echo esc_html($lead->website_url); ?></a></td>
                    <td><?php echo esc_html($lead->email ?: 'N/A'); ?></td>
                    <td><?php echo esc_html($lead->timestamp); ?></td>
                    <td><?php echo esc_html($lead->status); ?></td>
                    <td>
                        <a href="mailto:<?php echo esc_attr($lead->email); ?>" class="button">Email</a>
                    </td>
                </tr>
                <?php endforeach; ?>
            </tbody>
        </table>
    </div>
    <?php
}

/**
 * Security Headers
 */
function redwagon_security_headers() {
    if (!is_admin()) {
        header('X-Content-Type-Options: nosniff');
        header('X-Frame-Options: SAMEORIGIN');
        header('X-XSS-Protection: 1; mode=block');
        header('Referrer-Policy: strict-origin-when-cross-origin');
    }
}
add_action('send_headers', 'redwagon_security_headers');

/**
 * Lazy Load Images
 */
function redwagon_lazy_load_images($content) {
    if (is_admin() || is_feed()) {
        return $content;
    }
    
    $content = preg_replace('/<img(.*?)src=/i', '<img$1loading="lazy" src=', $content);
    return $content;
}
add_filter('the_content', 'redwagon_lazy_load_images');

/**
 * Minify HTML Output
 */
function redwagon_minify_html($buffer) {
    if (is_admin() || wp_doing_ajax()) {
        return $buffer;
    }
    
    $buffer = preg_replace('/<!--(?!<!)[^\[>].*?-->/s', '', $buffer);
    $buffer = preg_replace('/\s+/', ' ', $buffer);
    $buffer = preg_replace('/>\s+</', '><', $buffer);
    
    return trim($buffer);
}

function redwagon_start_minify() {
    ob_start('redwagon_minify_html');
}

function redwagon_end_minify() {
    ob_end_flush();
}

add_action('wp_loaded', 'redwagon_start_minify');
add_action('shutdown', 'redwagon_end_minify');

/**
 * Custom Post Type for Testimonials (if needed)
 */
function redwagon_testimonials_post_type() {
    register_post_type('testimonial', array(
        'labels' => array(
            'name' => 'Testimonials',
            'singular_name' => 'Testimonial'
        ),
        'public' => false,
        'show_ui' => true,
        'supports' => array('title', 'editor', 'custom-fields'),
        'menu_icon' => 'dashicons-format-quote'
    ));
}
add_action('init', 'redwagon_testimonials_post_type');

/**
 * Disable XML-RPC for security
 */
add_filter('xmlrpc_enabled', '__return_false');

/**
 * Remove WordPress version from head
 */
remove_action('wp_head', 'wp_generator');

/**
 * Disable file editing in admin
 */
if (!defined('DISALLOW_FILE_EDIT')) {
    define('DISALLOW_FILE_EDIT', true);
}

/**
 * Custom 404 redirect to landing page
 */
function redwagon_404_redirect() {
    if (is_404()) {
        wp_redirect(home_url(), 301);
        exit;
    }
}
add_action('template_redirect', 'redwagon_404_redirect');

/**
 * Preload DNS for external resources
 */
function redwagon_dns_prefetch() {
    echo '<link rel="dns-prefetch" href="//fonts.googleapis.com">';
    echo '<link rel="dns-prefetch" href="//www.google-analytics.com">';
    echo '<link rel="dns-prefetch" href="//www.googletagmanager.com">';
    echo '<link rel="dns-prefetch" href="//connect.facebook.net">';
}
add_action('wp_head', 'redwagon_dns_prefetch', 1);

/**
 * Add structured data for better SEO
 */
function redwagon_structured_data() {
    $structured_data = array(
        '@context' => 'https://schema.org',
        '@type' => 'Organization',
        'name' => 'RedWagon.agency',
        'url' => home_url(),
        'logo' => get_template_directory_uri() . '/images/logo.png',
        'description' => 'AI-powered SEO audits and digital marketing services',
        'address' => array(
            '@type' => 'PostalAddress',
            'addressCountry' => 'US'
        ),
        'contactPoint' => array(
            '@type' => 'ContactPoint',
            'contactType' => 'customer service',
            'email' => 'hello@redwagon.agency'
        ),
        'sameAs' => array(
            'https://www.linkedin.com/company/redwagon-agency',
            'https://twitter.com/redwagonagency'
        )
    );
    
    echo '<script type="application/ld+json">' . json_encode($structured_data) . '</script>';
}
add_action('wp_head', 'redwagon_structured_data');

?>
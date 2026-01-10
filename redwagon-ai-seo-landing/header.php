<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo('charset'); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    
    <!-- Preload critical resources -->
    <link rel="preload" href="<?php echo get_stylesheet_uri(); ?>" as="style">
    <link rel="preload" href="<?php echo get_template_directory_uri(); ?>/js/main.js" as="script">
    
    <!-- DNS Prefetch -->
    <link rel="dns-prefetch" href="//fonts.googleapis.com">
    <link rel="dns-prefetch" href="//www.google-analytics.com">
    <link rel="dns-prefetch" href="//www.googletagmanager.com">
    
    <!-- Favicon -->
    <link rel="icon" type="image/x-icon" href="<?php echo get_template_directory_uri(); ?>/favicon.ico">
    <link rel="apple-touch-icon" sizes="180x180" href="<?php echo get_template_directory_uri(); ?>/apple-touch-icon.png">
    
    <?php wp_head(); ?>
</head>

<body <?php body_class('landing-page'); ?>>
<?php wp_body_open(); ?>

<!-- Skip to main content for accessibility -->
<a class="skip-link screen-reader-text" href="#main-content">Skip to main content</a>

<style>
.skip-link {
    position: absolute;
    left: -9999px;
    z-index: 999999;
    padding: 8px 16px;
    background: #000;
    color: #fff;
    text-decoration: none;
}

.skip-link:focus {
    left: 6px;
    top: 7px;
}

.screen-reader-text {
    clip: rect(1px, 1px, 1px, 1px);
    position: absolute !important;
    height: 1px;
    width: 1px;
    overflow: hidden;
}

.screen-reader-text:focus {
    background-color: #f1f1f1;
    border-radius: 3px;
    box-shadow: 0 0 2px 2px rgba(0, 0, 0, 0.6);
    clip: auto !important;
    color: #21759b;
    display: block;
    font-size: 14px;
    font-size: 0.875rem;
    font-weight: bold;
    height: auto;
    left: 5px;
    line-height: normal;
    padding: 15px 23px 14px;
    text-decoration: none;
    top: 5px;
    width: auto;
    z-index: 100000;
}
</style>
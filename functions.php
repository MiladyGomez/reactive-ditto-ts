<?php

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

/**
 * Theme Includes
 */
$wordpress_includes = array(
  '/wordpress_settings.php',      // Wordpress config.
  '/post-types.php',              // Register post types.
  '/taxonomies.php',              // Register taxonomies.
  '/endpoints.php',               // Register endpoints.
  '/recaptcha.php',               // reCAPTCHA v3 settings + endpoint.
);
foreach ( $wordpress_includes as $file ) {
  require_once __DIR__ . '/inc' . $file;
}


<?php
/**
 * SSR Fixed Footer — mirrors the React Footer component for crawlers.
 *
 * Reads fields directly from ACF options (same source as footer_handler() in
 * endpoints.php). The newsletter form is omitted — it requires JS and has no
 * SEO value in the static render.
 *
 * CUSTOMIZING
 * -----------
 * The ACF field name is 'footer_content' by default (matches footer_handler()).
 * Add fields below to match whatever src/components/Footer/Footer.tsx renders.
 * Update class names to match Footer.module.scss (format: Footer__ClassName).
 */

if ( ! defined( 'ABSPATH' ) ) { exit; }

$footer = function_exists( 'get_field' ) ? get_field( 'footer_content', 'options' ) : null;
if ( ! $footer ) return;
?>
<footer class="Footer__Container">
    <?php if ( $footer['logo'] ?? null ) : ?>
        <a href="<?php echo esc_url( home_url( '/' ) ); ?>" class="Footer__Logo">
            <img
                src="<?php echo esc_url( $footer['logo']['url'] ); ?>"
                alt="<?php echo esc_attr( $footer['logo']['alt'] ?? get_bloginfo( 'name' ) ); ?>"
            >
        </a>
    <?php endif; ?>

    <!-- Add more fields here to mirror the React Footer render -->
    <!-- Example fields: copyright text, nav links, social links, address, etc. -->
    <!-- Use esc_html() for plain text, esc_url() for links, wp_kses_post() for HTML -->
</footer>

<?php
/**
 * SSR Fixed Header — mirrors the React Header component for crawlers.
 *
 * Uses WordPress native functions (not the REST endpoint) so this renders
 * reliably even before the REST API boots. CSS class names are deterministic
 * because webpack uses localIdentName: "[name]__[local]" (no hash).
 *
 * Custom link detection: items of type 'custom' use $item->url directly —
 * get_post_field('post_name', 0) returns empty and produces a broken path.
 * This mirrors the same fix applied in main_menu_handler() in endpoints.php.
 *
 * CUSTOMIZING
 * -----------
 * Update the class names below to match the compiled CSS module names from
 * src/components/Header/Header.module.scss (format: Header__ClassName).
 * Add or remove markup to mirror the actual React render for SEO accuracy.
 */

if ( ! defined( 'ABSPATH' ) ) { exit; }

$logo_url       = has_custom_logo() ? wp_get_attachment_image_src( get_theme_mod( 'custom_logo' ), 'full' )[0] : null;
$menu_locations = get_nav_menu_locations();
$menu_items     = isset( $menu_locations['main_menu'] ) ? wp_get_nav_menu_items( $menu_locations['main_menu'] ) : [];
$frontpage_id   = (int) get_option( 'page_on_front' );
?>
<header class="Header__Container">
    <a href="<?php echo esc_url( home_url( '/' ) ); ?>" class="Header__Logo">
        <?php if ( $logo_url ) : ?>
            <img src="<?php echo esc_url( $logo_url ); ?>" alt="<?php echo esc_attr( get_bloginfo( 'name' ) ); ?>">
        <?php endif; ?>
    </a>
    <?php if ( ! empty( $menu_items ) ) : ?>
    <nav class="Header__Nav">
        <ul>
            <?php foreach ( $menu_items as $item ) :
                if ( $item->type === 'custom' ) {
                    // Custom links (e.g. /#anchor, https://external.com) — use URL directly
                    $path = wp_make_link_relative( $item->url );
                } else {
                    $path = ( $frontpage_id === (int) $item->object_id )
                        ? '/'
                        : '/' . get_post_field( 'post_name', $item->object_id );
                }
            ?>
                <li><a href="<?php echo esc_url( $path ); ?>"><?php echo esc_html( $item->title ); ?></a></li>
            <?php endforeach; ?>
        </ul>
    </nav>
    <?php endif; ?>
</header>

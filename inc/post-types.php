<?php
/**
 * Register post types
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}


function custom_post_type_collection() {
    /**
     * Example — uncomment and adapt to register a custom post type.
     *
     * register_post_type( 'my_post_type',
     *     array(
     *         'labels' => array(
     *             'name'          => __( 'My Post Types' ),
     *             'singular_name' => __( 'My Post Type' ),
     *         ),
     *         'public'             => true,
     *         'publicly_queryable' => true,   // false = not accessible via front-end URLs
     *         'has_archive'        => false,
     *         'show_in_rest'       => false,   // true = visible in Gutenberg / REST API
     *         'show_in_menu'       => true,
     *         'rewrite'            => array( 'slug' => 'my-post-type' ),
     *         'menu_icon'          => 'dashicons-admin-post', // https://developer.wordpress.org/resource/dashicons/
     *         'supports'           => array( 'title', 'thumbnail' ),
     *     )
     * );
     */
}
add_action( 'init', 'custom_post_type_collection' );

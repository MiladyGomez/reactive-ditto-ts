<?php
/**
 * Register taxonomies
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

function custom_taxonomy_collection() {
    /**
     * Example — uncomment and adapt to register a custom taxonomy.
     *
     * register_taxonomy( 'my_taxonomy', [ 'my_post_type' ], [
     *     'label'               => __( 'My Categories', 'custom-post-type-ui' ),
     *     'labels'              => [
     *         'name'          => __( 'My Categories', 'custom-post-type-ui' ),
     *         'singular_name' => __( 'My Category',   'custom-post-type-ui' ),
     *     ],
     *     'public'              => true,
     *     'publicly_queryable'  => true,
     *     'hierarchical'        => true,   // true = category-like, false = tag-like
     *     'show_ui'             => true,
     *     'show_in_menu'        => true,
     *     'show_in_nav_menus'   => true,
     *     'query_var'           => true,
     *     'rewrite'             => [ 'slug' => 'my-taxonomy', 'with_front' => false ],
     *     'show_admin_column'   => true,
     *     'show_in_rest'        => false,
     *     'show_in_quick_edit'  => true,
     * ] );
     */
}
add_action( 'init', 'custom_taxonomy_collection' );

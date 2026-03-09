<?php
/**
 * reCAPTCHA v3 — Admin settings + REST verification endpoint
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

/**
 * Register ACF Options sub-page for reCAPTCHA keys
 */
function ditto_recaptcha_menu() {
    if ( ! function_exists( 'acf_add_options_sub_page' ) ) {
        return;
    }
    acf_add_options_sub_page( array(
        'page_title'  => 'reCAPTCHA',
        'menu_title'  => 'reCAPTCHA',
        'parent_slug' => 'theme-settings',
    ) );
}
add_action( 'init', 'ditto_recaptcha_menu' );

/**
 * Register ACF field group for reCAPTCHA keys (programmatic, no JSON file needed)
 */
function ditto_recaptcha_fields() {
    if ( ! function_exists( 'acf_add_local_field_group' ) ) {
        return;
    }
    acf_add_local_field_group( array(
        'key'      => 'group_recaptcha_settings',
        'title'    => 'reCAPTCHA v3 Settings',
        'fields'   => array(
            array(
                'key'           => 'field_recaptcha_site_key',
                'label'         => 'Site Key (public)',
                'name'          => 'recaptcha_site_key',
                'type'          => 'text',
                'instructions'  => 'The public site key used to load the reCAPTCHA widget in the browser.',
                'required'      => 0,
            ),
            array(
                'key'           => 'field_recaptcha_secret_key',
                'label'         => 'Secret Key (private)',
                'name'          => 'recaptcha_secret_key',
                'type'          => 'text',
                'instructions'  => 'The private secret key used server-side to verify tokens. Never expose this to the browser.',
                'required'      => 0,
            ),
        ),
        'location' => array(
            array(
                array(
                    'param'    => 'options_page',
                    'operator' => '==',
                    'value'    => 'acf-options-recaptcha',
                ),
            ),
        ),
    ) );
}
add_action( 'acf/init', 'ditto_recaptcha_fields' );

/**
 * REST endpoint — POST /wp-json/recaptcha/v1/verify
 * Body: { "token": "<recaptcha_token>" }
 */
add_action( 'rest_api_init', function () {
    register_rest_route( 'recaptcha', '/v1/verify', array(
        array(
            'methods'             => WP_REST_Server::CREATABLE,
            'callback'            => 'recaptcha_verify_handler',
            'permission_callback' => '__return_true',
        ),
    ) );
} );

function recaptcha_verify_handler( WP_REST_Request $request ) {
    $params = $request->get_json_params();
    $token  = isset( $params['token'] ) ? sanitize_text_field( $params['token'] ) : '';

    if ( empty( $token ) ) {
        return new WP_Error( 'missing_token', 'reCAPTCHA token is required.', array( 'status' => 400 ) );
    }

    $secret = function_exists( 'get_field' )
        ? get_field( 'recaptcha_secret_key', 'options' )
        : '';

    if ( empty( $secret ) ) {
        return new WP_Error( 'missing_secret', 'reCAPTCHA secret key is not configured.', array( 'status' => 500 ) );
    }

    $response = wp_remote_post( 'https://www.google.com/recaptcha/api/siteverify', array(
        'body' => array(
            'secret'   => $secret,
            'response' => $token,
        ),
    ) );

    if ( is_wp_error( $response ) ) {
        return new WP_Error( 'recaptcha_error', $response->get_error_message(), array( 'status' => 500 ) );
    }

    $data = json_decode( wp_remote_retrieve_body( $response ), true );

    return new WP_REST_Response( $data, 200 );
}

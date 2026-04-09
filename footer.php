<?php
/**
 * 
 * Footer template.
 *
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}
$components = function_exists('get_field') ? get_field('ditto_components') : null;
set_query_var('components', $components);
?>
<!-- Instant branded loader — painted before any JS executes, gives FCP immediately -->
<div id="page-loader" style="position:fixed;inset:0;background-color:#000000;z-index:9999;pointer-events:none;" aria-hidden="true"></div>

<!-- React render — SSR content is visible for SEO and slow-JS scenarios -->
<div id="app">
	<div id="ssr-content">
		<?php get_template_part('ssr/fixed/Header'); ?>
		<main>
			<?php get_template_part('ssr/dynamicZone'); ?>
		</main>
		<?php get_template_part('ssr/fixed/Footer'); ?>
	</div>
</div>

<style>
	/* SSR content hidden — #page-loader handles FCP visually.
	   HTML is still in the source for SEO; React replaces the DOM. */
	#ssr-content {
		opacity: 0;
	}
</style>

<?php wp_footer(); ?>
</body>

</html>
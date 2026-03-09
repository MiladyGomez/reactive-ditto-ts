<?php
$components = get_query_var('components');

if ($components && is_array($components)):
    foreach ($components as $index => $component):
        $layout = $component['acf_fc_layout'] ?? null;
        if (!$layout) continue;

        // Whitelist: only allow alphanumeric characters and underscores.
        // This prevents path traversal (e.g. "../../wp-config") before the
        // value ever reaches the filesystem.
        if (!preg_match('/^[a-zA-Z0-9_]+$/', $layout)) continue;

        $template_path = get_template_directory() . "/ssr/components/{$layout}.php";
        if (file_exists($template_path)) {
            include $template_path;
        } else {
            // Suppress output in production; keep for local debugging only.
            if (defined('WP_DEBUG') && WP_DEBUG) {
                echo "<!-- SSR component not found: " . esc_html($layout) . " -->";
            }
        }
    endforeach;
endif;
?>

<?php
$components = get_query_var('components');

if ($components && is_array($components)):
    foreach ($components as $index => $component):
        $layout = $component['acf_fc_layout'] ?? null;
        if (!$layout) continue;
        $template_path = get_template_directory() . "/ssr/components/{$layout}.php";
        if (file_exists($template_path)) {
            include $template_path;
        } else {
            echo "<!-- Component not found: " . esc_html($layout) . " -->";
        }
    endforeach;
endif;
?>

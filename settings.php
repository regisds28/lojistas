<?php

function func_load_vuescripts() { 

    wp_register_script('jquery','https://code.jquery.com/jquery-3.3.1.slim.min.js');
    wp_register_script('bootstrap-js', 'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js');
    wp_register_script('axios', 'https://unpkg.com/axios@0.21.1/dist/axios.min.js');
    wp_register_script('vue', 'https://cdn.jsdelivr.net/npm/vue/dist/vue.js');
    wp_register_script('lojistas-vue', plugin_dir_url( __FILE__ ).'frontend-vue/lojistas-vue.js', [], '1.0', true);

    wp_register_style(
        'bootstrap',
        'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css',
        'screen'
    );

}

function admin_menu() {
    add_menu_page('Lojista');
}

add_action('wp_enqueue_scripts', 'func_load_vuescripts', 'admin_menu');

?>

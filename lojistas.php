<?php
/*
    Plugin Name: Cadastro de Lojistas
    Description: Plugin de cadastro e manutenção de lojistas
    Version: 1.0
    Author: Régis Paiva
    License: GPLv2 or laters
*/

require('settings.php');

function handle_shortcode() {

    wp_enqueue_script('jquery');
    wp_enqueue_script('bootstrap-js');
    wp_enqueue_script('axios');
    wp_enqueue_script('vue');  
    wp_enqueue_script('lojistas-vue');


    wp_enqueue_style('bootstrap');

    return "<div id='app'></div>";
            
};
add_shortcode('lojistas', 'handle_shortcode');


?>
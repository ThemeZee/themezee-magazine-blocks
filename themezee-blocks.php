<?php
/*
Plugin Name: ThemeZee Blocks
Plugin URI: https://themezee.com/blocks/
Description: Magazine Layout Blocks
Author: ThemeZee
Author URI: https://themezee.com/
Version: 1.0
Text Domain: themezee-blocks
Domain Path: /languages/
License: GNU General Public License v2 or later
License URI: http://www.gnu.org/licenses/gpl-2.0.html

ThemeZee Blocks
Copyright(C) 2019, themezee.com - support@themezee.com
*/

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Main ThemeZee_Blocks Class
 *
 * @package ThemeZee Blocks
 */
class ThemeZee_Blocks {
	/**
	 * Call all Functions to setup the Plugin
	 *
	 * @uses ThemeZee_Blocks::constants() Setup the constants needed
	 * @uses ThemeZee_Blocks::includes() Include the required files
	 * @uses ThemeZee_Blocks::setup_actions() Setup the hooks and actions
	 * @return void
	 */
	static function setup() {
		// Setup Constants.
		self::constants();

		// Setup Translation.
		add_action( 'init', array( __CLASS__, 'translation' ) );

		// Include Files.
		self::includes();

		// Setup Action Hooks.
		self::setup_actions();
	}

	/**
	 * Setup plugin constants
	 *
	 * @return void
	 */
	static function constants() {
		// Define Version Number.
		define( 'THEMEZEE_BLOCKS_VERSION', '1.0' );

		// Plugin Folder Path.
		define( 'THEMEZEE_BLOCKS_PLUGIN_DIR', plugin_dir_path( __FILE__ ) );

		// Plugin Folder URL.
		define( 'THEMEZEE_BLOCKS_PLUGIN_URL', plugin_dir_url( __FILE__ ) );

		// Plugin Root File.
		define( 'THEMEZEE_BLOCKS_PLUGIN_FILE', __FILE__ );
	}

	/**
	 * Load Translation File
	 *
	 * @return void
	 */
	static function translation() {
		load_plugin_textdomain( 'themezee-blocks', false, dirname( plugin_basename( THEMEZEE_BLOCKS_PLUGIN_FILE ) ) . '/languages/php/' );
	}

	/**
	 * Include required files
	 *
	 * @return void
	 */
	static function includes() {
		// Include Magazine Cache Class.
		require_once THEMEZEE_BLOCKS_PLUGIN_DIR . '/includes/class-themezee-blocks-magazine-cache.php';

		// Include Magazine Template Class.
		require_once THEMEZEE_BLOCKS_PLUGIN_DIR . '/includes/class-themezee-blocks-magazine-template.php';

		// Include Blocks for server-side.
		require_once THEMEZEE_BLOCKS_PLUGIN_DIR . '/includes/blocks/class-themezee-blocks-magazine-column.php';
		require_once THEMEZEE_BLOCKS_PLUGIN_DIR . '/includes/blocks/class-themezee-blocks-magazine-grid.php';
		require_once THEMEZEE_BLOCKS_PLUGIN_DIR . '/includes/blocks/class-themezee-blocks-magazine-horizontal.php';
		require_once THEMEZEE_BLOCKS_PLUGIN_DIR . '/includes/blocks/class-themezee-blocks-magazine-list.php';
		require_once THEMEZEE_BLOCKS_PLUGIN_DIR . '/includes/blocks/class-themezee-blocks-magazine-vertical.php';
	}

	/**
	 * Setup Action Hooks
	 *
	 * @see https://codex.wordpress.org/Function_Reference/add_action WordPress Codex
	 * @return void
	 */
	static function setup_actions() {
		// Enqueue Block Assets.
		add_action( 'init', array( __CLASS__, 'enqueue_block_assets' ) );

		// Add block category.
		add_filter( 'block_categories', array( __CLASS__, 'block_categories' ), 10, 2 );
	}

	/**
	 * Enqueue Block Assets
	 *
	 * @return void
	 */
	static function enqueue_block_assets() {
		// Register block styles for both frontend + backend.
		wp_register_style(
			'themezee-blocks',
			THEMEZEE_BLOCKS_PLUGIN_URL . 'assets/css/themezee-blocks.css',
			array( 'wp-editor' ),
			THEMEZEE_BLOCKS_VERSION
		);

		// Register block editor script for backend.
		wp_register_script(
			'themezee-blocks',
			THEMEZEE_BLOCKS_PLUGIN_URL . 'assets/js/themezee-blocks.js',
			array(
				'wp-blocks',
				'wp-i18n',
				'wp-element',
				'wp-components',
				'wp-editor',
				'wp-api-fetch',
				'lodash',
			),
			THEMEZEE_BLOCKS_VERSION
		);

		// Transfer Data from PHP to ThemeZee Blocks Redux Store.
		wp_add_inline_script( 'themezee-blocks', self::get_dispatch_data(), 'after' );

		// Load javascript translation files.
		wp_set_script_translations( 'themezee-blocks-editor', 'themezee-blocks', THEMEZEE_BLOCKS_PLUGIN_DIR . 'languages/js' );

		// Register block editor styles for backend.
		wp_register_style(
			'themezee-blocks-editor',
			THEMEZEE_BLOCKS_PLUGIN_URL . 'assets/css/themezee-blocks-editor.css',
			array(
				'wp-edit-blocks',
				'themezee-blocks',
			),
			THEMEZEE_BLOCKS_VERSION
		);

		// Register ThemeZee Blocks for Gutenberg Editor.
		register_block_type(
			'themezee-blocks/magazine', array(
				'style'         => 'themezee-blocks',
				'editor_script' => 'themezee-blocks',
				'editor_style'  => 'themezee-blocks-editor',
			)
		);
	}

	/**
	 * Generate Code to dispatch data from PHP to Redux store.
	 *
	 * @return $script Data Dispatch code.
	 */
	static function get_dispatch_data() {
		// Add Plugin URL.
		$script = sprintf( 'wp.data.dispatch( "themezee-blocks-store" ).setPluginURL( %s );', wp_json_encode( THEMEZEE_BLOCKS_PLUGIN_URL ) );

		return $script;
	}

	/**
	 * Define custom image sizes
	 *
	 * @return void
	 */
	static function block_categories( $categories, $post ) {
		return array_merge(
			$categories,
			array(
				array(
					'slug'  => 'themezee-blocks',
					'title' => __( 'ThemeZee Blocks', 'themezee-blocks' ),
				),
			)
		);
	}
}

// Run Plugin.
ThemeZee_Blocks::setup();

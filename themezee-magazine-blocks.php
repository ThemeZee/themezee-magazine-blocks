<?php
/*
Plugin Name: ThemeZee Magazine Blocks
Plugin URI: https://themezee.com/plugins/magazine-blocks/
Description: Flexible Magazine Blocks for the new WordPress Block Editor.
Author: ThemeZee
Author URI: https://themezee.com/
Version: 1.2
Requires PHP: 7.0
Requires at least: 6.1
Tested up to: 6.1
Text Domain: themezee-magazine-blocks
Domain Path: /languages/
License: GNU General Public License v2 or later
License URI: http://www.gnu.org/licenses/gpl-2.0.html

ThemeZee Magazine Blocks
Copyright(C) 2020, themezee.com - support@themezee.com
*/

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Main ThemeZee_Magazine_Blocks Class
 *
 * @package ThemeZee Magazine Blocks
 */
class ThemeZee_Magazine_Blocks {
	/**
	 * Call all Functions to setup the Plugin
	 *
	 * @uses ThemeZee_Magazine_Blocks::constants() Setup the constants needed
	 * @uses ThemeZee_Magazine_Blocks::includes() Include the required files
	 * @uses ThemeZee_Magazine_Blocks::setup_actions() Setup the hooks and actions
	 * @return void
	 */
	static function setup() {
		// Setup Constants.
		self::constants();

		// Setup Translation.
		add_action( 'plugins_loaded', array( __CLASS__, 'translation' ) );

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
		define( 'THEMEZEE_MAGAZINE_BLOCKS_VERSION', '1.2' );

		// Plugin Folder Path.
		define( 'THEMEZEE_MAGAZINE_BLOCKS_PLUGIN_DIR', plugin_dir_path( __FILE__ ) );

		// Plugin Folder URL.
		define( 'THEMEZEE_MAGAZINE_BLOCKS_PLUGIN_URL', plugin_dir_url( __FILE__ ) );

		// Plugin Root File.
		define( 'THEMEZEE_MAGAZINE_BLOCKS_PLUGIN_FILE', __FILE__ );
	}

	/**
	 * Load Translation File
	 *
	 * @return void
	 */
	static function translation() {
		load_plugin_textdomain( 'themezee-magazine-blocks', false, dirname( plugin_basename( THEMEZEE_MAGAZINE_BLOCKS_PLUGIN_FILE ) ) . '/languages/' );
	}

	/**
	 * Include required files
	 *
	 * @return void
	 */
	static function includes() {
		// Include Magazine Cache Class.
		require_once THEMEZEE_MAGAZINE_BLOCKS_PLUGIN_DIR . '/includes/class-themezee-magazine-blocks-cache.php';

		// Include Magazine Template Class.
		require_once THEMEZEE_MAGAZINE_BLOCKS_PLUGIN_DIR . '/includes/class-themezee-magazine-blocks-template.php';

		// Include Blocks for server-side.
		require_once THEMEZEE_MAGAZINE_BLOCKS_PLUGIN_DIR . '/includes/blocks/class-themezee-magazine-blocks-column.php';
		require_once THEMEZEE_MAGAZINE_BLOCKS_PLUGIN_DIR . '/includes/blocks/class-themezee-magazine-blocks-columns.php';
		require_once THEMEZEE_MAGAZINE_BLOCKS_PLUGIN_DIR . '/includes/blocks/class-themezee-magazine-blocks-grid.php';
		require_once THEMEZEE_MAGAZINE_BLOCKS_PLUGIN_DIR . '/includes/blocks/class-themezee-magazine-blocks-horizontal.php';
		require_once THEMEZEE_MAGAZINE_BLOCKS_PLUGIN_DIR . '/includes/blocks/class-themezee-magazine-blocks-list.php';
		require_once THEMEZEE_MAGAZINE_BLOCKS_PLUGIN_DIR . '/includes/blocks/class-themezee-magazine-blocks-vertical.php';
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
		add_filter( 'block_categories_all', array( __CLASS__, 'block_categories' ), 10, 2 );
	}

	/**
	 * Enqueue Block Assets
	 *
	 * @return void
	 */
	static function enqueue_block_assets() {
		// Register block styles for both frontend + backend.
		wp_register_style(
			'themezee-magazine-blocks',
			THEMEZEE_MAGAZINE_BLOCKS_PLUGIN_URL . 'assets/css/themezee-magazine-blocks.css',
			array(),
			THEMEZEE_MAGAZINE_BLOCKS_VERSION
		);

		// Register block editor script for backend.
		wp_register_script(
			'themezee-magazine-blocks',
			THEMEZEE_MAGAZINE_BLOCKS_PLUGIN_URL . 'assets/js/themezee-magazine-blocks.js',
			array(
				'wp-blocks',
				'wp-i18n',
				'wp-element',
				'wp-components',
				'wp-editor',
				'wp-api-fetch',
				'lodash',
			),
			THEMEZEE_MAGAZINE_BLOCKS_VERSION
		);

		// Transfer Data from PHP to ThemeZee Magazine Blocks Redux Store.
		wp_add_inline_script( 'themezee-magazine-blocks', self::get_dispatch_data(), 'after' );

		// Load javascript translation files.
		wp_set_script_translations( 'themezee-magazine-blocks-editor', 'themezee-magazine-blocks', THEMEZEE_MAGAZINE_BLOCKS_PLUGIN_DIR . 'languages' );

		// Register block editor styles for backend.
		wp_register_style(
			'themezee-magazine-blocks-editor',
			THEMEZEE_MAGAZINE_BLOCKS_PLUGIN_URL . 'assets/css/themezee-magazine-blocks-editor.css',
			array(
				'wp-edit-blocks',
				'themezee-magazine-blocks',
			),
			THEMEZEE_MAGAZINE_BLOCKS_VERSION
		);
	}

	/**
	 * Generate Code to dispatch data from PHP to Redux store.
	 *
	 * @return $script Data Dispatch code.
	 */
	static function get_dispatch_data() {
		// Add Plugin URL.
		$script = sprintf( 'wp.data.dispatch( "themezee-magazine-blocks-store" ).setPluginURL( %s );', wp_json_encode( THEMEZEE_MAGAZINE_BLOCKS_PLUGIN_URL ) );

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
					'slug'  => 'themezee-magazine-blocks',
					'title' => __( 'ThemeZee Magazine Blocks', 'themezee-magazine-blocks' ),
				),
			)
		);
	}
}

// Run Plugin.
ThemeZee_Magazine_Blocks::setup();

<?php
/**
 * Registering the Magazine Columns Block
 *
 * @package ThemeZee Magazine Blocks
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * ThemeZee Magazine Blocks Magazine Column Class
 */
class ThemeZee_Magazine_Blocks_Columns {
	/**
	 * Setup the class
	 *
	 * @return void
	 */
	static function setup() {

		// Register Block.
		add_action( 'init', array( __CLASS__, 'register_block' ) );
	}

	/**
	 * Register block on server.
	 *
	 * @return void
	 */
	static function register_block() {
		register_block_type(
			THEMEZEE_MAGAZINE_BLOCKS_PLUGIN_DIR . '/src/blocks/columns/',
			array(
				'style'         => 'themezee-magazine-blocks',
				'editor_script' => 'themezee-magazine-blocks',
				'editor_style'  => 'themezee-magazine-blocks-editor',
			)
		);
	}
}

// Run Class.
ThemeZee_Magazine_Blocks_Columns::setup();

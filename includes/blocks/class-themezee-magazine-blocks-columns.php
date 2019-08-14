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
		register_block_type( 'themezee-magazine-blocks/columns' );
	}
}

// Run Class.
ThemeZee_Magazine_Blocks_Columns::setup();

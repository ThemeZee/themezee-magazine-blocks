<?php
/**
 * Registering the Magazine Columns Block
 *
 * @package ThemeZee Blocks
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * ThemeZee Blocks Magazine Column Class
 */
class ThemeZee_Blocks_Magazine_Columns {
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
		register_block_type( 'themezee-blocks/magazine-columns' );
	}
}

// Run Class.
ThemeZee_Blocks_Magazine_Columns::setup();

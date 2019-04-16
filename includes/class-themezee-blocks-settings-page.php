<?php
/**
 * ThemeZee Blocks Settings Page
 *
 * @package ThemeZee Blocks
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * ThemeZee Blocks Settings Page Class
 */
class ThemeZee_Blocks_Settings_Page {
	/**
	 * Setup the Settings Page class
	 *
	 * @return void
	 */
	static function setup() {

		// Add settings page to WordPress.
		add_action( 'admin_menu', array( __CLASS__, 'add_settings_page' ) );

		// Enqueue Settings CSS.
		add_action( 'admin_enqueue_scripts', array( __CLASS__, 'settings_page_css' ) );
	}

	/**
	 * Add Settings Page to Admin menu
	 *
	 * @return void
	 */
	static function add_settings_page() {
		add_options_page(
			esc_html__( 'ThemeZee Blocks', 'themezee-blocks' ),
			esc_html__( 'ThemeZee Blocks', 'themezee-blocks' ),
			'manage_options',
			'themezee-blocks',
			array( __CLASS__, 'display_settings_page' )
		);
	}

	/**
	 * Display settings page
	 *
	 * @return void
	 */
	static function display_settings_page() {
		ob_start();
		?>

		<div id="themezee-blocks-settings" class="themezee-blocks-settings wrap">

			<h1><?php esc_html_e( 'ThemeZee Blocks', 'themezee-blocks' ); ?></h1>

			<form class="themezee-blocks-settings-form" method="post" action="options.php">
				<?php
					settings_fields( 'themezee_blocks_settings' );
					do_settings_sections( 'themezee_blocks_settings' );
					submit_button();
				?>
			</form>

		</div>

		<?php
		echo ob_get_clean();
	}

	/**
	 * Enqueues CSS for Settings page
	 *
	 * @param String $hook Slug of settings page.
	 * @return void
	 */
	static function settings_page_css( $hook ) {

		// Load styles and scripts only on theme info page.
		if ( 'settings_page_themezee-blocks' != $hook ) {
			return;
		}

		// Embed theme info css style.
		wp_enqueue_style( 'themezee-blocks-settings', THEMEZEE_BLOCKS_PLUGIN_URL . 'assets/css/settings.css', array(), THEMEZEE_BLOCKS_VERSION );
	}
}

// Run Settings Page Class.
ThemeZee_Blocks_Settings_Page::setup();

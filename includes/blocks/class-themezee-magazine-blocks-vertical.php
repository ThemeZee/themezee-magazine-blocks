<?php
/**
 * Server-side rendering of the Magazine Vertical Block
 *
 * @package ThemeZee Magazine Blocks
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * ThemeZee Magazine Blocks Magazine Vertical Class
 */
class ThemeZee_Magazine_Blocks_Vertical {
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
			THEMEZEE_MAGAZINE_BLOCKS_PLUGIN_DIR . '/src/blocks/vertical/',
			array(
				'render_callback' => array( __CLASS__, 'render_block' ),
				'style'           => 'themezee-magazine-blocks',
				'editor_script'   => 'themezee-magazine-blocks',
				'editor_style'    => 'themezee-magazine-blocks-editor',
			)
		);
	}

	/**
	 * Render block.
	 *
	 * @param array $attributes The block attributes.
	 *
	 * @return string Returns the block content.
	 */
	static function render_block( $attributes ) {
		// Fetch posts from cache or database.
		$posts_query = ThemeZee_Magazine_Blocks_Cache::query_posts( $attributes );

		// Set up markup variables.
		$highlight_post = '';
		$list_posts     = '';

		// Check if there are posts.
		if ( $posts_query->have_posts() ) :

			// Get Posts Markup.
			while ( $posts_query->have_posts() ) :
				$posts_query->the_post();

				// Display first post differently.
				if ( 0 === $posts_query->current_post ) :

					$highlight_post .= ThemeZee_Magazine_Blocks_Template::get_grid_post( $attributes, $attributes['imageSize'] );

				else :

					$list_posts .= ThemeZee_Magazine_Blocks_Template::get_list_post( $attributes, $attributes['thumbnailSize'], false );

				endif;

			endwhile;

		endif;

		// Reset Postdata.
		wp_reset_postdata();

		// Wrap Highlight Posts.
		$highlight_post = sprintf( '<div class="tz-magazine-highlight-post">%s</div>', $highlight_post );

		// Wrap Thumbnail Posts.
		$list_posts = sprintf( '<div class="tz-magazine-thumbnail-list">%s</div>', $list_posts );

		// Set Posts Markup.
		$posts_markup = $highlight_post . $list_posts;

		// Define Block Content.
		$block_content = sprintf( '<div class="tz-magazine-vertical">%s</div>', $posts_markup );

		// Get Block Classes.
		$block_classes = self::get_block_classes( $attributes );

		// Wrap Block Content.
		$block = sprintf(
			'<div class="%1$s">%2$s</div>',
			esc_attr( $block_classes ),
			$block_content
		);

		return $block;
	}

	/**
	 * Get Block Classes.
	 *
	 * @param array $attributes The block attributes.
	 *
	 * @return string Returns the block classes.
	 */
	static function get_block_classes( $attributes ) {
		$classes  = 'wp-block-themezee-magazine-blocks-vertical';
		$classes .= ' tz-magazine-block';

		if ( isset( $attributes['className'] ) ) {
			$classes .= ' ' . $attributes['className'];
		}

		return $classes;
	}
}

// Run Class.
ThemeZee_Magazine_Blocks_Vertical::setup();

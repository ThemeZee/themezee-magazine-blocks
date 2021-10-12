<?php
/**
 * Server-side rendering of the Magazine Horizontal Block
 *
 * @package ThemeZee Magazine Blocks
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * ThemeZee Magazine Blocks Magazine Horizontal Class
 */
class ThemeZee_Magazine_Blocks_Horizontal {
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
			THEMEZEE_MAGAZINE_BLOCKS_PLUGIN_DIR . '/src/blocks/horizontal/',
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
		$grid_posts     = '';

		// Check if there are posts.
		if ( $posts_query->have_posts() ) :

			// Get Posts Markup.
			while ( $posts_query->have_posts() ) :
				$posts_query->the_post();

				// Display first post differently.
				if ( 0 === $posts_query->current_post ) :

					$highlight_post .= ThemeZee_Magazine_Blocks_Template::get_list_post( $attributes, $attributes['imageSize'] );

				else :

					$grid_posts .= ThemeZee_Magazine_Blocks_Template::get_grid_post( $attributes, $attributes['thumbnailSize'], false );

				endif;

			endwhile;

		endif;

		// Reset Postdata.
		wp_reset_postdata();

		// Wrap Highlight Posts.
		$highlight_post = sprintf( '<div class="tz-magazine-highlight-post">%s</div>', $highlight_post );

		// Set Columns class.
		$columns_class = sanitize_key( 'tz-magazine-grid-columns-' . $attributes['columns'] );

		// Wrap Grid Posts.
		$grid_posts = sprintf( '<div class="tz-magazine-grid-columns %1$s">%2$s</div>', $columns_class, $grid_posts );

		// Set Posts Markup.
		$posts_markup = $highlight_post . $grid_posts;

		// Define Block Content.
		$block_content = sprintf( '<div class="tz-magazine-horizontal">%s</div>', $posts_markup );

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
		$classes  = 'wp-block-themezee-magazine-blocks-horizontal';
		$classes .= ' tz-magazine-block';

		if ( isset( $attributes['className'] ) ) {
			$classes .= ' ' . $attributes['className'];
		}

		return $classes;
	}
}

// Run Class.
ThemeZee_Magazine_Blocks_Horizontal::setup();

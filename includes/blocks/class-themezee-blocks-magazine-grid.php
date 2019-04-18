<?php
/**
 * Server-side rendering of the Magazine Grid Block
 *
 * @package ThemeZee Blocks
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * ThemeZee Blocks Magazine Grid Class
 */
class ThemeZee_Blocks_Magazine_Grid {
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
			'themezee-blocks/magazine-grid',
			array(
				'attributes' => array(
					'className' => array(
						'type' => 'string',
					),
					'categories' => array(
						'type' => 'string',
					),
					'postsToShow' => array(
						'type'    => 'number',
						'default' => 6,
					),
					'displayPostDate' => array(
						'type'    => 'boolean',
						'default' => false,
					),
					'order' => array(
						'type'    => 'string',
						'default' => 'desc',
					),
					'orderBy' => array(
						'type'    => 'string',
						'default' => 'date',
					),
				),
				'render_callback' => array( __CLASS__, 'render_block' ),
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
		$query_arguments = array(
			'posts_per_page'      => $attributes['postsToShow'],
			'post_status'         => 'publish',
			'order'               => $attributes['order'],
			'orderby'             => $attributes['orderBy'],
			'suppress_filters'    => false,
			'ignore_sticky_posts' => true,
			'no_found_rows'       => true,
		);

		if ( isset( $attributes['categories'] ) ) {
			$query_arguments['category'] = $attributes['categories'];
		}

		// Fetch posts from database.
		$posts_query = new WP_Query( $query_arguments );

		$posts_markup = '';

		// Check if there are posts.
		if ( $posts_query->have_posts() ) :

			// Get Posts Markup.
			while ( $posts_query->have_posts() ) :
				$posts_query->the_post();

				$posts_markup .= ThemeZee_Blocks_Magazine_Template::get_post( $attributes );

			endwhile;

		endif;

		// Reset Postdata.
		wp_reset_postdata();

		// Define Block Content.
		$block_content = sprintf( '<div class="tz-magazine-columns tz-magazine-columns-3">%s</div>', $posts_markup );

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
		$classes  = 'wp-block-themezee-blocks-magazine-grid';
		$classes .= ' tz-magazine-block';

		if ( isset( $attributes['className'] ) ) {
			$classes .= ' ' . $attributes['className'];
		}

		return $classes;
	}
}

// Run Class.
ThemeZee_Blocks_Magazine_Grid::setup();

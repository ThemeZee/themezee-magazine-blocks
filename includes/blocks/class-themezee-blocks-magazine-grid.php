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
		add_action( 'init', array( __CLASS__, 'register_magazine_grid_block' ) );
	}

	/**
	 * Register Magazine Grid block on server.
	 *
	 * @return void
	 */
	static function register_magazine_grid_block() {
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
						'default' => 5,
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
				'render_callback' => array( __CLASS__, 'render_magazine_grid_block' ),
			)
		);
	}

	/**
	 * Render Magazine Grid block.
	 *
	 * @param array $attributes The block attributes.
	 *
	 * @return string Returns the block content.
	 */
	static function render_magazine_grid_block( $attributes ) {
		$args = array(
			'posts_per_page'   => $attributes['postsToShow'],
			'post_status'      => 'publish',
			'order'            => $attributes['order'],
			'orderby'          => $attributes['orderBy'],
			'suppress_filters' => false,
		);

		if ( isset( $attributes['categories'] ) ) {
			$args['category'] = $attributes['categories'];
		}

		$recent_posts = get_posts( $args );

		$list_items_markup = '';

		foreach ( $recent_posts as $post ) {
			$title = get_the_title( $post );

			if ( ! $title ) {
				$title = __( '(Untitled)' );
			}

			$list_items_markup .= sprintf(
				'<li><a href="%1$s">%2$s</a>',
				esc_url( get_permalink( $post ) ),
				$title
			);

			$list_items_markup .= "</li>\n";
		}

		$class = 'wp-block-themezee-blocks-magazine-grid';

		if ( isset( $attributes['className'] ) ) {
			$class .= ' ' . $attributes['className'];
		}

		$block_content = sprintf(
			'<ul class="%1$s">test %2$s</ul>',
			esc_attr( $class ),
			$list_items_markup
		);

		return $block_content;
	}
}

// Run Class.
ThemeZee_Blocks_Magazine_Grid::setup();

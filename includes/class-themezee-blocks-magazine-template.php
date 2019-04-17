<?php
/**
 * Display a single post.
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
class ThemeZee_Blocks_Magazine_Template {
	/**
	 * Get Magazine Post Content.
	 *
	 * @param array $attributes The block attributes.
	 *
	 * @return string Returns the post content.
	 */
	static function get_post( $attributes ) {
		$post_content = '';

		// Add Featured Image.
		$post_content .= self::get_post_image( $attributes );

		// Add Post Header.
		$post_content .= self::get_post_header( $attributes );

		// Add Excerpt.
		$post_content .= self::get_post_excerpt( $attributes );

		// Wrap post content into <article> tag.
		$post_article = sprintf(
			'<article id="post-%1$s" class="%2$s">%3$s</article>',
			get_the_ID(),
			join( ' ', get_post_class( 'tz-magazine-post' ) ),
			$post_content
		);

		// Add Wrapper Div for Post Article.
		$post_wrap = sprintf( '<div class="tz-post-wrap">%s</div>', $post_article );

		return $post_wrap;
	}

	/**
	 * Get Post Image.
	 *
	 * @param array $attributes The block attributes.
	 *
	 * @return string Returns the post image.
	 */
	static function get_post_image( $attributes ) {
		return 'image';
	}

	/**
	 * Get Post Header.
	 *
	 * @param array $attributes The block attributes.
	 *
	 * @return string Returns the post header.
	 */
	static function get_post_header( $attributes ) {
		$header_content = '';

		// Add Title.
		$header_content .= self::get_post_title( $attributes );

		// Add Post Meta.
		$header_content .= self::get_post_meta( $attributes );

		// Wrap header content.
		$header = sprintf( '<header class="entry-header">%s</header><!-- .entry-header -->', $header_content );

		return $header;
	}

	/**
	 * Get Post Excerpt.
	 *
	 * @param array $attributes The block attributes.
	 *
	 * @return string Returns the post excerpt.
	 */
	static function get_post_excerpt( $attributes ) {
		return 'excerpt';
	}

	/**
	 * Get Post Title.
	 *
	 * @param array $attributes The block attributes.
	 *
	 * @return string Returns the post title.
	 */
	static function get_post_title( $attributes ) {
		$title = sprintf(
			'<h2 class="entry-title"><a href="%1$s" rel="bookmark">%2$s</a></h2>',
			esc_url( get_permalink() ),
			esc_html( get_the_title() )
		);

		return $title;
	}

	/**
	 * Get Post Meta.
	 *
	 * @param array $attributes The block attributes.
	 *
	 * @return string Returns the post meta.
	 */
	static function get_post_meta( $attributes ) {
		return 'meta';
	}
}

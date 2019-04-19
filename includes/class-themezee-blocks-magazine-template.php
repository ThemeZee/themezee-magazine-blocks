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
		$post_content .= self::get_post_image( 'large', $attributes );

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
	static function get_post_image( $size, $attributes ) {
		$image = sprintf(
			'<figure class="entry-image"><a href="%1$s" rel="bookmark">%2$s</a></figure>',
			esc_url( get_permalink() ),
			get_the_post_thumbnail( null, $size )
		);

		return $image;
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
		$header = sprintf( '<header class="entry-header">%s</header>', $header_content );

		return $header;
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
		$meta_content = '';

		// Add Date.
		$meta_content .= self::get_post_date( $attributes );

		// Add Author.
		$meta_content .= self::get_post_author( $attributes );

		// Wrap header content.
		$postmeta = sprintf( '<div class="entry-meta">%s</div>', $meta_content );

		return $postmeta;
	}

	/**
	 * Get Post Date.
	 *
	 * @param array $attributes The block attributes.
	 *
	 * @return string Returns the post date.
	 */
	static function get_post_date( $attributes ) {

		// Create date string.
		$time_string = sprintf( '<a href="%1$s" title="%2$s" rel="bookmark"><time class="entry-date published updated" datetime="%3$s">%4$s</time></a>',
			esc_url( get_permalink() ),
			esc_attr( get_the_time() ),
			esc_attr( get_the_date( 'c' ) ),
			esc_html( get_the_date() )
		);

		// Wrap date.
		$date = sprintf( '<span class="meta-date">%s</span>', $time_string );

		return $date;
	}

	/**
	 * Get Post Author.
	 *
	 * @param array $attributes The block attributes.
	 *
	 * @return string Returns the post author.
	 */
	static function get_post_author( $attributes ) {

		// Create author string.
		$author_string = sprintf( '<span class="author vcard"><a class="url fn n" href="%1$s" title="%2$s" rel="author">%3$s</a></span>',
			esc_url( get_author_posts_url( get_the_author_meta( 'ID' ) ) ),
			esc_attr( sprintf( esc_html__( 'View all posts by %s', 'themezee-blocks' ), get_the_author() ) ),
			esc_html( get_the_author() )
		);

		// Wrap author.
		$author = sprintf( '<span class="meta-date">%s</span>', $author_string );

		return $author;
	}

	/**
	 * Get Post Excerpt.
	 *
	 * @param array $attributes The block attributes.
	 *
	 * @return string Returns the post excerpt.
	 */
	static function get_post_excerpt( $attributes ) {
		$post_content = '';

		// Add Excerpt.
		$post_content .= sprintf( '<p>%s</p>', get_the_excerpt() );

		// Add Read More link.
		$post_content .= self::get_post_read_more_link( $attributes );

		// Wrap header content.
		$excerpt = sprintf( '<div class="entry-content">%s</div>', $post_content );

		return $excerpt;
	}

	/**
	 * Get Post Read More link.
	 *
	 * @param array $attributes The block attributes.
	 *
	 * @return string Returns the post read more link.
	 */
	static function get_post_read_more_link( $attributes ) {
		$link = sprintf(
			'<p class="read-more"><a href="%1$s" class="more-link" rel="bookmark">%2$s</a></p>',
			esc_url( get_permalink() ),
			esc_html__( 'Read More', 'themezee-blocks' )
		);

		return $link;
	}
}
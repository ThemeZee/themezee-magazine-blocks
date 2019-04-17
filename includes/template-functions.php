<?php
/**
 * Template Functions
 *
 * Taken from Easy Digtial Downloads, licensed under GPL v2
 * https://github.com/easydigitaldownloads/easy-digital-downloads/blob/master/includes/template-functions.php
 *
 * @package ThemeZee Blocks
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Returns the path to the EDD templates directory
 *
 * @return string
 */
function themezee_blocks_get_templates_dir() {
	return THEMEZEE_BLOCKS_PLUGIN_DIR . 'templates';
}

/**
 * Retrieves a template part
 *
 * Taken from bbPress
 *
 * @param string $slug
 * @param string $name Optional. Default null
 * @param bool   $load
 *
 * @return string
 *
 * @uses themezee_blocks_locate_template()
 * @uses load_template()
 * @uses get_template_part()
 */
function themezee_blocks_get_template_part( $slug, $name = null, $load = true ) {
	// Execute code for this part.
	do_action( 'get_template_part_' . $slug, $slug, $name );

	$load_template = apply_filters( 'themezee_blocks_allow_template_part_' . $slug . '_' . $name, true );

	if ( false === $load_template ) {
		return '';
	}

	// Setup possible parts.
	$templates = array();

	if ( isset( $name ) ) {
		$templates[] = $slug . '-' . $name . '.php';
	}

	$templates[] = $slug . '.php';

	// Allow template parts to be filtered.
	$templates = apply_filters( 'themezee_blocks_get_template_part', $templates, $slug, $name );

	// Return the part that is found.
	return themezee_blocks_locate_template( $templates, $load, false );
}

/**
 * Retrieve the name of the highest priority template file that exists.
 *
 * Searches in the STYLESHEETPATH before TEMPLATEPATH so that themes which
 * inherit from a parent theme can just overload one file. If the template is
 * not found in either of those, it looks in the theme-compat folder last.
 *
 * Taken from bbPress
 *
 * @param string|array $template_names Template file(s) to search for, in order.
 * @param bool $load If true the template file will be loaded if it is found.
 * @param bool $require_once Whether to require_once or require. Default true. Has no effect if $load is false.
 * 
 * @return string The template filename if one is located.
 */
function themezee_blocks_locate_template( $template_names, $load = false, $require_once = true ) {
	// No file found yet.
	$located = false;

	// Try to find a template file.
	foreach ( (array) $template_names as $template_name ) {

		// Continue if template is empty
		if ( empty( $template_name ) ) {
			continue;
		}

		// Trim off any slashes from the template name.
		$template_name = ltrim( $template_name, '/' );

		// try locating this template file by looping through the template paths.
		foreach ( themezee_blocks_get_theme_template_paths() as $template_path ) {
			if ( file_exists( $template_path . $template_name ) ) {
				$located = $template_path . $template_name;
				break;
			}
		}

		if ( $located ) {
			break;
		}
	}

	if ( ( true == $load ) && ! empty( $located ) ) {
		load_template( $located, $require_once );
	}

	return $located;
}

/**
 * Returns a list of paths to check for template locations
 *
 * @return mixed|void
 */
function themezee_blocks_get_theme_template_paths() {
	$template_dir = themezee_blocks_get_theme_template_dir_name();

	$file_paths = array(
		1   => trailingslashit( get_stylesheet_directory() ) . $template_dir,
		10  => trailingslashit( get_template_directory() ) . $template_dir,
		100 => themezee_blocks_get_templates_dir(),
	);

	$file_paths = apply_filters( 'themezee_blocks_template_paths', $file_paths );

	// Sort the file paths based on priority.
	ksort( $file_paths, SORT_NUMERIC );

	return array_map( 'trailingslashit', $file_paths );
}

/**
 * Returns the template directory name.
 *
 * Themes can filter this by using the themezee_blocks_templates_dir filter.
 *
 * @return string
*/
function themezee_blocks_get_theme_template_dir_name() {
	return trailingslashit( apply_filters( 'themezee_blocks_templates_dir', 'template-parts/themezee-blocks' ) );
}

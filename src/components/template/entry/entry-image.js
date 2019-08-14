/**
 * External dependencies
 */
const {
	isEmpty,
	get,
} = lodash;

/**
 * WordPress dependencies
 */
const { Component } = wp.element;
const { compose } = wp.compose;
const { withSelect } = wp.data;

class EntryImage extends Component {
	render() {
		const {
			post,
			image,
		} = this.props;

		// Return early if image is not loaded.
		if ( '' === image ) {
			return null;
		}

		return (
			<figure className="tz-entry-image entry-image">
				<a href={ post.link } target="_blank" rel="noreferrer noopener">
					<img src={ image } alt="" />
				</a>
			</figure>
		);
	}
}

export default compose( [
	withSelect( ( select, props ) => {
		const { getMedia } = select( 'core' );
		const {
			imageSize,
			post,
		} = props;

		const image = post.featured_media ? getMedia( post.featured_media ) : null;
		const availableSizes = get( image, [ 'media_details', 'sizes' ], {} );

		if ( isEmpty( availableSizes ) ) {
			const pluginURL = select( 'themezee-magazine-blocks-store' ).getPluginURL();

			return {
				image: pluginURL + 'assets/images/default-featured-image.png',
			};
		}

		let imageURL = '';

		// Check if image size exists.
		if ( availableSizes.hasOwnProperty( imageSize ) ) {
			imageURL = availableSizes[ imageSize ].source_url;
		} else {
			imageURL = availableSizes.full.source_url;
		}

		return {
			image: imageURL,
		};
	} ),
] )( EntryImage );

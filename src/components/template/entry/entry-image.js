/**
 * External dependencies
 */
import {
	isEmpty,
	get,
} from 'lodash';

/**
 * WordPress dependencies
 */
import { Component } from '@wordpress/element';
import { compose } from '@wordpress/compose';
import { withSelect } from '@wordpress/data';

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
			return {
				image: themezeeMagazineBlocks.pluginUrl + 'public/images/default-featured-image.png',
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

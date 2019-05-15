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

class PostImage extends Component {
	constructor() {
		super( ...arguments );
		this.updateImageURL = this.updateImageURL.bind( this );

		this.state = {
			imageURL: '',
		};
	}

	componentDidUpdate( prevProps ) {
		const { imageSize } = this.props.attributes;

		// Update image url if it is empty.
		if ( this.props.image && '' === this.state.imageURL ) {
			this.updateImageURL( imageSize );
		}

		// Update image url if new image size was chosen.
		if ( imageSize !== prevProps.attributes.imageSize ) {
			this.updateImageURL( imageSize );
		}
	}

	updateImageURL( imageSize ) {
		const availableSizes = this.getAvailableSizes();

		// Return early if image sizes are not available yet.
		if ( isEmpty( availableSizes ) ) {
			return;
		}

		// Check if image size exists.
		if ( availableSizes.hasOwnProperty( imageSize ) ) {
			this.setState( {
				imageURL: availableSizes[ imageSize ].source_url,
			} );
		} else {
			this.setState( {
				imageURL: availableSizes.full.source_url,
			} );
		}
	}

	getAvailableSizes() {
		return get( this.props.image, [ 'media_details', 'sizes' ], {} );
	}

	render() {
		const { post } = this.props;
		const { imageURL } = this.state;

		// Return early if image is not loaded.
		if ( '' === imageURL ) {
			return null;
		}

		return (
			<figure className="entry-image">
				<a href={ post.link } target="_blank" rel="noreferrer noopener">
					<img src={ imageURL } alt="" />
				</a>
			</figure>
		);
	}
}

export default compose( [
	withSelect( ( select, props ) => {
		const { getMedia } = select( 'core' );
		const id = props.post.featured_media;

		return {
			image: id ? getMedia( id ) : null,
		};
	} ),
] )( PostImage );


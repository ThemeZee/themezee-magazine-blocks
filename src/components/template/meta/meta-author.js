/**
 * WordPress dependencies
 */
const { Component } = wp.element;
const { compose } = wp.compose;
const { withSelect } = wp.data;

class MetaAuthor extends Component {
	render() {
		const {
			authors,
			post,
		} = this.props;

		// Return early if no authors are found.
		if ( ! authors ) {
			return null;
		}

		// Retrieve post author.
		const postAuthor = authors.find( author => author.id === post.author );

		// Return early if no author is found.
		if ( 'undefined' === typeof postAuthor ) {
			return null;
		}

		return (
			<span className="tz-meta-author meta-author tz-meta-field author vcard">
				<a className="url fn n" href={ postAuthor.link } target="_blank" rel="noreferrer noopener">
					{ postAuthor.name }
				</a>
			</span>
		);
	}
}

export default compose( [
	withSelect( ( select ) => {
		const { getUsers } = select( 'core' );
		return {
			authors: getUsers( { who: 'authors' } ),
		};
	} ),
] )( MetaAuthor );

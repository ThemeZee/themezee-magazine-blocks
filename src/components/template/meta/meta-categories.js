/**
 * WordPress dependencies
 */
const { Component, Fragment } = wp.element;
const { compose } = wp.compose;
const { withSelect } = wp.data;

class MetaCategories extends Component {
	render() {
		const {
			categories,
			post,
		} = this.props;

		// Return early if categories are not loaded yet.
		if ( ! categories ) {
			return null;
		}

		// Retrieve categories from post.
		const postCategories = categories.filter( cat => post.categories.includes( cat.id ) );

		// Return early if no categories are found.
		if ( 'undefined' === typeof postCategories ) {
			return null;
		}

		return (
			<span className="tz-meta-categories meta-categories tz-meta-field">

				{ postCategories.map( ( category, i, cats ) =>
					<Fragment key={ i }>
						<a href={ category.link } target="_blank" rel="noreferrer noopener">
							{ category.name }
						</a>
						{ i + 1 < cats.length && (
							<span className="tz-meta-categories-sep">, </span>
						) }
					</Fragment>
				) }

			</span>
		);
	}
}

export default compose( [
	withSelect( ( select ) => {
		const { getEntityRecords } = select( 'core' );
		const query = { per_page: -1, hide_empty: true };

		return {
			categories: getEntityRecords( 'taxonomy', 'category', query ),
		};
	} ),
] )( MetaCategories );

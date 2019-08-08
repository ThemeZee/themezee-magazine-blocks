/**
 * External dependencies
 */
const { groupBy } = lodash;

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { Component } = wp.element;
const { compose } = wp.compose;
const { withSelect } = wp.data;
const { TreeSelect } = wp.components;

class CategorySelect extends Component {
	/**
	 * Returns terms in a tree form.
	 *
	 * @param {Array} flatTerms  Array of terms in flat format.
	 *
	 * @return {Array} Array of terms in tree format.
	 */
	buildTermsTree( flatTerms ) {
		const termsByParent = groupBy( flatTerms, 'parent' );
		const fillWithChildren = ( terms ) => {
			return terms.map( ( term ) => {
				const children = termsByParent[ term.id ];
				return {
					...term,
					children: children && children.length ?
						fillWithChildren( children ) :
						[],
				};
			} );
		};

		return fillWithChildren( termsByParent[ '0' ] || [] );
	}

	render() {
		const {
			categoriesList,
			selectedCategoryId,
			onCategoryChange,
		} = this.props;

		const termsTree = this.buildTermsTree( categoriesList );

		return (
			onCategoryChange && (
				<TreeSelect
					key="tz-category-select"
					label={ __( 'Category', 'themezee-blocks' ) }
					noOptionLabel={ __( 'All Categories', 'themezee-blocks' ) }
					tree={ termsTree }
					selectedId={ selectedCategoryId }
					onChange={ onCategoryChange }
				/>
			)
		);
	}
}

export default compose( [
	withSelect( ( select ) => {
		const { getEntityRecords } = select( 'core' );
		const query = { per_page: -1, hide_empty: true };

		return {
			categoriesList: getEntityRecords( 'taxonomy', 'category', query ),
		};
	} ),
] )( CategorySelect );

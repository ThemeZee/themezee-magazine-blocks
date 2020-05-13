/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { Component } = wp.element;
const { compose } = wp.compose;
const { withSelect } = wp.data;
const { SelectControl } = wp.components;

class CategorySelect extends Component {
	/**
	 * Returns terms in a simplified array.
	 *
	 * @param {Array} categoryInput  Array of terms from getEntityRecords.
	 *
	 * @return {Array} Array of terms in simplified array.
	 */
	createOptions( categoryInput ) {
		// Return early if categoryList is empty.
		if ( typeof categoryInput === 'undefined' || categoryInput.length < 1 ) {
			return [];
		}

		// Return category options.
		return categoryInput.map( cat => ( { label: cat.name, value: cat.id, disabled: false } ) );
	}

	render() {
		const {
			categoriesList,
			selectedCategoryIds,
			onCategoryChange,
		} = this.props;

		const categoryOptions = this.createOptions( categoriesList );

		return (
			onCategoryChange && (
				<SelectControl
					multiple
					label={ __( 'Category', 'themezee-magazine-blocks' ) }
					value={ selectedCategoryIds }
					options={ categoryOptions }
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

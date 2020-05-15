/**
 * External dependencies
 */
const { remove } = lodash;

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { Component } = wp.element;
const { compose } = wp.compose;
const { withSelect } = wp.data;
const { BaseControl, CheckboxControl } = wp.components;

/**
 * Internal dependencies
 */
import './editor.scss';

class CategorySelect extends Component {

	updateSelectedCategories( categoryId, selectedCategoryIds ) {
		// Initialize array if selectedCategories is undefined.
		if ( typeof selectedCategoryIds === 'undefined' ) {
			selectedCategoryIds = [];
		}

		// Check if category is selected or unselected.
		if ( this.isSelected( categoryId ) ) {
			// Remove category id.
			remove( selectedCategoryIds, id => id === categoryId );
		} else {
			// Add category id.
			selectedCategoryIds.push( categoryId );
		}

		return selectedCategoryIds;
	}

	isSelected( id, selectedCategoryIds ) {

		// Return early if categoryList is empty.
		if ( typeof selectedCategoryIds === 'undefined' || selectedCategoryIds.length < 1 ) {
			return false;
		}

		return selectedCategoryIds.includes( id );
	}

	render() {
		const {
			categoriesList,
			onCategoryChange,
			selectedCategoryIds,
		} = this.props;

		// Return early if categoryList is empty.
		if ( typeof categoriesList === 'undefined' || categoriesList.length < 1 ) {
			return null;
		}

		return (
			<BaseControl
				label={ __( 'Categories', 'themezee-magazine-blocks' ) }
				className="tz-category-select"
			>

				<div className="tz-category-select-container">

					{ categoriesList.map( ( category ) =>

						<CheckboxControl
							key={ category.id }
							label={ category.name }
							checked={ this.isSelected( category.id, selectedCategoryIds ) }
							onChange={ () => {
								const selectedCategories = this.updateSelectedCategories( category.id, selectedCategoryIds );
								return onCategoryChange( selectedCategories );
							} }
						/>

					) }

				</div>

			</BaseControl>
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

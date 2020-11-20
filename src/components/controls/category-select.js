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
	updateSelectedCategories( categoryId ) {
		const { selectedCategoryIds } = this.props;
		const newCategoryIds = [].concat( selectedCategoryIds );

		// Check if category is selected or unselected.
		if ( newCategoryIds.includes( categoryId ) ) {
			// Remove category id.
			remove( newCategoryIds, id => id === categoryId );
		} else {
			// Add category id.
			newCategoryIds.push( categoryId );
		}

		this.props.onCategoryChange( newCategoryIds );
	}

	isSelected( id ) {
		const { selectedCategoryIds } = this.props;

		// Return early if categoryList is empty.
		if ( ! selectedCategoryIds || typeof selectedCategoryIds === 'undefined' || selectedCategoryIds.length < 1 ) {
			return false;
		}

		return selectedCategoryIds.includes( id );
	}

	render() {
		const { categoriesList } = this.props;

		// Return early if categoryList is empty.
		if ( ! categoriesList || typeof categoriesList === 'undefined' || categoriesList.length < 1 ) {
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
							checked={ this.isSelected( category.id ) }
							onChange={ () => this.updateSelectedCategories( category.id ) }
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

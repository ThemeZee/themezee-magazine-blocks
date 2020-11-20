/**
 * External dependencies
 */
const { remove } = lodash;

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { Component } = wp.element;
const { BaseControl, CheckboxControl } = wp.components;

/**
 * Internal dependencies
 */
import './editor.scss';

class CategorySelect extends Component {
	componentDidMount() {
		const {
			categoriesList,
			onCategoryChange,
			selectedCategoryIds,
		} = this.props;

		// Remove left-over category IDs which do not exist anymore.
		if ( typeof categoriesList !== 'undefined' && typeof selectedCategoryIds !== 'undefined' ) {
			const newCategoryIds = selectedCategoryIds.filter( cat => categoriesList.map( c => c.id ).includes( cat ) );

			if ( newCategoryIds.length < selectedCategoryIds.length ) {
				onCategoryChange( newCategoryIds );
			}
		}
	}

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

export default CategorySelect;

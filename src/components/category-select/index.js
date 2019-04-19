/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { TreeSelect } = wp.components;

/**
 * Internal dependencies
 */
import './style.scss';
import { buildTermsTree } from './terms';

function CategorySelect( {
	categoriesList,
	selectedCategoryId,
	onCategoryChange,
} ) {
	const termsTree = buildTermsTree( categoriesList );
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

export default CategorySelect;

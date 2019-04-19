/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { Component } = wp.element;
const { TreeSelect } = wp.components;
const { addQueryArgs } = wp.url;

/**
 * Internal dependencies
 */
import './style.scss';
import { buildTermsTree } from './terms';

/**
 * Module Constants
 */
const CATEGORIES_LIST_QUERY = {
	per_page: -1,
};

class CategorySelect extends Component {
	constructor() {
		super( ...arguments );
		this.state = {
			categoriesList: [],
		};
	}

	componentDidMount() {
		this.isStillMounted = true;
		this.fetchRequest = wp.apiFetch( {
			path: addQueryArgs( '/wp/v2/categories', CATEGORIES_LIST_QUERY ),
		} ).then(
			( categoriesList ) => {
				if ( this.isStillMounted ) {
					this.setState( { categoriesList } );
				}
			}
		).catch(
			() => {
				if ( this.isStillMounted ) {
					this.setState( { categoriesList: [] } );
				}
			}
		);
	}

	componentWillUnmount() {
		this.isStillMounted = false;
	}

	render() {
		const {
			selectedCategoryId,
			onCategoryChange,
		} = this.props;

		const { categoriesList } = this.state;
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
}

export default CategorySelect;

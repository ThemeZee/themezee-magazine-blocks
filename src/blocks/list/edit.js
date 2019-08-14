/**
 * External dependencies
 */
const {
	map,
} = lodash;

/**
 * WordPress dependencies
 */
const { compose } = wp.compose;
const { withSelect } = wp.data;
const { Component } = wp.element;
const { __ } = wp.i18n;

const {
	PanelBody,
	SelectControl,
} = wp.components;

/**
 * Internal dependencies
 */
import MagazineBlock from '../../components/magazine-block';
import { IconMagazineList } from '../../components/data/icons';

/**
 * Block Edit Component
 */
class MagazineListEdit extends Component {
	render() {
		const {
			attributes,
			setAttributes,
			availableImageSizes,
		} = this.props;

		const {
			layout,
			imageSize,
		} = attributes;

		const layoutSettings = (
			<PanelBody title={ __( 'Layout Settings', 'themezee-magazine-blocks' ) } initialOpen={ false }>

				<SelectControl
					label={ __( 'List Layout', 'themezee-magazine-blocks' ) }
					value={ layout }
					onChange={ ( value ) => setAttributes( { layout: value } ) }
					options={ [
						{ value: '50-50', label: __( '50% - 50%', 'themezee-magazine-blocks' ) },
						{ value: '40-60', label: __( '40% - 60%', 'themezee-magazine-blocks' ) },
						{ value: '30-70', label: __( '30% - 70%', 'themezee-magazine-blocks' ) },
					] }
				/>

				<SelectControl
					label={ __( 'Image Size', 'themezee-magazine-blocks' ) }
					value={ imageSize }
					onChange={ ( value ) => setAttributes( { imageSize: value } ) }
					options={ map( availableImageSizes, ( size ) => ( {
						value: size.slug,
						label: size.name,
					} ) ) }
				/>

			</PanelBody>
		);

		return (
			<MagazineBlock
				placeholderLabel={ __( 'Magazine List', 'themezee-magazine-blocks' ) }
				placeholderIcon={ IconMagazineList }
				layoutSettings={ layoutSettings }
				magazineTemplate="magazine-list"
				{ ...this.props }
			/>
		);
	}
}

export default compose( [
	withSelect( ( select ) => {
		const settings = select( 'core/editor' ).getEditorSettings();
		return {
			availableImageSizes: settings.imageSizes,
		};
	} ),
] )( MagazineListEdit );

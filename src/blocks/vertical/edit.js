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
import { IconMagazineVertical } from '../../components/data/icons';

/**
 * Block Edit Component
 */
class MagazineVerticalEdit extends Component {
	render() {
		const {
			attributes,
			setAttributes,
			availableImageSizes,
		} = this.props;

		const {
			imageSize,
			thumbnailSize,
		} = attributes;

		const layoutSettings = (
			<PanelBody title={ __( 'Layout Settings', 'themezee-magazine-blocks' ) } initialOpen={ false }>

				<SelectControl
					label={ __( 'Image Size', 'themezee-magazine-blocks' ) }
					value={ imageSize }
					onChange={ ( value ) => setAttributes( { imageSize: value } ) }
					options={ map( availableImageSizes, ( size ) => ( {
						value: size.slug,
						label: size.name,
					} ) ) }
				/>

				<SelectControl
					label={ __( 'Thumbnail Size', 'themezee-magazine-blocks' ) }
					value={ thumbnailSize }
					onChange={ ( value ) => setAttributes( { thumbnailSize: value } ) }
					options={ map( availableImageSizes, ( size ) => ( {
						value: size.slug,
						label: size.name,
					} ) ) }
				/>

			</PanelBody>
		);

		return (
			<MagazineBlock
				placeholderLabel={ __( 'Magazine Vertical', 'themezee-magazine-blocks' ) }
				placeholderIcon={ IconMagazineVertical }
				layoutSettings={ layoutSettings }
				magazineTemplate="magazine-vertical"
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
] )( MagazineVerticalEdit );

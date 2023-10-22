/**
 * External dependencies
 */
import map from 'lodash/map';

/**
 * WordPress dependencies
 */
import { compose } from '@wordpress/compose';
import { withSelect } from '@wordpress/data';
import { Component } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import {
	PanelBody,
	SelectControl,
} from '@wordpress/components';

/**
 * Internal dependencies
 */
import MagazineBlock from '../../components/magazine-block';
import { IconMagazineColumn } from '../../components/data/icons';

/**
 * Block Edit Component
 */
class MagazineColumnEdit extends Component {
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
				placeholderLabel={ __( 'Magazine Column', 'themezee-magazine-blocks' ) }
				placeholderIcon={ IconMagazineColumn }
				layoutSettings={ layoutSettings }
				magazineTemplate="magazine-column"
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
] )( MagazineColumnEdit );

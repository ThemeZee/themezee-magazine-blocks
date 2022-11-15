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

const {
	__,
	sprintf,
} = wp.i18n;

const {
	PanelBody,
	RangeControl,
	SelectControl,
	ToolbarGroup,
} = wp.components;

/**
 * Internal dependencies
 */
import MagazineBlock from '../../components/magazine-block';
import {
	IconMagazineHorizontal,
	IconNumberThree,
	IconNumberFour,
} from '../../components/data/icons';

/**
 * Block Edit Component
 */
class MagazineHorizontalEdit extends Component {
	render() {
		const {
			attributes,
			setAttributes,
			availableImageSizes,
		} = this.props;

		const {
			columns,
			imageSize,
			thumbnailSize,
		} = attributes;

		const columnIcons = {
			3: IconNumberThree,
			4: IconNumberFour,
		};

		const blockControls = (
			<ToolbarGroup
				controls={
					[ 3, 4 ].map( column => ( {
						icon: columnIcons[ column ],
						title: sprintf( __( '%s Columns', 'themezee-magazine-blocks' ), column ),
						isActive: column === columns,
						onClick: () => setAttributes( { columns: column } ),
					} ) )
				}
			/>
		);

		const layoutSettings = (
			<PanelBody title={ __( 'Layout Settings', 'themezee-magazine-blocks' ) } initialOpen={ false }>

				<RangeControl
					label={ __( 'Columns', 'themezee-magazine-blocks' ) }
					value={ columns }
					onChange={ ( value ) => setAttributes( { columns: value } ) }
					min={ 3 }
					max={ 4 }
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
				placeholderLabel={ __( 'Magazine Horizontal', 'themezee-magazine-blocks' ) }
				placeholderIcon={ IconMagazineHorizontal }
				blockControls={ blockControls }
				layoutSettings={ layoutSettings }
				magazineTemplate="magazine-horizontal"
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
] )( MagazineHorizontalEdit );

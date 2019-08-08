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
	BlockControls,
} = wp.editor;

const {
	PanelBody,
	RangeControl,
	SelectControl,
	Toolbar,
} = wp.components;

/**
 * Internal dependencies
 */
import MagazineBlock from '../../components/magazine-block';
import {
	IconMagazineGrid,
	IconNumberTwo,
	IconNumberThree,
	IconNumberFour,
} from '../../components/data/icons';

/**
 * Block Edit Component
 */
class MagazineGridEdit extends Component {
	render() {
		const {
			attributes,
			setAttributes,
			availableImageSizes,
		} = this.props;

		const {
			columns,
			imageSize,
		} = attributes;

		const columnIcons = {
			2: IconNumberTwo,
			3: IconNumberThree,
			4: IconNumberFour,
		};

		const blockControls = (
			<BlockControls key="controls">

				<Toolbar
					controls={
						[ 2, 3, 4 ].map( column => ( {
							icon: columnIcons[ column ],
							title: sprintf( __( '%s Columns', 'themezee-blocks' ), column ),
							isActive: column === columns,
							onClick: () => setAttributes( { columns: column } ),
						} ) )
					}
				/>

			</BlockControls>
		);

		const layoutSettings = (
			<PanelBody title={ __( 'Layout Settings', 'themezee-blocks' ) } initialOpen={ false }>

				<RangeControl
					label={ __( 'Columns', 'themezee-blocks' ) }
					value={ columns }
					onChange={ ( value ) => setAttributes( { columns: value } ) }
					min={ 2 }
					max={ 4 }
				/>

				<SelectControl
					label={ __( 'Image Size', 'themezee-blocks' ) }
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
				blockControls={ blockControls }
				layoutSettings={ layoutSettings }
				magazineBlockIcon={ IconMagazineGrid }
				magazineTemplate="magazine-grid"
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
] )( MagazineGridEdit );

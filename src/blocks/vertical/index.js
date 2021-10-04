/**
 * WordPress dependencies
 */
import { createBlock, registerBlockType } from '@wordpress/blocks';

/**
 * Internal dependencies
 */
import './style.scss';
import './editor.scss';
import metadata from './block.json';
import edit from './edit';
import { IconMagazineVertical } from '../../components/data/icons';

/**
 * Register block
 */
registerBlockType( metadata, {
	icon: IconMagazineVertical,

	transforms: {
		to: [
			{
				type: 'block',
				blocks: [ 'themezee-magazine-blocks/columns' ],
				transform: ( attributes ) => {
					return createBlock(
						'themezee-magazine-blocks/columns',
						{},
						[
							createBlock( 'themezee-magazine-blocks/column', { ...attributes } ),
							createBlock( 'themezee-magazine-blocks/column', { ...attributes } ),
						],
					);
				},
			},
			{
				type: 'block',
				blocks: [ 'themezee-magazine-blocks/grid' ],
				transform: ( attributes ) => {
					return createBlock( 'themezee-magazine-blocks/grid', { ...attributes } );
				},
			},
			{
				type: 'block',
				blocks: [ 'themezee-magazine-blocks/horizontal' ],
				transform: ( attributes ) => {
					return createBlock( 'themezee-magazine-blocks/horizontal', { ...attributes } );
				},
			},
			{
				type: 'block',
				blocks: [ 'themezee-magazine-blocks/list' ],
				transform: ( attributes ) => {
					return createBlock( 'themezee-magazine-blocks/list', { ...attributes } );
				},
			},
		],
	},

	edit,

	// Block is rendered server-side.
	save: () => {},

	deprecated: [
		{
			attributes: {
				...metadata.attributes,
				categories: {
					type: 'string',
				},
			},

			supports: {
				html: false,
			},

			migrate( oldAttributes ) {
				return {
					...oldAttributes,
					categories: [ oldAttributes.categories ].map( ( cat ) => parseInt( cat ) ),
				};
			},

			isEligible: ( { categories } ) => {
				return categories && 'string' === typeof categories;
			},

			save: () => {},
		},
	],
} );

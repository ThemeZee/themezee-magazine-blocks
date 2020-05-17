/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { createBlock, registerBlockType } = wp.blocks;

/**
 * Internal dependencies
 */
import './style.scss';
import './editor.scss';
import blockAttributes from './attributes';
import edit from './edit';
import { IconMagazineGrid } from '../../components/data/icons';

/**
 * Register block
 */
registerBlockType(
	'themezee-magazine-blocks/grid',
	{
		title: __( 'Magazine Grid', 'themezee-magazine-blocks' ),

		description: __( 'Displays your latest posts in a grid layout.', 'themezee-magazine-blocks' ),

		category: 'themezee-magazine-blocks',

		icon: IconMagazineGrid,

		attributes: blockAttributes,

		keywords: [
			__( 'Posts', 'themezee-magazine-blocks' ),
			__( 'Magazine Grid', 'themezee-magazine-blocks' ),
			__( 'ThemeZee', 'themezee-magazine-blocks' ),
		],

		supports: {
			html: false,
		},

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
				{
					type: 'block',
					blocks: [ 'themezee-magazine-blocks/vertical' ],
					transform: ( attributes ) => {
						return createBlock( 'themezee-magazine-blocks/vertical', { ...attributes } );
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
					...blockAttributes,
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
	},
);

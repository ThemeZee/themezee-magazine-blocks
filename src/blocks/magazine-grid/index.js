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
import edit from './edit';
import { IconMagazineGrid } from '../../components/data/icons';

/**
 * Register block
 */
registerBlockType(
	'themezee-blocks/magazine-grid',
	{
		title: __( 'Magazine Grid', 'themezee-blocks' ),

		description: __( 'Displays your latest posts in a grid layout.', 'themezee-blocks' ),

		category: 'themezee-blocks',

		icon: IconMagazineGrid,

		keywords: [
			__( 'Posts', 'themezee-blocks' ),
			__( 'Magazine Grid', 'themezee-blocks' ),
			__( 'ThemeZee', 'themezee-blocks' ),
		],

		supports: {
			html: false,
		},

		transforms: {
			to: [
				{
					type: 'block',
					blocks: [ 'themezee-blocks/magazine-horizontal' ],
					transform: ( attributes ) => {
						return createBlock( 'themezee-blocks/magazine-horizontal', { ...attributes } );
					},
				},
				{
					type: 'block',
					blocks: [ 'themezee-blocks/magazine-list' ],
					transform: ( attributes ) => {
						return createBlock( 'themezee-blocks/magazine-list', { ...attributes } );
					},
				},
				{
					type: 'block',
					blocks: [ 'themezee-blocks/magazine-vertical' ],
					transform: ( attributes ) => {
						return createBlock( 'themezee-blocks/magazine-vertical', { ...attributes } );
					},
				},
			],
		},

		edit,

		// Block is rendered server-side.
		save: () => {},
	},
);

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
import { IconMagazineVertical } from '../../components/data/icons';

/**
 * Register block
 */
registerBlockType(
	'themezee-blocks/magazine-vertical',
	{
		title: __( 'Magazine Vertical', 'themezee-blocks' ),

		description: __( 'Displays your latest posts in a vertical box.', 'themezee-blocks' ),

		category: 'themezee-blocks',

		icon: IconMagazineVertical,

		keywords: [
			__( 'Posts', 'themezee-blocks' ),
			__( 'Box', 'themezee-blocks' ),
			__( 'ThemeZee', 'themezee-blocks' ),
		],

		supports: {
			html: false,
		},

		transforms: {
			to: [
				{
					type: 'block',
					blocks: [ 'themezee-blocks/magazine-grid' ],
					transform: ( attributes ) => {
						return createBlock( 'themezee-blocks/magazine-grid', { ...attributes } );
					},
				},
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
			],
		},

		edit,

		// Block is rendered server-side.
		save: () => {},
	},
);

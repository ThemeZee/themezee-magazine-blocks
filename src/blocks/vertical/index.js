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
	'themezee-magazine-blocks/vertical',
	{
		title: __( 'Magazine Vertical', 'themezee-magazine-blocks' ),

		description: __( 'Displays your latest posts in a vertical box.', 'themezee-magazine-blocks' ),

		category: 'themezee-magazine-blocks',

		icon: IconMagazineVertical,

		keywords: [
			__( 'Posts', 'themezee-magazine-blocks' ),
			__( 'Box', 'themezee-magazine-blocks' ),
			__( 'ThemeZee', 'themezee-magazine-blocks' ),
		],

		supports: {
			html: false,
		},

		transforms: {
			to: [
				{
					type: 'block',
					blocks: [ 'themezee-magazine-blocks/magazine-columns' ],
					transform: ( attributes ) => {
						return createBlock(
							'themezee-magazine-blocks/magazine-columns',
							{},
							[
								createBlock( 'themezee-magazine-blocks/magazine-column', { ...attributes } ),
								createBlock( 'themezee-magazine-blocks/magazine-column', { ...attributes } ),
							],
						);
					},
				},
				{
					type: 'block',
					blocks: [ 'themezee-magazine-blocks/magazine-grid' ],
					transform: ( attributes ) => {
						return createBlock( 'themezee-magazine-blocks/magazine-grid', { ...attributes } );
					},
				},
				{
					type: 'block',
					blocks: [ 'themezee-magazine-blocks/magazine-horizontal' ],
					transform: ( attributes ) => {
						return createBlock( 'themezee-magazine-blocks/magazine-horizontal', { ...attributes } );
					},
				},
				{
					type: 'block',
					blocks: [ 'themezee-magazine-blocks/magazine-list' ],
					transform: ( attributes ) => {
						return createBlock( 'themezee-magazine-blocks/magazine-list', { ...attributes } );
					},
				},
			],
		},

		edit,

		// Block is rendered server-side.
		save: () => {},
	},
);

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
import { IconMagazineHorizontal } from '../../components/data/icons';

/**
 * Register block
 */
registerBlockType(
	'themezee-blocks/magazine-horizontal',
	{
		title: __( 'Magazine Horizontal', 'themezee-blocks' ),

		description: __( 'Displays your latest posts in a horizontal box.', 'themezee-blocks' ),

		category: 'themezee-blocks',

		icon: IconMagazineHorizontal,

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
					blocks: [ 'themezee-blocks/magazine-columns' ],
					transform: ( attributes ) => {
						return createBlock(
							'themezee-blocks/magazine-columns',
							{},
							[
								createBlock( 'themezee-blocks/magazine-column', { ...attributes } ),
								createBlock( 'themezee-blocks/magazine-column', { ...attributes } ),
							],
						);
					},
				},
				{
					type: 'block',
					blocks: [ 'themezee-blocks/magazine-grid' ],
					transform: ( attributes ) => {
						return createBlock( 'themezee-blocks/magazine-grid', { ...attributes } );
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

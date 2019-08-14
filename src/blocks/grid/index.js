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
	'themezee-magazine-blocks/grid',
	{
		title: __( 'Magazine Grid', 'themezee-magazine-blocks' ),

		description: __( 'Displays your latest posts in a grid layout.', 'themezee-magazine-blocks' ),

		category: 'themezee-magazine-blocks',

		icon: IconMagazineGrid,

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
				{
					type: 'block',
					blocks: [ 'themezee-magazine-blocks/magazine-vertical' ],
					transform: ( attributes ) => {
						return createBlock( 'themezee-magazine-blocks/magazine-vertical', { ...attributes } );
					},
				},
			],
		},

		edit,

		// Block is rendered server-side.
		save: () => {},
	},
);

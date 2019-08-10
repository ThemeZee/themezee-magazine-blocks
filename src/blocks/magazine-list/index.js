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
import { IconMagazineList } from '../../components/data/icons';

/**
 * Register block
 */
registerBlockType(
	'themezee-blocks/magazine-list',
	{
		title: __( 'Magazine List', 'themezee-blocks' ),

		description: __( 'Displays your latest posts in a list layout.', 'themezee-blocks' ),

		category: 'themezee-blocks',

		icon: IconMagazineList,

		keywords: [
			__( 'Posts', 'themezee-blocks' ),
			__( 'Magazine', 'themezee-blocks' ),
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
					blocks: [ 'themezee-blocks/magazine-horizontal' ],
					transform: ( attributes ) => {
						return createBlock( 'themezee-blocks/magazine-horizontal', { ...attributes } );
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

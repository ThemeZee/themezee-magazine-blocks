/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;

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

		edit,

		// Block is rendered server-side.
		save: () => {},
	},
);

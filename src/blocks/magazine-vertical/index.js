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

		edit,

		// Block is rendered server-side.
		save: () => {},
	},
);

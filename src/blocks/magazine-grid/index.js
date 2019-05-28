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
import { IconMagazineGrid } from '../../components/icons';

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

		edit,

		// Block is rendered server-side.
		save: () => {},
	},
);

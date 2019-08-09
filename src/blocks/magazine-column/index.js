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
import { IconMagazineColumn } from '../../components/data/icons';

/**
 * Register block
 */
registerBlockType(
	'themezee-blocks/magazine-column',
	{
		title: __( 'Magazine Column', 'themezee-blocks' ),

		description: __( 'Displays your posts in a list with the first post highlighted.', 'themezee-blocks' ),

		category: 'themezee-blocks',

		icon: IconMagazineColumn,

		keywords: [
			__( 'Posts', 'themezee-blocks' ),
			__( 'Box', 'themezee-blocks' ),
			__( 'ThemeZee', 'themezee-blocks' ),
		],

		supports: {
			html: false,
			inserter: false,
		},

		edit,

		// Block is rendered server-side.
		save: () => {},
	},
);

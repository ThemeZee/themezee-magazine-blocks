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

		edit,

		// Block is rendered server-side.
		save: () => {},
	},
);

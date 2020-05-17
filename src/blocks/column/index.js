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
import blockAttributes from './attributes';
import edit from './edit';
import { IconMagazineColumn } from '../../components/data/icons';

/**
 * Register block
 */
registerBlockType(
	'themezee-magazine-blocks/column',
	{
		title: __( 'Magazine Column', 'themezee-magazine-blocks' ),

		description: __( 'Displays your posts in a list with the first post highlighted.', 'themezee-magazine-blocks' ),

		category: 'themezee-magazine-blocks',

		icon: IconMagazineColumn,

		attributes: blockAttributes,

		keywords: [
			__( 'Posts', 'themezee-magazine-blocks' ),
			__( 'Box', 'themezee-magazine-blocks' ),
			__( 'ThemeZee', 'themezee-magazine-blocks' ),
		],

		supports: {
			html: false,
			inserter: false,
		},

		edit,

		// Block is rendered server-side.
		save: () => {},

		deprecated: [
			{
				attributes: {
					...blockAttributes,
					categories: {
						type: 'string',
					},
				},

				supports: {
					html: false,
				},

				migrate( oldAttributes ) {
					return {
						...oldAttributes,
						categories: [ oldAttributes.categories ].map( ( cat ) => parseInt( cat ) ),
					};
				},

				isEligible: ( { categories } ) => {
					return categories && 'string' === typeof categories;
				},

				save: () => {},
			},
		],
	},
);

/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { createBlock, registerBlockType } = wp.blocks;
const { InnerBlocks } = wp.blockEditor;

/**
 * Internal dependencies
 */
import './style.scss';
import './editor.scss';
import edit from './edit';
import { IconMagazineColumns } from '../../components/data/icons';

/**
 * Register block
 */
registerBlockType(
	'themezee-magazine-blocks/columns',
	{
		title: __( 'Magazine Columns', 'themezee-magazine-blocks' ),

		description: __( 'Displays your latest posts in two separate columns.', 'themezee-magazine-blocks' ),

		category: 'themezee-magazine-blocks',

		icon: IconMagazineColumns,

		keywords: [
			__( 'Posts', 'themezee-magazine-blocks' ),
			__( 'Columns', 'themezee-magazine-blocks' ),
			__( 'ThemeZee', 'themezee-magazine-blocks' ),
		],

		transforms: {
			to: [
				{
					type: 'block',
					blocks: [ 'themezee-magazine-blocks/grid' ],
					transform: ( attributes, innerBlocks ) => {
						const childAttributes = innerBlocks[ 0 ] ? innerBlocks[ 0 ].attributes : null;
						return createBlock( 'themezee-magazine-blocks/grid', { ...childAttributes } );
					},
				},
				{
					type: 'block',
					blocks: [ 'themezee-magazine-blocks/horizontal' ],
					transform: ( attributes, innerBlocks ) => {
						const childAttributes = innerBlocks[ 0 ] ? innerBlocks[ 0 ].attributes : null;
						return createBlock( 'themezee-magazine-blocks/horizontal', { ...childAttributes } );
					},
				},
				{
					type: 'block',
					blocks: [ 'themezee-magazine-blocks/list' ],
					transform: ( attributes, innerBlocks ) => {
						const childAttributes = innerBlocks[ 0 ] ? innerBlocks[ 0 ].attributes : null;
						return createBlock( 'themezee-magazine-blocks/list', { ...childAttributes } );
					},
				},
				{
					type: 'block',
					blocks: [ 'themezee-magazine-blocks/vertical' ],
					transform: ( attributes, innerBlocks ) => {
						const childAttributes = innerBlocks[ 0 ] ? innerBlocks[ 0 ].attributes : null;
						return createBlock( 'themezee-magazine-blocks/vertical', { ...childAttributes } );
					},
				},
			],
		},

		edit,

		save( { className } ) {
			const blockClasses = classnames( className, 'tz-magazine-block' );

			return (
				<div className={ blockClasses }>
					<div className="tz-magazine-columns">

						<InnerBlocks.Content />

					</div>
				</div>
			);
		},
	},
);

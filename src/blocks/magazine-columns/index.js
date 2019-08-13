/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { createBlock, registerBlockType } = wp.blocks;
const { InnerBlocks } = wp.editor;

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
	'themezee-blocks/magazine-columns',
	{
		title: __( 'Magazine Columns', 'themezee-blocks' ),

		description: __( 'Displays your latest posts in two separate columns.', 'themezee-blocks' ),

		category: 'themezee-blocks',

		icon: IconMagazineColumns,

		keywords: [
			__( 'Posts', 'themezee-blocks' ),
			__( 'Columns', 'themezee-blocks' ),
			__( 'ThemeZee', 'themezee-blocks' ),
		],

		transforms: {
			to: [
				{
					type: 'block',
					blocks: [ 'themezee-blocks/magazine-grid' ],
					transform: ( attributes, innerBlocks ) => {
						const childAttributes = innerBlocks[ 0 ] ? innerBlocks[ 0 ].attributes : null;
						return createBlock( 'themezee-blocks/magazine-grid', { ...childAttributes } );
					},
				},
				{
					type: 'block',
					blocks: [ 'themezee-blocks/magazine-horizontal' ],
					transform: ( attributes, innerBlocks ) => {
						const childAttributes = innerBlocks[ 0 ] ? innerBlocks[ 0 ].attributes : null;
						return createBlock( 'themezee-blocks/magazine-horizontal', { ...childAttributes } );
					},
				},
				{
					type: 'block',
					blocks: [ 'themezee-blocks/magazine-list' ],
					transform: ( attributes, innerBlocks ) => {
						const childAttributes = innerBlocks[ 0 ] ? innerBlocks[ 0 ].attributes : null;
						return createBlock( 'themezee-blocks/magazine-list', { ...childAttributes } );
					},
				},
				{
					type: 'block',
					blocks: [ 'themezee-blocks/magazine-vertical' ],
					transform: ( attributes, innerBlocks ) => {
						const childAttributes = innerBlocks[ 0 ] ? innerBlocks[ 0 ].attributes : null;
						return createBlock( 'themezee-blocks/magazine-vertical', { ...childAttributes } );
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

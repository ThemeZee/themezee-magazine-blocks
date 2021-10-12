/**
 * WordPress dependencies
 */
import { createBlock } from '@wordpress/blocks';

const transforms = {
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
};

export default transforms;

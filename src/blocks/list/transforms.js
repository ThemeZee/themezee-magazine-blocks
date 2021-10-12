/**
 * WordPress dependencies
 */
import { createBlock } from '@wordpress/blocks';

const transforms = {
	to: [
		{
			type: 'block',
			blocks: [ 'themezee-magazine-blocks/columns' ],
			transform: ( attributes ) => {
				return createBlock(
					'themezee-magazine-blocks/columns',
					{},
					[
						createBlock( 'themezee-magazine-blocks/column', { ...attributes } ),
						createBlock( 'themezee-magazine-blocks/column', { ...attributes } ),
					],
				);
			},
		},
		{
			type: 'block',
			blocks: [ 'themezee-magazine-blocks/grid' ],
			transform: ( attributes ) => {
				return createBlock( 'themezee-magazine-blocks/grid', { ...attributes } );
			},
		},
		{
			type: 'block',
			blocks: [ 'themezee-magazine-blocks/horizontal' ],
			transform: ( attributes ) => {
				return createBlock( 'themezee-magazine-blocks/horizontal', { ...attributes } );
			},
		},
		{
			type: 'block',
			blocks: [ 'themezee-magazine-blocks/vertical' ],
			transform: ( attributes ) => {
				return createBlock( 'themezee-magazine-blocks/vertical', { ...attributes } );
			},
		},
	],
};

export default transforms;

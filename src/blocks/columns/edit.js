/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
import {
	InnerBlocks,
	useBlockProps,
} from '@wordpress/block-editor';

function MagazineColumnsEdit( { className } ) {
	const blockProps = useBlockProps( {
		className: classnames( className, 'tz-magazine-block' ),
	} );

	return (
		<div { ...blockProps }>
			<div className="tz-magazine-columns">

				<InnerBlocks
					template={ [
						[ 'themezee-magazine-blocks/column', {} ],
						[ 'themezee-magazine-blocks/column', {} ],
					] }
					templateLock={ true }
					allowedBlocks={ [ 'themezee-magazine-blocks/column' ] }
				/>

			</div>
		</div>
	);
}

export default MagazineColumnsEdit;

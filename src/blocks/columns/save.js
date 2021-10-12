/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
const {
	InnerBlocks,
	useBlockProps,
} = wp.blockEditor;

function MagazineColumnsSave( { className } ) {
	const blockProps = useBlockProps.save( {
		className: classnames( className, 'tz-magazine-block' ),
	} );

	return (
		<div { ...blockProps }>
			<div className="tz-magazine-columns">

				<InnerBlocks.Content />

			</div>
		</div>
	);
}

export default MagazineColumnsSave;

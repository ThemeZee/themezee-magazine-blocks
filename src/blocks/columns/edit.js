/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
const { Component } = wp.element;
const { InnerBlocks } = wp.blockEditor;

/**
 * Block Edit Component
 */
class MagazineColumnsEdit extends Component {
	render() {
		const {
			className,
		} = this.props;

		const blockClasses = classnames( className, 'tz-magazine-block' );

		return (
			<div className={ blockClasses }>
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
}

export default MagazineColumnsEdit;

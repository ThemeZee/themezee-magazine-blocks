/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
const { Component } = wp.element;
const { InnerBlocks } = wp.editor;

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
							[ 'themezee-blocks/magazine-column', {} ],
							[ 'themezee-blocks/magazine-column', {} ],
						] }
						templateLock={ true }
						allowedBlocks={ [ 'themezee-blocks/magazine-column' ] }
					/>

				</div>
			</div>
		);
	}
}

export default MagazineColumnsEdit;

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
 * Block Save Component
 */
class MagazineColumnsSave extends Component {
	render() {
		const {
			className,
		} = this.props;

		const blockClasses = classnames( className, 'tz-magazine-block' );

		return (
			<div className={ blockClasses }>
				<div className="tz-magazine-columns">

					<InnerBlocks.Content />

				</div>
			</div>
		);
	}
}

export default MagazineColumnsSave;

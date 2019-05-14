/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { Component, RawHTML } = wp.element;

/**
 * Internal dependencies
 */
import './style.scss';

class MagazinePost extends Component {
	render() {
		const { post } = this.props;

		const titleTrimmed = post.title.rendered.trim();
		return (
			<div className="tz-post-wrap">
				{ titleTrimmed ? (
					<RawHTML>
						{ titleTrimmed }
					</RawHTML>
				) :
					__( '(Untitled)' )
				}
			</div>
		);
	}
}

export default MagazinePost;

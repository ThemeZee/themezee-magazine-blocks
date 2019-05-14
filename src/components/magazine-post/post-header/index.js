/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { Component, RawHTML } = wp.element;

/**
 * Internal dependencies
 */
import './style.scss';

class PostHeader extends Component {
	render() {
		const {
			post,
		} = this.props;

		const titleTrimmed = post.title.rendered.trim();

		return (
			<header className="tz-entry-header entry-header">

				<h2 className="tz-entry-title entry-title">
					<a href={ post.link } target="_blank" rel="noreferrer noopener">
						{ titleTrimmed ? (
							<RawHTML>
								{ titleTrimmed }
							</RawHTML>
						) :
							__( '(Untitled)' )
						}
					</a>
				</h2>

			</header>
		);
	}
}

export default PostHeader;

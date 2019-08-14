/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { Component, RawHTML } = wp.element;

class EntryTitle extends Component {
	render() {
		const {
			post,
		} = this.props;

		const titleTrimmed = post.title.rendered.trim();

		return (
			<h2 className="tz-entry-title entry-title">
				<a href={ post.link } target="_blank" rel="noreferrer noopener">
					{ titleTrimmed ? (
						<RawHTML>
							{ titleTrimmed }
						</RawHTML>
					) :
						__( '(Untitled)', 'themezee-magazine-blocks' )
					}
				</a>
			</h2>
		);
	}
}

export default EntryTitle;

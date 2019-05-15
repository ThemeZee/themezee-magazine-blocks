/**
 * WordPress dependencies
 */
const { Component, RawHTML } = wp.element;

class EntryContent extends Component {
	render() {
		const {
			post,
		} = this.props;

		let excerpt = post.excerpt.rendered;
		if ( post.excerpt.raw === '' ) {
			excerpt = post.content.raw;
		}

		return (
			<div className="tz-entry-content entry-content">

				<RawHTML
					key="html"
				>
					{ excerpt }
				</RawHTML>

			</div>
		);
	}
}

export default EntryContent;

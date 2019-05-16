/**
 * WordPress dependencies
 */
const { Component, RawHTML } = wp.element;

class EntryContent extends Component {
	render() {
		const {
			attributes,
			post,
		} = this.props;

		const {
			excerptLength,
			moreText,
		} = attributes;

		let excerpt = post.excerpt.rendered;

		// Use post content if no manual excerpt exists.
		if ( post.excerpt.raw === '' ) {
			excerpt = post.content.raw;
		}

		// Set excerpt more text if excerpt needs to be shortened.
		const excerptMore = excerptLength < excerpt.trim().split( ' ' ).length ? ' [...] ' : '';

		// Shorten the excerpt.
		excerpt = excerpt.trim().split( ' ', excerptLength ).join( ' ' );

		// Return early if we have no excerpt.
		if ( excerpt.length <= 0 ) {
			return null;
		}

		return (
			<div className="tz-entry-content entry-content">

				<RawHTML
					key="html"
				>
					{ excerpt + excerptMore }
				</RawHTML>

				{ '' !== moreText && (
					<p className="tz-read-more read-more">
						<a className="tz-more-link more-link" href={ post.link } target="_blank" rel="noopener noreferrer">
							{ moreText }
						</a>
					</p>
				) }

			</div>
		);
	}
}

export default EntryContent;

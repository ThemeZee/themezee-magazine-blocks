/**
 * WordPress dependencies
 */
const { Component } = wp.element;

/**
 * Internal dependencies
 */
import MetaDate from '../meta/meta-date.js';
import MetaAuthor from '../meta/meta-author.js';

class EntryMeta extends Component {
	render() {
		const {
			attributes,
			post,
		} = this.props;

		const {
			showDate,
			showAuthor,
			showCategories,
			showComments,
		} = attributes;

		return (
			<div className="tz-entry-meta entry-meta">

				{ showDate && (
					<MetaDate post={ post } attributes={ attributes } />
				) }

				{ showAuthor && (
					<MetaAuthor post={ post } attributes={ attributes } />
				) }

			</div>
		);
	}
}

export default EntryMeta;

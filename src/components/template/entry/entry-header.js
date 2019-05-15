/**
 * WordPress dependencies
 */
const { Component } = wp.element;

/**
 * Internal dependencies
 */
import EntryTitle from './entry-title.js';
import EntryMeta from './entry-meta.js';

class EntryHeader extends Component {
	render() {
		const {
			attributes,
			post,
		} = this.props;

		const {
			metaPosition,
			showDate,
			showAuthor,
			showCategories,
			showComments,
		} = attributes;

		const showMeta = showDate || showAuthor || showCategories || showComments;

		return (
			<header className="tz-entry-header entry-header">

				{ ( 'above-title' === metaPosition && showMeta ) && (
					<EntryMeta post={ post } attributes={ attributes } />
				) }

				<EntryTitle post={ post } attributes={ attributes } />

				{ ( 'below-title' === metaPosition && showMeta ) && (
					<EntryMeta post={ post } attributes={ attributes } />
				) }

			</header>
		);
	}
}

export default EntryHeader;

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

		return (
			<header className="tz-entry-header entry-header">

				<EntryTitle post={ post } attributes={ attributes } />

				<EntryMeta post={ post } attributes={ attributes } />

			</header>
		);
	}
}

export default EntryHeader;

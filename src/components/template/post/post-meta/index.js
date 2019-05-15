/**
 * WordPress dependencies
 */
const { Component } = wp.element;

/**
 * Internal dependencies
 */
import MetaDate from '../../meta/meta-date.js';
import MetaAuthor from '../../meta/meta-author.js';

class PostMeta extends Component {
	render() {
		const {
			attributes,
			post,
		} = this.props;

		return (
			<div className="tz-entry-meta entry-meta">

				<MetaDate post={ post } attributes={ attributes } />

				<MetaAuthor post={ post } attributes={ attributes } />

			</div>
		);
	}
}

export default PostMeta;

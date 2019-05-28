/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
const { Component } = wp.element;

/**
 * Internal dependencies
 */
import EntryImage from '../entry/entry-image.js';
import EntryHeader from '../entry/entry-header.js';

class ThumbnailPost extends Component {
	getPostClasses() {
		const { post } = this.props;

		const postClasses = classnames(
			'tz-magazine-post',
			`post-${ post.id }`,
			post.type,
			`type-${ post.type }`,
		);

		return postClasses;
	}

	render() {
		const {
			attributes,
			post,
		} = this.props;

		const postID = `post-${ post.id }`;
		const postClasses = this.getPostClasses();

		return (
			<div className="tz-post-wrap">
				<article id={ postID } className={ postClasses }>

					<div className="tz-post-image">
						<EntryImage post={ post } attributes={ attributes } />
					</div>

					<div className="tz-post-content">
						<EntryHeader post={ post } attributes={ attributes } />
					</div>

				</article>
			</div>
		);
	}
}

export default ThumbnailPost;

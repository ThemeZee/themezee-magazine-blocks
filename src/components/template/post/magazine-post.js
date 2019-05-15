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
import EntryContent from '../entry/entry-content.js';

class MagazinePost extends Component {
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

					<EntryImage post={ post } attributes={ attributes } />
					<EntryHeader post={ post } attributes={ attributes } />
					<EntryContent post={ post } attributes={ attributes } />

				</article>
			</div>
		);
	}
}

export default MagazinePost;

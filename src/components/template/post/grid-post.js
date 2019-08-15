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

class GridPost extends Component {
	getPostClasses() {
		const { post } = this.props;

		const postClasses = classnames(
			'tz-magazine-post',
			`post-${ post.id }`,
			post.type,
			`tz-type-${ post.type }`,
		);

		return postClasses;
	}

	render() {
		const {
			attributes,
			post,
			imageSize,
			showContent,
		} = this.props;

		const postID = `post-${ post.id }`;
		const postClasses = this.getPostClasses();

		return (
			<div className="tz-post-wrap">
				<article id={ postID } className={ postClasses }>

					<EntryImage post={ post } imageSize={ imageSize } />
					<EntryHeader post={ post } attributes={ attributes } />

					{ showContent && (
						<EntryContent post={ post } attributes={ attributes } />
					) }

				</article>
			</div>
		);
	}
}

export default GridPost;

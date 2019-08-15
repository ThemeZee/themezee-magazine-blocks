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

class ListPost extends Component {
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

					<div className="tz-post-image">
						<EntryImage post={ post } imageSize={ imageSize } />
					</div>

					<div className="tz-post-content">
						<EntryHeader post={ post } attributes={ attributes } />

						{ showContent && (
							<EntryContent post={ post } attributes={ attributes } />
						) }
					</div>

				</article>
			</div>
		);
	}
}

export default ListPost;

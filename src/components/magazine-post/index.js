/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { Component, RawHTML } = wp.element;

/**
 * Internal dependencies
 */
import PostImage from './post-image';
import './style.scss';

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

		const titleTrimmed = post.title.rendered.trim();

		return (
			<div className="tz-post-wrap">
				<article id={ postID } className={ postClasses }>

					<PostImage post={ post } attributes={ attributes } />

					{ titleTrimmed ? (
						<RawHTML>
							{ titleTrimmed }
						</RawHTML>
					) :
						__( '(Untitled)' )
					}

				</article>
			</div>
		);
	}
}

export default MagazinePost;

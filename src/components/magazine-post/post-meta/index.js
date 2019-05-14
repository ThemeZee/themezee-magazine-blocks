/**
 * WordPress dependencies
 */
const { Component } = wp.element;
const {
	dateI18n,
	format,
	__experimentalGetSettings,
} = wp.date;

/**
 * Internal dependencies
 */
import './style.scss';

class PostMeta extends Component {
	render() {
		const {
			post,
		} = this.props;

		// eslint-disable-next-line no-restricted-syntax
		const dateFormat = __experimentalGetSettings().formats.date;

		return (
			<div className="tz-entry-meta entry-meta">

				<span className="tz-meta-date meta-date">
					<a href={ post.link } target="_blank" rel="noreferrer noopener">
						<time dateTime={ format( 'c', post.date_gmt ) } className="tz-entry-date entry-date published updated">
							{ dateI18n( dateFormat, post.date_gmt ) }
						</time>
					</a>
				</span>

				<span className="tz-meta-author meta-author">
					<span className="author vcard">
						<a className="url fn n" href="%1$s" rel="author">
							{ post.author }
						</a>
					</span>
				</span>

			</div>
		);
	}
}

export default PostMeta;

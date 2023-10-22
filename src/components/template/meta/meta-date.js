/**
 * WordPress dependencies
 */
import { Component } from '@wordpress/element';
import {
	dateI18n,
	format,
	getSettings,
} from '@wordpress/date';

class MetaDate extends Component {
	render() {
		const {
			post,
		} = this.props;

		// eslint-disable-next-line no-restricted-syntax
		const dateFormat = getSettings().formats.date;

		return (
			<span className="tz-meta-date meta-date tz-meta-field">
				<a href={ post.link } target="_blank" rel="noreferrer noopener">
					<time dateTime={ format( 'c', post.date_gmt ) } className="published updated">
						{ dateI18n( dateFormat, post.date_gmt ) }
					</time>
				</a>
			</span>
		);
	}
}

export default MetaDate;

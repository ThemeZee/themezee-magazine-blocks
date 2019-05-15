/**
 * WordPress dependencies
 */
const { Component } = wp.element;

class MetaAuthor extends Component {
	render() {
		const {
			post,
		} = this.props;

		return (
			<span className="tz-meta-author meta-author">
				<span className="author vcard">
					<a className="url fn n" href="%1$s" rel="author">
						{ post.author }
					</a>
				</span>
			</span>
		);
	}
}

export default MetaAuthor;

/**
 * WordPress dependencies
 */
const { Component } = wp.element;
const { __, sprintf } = wp.i18n;
const { apiFetch } = wp;
const { addQueryArgs } = wp.url;

class MetaComments extends Component {
	constructor() {
		super( ...arguments );
		this.state = {
			commentCount: 0,
		};
	}

	componentDidMount() {
		const postId = this.props.post.id;
		this.isStillMounted = true;

		this.fetchRequest = apiFetch( {
			path: addQueryArgs( '/wp/v2/comments', { post: postId } ),
		} ).then(
			( commentList ) => {
				if ( this.isStillMounted ) {
					this.setState( { commentCount: commentList.length } );
				}
			}
		).catch(
			() => {
				if ( this.isStillMounted ) {
					this.setState( { commentCount: 0 } );
				}
			}
		);
	}

	componentWillUnmount() {
		this.isStillMounted = false;
	}

	render() {
		const { post } = this.props;
		const { commentCount } = this.state;
		let comments;

		if ( commentCount < 1 && 'open' === post.comment_status ) {
			comments = __( 'Leave a comment', 'themezee-magazine-blocks' );
		} else if ( commentCount < 1 && 'open' !== post.comment_status ) {
			comments = __( 'Comments off', 'themezee-magazine-blocks' );
		} else if ( commentCount === 1 ) {
			comments = __( 'One comment', 'themezee-magazine-blocks' );
		} else {
			comments = sprintf( __( '%s comments' ), commentCount );
		}

		return (
			<span className="tz-meta-comments meta-comments tz-meta-field">
				<a href={ post.link + '#comments' } target="_blank" rel="noreferrer noopener">
					{ comments }
				</a>
			</span>
		);
	}
}

export default MetaComments;

/**
 * WordPress dependencies
 */
const { Component } = wp.element;

/**
 * Internal dependencies
 */
import GridPost from '../post/grid-post';
import ListPost from '../post/list-post';

class MagazineVertical extends Component {
	render() {
		const {
			posts,
			attributes,
		} = this.props;

		return (
			<div className="tz-magazine-vertical">

				<div className="tz-magazine-highlight-post">
					<GridPost
						post={ posts[ '0' ] }
						attributes={ attributes }
						imageSize={ attributes.imageSize }
						showContent={ true }
					/>
				</div>

				<div className="tz-magazine-thumbnail-list">
					{ posts.map( ( post, i ) => {
						if ( 0 !== i ) {
							return (
								<ListPost
									key={ i }
									post={ post }
									attributes={ attributes }
									imageSize={ attributes.thumbnailSize }
									showContent={ false }
								/>
							);
						}
					} ) }
				</div>

			</div>
		);
	}
}

export default MagazineVertical;

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
import GridPost from '../post/grid-post';
import ListPost from '../post/list-post';

class MagazineHorizontal extends Component {
	render() {
		const {
			posts,
			attributes,
		} = this.props;

		const { columns } = attributes;

		const columnClasses = classnames( 'tz-magazine-grid-columns', {
			[ `tz-magazine-grid-columns-${ columns }` ]: columns,
		} );

		return (
			<div className="tz-magazine-horizontal">

				<div className="tz-magazine-highlight-post">
					<ListPost
						post={ posts[ '0' ] }
						attributes={ attributes }
						imageSize={ attributes.imageSize }
						showContent={ true }
					/>
				</div>

				<div className={ columnClasses }>
					{ posts.map( ( post, i ) => {
						if ( 0 !== i ) {
							return (
								<GridPost
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

export default MagazineHorizontal;

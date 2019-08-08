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

class MagazineHorizontal extends Component {
	render() {
		const {
			posts,
			attributes,
		} = this.props;

		const { columns } = attributes;

		const columnClasses = classnames( 'tz-magazine-columns', {
			[ `tz-magazine-columns-${ columns }` ]: columns,
		} );

		return (
			<div className={ columnClasses }>

				{ posts.map( ( post, i ) =>
					<GridPost
						key={ i }
						post={ post }
						attributes={ attributes }
						imageSize={ attributes.imageSize }
						showContent={ true }
					/>
				) }

			</div>
		);
	}
}

export default MagazineHorizontal;

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
import ListPost from '../post/list-post';

class MagazineList extends Component {
	render() {
		const {
			posts,
			attributes,
		} = this.props;

		const { layout } = attributes;

		const listClasses = classnames( 'tz-magazine-list', {
			[ `tz-magazine-list-${ layout }` ]: layout,
		} );

		return (
			<div className={ listClasses }>

				{ posts.map( ( post, i ) =>
					<ListPost
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

export default MagazineList;

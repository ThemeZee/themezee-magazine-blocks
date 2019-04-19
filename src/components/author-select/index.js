/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { compose } = wp.compose;
const { withSelect } = wp.data;
const { Component } = wp.element;
const { TreeSelect } = wp.components;

/**
 * Internal dependencies
 */
import './style.scss';

class AuthorSelect extends Component {
	render() {
		const {
			authorList,
			selectedAuthorId,
			onAuthorChange,
		} = this.props;

		return (
			onAuthorChange && (
				<TreeSelect
					key="tz-author-select"
					label={ __( 'Author', 'themezee-blocks' ) }
					noOptionLabel={ __( 'All Authors', 'themezee-blocks' ) }
					tree={ authorList }
					selectedId={ selectedAuthorId }
					onChange={ onAuthorChange }
				/>
			)
		);
	}
}

export default compose( [
	withSelect( ( select ) => {
		const { getAuthors } = select( 'core' );
		return {
			authorList: getAuthors(),
		};
	} ),
] )( AuthorSelect );

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { compose } = wp.compose;
const { withSelect } = wp.data;
const { Component } = wp.element;
const { TreeSelect } = wp.components;

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
					label={ __( 'Author', 'themezee-magazine-blocks' ) }
					noOptionLabel={ __( 'All Authors', 'themezee-magazine-blocks' ) }
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
		const { getUsers } = select( 'core' );
		return {
			authorList: getUsers( { who: 'authors' } ),
		};
	} ),
] )( AuthorSelect );

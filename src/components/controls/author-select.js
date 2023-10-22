/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { compose } from '@wordpress/compose';
import { withSelect } from '@wordpress/data';
import { Component } from '@wordpress/element';
import { TreeSelect } from '@wordpress/components';

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

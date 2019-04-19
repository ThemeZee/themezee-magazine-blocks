/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { Component } = wp.element;
const { TreeSelect } = wp.components;
const { addQueryArgs } = wp.url;

/**
 * Internal dependencies
 */
import './style.scss';

/**
 * Module Constants
 */
const AUTHOR_LIST_QUERY = {
	who: 'authors',
	context: 'edit',
	per_page: -1,
};

class AuthorSelect extends Component {
	constructor() {
		super( ...arguments );
		this.state = {
			authorList: [],
		};
	}

	componentDidMount() {
		this.isStillMounted = true;
		this.fetchRequest = wp.apiFetch( {
			path: addQueryArgs( '/wp/v2/users', AUTHOR_LIST_QUERY ),
		} ).then(
			( authorList ) => {
				if ( this.isStillMounted ) {
					this.setState( { authorList } );
				}
			}
		).catch(
			() => {
				if ( this.isStillMounted ) {
					this.setState( { authorList: [] } );
				}
			}
		);
	}

	componentWillUnmount() {
		this.isStillMounted = false;
	}

	render() {
		const {
			selectedAuthorId,
			onAuthorChange,
		} = this.props;

		const { authorList } = this.state;

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

export default AuthorSelect;

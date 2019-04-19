/**
 * External dependencies
 */
const { isUndefined, pickBy } = lodash;

/**
 * WordPress dependencies
 */
const {
	Component,
	Fragment,
} = wp.element;

const { __ } = wp.i18n;
const { compose } = wp.compose;
const { withSelect } = wp.data;

const {
	InspectorControls,
} = wp.editor;

const {
	PanelBody,
	Placeholder,
	RangeControl,
	ServerSideRender,
	Spinner,
	TextControl,
} = wp.components;

/**
 * Internal dependencies
 */
import CategorySelect from '../../components/category-select';
import AuthorSelect from '../../components/author-select';
import OrderSelect from '../../components/order-select';

/**
 * Block Edit Component
 */
class MagazineGridEdit extends Component {
	render() {
		const {
			attributes,
			setAttributes,
			latestPosts,
		} = this.props;

		const {
			categories,
			tags,
			author,
			order,
			orderBy,
			numberOfPosts,
			offset,
		} = attributes;

		const inspectorControls = (
			<InspectorControls>

				<PanelBody title={ __( 'Content Settings', 'themezee-blocks' ) }>

					<CategorySelect
						selectedCategoryId={ categories }
						onCategoryChange={ ( value ) => setAttributes( { categories: '' !== value ? value : undefined } ) }
					/>

					<TextControl
						label={ __( 'Tags' ) }
						value={ tags }
						onChange={ ( value ) => setAttributes( { tags: '' !== value ? value : undefined } ) }
					/>

					<AuthorSelect
						selectedAuthorId={ author }
						onAuthorChange={ ( value ) => setAttributes( { author: '' !== value ? value : undefined } ) }
					/>

					<OrderSelect
						{ ...{ order, orderBy } }
						onOrderChange={ ( value ) => setAttributes( { order: value } ) }
						onOrderByChange={ ( value ) => setAttributes( { orderBy: value } ) }
					/>

					<RangeControl
						key="tz-number-of-posts-control"
						label={ __( 'Number of posts', 'themezee-blocks' ) }
						value={ numberOfPosts }
						onChange={ ( value ) => setAttributes( { numberOfPosts: value } ) }
						min={ 1 }
						max={ 30 }
					/>

					<RangeControl
						key="tz-offset-control"
						label={ __( 'Offset', 'themezee-blocks' ) }
						value={ offset }
						onChange={ ( value ) => setAttributes( { offset: value } ) }
						min={ 0 }
						max={ 30 }
					/>

				</PanelBody>

			</InspectorControls>
		);

		const hasPosts = Array.isArray( latestPosts ) && latestPosts.length;
		if ( ! hasPosts ) {
			return (
				<Fragment>

					{ inspectorControls }

					<Placeholder
						icon="format-aside"
						label={ __( 'Magazine Grid', 'themezee-blocks' ) }
					>
						{ ! Array.isArray( latestPosts ) ?
							<Spinner /> :
							__( 'No posts found.', 'themezee-blocks' )
						}
					</Placeholder>

				</Fragment>
			);
		}

		return (
			<Fragment>

				{ inspectorControls }

				<ServerSideRender
					block="themezee-blocks/magazine-grid"
					attributes={ attributes }
				/>

			</Fragment>
		);
	}
}

export default compose( [
	withSelect( ( select, props ) => {
		const { categories, author, numberOfPosts, order, orderBy, offset } = props.attributes;
		const { getEntityRecords } = select( 'core' );
		const latestPostsQuery = pickBy( {
			categories,
			author,
			order,
			orderby: orderBy,
			per_page: numberOfPosts,
			offset,
		}, ( value ) => ! isUndefined( value ) );

		return {
			latestPosts: getEntityRecords( 'postType', 'post', latestPostsQuery ),
		};
	} ),
] )( MagazineGridEdit );

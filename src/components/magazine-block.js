/**
 * External dependencies
 */
import classnames from 'classnames';
const {
	isUndefined,
	pickBy,
} = lodash;

/**
 * WordPress dependencies
 */
const { compose } = wp.compose;
const { withSelect } = wp.data;
const { Fragment } = wp.element;
const { __ } = wp.i18n;

const {
	BlockControls,
	InspectorControls,
	useBlockProps,
} = wp.blockEditor;

const {
	PanelBody,
	Placeholder,
	RangeControl,
	SelectControl,
	Spinner,
	TextControl,
	ToggleControl,
	ToolbarGroup,
} = wp.components;

/**
 * Internal dependencies
 */
import CategorySelect from './controls/category-select';
import AuthorSelect from './controls/author-select';
import OrderSelect from './controls/order-select';
import MagazineTemplate from './magazine-template';

/*
 * Magazine Block Function
 */
function MagazineBlock( props ) {
	const {
		attributes,
		className,
		setAttributes,
		categoriesList,
		latestPosts,
		placeholderLabel,
		placeholderIcon,
		magazineTemplate,
	} = props;

	const {
		categories,
		tags,
		author,
		order,
		orderBy,
		numberOfPosts,
		offset,
		metaPosition,
		showDate,
		showAuthor,
		showCategories,
		showComments,
		excerptLength,
		moreText,
	} = attributes;

	const blockProps = useBlockProps( {
		className: classnames( className, 'tz-magazine-block' ),
	} );

	const blockControls = (
		<BlockControls key="controls">

			{ props.blockControls ? props.blockControls : null }

			<ToolbarGroup
				controls={ [ {
					// Font Awesone Plus Solid
					icon: 'plus',
					title: __( 'Show one post more', 'themezee-magazine-blocks' ),
					onClick: () => setAttributes( { numberOfPosts: numberOfPosts + 1 } ),
				}, {
					// Font Awesone Minus Solid
					icon: 'minus',
					title: __( 'Show one post less', 'themezee-magazine-blocks' ),
					onClick: () => {
						if ( numberOfPosts > 1 ) {
							setAttributes( { numberOfPosts: numberOfPosts - 1 } );
						}
					},
				} ] }
			/>

		</BlockControls>
	);

	const inspectorControls = (
		<InspectorControls>

			<PanelBody title={ __( 'Content Settings', 'themezee-magazine-blocks' ) } initialOpen={ true }>

				<CategorySelect
					categoriesList={ categoriesList }
					selectedCategoryIds={ categories }
					onCategoryChange={ ( value ) => setAttributes( { categories: value && value.length > 0 ? value : [] } ) }
				/>

				<TextControl
					label={ __( 'Tags', 'themezee-magazine-blocks' ) }
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
					label={ __( 'Number of posts', 'themezee-magazine-blocks' ) }
					value={ numberOfPosts }
					onChange={ ( value ) => setAttributes( { numberOfPosts: value } ) }
					min={ 1 }
					max={ 30 }
				/>

				<RangeControl
					key="tz-offset-control"
					label={ __( 'Skip Posts', 'themezee-magazine-blocks' ) }
					value={ offset }
					onChange={ ( value ) => setAttributes( { offset: value } ) }
					min={ 0 }
					max={ 30 }
				/>

			</PanelBody>

			{ props.layoutSettings ? props.layoutSettings : null }

			<PanelBody title={ __( 'Post Settings', 'themezee-magazine-blocks' ) } initialOpen={ false }>

				<SelectControl
					label={ __( 'Post Details', 'themezee-magazine-blocks' ) }
					value={ metaPosition }
					onChange={ ( value ) => setAttributes( { metaPosition: value } ) }
					options={ [
						{ value: 'above-title', label: __( 'Show above post title', 'themezee-magazine-blocks' ) },
						{ value: 'below-title', label: __( 'Show below post title', 'themezee-magazine-blocks' ) },
					] }
				/>

				<ToggleControl
					label={ __( 'Display Date', 'themezee-magazine-blocks' ) }
					checked={ !! showDate }
					onChange={ () => setAttributes( { showDate: ! showDate } ) }
				/>

				<ToggleControl
					label={ __( 'Display Author', 'themezee-magazine-blocks' ) }
					checked={ !! showAuthor }
					onChange={ () => setAttributes( { showAuthor: ! showAuthor } ) }
				/>

				<ToggleControl
					label={ __( 'Display Categories', 'themezee-magazine-blocks' ) }
					checked={ !! showCategories }
					onChange={ () => setAttributes( { showCategories: ! showCategories } ) }
				/>

				<ToggleControl
					label={ __( 'Display Comments', 'themezee-magazine-blocks' ) }
					checked={ !! showComments }
					onChange={ () => setAttributes( { showComments: ! showComments } ) }
				/>

				<RangeControl
					label={ __( 'Excerpt Length', 'themezee-magazine-blocks' ) }
					value={ excerptLength }
					onChange={ ( value ) => setAttributes( { excerptLength: value } ) }
					min={ 0 }
					max={ 100 }
				/>

				{ excerptLength > 0 && (
					<TextControl
						label={ __( 'Read More Text', 'themezee-magazine-blocks' ) }
						value={ moreText }
						onChange={ ( value ) => setAttributes( { moreText: value } ) }
					/>
				) }

			</PanelBody>

		</InspectorControls>
	);

	const hasPosts = Array.isArray( latestPosts ) && latestPosts.length;
	if ( ! hasPosts ) {
		return (
			<Fragment>

				{ blockControls }
				{ inspectorControls }

				<div { ...blockProps }>

					<Placeholder
						icon={ placeholderIcon }
						label={ placeholderLabel }
						className="tz-posts-placeholder"
					>
						{ ! Array.isArray( latestPosts ) ?
							<Spinner /> :
							__( 'No posts found. You may have to reconfigure your content settings.', 'themezee-magazine-blocks' )
						}
					</Placeholder>

				</div>

			</Fragment>
		);
	}

	// Removing posts from display should be instant.
	const displayPosts = latestPosts.length > numberOfPosts ?
		latestPosts.slice( 0, numberOfPosts ) :
		latestPosts;

	return (
		<Fragment>

			{ blockControls }
			{ inspectorControls }

			<div { ...blockProps }>

				<MagazineTemplate
					posts={ displayPosts }
					attributes={ attributes }
					template={ magazineTemplate }
				/>

			</div>

		</Fragment>
	);
}

export default compose( [
	withSelect( ( select, props ) => {
		const { categories, tags, author, numberOfPosts, order, orderBy, offset } = props.attributes;
		const { getEntityRecords } = select( 'core' );

		// Retrieve Tag IDs from Tag names.
		let tagsIDs;
		if ( ! ( ! tags || 0 === tags.length ) ) {
			const tagsObj = getEntityRecords( 'taxonomy', 'post_tag', { per_page: -1, slug: tags } );
			if ( tagsObj ) {
				tagsIDs = Object.keys( tagsObj ).reduce( ( str, key ) => str + tagsObj[ key ].id + ',', '' );
				tagsIDs = tagsIDs.slice( 0, -1 );
			}
		}
		const tagsQuery = '' !== tagsIDs ? { tags: tagsIDs } : undefined;

		// Query Categories.
		const categoriesQuery = { per_page: -1, hide_empty: true };

		// Query Posts.
		const latestPostsQuery = pickBy( {
			categories: categories && categories.length > 0 ? categories.join() : undefined,
			...tagsQuery,
			author,
			order,
			orderby: orderBy,
			per_page: numberOfPosts,
			offset,
		}, ( value ) => ! isUndefined( value ) );

		return {
			categoriesList: getEntityRecords( 'taxonomy', 'category', categoriesQuery ),
			latestPosts: getEntityRecords( 'postType', 'post', latestPostsQuery ),
		};
	} ),
] )( MagazineBlock );

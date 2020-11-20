/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { SelectControl } = wp.components;

function OrderSelect( {
	order,
	orderBy,
	onOrderChange,
	onOrderByChange,
} ) {
	return (
		( onOrderChange && onOrderByChange ) && (
			<SelectControl
				key="tz-order-select"
				label={ __( 'Order by', 'themezee-magazine-blocks' ) }
				value={ `${ orderBy }/${ order }` }
				options={ [
					{
						label: __( 'Publish date (descending)', 'themezee-magazine-blocks' ),
						value: 'date/desc',
					},
					{
						label: __( 'Publish date (ascending)', 'themezee-magazine-blocks' ),
						value: 'date/asc',
					},
					{
						label: __( 'Last modified (descending)', 'themezee-magazine-blocks' ),
						value: 'modified/desc',
					},
					{
						label: __( 'Last modified (ascending)', 'themezee-magazine-blocks' ),
						value: 'modified/asc',
					},
					{
						/* translators: label for ordering posts by title in ascending order */
						label: __( 'Alphabetical (A → Z)', 'themezee-magazine-blocks' ),
						value: 'title/asc',
					},
					{
						/* translators: label for ordering posts by title in descending order */
						label: __( 'Alphabetical (Z → A)', 'themezee-magazine-blocks' ),
						value: 'title/desc',
					},
				] }
				onChange={ ( value ) => {
					const [ newOrderBy, newOrder ] = value.split( '/' );
					if ( newOrder !== order ) {
						onOrderChange( newOrder );
					}
					if ( newOrderBy !== orderBy ) {
						onOrderByChange( newOrderBy );
					}
				} }
			/>
		)
	);
}

export default OrderSelect;

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
						label: __( 'Newest to Oldest', 'themezee-magazine-blocks' ),
						value: 'date/desc',
					},
					{
						label: __( 'Oldest to Newest', 'themezee-magazine-blocks' ),
						value: 'date/asc',
					},
					{
						/* translators: label for ordering posts by title in ascending order */
						label: __( 'A → Z', 'themezee-magazine-blocks' ),
						value: 'title/asc',
					},
					{
						/* translators: label for ordering posts by title in descending order */
						label: __( 'Z → A', 'themezee-magazine-blocks' ),
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

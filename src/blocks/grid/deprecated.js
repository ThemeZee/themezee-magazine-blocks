/**
 * Internal dependencies
 */
import metadata from './block.json';

const deprecated = [
	{
		attributes: {
			...metadata.attributes,
			categories: {
				type: 'string',
			},
		},

		supports: {
			html: false,
		},

		migrate( oldAttributes ) {
			return {
				...oldAttributes,
				categories: [ oldAttributes.categories ].map( ( cat ) => parseInt( cat ) ),
			};
		},

		isEligible: ( { categories } ) => {
			return categories && 'string' === typeof categories;
		},

		save: () => {},
	},
];

export default deprecated;

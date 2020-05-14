/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;

const attributes = {
	categories: {
		type: 'array',
	},
	tags: {
		type: 'string',
	},
	author: {
		type: 'string',
	},
	numberOfPosts: {
		type: 'number',
		default: 3,
	},
	offset: {
		type: 'number',
		default: 0,
	},
	order: {
		type: 'string',
		default: 'desc',
	},
	orderBy: {
		type: 'string',
		default: 'date',
	},
	imageSize: {
		type: 'string',
		default: 'full',
	},
	thumbnailSize: {
		type: 'string',
		default: 'full',
	},
	metaPosition: {
		type: 'string',
		default: 'below-title',
	},
	showDate: {
		type: 'boolean',
		default: true,
	},
	showAuthor: {
		type: 'boolean',
		default: true,
	},
	showCategories: {
		type: 'boolean',
		default: false,
	},
	showComments: {
		type: 'boolean',
		default: false,
	},
	excerptLength: {
		type: 'number',
		default: 25,
	},
	moreText: {
		type: 'string',
		default: __( 'Continue Reading', 'themezee-magazine-blocks' ),
	},
};

export default attributes;

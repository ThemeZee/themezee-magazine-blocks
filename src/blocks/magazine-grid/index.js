/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const {
	RichText,
	getColorClassName,
	getFontSizeClass,
} = wp.editor;

/**
 * Internal dependencies
 */
import './style.scss';
import './editor.scss';
import edit from './edit';

/**
 * Register block
 */
registerBlockType(
	'themezee-blocks/magazine-grid',
	{
		title: __( 'Magazine Grid', 'themezee-blocks' ),

		description: __( 'Add a headline and style it.', 'themezee-blocks' ),

		category: 'themezee-blocks',

		icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M496 80V48c0-8.837-7.163-16-16-16H320c-8.837 0-16 7.163-16 16v32c0 8.837 7.163 16 16 16h37.621v128H154.379V96H192c8.837 0 16-7.163 16-16V48c0-8.837-7.163-16-16-16H32c-8.837 0-16 7.163-16 16v32c0 8.837 7.163 16 16 16h37.275v320H32c-8.837 0-16 7.163-16 16v32c0 8.837 7.163 16 16 16h160c8.837 0 16-7.163 16-16v-32c0-8.837-7.163-16-16-16h-37.621V288H357.62v128H320c-8.837 0-16 7.163-16 16v32c0 8.837 7.163 16 16 16h160c8.837 0 16-7.163 16-16v-32c0-8.837-7.163-16-16-16h-37.275V96H480c8.837 0 16-7.163 16-16z" /></svg>,

		keywords: [
			__( 'Title', 'themezee-blocks' ),
			__( 'Subheading', 'themezee-blocks' ),
			__( 'Subtitle', 'themezee-blocks' ),
		],

		supports: {
			anchor: true,
		},

		attributes: {
			title: {
				source: 'html',
				selector: 'h1,h2,h3,h4,h5,h6',
			},
			titleTag: {
				type: 'number',
				default: 2,
			},
			placeholder: {
				type: 'string',
			},
			textAlignment: {
				type: 'string',
			},
			textColor: {
				type: 'string',
			},
			backgroundColor: {
				type: 'string',
			},
			customTextColor: {
				type: 'string',
			},
			customBackgroundColor: {
				type: 'string',
			},
			fontSize: {
				type: 'string',
			},
			customFontSize: {
				type: 'number',
			},
		},

		edit,

		save( { attributes } ) {
			const {
				title,
				titleTag,
				textAlignment,
				textColor,
				backgroundColor,
				customTextColor,
				customBackgroundColor,
				fontSize,
				customFontSize,
			} = attributes;

			const textColorClass = getColorClassName( 'color', textColor );
			const backgroundClass = getColorClassName( 'background-color', backgroundColor );
			const fontSizeClass = getFontSizeClass( fontSize );

			const headingClasses = classnames( 'gt-heading', {
				'has-background': backgroundColor || customBackgroundColor,
				[ textColorClass ]: textColorClass,
				[ backgroundClass ]: backgroundClass,
				[ fontSizeClass ]: fontSizeClass,
			} );

			const headingStyles = {
				textAlign: textAlignment,
				backgroundColor: backgroundClass ? undefined : customBackgroundColor,
				color: textColorClass ? undefined : customTextColor,
				fontSize: fontSizeClass ? undefined : customFontSize,
			};

			return (
				<RichText.Content
					tagName={ 'h' + titleTag }
					className={ headingClasses }
					style={ headingStyles }
					value={ title }
				/>
			);
		},
	},
);

/**
 * WordPress dependencies
 */
import { registerBlockType } from '@wordpress/blocks';

/**
 * Internal dependencies
 */
import './style.scss';
import './editor.scss';
import { IconMagazineGrid as icon } from '../../components/data/icons';
import metadata from './block.json';
import edit from './edit';
import deprecated from './deprecated';
import transforms from './transforms';

/**
 * Register block
 */
registerBlockType( metadata, {
	icon,
	deprecated,
	transforms,
	edit,
} );

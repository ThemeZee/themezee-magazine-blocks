/**
 * WordPress dependencies
 */
import { registerBlockType } from '@wordpress/blocks';

/**
 * Internal dependencies
 */
import './style.scss';
import './editor.scss';
import { IconMagazineColumns as icon } from '../../components/data/icons';
import metadata from './block.json';
import edit from './edit';
import save from './save';
import transforms from './transforms';

/**
 * Register block
 */
registerBlockType( metadata, {
	icon,
	transforms,
	edit,
	save,
} );

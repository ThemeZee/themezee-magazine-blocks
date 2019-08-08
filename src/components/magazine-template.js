/**
 * WordPress dependencies
 */
const {
	Component,
	Fragment,
} = wp.element;

/**
 * Internal dependencies
 */
import MagazineGrid from './template/blocks/magazine-grid.js';
import MagazineHorizontal from './template/blocks/magazine-horizontal.js';
import MagazineList from './template/blocks/magazine-list.js';
import MagazineVertical from './template/blocks/magazine-vertical.js';

class MagazineTemplate extends Component {
	render() {
		const {
			posts,
			attributes,
			template,
		} = this.props;

		return (
			<Fragment>

				{ 'magazine-grid' === template && (
					<MagazineGrid posts={ posts } attributes={ attributes } />
				) }

				{ 'magazine-horizontal' === template && (
					<MagazineHorizontal posts={ posts } attributes={ attributes } />
				) }

				{ 'magazine-list' === template && (
					<MagazineList posts={ posts } attributes={ attributes } />
				) }

				{ 'magazine-vertical' === template && (
					<MagazineVertical posts={ posts } attributes={ attributes } />
				) }

			</Fragment>
		);
	}
}

export default MagazineTemplate;

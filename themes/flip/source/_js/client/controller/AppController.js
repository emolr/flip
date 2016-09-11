import RouterModule from '../modules/router';
import ArticleController from './ArticleController';
import inView from 'in-view';

export default class AppController {
	constructor() {
		this.init();
		this.routes();
	}

	init() {
		// Lazy load backgrounds
		inView('[data-lazy-bg]')
			.on('enter', el => this.replaceBg(el));
	}

	routes() {
		new RouterModule('articles', ArticleController);
	}

	replaceBg(target) {
		var data = target.getAttribute('data-lazy-bg');
		target.style.backgroundImage = `url(${data}`;
	}
}
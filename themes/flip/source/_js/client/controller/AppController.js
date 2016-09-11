import RouterModule from '../modules/router';
import ArticleController from './ArticleController';

export default class AppController {
	constructor() {
		new RouterModule('articles', ArticleController);
	}
}
export default class RouterModule {
	constructor(match, module) {
		if (this.pathMatch(match)) {
			this.loadModule(module);
		}
	}

	pathMatch(match) {
		var matches = false;
		var path = window.location.pathname.split('/');

		if (path.length < 2) {
			path = '/';
		} else {
			path = path[2]
		}

		if (path === match) {
			matches = true;
		}

		return matches;
	}

	loadModule(module) {
		new module;
	}
}
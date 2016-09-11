import Headroom from 'headroom.js/dist/headroom.js';

export default class AppController {
	constructor() {
		console.log('article controller yayaya');
		const headroomOptions = {
			tolerance : {
				down : 10,
				up : 0
			},
		};
		const header = document.querySelector('.fl-bar.fl-bar--top');
		const footer = document.querySelector('.fl-bar.fl-bar--bottom');
		let stickyHeader = new Headroom(header, headroomOptions);
		let stickyFooter = new Headroom(footer, headroomOptions);
		stickyHeader.init();
		stickyFooter.init();

		console.log(stickyHeader);
	}
}
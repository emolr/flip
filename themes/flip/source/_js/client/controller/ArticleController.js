import Headroom from 'headroom.js/dist/headroom.js';
import inView from 'in-view';

export default class ArticleController {
	constructor() {
		this.instanciateStickyBars();
		this.scrollSlider();
	}

	scrollSlider() {
		const articleImages = document.querySelectorAll('.fl-content__img');
		const view = document.querySelector('.fl-article-layout__left__view');
		const items = new inView('.fl-content__img');
		console.log(items);
		items
		.on('enter', (el, i) => {
			console.log(el, 'i', i)
			const src = el.getAttribute('data-src');
			this.setViewBg(src, view)
		});
	}

	setViewBg(src, view) {
		view.style.backgroundImage = `url(${src})`;
	}

	instanciateStickyBars() {
		const header = document.querySelector('.fl-bar.fl-bar--top');
		const footer = document.querySelector('.fl-bar.fl-bar--bottom');
		const headroomOptions = {
			tolerance : {
				down : 10,
				up : 0
			},
		};
		let stickyHeader = new Headroom(header, headroomOptions);
		let stickyFooter = new Headroom(footer, headroomOptions);
		stickyHeader.init();
		stickyFooter.init();
	}
}
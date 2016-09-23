import Headroom from 'headroom.js/dist/headroom.js';
import inView from 'in-view';

export default class ArticleController {
	constructor() {
		this.startPosY = 0;
		this.latestViewChange = 0;

		this.instanciateStickyBars();
		this.scrollSlider();
	}

	scrollSlider() {
		const articleImages = document.querySelectorAll('.fl-content__img');
		const view = document.querySelector('.fl-view__inner');
		const items = new inView('.fl-content__img');
		items
		.on('enter', (el, i) => {
			const src = el.getAttribute('data-src');
			if (window.innerWidth > 768) {
				if (el != items.elements[0]) {
					this.initParallax();
				}
				this.setViewBg(src, view);
			} else {
				el.src = src;
			}
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

	initParallax() {
		this.startPosY = window.scrollY;
		window.addEventListener('scroll', this.parallaxView);
	}

	destroyParallax() {
		window.removeEventListener('scroll', this.parallaxView());
	}

	parallaxView() {
		// console.log(window.scrollY);
	}
}
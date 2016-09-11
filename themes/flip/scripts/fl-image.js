'use strict';

hexo.extend.tag.register('fl_image', function(args){
	var result;
	var path = args[0];
	var alt = args[1];

	result = `<img class="fl-content__img" data-src="${path}" alt="${alt}"/>`

	return result;
});

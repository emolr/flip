var fs = require('hexo-fs');
var pathFn = require('path');

hexo.extend.tag.register('include_post', function(args){
	var filename = args[0];
	var path = pathFn.join(hexo.source_dir, filename);

  	const file = fs.readFileSync(path)
		.split('---')
		.filter(part => part.length > 0)
		.map(part => part.trim());


  	return file[1];
});

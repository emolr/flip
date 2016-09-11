var fs = require('hexo-fs');
var pathFn = require('path');

hexo.extend.tag.register('sg_color', function(args){
	var result = `
		<div style="padding: 10px; border: 1px solid #eee; border-radius: 3px; display: inline-block; margin-right: 10px; margin-bottom: 20px;">
			<div style="width: 100px; height: 100px;" class="${args[1]}">
			</div>
			<div style="text-align: center; padding: 10px 0 0 0">
				${args[0]}
			</div>
		</div>
	`;

  	return result;
});

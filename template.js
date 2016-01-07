/***********************************************

  "template.js"

  Created by Michael Cheng on 01/06/2016 22:01
            http://michaelcheng.us/
            michael@michaelcheng.us
            --All Rights Reserved--

***********************************************/

'use strict';

var iqwerty = iqwerty || {};

iqwerty.template = (function() {
	function GetTemplates() {
		setTimeout(function() {
			if(typeof $http === 'undefined') {
				console.error('$http is not defined. Remember to include the iQwerty $http library in your code. Get it here https://github.com/mlcheng/js-http');
				return;
			}

			var templates = document.querySelectorAll('[data-iq-template-src]');
			[].slice.call(templates).forEach(template => {
				var src = template.dataset.iqTemplateSrc;
				var callback = template.dataset.iqTemplateCallback;
				callback = window[callback];
				
				$http(src)
					.success(response => {
						template.insertAdjacentHTML('afterbegin', response);
						if(typeof callback === 'function') {
							callback(response);
						} else {
							if(callback != null) {
								console.error('Your callback is not defined in your code');
							}
						}
					})
					.error(() => {
						console.warn('Could not retrieve template');
					})
					.get();
			});
		}, 0);
	}

	return {
		GetTemplates: GetTemplates
	};
})();

document.addEventListener('DOMContentLoaded', iqwerty.template.GetTemplates);
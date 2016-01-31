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

	var TEMPLATE_SRC_ATTR = 'data-iq-template-src';

	function GetTemplates() {
		setTimeout(function() {
			if(typeof $http === 'undefined') {
				console.error('$http is not defined. Remember to include the iQwerty $http library in your code. Get it here https://github.com/mlcheng/js-http');
				return;
			}

			var templates = document.querySelectorAll('[' + TEMPLATE_SRC_ATTR + ']');
			[].slice.call(templates).forEach(element => {
				var src = element.dataset.iqTemplateSrc;
				var callback = element.dataset.iqTemplateLoaded;
				callback = window[callback];

				GetTemplate(src, element, callback);
			});
		}, 0);
	}

	function GetTemplate(url, target, callback) {
		if(typeof $http === 'undefined') {
			return console.log('The $http library is required. Get it here https://github.com/mlcheng/js-http');
		}

		/* globals $http */
		$http(url)
			.success(response => {
				if(target) {
					target.insertAdjacentHTML('afterbegin', response);
				}
				if(typeof callback === 'function') {
					callback(response);
				} else {
					if(callback != null) {
						console.error('Your callback is not defined');
					}
				}
			})
			.error(() => console.warn('Could not retrieve template'))
			.cache() //TODO: Add option for toggling cache
			.get();
	}

	return {
		GetTemplates: GetTemplates,
		GetTemplate: GetTemplate
	};
})();

document.addEventListener('DOMContentLoaded', iqwerty.template.GetTemplates);
/***********************************************

  "template.js"

  Created by Michael Cheng on 01/06/2016 22:01
            http://michaelcheng.us/
            michael@michaelcheng.us
            --All Rights Reserved--

***********************************************/

'use strict';

/* globals $http */

var iqwerty = iqwerty || {};

iqwerty.template = (function() {

	var TEMPLATE_SRC_ATTR = 'data-iq-template-src';

	/**
	 * Parse a function name to the actual function
	 * Supports functions inside objects
	 * @param  {String} fn The name of the function
	 * @return {Function}      Returns the function, or null if no function exists
	 */
	function _parseCallback(fn) {
		let ns = fn.split('.');

		// Return the global function if there is no namespace
		if(ns.length === 1) return window[fn];

		let obj = window[ns.shift()], f = ns.pop();
		obj = ns.reduce((o, n) => o[n], obj);

		return obj[f];
	}

	function GetTemplates() {
		setTimeout(function() {

			var templates = document.querySelectorAll('[' + TEMPLATE_SRC_ATTR + ']');
			[].slice.call(templates).forEach(element => {
				var src = element.dataset.iqTemplateSrc;
				var callback = element.dataset.iqTemplateLoaded;

				callback = _parseCallback(callback);

				GetTemplate(src, callback, element);
			});
		}, 0);
	}

	function GetTemplate(url, callback, target) {
		if(typeof $http === 'undefined') {
			return console.log('The $http library is required. Get it here https://github.com/mlcheng/js-http');
		}

		$http(url)
			.cache() // TODO: Add option for toggling cache
			.get()
			.then(template => {
				if(target) {
					target.insertAdjacentHTML('afterbegin', template);
				}
				if(typeof callback === 'function') {
					callback(template);
				} else {
					if(callback != null) {
						console.error('Your callback is not defined');
					}
				}
			})
			.catch(() => console.warn('Could not retrieve template'));
	}

	return {
		GetTemplates: GetTemplates,
		GetTemplate: GetTemplate
	};
})();

document.addEventListener('DOMContentLoaded', iqwerty.template.GetTemplates);
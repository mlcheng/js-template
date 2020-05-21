/***********************************************

  "template.js"

  Created by Michael Cheng on 01/06/2016 22:01
            http://michaelcheng.us/
            michael@michaelcheng.us
            --All Rights Reserved--

***********************************************/

'use strict';

import { http } from './../http/http';

export const template = (() => {
	const TEMPLATE_SRC_ATTR = 'data-iq-template-src';

	/**
	 * Parse a function name to the actual function
	 * Supports functions inside objects
	 * @param {string} fn The name of the function
	 * @return {Function} Returns the function, or null if no function exists
	 */
	function _parseCallback(fn) {
		if(!fn) return;
		let ns = fn.split('.');

		// Return the global function if there is no namespace
		if(ns.length === 1) return window[fn];

		let obj = window[ns.shift()], f = ns.pop();
		obj = ns.reduce((o, n) => o[n], obj);

		return obj[f];
	}

	function loadTemplates() {
		setTimeout(function() {
			const templates = [...document.querySelectorAll('[' + TEMPLATE_SRC_ATTR + ']')];
			templates.forEach((element) => {
				const src = element.dataset.iqTemplateSrc;
				const callback = element.dataset.iqTemplateLoaded;
				const callbackFn = _parseCallback(callback);

				loadTemplate(src, callbackFn, element);
			});
		});
	}

	function loadTemplate(url, callback, target) {
		http.request(url)
		 	// TODO: Add option for toggling cache
			.cache()
			.get()
			.then((template) => {
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

	return { loadTemplate, loadTemplates };
})();

document.addEventListener('DOMContentLoaded', template.loadTemplates);
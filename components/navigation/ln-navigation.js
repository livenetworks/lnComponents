// Usage:
// Add the tag "data-ln-navigation"

(function () {
	const DOM_SELECTOR = "data-ln-navigation";
	const DOM_ATTRIBUTE = "lnNavigation";

	// if the component is already defined, return
	if (window[DOM_ATTRIBUTE] != undefined || window[DOM_ATTRIBUTE] != null) {
		return;
	}

	function constructor(domRoot) {
		_findElements(domRoot);
	}

	function _findElements(domRoot) {
		if(domRoot.TEXT_NODE && domRoot.childNodes.length == 0) {
			return;
		}

		let items = Array.from(domRoot.querySelectorAll("[" + DOM_SELECTOR + "]")) || [];

		if (domRoot.hasAttribute(DOM_SELECTOR)) {
			items.push(domRoot);
		}

		items.forEach(function (item) {
			if (!item[DOM_ATTRIBUTE]) {
				item[DOM_ATTRIBUTE] = new _constructor(item);
			}
		});
	}

	function _constructor(dom) {
		this.dom = dom;
		_init.call(this);
		return this;
	}

	// Listens for DOM changes
	function _domObserver() {
		let observer = new MutationObserver((mutations) => {
			mutations.forEach((mutation) => {
				if (mutation.type == "childList") {
				mutation.addedNodes.forEach(function (item) {
					_findElements(item);
				});
				}
			});
		});

		observer.observe(document.body, {
			childList: true,
		});
	}

	function setObserver(target) {
		var observer = new MutationObserver((mutations) => {
			mutations.forEach((mutation) => {
				trigger(mutation.target);
			});
		});

		observer.observe(target, {
			attributes: true,
			attributeFilter: [DOM_SELECTOR + '-collapsed'],
		});
	}

	_domObserver();

	function _init() {
		let hamburger = this.dom.querySelectorAll("[" + DOM_SELECTOR + "-target]");

		hamburger.forEach((triggerButton) => {
			setObserver(document.getElementById(triggerButton.dataset.lnNavigationTarget));

			triggerButton.addEventListener("click", (event) => {
				let target = document.getElementById(event.target.dataset.lnNavigationTarget)
					
				if(target.dataset.lnNavigationCollapsed == 'true') {
					target.dataset.lnNavigationCollapsed = 'false';
				} else {
					target.dataset.lnNavigationCollapsed = 'true';
				}
			});
		})
	}

	function trigger(target) {
		if(target.dataset.lnNavigationCollapsed == 'true') {
			collapse(target);
		} else {
			expand(target);
		}
	}

	function expand(target) {
		let height = target.scrollHeight;
		target.style.height = height + 'px';
		// when the next css transition finishes (which should be the one we just triggered)
		target.addEventListener('transitionend', function(e) {
			// remove this event listener so it only gets triggered once
			target.removeEventListener('transitionend', arguments.callee);
			// remove "height" from the element's inline styles, so it can return to its initial value
			target.style.height = null;
		});
	}

	function collapse(target) {
		let height = target.scrollHeight;
		let elementTransition = target.style.transition;
		target.style.transition = '';

		// on the next frame (as soon as the previous style change has taken effect),
		// explicitly set the element's height to its current pixel height, so we 
		// aren't transitioning out of 'auto'
		requestAnimationFrame(function() {
			target.style.height = height + 'px';
			target.style.transition = elementTransition;

			// on the next frame (as soon as the previous style change has taken effect),
			// have the element transition to height: 0
			requestAnimationFrame(function() {
				target.style.height = 0 + 'px';
			});
		});
	}

	// make lnLink globaly avaliable
	window[DOM_ATTRIBUTE] = constructor;
})();

window.lnNavigation(document.body);

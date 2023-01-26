// eslint-disable-next-line no-unused-vars
const Navigation = (function () {
	const HIDE = 'js-hide';
	const CLOSE_NAV = 'js-close-nav-button';

	let hamburger;
	let desktopNavi;

	function showHideNavigation() {
		//Hamburger öffnen
		if (desktopNavi.classList.contains(HIDE)) {
			desktopNavi.classList.remove(HIDE);
			hamburger.classList.add(CLOSE_NAV);
		//Hamburger schliessen
		} else {
			desktopNavi.classList.add(HIDE);
			hamburger.classList.remove(CLOSE_NAV);
		}
	}

	function initiate() {	
		hamburger = document.getElementById('hamburger');
		hamburger.addEventListener('click', showHideNavigation);
		desktopNavi = document.querySelector('.navi-desktop');
	}

	// public api
	return {
		init: initiate,
	};
})();

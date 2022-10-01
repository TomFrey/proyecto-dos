// eslint-disable-next-line no-unused-vars
const Animation = (function () {
	
    function addClassToAnimatObject(intersectionEntry){
        const separatorPath = intersectionEntry.target.querySelector('.separator-path');

        if (separatorPath) {
            if (intersectionEntry.isIntersecting) {
                separatorPath.classList.add('separator-path-animation');
                return;
            }
            separatorPath.classList.remove('separator-path-animation');
        }
    }

    function createIntersectionObserver(target){
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                addClassToAnimatObject(entry);
            });
        });
        observer.observe(target);
    }

	function startAnimationInViewport() {
        const targetsToAnimatOnScroll = document.querySelectorAll('.separator-bottom, .separator-top');
        targetsToAnimatOnScroll.forEach(target => {
            createIntersectionObserver(target);
        });
	}


	function init() {
        startAnimationInViewport();
	}

	// public api
	return {
		init
	};
})();

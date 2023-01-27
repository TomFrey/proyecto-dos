// eslint-disable-next-line no-unused-vars
const Courses = (function (Service, Dates) {
	let coursesFromStaticStorage;

	function getCoursesFromStaticStorage(){
		return coursesFromStaticStorage;
	}

	function init() {
		const promise = new Promise((resolve, reject) => {
			// alle Kursdaten lesen
			Service.call('GET', '/api/kurse.php') // http://localhost:3000/api/kurse.php
				.then(async (courses) => {
					// Datum vom Format yyyy-mm-dd ins Format yyyy/mm/dd konvertieren
					courses.forEach((course) => {
						course.vonDatum = Dates.convertToAllBrowsersReadableDate(course.vonDatum);
						course.bisDatum = Dates.convertToAllBrowsersReadableDate(course.bisDatum);
					});

					//Kurse in globaler Varibale speichern
					coursesFromStaticStorage = courses;

					//TODO: dann nächsten Kurs lesen
                    console.log('Kurse: ' + JSON.stringify(courses));
					
					resolve();
				})
				.catch((error) => {
					console.log(error);
					reject(error);
				});
		});
		return promise;
	}


	// public api
	return {
		loadAndRender: init,
		getCoursesFromStaticStorage
	};
})(Service, Dates);

// eslint-disable-next-line no-unused-vars
const Courses = (function (Service, Dates) {
	let coursesFromStaticStorage;


	function getCoursesFromStaticStorage(){
		return coursesFromStaticStorage;
	}


	/**
	 * Sortiert die Kursdaten nach vonDatum aufsteigend
	 * @param courses
	 * @returns {*}
	 */
	function sortDatumAscending(courses) {
		if(courses.length > 0){
			return courses.sort((a, b) => {
				if (b.vonDatum < a.vonDatum) {
					return 1;
				}
				if (b.vonDatum > a.vonDatum) {
					return -1;
				}
				return 0;
			});
		}
		return [];		
	}


	/**
	 * Liefert nur zukünftige Kurse
	 * @param courses
	 * @returns {courses in the future}
	 */
	function showCoursesYoungerThenToday(courses) {
		const today = new Date();
		if(courses.length > 0){
			return courses.filter((course) => {
				return new Date(course.vonDatum) >= today
			});
		}
		return [];
	}


	/**
	 * Liefert nur einen Kurs oder eine Reise zurück. Der nächste Kurs oder die nächste Reise.
	 * Anhand der Filterkriterien.
	 * @param {*} courses -> Array mit allen Kursdaten
	 * @param {*} courseTypes -> Array mit folgenden möglichen Werten: 'Kanukurs', 'Paddelreise', 'Eskimotieren', 'Packraft Kurs'
	 * @param {*} boatTypes -> Array mit folgenden möglichen Werten: 'Kajak', 'Kanadier', 'alle', 'Packraft'
	 * @returns 
	 */
	function getNextCourse(courses, courseTypes, boatTypes){
		let filteredCourses;
		
		if(courses.length > 0){
            filteredCourses = courses.filter((course) => {
				return 	courseTypes.some((courseType) => courseType === course.typ) && 
						boatTypes.some((boatType) => boatType === course.sportArt);
            });
			return showCoursesYoungerThenToday(sortDatumAscending(filteredCourses))[0];
		}
		return [];
	}


	function init() {
		const promise = new Promise((resolve, reject) => {
			// alle Kursdaten lesen
			Service.call('GET', '/api/kurse.php') // http://localhost:3000/api/kurse.php
				.then((courses) => {
					// Datum vom Format yyyy-mm-dd ins Format yyyy/mm/dd konvertieren
					courses.forEach((course) => {
						course.vonDatum = Dates.convertToAllBrowsersReadableDate(course.vonDatum);
						course.bisDatum = Dates.convertToAllBrowsersReadableDate(course.bisDatum);
					});

					//Kurse in globaler Varibale speichern
					coursesFromStaticStorage = courses;

					resolve(courses);
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
		getAllCourses: init,
		getNextCourse,
		getCoursesFromStaticStorage
	};
})(Service, Dates);

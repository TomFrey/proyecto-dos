"use strict";

const App = (function () {

  /**** wird vor dem DOM ready ausgeführt ****/

  /**** wird nach dem DOM ready ausgeführt ****/
  function init(){
    console.log('inside App.init()');
    Animation.init();
    Navigation.init();

    // alle Kursdaten laden
    Courses.getAllCourses()
    .then((courses) => {
      // console.log('Kurse geladen');
      // console.log(JSON.stringify(courses));

      let nextCourse = Courses.getNextCourse(courses, ['Kanukurs', 'Eskimotieren'], ['Kajak', 'alle']);
      CourseHandling.renderNextCourse(nextCourse, 'course', 'joyofwhitewater');
      // console.log('nextCourse: ' + JSON.stringify(nextCourse));

      let nextPaddleJourney = Courses.getNextCourse(courses, ['Paddelreise'], ['Kajak', 'alle']);
      CourseHandling.renderNextCourse(nextPaddleJourney, 'journey', 'joyofwhitewater');
      // console.log('nextPaddleJourney: ' + JSON.stringify(nextPaddleJourney));

      CourseHandling.init();
    })
    .catch((error) => {
      console.log(error);
    });
  };

  //public api
  return{
    init: init
  }

})();

//wenn der DOM vollständig geladen ist init aufrufen
domIsReady(App.init);

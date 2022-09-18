"use strict";

const App = (function () {

  /**** wird vor dem DOM ready ausgeführt ****/

  /**** wird nach dem DOM ready ausgeführt ****/
  function init(){
   
  };

  //public api
  return{
    init: init
  }

})();

//wenn der DOM vollständig geladen ist init aufrufen
domIsReady(App.init);

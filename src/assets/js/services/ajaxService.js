// Code verwendet und erweitert von:
// https://medium.com/front-end-hacking/ajax-async-callback-promise-e98f8074ebd7
//
const DONE = 4;

// eslint-disable-next-line no-unused-vars
const Service = (function () {
	function ajaxCall(method, url, data) {
		var promise = new Promise((resolve, reject) => {
			var request = new XMLHttpRequest();
			var jsonRequestData = JSON.stringify(data);
			var jsonResponseData;

			request.open(method, url, true);
			request.setRequestHeader('Content-Type', 'application/json');
			request.send(jsonRequestData);

			request.onreadystatechange = function () {
				if (request.readyState === DONE) {
					//console.warn(request.responseText)
					jsonResponseData = JSON.parse(request.responseText);
					if (request.status >= 200 && request.status < 400) {
						resolve(jsonResponseData);
					} else {
						const error = new Error('Http Response Code: ' + request.status + ', Message: ' + jsonResponseData.message);
						error.jow_message = jsonResponseData.message;
						reject(error);
					}
				}
			};
		});
		return promise;
	}

	// public api
	return {
		call: ajaxCall
	};
})();

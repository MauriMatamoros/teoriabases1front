angular.module('helpiApp.Services').factory('userServices', ['$http',
	function($http){
		$http.defaults.withCredentials = true;
		//var baseUrl = 'http://cloudservices-helpi.herokuapp.com/';
		var baseUrl = 'http://192.168.1.10:8000/';
		return {
				Update: function(payload, id){
					return $http.put(baseUrl + "users/update/" + id, payload);
				},
				Delete: function(password, id){
					return $http.delete(baseUrl + 'users/deleteuser/' + id + '/' + password);
				}
	    };
}]);

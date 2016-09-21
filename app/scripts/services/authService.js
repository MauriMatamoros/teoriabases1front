angular.module('helpiApp.Services').factory('AuthService', ['$http',
	function($http){
		$http.defaults.withCredentials = true;
		//var baseUrl = 'http://cloudservices-helpi.herokuapp.com/';
		var baseUrl = 'http://localhost:8000/';

		return {
				Logout: function(){
					return $http.get(baseUrl + "v1/logoutDocente");
				},
				Login: function(payload){
					return $http.post(baseUrl + "v1/loginDocente", payload);
				},
	      Register: function(payload){
	        return $http.post(baseUrl + "v1/registrarDocente", payload);
		    },
				// RegisterAdmin: function(payload){
				// return $http.post(baseUrl + "users/createuser", payload);
				// },
				userbyEmail: function(email){
					return $http.get(baseUrl + "users/useremail/" + email);
				}
	    };
}]);

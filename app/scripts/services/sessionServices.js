angular.module('helpiApp.Services').factory('sessionService', ['$http',
	function($http){
		$http.defaults.withCredentials = true;
	 	var baseUrl = 'http://25.7.204.188:8000/';
		//var baseUrl = 'http://cloudservices-helpi.herokuapp.com/';
		return {
				getUsers: function(){
					return $http.get(baseUrl + "v1/Usuarios");
				}
				deleteUser: function(id){
					return $http.delete(baseUrl + "v1/Usuario/" + id)
				}
	    };
}]);

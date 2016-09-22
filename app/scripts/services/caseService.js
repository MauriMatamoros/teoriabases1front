angular.module('helpiApp.Services').factory('caseService', ['$http',
	function($http){
		$http.defaults.withCredentials = true;
		//var baseUrl = 'http://cloudservices-helpi.herokuapp.com/';
		var baseUrl = 'http://25.7.204.188:8000/';

		return {
      Add: function(payload){
        return $http.post(baseUrl + "cases/addcase", payload);
      },
      Delete: function(id){
        return $http.delete(baseUrl + "cases/deletecase/" + id);
      },
			GetCases: function(id){
				return $http.get(baseUrl + "cases/getcases");
			},
			GetTables: function(id){
				return $http.get(baseUrl + "tables/gettables");
			},
			userbyEmail: function(id){
				return $http.get(baseUrl + "users/allMyUsers/" + id);
			}
    };
}]);

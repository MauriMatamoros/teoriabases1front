angular.module('helpiApp.Services').factory('labService', ['$http',
	function($http){
		$http.defaults.withCredentials = true;
		//var baseUrl = 'http://cloudservices-helpi.herokuapp.com/';
		var baseUrl = 'http://192.168.1.10:8000/';

		return {
      Add: function(payload){
        return $http.post(baseUrl + "v1/agregarLaboratorio", payload);
      },
      Delete: function(id){
        return $http.delete(baseUrl + "v1/borrarLaboratorio/"+id);
      },
		GetLabs: function(){
			return $http.get(baseUrl + "v1/Laboratorios");
		}
    };
}]);

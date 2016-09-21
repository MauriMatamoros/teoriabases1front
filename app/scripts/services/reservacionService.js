angular.module('helpiApp.Services').factory('reservacionService', ['$http',
    function($http){
		$http.defaults.withCredentials = true;
		var baseUrl = 'http://192.168.43.174:8000/';

        return {
            Add: function(payload){
                return $http.post(baseUrl + "v1/agregarReserva", payload);
            },
            /*Delete: function(id){
                return $http.delete(baseUrl + "v1/borrarReserva" + id);
            },*/
			GetReservas: function(_lab_id){
				return $http.get(baseUrl + "v1/Reserva/{_lab_id}");
			}
        };
}]);

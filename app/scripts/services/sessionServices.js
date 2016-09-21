angular.module('helpiApp.Services').factory('sessionService', ['$http',
	function($http){
		$http.defaults.withCredentials = true;
	 	var baseUrl = 'http://192.168.43.174:8000/';
		//var baseUrl = 'http://cloudservices-helpi.herokuapp.com/';
		return {
				GetCases: function(id){
					return $http.get(baseUrl + "cases/getcases");
				},
				PostDonor: function(payload, id){
					return $http.put(baseUrl + "tables/updatemytable/" + id, payload);
				},
				PostCaseToUser: function(id, payload){
					return $http.post(baseUrl + "users/mycases/"+ id +"/addCase", payload);
				},
				userbyEmail: function(email){
					return $http.get(baseUrl + "users/useremail/" + email);
				},
				GetCaseByID: function(caseID){
					return $http.get(baseUrl + "cases/caseid/" + caseID);
				},
				PutMoney: function(payload, id){
					return $http.put(baseUrl + "cases/SetMoneyTo/" + id, payload);
				}
	    };
}]);

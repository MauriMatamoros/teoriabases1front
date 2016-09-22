angular.module('helpiApp.Controllers')
  .controller('sessionController', ['$scope', 'sessionService', '$sessionStorage', '$window', function ($scope, sessionService, $sessionStorage, $window){

    $scope.users = [];

    angular.element().ready(function(){
      $scope.getUsers();
    });
    
    $scope.deleteUser = function(user){
      sessionService.Delete(user.id).then( function(response){
        $window.location.reload();
        Materialize.toast(response.data, 3500);
      }).catch(function (err){
        if (err) {
          Materialize.toast(err.data, 3500);
        }
      })
    }
    $scope.getUsers = function(){
      sessionService.getUsers().then(function(response) {
        $scope.users = response.data;
        console.log(response.data);
      }).catch(function(err) {
        console.log(err);
      });
    }
    $scope.isAdmin = function(){
      return $sessionStorage.currentUser && $sessionStorage.currentUser.scope.indexOf('admin') > -1;
    }

  }]);

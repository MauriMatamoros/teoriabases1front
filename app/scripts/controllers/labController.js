angular.module('helpiApp.Controllers')
  .controller('labController', ['labService', '$scope', '$rootScope', '$sessionStorage', '$location', '$window',
function (labService, $scope, $rootScope, $sessionStorage, $location, $window) {
    $scope.Lab = {};
    $scope.Labs = [];
    angular.element().ready(function(){
      $scope.getLabs();
    });

    $scope.getLabs = function(){
      console.log('getting labs')
      labService.GetLabs().then(function(response) {
        $scope.Labs = response.data;
        console.log(response.data);
      }).catch(function(err) {
        console.log(err);
      });
    }

    $scope.addLab = function(Lab){
      console.log("adding lab");
      labService.Add({
        Nombre: Lab.Nombre,
        Descripcion: Lab.Descripcion,
        Ubicacion: Lab.Ubicacion,
        Capacidad: Lab.Capacidad,
        id: Lab.id,
      }).then( function(response){
        $window.location.reload();
        Materialize.toast(response.data, 3500);
      }).catch(function (err){
        if (err) {
          console.log(err.data);
          // Materialize.toast(err.data, 3500);
        }
      })
    }
    $scope.deleteLab = function(Lab){
      labService.Delete(Lab.id).then( function(response){
        $window.location.reload();
        Materialize.toast(response.data, 3500);
      }).catch(function (err){
        if (err) {
          Materialize.toast(err.data, 3500);
        }
      })
    }

    $scope.isAdmin = function(){
      console.log("Es" + $sessionStorage.currentUser);
      return $sessionStorage.currentUser && $sessionStorage.currentUser.isAdmin;
    }
}]);

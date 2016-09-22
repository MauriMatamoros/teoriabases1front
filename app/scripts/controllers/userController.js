angular.module('helpiApp.Controllers')
.controller('userCtrl', ['$scope', 'userServices', '$sessionStorage', '$location', function ($scope, userServices, $sessionStorage, $location) {
      $scope.user = {
        Nombre: $scope.currentUser.Nombre,
        Apellido: $scope.currentUser.Apellido,
        Telefono: $scope.currentUser.Telefono,
        Departamento: $scope.currentUser.Departamento,
        Campus: $scope.currentUser.Campus,
        Email: $scope.currentUser.Email,
        Password: $scope.currentUser.Password,
        isAdmin: $scope.currentUser.isAdmin
      };
      $scope.password = {};

      $scope.updateUser = function(){
        $sessionStorage.currentUser.nombre = $scope.user.Nombre;
        $sessionStorage.currentUser.apellido = $scope.user.Apellido;
        $sessionStorage.currentUser.email = $scope.user.Email;
        $sessionStorage.currentUser.telefono = $scope.user.Telefono;
        $sessionStorage.currentUser.campus = $scope.user.Campus;
        $sessionStorage.currentUser.departamento = $scope.user.Departamento;
        $scope.user = $sessionStorage.currentUser;
        console.log('username: ' + $scope.user.Email);
        userServices.Update($scope.user, $sessionStorage.currentUser.id).then(function(response){
          console.log(response);
          Materialize.toast("Usuario Modificado", 2500);
          $location.path('/perfilView');
        }).catch(function(err){
          Materialize.toast(err.data.error + " " + err.data.message, 3500);
        });
      }
      $scope.deleteUser = function(){
        userServices.Delete($scope.password.pass, $sessionStorage.currentUser.email).then(function(response){
          Materialize.toast("Usuario Eliminado", 4000);
          $sessionStorage.$reset();
          $location.path('/portfolio');
        }).catch(function(err){
          console.log(err);
          Materialize.toast(err.data.message,3000);
        });
      }
}]);

angular.module('helpiApp.Controllers')
  .controller('authController', ['AuthService', '$scope', '$rootScope', '$sessionStorage', '$location', function (authService, $scope, $rootScope, $sessionStorage, $location) {
      $scope.user = {};
      $scope.$sessionStorage = $sessionStorage;
      $scope.editMode = false;
      $scope.DeleteMode = false;
      $scope.boyProfile = "https://freeiconshop.com/files/edd/person-flat.png";
      $scope.girlProfile = "http://hamisun.com/wp-content/uploads/2016/02/person-girl-flat.png";

      $scope.editBtn = function() {
        if ($scope.editMode === true) {
          $scope.editMode = false;
        }else{
          $scope.editMode = true;
        }
      }

      $scope.logout = function(){
        authService.Logout().then(function(response){
          Materialize.toast(response.data, 3500);
          $location.path('/portfolio');
        }).catch(function(err){
          Materialize.toast(err.data.error + " " + err.data.message, 3500);
          console.log(err);
        });
        $sessionStorage.$reset();
      }

      $scope.login = function(user){
        authService.Login(user).then(function(response){
          $sessionStorage.currentUser = response.data;
          $scope.user = {};
            $location.path('/addLab');
            Materialize.toast('Bienvenido ' + $sessionStorage.currentUser.Nombre + " " + $sessionStorage.currentUser.Apellido, 3500);
        }).catch(function(err){
          Materialize.toast(err.data.error + " " + err.data.message, 3500);
        });
      }

      $scope.register = function(){
        var user = {
          Nombre: $scope.user.Nombre,
          Apellido: $scope.user.Apellido,
          Telefono: $scope.user.Telefono,
          Departamento: $scope.user.Departamento,
          Campus: $scope.user.Campus,
          Email: $scope.user.Email,
          Password: $scope.user.Password,
          isAdmin: 0
        }
        authService.Register(user).then(function(response){
          console.log('Registrado');
          Materialize.toast('Registrado Correctamente!!!', 3500);
          $location.path('/addLab');
        }).catch(function(err){
          console.log(err);
          Materialize.toast(err.data.error + " " + err.data.message, 3500);
        });
      }

       $scope.isAdmin = function(){
         console.log("Es" + $sessionStorage.currentUser);
         return $sessionStorage.currentUser && $sessionStorage.currentUser.isAdmin;
       }

  }]);

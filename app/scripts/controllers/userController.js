angular.module('helpiApp.Controllers')
.controller('userCtrl', ['$scope', 'userServices', '$sessionStorage', '$location', function ($scope, userServices, $sessionStorage, $location) {
      $scope.user = {
        id: $sessionStorage.currentUser.id,
        name: $sessionStorage.currentUser.name,
        username: $sessionStorage.currentUser.username,
        scope: $sessionStorage.currentUser.scope,
        email: $sessionStorage.currentUser.email,
      };
      $scope.password = {};

      $scope.updateUser = function(){
        $sessionStorage.currentUser.nombre = $scope.user.name;
        $sessionStorage.currentUser.apellido = $scope.user.apellido;
        $sessionStorage.currentUser.email = $scope.user.email;
        $sessionStorage.currentUser.telefono = $scope.user.telefono;
        $sessionStorage.currentUser.campus = $scope.user.campus;
        $sessionStorage.currentUser.departamento = $scope.user.departamento;
        $scope.user = $sessionStorage.currentUser;
        console.log('username: ' + $scope.user.email);
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
        // if($sessionStorage.currentUser.provider === "Google"){
        //   var user = firebase.auth().currentUser;
        //   user.delete().then(function() {
        //     userServices.Delete("googleUser", $sessionStorage.currentUser.id).then(function(response){
        //       Materialize.toast("Usuario Eliminado", 4000);
        //       $sessionStorage.$reset();
        //       $location.path('/portfolio');
        //     }).catch(function(err){
        //       console.log(err);
        //       Materialize.toast(err.data.message,3000);
        //     });
        //   }, function(error) {
        //     Materialize.toast('Error con firebase', 4000);
        //   });
        // }else if($sessionStorage.currentUser.provider === "Teoria"){
        //   userServices.Delete($scope.password.pass, $sessionStorage.currentUser.id).then(function(response){
        //     Materialize.toast("Usuario Eliminado", 4000);
        //     $sessionStorage.$reset();
        //     $location.path('/portfolio');
        //   }).catch(function(err){
        //     console.log(err);
        //     Materialize.toast(err.data.message,3000);
        //   });
        // }else if($sessionStorage.currentUser.provider === "Facebook"){
        //   var user = firebase.auth().currentUser;
        //   user.delete().then(function() {
        //     userServices.Delete("facebookUser", $sessionStorage.currentUser.id).then(function(response){
        //       Materialize.toast("Usuario Eliminado", 4000);
        //       $sessionStorage.$reset();
        //       $location.path('/portfolio');
        //     }).catch(function(err){
        //       console.log(err);
        //       Materialize.toast(err.data.message,3000);
        //     });
        //   }, function(error) {
        //     Materialize.toast('Error con firebase', 4000);
        //   });
        // }
      }
}]);

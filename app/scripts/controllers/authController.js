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

      // $scope.signInGoogle = function() {
      //   var provider = new firebase.auth.GoogleAuthProvider();
      //
      //   firebase.auth().signInWithPopup(provider).then(function(result) {
      //     // This gives you a Google Access Token. You can use it to access the Google API.
      //     var token = result.credential.accessToken;
      //     // The signed-in user info.
      //     var user = result.user;
      //     authService.userbyEmail(user.email).then(function(response) {
      //       $scope.userFound = response.data[0];
      //       var googleUser = {name: $scope.userFound.name, username: $scope.userFound.username, password: 'googleUser', email: user.email, scope: ['donante'], profile_photo: user.photoURL, provider: 'Google'};
      //       authService.Register(googleUser).then(function(response){
      //         Materialize.toast('Registrado en la base de datos', 1500);
      //         $scope.login({username: googleUser.username, password: googleUser.password});
      //       }).catch(function(err){
      //         var errData = err.data.error;
      //         var errMessage = err.data.message;
      //         if(err.data.error){
      //           $scope.login({username: googleUser.username, password: googleUser.password});
      //         }
      //       });
      //     }).catch(function(err){
      //       if(user.displayName != null){
      //         var googleUser = {name: user.displayName, username: user.email, password: 'googleUser', email: user.email, scope: ['donante'], profile_photo: user.photoURL, provider: 'Google'};
      //       }else{
      //         var googleUser = {name: "Anonimo", username: user.email, password: 'googleUser', email: user.email, scope: ['donante'], profile_photo: user.photoURL, provider: 'Google'};
      //       }
      //       authService.Register(googleUser).then(function(response){
      //         Materialize.toast('Registrado en la base de datos', 1500);
      //         $scope.login({username: googleUser.username, password: googleUser.password});
      //       }).catch(function(err){
      //         var errData = err.data.error;
      //         var errMessage = err.data.message;
      //         if(err.data.error){
      //           $scope.login({username: googleUser.username, password: googleUser.password});
      //         }
      //       });
      //     });
      //   }).catch(function(error) {
      //     // Handle Errors here.
      //     var errorCode = error.code;
      //     var errorMessage = error.message;
      //     // The email of the user's account used.
      //     var email = error.email;
      //     // The firebase.auth.AuthCredential type that was used.
      //     var credential = error.credential;
      //
      //     Materialize.toast(errorMessage, 3500);
      //     console.log('Error code: ' + errorCode);
      //     console.log('Error email: ' + email);
      //     console.log('Error credential: ' + credential);
      //     // ...
      //   });
      // }
      //
      // $scope.signInFacebook = function() {
      //   var provider = new firebase.auth.FacebookAuthProvider();
      //
      //   firebase.auth().signInWithPopup(provider).then(function(result) {
      //     // This gives you a Facebook Access Token. You can use it to access the Facebook API.
      //     var token = result.credential.accessToken;
      //     // The signed-in user info.
      //     var user = result.user;
      //     authService.userbyEmail(user.email).then(function(response) {
      //       $scope.userFound = response.data[0];
      //
      //       var facebookUser = {name: $scope.userFound.name, username: $scope.userFound.username, password: 'facebookUser', email: user.email, scope: ['donante'], profile_photo: user.photoURL, provider: 'Facebook'};
      //       authService.Register(facebookUser).then(function(response){
      //         Materialize.toast('Registrado en la base de datos', 1500);
      //         $scope.login({username: facebookUser.username, password: facebookUser.password});
      //       }).catch(function(err){
      //         var errData = err.data.error;
      //         var errMessage = err.data.message;
      //         if(err.data.error){
      //           $scope.login({username: facebookUser.username, password: facebookUser.password});
      //         }
      //       });
      //     }).catch(function(err){
      //       if(user.displayName != null){
      //         var facebookUser = {name: user.displayName, username: user.email, password: 'facebookUser', email: user.email, scope: ['donante'], profile_photo: user.photoURL, provider: 'Facebook'};
      //       }else{
      //         var facebookUser = {name: 'Anonimo', username: user.email, password: 'facebookUser', email: user.email, scope: ['donante'], profile_photo: user.photoURL, provider: 'Facebook'};
      //       }
      //       authService.Register(facebookUser).then(function(response){
      //         Materialize.toast('Registrado en la base de datos', 1500);
      //         $scope.login({username: facebookUser.username, password: facebookUser.password});
      //       }).catch(function(err){
      //         var errData = err.data.error;
      //         var errMessage = err.data.message;
      //         if(err.data.error){
      //           $scope.login({username: facebookUser.username, password: facebookUser.password});
      //         }
      //       });
      //     });
      //     // ...
      //   }).catch(function(error) {
      //     // Handle Errors here.
      //     var errorCode = error.code;
      //     var errorMessage = error.message;
      //     // The email of the user's account used.
      //     var email = error.email;
      //     // The firebase.auth.AuthCredential type that was used.
      //     var credential = error.credential;
      //     console.log('Error code: ' + errorCode);
      //     Materialize.toast(errorMessage, 3500);
      //     console.log('Error email: ' + email);
      //     console.log('Error credential: ' + credential);
      //     // ...
      //   });
      // }
      // $scope.registerAdmin = function(){
      //   var user = {
      //     name: $scope.user.name,
      //     username: $scope.user.username,
      //     password:  $scope.user.password,
      //     email: $scope.user.email,
      //     scope: ['admin'],
      //     provider: 'Helpi'
      //   };
      //   authService.Register(user).then(function(response){
      //     Materialize.toast('Registrado Correctamente!!!', 3500);
      //     $location.path('/cases');
      //   }).catch(function(err){
      //     console.log(err);
      //     Materialize.toast(err.data.error + " " + err.data.message, 3500);
      //   })
      // }

      // $scope.isAdmin = function(){
      //   return $sessionStorage.currentUser && $sessionStorage.currentUser.scope.indexOf('admin') > -1;
      // }
      //
      // $scope.isDonante = function(){
      //   return $sessionStorage.currentUser && $sessionStorage.currentUser.scope.indexOf('donante') > -1;
      // }
  }]);

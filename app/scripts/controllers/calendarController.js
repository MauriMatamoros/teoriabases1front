angular.module('helpiApp.Controllers')
  .controller('calendarController', ['reservacionService', '$scope', '$rootScope', '$sessionStorage', '$location', '$window',
function (reservacionService, $scope, $rootScope, $sessionStorage, $location, $window) {
    $scope.Reserva = {};
    $scope.Reservas = [];
    var date = new Date();
    var d = date.getDate();
    var m = date.getMonth();
    var y = date.getFullYear();

    //id de laboratorio
    //get de reservaciones para un laboratorio
    $scope.getReservas = function(id){
      reservacionService.GetReservas(id).then(function(response) {
        $scope.Reservas = response.data;
        console.log($scope.Reservas);
      }).catch(function(err) {
        console.log(err.data);
      });
    }

    $scope.addReserva = function(Reserva){

      var date_ini = Reserva.fecha_inicio.split("/");
      var date_end = Reserva.fecha_fin.split("/");
      var hour_ini = Reserva.hora_inicio.split(":");
      var hour_end = Reserva.hora_fin.split(":");

      var initial = new Date(date_ini[0],date_ini[1],date_ini[2],hour_ini[0],hour_ini[1],0,0);
      var final = new Date(date_end[0],date_end[1],date_end[2],hour_end[0],hour_end[1],0,0);
alert(initial);
alert(final);
      reservacionService.Add({
        idLab: Reserva.id,
        Email: $scope.currentUser.Email,
        Fecha_I:initial,
        Fecha_F:final,
        Descripcion: Reserva.descripcion

      }).then( function(response){

        $window.location.reload();
        Materialize.toast(response.data, 3500);
      }).catch(function (err){
        if (err) {
          console.log(err.data);
          Materialize.toast(err.data, 3500);
        }
      })
    }
}]);

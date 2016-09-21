angular.module('helpiApp.Controllers')
  .controller('calendarController', ['ui.calendar','ui.bootstrap','reservacionService', '$scope', '$rootScope', '$sessionStorage', '$location', '$window',
function (reservacionService, $scope, $rootScope, $sessionStorage, $location, $window, $compile, uiCalendarConfig) {
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

      reservacionService.Add({
        idLab: Reserva.id,
        Email: "ricardo.j.galdamez@gmail.com",
        fecha_I:Reserva.fecha_inicio,
        fecha_F:Reserva.fecha_fin,
        Descripcion: Reserva.descripcion

      }).then( function(response){
        $window.location.reload();
        //Materialize.toast(response.data, 3500);
      }).catch(function (err){
        if (err) {
          console.log(err.data);
          // Materialize.toast(err.data, 3500);
        }
      })
    }
}]);

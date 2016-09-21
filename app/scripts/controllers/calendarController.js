angular.module('AngularScaffold.Controllers')
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
        id: Reserva.id,
        email: "ricardo.j.galdamez@gmail.com",
        descripcion: Reserva.descripcion,
        fecha_inicio:Reserva.fecha_inicio,
        fecha_fin:Reserva.fecha_fin,
        
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
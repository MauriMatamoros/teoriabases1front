angular.module('helpiApp.Controllers')
  .controller('caseController', ['caseService', '$scope', '$rootScope', '$sessionStorage', '$location', '$window',
function (caseService, $scope, $rootScope, $sessionStorage, $location, $window) {
    $scope.case = {};
    $scope.cases = [];
    $scope.table = {};
    $scope.tables = [];
    $scope.myDonors = [];

    $scope.fillCards = function(tableID){
      $scope.myDonors = [];
      for (var i = 0; i < tableID.donors.length; i++) {
        caseService.userbyEmail(tableID.donors[i]).then(function(response){
          $scope.myDonors[i] = response.data[0].name;
        }).catch(function(err){
          console.log(err.data);
        })
      }
    }

    $scope.getCases = function(){
      caseService.GetCases().then(function(response) {
        $scope.cases = response.data;
        console.log($scope.cases);
      }).catch(function(err) {
        console.log(err.data);
      });
    }


    $scope.getTables = function(){
      caseService.GetTables().then(function(response) {
        $scope.tables = response.data;
      }).catch(function(err) {
        console.log(err.data);
      });
    }

    angular.element().ready(function () {
      $scope.getCases();
      $scope.getTables();
    });

    $scope.addCase = function(caso){
      caseService.Add({
        name: caso.name,
        imageLink: caso.imageLink,
        description: caso.description,
        resume: caso.resume,
        money: caso.money,
        priority: caso.priority,
        MoneyGot: 0}).then( function(response){
        $window.location.reload();
        Materialize.toast(response.data, 3500);
      }).catch(function (err){
        if (err) {
          console.log(err.data);
          // Materialize.toast(err.data, 3500);
        }
      })
    }
    $scope.deleteCase = function(caso){
      caseService.Delete(caso._id).then( function(response){
        $window.location.reload();
        Materialize.toast(response.data, 3500);
      }).catch(function (err){
        if (err) {
          Materialize.toast(err.data, 3500);
        }
      })
    }
}]);

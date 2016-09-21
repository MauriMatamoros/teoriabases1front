angular.module('helpiApp.Controllers')
  .controller('sessionController', ['$scope', 'sessionService', '$sessionStorage', '$window', function ($scope, sessionService, $sessionStorage, $window){

    $scope.cases = [];
    $scope.case = {};
    $scope.match_id = [];
    $scope.tempCases = [];
    $scope.moneydonor = {};
    $scope.flag = true;

    $scope.changeValue = function(){
      if($scope.flag === true){
        $scope.flag = false;
      }else{
        $scope.flag = true;
      }
    }

    $scope.getCases = function(){
      sessionService.GetCases().then(function(response) {
        $scope.cases = response.data;
      }).catch(function(err) {
        console.log(err.data);
      });
    }

    angular.element().ready(function () {
      $scope.getCases();
    });

    $scope.setDonorToHelpi = function(caseId){
      sessionService.PostCaseToUser($sessionStorage.currentUser.id, {_id: caseId._id}).then(function(response){
        console.log('Id de caso, agregado a cases de users');
      }).catch(function(err){
        console.log(err.data);
        // Materialize.toast(err.data.message, 4500);
      });
      console.log($scope.moneydonor);
      sessionService.GetCaseByID(caseId._id).then(function(response) {
        console.log(response.data[0]);
        sessionService.PutMoney({money: Number($scope.moneydonor.money) + response.data[0].MoneyGot}, caseId._id).then(function(response) {
          Materialize.toast('Dinero asignado a caso', 3500);
        }).catch(function(err){
          console.log(err.data.message);
        })
      }).catch(function(err){})
      sessionService.PostDonor({_id: $sessionStorage.currentUser.id}, caseId._id).then(function(response) {
        Materialize.toast(response.data, 3500);
      }).catch(function(err) {
        Materialize.toast(err.data.message, 3500);
      });
    }
    $scope.isAdmin = function(){
      return $sessionStorage.currentUser && $sessionStorage.currentUser.scope.indexOf('admin') > -1;
    }

    $scope.isDonante = function(){
      return $sessionStorage.currentUser && $sessionStorage.currentUser.scope.indexOf('donante') > -1;
    }

  }]);

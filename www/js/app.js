/**
 * Module defination for the DataphiApp module.
 */

(function(angular){
  function theme($stateProvider, $urlRouterProvider, $mdThemingProvider, cfpLoadingBarProvider, $httpProvider){
    $httpProvider.defaults.headers.common = {'Accept' : 'application/json'};
    $httpProvider.defaults.headers.post = {'Content-Type' : 'application/json'};
    cfpLoadingBarProvider.includeSpinner = false;
    $urlRouterProvider.otherwise('/new');
    $stateProvider
      .state('patientlist', {
          url: '/list',
          templateUrl: 'templates/patientlist.html',
          controller : 'PatientList'
      })
      .state('newpatient', {
          url: '/new',
          templateUrl: 'templates/newpatient.html',
          controller:'NewPatient'
      });
  }

  function NewPatient($scope, $state, $http){
    $scope.gender = ["Female", "Male", "Other"];
    $scope.submit = function(){
      var data = $scope.patient;
      $scope.patient.DOB = $scope.patient.db.getTime();
      var successCallback = function(v){
        console.log(v);
        if(v.data.Status.ResponseCode == 200){
          $state.go('patientlist');
        }else{
          alert(v.Error);
        }
      }
      var errorCallback = function(err){
        if(err.status == -1){
          alert("Please Check Your Internet Connection");
        }else{
          alert("Something went wrong!!");
        }
      }
      $http.post('/patients', data).then(successCallback, errorCallback);
    }
  }

  function PatientList($scope, $state, $http, $mdPanel){
    var gend =["Female", "Male", "Other"];
    $http.get('/patients').then(function(data){
      console.log(data);
      if(data.data.Status.ResponseCode == 200){
        $scope.patients = data.data.Data;
        for(let i in $scope.patients){
          $scope.patients[i].full = $scope.patients[i].FirstName + $scope.patients[i].LastName;
          $scope.patients[i].DOB = new Date($scope.patients[i].DOB);
          $scope.patients[i].Gender = gend[$scope.patients[i].Gender];
        }
      }else{
        alert(data.Error);
      }
    },function(err){
      if(err.status == -1){
        alert("Please Check Your Internet Connection");
      }else{
        alert("Something went wrong!!");
      }
    });
    $scope.new = function(){
      $state.go('newpatient');
    }
  }
  angular.module('DataphiApp', ['ui.router', 'ngMaterial', 'ngAnimate', 'ngAria', 'ngMessages', 'angular-loading-bar'])
    .config(['$stateProvider', '$urlRouterProvider', '$mdThemingProvider', 'cfpLoadingBarProvider', '$httpProvider', theme])
    .controller('NewPatient', ['$scope', '$state', '$http', NewPatient])
    .controller('PatientList', ['$scope','$state','$http', '$mdPanel', PatientList]);
})(angular)

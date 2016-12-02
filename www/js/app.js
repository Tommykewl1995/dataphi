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

  function showerror(mdDialog, text, ev){
    mdDialog.show(
      mdDialog.alert()
        .parent(angular.element(document.body))
        .clickOutsideToClose(true)
        .title('Error!')
        .textContent(text)
        .ariaLabel('Error dialog')
        .ok('OK')
        .targetEvent(ev)
    );
  };

  function NewPatient($scope, $state, $http, $mdDialog){
    $scope.gender = ["Female", "Male", "Other"];
    $scope.submit = function(ev){
      var data = $scope.patient;
      $scope.patient.DOB = $scope.patient.db.getTime();
      var successCallback = function(v){
        if(v.data.Error){
          showerror($mdDialog, v.data.Error, ev);
        }else{
          $state.go('patientlist');
        }
      }
      var errorCallback = function(err){
        if(err.status == -1){
          showerror($mdDialog, "Please Check Your Internet Connection", ev);
        }else{
          showerror($mdDialog, "Something went wrong!!", ev);
        }
      }
      $http.post('/patients', data).then(successCallback, errorCallback);
    }
  }

  function PatientList($scope, $state, $http, $mdDialog){
    var gend =["Female", "Male", "Other"];
    $http.get('/patients').then(function(data){
      if(data.data.Error == 200){
        showerror($mdDialog, data.data.Error, ev);
      }else{
        $scope.patients = data.data.Data;
        for(let i in $scope.patients){
          $scope.patients[i].full = $scope.patients[i].FirstName + $scope.patients[i].LastName;
          $scope.patients[i].DOB = new Date($scope.patients[i].DOB);
          $scope.patients[i].Gender = gend[$scope.patients[i].Gender];
        }
      }
    },function(err){
      if(err.status == -1){
        showerror($mdDialog, "Please Check Your Internet Connection", ev);
      }else{
        showerror($mdDialog, "Something went wrong!!", ev);
      }
    });
    $scope.new = function(){
      $state.go('newpatient');
    }
  }
  angular.module('DataphiApp', ['ui.router', 'ngMaterial', 'ngAnimate', 'ngAria', 'ngMessages', 'angular-loading-bar'])
    .config(['$stateProvider', '$urlRouterProvider', '$mdThemingProvider', 'cfpLoadingBarProvider', '$httpProvider', theme])
    .controller('NewPatient', ['$scope', '$state', '$http','$mdDialog', NewPatient])
    .controller('PatientList', ['$scope','$state','$http', '$mdDialog', PatientList]);
})(angular)

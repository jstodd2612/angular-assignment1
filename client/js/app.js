angular.module('RepsApp', [
  'RepsAppControllers'
]); // <--- Have to pass in an array[] to declare it as a new module.

angular
  .module('RepsAppControllers', [])
  .controller(
    'MainCtrl', function($http){
      var main = this;
      main.reps = [];

      main.searchByZip = function (zip){
        $http
          .get('http://dgm-representatives.herokuapp.com/all/by-zip/' + zip)
          .then(function(res){
            main.reps = res.data;
        });
      };
  });

angular.module('RepsApp', [
  'RepsAppControllers'
]); // <--- Have to pass in an array[] to declare it as a new module.

angular
  .module('RepsAppControllers', [
    'repsService'
  ])
  .controller('MainCtrl', function (reps) {
    var main = this;
    main.reps = [];

    main.chooseType = 'reps';

    function assignReps(data) {
      main.reps = data;
    }

    main.apis = [
      {
        label: 'Name',
        method: function (name) {
          console.log("name working");
          reps.searchByType(main.chooseType,'name', name).then(assignReps);
        }
      },
      {
        label: 'State',
        method: function (state) {
          console.log("State is Workinginsh");
          reps.searchByType(main.chooseType,'state', state).then(assignReps);
        }
      },
      {
        label: 'Zip',
        method: function (zip) {
          console.log("Zip is Workingish");
          reps.searchByType('all', 'zip', zip).then(assignReps);
        }
      }
    ];

    main.selectedApi = main.apis[0];

  });

angular
  .module('repsService', [])
  .factory('reps', function ($http) {
    var host = 'http://dgm-representatives.herokuapp.com';
    return {
      searchByType: function(type, sort, name) {
        return $http
          .get(host + '/' + type + '/by-' + sort + '/' + name)
          .then(function(response){
            return response.data;
        });
      }
    }
  });

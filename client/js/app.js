angular.module('RepsApp', [
  'RepsAppControllers'
]); // <--- Have to pass in an array[] to declare it as a new module.

angular
  .module('RepsAppControllers', [
    'congressService'
  ])
  .controller('MainCtrl', function (congress) {
    var main = this;

    main.reps = [];
    main.congressType = 'reps';
    main.searchedOnce = false;
    main.loading = false;

    function assignCongress(data) {
      main.searchedOnce = true;
      main.reps = data;
      main.loading = false;
    }

    main.apis = [
      {
        label: 'State',
        method: function (state) {
          main.loading = true;
          congress(main.congressType,'state', state).then(assignCongress);
        }
      },
      {
        label: 'Zip',
        method: function (zip) {
          main.loading = true;
          congress('all', 'zip', zip).then(assignCongress);
        }
      },
      {
        label: 'Last Name',
        method: function (name) {
          main.loading = true;
          congress(main.congressType,'name', name).then(assignCongress);
        }
      }
    ];

    main.criteria = main.apis[0];

  });

angular
  .module('congressService', [])
  .factory('congress', function ($http) {
    var host = 'http://dgm-representatives.herokuapp.com';

    function search(type, criteria, query){
      return $http
        .get(host + '/' + type + '/by-' + criteria + '/' + query)
        .then(function(response){
          return response.data;
        })
    }

    return search;
  });

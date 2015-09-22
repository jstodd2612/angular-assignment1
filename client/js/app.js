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

    function assignCongress(data) {
      main.reps = data;
    }

    main.apis = [
      {
        label: 'Name',
        method: function (name) {
          congress.search(main.congressType,'name', name).then(assignCongress);
        }
      },
      {
        label: 'State',
        method: function (state) {
          congress.search(main.congressType,'state', state).then(assignCongress);
        }
      },
      {
        label: 'Zip',
        method: function (zip) {
          congress.search('all', 'zip', zip).then(assignCongress);
        }
      }
    ];

    main.selectedApi = main.apis[0];

  });

angular
  .module('congressService', [])
  .factory('congress', function ($http) {
    var host = 'http://dgm-representatives.herokuapp.com';
    return {
      search: function(type, criteria, query) {
        return $http
          .get(host + '/' + type + '/by-' + criteria + '/' + query)
          .then(function(response){
            return response.data;
        });
      }
    }
    // function search(type, criteria, query){
    //   return $http
    //     .get(host + '/' + type + '/by-' + criteria + '/' + query)
    //     .then(function(response){
    //       return reponse.data;
    //     })
    // }
    // search.allByZip    = search.bind(null, 'all', 'zip');
    // search.repsByName  = search.bind(null, 'reps', 'name');
    // search.repsByState = search.bind(null, 'reps', 'state');
    // search.sensByName  = search.bind(null, 'sens', 'name');
    // search.sensByState = search.bind(null, 'sens', 'state');
    //
    // return search;



  });

angular.module('Persocloud', [])
  .controller('PersocloudCtrl', ['$scope', '$http', function ($scope, $http) {
      $scope.user = {};
      $scope.results = [];

      $scope.search = function () {
          /* the $http service allows you to make arbitrary ajax requests.
           * in this case you might also consider using angular-resource and setting up a
           * User $resource. */
		   $http({
			  method: 'GET',
			  url: 'http://localhost:9104/apps/persocloud/api/analyze/field=electricity&period=2016-01-01;2016-12-31'
			}).then(function (response) {
				$scope.results.push(response.data);
			  }, function (response) {
				console.log("failed :(", failure);
			  });
      }
  }]);

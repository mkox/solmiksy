define(["jquery", "underscore", "angular", "cas/categoriesAndStrings", "solmiBasics"], function ($, _, ng, cas, sb) {
//define(function(require) {
//  var cas = require('cas/categoriesAndStrings');
    cas.directive('formDeleteString', function () {

        return {
            templateUrl: sb.bPath + 'partials/stringDelete.html',
            scope: {
                category: '=', // should later not be needed
                solmistring: '=',
                vm: '='
            },
            controller: function ($scope, $element, $attrs) {
                console.log('cas-formNewString-directive [$scope, $element, $attrs]: ', [$scope, $element, $attrs]);
                $scope.vm.removeOpenForms($scope.category.id);
                $scope.vm.string = $scope.solmistring;
            }

        };
    });

});


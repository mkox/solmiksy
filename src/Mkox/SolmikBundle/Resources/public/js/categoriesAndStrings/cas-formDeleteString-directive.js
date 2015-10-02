define(["jquery", "underscore", "angular", "cas/categoriesAndStrings", "solmiBasics"], function ($, _, ng, cas, sb) {
//define(function(require) {
//  var cas = require('cas/categoriesAndStrings');
    cas.directive('formDeleteString', function () {

        return {
            templateUrl: sb.bPath + 'partials/stringDelete.html',
            scope: {
                category: '=',
                solmistring: '=',
                vm: '='
            },
            controller: function ($scope, $element, $attrs) {
//                console.log('cas-formDeleteString-directive [$scope, $element, $attrs]: ', [$scope, $element, $attrs]);
                
                $scope.vm.removeOpenForms($scope.category.id);
                $scope.vm.solmikCategory = $scope.category;
                
                $scope.vm.string = $scope.solmistring;
            }

        };
    });

});


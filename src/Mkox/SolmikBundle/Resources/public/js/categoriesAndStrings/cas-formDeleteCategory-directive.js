define(["cas/categoriesAndStrings", "solmiBasics"], function (cas, sb) {
    cas.directive('formDeleteCategory', function () {

        return {
            templateUrl: sb.bPath + 'partials/categoryDelete.html',
            scope: {
                category: '=',
                vm: '='
            },
            controller: ['$scope', function ($scope) {
//                console.log('cas-formDeleteCategory-directive [$scope, $element, $attrs]: ', [$scope, $element, $attrs]);
                
                $scope.vm.removeOpenForms($scope.category.id);
            }]

        };
    });

});


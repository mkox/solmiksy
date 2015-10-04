define(["cas/categoriesAndStrings", "solmiBasics"], function (cas, sb) {
    cas.directive('formEditCategory', function () {

        return {
            templateUrl: sb.bPath + 'partials/categoryEdit.html',
            scope: {
                category: '=',
                vm: '='
            },
            controller: ['$scope', function ($scope) {
//                console.log('cas-formEditCategory-directive [$scope, $element, $attrs]: ', [$scope, $element, $attrs]);
                
                $scope.vm.removeOpenForms($scope.category.id);
            }]

        };
    });

});


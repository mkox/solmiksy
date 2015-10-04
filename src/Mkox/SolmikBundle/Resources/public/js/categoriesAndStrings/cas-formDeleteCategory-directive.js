define(["cas/categoriesAndStrings", "solmiBasics"], function (cas, sb) {
    cas.directive('formDeleteCategory', function () {

        return {
            templateUrl: sb.bPath + 'partials/categoryDelete.html',
            scope: {
                category: '=',
                vm: '='
            },
            controller: function ($scope, $element, $attrs) {
//                console.log('cas-formDeleteCategory-directive [$scope, $element, $attrs]: ', [$scope, $element, $attrs]);
                
                $scope.vm.removeOpenForms($scope.category.id);
            }

        };
    });

});


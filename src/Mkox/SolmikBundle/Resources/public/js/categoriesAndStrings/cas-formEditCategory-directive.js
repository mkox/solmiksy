define(["cas/categoriesAndStrings", "solmiBasics"], function (cas, sb) {
    cas.directive('formEditCategory', function () {

        return {
            templateUrl: sb.bPath + 'partials/categoryEdit.html',
            scope: {
                category: '=',
                vm: '='
            },
            controller: function ($scope, $element, $attrs) {
//                console.log('cas-formEditCategory-directive [$scope, $element, $attrs]: ', [$scope, $element, $attrs]);
                
                $scope.vm.removeOpenForms($scope.category.id);
            }

        };
    });

});


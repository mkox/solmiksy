//define(["cas/categoriesAndStrings", "solmiBasics"], function (cas, sb) {
define(["cas/categoriesAndStrings", "solmiBasics", "cas/cas-controller"], function (cas, sb) {
    cas.directive('formEditCategory', function () {

        return {
            templateUrl: sb.bPath + 'partials/categoryEdit.html',
//            templateUrl: 'mkoxsolmik/partials/categoryEdit.html',
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


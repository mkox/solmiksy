define(["cas/categoriesAndStrings", "solmiBasics"], function (cas, sb) {
//    cas.directive('formEditCategory', function () {
    cas.directive('formEditCategory', function ($document) {

        return {
            templateUrl: sb.bPath + 'partials/categoryEdit.html',
//            templateUrl: 'mkoxsolmik/partials/categoryEdit.html',
            scope: {
                category: '=',
                vm: '='
            },
//            controller: ['$scope', function ($scope) {
            controller: ['$scope', '$rootScope', function ($scope, $rootScope) {
                console.log('$rootScope in fEC-directive', $rootScope);
                console.log('$scope in fEC-directive', $scope);
//                console.log('cas-formEditCategory-directive [$scope, $element, $attrs]: ', [$scope, $element, $attrs]);
                console.log('$document in fEC-directive', $document);
                $scope.vm.removeOpenForms($scope.category.id);
            }]

        };
    });

});


define(["cas/categoriesAndStrings", "solmiBasics"], function (cas, sb) {
    cas.directive('formNewString', function () {

        return {
            templateUrl: sb.bPath + 'partials/stringNew.html',
            scope: {
                category: '=',
                vm: '='
            },
            controller: function ($scope, $element, $attrs) {
                console.log('cas-formNewString-directive [$scope, $element, $attrs]: ', [$scope, $element, $attrs]);
                $scope.vm.removeOpenForms($scope.category.id);
                $scope.vm.string = {};
                var standardSoundKeyForNewString = JSON.parse('{"name": "C"}');
                $scope.vm.string.soundKey = standardSoundKeyForNewString;
                var categoriesForNewScope = [];
//console.log('cas-formNewString-directive $scope.myCategory: ', $scope.category);
                categoriesForNewScope.push($scope.category);
//                console.log('cas-formNewString-directive categoriesForNewScope): ', categoriesForNewScope);
                $scope.vm.string.baseScale = 4;
                $scope.vm.string.categories = categoriesForNewScope;
                console.log('cas-formNewString-directive controller bottom');
            }

        };
    });

});


define(["jquery", "underscore", "cas/categoriesAndStrings", "solmiBasics"], function ($, _, cas, sb) {
    cas.directive('formEditString', function () {

        return {
            templateUrl: sb.bPath + 'partials/stringEdit.html',
            scope: {
                category: '=',
                solmistring: '=',
                vm: '='
            },
            controller: ['$scope', function ($scope) {
//                console.log('cas-formNewString-directive [$scope, $element, $attrs]: ', [$scope, $element, $attrs]);
                
                $scope.vm.removeOpenForms($scope.category.id, $scope.solmistring.id);
                $scope.vm.solmikCategory = $scope.category;

                $scope.vm.string = $.extend(true, {}, $scope.solmistring);
                console.log('formEditString-D $scope.vm.string 1', $scope.vm.string);
                $scope.vm.string.soundKey = JSON.parse('{"name": "' + $scope.vm.string.soundKey + '"}');
                $scope.vm.originalCategoryIdsOfString = $scope.vm.string.categories;
                var categoriesForEditForm = [];
                for (var key in $scope.solmistring.categories) {
                    categoriesForEditForm.push(_.find($scope.vm.stringsInCategories, function (c) {
                        return c.id === $scope.solmistring.categories[key];
                    }));
                }
                $scope.vm.string.categories = categoriesForEditForm;
                console.log('formEditString-D $scope.vm.string 2', $scope.vm.string);
            }]

        };
    });

});


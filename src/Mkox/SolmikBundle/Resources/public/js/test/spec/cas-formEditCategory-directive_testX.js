//define(["angular-mocks", "cas/cas-controller"], function () {
define(["angular", "angular-mocks", "cas/cas-controller", "cas/cas-formEditCategory-directive", "partials/categoryEdit.html"], function (angular, mocks, ct, editCategoryDirective) {
//define(["cas/categoriesAndStrings"], function () {

    describe("cas-formEditCategory-directive", function () {

        var $rootScope;
        var $compile;
//        var $location;

//        beforeEach(module("categoriesAndStrings"));
//        beforeEach(module("solmik.templates"));
//        beforeEach(module("/assets/partials/categoryEdit.html"));
//        beforeEach(module("templates"));

        beforeEach(module("mkoxsolmik/partials/categoryEdit.html"));
//        beforeEach(function () {
//            module('mkoxsolmik/partials/categoryEdit.html');
//            module(function ($compileProvider) {
//                $compileProvider.directive('formEditCategory', editCategoryDirective);
//            });
//        });

        console.log('c-fEC-d_test x100');
        beforeEach(inject(function (_$rootScope_, _$compile_) {
            console.log('c-fEC-d_test x110');
            $rootScope = _$rootScope_;
            console.log('$rootScope 1:', $rootScope);
            $compile = _$compile_;
        }));
//        beforeEach(function () {
//            console.log('c-fEC-d_test x110b');
//            var injector = angular.injector(['ng', 'categoriesAndStrings']);
////            var injector = angular.injector(['ng', 'categoriesAndStrings', 'templates']);
//            $rootScope = injector.get("$rootScope");
//            console.log('$rootScope 1b:', $rootScope);
////            console.log('before $location');
////            $location = injector.get("$location");
////            console.log('after $location');
////            console.log('$location 1:', $location);
//            $compile = injector.get("$compile");
//            console.log('$compile 1a:', $compile);
////            $compile = injector.invoke(function ($compile) {
////                console.log('$compile 1:', $compile);
////                return $compile;
////            });
//        });
        beforeEach(function () {
            console.log('c-fEC-d_test x115');
        });
        console.log('c-fEC-d_test x120');

        afterEach(function () {

        });

        it("should edit a category name into 'new name'.", function () {
            console.log('$rootScope 2:', $rootScope);
            var $scope = $rootScope.$new();
            console.log('$scope 1:', $scope);
//            var element = $compile('<div class="step" ng-switch-when="edit" form-edit-category ng-attr-category="category" ng-attr-vm="vm">' +
//                    '<div ng-include="vm.path.categoryEdit"></div>' +
//                    '</div>')($scope);
//            var element = $compile('<div class="step" form-edit-category ng-attr-category="category" ng-attr-vm="vm">' +
//                    '<div ng-include="vm.path.categoryEdit"></div>' +
//                    '</div>')($scope);
            var element = $compile('<div class="step" form-edit-category ng-attr-category="category" ng-attr-vm="vm">' +
                    '</div>')($scope);
            console.log('editC test element: ', element);
            console.log('editC test $scope: ', $scope);
            console.log('editC test element.scope(): ', element.scope());
            $scope.div.form.solmik_category[name].$setViewValue('new name');
//            $scope.solmik_category[name].$setViewValue('new name');
            $rootScope.$digest();

            var invalid = $scope.form.aNumber.$invalid;
            expect(invalid).toBe(true);


        });

    });

});
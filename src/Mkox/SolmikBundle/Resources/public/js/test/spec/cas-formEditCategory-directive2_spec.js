//define(["angular-mocks", "cas/cas-controller"], function () {
//define(["angular", "angular-mocks", "cas/cas-controller", "cas/cas-formEditCategory-directive2", "partials/categoryEdit2.html"], function (angular, mocks, ct, editCategoryDirective) {
//define(["angular", "angular-mocks", "cas/cas-controller", "cas/cas-formEditCategory-directive2c", "partials/categoryEdit2.html"], function (angular, mocks, ct, editCategoryDirective) {
//define(["angular", "angular-mocks", "cas/cas-controller", "cas/cas-formEditCategory-directive2c", "../partials/categoryEdit2.html"], function (angular, mocks, ct, editCategoryDirective) {    
//define(["angular", "angular-mocks", "cas/categoriesAndStrings", "cas/cas-formEditCategory-directive2c", "mkoxsolmik/partials/categoryEdit2.html"], function (angular, mocks, cas, editCategoryDirective) {
//define(["angular", "angular-mocks", "cas/cas-formEditCategory-directive2c", "mkoxsolmik/partials/categoryEdit2.html"], function (angular, mocks, editCategoryDirective) {

define(["angular", "angular-mocks", "cas/cas-formEditCategory-directive2c", "cas/cas-controller", "partials/categoryEdit2.html"], function (angular, mocks, editCategoryDirective, casController) {
//define(["angular", "angular-mocks", "partials/categoryEdit2.html"], function (angular, mocks) {
//define(["angular", "angular-mocks", "partials/categoryEdit2.html", "cas/cas-formEditCategory-directive2c"], function (angular, mocks, editCategoryDirective) {
//    console.log('fEC-d2 editCategoryDirective: ', editCategoryDirective);
//    console.log('fEC-d2 casController: ', casController);

//define(["cas/categoriesAndStrings"], function () {

    describe("cas-formEditCategory-directive2b", function () {

        var $scope;
        var $rootScope;
        var $compile;
//        var $location;

        beforeEach(module("categoriesAndStrings"));
        
//        beforeEach(module("cas/categoriesAndStrings"));
//        beforeEach(module(cas));

//        beforeEach(module("categoriesAndStrings"));
//        beforeEach(module("solmik.templates"));
//        beforeEach(module("/assets/partials/categoryEdit.html"));

        beforeEach(module("templates"));
//        beforeEach(module("mkoxsolmik/partials/categoryEdit2.html"));
        
//        beforeEach(function () {
////            module('mkoxsolmik/partials/categoryEdit.html');
//            module(function ($compileProvider) {
////                $compileProvider.directive('formEditCategory', editCategoryDirective);
//                $compileProvider.directive('formEditCategory2c', editCategoryDirective);
//            });
//        });

        console.log('c-fEC-d2_test x100');
        beforeEach(inject(function (_$rootScope_, _$compile_, $controller) {
            console.log('c-fEC-d2_test x110');
            $rootScope = _$rootScope_;
            console.log('$rootScope 1(2):', $rootScope);
            $scope = $rootScope.$new();
            var ctrl = $controller('categoriesAndStringsCtrl', {
                $scope: $scope
            });
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
            console.log('c-fEC-d2_test x115');
        });
        console.log('c-fEC-d2_test x120');

        afterEach(function () {

        });

        it("(2) should edit a category name into 'new name'.", function () {
//            console.log('$rootScope 2(2):', $rootScope);
//            var $scope = $rootScope.$new();
            $scope.category = {
                "name": "Cat A",
                "public": true
            };
//            $scope.vm = casController.vm;
            console.log('$scope 1(2):', $scope);
//            var element = $compile('<div class="step" ng-switch-when="edit" form-edit-category ng-attr-category="category" ng-attr-vm="vm">' +
//                    '<div ng-include="vm.path.categoryEdit"></div>' +
//                    '</div>')($scope);
//            var element = $compile('<div class="step" form-edit-category ng-attr-category="category" ng-attr-vm="vm">' +
//                    '<div ng-include="vm.path.categoryEdit"></div>' +
//                    '</div>')($scope);
//            var element = $compile('<div class="step" form-edit-category ng-attr-category="category" ng-attr-vm="vm">' +
//                    '</div>')($scope);

            var element = $compile('<div class="step"category="category" vm="vm" form-edit-category2c></div>')($scope);
//            var element = $compile('<div class="step" form-edit-category></div>')($rootScope);
            
//            var element = $compile('<div class="step"><p>abcde</p></div>')($scope);
            console.log('2editC test element: ', element);
            console.log('2editC test $scope: ', $scope);
            console.log('2editC test element.scope(): ', element.scope());
//            $scope.div.form.solmik_category[name].$setViewValue('new name');
////            $scope.solmik_category[name].$setViewValue('new name');

//            $rootScope.$digest();
            $scope.$digest();
            console.log('2editC test element after $scope.$digest(): ', element);
            console.log('2editC test $scope 2: ', $scope);
            console.log('2editC test $rootScope 2: ', $rootScope);
            var div = element.find('div');
            console.log('2editC test element div: ', div);
            var pTag = element.find('p');
            console.log('2editC test element pTag: ', pTag);
            var form = element.find('form');
            console.log('2editC test element form: ', form);


            var invalid = $scope.form.aNumber.$invalid;
            expect(invalid).toBe(true);


        });

    });

});
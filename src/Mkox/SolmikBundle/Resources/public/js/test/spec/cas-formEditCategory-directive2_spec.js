define(["angular", "angular-mocks", "cas/cas-formEditCategory-directive2c", "partials/categoryEdit2.html"], function (angular, mocks, editCategoryDirective) {


    describe("cas-formEditCategory-directive2b", function () {

        var $scope;
        var $rootScope;
        var $compile;
        var vm;
//        var $location;

        beforeEach(module("categoriesAndStrings"));

        beforeEach(module("templates"));

        beforeEach(function () {
            module(function ($controllerProvider) {
                $controllerProvider.register('categoriesAndStringsCtrl', function ($scope) {
                    // Controller Mock
                    $scope.vm = {
                        editCategory: function (event, category) {

                        }
                    };
                });
            });
        });

        console.log('c-fEC-d2_test x100');
        beforeEach(inject(function (_$rootScope_, _$compile_, $controller) {
            console.log('c-fEC-d2_test x110');

            $rootScope = _$rootScope_;
            console.log('$rootScope 1(2):', $rootScope);
            $scope = $rootScope.$new();

            $scope.category = {
                "name": "Cat A",
                "public": true
            };

            var ctrl = $controller('categoriesAndStringsCtrl', {
                $scope: $scope
//                vm: vm
            });
            console.log('c-fEC-d2_test ctrl: ', ctrl);
            $compile = _$compile_;
        }));
        
        beforeEach(function () {
            console.log('c-fEC-d2_test x115');
        });
        console.log('c-fEC-d2_test x120');

        afterEach(function () {

        });

        it("(2) should edit a category name into 'new name'.", function () {

            var element = $compile('<div class="step"category="category" vm="vm" form-edit-category2c></div>')($scope);

            console.log('2editC test element: ', element);
            console.log('2editC test $scope: ', $scope);
            console.log('2editC test element.scope(): ', element.scope());

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
            
            var categoryName = angular.element(element[0].querySelector('#solmik_category_name')).val();
            console.log('2editC test element categoryName: ', categoryName);
            var categoryPublic = angular.element(element[0].querySelector('#solmik_category_public'))[0].checked;
            console.log('2editC test element categoryPublic: ', categoryPublic);
//            var categoryPublicElem = angular.element(element[0].querySelector('#solmik_category_public'));
//            console.log('2editC test element categoryPublicElem: ', categoryPublicElem);

            expect($scope.category.name).toEqual(categoryName);
            expect($scope.category.public).toEqual(categoryPublic);
            expect(categoryPublic).toBe(true);

        });

    });

});
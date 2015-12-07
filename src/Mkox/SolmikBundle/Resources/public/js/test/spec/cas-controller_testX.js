define(["angular", "cas/cas-controller"], function (angular, cas) {
//define(["angular", "jasmine"], function (angular, jasmine) {
//console.log('jasmine in css-controller_test.js: ', jasmine);

console.log('cas-controller_test.js cas', cas);

    describe("categoriesAndStringsVM", function () {

        var $scope;

        beforeEach(function () {

            var injector = angular.injector(['ng', 'categoriesAndStrings']);

            var $rootScope = injector.get("$rootScope");
            var $controller = injector.get("$controller");

            $scope = $rootScope.$new();

            $controller("categoriesAndStringsCtrl", {$scope: $scope});

            jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000; // Standardwert: 5000

        });

        afterEach(function () {

        });

        it("should load Passagiere", function (done) {


            var vm = $scope.vm;

            expect(vm).toBeDefined();
            expect(vm).not.toBeNull(vm);

//            var error = false;
//
//            vm.solmikCategory.name = "abc";
//
//            vm.loadPassagiere().then(function () {
//
//                // Do nothing ...
//
//            }).catch(function (ex) {
//
//                error = true;
//
//            }).finally(function () {
//
//                expect(error).toBe(false);
//                expect(vm.passagiere.length).toBe(1);
//                done();
//
//            });
done();

        });


    });

});
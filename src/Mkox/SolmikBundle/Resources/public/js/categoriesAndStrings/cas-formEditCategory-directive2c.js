define(["cas/categoriesAndStrings", "solmiBasics"], function (cas, sb) {
    
//define(["cas/categoriesAndStrings", "solmiBasics", "cas/cas-controller", "categoriesAndStrings"], function (cas, sb, casco, categoriesAndStrings) {
//define(["cas/categoriesAndStrings", "solmiBasics", "cas/cas-controller", 
//"base/mkoxsolmik/js/categoriesAndStrings/categoriesAndStrings.js"], function (cas, sb, casco, cas2) {
//define(["cas/categoriesAndStrings", "solmiBasics", "categoriesAndStrings"], function (cas, sb, cas2) {
//define(["categoriesAndStrings", "solmiBasics"], function (cas, sb) {
//define(["categoriesAndStrings/categoriesAndStrings", "solmiBasics"], function (cas, sb) {
    console.log('fEC-d2c.js cas:', cas);
//    console.log('fEC-d2c.js sb:', sb);
//    console.log('fEC-d2c.js casco:', casco);
//    console.log('fEC-d2c.js categoriesAndStrings:', categoriesAndStrings);
    cas.directive('formEditCategory2c', function () {
//    categoriesAndStrings.directive('formEditCategory', function () {

//    cas.directive('formEditCategory', function ($document) {

        return {
            templateUrl: sb.bPath + 'partials/categoryEdit2.html',
//            templateUrl: 'mkoxsolmik/partials/categoryEdit2.html',
            scope: {
                category: '=',
                vm: '='
            },
//            controller: ['$scope', function ($scope) {
            controller: ['$scope', '$rootScope', function ($scope, $rootScope) {
                console.log('$rootScope in fEC-directive', $rootScope);
                console.log('$scope in fEC-directive', $scope);
//                console.log('cas-formEditCategory-directive [$scope, $element, $attrs]: ', [$scope, $element, $attrs]);
                
//                    console.log('$document in fEC-directive', $document);
//                $scope.vm.removeOpenForms($scope.category.id);
            }]

        };
    });

});


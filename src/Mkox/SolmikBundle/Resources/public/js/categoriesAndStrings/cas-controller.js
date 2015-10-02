define(["angular", 
    "cas/categoriesAndStrings", 
    "cas/cas-vm",
    "cas/cas-getSoundKey-directive", 
    "cas/cas-formNewString-directive", 
    "cas/cas-formEditString-directive", 
    "cas/cas-formDeleteString-directive", 
    "cas/cas-formEditCategory-directive", 
    "cas/cas-formDeleteCategory-directive"], function (ng, cas, vm) {
    console.log('in cas-controller.js');
    cas.controller('categoriesAndStringsCtrl', ['$scope', '$rootScope', '$http', '$compile', '$sce', '$log', function ($scope, $rootScope, $http, $compile, $sce, $log) {
            $log.debug('categoriesAndStringsCtrl $compile: ', $compile);
//        $scope.vm = new categoriesAndStringsVM($rootScope, $http, $compile, $sce, $log);
            $scope.vm = new vm.categoriesAndStringsVM($scope, $rootScope, $http, $compile, $sce, $log);
            $log.debug('$scope.vm', $scope.vm);
        }]);

});


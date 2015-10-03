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
    cas.controller('categoriesAndStringsCtrl', ['$scope', '$http', '$log', function ($scope, $http, $log) {
            $scope.vm = new vm.categoriesAndStringsVM($http, $log);
            $log.debug('$scope.vm', $scope.vm);
        }]);

});


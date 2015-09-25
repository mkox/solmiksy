define(["angular", "cas/categoriesAndStrings", "cas/cas-vm"], function (ng, cas, vm) {
    console.log('in cas-controller.js');
    cas.controller('categoriesAndStringsCtrl', ['$scope', '$rootScope', '$http', '$compile', '$sce', '$log', function ($scope, $rootScope, $http, $compile, $sce, $log) {
//        $scope.vm = new categoriesAndStringsVM($rootScope, $http, $compile, $sce, $log);
            $scope.vm = vm.categoriesAndStringsVM($rootScope, $http, $compile, $sce, $log);
            $log.debug('$scope.vm', $scope.vm);
        }]);

});


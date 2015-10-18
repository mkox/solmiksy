describe("cas-formEditCategory-directive", function () {

    var $rootScope;
    var $compile;

    beforeEach(module("categoriesAndStrings"));

    beforeEach(inject(function (_$rootScope_, _$compile_) {
        $rootScope = _$rootScope_;
        $compile = _$compile_;
    }));

    afterEach(function () {

    });

    it("should edit a category name into 'new name'.", function () {

        var $scope = $rootScope.$new();

        var element = $compile('<div class="step" ng-switch-when="edit" form-edit-category ng-attr-category="category" ng-attr-vm="vm">' +
                '<div ng-include="vm.path.categoryEdit"></div>' +
                '</div>')($scope);
        $scope.form.solmik_category[name].$setViewValue('new name');
        $rootScope.$digest();

        var invalid = $scope.form.aNumber.$invalid;
        expect(invalid).toBe(true);


    });

});

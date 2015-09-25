define(["jquery", "underscore", "angular", "cas/categoriesAndStrings", "solmiBasics"], function ($, _, ng, cas, sb) {

    cas.directive('getSoundKey', function () {

        return {
            require: 'ngModel',
            link: function (scope, element, attrs, ngModel) {

                ngModel.$formatters.push(function (value) {
//                    console.log('ngModel.$formatters value', value);
                    var selectedKey = {};
                    selectedKey.name = value;
//                    console.log('ngModel.$formatters selectedKey', selectedKey);
                    return selectedKey;
                });

            }
        };
    });

});


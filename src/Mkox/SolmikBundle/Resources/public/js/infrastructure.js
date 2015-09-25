define([
    "jquery",
    "angular",
//    "libs/angular/postfix",
//    "ngSolmik",
//    'models/angularTrials',
    'cas/categoriesAndStrings',
    'cas/cas-controller',
    "audiosynth",
//    "tuner",
    "underscore"
], function ($, ng) {
    ng.element(document).ready(function () {
//        ng.bootstrap(document, ['ngSolmik']);
        ng.bootstrap(document, ['categoriesAndStrings']);
    });
});
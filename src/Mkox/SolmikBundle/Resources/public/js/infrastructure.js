define([
    "jquery",
    "angular",
//    "libs/angular/postfix",
    "ngSolmik",
    'models/angularTrials',
    "audiosynth",
//    "tuner",
    "underscore"
], function ($, ng) {
    ng.element(document).ready(function () {
        ng.bootstrap(document, ['ngSolmik']);
//        ng.bootstrap(document, ['ngSolmik', 'models/angularTrials']);
    });
});
({
    mainConfigFile : "js/solmi.js",
    appDir: "./",
    baseUrl: "js",
    removeCombined: true,
    findNestedDependencies: true,
    dir: "dist",
//    optimize: "none",
    optimizeCss: "standard",
    modules: [
        {
            name: "solmi",
            exclude: [
                "boilerplate",
                "infrastructure"
            ]
        },
        {
            name: "infrastructure"
        }
    ],
    paths: {
        jquery: "empty:",
        angular: "empty:",
        uiRouter: "empty:"
    }
//    generateSourceMaps: true
});
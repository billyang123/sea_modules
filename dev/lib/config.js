(function() {
    var root = this;
    var assetsPath = "";
    var config = {
        base: typeof process === "undefined" ? window.globalArgs.assetsPath : null,
		vars: {
		   "jqueryVersion":"1-8-3"
		},
        alias: {
            "jquery":"lib/jquery/jquery-{jqueryVersion}",            
        },
        paths: {

        },
        comboSyntax: ["??", ","],
        comboMaxLength: 500,
        preload: [
           
        ],
        map: [],
        charset: 'utf-8',
        timeout: 20000,
        debug: true
    };
    if (root.seajs) {
        root.seajs.config(config);
    }
    return config;
}).call(this);

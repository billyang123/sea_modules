var fs = require("fs");
var path = require("path");
var os = require('os');
var buildPath = "build";
var devPath = "dev";

Date.prototype.Format = function(fmt){ //author: meizz
  var o = {   
    "M+" : this.getMonth()+1,                 //月份
    "d+" : this.getDate(),                    //日
    "h+" : this.getHours(),                   //小时
    "m+" : this.getMinutes(),                 //分
    "s+" : this.getSeconds(),                 //秒
    "q+" : Math.floor((this.getMonth()+3)/3), //季度
    "S"  : this.getMilliseconds()             //毫秒
  };   
  if(/(y+)/.test(fmt))   
    fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));   
  for(var k in o)   
    if(new RegExp("("+ k +")").test(fmt))   
  fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));   
  return fmt;   
}
function getEntry(from,to,ext) {
    var files = {};
    var dirs = fs.readdirSync(from);
    dirs.forEach(function (item) {
        if(path.extname(item)){
            var _item = item.split(".");
            _item[_item.length-1] = ext;
            files[[to,_item.join('.')].join('/')] = [from,item].join('/');
        }
    })
    return files;
}
function getFileJson(__path){
    var fileContent = fs.readFileSync(__path,"utf-8");
    return eval(fileContent);
}
function getAddress() {
   // return "192.168.1.117";
    var network = os.networkInterfaces();
    var address = 'obtain an IP address';
    if(network["en0"]){
        for(var i = 0; i < network["en0"].length; i++) {
            var json = network["en0"][i];
            if(json.family == 'IPv4') {
                address = json.address;
            }
        }
    }
    if(network['本地连接']){
        address = network['本地连接'][1].address;
    }
    return address;
}
//console.log(getEntry("dev/less","dev/styles","css"))
var version = (new Date()).Format("yyyyMMdd.hhmm");
module.exports = function(grunt) {
    var configFile = grunt.option("config") || "dev/lib/config.js";
    var isBeautify = grunt.option("isBeautify");
    var configFileContent = getFileJson(configFile);


    var config = {};
    config.pkg = grunt.file.readJSON('package.json');
    config.banner = '/*!\n' +
        ' * =====================================================\n' +
        ' * code by yangbinbin_1226@126.com /\n' +
        ' *\n' +
        ' * =====================================================\n' +
        ' */\n';
    config.cmd_transport = {
        options: {
            debug: false,
            logLevel: "WARNING",
            useCache: true,
            rootPath: path.join(process.cwd(), devPath),
            paths: [
                path.join(process.cwd(), devPath)
            ],
            alias: configFileContent.alias,
            aliasPaths: configFileContent.paths
        },
        release: {
            files: [
                {
                    src: ["**/*.js"],
                    dest: buildPath,
                    expand: true,
                    ext: ".js",
                    cwd: devPath,
                    filter: "isFile" 
                },
                {
                    src: ["**/*.handlebars"],
                    dest: buildPath,
                    expand: true,
                    ext: ".handlebars.js",
                    cwd: devPath,
                    filter: "isFile"
                },
                {
                    src: ["**/*.css"],
                    dest: buildPath,
                    expand: true,
                    ext: ".css.js",
                    cwd: devPath,
                    filter: "isFile"
                }
            ]
        }
    };
    config.less = {
        release: {
            options: {
                cleancss: !isBeautify,
                compress: !isBeautify,
                ieCompat: true
            },
            files: getEntry(devPath+"/less",buildPath+"/styles","css")
        },
        develop: {
            options: {
                cleancss: false,
                compress: false,
                ieCompat: true
            },
            files: getEntry(devPath+"/less",devPath+"/styles","css")
        }
    };
    config.cmd_concat = {
        options: {
            //banner: '<%= banner %>',
            paths: [
                path.normalize(path.join(__dirname,  buildPath))
            ],
            logLevel: "WARNING",
            useCache: true,
            filters: false,
            include: "all"
        },
        release: {
            files: [
                {
                    src: ["**/*.js"],
                    dest: buildPath,
                    expand: true,
//                    ext: ".js",
                    cwd: buildPath,
                    filter: "isFile"
                }
            ]
        }
    };
    config.copy = {
        release: {
            files: [
                {
                    src: ["**/*.js"],
                    dest: buildPath,
                    expand: true,
                    ext: ".js",
                    cwd: devPath,
                    filter: "isFile"
                },
                {
                    src: ["**/*.png"],
                    dest: buildPath,
                    expand: true,
                    ext: ".png",
                    cwd: devPath,
                    filter: "isFile"
                },
                {
                    src: ["**/*.jpg"],
                    dest: buildPath,
                    expand: true,
                    ext: ".jpg",
                    cwd: devPath,
                    filter: "isFile"
                },
                {
                    src: ["**/*.cur"],
                    dest: buildPath,
                    expand: true,
                    ext: ".cur",
                    cwd: devPath,
                    filter: "isFile"
                },
                {
                    src: ["**/*.jpeg"],
                    dest: buildPath,
                    expand: true,
                    ext: ".jpeg",
                    cwd: devPath,
                    filter: "isFile"
                },
                {
                    src: ["**/*.gif"],
                    dest: buildPath,
                    expand: true,
                    ext: ".gif",
                    cwd: devPath,
                    filter: "isFile"
                },
                {
                    src: ["**/*.eot"],
                    dest: buildPath,
                    expand: true,
                    ext: ".eot",
                    cwd: devPath,
                    filter: "isFile"
                },
                {
                    src: ["**/*.otf"],
                    dest: buildPath,
                    expand: true,
                    ext: ".otf",
                    cwd: devPath,
                    filter: "isFile"
                },
                {
                    src: ["**/*.svg"],
                    dest: buildPath,
                    expand: true,
                    ext: ".svg",
                    cwd: devPath,
                    filter: "isFile"
                },
                {
                    src: ["**/*.ttf"],
                    dest: buildPath,
                    expand: true,
                    ext: ".ttf",
                    cwd: devPath,
                    filter: "isFile"
                },
                {
                    src: ["**/*.woff"],
                    dest: buildPath,
                    expand: true,
                    ext: ".woff",
                    cwd: devPath,
                    filter: "isFile"
                }
            ]
        }
    };
    config.uglify = {
        options: {
            mangle: true,
            beautify: isBeautify,
            report: "min",
            preserveComments: false,
            compress: isBeautify ? false : {
                warnings: false
            }
        },
        release: {
            files: [
                {
                    src: ["**/*.js"],
                    dest: buildPath,
                    expand: true,
                    ext: ".js",
                    cwd: buildPath,
                    filter: function(file) {
                        var stats = fs.lstatSync(file);
                        return stats.isFile() && !/\-debug\.*\.js$/.test(file);
                    },
                    rename: function (dest, src) {
                       var folder = src.substring(0, src.lastIndexOf('/'));  
                       var filename = src.substring(src.lastIndexOf('/'), src.length);   
                       filename = filename.substring(0, filename.lastIndexOf('.'));  
                        console.log(dest+ "/" + folder + filename + '.js')
                       return dest+ "/" + folder + filename + '.js';  
                    }
                }
            ]
        }
    };
    config.connect = {
      options: {
        port: 9000,
        hostname: getAddress(), //默认就是这个值，可配置为本机某个 IP，localhost 或域名
        livereload: 35729  //声明给 watch 监听的端口
      },

      server: {
        options: {
          open: true, //自动打开网页 http://
          base: [
            '.'  //主目录
          ]
        }
      }
    };
    config.watch = {
        livereload: {
            options: {
              livereload: '<%=connect.options.livereload%>'  //监听前面声明的端口  35729
            },
            files: [  //下面文件的改变就会实时刷新网页
              'view/*.html',
              'dev/{,*/}*.{js,css}',
              'images/{,*/}*.{png,jpg}'
            ]
        },
        develop: {
            files: [devPath+"/less/*.less",devPath+"/less/**/*.less"],
            tasks: ["less:develop"]
        }
    };
    var tasks = [
        "copy",
        "less:release",
        //"cssmin"
        "cmd_transport",
        "cmd_concat"
    ];
    if (!isBeautify) {
        tasks.push("uglify");
    }
    grunt.initConfig(config);
    grunt.loadNpmTasks("grunt-cmd-nice");
    grunt.loadNpmTasks("grunt-contrib-uglify");
    grunt.loadNpmTasks("grunt-contrib-less");
    grunt.loadNpmTasks("grunt-contrib-cssmin");
    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks("grunt-contrib-connect");
    grunt.registerTask('w', [
        "watch"
    ]);
    grunt.registerTask('server', [
        'connect:server',
        "watch"
    ]);
    grunt.registerTask('dev', ["less:develop"]);
    grunt.registerTask('default', tasks);
}
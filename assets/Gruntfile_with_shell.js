module.exports = function(grunt) {
    'use strict';

    var pageJSConsolidatedMaps = grunt.file.readJSON('js/src/pages/mapping.json');
    var commonJSFiles = grunt.file.readJSON('js/src/common/mapping.json');
    var pageJSWidgetsMaps = grunt.file.readJSON('js/src/widgets/mapping.json');
    var JSFiles = [];

    var env = grunt.option('env') || 'dev';
    var is_page = grunt.option('page') || false;

    var getSize = function (obj) {
        if (!obj || obj === null || obj === "") {
            return 0;
        }
        if (Array.isArray()) {
            return obj.length;
        } else {
            var size = 0,
                    key;
            for (key in obj) {
                 if (obj.hasOwnProperty(key))
                         size++;
            }
            return size;
        }
    }

    var appendCommonFiles = function(mainData, toAppendData) {
        if (typeof mainData === "undefined" || typeof toAppendData === "undefined" || mainData.length <= 0)
            return;

        if (toAppendData.length > 0) {
            toAppendData.forEach(function(file){
                mainData.src.unshift(file);
            });
        }

        return mainData;
    }

    if (typeof commonJSFiles.common !== "undefined" && getSize(commonJSFiles.common) > 0) {
        commonJSFiles.common.reverse();
    }

    if (typeof pageJSConsolidatedMaps !== "undefined" && getSize(pageJSConsolidatedMaps) > 0) {
        for (var page in pageJSConsolidatedMaps) {
            if (pageJSConsolidatedMaps.hasOwnProperty(page)) {
                JSFiles.push(appendCommonFiles(pageJSConsolidatedMaps[page], commonJSFiles.common));
            }
        }
    }

    if (typeof pageJSWidgetsMaps !== "undefined" && getSize(pageJSWidgetsMaps) > 0) {
        for (var widget in pageJSWidgetsMaps) {
            if (pageJSWidgetsMaps.hasOwnProperty(widget)) {
                if ( is_page ) {
                    pageJSWidgetsMaps[widget].src = [ pageJSWidgetsMaps[widget].src.slice(-1)[0] ];
                }
                JSFiles.push(pageJSWidgetsMaps[widget]);
            }
        }
    }

    grunt.initConfig({
        uglify: {
            static_mappings: {
                files: JSFiles
            }
        },
        concat: {
            dist: {
                files: JSFiles
            }
        },
        shell: {
            php: {
                command: 'php ../../index.php api/generator/create_files LOCAL'
            }
        },
        //specifying the settings for watch
        watch: {
            dev: {
                files: ['js/src/**/*.js', 'js/libs/**/*.js'],
                tasks: ['concat']
            },
            prod: {
                files: ['js/src/**/*.js', 'js/libs/**/*.js'],
                tasks: ['uglify']
            }
        },
        
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-shell');

    switch(env) {
        case 'dev': {
            grunt.registerTask('build', ['concat']);
            grunt.registerTask('php_config', ['shell:php']);
        }
        break;
        case 'prod': {
            grunt.registerTask('build', ['uglify']);
        }
        break;
    };

    switch(env) {
        case 'prod': {
            grunt.registerTask('default', ['build']);
        }
        break;
        default: {
            grunt.registerTask('default', ['build','php_config','watch:' + env]);
        }
    };
};
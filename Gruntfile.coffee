module.exports = (grunt) ->
    grunt.initConfig
        pkg: grunt.file.readJSON 'package.json'
        typescript:
            # tsファイルをひとつのjsにする
            build:
                src: [
                    'src/**/*.ts'
                ]
                dest: 'build/app.js'

        handlebars:
            options:
                namespace: "HBS"
            compile:
                files:
                    "build/tpl/all.js": "asset/tpl/**/*.hbs"
        concat:
            dist:
                src: [
                    'bower_components/handlebars/handlebars.js'
                    'build/tpl/all.js'
                    'build/app.js'
                ]
                dest: 'build/app.js'
        # 最後にどうこうする
        uglify:
            build:
                files:
                    'build/app.min.js': ['build/app.js']

        # watchモード用
        regarde:
            src:
                files: ['src/**/*.*', 'tpl/**/*.*']
                tasks: ['build']

    grunt.loadNpmTasks 'grunt-typescript'
    grunt.loadNpmTasks 'grunt-contrib-concat'
    grunt.loadNpmTasks 'grunt-contrib-uglify'
    grunt.loadNpmTasks 'grunt-contrib-copy'
    grunt.loadNpmTasks 'grunt-contrib-connect'
    grunt.loadNpmTasks 'grunt-contrib-handlebars'
    grunt.loadNpmTasks 'grunt-regarde'
    grunt.loadNpmTasks 'grunt-exec'
    grunt.loadNpmTasks 'grunt-json-minify'
    grunt.loadNpmTasks 'grunt-git'

    grunt.registerTask 'build', 'build/app(.min).jsをビルドします',['typescript:build', 'handlebars', 'concat:dist', 'uglify:build']
    grunt.registerTask 'watch', '`src/**/*.ts`と`tpl/**/*.ts`を監視しながらビルドします', ['build', 'regarde']
    grunt.registerTask 'default', ['build']

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
                    "build/tpl/all.js": "tpl/**/*.hbs"
        concat:
            dist:
                src: [
                    'bower_components/jquery/jquery.js'
                    'bower_components/handlebars/handlebars.js'
                    'bower_components/showv/build/showv.js'
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

        exec:
            mkdir:
                cmd: 'mkdir -p release/build'
            cpm:
                cmd: 'cp manifest.json release'
            cpa:
                cmd: 'cp -r asset release'
            cpj:
                cmd: 'cp build/app.min.js release/build/app.js'
            zip:
                cmd: 'zip -r prisc.zip release/*'

    grunt.loadNpmTasks 'grunt-typescript'
    grunt.loadNpmTasks 'grunt-contrib-concat'
    grunt.loadNpmTasks 'grunt-contrib-uglify'
    grunt.loadNpmTasks 'grunt-contrib-handlebars'
    grunt.loadNpmTasks 'grunt-regarde'
    grunt.loadNpmTasks 'grunt-exec'

    grunt.registerTask 'build', 'build/app(.min).jsをビルドします',['typescript:build', 'handlebars', 'concat:dist', 'uglify:build']
    grunt.registerTask 'watch', '`src/**/*.ts`と`tpl/**/*.ts`を監視しながらビルドします', ['build', 'regarde']
    grunt.registerTask 'release', 'リリースビルドつくります', ['build','releasecommand']
    grunt.registerTask 'releasecommand', 'リリース用cli', ['exec:mkdir','exec:cpm','exec:cpa','exec:cpj','exec:zip']

    grunt.registerTask 'default', ['build']

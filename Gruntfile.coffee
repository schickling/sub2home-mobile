module.exports = (grunt) ->

  require("load-grunt-tasks") grunt
  require("time-grunt") grunt

  grunt.initConfig

    config:
      dist: "./dist"
      src: "./app"
      test: "./test"
      port: 8889
      livereloadPort: 35731

    less:
      src:
        files:
          "<%= config.src %>/css/main.css": "<%= config.src %>/less/main.less"
        options:
          sourceMap: true

    coffee:
      src:
        options:
          sourceMap: true
          sourceRoot: ''
        files: [
          expand: true
          cwd: "<%= config.src %>/coffee"
          src: "**/*.coffee"
          dest: "<%= config.src %>/js"
          ext: ".js"
        ]

    watch:
      less:
        files: ["<%= config.src %>/less/*.less"]
        tasks: ["newer:less:src"]
      coffeeSrc:
        files: ["<%= config.src %>/coffee/**/*.coffee"]
        tasks: ["newer:coffee:src"]
      livereload:
        files: [
          "<%= config.src %>/js/**/*.js"
          "<%= config.src %>/css/*.css"
        ]
        options:
          livereload:
            port: "<%= config.livereloadPort %>"

    connect:
      server:
        options:
          port: "<%= config.port %>"
          hostname: '0.0.0.0'
          base: 'app'
          livereload: "<%= config.livereloadPort %>"

  grunt.registerTask "server", [
    "newer:less"
    "newer:coffee:src"
    "connect:server"
    "watch"
  ]

  grunt.registerTask "default", [
    "server"
  ]

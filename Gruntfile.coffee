module.exports = (grunt) ->

  require("load-grunt-tasks") grunt
  require("time-grunt") grunt

  grunt.initConfig

    config:
      dist: "./dist"
      src: "./app"
      test: "./test"

    less:
      src:
        files:
          "<%= config.src %>/css/main.css": "<%= config.src %>/less/main.less"
        options:
          sourceMap: true

    watch:
      less:
        files: ["<%= config.src %>/less/*.less"]
        tasks: ["less:src"]

    connect:
      server:
        options:
          port: 8888
          hostname: '0.0.0.0'
          base: 'app'

  grunt.registerTask "server", [
    "any-newer:less"
    "connect:server"
    "watch"
  ]

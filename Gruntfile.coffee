module.exports = (grunt) ->

  require("load-grunt-tasks") grunt
  require("time-grunt") grunt

  grunt.initConfig

    connect:
      server:
        options:
          port: 8888
          hostname: '0.0.0.0'
          base: 'app'

  grunt.registerTask "server", [
    "connect:server:keepalive"
  ]

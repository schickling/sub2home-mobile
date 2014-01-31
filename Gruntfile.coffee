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

      dist:
        files:
          "<%= config.dist %>/css/main.css": "<%= config.src %>/less/main.less"
        options:
          yuicompress: true

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

      dist:
        files: [
          expand: true
          cwd: "<%= config.src %>/coffee"
          src: "**/*.coffee"
          dest: "<%= config.dist %>/js"
          ext: ".js"
        ]

    clean:
      dist: "<%= config.dist %>"

    watch:
      less:
        files: ["<%= config.src %>/less/*.less"]
        tasks: ["less:src"]

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

    copy:
      dist:
        files: [
          expand: true
          dot: true
          cwd: "<%= config.src %>"
          dest: "<%= config.dist %>"
          src: [
            "index.html"
            "sitemap.xml"
            "robots.txt"
            "favicon.ico"
            "images/**"
          ]
        ]

    connect:
      server:
        options:
          port: "<%= config.port %>"
          hostname: '0.0.0.0'
          base: 'app'
          livereload: "<%= config.livereloadPort %>"

  grunt.registerTask "server", [
    "less"
    "newer:coffee:src"
    "connect:server"
    "watch"
  ]

  grunt.registerTask "build", [
    "clean:dist"
    "coffee:dist"
    "less:dist"
    "copy:dist"
  ]

  grunt.registerTask "default", [
    "server"
  ]

module.exports = function(grunt) {

  var sassStyle = 'expanded';

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    sass: {
      output : {
        options: {
          style: sassStyle
        },
        files: {
          './style.css': './scss/style.scss'
        }
      }
    },
    concat: {
      dist: {
        src: ['./src/plugin.js', './src/plugin2.js'],
        dest: './global.js',
      },
    },
    uglify: {
      compressjs: {
        files: {
          './global.min.js': ['./global.js']
        }
      }
    },
    jshint: {
      all: ['./global.js']
    },
    watch: {
      scripts: {
        files: ['./src/plugin.js','./src/plugin2.js'],
        tasks: ['concat','jshint','uglify']
      },
      sass: {
        files: ['./scss/style.scss'],
        tasks: ['sass']
      },
      livereload: {
          options: {
              livereload: '<%= connect.options.livereload %>'
          },
          files: [
              'index.html',
              'style.css',
              'js/global.min.js'
          ]
      }
    },
    connect: {
      options: {
          port: 9000,
          open: true,
          livereload: 35729,
          // Change this to '0.0.0.0' to access the server from outside
          hostname: 'localhost'
      },
      server: {
        options: {
          port: 9001,
          base: './'
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');

  grunt.registerTask('outputcss',['sass']);
  grunt.registerTask('concatjs',['concat']);
  grunt.registerTask('compressjs',['concat','jshint','uglify']);
  grunt.registerTask('watchit',['sass','concat','jshint','uglify','connect','watch']);
  grunt.registerTask('default');

};
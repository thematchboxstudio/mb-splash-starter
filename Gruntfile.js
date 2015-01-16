module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({

		pkg: grunt.file.readJSON('package.json'),

		uglify: { /// UGLIFY - minimizes and combines js files. all {src} files into {dest}.
			options: {
		    	mangle: false,
     			beautify: true
   			},
			dist: {
				src: ['library/js/libs/modernizr.custom.min.js',
						'library/js/libs/matchMedia.js',
						'library/js/picturefill.js',
						'library/js/scripts.js'
						],
				dest: 'library/js/global.min.js'
			},
			build: {
				src: ['library/js/libs/modernizr.custom.min.js',
						'library/js/libs/matchMedia.js',
						'library/js/picturefill.js',
						'library/js/scripts.js'
						],
				dest: '../mb-build/library/js/global.min.js'
			}
		},
		svgmin: { /// SVG MIN - MINIMIZES SVG FILES IN THE {images} FOLDER AND PUTS THEM IN THE {img} FOLDER
			options: {
				plugins: [
					{ removeViewBox: true },
					{ removeUselessStrokeAndFill: true },
					{ removeEmptyAttrs: false }
				]
			},
			dist: {                     // Target
				files: [{               // Dictionary of files
					expand: true,       // Enable dynamic expansion.
					cwd: 'library/css/svg/',     // Src matches are relative to this path.
					src: ['*.svg'],  // Actual pattern(s) to match.
					dest: 'library/css/svg/min',       // Destination path prefix.
					ext: '.min.svg'     // Dest filepaths will have this extension.
					// ie: optimise img/src/branding/logo.svg and store it in img/branding/logo.min.svg
				}]
			}
		},
		// svgsprite       : {
		// 	spriteSass    : {
		// 	  src         : ['library/images/icon'],
		// 	  dest        : 'library/css',
		// 	  options     : {

		// 	   	prefix: "icon",

		// 	    render    : {
		// 	      css     : false,
		// 	      scss    : {
		// 	        dest  : '../scss/components/_icons.scss'
		// 	      }
		// 	    },
		// 	    //maxwidth  : 40,
		// 	    //maxheight : 40,
		// 	    padding   : 0,
		// 	    keep      : true,
		// 	    dims      : true
		// 	  }
		// 	}
		// },
		imagemin: {  /// IMAGEMIN - optimizes all source images {cwd} and spits them into {dest}.
			dynamic: {
				files: [{
					expand: true,
					cwd: 'library/images/',
      				src: ['**/*.{png,jpg,gif}', '!optimised/**'],
					dest: 'library/img/'
				}]
			},
			options: { cache: false },
		},
		imageoptim: {
		  myTask: {
		    options: {
		      jpegMini: false,
		      imageAlpha: true,
		      quitAfter: true
		    },
		    src: ['library/img/', 'library/img/*/']
		  }
		},
		sass_directory_import: {
			// imports all the module files inside /library/scss/modules
			files: {
				src: ['library/scss/**/_all.scss']
			},
		},
		sass: { /// SASS - for PreProcessing
			dist: {
				options: {
					style: 'expanded',
				},
				files: {
					'library/css/style.css': 'library/scss/style.scss',       // 'destination': 'source'
				}
			},
			build: {
				options: {
					style: 'compressed',
				},
				files: {
					'../mb-build/library/css/style.css': 'library/scss/style.scss',       // 'destination': 'source'
				}
			}
		},
		watch: { /// WATCH - watches files and performs tasks when there are changes
				src: {
					files: ['library/scss/**/*.scss', 'library/modules/*.php', 'library/js/*/*.js','library/js/scripts.js','library/js/functions.js', 'library/js/picturefill.js', 'library/scss/*.scss', '**/*.php', 'library/slick/*.scss', 'library/slick/*.js'],
					tasks: [ 'sass_directory_import','sass:dist','autoprefixer:dist', 'uglify:dist'],
					options: {
						livereload: true,
						sourceComments: 'normal'
						},
				},
		},
		autoprefixer: { /// AUTOPREFIXER
				dist: {
					files: {
						'library/css/style.css': 'library/css/style.css',
						},
						options: {
							browsers: ['last 3 versions']
						},
				},
				build: {
					files: {
						'../mb-build/library/css/style.css': 'library/css/style.css',
						},
						options: {
							browsers: ['last 3 versions']
						},
				}
		},
		cmq: {
			dist: {
				options: {
					log: false
				},
				your_target: {
					files: {
					'library/css/build/': ['library/css/build/*.css']
					}
				}
			},
			build: {
				options: {
					log: false
				},
				your_target: {
					files: {
					'../mb-build/library/css/': ['../mb-build/library/css/*.css']
					}
				}
			},
		},
		uncss: {
			dist: {
				files: {
				'library/css/build/style.css': ['*.php']
				},
				options: {
					ignore: [':hover', ':focus', ':before', ':after', '.respond-form', '.sidebar', '.comments-*', '#commentform', 'textarea'],
					csspath: "library/css/build/",
					stylesheets: ["style.css"],
					urls: ["http://beta.matchboxstudio.com/bones/*"],
					report: 'min',

				}
			},
		},
		cssmin: {
			minify: {
				expand: true,
				cwd: '../mb-build/library/css/',
				src: ['*.css'],
				dest: '../mb-build/library/css/',
			},
			add_banner: {
				options: {
				  banner: '/*\n'+
                      'Theme Name: MB Theme\n'+
                      'Theme URI: http://matchboxstudio.com/\n'+
                      'Description: The Matchbox Theme\n'+
                      'Author: Matchbox Studio\n'+
                      'Author URI: http://matchboxstudio.com/\n'+
                      'Version: 1.0\n'+
                      'Private theme, not open-sourced, all rights reserved.\n'+
                  '*/\n'
				},
				files: {
				  '../mb-build/style.css': ['style.css']
				}
			},
			options: {
				keepSpecialComments: 0,
			}
		},
		modernizr: {

		    dist: {
		        // [REQUIRED] Path to the build you're using for development.
		        "devFile" : "library/js/libs/modernizr.custom.min.js",

		        // [REQUIRED] Path to save out the built file.
		        "outputFile" : "library/js/libs/modernizr.custom.min.js",

		        // Based on default settings on http://modernizr.com/download/
		        "extra" : {
		            "shiv" : true,
		            "printshiv" : false,
		            "load" : true,
		            "mq" : false,
		            "cssclasses" : true
		        },

		        // Based on default settings on http://modernizr.com/download/
		        "extensibility" : {
		            "addtest" : false,
		            "prefixed" : false,
		            "teststyles" : false,
		            "testprops" : false,
		            "testallprops" : false,
		            "hasevents" : false,
		            "prefixes" : false,
		            "domprefixes" : false
		        },

		        // By default, source is uglified before saving
		        "uglify" : true,

		        // Define any tests you want to implicitly include.
		        "tests" : [],

		        // By default, this task will crawl your project for references to Modernizr tests.
		        // Set to false to disable.
		        "parseFiles" : true,

		        // When parseFiles = true, this task will crawl all *.js, *.css, *.scss files, except files that are in node_modules/.
		        // You can override this by defining a "files" array below.
		        // "files" : {
		            // "src": []
		        // },

		        // When parseFiles = true, matchCommunityTests = true will attempt to
		        // match user-contributed tests.
		        "matchCommunityTests" : false,

		        // Have custom Modernizr tests? Add paths to their location here.
		        "customTests" : []
		    }

		},
		copy: { /// THIS IS THE PART OF THE BUILD PROCESS THAT COPIES THE NEEDED FILES TO THE NEW BUILD FOLDER THEME. YOU JUST UPLOAD THAT THEME SINCE IT HAS ONLY THE FILES THAT ARE NEEDED
		  main: {
		    files: [
		      {expand: true, src: ['*.php', '*.png', '*.xml'], dest: '../mb-build/', filter: 'isFile'},
		      {expand: true, flatten: true, src: ['library/css/ajax-loader.gif'], dest: '../mb-build/library/css/', filter: 'isFile'},
 		      {expand: true, flatten: true, src: ['library/*.php'], dest: '../mb-build/library/', filter: 'isFile'},
 		      {expand: true, flatten: true, src: ['library/img/**'], dest: '../mb-build/library/img/', filter: 'isFile'},
 		      {expand: true, flatten: false, cwd: 'library/css/svg/min', src: ['**'], dest: '../mb-build/library/css/svg/min/', filter: 'isFile'},
 		      {expand: true, cwd: 'library/img/', src: ['**'], dest: '../mb-build/library/img/'},
 		      {expand: true, cwd: 'library/modules/', src: ['**'], dest: '../mb-build/library/modules/'},

		    ]
		  }
		}


	}); // END CONFIG

	// Load the plugin that provides the "uglify" task.
	grunt.loadNpmTasks('grunt-contrib-uglify');

	grunt.loadNpmTasks('grunt-svgmin');
	grunt.loadNpmTasks('grunt-contrib-imagemin');
	grunt.loadNpmTasks('grunt-imageoptim');
	//grunt.loadNpmTasks('grunt-svg-sprite');

	grunt.loadNpmTasks('grunt-contrib-sass');
		grunt.loadNpmTasks('grunt-sass-directory-import');
	grunt.loadNpmTasks('grunt-autoprefixer');
	grunt.loadNpmTasks('grunt-uncss');
	grunt.loadNpmTasks('grunt-combine-media-queries');
	grunt.loadNpmTasks('grunt-contrib-cssmin');

	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks("grunt-modernizr");
	grunt.loadNpmTasks('grunt-contrib-copy');

	// Default task(s).
	grunt.registerTask('default', ['uglify:dist', 'svgmin', 'imagemin', 'imageoptim', 'sass_directory_import', 'sass:dist', 'autoprefixer:dist', 'cmq:dist', /*'uncss', 'cssmin' */]);
	grunt.registerTask('images', ['svgmin', 'imagemin','imageoptim']);
	grunt.registerTask('text', ['uglify:dist','sass_directory_import','sass:dist','autoprefixer:dist', 'cmq:dist']);
	grunt.registerTask('build', ['modernizr','uglify:build','sass_directory_import', 'sass:build', 'autoprefixer:build', 'cmq:build', 'cssmin:minify', 'cssmin:add_banner', 'svgmin', 'imagemin', 'imageoptim','copy']);


};
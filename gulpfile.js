/* global require */
const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass')(require('sass'));
const fileInject = require('gulp-inject');
const clean = require('gulp-clean');
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const babel = require('gulp-babel');
const concat = require('gulp-concat');
const pump = require('pump');
const cleanCss = require('gulp-clean-css');
const gUtil = require('gulp-util');
const ftp = require('vinyl-ftp');
const replace = require('gulp-replace');

const configFile = require('./config.js');


/* Alle verwendeten JS Files, damit das eine JS File zusammengesetzt werden kann. */
const allJsFiles = [
	'./src/assets/js/app.js',
	'./src/assets/js/ready.js'
];


/**
 * sass task, will compile the .SCSS files,
 * and handle the error through plumber and notify through system message.
 */
 function compileScss(){
	return gulp.src('./src/scss/**/*.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(gulp.dest('./src/assets/css'))
		.pipe(browserSync.stream());
}


/**
 * Setzt die html-Templates auf jeder Seite ein
 * Hört auf Änderungen in html Files im Ordner templates
 */
 function injectHeaderAndFooter(){
	return gulp.src('./src/*.html')
		.pipe(fileInject(gulp.src(['./src/templates/head.html']), {
			starttag: '<!-- inject:htmlHead -->',
			transform(filepath, file) {
				return file.contents.toString();
			}
		}))

		.pipe(fileInject(gulp.src(['./src/templates/header.html']), {
			starttag: '<!-- inject:htmlHeader -->',
			transform(filepath, file) {
				return file.contents.toString();
			}
		}))

		.pipe(fileInject(gulp.src(['./src/templates/navigation.html']), {
			starttag: '<!-- inject:htmlNavigation -->',
			transform(filepath, file) {
				return file.contents.toString();
			}
		}))

		.pipe(fileInject(gulp.src(['./src/templates/footer.html']), {
			starttag: '<!-- inject:htmlFooter -->',
			transform(filepath, file) {
				return file.contents.toString();
			}
		}))
		.pipe(gulp.dest('src/'));
}


/**
 * Fügt alle .js Files aus dem Array allJsFiles in einem File app.js zusammen.
 * Und verkleinert die .js Files.
 * - Babel (ES6 zu ES5) braucht es, weil sonst der minifyer nicht geht, der versteht nur ES5.
 * - pump ist eine Alternative zu pipe, dank pump gibt's schlaue Fehlermeldungen.
 */
 function minifyJs(cb){
	pump([
		gulp.src(allJsFiles),
		sourcemaps.init(),
		concat('app.js'),
	 	babel({
			compact: false, // unterdrückt die Warnung 'The code generator has deoptimised the styling ... as it exceeds the max of'
			presets: 
			[
				[
					'@babel/env', 
					{debug: true}
				]
			]
		}),
		uglify(),
		rename('app.min.js'),
		sourcemaps.write('./'),
		gulp.dest('src/assets/scripts')
	], cb);
}


/**
 * The run task, will launch browserSync and launch index.html files,
 * and watch the changes for html, sass and js files
 * and watching if a file in the template folder is changing and then insert the changes in all html files in app
 */
 function run(done){
	// auf dem Port 8888 läuft das Backend
	browserSync.init({
		proxy: 'http://localhost:8888',
		open: false
	});

	//watch for changes in sass files
	gulp.watch('./src/scss/**/*.scss', gulp.series(compileScss));

	//watch for changes in html files
	gulp.watch(['./src/*.html'])
		.on('change', browserSync.reload);

	//watch for changes in html templates
	gulp.watch('./src/templates/*.html', gulp.series(injectHeaderAndFooter))

	// Wartet auf Änderungen in einer .js Datei im Frontend Bereich
	gulp.watch(['./src/assets/js/**/*.js'], gulp.series(minifyJs))
		.on('change', browserSync.reload);

	done();
}


/**
 * Löscht das dist Verzeichnis
 */
 function deleteDistFolder(){
	return gulp.src('dist', { read: false, allowEmpty: true })
		.pipe(clean());
}

/**
 * Macht fast das Gleiche, wie der Task 'minifyJs',
 * aber hier wird für den produktiven Code kein Sourcemaps hinzugfügt.
 *
 * Fügt alle .js Files aus dem Array allJsFiles in einem File app.js zusammen.
 * Babel (ES6 zu ES5) braucht es, weil sonst der minifyer nicht geht, der versteht nur ES5.
 */
 function minifyJsForDist(cb){
	pump([
		gulp.src(allJsFiles),
		concat('app.js'),
		babel({
			compact: false, // unterdrückt die Warnung 'The code generator has deoptimised the styling ... as it exceeds the max of'
			presets: ['@babel/env']
		}),
		uglify(),
		rename('app.min.js'),
		gulp.dest('src/assets/scripts')
	], cb);
}

/**
 * Minimiert die css Datei und schreibt sie in den 'dist' Ordner.
 */
 function minifyCss(){
	return gulp.src('./src/assets/css/*.css')
		.pipe(cleanCss())
		.pipe(gulp.dest('dist/assets/css'));
}

/**
 * Kopiert alle html Dateien in den dist Ordner, ausser den
 * html Dateien, die im templates Order liegen.
 */
 function copyHTML(){
	return gulp.src(['./src/**/**/*.html', '!./src/templates/**/*.html'])
		.pipe(gulp.dest('dist'));
}

/**
 * Kopiert die scripts/app.min.js Datei in den dist Ordner
 */
 function copyJs(){
	return gulp.src(['./src/assets/scripts/app.min.js'])
		.pipe(gulp.dest('dist/assets/scripts'));
}

/**
 * Kopiert die robotsForTestEnviroment.txt Datei ins dist Verzeichnis
 * und benennt sie robots.txt um.
 */
 function copyRobotsForTestEnviroment(){
	return gulp.src(['./src/assets/webServerConfig/robotsForTestEnviroment.txt'])
		.pipe(rename('robots.txt'))
		.pipe(gulp.dest('dist'));
}

/**
 * Kopiert alle Bilder und Icons in den dist Ordner
 */
 function copyImages(){
	return gulp.src([
		'./src/assets/images/**/*.png',
		'./src/assets/images/**/*.svg',
		'./src/assets/images/**/*.gif',
		'./src/assets/images/**/*.jpg'
	]).pipe(gulp.dest('dist/assets/images'));
}

/**
 * Kopiert alle Dateien aus dem api Ordner in den dist Ordner
 */
 function copyApi(){
	return gulp.src(['./src/api/**/*.*'])
		.pipe(gulp.dest('dist/api'));
}

/**
 * Ersetzt username und passwort der DB
 */
 function replaceProductionCredentials(){
	return gulp.src(['./src/api/database/DB.php'])
		.pipe(replace('rootuser', configFile.config.productionDB.user))
		.pipe(replace('rootpw', configFile.config.productionDB.pass))
		.pipe(gulp.dest('dist/api/database'));
}


const getFtpTestConnection = () => {
	return ftp.create({
		host: 'proyecto-cero.rhiifresh.ch',
		port: 21,
		user: configFile.config.testFtp.user,
		password: configFile.config.testFtp.pass,
		parallel: 5,
		log: gUtil.log
	})
}


const getFtpProductionConnection = () => {
	return ftp.create({
		host: 'xyz.xyz.ch',
		port: 21,
		user: configFile.config.productionFtp.user,
		password: configFile.config.productionFtp.pass,
		parallel: 5,
		log: gUtil.log
	})
}


function remoteDeploy(getFtpConnection, ftpDestination){
	const connection = getFtpConnection();
	const localFilesToCopy = ['./dist/**/*', './dist/assets/images/pics/**/*.jpg'];

	return gulp.src(localFilesToCopy, {buffer: false})
		//.pipe(connection.newer(ftpDestination)) //nur neue Files hochladen
		.pipe(connection.dest(ftpDestination))
}


/**
 * Mit 'gulp' wird der Default Task gestartet, der in diesem
 * Fall unter anderm den 'run' Task startet.
 */
exports.default = gulp.series(gulp.parallel(compileScss,
											minifyJs,
											injectHeaderAndFooter),
								run);


// Mit 'gulp build' wird das Projekte zusammengebaut und in den 'dist' Ordner gestellt.
function build(enviroment) {
	let building = gulp.series(	deleteDistFolder,
								gulp.parallel(	minifyJsForDist,
												compileScss),
								gulp.parallel(minifyCss),
								gulp.parallel(	copyApi,
												copyHTML,
												copyJs,
												copyImages),
								replaceProductionCredentials			
							  );

	//Überschreibt robots.txt mit src/assets/webServerConfig/robotsForTestEnviroment.txt
	if (enviroment === 'toTestEnviroment') {
		building = gulp.series(building, copyRobotsForTestEnviroment);
	}
	return building;
};

exports.build = build();

// Mit 'gulp deployToTest' wird das Projekt auf den arnelas.mitlinxlernen.ch FTP Server gestellt
// Die Bilder werden jeweils nicht hochgeladen
exports.deployToTest = gulp.series(build('toTestEnviroment'), remoteDeploy.bind(this, getFtpTestConnection, '/'));

exports.deployToProduction = gulp.series(build(), remoteDeploy.bind(this, getFtpProductionConnection, '/html'));
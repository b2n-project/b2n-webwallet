const workboxBuild = require('workbox-build');

// NOTE: This should be run *AFTER* all your assets are built
const buildSW = () => {
	// This will return a Promise
	return workboxBuild.injectManifest({
		swSrc: 'src/service-worker-raw.js',
		swDest: 'src/service-worker.js',
		globDirectory: 'src',
		globPatterns: [
			'**\/*.{js,css,html,json,png,ico,jpg}',
		],
		globIgnores:[
			'd/Vue.js', 'src/service-worker-raw.js'
		]
	});
};

buildSW();

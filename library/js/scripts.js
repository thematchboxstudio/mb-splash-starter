/*
Bones Scripts File
Author: Eddie Machado

This file should contain any js scripts you want to add to the site.
Instead of calling it in the header or throwing it inside wp_head()
this file will be called automatically in the footer so as not to
slow the page load.

*/

// IE8 ployfill for GetComputed Style (for Responsive Script below)
// if (!window.getComputedStyle) {
// 	window.getComputedStyle = function(el, pseudo) {
// 		this.el = el;
// 		this.getPropertyValue = function(prop) {
// 			var re = /(\-([a-z]){1})/g;
// 			if (prop === 'float') { prop = 'styleFloat'; }
// 			if (re.test(prop)) {
// 				prop = prop.replace(re, function () {
// 					return arguments[2].toUpperCase();
// 				});
// 			}
// 			return el.currentStyle[prop] ? el.currentStyle[prop] : null;
// 		};
// 		return this;
// 	};

// }

// as the page loads, call these scripts =======================================================================================*/
jQuery(document).ready(function($) {

	var loggedIn = $('div').hasClass('logged-in'),
		ie9 = $('html').hasClass('ie9');



	/**************************************************************
	GENERAL PAGE SCRIPTS YOU WANT TO LOAD WITH THE PAGE
	**************************************************************/

		/*
		Responsive jQuery is a tricky thing.
		There's a bunch of different ways to handle
		it, so be sure to research and find the one
		that works for you best.
		*/

		/* getting viewport dimensions */
		function responsiveViewport () {
			/* this function will return two values: "Width" and "Height" */
			return {
				Width : $(window).width()
			  , Height : $(window).height()
			};
		} /* end responsiveViewport() function */

		/* to fetch values, make function a variable */
		var viewport = responsiveViewport();
		/*
		*	then attach the return value you want to the variable
		*	for width use "viewport.Width"
		*	for height use "viewport.Height"
		*/

		/* if is below 481px */
		if (viewport.Width < 481) {

		} /* end smallest screen */

		/* if is larger than 481px */
		if (viewport.Width > 481) {

		} /* end larger than 481px */

		/* if is above or equal to 768px */
		if (viewport.Width >= 768) {

		}

		/* off the bat large screen actions */
		if (viewport.Width > 1030) {

		}


		/*
	    *	this function applies min-height class to element
	    *	if window width is larger than or equal to 1136
	    *	and if window height is smaller than 768
	    */

	    function homeMinHeight() {
	    	// Ask for most current viewport dimensions
	    	var viewport = responsiveViewport();
	    	// Viewport variable updated

			if (viewport.Width >= 1136 && viewport.Height < 768) {
				$('#main-header').addClass('min-height');
			} else {
				$('#main-header').removeClass('min-height');
			}
		} // end homeMinHeight() function




		// add all your scripts here


		// remove the tab index for the side nav, which is hidden
		// $("#side a").each(function (i) { $(this).attr('tabindex', -1); });

		// add active class to parent of whatever link the page is on
		$(function(){
		    var url = window.location.pathname,
		        urlRegExp = new RegExp(url.replace(/\/$/,'') + "$"); // create regexp to match current url pathname and remove trailing slash if present as it could collide with the link in navigation in case trailing slash wasn't present there
		        // now grab every link from the navigation
		        $('.sub-menu a').each(function(){
		            // and test its normalized href against the url pathname regexp
		            if(urlRegExp.test(this.href.replace(/\/$/,''))){
		                $(this).parent('li').addClass('active');
		            }
		        });
		});

		// find any iframes inside entry-content
		// wrap them in a div.videoWrapper so they can be responsive
		$('.entry-content iframe').wrap('<div class="videoWrapper"></div>');

		// add class for ios7
		if (navigator.userAgent.match(/(iPad|iPhone|iPod touch);.*CPU.*OS 7_\d/i)) {
			$('html').addClass('ios7');
		}// ios7 class



}); /* end of as page load scripts =======================================================================================*/



/*! A fix for the iOS orientationchange zoom bug.
 Script by @scottjehl, rebound by @wilto.
 MIT License.
*/
(function(w){
	// This fix addresses an iOS bug, so return early if the UA claims it's something else.
	if( !( /iPhone|iPad|iPod/.test( navigator.platform ) && navigator.userAgent.indexOf( "AppleWebKit" ) > -1 ) ){ return; }
	var doc = w.document;
	if( !doc.querySelector ){ return; }
	var meta = doc.querySelector( "meta[name=viewport]" ),
		initialContent = meta && meta.getAttribute( "content" ),
		disabledZoom = initialContent + ",maximum-scale=1",
		enabledZoom = initialContent + ",maximum-scale=10",
		enabled = true,
		x, y, z, aig;
	if( !meta ){ return; }
	function restoreZoom(){
		meta.setAttribute( "content", enabledZoom );
		enabled = true; }
	function disableZoom(){
		meta.setAttribute( "content", disabledZoom );
		enabled = false; }
	function checkTilt( e ){
		aig = e.accelerationIncludingGravity;
		x = Math.abs( aig.x );
		y = Math.abs( aig.y );
		z = Math.abs( aig.z );
		// If portrait orientation and in one of the danger zones
		if( !w.orientation && ( x > 7 || ( ( z > 6 && y < 8 || z < 8 && y > 6 ) && x > 5 ) ) ){
			if( enabled ){ disableZoom(); } }
		else if( !enabled ){ restoreZoom(); } }
	w.addEventListener( "orientationchange", restoreZoom, false );
	w.addEventListener( "devicemotion", checkTilt, false );
})( this );

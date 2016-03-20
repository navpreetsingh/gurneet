// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file. JavaScript code in this file should be added after the last require_* statement.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require bootstrap-sprockets
//= require jquery-ui
//= require jquery.flexslider-min
//= require turbolinks
//= require tether
//= require_tree .

/************************************             /includes/default.js             *********************************************/

function clear_field(id, text) {
	if (id.value == text) {
		id.value = '';
		id.style.color = '#555555';
	}
}
function unclear_field(id, text) {
	if (id.value.length == 0) {
		id.value = text;
		id.style.color = '#777777';
	}
}


function check_email(email){
	var emailRegEx = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
	if (email.search(emailRegEx) == -1) {return false;}
	else {return true;}
}





/************************************             /jquery/lwd_popup/lwd_popup.js             *********************************************/

var lwd_pop_overlay_bg = '#000000';				// background colour over overlay
var lwd_pop_overlay_opacity = 0.7;				// opacity of overlay - 0.7 = 70%

var lwd_pop_open_duration = 100;				// Amount of time for popup to fade in. 400 = 0.4 seconds
var lwd_pop_open_easing = 'easeInOutQuad';		// easing of popup fade in - easeInOutQuad = ease in and out

var lwd_pop_close_duration = 200;				// Amount of time for popup to fade out
var lwd_pop_close_easing = 'easeInOutQuad';		// easing of popup fade out - easeInOutQuad = ease in and out

// placed the following in header.php ecause of language requirements.
var lwd_close_btn_src = "/jquery/lwd_popup/images/close-1.png";


// OPEN THE POPUP
function lwd_pop_open(url, query_string, width) {


	//Set width
	var window_width = $(window).width();

  //Make popups percentage width instead of static width if page is tiny
	if(window_width <= 768 && window_width < width)
	{
		var temp_width = window_width * 0.9;
		width = temp_width.floor();
	}



	if ($('#lwd_pop_overlay').length == 0) {
		// Create #lwd_pop_overlay element
		$('<div/>', {
			id:'lwd_pop_overlay',
			style:'opacity:0;background:'+lwd_pop_overlay_bg+';position:absolute;top:0;left:0;height:'+$(document).height()+'px;width:'+$('html').width()+'px;z-index:5001;'
		}).appendTo('body');


		// Create #lwd_pop_container element
		$('<div/>', {
			id:'lwd_pop_container',
			style:'opacity:0;position:absolute;top:'+($(window).scrollTop()+20)+'px;width:'+width+'px;margin:0px auto;z-index:5002;left:50%;margin-left:-'+(width*.5)+'px;'
		}).appendTo('body');


		// Create #lwd_pop_close_btn
		$('<img/>', {
			id:'lwd_pop_close_btn',
			src:lwd_close_btn_src,
			style:'opacity:0.8'
		}).appendTo('#lwd_pop_container');

		// Create #lwd_pop_inner element
		$('<div/>', {
			id:'lwd_pop_inner',
			src:lwd_close_btn_src,
			html:'<div id = "lwd_pop_loading"><img src = "/jquery/lwd_popup/images/loading.gif" alt = "Loading" id = "" /></div>'
		}).appendTo('#lwd_pop_container');

		// Fade background into place
		$('#lwd_pop_overlay').animate({
			opacity:lwd_pop_overlay_opacity
			},
	  	  {
	      	duration:lwd_pop_open_duration,
				easing:lwd_pop_open_easing
	    	}
		);

		// Fade popup into place
		$('#lwd_pop_container').delay(1).animate({
			opacity:100
			},
	  	  {
	      	duration:lwd_pop_open_duration,
				easing:lwd_pop_open_easing
	    	}
		);
	}
	else {
		$('#lwd_pop_container').animate({width:width+'px', 'margin-left':'-'+(width*0.5)+'px' });
	}

	// parms
	$.post(url, query_string,
		function(data) {
		//$('#lwd_pop_inner').hide("blind", {direction:"vertical" }, 100);
    setTimeout(function() {
			$('#lwd_pop_inner').html(data);
			$('#lwd_pop_inner').show("blind", {direction:"vertical" }, 100, function() {
				$('#lwd_pop_overlay').height($(document).height());
			});
    }, 500);
	});


	$('#lwd_pop_overlay').click(function(){
    	lwd_pop_close();
	});

	$('#lwd_pop_close_btn').click(function(){
    	lwd_pop_close();
	});

}



// CLOSE THE POPUP
function lwd_pop_close() {
	// fade out and remove #lwd_pop_background
	$('#lwd_pop_overlay').animate({
		opacity:0
		},
 	  {
     	duration:lwd_pop_close_duration,
			easing:lwd_pop_close_easing,
			complete:function() {
				$('#lwd_pop_overlay').remove();
			}
		}
	);

	// fade out and remove #lwd_pop_container
	$('#lwd_pop_container').animate({
		opacity:0
		},
 	  {
     	duration:lwd_pop_close_duration,
			easing:lwd_pop_close_easing,
			complete:function() {
				$('#lwd_pop_container').remove();
			}
   	}
	);
}



/************************************             /jquery/lush/js/jquery.easing.1.3.min.js             *********************************************/

jQuery.easing.jswing=jQuery.easing.swing;jQuery.extend(jQuery.easing,{def:"easeOutQuad",swing:function(e,f,a,h,g){return jQuery.easing[jQuery.easing.def](e,f,a,h,g)},easeInQuad:function(e,f,a,h,g){return h*(f/=g)*f+a},easeOutQuad:function(e,f,a,h,g){return -h*(f/=g)*(f-2)+a},easeInOutQuad:function(e,f,a,h,g){if((f/=g/2)<1){return h/2*f*f+a}return -h/2*((--f)*(f-2)-1)+a},easeInCubic:function(e,f,a,h,g){return h*(f/=g)*f*f+a},easeOutCubic:function(e,f,a,h,g){return h*((f=f/g-1)*f*f+1)+a},easeInOutCubic:function(e,f,a,h,g){if((f/=g/2)<1){return h/2*f*f*f+a}return h/2*((f-=2)*f*f+2)+a},easeInQuart:function(e,f,a,h,g){return h*(f/=g)*f*f*f+a},easeOutQuart:function(e,f,a,h,g){return -h*((f=f/g-1)*f*f*f-1)+a},easeInOutQuart:function(e,f,a,h,g){if((f/=g/2)<1){return h/2*f*f*f*f+a}return -h/2*((f-=2)*f*f*f-2)+a},easeInQuint:function(e,f,a,h,g){return h*(f/=g)*f*f*f*f+a},easeOutQuint:function(e,f,a,h,g){return h*((f=f/g-1)*f*f*f*f+1)+a},easeInOutQuint:function(e,f,a,h,g){if((f/=g/2)<1){return h/2*f*f*f*f*f+a}return h/2*((f-=2)*f*f*f*f+2)+a},easeInSine:function(e,f,a,h,g){return -h*Math.cos(f/g*(Math.PI/2))+h+a},easeOutSine:function(e,f,a,h,g){return h*Math.sin(f/g*(Math.PI/2))+a},easeInOutSine:function(e,f,a,h,g){return -h/2*(Math.cos(Math.PI*f/g)-1)+a},easeInExpo:function(e,f,a,h,g){return(f==0)?a:h*Math.pow(2,10*(f/g-1))+a},easeOutExpo:function(e,f,a,h,g){return(f==g)?a+h:h*(-Math.pow(2,-10*f/g)+1)+a},easeInOutExpo:function(e,f,a,h,g){if(f==0){return a}if(f==g){return a+h}if((f/=g/2)<1){return h/2*Math.pow(2,10*(f-1))+a}return h/2*(-Math.pow(2,-10*--f)+2)+a},easeInCirc:function(e,f,a,h,g){return -h*(Math.sqrt(1-(f/=g)*f)-1)+a},easeOutCirc:function(e,f,a,h,g){return h*Math.sqrt(1-(f=f/g-1)*f)+a},easeInOutCirc:function(e,f,a,h,g){if((f/=g/2)<1){return -h/2*(Math.sqrt(1-f*f)-1)+a}return h/2*(Math.sqrt(1-(f-=2)*f)+1)+a},easeInElastic:function(f,h,e,l,k){var i=1.70158;var j=0;var g=l;if(h==0){return e}if((h/=k)==1){return e+l}if(!j){j=k*0.3}if(g<Math.abs(l)){g=l;var i=j/4}else{var i=j/(2*Math.PI)*Math.asin(l/g)}return -(g*Math.pow(2,10*(h-=1))*Math.sin((h*k-i)*(2*Math.PI)/j))+e},easeOutElastic:function(f,h,e,l,k){var i=1.70158;var j=0;var g=l;if(h==0){return e}if((h/=k)==1){return e+l}if(!j){j=k*0.3}if(g<Math.abs(l)){g=l;var i=j/4}else{var i=j/(2*Math.PI)*Math.asin(l/g)}return g*Math.pow(2,-10*h)*Math.sin((h*k-i)*(2*Math.PI)/j)+l+e},easeInOutElastic:function(f,h,e,l,k){var i=1.70158;var j=0;var g=l;if(h==0){return e}if((h/=k/2)==2){return e+l}if(!j){j=k*(0.3*1.5)}if(g<Math.abs(l)){g=l;var i=j/4}else{var i=j/(2*Math.PI)*Math.asin(l/g)}if(h<1){return -0.5*(g*Math.pow(2,10*(h-=1))*Math.sin((h*k-i)*(2*Math.PI)/j))+e}return g*Math.pow(2,-10*(h-=1))*Math.sin((h*k-i)*(2*Math.PI)/j)*0.5+l+e},easeInBack:function(e,f,a,i,h,g){if(g==undefined){g=1.70158}return i*(f/=h)*f*((g+1)*f-g)+a},easeOutBack:function(e,f,a,i,h,g){if(g==undefined){g=1.70158}return i*((f=f/h-1)*f*((g+1)*f+g)+1)+a},easeInOutBack:function(e,f,a,i,h,g){if(g==undefined){g=1.70158}if((f/=h/2)<1){return i/2*(f*f*(((g*=(1.525))+1)*f-g))+a}return i/2*((f-=2)*f*(((g*=(1.525))+1)*f+g)+2)+a},easeInBounce:function(e,f,a,h,g){return h-jQuery.easing.easeOutBounce(e,g-f,0,h,g)+a},easeOutBounce:function(e,f,a,h,g){if((f/=g)<(1/2.75)){return h*(7.5625*f*f)+a}else{if(f<(2/2.75)){return h*(7.5625*(f-=(1.5/2.75))*f+0.75)+a}else{if(f<(2.5/2.75)){return h*(7.5625*(f-=(2.25/2.75))*f+0.9375)+a}else{return h*(7.5625*(f-=(2.625/2.75))*f+0.984375)+a}}}},easeInOutBounce:function(e,f,a,h,g){if(f<g/2){return jQuery.easing.easeInBounce(e,f*2,0,h,g)*0.5+a}return jQuery.easing.easeOutBounce(e,f*2-g,0,h,g)*0.5+h*0.5+a}});


/************************************             /jquery/lush/js/jquery.lush.min.js             *********************************************/

/*!
 * Lush Content Slider
 * http://geedmo.com
 *
 * Version:1.7
 * Author:@geedmo
 * Copyright (c) 2013, Geedmo. All rights reserved.
 * Released under CodeCanyon Regular License:http://codecanyon.net/licenses
 *
 * News:http://codecanyon.net/user/geedmo/portfolio
 * ======================================================= */eval(function(p,a,c,k,e,d){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--){d[e(c)]=k[c]||e(c)}k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1};while(c--){if(k[c]){p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c])}}return p}('!4(t,e,s,n){4 a(e,i){t.V.U=4(){k t=s.5U("j"),e=4(){k e,i={5V:"5W",5P:"3X",5Y:"66 64",1t:"3X"};2g(e Y i)P(t.1v[e]!==n)C{2b:i[e],1b:e}}(),i=4(){k e,i={5q:"5F",6d:"3U",6F:"6E",6G:"6I",2d:"3U"};2g(e Y i)P(t.1v[e]!==n)C{2b:i[e],1b:e}}();C t=2M,(e||i)&&{1t:e,2d:i}}(),t.x(e,u,3),3.9=t(e),3.N=3.9.1a().3G(".4B, .j-S"),3.8=i,3.8.1e=!1,3.9.E(3.9.J()/(3.8.2j/3.8.2i)),3.16=!1,3.2u=!1,3.1M=!1,3.2c=!1,3.8.1i=6X(z(3.8.1i))?0:z(3.8.1i),!3.8.1G&&3.8.1j&&(3.8.1j=!1),3.2l={2t:"2t",3K:"1g-18",1g:"1g","1g-Y":"1g-Y","1g-18":"1g-18","1g-Y-18":"1g-Y-18",6p:"H-G(0,1,.5,1)",6l:"H-G(.6g,.61,.43,1)",6h:"H-G(.6i,.4w,.43,1)",6r:"H-G(.6,.6w,.6s,.6u)",6v:"H-G(.6t,.82,.3M,1)",6x:"H-G(.6B,.6A,.15,.86)",6z:"H-G(.4z,.2U,.6y,.6q)",6f:"H-G(.19,1,.22,1)",6k:"H-G(1,0,0,1)",6o:"H-G(.55,.6n,.68,.53)",6m:"H-G(.25,.46,.45,.6C)",6D:"H-G(.6U,.4b,.6T,.6S)",6R:"H-G(.6V,.4b,.6W,.22)",70:"H-G(.3M,.84,.44,1)",6Q:"H-G(.77,0,.4C,1)",6P:"H-G(.6H,.2U,.6J,.6K)",6O:"H-G(.23,1,.32,1)",6N:"H-G(.86,0,.6M,1)",6L:"H-G(.47,0,.6e,.71)",5E:"H-G(.39,.5D,.5C,1)",5A:"H-G(.5B,.2U,.55,.4z)",5G:"H-G(0.6,-0.28,0.5K,0.4w)",5I:"H-G(.4C, .5z,.32,1.5L)",5x:"H-G(.68,-.55,.5p,1.55)"},3.9.q({4F:"5t"}),3.8.1G&&3.9.1N(),3.2H(3.9,t.14(3.2A,3))}4 o(e,i){3.9=t(e),3.O=3.9.1a("5u, .j"),3.1K=3.O.X,3.3z=0,3.8=i.1d,3.j=i,3.j.1G=!0,3.9.E(3.9.J()/(3.j.2j/3.j.2i)),3.16=!1,3.8.1e=3.8.1e||3.j.1e,3.8.1e&&(3.8.2r=!1),3.8.1i>0&&(3.j.1i=3.8.1i),3.29(),3.3V(t.14(4(){3.2H(t.14(3.2A,3))},3))}4 r(e){4 i(){C n.x("13").5y||h||n.13("1P"),!0}k s,n=t(3),a=t.1S({},t.13.3F,e.13),o=n.1B(a.5w),r=(o.X,a.4E?a.4E:"5r-"),u=r+"1q-1c",h=!1,d=4(){o.j("1O")},c=4(){o.j("2m")};o.K(4(e,i){t(i).1a().3G(".4B").1N()}),n.13(t.1S(a,{1l:4(s){s.2K.2N(0).21("2B",4(){t(3).j("1l")}),s.2K.j(t.1S(e,{2L:!1,1d:!1,2o:i}))},5M:4(t){t.2K.26("."+u).j("1l")},65:4(t){s=t.2K.3G(":2N("+t.62+")").j("1Z")}})),e.13.2r&&n.67(4(){h=!0,d()},4(){h=!1,c(),n.1B(".1Y").X||i()})}t.1H.6c=4(){C 3.K(4(){3.3g})},t.1H.35=4(t){C 3.1E((3.x("36")||"")+" "+t+" 3b")},t.1H.3i=4(e,i){C 3.K(4(){k s=t(3),n={};P("6b"===s.q(t.V.U.2d.1b+"6a"))n[t.V.U.2d.1b+"31"]=e+"49",n[t.V.U.2d.1b+"3O"]=i,s.2V().q(n);2C{k a={};a[t.V.U.1t.1b+"69"]="5Z",a[t.V.U.1t.1b+"31"]=e+"49",a[t.V.U.1t.1b+"3O"]=i,a[t.V.U.1t.1b+"5Q"]="4a",s.q(a)}})},t.1H.2V=4(){k e={};C e[t.V.U.1t.1b+"31"]="4a",e[t.V.U.1t.1b]="2R",3.q(e)};k u="j",h="j-1d",d="13",c="j-3l",l="j-1P",p="j-5k",f="j-S",m="j-3f",g="j-5N",v="5O",b="5S",I=50;a.3T={2A:4(){k i,s=0,n=0,a=3;3.9.1T("j")||3.9.Z("j"),3.9.q({4F:"5X"}),3.4u(),3.8.13&&(i=3.9.q("41"),3.9.1z()),3.8.1G&&3.9.1z(),t.K(3.N,t.14(4(e,i){k o,r=3.N[e].$1L=t(i);r.F={},r.D={},o=r.x("1c-Y")||a.9.x("1c-Y"),o&&(r.1J=o.1C(" ")),r.F.W=z(3.10("W",r.1J)),r.F.17=3.10("17",r.1J),r.F.11=3.10("11",r.1J),r.F.12=z(3.10("12",r.1J)),r.F.1p=z(3.10("1p",r.1J)),r.F.1y=3.10("1y",r.1J),3.2l[r.F.11]||(r.F.11="2t"),r.F.1p>0&&(r.F.W+=r.F.1p+n),n=r.F.W,o=r.x("1c-18")||a.9.x("1c-18"),o&&(r.1I=o.1C(" "),r.D.W=z(3.10("W",r.1I)),r.D.1k=3.10("1k",r.1I),r.D.11=3.10("11",r.1I),r.D.12=z(3.10("12",r.1I)),r.D.1p=z(3.10("1p",r.1I)),r.D.1y=3.10("1y",r.1I),3.2l[r.D.11]||(r.D.11="2t"),r.D.1p>0&&(r.D.W+=r.D.1p+s),s=r.D.W),r.q({6Z:"72"}),r=2M},3)),3.4y(),3.8.13&&3.9.q("41",i),3.8.1G&&3.9.1N(),3.8.1j&&3.9.20().x("17-1h",3.8.1h),3.8.2L&&3.1l(),a.1u("3Y"),3.9.1r("2B"),t(e).1W(t.14(3.1W,3))},10:4(e,i){k s=t.8j(e,i);C 0>s?3.8.59[e]:i[s+1]||!i[s+1]},3N:4(){k e=3,i=3.2e(),s=3.N.X;C 3.9.Z("1Y"),3.N.K(t.14(4(n,a){k o=a.$1L;o.8f(),o.1U(z(i?e.N[--s].$1L.F.W:o.F.W)),3.17(o),o.1m(4(){e.1u("3w",o),t(3).1n()}),n==3.N.X-1&&o.1m(4(){e.1u("2S"),e.9.1r("F"),t(3).1n()}),3.8.1i>0&&!o.D.1y&&o.1U(3.8.1i),t.V.U&&o.1z()},3)),3},3C:4(){k e=3,i=3.2e(),s=3.N.X;C 3.2c=!0,3.3u=!1,3.N.K(t.14(4(n,a){k o,r=a.$1L;r.D.W>=0&&(r.1U(z(i?e.N[--s].$1L.D.W:r.D.W)),r.1m(4(){!e.1M||r.D.1y||e.3u?(t(3).1n(),r.D.1y||(e.3u=!0)):o=8m(t.14(4(){e.1M||(8n(o),t(3).1n())},3),50)}),3.1k(r),r.1m(4(){e.1u("4x",r),t(3).1n()}),n==3.N.X-1&&r.1m(4(){e.1u("4c"),e.9.1r("D"),t(3).1n()}))},3)),3},1l:4(){k t=3;3.16||(3.16=!0,3.9.1z(),3.9.Z("1q"),3.1W(),t.1u("2T"),3.9.1r("5g"),3.3N(),3.8.1e||3.3C(),3.2b(),3.8.1j&&3.9.20().x("17-1h",3.8.1h))},2b:4(e){C t.8e(3.N).7Z(t.14(4(){C 3.2c?(3.2c=!1,3.3L(e),27 0):(3.9.1E("1Y"),27 0)},3)),3},3L:4(t){k e=3;3.16=!1,e.1u("2o"),3.9.1E("1q 1Y").1r("7Y"),!3.8.1G||3.2u||t||3.3I(),3.2u=!1},3I:4(e){k i,s=e||3.8.1h;3.16||(i="1P"==s?3.8.3D:3.8.3B,t(i).j("1l"))},2H:4(e,i){k s=[],n=0;3.9.1B("*").K(4(e,i){k n,a,o=t(i);"3s"===o[0].2x?(a={M:o.Q("M"),1V:o[0].2x},s.2h(a)):"4H"===o[0].2x?(a={M:o.Q("M"),1V:o[0]},s.2h(a)):(n=o.q("4Y-4T"),n&&"2R"!==n&&n.2k("2G")>=0&&(a={M:n.3r(/2G\\((.*)\\)/)[1].4S(/"/4N,""),1V:"3s"},s.2h(a)))}),s.X?t.K(s,4(e,a){"3s"===a.1V?t("<"+a.1V+">").2F(4(){++n==s.X&&i()}).Q("M",a.M):t(a.1V).2F(4(){++n==s.X&&i()}).Q("M",a.M)}):i()},1Z:4(){C 3.2u=!0,3.N.K(4(e,i){2g(;i.$1L.1m().X;)i.$1L.1Z(!1,!t.V.U)}),3},4A:4(t){P(3.8.1j&&3.9.20().x("17-1h",t),3.8.1e){P(3.2c)C;3.3C().2b()}2C 3.2q("2m").1Z().3I(t)},2q:4(t){C 3.1M="1O"===t,3.1M?3.9.Z("1M"):3.9.1E("1M"),3},3E:4(){C{J:3.9.J(),E:3.9.E()}},1N:4(){3.N.1N()},1z:4(){3.N.1z()},4y:4(){k e={};3.2a={J:3.8.2j,E:3.8.2i},3.N.K(4(i,s){k n=t(s);e.4n=z(n.q("4o-3E"),0)||0,e.2Z=z(n.q("3p-E"))||0,e.4m=z(n.q("8v"),0)||0,e.4p=z(n.q("7U"),0)||0,e.4r=z(n.q("8i"),0)||0,e.4k=z(n.q("8g"),0)||0,e.8t=z(n.q("8p"),0)||0,e.8q=z(n.q("7X"),0)||0,e.8c=z(n.q("89"),0)||0,e.8b=z(n.q("83"),0)||0,e.4f=z(n.q("7W"),0)||0,e.4h=z(n.q("7V"),0)||0,e.4K=z(n.q("8d"),0)||0,e.4D=z(n.q("8o"),0)||0,e.4d=n.q("8r"),e.4j=n.q("8s"),e.4s=n.q("8l"),e.4G=n.q("81"),e.4g=n.q("7S"),e.4i=n.q("7l"),e.4t=n.q("7k"),e.4I=n.q("7j"),e.2W=z(n.E())||e.2Z||0,e.33=z(n.J())||0,e.b=n.q("1A"),e.l=n.q("A"),e.r=n.q("1x"),n.x("4l",t.1S({},e))})},4u:4(){k e=3;3.N.K(4(i,s){k n=t(s);e.3x(s.1v.A,"%")||n.q("A",1F*3v(s.1v.A)/e.8.2j+"%"),e.3x(s.1v.B,"%")||n.q("B",1F*3v(s.1v.B)/e.8.2i+"%")})},3x:4(t,e){C t.2k(e)>0||"T"==e||"7h"==t},1W:4(){4 e(t){C 1>t?1:t+"T"}k i,s,n;3.2a&&(s=3.9.J()/3.2a.J,3.9.q({E:3.2a.E*s}),(3.8.1G||3.8.13)&&3.9.20().q({E:3.2a.E*s}),3.N.K(4(a,o){C n=t(o),(i=n.x("4l"))?(n.q({"4o-3E":2s.4J(i.4n*s)+"T","3p-E":e(2s.4J(i.2Z*s)),"2J-B":i.4m*s+"T","2J-1A":i.4p*s+"T","2J-A":i.4r*s+"T","2J-1x":i.4k*s+"T","2w-B":i.4f*s+"T "+i.4d+" "+i.4g,"2w-1A":i.4h*s+"T "+i.4j+" "+i.4i,"2w-A":i.4K*s+"T "+i.4s+" "+i.4t,"2w-1x":i.4D*s+"T "+i.4G+" "+i.4I,E:i.2W*s+"T",J:i.33*s+"T"}),"4H"===o.2x&&n.Q({J:i.33*s,E:i.2W*s}),27 0):!1}))},2e:4(){k t=3.9.20().x("17-1h");C 3.8.1j&&t&&t!==3.8.1h},17:4(e){k i,s,n,a=!1,o=3;P(n=3.2e()?e.D.1k:e.F.17,t.V.U)e.2V().35("18").Z("Y").x("36",n).Z(n),e.3i(e.F.12,o.2l[e.F.11]).1m(4(){3.3g,t(3).Z("3b").1n()}).1U(z(e.F.12)-1F);2C{2z(n){y"A":y"l":i={"w-A":-3.9.J(),"w-B":0},s={"w-A":0};L;y"1x":y"r":i={"w-A":3.9.J(),"w-B":0},s={"w-A":0};L;y"B":y"t":i={"w-B":-3.9.E(),"w-A":0},s={"w-B":0};L;y"1A":y"b":i={"w-B":3.9.E(),"w-A":0},s={"w-B":0};L;y"A-1w":y"42":i={"w-A":-I,R:0,"w-B":0},s={"w-A":0,R:1};L;y"1x-1w":y"3P":i={"w-A":I,R:0,"w-B":0},s={"w-A":0,R:1};L;y"B-1w":y"40":i={"w-B":-I,R:0,"w-A":0},s={"w-B":0,R:1};L;y"1A-1w":y"3Z":i={"w-B":I,R:0,"w-A":0},s={"w-B":0,R:1};L;3S:a=!0}a?e.q("w",0).1N().74(z(e.F.12),1):e.q(i).1z().3R(s,{2D:z(e.F.12),79:e.F.11})}C{17:i,1k:s}},1k:4(e){k i,s,n,a=!1,o=3;P(n=3.2e()?e.F.17:e.D.1k,t.V.U)e.1m(4(){t(3).35("Y").Z("18").x("36",n).Z(n).3i(e.D.12,o.2l[e.D.11]).1n()}),e.1m(4(){3.3g,t(3).Z("3b").1n()}),e.1U(z(e.D.12)-1F);2C{2z(n){y"A":y"l":s={"w-A":0},i={"w-A":-3.9.J()};L;y"1x":y"r":s={"w-A":0},i={"w-A":3.9.J()};L;y"B":y"t":s={"w-B":0},i={"w-B":-3.9.E()};L;y"1A":y"b":s={"w-B":0},i={"w-B":3.9.E()};L;y"A-1w":y"42":i={"w-A":-I,R:0},s={"w-A":0,R:1};L;y"1x-1w":y"3P":i={"w-A":I,R:0},s={"w-A":0,R:1};L;y"B-1w":y"40":i={"w-B":-I,R:0},s={"w-B":0,R:1};L;y"1A-1w":y"3Z":i={"w-B":I,R:0},s={"w-B":0,R:1};L;3S:a=!0}a?e.4q(z(e.D.12)):e.3R(i,{2D:z(e.D.12),7I:e.D.11})}C{1k:i}},1u:4(t,e,i){e=e||3.9,i=i||[],3.8[t]&&3.8[t].7N(e,i)}},o.3T={2A:4(){k e,i,s=0,n=3;3.O.21("2B",4(){++s==n.1K&&(n.4Z(),n.30(1),n.9.1r("7Q"))}),3.O.2N(0).21("2B",4(){t(3).j("1l"),n.29(!0)}),3.O.K(t.14(4(s,a){t(a).x("1c-3W",s+1),e=s+1,i=s-1,s==3.1K-1&&(e=0),0==s&&(i=3.1K-1),t(a).J(3.9.J()).j(t.1S(3.j,{2L:!1,1d:!0,13:!1,1j:!!3.8.1j,3D:3.O[e],3B:3.O[i],2T:4(){n.30(3.x("1c-3W")),n.8.1e?3.j("1O"):n.56.3n(n)&&(3.j("1O"),n.9.7G(".3H").1r("7F"))},2S:4(){n.8.1e&&3.1E("1Y")},2o:4(){3.1a(".j-1s-3d").K(4(){n.3m(t(3))})},3w:4(){n.8.5b&&3.1T("j-1s-3d")&&3.2n()}}))},3))},29:4(e){e?3.9.1a(".j-29").7y():3.9.7x(t("<2E/>",{"1Q":"j-29"}))},3V:4(e){4 i(){++h==u&&e()}4 s(e,i){t("<2P>").1R(e).Z("j-1s-3k").Q("M",i)}4 n(t){k e=t.7v(\'<2E 1Q="j-1s-3d" />\').20().Q({"x-1c-Y":t.Q("x-1c-Y"),"x-1c-18":t.Q("x-1c-18")}).q({J:t.J(),E:t.E(),B:t[0].1v.B,A:t[0].1v.A});C t.q({J:"1F%",E:"1F%",B:0,A:0}),t.x("2y",t.Q("M")+(-1==t.Q("M").2k("?")?"?":"&")+"7D=1").Q("M",""),e}4 a(){k e=t(3),i=e.1a("1D");o.8.4v&&o.3J(),i.21("2F",4(){e.Z("2Y"),e.1a(".j-1s-3k").1U(o.8.5f).4q(o.8.5d,4(){k t=2Q(4(){i.x("3j",""),o.3m(e,4(){o.8.5c&&o.3y()})},i.x("3h")+o.8.4Q);i.x("3j",t)})}).Q("M",i.x("2y"))}k o=3,r=[],u=0,h=0;P(3.O.1B(\'1D[M*="7C.4V"]\').K(4(){u=r.2h({1D:t(3),3e:"5o"})}),3.O.1B(\'1D[M*="7B.7n"]\').K(4(){u=r.2h({1D:t(3),3e:"3c"})}),0==u)C e(),27 0;2g(k d=0;u>d;d++){k c=r[d].1D,l=n(c);l.1o("2n",a),!4(e,n){2z(r[d].3e){y"3c":k a=n.x("2y").1C("7A/")[1].1C("?")[0];t.5j("38://7z.5n.3a/7u/4U/7O/"+a+"?v=2&7P=4W&4X=?",4(t){s(e,"38://2P.5n.3a/7R/"+a+"/"+"7M.7H"),n.x("3h",2p*z(t.7J.7K$7L.3c$2D.7t)),i()});L;y"5o":k o=n.x("2y").1C("1s/")[1].1C("?")[0];t.5j("38://4V.3a/4U/7s/1s/"+o+".4W?4X=?",4(t){s(e,t[0].7b),n.x("3h",2p*z(t[0].2D)),i()})}}(l,c)}},3m:4(t,i){k s=t.1a("1D"),n=t.1a(".j-1s-3k");e.7e(s.x("3j")),n.7a(3.8.51,4(){s.Q("M",""),i&&i()}),t.1E("2Y")},4Z:4(){3.8.2O&&3.4L(),3.8.3f&&t("<2E/>",{"1Q":m}).1R(3.9),3.5e(),3.3o()},2H:4(e){k i=!1,s=3.9.q("4Y-4T");s&&"2R"!==s&&s.2k("2G")>=0&&(i=s.3r(/2G\\((.*)\\)/)[1].4S(/"/4N,"")),i?t("<2P>").2F(e).Q("M",i):e()},4L:4(){P(3.S=t("<2E/>").1R(3.9).Z(f),t(\'<a 34="#" 1Q="\'+c+\'">&73;</a>\').1R(3.S),3.8.3Q)2g(i=0;i<3.1K;i++)t(\'<a 34="#" 1Q="\'+p+\'" 3q="\'+(i+1)+\'">\'+(i+1)+"</a>").1R(3.S);t(\'<a 34="#" 1Q="\'+l+\'">&75;</a>\').1R(3.S)},3o:4(){k e=3.S&&z(3.S.q("3p-E"));3.S&&(e=0===e?0:3.9.E()/2,3.S.q({A:3.9.J()/2-3.S.J()/2,76:e+"T"}),-1!=78.7f.2k("7o 7.")&&3.S.1B(".j-5k").K(4(){t(3).q("w-B",0===e?0:e-t(3).E()+"T")}))},30:4(t){3.S&&(3.S.1a(".2X").1E("2X"),3.S.1a("a[3q="+t+"]").Z("2X"))},3J:4(){3.O.j("1O")},3y:4(){0==3.O.26(".1q").1B(".2Y").X&&3.O.j("2m")},5e:4(){k i=3,n=4(){i.O.26(".1q").j("1P")},a=4(){i.O.26(".1q").j("3l")};3.8.5i&&t(e).1W(4(){i.O.K(4(e,s){t(s).J(i.9.J())}),2Q(t.14(i.3o,i),1F)}),3.8.2O&&3.S.1o("2n.j",4(e){e.57();k s=t(e.7i);P(!i.16)C s.3t("."+c)&&a(),s.3t("."+l)&&n(),s.3t("."+p)&&i.2f.3n(i,z(s.Q("3q"))),!1}),t("."+g).1o("2n.j",4(){k e=z(t(3).x("2f"));i.2f(e)}),3.8.2r&&3.9.1o("80.3H.Y",t.14(3.3J,i)).1o("85.3H.18",t.14(3.3y,i)),3.8.4O&&t(s).1o("87.j",4(t){k e=t.8a;i.16||(37==e&&a(),39==e&&n())}),"8u"Y e&&3.8.4P&&(3.1f={},3.9.1o("8h",4(t){k e=t.1X?t.1X:t.5a.1X;1==e.X&&(i.1f.2I=i.1f.24=e[0].58)}),3.9.1o("8k",4(t){k e=t.1X?t.1X:t.5a.1X;1==e.X&&(i.1f.24=e[0].58),2s.54(i.1f.2I-i.1f.24)>45&&t.57()}),3.9.1o("5T",4(){2s.54(i.1f.2I-i.1f.24)>45&&(i.1f.2I-i.1f.24>0?n():a())}))},56:4(){C 3.9.1r("60",[3.3z]),3.8.3A&&3.8.3A*3.1K<=3.3z++},2f:4(t){k e,i=3,s=3.O.26(".1q"),n=s.1T("1Y");P(!(3.8.4M&&3.8.1e&&n)&&!3.16&&t>0&&t<=3.1K){P(3.16=!0,e=3.O.2N(t-1),e.1T("1q"))C 3.16=!1,27 0;s.x("j").2q("2m").1Z(),2Q(4(){e.21("5g",4(){i.16=!1}).j("1l")},i.8.4R)}}},t.1H[u]=4(e){4 i(e){k i={1d:{}},n=/^x\\-(.+)$/;C t.K(e.6j,4(e,a){P(n.6Y(a.5l)){k o=a.5l.1C("-"),r=o[1],u=t.7g(o.5v("1d"==r?2:1).5J("-"));"1d"==r?i.1d[u]=s(a.5h):i[u]=s(a.5h)}}),i}4 s(t){C"5H"===t?!0:"63"===t?!1:"2M"===t?2M:4e.5R(t)?3v(t):t}C(2v e).3r("52|7T")?3.K(4(){k s=t(3),n=t.1S(!0,{},t.1H[u].3F,"52"==2v e&&e,i(3));s.1T(h)?t.x(3,v)||t.x(3,v,5m o(3,n)):s.1T(d)?!t.x(3,b)&&t.13&&(t.x(3,b,1),r.3n(3,n)):t.x(3,u)||5m a(3,n)}):3.K(4(){P("7w"==2v e){k i=t.x(3,u);P(!i)C;2z(e){y"1l":y"1Z":y"1W":i[e]();L;y"3l":y"1P":i.4A(e);L;y"1O":y"2m":i.2q(e)}}P("88"==2v e){k s=t.x(3,v);s.2f(e)}})},t(4(){t(".j-1d.48, .j.48").j()}),t.1H[u].3F={59:{W:0,17:"A",1k:"1x",11:"3K",12:2p,1p:0,1y:!1},2L:!0,2j:7c,2i:7d,1h:"1P",1e:!1,1d:!1,13:!1,3D:"",3B:"",1d:{2r:!1,4v:!0,2O:!0,3Q:!0,3f:!0,4O:!0,4P:!0,5i:!0,3A:0,1j:!1,1i:0,5b:!1,5c:!0,5f:7m,5d:7r,51:7q,4Q:2p,4R:7p,4M:!0},3Y:4(){},2T:4(){},2S:4(){},4c:4(){},2o:4(){},3w:4(){},4x:4(){}}}(4e,5s,7E);',62,528,'|||this|function||||options|container||||||||||lush|var||||||css||||||margin|data|case|parseInt|left|top|return|slideOut|height|slideIn|bezier|cubic||width|each|break|src|elements|items|if|attr|opacity|nav|px|css3feature|support|at|length|in|addClass|get|use|during|flexslider|proxy||sliding|from|out||children|name|slide|slider|manual|touchData|ease|direction|deadtime|carousel|to|start|queue|dequeue|on|plus|active|trigger|video|transition|runHook|style|fade|right|force|show|bottom|find|split|iframe|removeClass|100|isSlider|fn|dataOut|dataIn|itemCount|el|paused|hide|pause|next|class|appendTo|extend|hasClass|delay|tag|resize|touches|running|stop|parent|one|||touchEndX||filter|void||preloader|containerSize|end|outRendered|animation|carouselInvert|slideto|for|push|baseHeight|baseWidth|indexOf|cssEasing|resume|click|onSlided|1e3|state|pauseOnHover|Math|linear|stopped|typeof|border|tagName|LushVideosrc|switch|init|lushInit|else|duration|div|load|url|preload|touchStartX|padding|slides|autostart|null|eq|navigation|img|setTimeout|none|onSlideIn|onSlide|05|clearTransition|hg|current|playing|lh|activePage|Duration||wd|href|clearState|activeClass||http||com|live|yt|wrapper|type|shadow|offsetWidth|LushVideoduration|prepareEffect|LushVideotimer|preview|prev|resetVideo|call|updateNav|line|rel|match|IMG|is|outStarted|parseFloat|onItemSlideIn|isUnit|resumeSlider|loopCount|loop|syncPrev|renderOut|syncNext|size|defaults|not|lushhover|advance|pauseSlider|swing|endslide|165|renderIn|TimingFunction|rf|pager|animate|default|prototype|animationend|prepareVideos|index|transitionend|onInit|bf|tf|display|lf|355|||||autoload|ms|0s|03|onSlideOut|bts|jQuery|btw|btc|bbw|bbc|bbs|pr|properties|pt|fs|font|pb|fadeOut|pl|bls|blc|updatePos|pauseOnVideo|045|onItemSlideOut|saveSize|95|go|ignore|175|brw|namespace|visibility|brs|IFRAME|brc|floor|blw|addnav|lockOnManual|gi|keyboard|touch|videoTimerDelay|delayed|replace|image|api|vimeo|json|callback|background|addstuff||videoPreviewFadeIn|object||abs||loopEnds|preventDefault|clientX|param|originalEvent|videoAutoplay|videoAutoresume|videoPreviewFadeOut|addevents|videoAutoplayDelay|slideStart|nodeValue|responsive|getJSON|page|nodeName|new|youtube|vm|265|WebkitAnimation|flex|window|hidden|li|slice|selector|easeInOutBack|animating|885|easeInOutSine|445|565|575|easeOutSine|webkitAnimationEnd|easeInBack|true|easeOutBack|join|735|275|after|external|lushSlider|MozTransition|Delay|isNumeric|lushFlexslider|touchend|createElement|WebkitTransition|webkitTransitionEnd|visible|OTransition|all|sliderLoop||animatingTo|false|otransitionend|before|oTransitionEnd|hover||Property|FillMode|both|forceReflow|MozAnimation|745|easeOutExpo|215|easeInOutCubic|645|attributes|easeInOutExpo|easeOutCubic|easeOutQuad|085|easeInQuad|snap|035|easeInCirc|98|075|335|easeOutCirc|04|easeInOutCirc|795|easeInExpo|135|785|94|easeInOutQuad|oAnimationEnd|OAnimation|MSAnimation|755|MSAnimationEnd|855|06|easeInSine|07|easeInOutQuint|easeOutQuint|easeInQuint|easeInOutQuart|easeInQuart|955|515|455|895|685|isNaN|test|position|easeOutQuart|715|absolute|lt|fadeTo|gt|lineHeight||navigator|easeing|fadeIn|thumbnail_large|1140|450|clearTimeout|appVersion|camelCase|auto|target|borderRightColor|borderLeftColor|borderBottomColor|500|youtu|MSIE|250|400|700|v2|seconds|feeds|wrap|string|append|remove|gdata|embed|www|player|autoplay|document|sliderLoopEnd|off|jpg|easing|entry|media|group|maxresdefault|apply|videos|alt|sliderInit|vi|borderTopColor|undefined|paddingBottom|borderBottomWidth|borderTopWidth|marginBottom|slideEnd|done|mouseenter|borderRightStyle||marginRight||mouseleave||keyup|number|marginLeft|keyCode|mr|ml|borderLeftWidth|when|clearQueue|paddingRight|touchstart|paddingLeft|inArray|touchmove|borderLeftStyle|setInterval|clearInterval|borderRightWidth|marginTop|mb|borderTopStyle|borderBottomStyle|mt|ontouchstart|paddingTop'.split('|'),0,{}))



/************************************             /jquery/lush/flexslider/jquery.flexslider-min.js             *********************************************/

/*
 * jQuery FlexSlider v2.1
 * Copyright 2012 WooThemes
 * Contributing Author:Tyler Smith
 */
 ;(function(d){d.flexslider=function(i,k){var a=d(i),c=d.extend({},d.flexslider.defaults,k),e=c.namespace,p="ontouchstart"in window||window.DocumentTouch&&document instanceof DocumentTouch,t=p?"touchend":"click",l="vertical"===c.direction,m=c.reverse,h=0<c.itemWidth,r="fade"===c.animation,s=""!==c.asNavFor,f={};d.data(i,"flexslider",a);f={init:function(){a.animating=!1;a.currentSlide=c.startAt;a.animatingTo=a.currentSlide;a.atEnd=0===a.currentSlide||a.currentSlide===a.last;a.containerSelector=c.selector.substr(0,
 c.selector.search(" "));a.slides=d(c.selector,a);a.container=d(a.containerSelector,a);a.count=a.slides.length;a.syncExists=0<d(c.sync).length;"slide"===c.animation&&(c.animation="swing");a.prop=l?"top":"marginLeft";a.args={};a.manualPause=!1;var b=a,g;if(g=!c.video)if(g=!r)if(g=c.useCSS)a:{g=document.createElement("div");var n=["perspectiveProperty","WebkitPerspective","MozPerspective","OPerspective","msPerspective"],e;for(e in n)if(void 0!==g.style[n[e]]){a.pfx=n[e].replace("Perspective","").toLowerCase();
 a.prop="-"+a.pfx+"-transform";g=!0;break a}g=!1}b.transitions=g;""!==c.controlsContainer&&(a.controlsContainer=0<d(c.controlsContainer).length&&d(c.controlsContainer));""!==c.manualControls&&(a.manualControls=0<d(c.manualControls).length&&d(c.manualControls));c.randomize&&(a.slides.sort(function(){return Math.round(Math.random())-0.5}),a.container.empty().append(a.slides));a.doMath();s&&f.asNav.setup();a.setup("init");c.controlNav&&f.controlNav.setup();c.directionNav&&f.directionNav.setup();c.keyboard&&
 (1===d(a.containerSelector).length||c.multipleKeyboard)&&d(document).bind("keyup",function(b){b=b.keyCode;if(!a.animating&&(39===b||37===b))b=39===b?a.getTarget("next"):37===b?a.getTarget("prev"):!1,a.flexAnimate(b,c.pauseOnAction)});c.mousewheel&&a.bind("mousewheel",function(b,g){b.preventDefault();var d=0>g?a.getTarget("next"):a.getTarget("prev");a.flexAnimate(d,c.pauseOnAction)});c.pausePlay&&f.pausePlay.setup();c.slideshow&&(c.pauseOnHover&&a.hover(function(){!a.manualPlay&&!a.manualPause&&a.pause()},
 function(){!a.manualPause&&!a.manualPlay&&a.play()}),0<c.initDelay?setTimeout(a.play,c.initDelay):a.play());p&&c.touch&&f.touch();(!r||r&&c.smoothHeight)&&d(window).bind("resize focus",f.resize);setTimeout(function(){c.start(a)},200)},asNav:{setup:function(){a.asNav=!0;a.animatingTo=Math.floor(a.currentSlide/a.move);a.currentItem=a.currentSlide;a.slides.removeClass(e+"active-slide").eq(a.currentItem).addClass(e+"active-slide");a.slides.click(function(b){b.preventDefault();var b=d(this),g=b.index();
 !d(c.asNavFor).data("flexslider").animating&&!b.hasClass("active")&&(a.direction=a.currentItem<g?"next":"prev",a.flexAnimate(g,c.pauseOnAction,!1,!0,!0))})}},controlNav:{setup:function(){a.manualControls?f.controlNav.setupManual():f.controlNav.setupPaging()},setupPaging:function(){var b=1,g;a.controlNavScaffold=d('<ol class="'+e+"control-nav "+e+("thumbnails"===c.controlNav?"control-thumbs":"control-paging")+'"></ol>');if(1<a.pagingCount)for(var n=0;n<a.pagingCount;n++)g="thumbnails"===c.controlNav?
 '<img src="'+a.slides.eq(n).attr("data-thumb")+'"/>':"<a>"+b+"</a>",a.controlNavScaffold.append("<li>"+g+"</li>"),b++;a.controlsContainer?d(a.controlsContainer).append(a.controlNavScaffold):a.append(a.controlNavScaffold);f.controlNav.set();f.controlNav.active();a.controlNavScaffold.delegate("a, img",t,function(b){b.preventDefault();var b=d(this),g=a.controlNav.index(b);b.hasClass(e+"active")||(a.direction=g>a.currentSlide?"next":"prev",a.flexAnimate(g,c.pauseOnAction))});p&&a.controlNavScaffold.delegate("a",
 "click touchstart",function(a){a.preventDefault()})},setupManual:function(){a.controlNav=a.manualControls;f.controlNav.active();a.controlNav.live(t,function(b){b.preventDefault();var b=d(this),g=a.controlNav.index(b);b.hasClass(e+"active")||(g>a.currentSlide?a.direction="next":a.direction="prev",a.flexAnimate(g,c.pauseOnAction))});p&&a.controlNav.live("click touchstart",function(a){a.preventDefault()})},set:function(){a.controlNav=d("."+e+"control-nav li "+("thumbnails"===c.controlNav?"img":"a"),
 a.controlsContainer?a.controlsContainer:a)},active:function(){a.controlNav.removeClass(e+"active").eq(a.animatingTo).addClass(e+"active")},update:function(b,c){1<a.pagingCount&&"add"===b?a.controlNavScaffold.append(d("<li><a>"+a.count+"</a></li>")):1===a.pagingCount?a.controlNavScaffold.find("li").remove():a.controlNav.eq(c).closest("li").remove();f.controlNav.set();1<a.pagingCount&&a.pagingCount!==a.controlNav.length?a.update(c,b):f.controlNav.active()}},directionNav:{setup:function(){var b=d('<ul class="'+
 e+'direction-nav"><li><a class="'+e+'prev" href="#">'+c.prevText+'</a></li><li><a class="'+e+'next" href="#">'+c.nextText+"</a></li></ul>");a.controlsContainer?(d(a.controlsContainer).append(b),a.directionNav=d("."+e+"direction-nav li a",a.controlsContainer)):(a.append(b),a.directionNav=d("."+e+"direction-nav li a",a));f.directionNav.update();a.directionNav.bind(t,function(b){b.preventDefault();b=d(this).hasClass(e+"next")?a.getTarget("next"):a.getTarget("prev");a.flexAnimate(b,c.pauseOnAction)});
 p&&a.directionNav.bind("click touchstart",function(a){a.preventDefault()})},update:function(){var b=e+"disabled";1===a.pagingCount?a.directionNav.addClass(b):c.animationLoop?a.directionNav.removeClass(b):0===a.animatingTo?a.directionNav.removeClass(b).filter("."+e+"prev").addClass(b):a.animatingTo===a.last?a.directionNav.removeClass(b).filter("."+e+"next").addClass(b):a.directionNav.removeClass(b)}},pausePlay:{setup:function(){var b=d('<div class="'+e+'pauseplay"><a></a></div>');a.controlsContainer?
 (a.controlsContainer.append(b),a.pausePlay=d("."+e+"pauseplay a",a.controlsContainer)):(a.append(b),a.pausePlay=d("."+e+"pauseplay a",a));f.pausePlay.update(c.slideshow?e+"pause":e+"play");a.pausePlay.bind(t,function(b){b.preventDefault();d(this).hasClass(e+"pause")?(a.manualPause=!0,a.manualPlay=!1,a.pause()):(a.manualPause=!1,a.manualPlay=!0,a.play())});p&&a.pausePlay.bind("click touchstart",function(a){a.preventDefault()})},update:function(b){"play"===b?a.pausePlay.removeClass(e+"pause").addClass(e+
 "play").text(c.playText):a.pausePlay.removeClass(e+"play").addClass(e+"pause").text(c.pauseText)}},touch:function(){function b(b){j=l?d-b.touches[0].pageY:d-b.touches[0].pageX;p=l?Math.abs(j)<Math.abs(b.touches[0].pageX-e):Math.abs(j)<Math.abs(b.touches[0].pageY-e);if(!p||500<Number(new Date)-k)b.preventDefault(),!r&&a.transitions&&(c.animationLoop||(j/=0===a.currentSlide&&0>j||a.currentSlide===a.last&&0<j?Math.abs(j)/q+2:1),a.setProps(f+j,"setTouch"))}function g(){i.removeEventListener("touchmove",
 b,!1);if(a.animatingTo===a.currentSlide&&!p&&null!==j){var h=m?-j:j,l=0<h?a.getTarget("next"):a.getTarget("prev");a.canAdvance(l)&&(550>Number(new Date)-k&&50<Math.abs(h)||Math.abs(h)>q/2)?a.flexAnimate(l,c.pauseOnAction):r||a.flexAnimate(a.currentSlide,c.pauseOnAction,!0)}i.removeEventListener("touchend",g,!1);f=j=e=d=null}var d,e,f,q,j,k,p=!1;i.addEventListener("touchstart",function(j){a.animating?j.preventDefault():1===j.touches.length&&(a.pause(),q=l?a.h:a.w,k=Number(new Date),f=h&&m&&a.animatingTo===
 a.last?0:h&&m?a.limit-(a.itemW+c.itemMargin)*a.move*a.animatingTo:h&&a.currentSlide===a.last?a.limit:h?(a.itemW+c.itemMargin)*a.move*a.currentSlide:m?(a.last-a.currentSlide+a.cloneOffset)*q:(a.currentSlide+a.cloneOffset)*q,d=l?j.touches[0].pageY:j.touches[0].pageX,e=l?j.touches[0].pageX:j.touches[0].pageY,i.addEventListener("touchmove",b,!1),i.addEventListener("touchend",g,!1))},!1)},resize:function(){!a.animating&&a.is(":visible")&&(h||a.doMath(),r?f.smoothHeight():h?(a.slides.width(a.computedW),
 a.update(a.pagingCount),a.setProps()):l?(a.viewport.height(a.h),a.setProps(a.h,"setTotal")):(c.smoothHeight&&f.smoothHeight(),a.newSlides.width(a.computedW),a.setProps(a.computedW,"setTotal")))},smoothHeight:function(b){if(!l||r){var c=r?a:a.viewport;b?c.animate({height:a.slides.eq(a.animatingTo).height()},b):c.height(a.slides.eq(a.animatingTo).height())}},sync:function(b){var g=d(c.sync).data("flexslider"),e=a.animatingTo;switch(b){case "animate":g.flexAnimate(e,c.pauseOnAction,!1,!0);break;case "play":!g.playing&&
 !g.asNav&&g.play();break;case "pause":g.pause()}}};a.flexAnimate=function(b,g,n,i,k){s&&1===a.pagingCount&&(a.direction=a.currentItem<b?"next":"prev");if(!a.animating&&(a.canAdvance(b,k)||n)&&a.is(":visible")){if(s&&i)if(n=d(c.asNavFor).data("flexslider"),a.atEnd=0===b||b===a.count-1,n.flexAnimate(b,!0,!1,!0,k),a.direction=a.currentItem<b?"next":"prev",n.direction=a.direction,Math.ceil((b+1)/a.visible)-1!==a.currentSlide&&0!==b)a.currentItem=b,a.slides.removeClass(e+"active-slide").eq(b).addClass(e+
 "active-slide"),b=Math.floor(b/a.visible);else return a.currentItem=b,a.slides.removeClass(e+"active-slide").eq(b).addClass(e+"active-slide"),!1;a.animating=!0;a.animatingTo=b;c.before(a);g&&a.pause();a.syncExists&&!k&&f.sync("animate");c.controlNav&&f.controlNav.active();h||a.slides.removeClass(e+"active-slide").eq(b).addClass(e+"active-slide");a.atEnd=0===b||b===a.last;c.directionNav&&f.directionNav.update();b===a.last&&(c.end(a),c.animationLoop||a.pause());if(r)p?(a.slides.eq(a.currentSlide).css({opacity:0,
 zIndex:1}),a.slides.eq(b).css({opacity:1,zIndex:2}),a.slides.unbind("webkitTransitionEnd transitionend"),a.slides.eq(a.currentSlide).bind("webkitTransitionEnd transitionend",function(){c.after(a)}),a.animating=!1,a.currentSlide=a.animatingTo):(a.slides.eq(a.currentSlide).fadeOut(c.animationSpeed,c.easing),a.slides.eq(b).fadeIn(c.animationSpeed,c.easing,a.wrapup));else{var q=l?a.slides.filter(":first").height():a.computedW;h?(b=c.itemWidth>a.w?2*c.itemMargin:c.itemMargin,b=(a.itemW+b)*a.move*a.animatingTo,
 b=b>a.limit&&1!==a.visible?a.limit:b):b=0===a.currentSlide&&b===a.count-1&&c.animationLoop&&"next"!==a.direction?m?(a.count+a.cloneOffset)*q:0:a.currentSlide===a.last&&0===b&&c.animationLoop&&"prev"!==a.direction?m?0:(a.count+1)*q:m?(a.count-1-b+a.cloneOffset)*q:(b+a.cloneOffset)*q;a.setProps(b,"",c.animationSpeed);if(a.transitions){if(!c.animationLoop||!a.atEnd)a.animating=!1,a.currentSlide=a.animatingTo;a.container.unbind("webkitTransitionEnd transitionend");a.container.bind("webkitTransitionEnd transitionend",
 function(){a.wrapup(q)})}else a.container.animate(a.args,c.animationSpeed,c.easing,function(){a.wrapup(q)})}c.smoothHeight&&f.smoothHeight(c.animationSpeed)}};a.wrapup=function(b){!r&&!h&&(0===a.currentSlide&&a.animatingTo===a.last&&c.animationLoop?a.setProps(b,"jumpEnd"):a.currentSlide===a.last&&(0===a.animatingTo&&c.animationLoop)&&a.setProps(b,"jumpStart"));a.animating=!1;a.currentSlide=a.animatingTo;c.after(a)};a.animateSlides=function(){a.animating||a.flexAnimate(a.getTarget("next"))};a.pause=
 function(){clearInterval(a.animatedSlides);a.playing=!1;c.pausePlay&&f.pausePlay.update("play");a.syncExists&&f.sync("pause")};a.play=function(){a.animatedSlides=setInterval(a.animateSlides,c.slideshowSpeed);a.playing=!0;c.pausePlay&&f.pausePlay.update("pause");a.syncExists&&f.sync("play")};a.canAdvance=function(b,g){var d=s?a.pagingCount-1:a.last;return g?!0:s&&a.currentItem===a.count-1&&0===b&&"prev"===a.direction?!0:s&&0===a.currentItem&&b===a.pagingCount-1&&"next"!==a.direction?!1:b===a.currentSlide&&
 !s?!1:c.animationLoop?!0:a.atEnd&&0===a.currentSlide&&b===d&&"next"!==a.direction?!1:a.atEnd&&a.currentSlide===d&&0===b&&"next"===a.direction?!1:!0};a.getTarget=function(b){a.direction=b;return"next"===b?a.currentSlide===a.last?0:a.currentSlide+1:0===a.currentSlide?a.last:a.currentSlide-1};a.setProps=function(b,g,d){var e,f=b?b:(a.itemW+c.itemMargin)*a.move*a.animatingTo;e=-1*function(){if(h)return"setTouch"===g?b:m&&a.animatingTo===a.last?0:m?a.limit-(a.itemW+c.itemMargin)*a.move*a.animatingTo:a.animatingTo===
 a.last?a.limit:f;switch(g){case "setTotal":return m?(a.count-1-a.currentSlide+a.cloneOffset)*b:(a.currentSlide+a.cloneOffset)*b;case "setTouch":return b;case "jumpEnd":return m?b:a.count*b;case "jumpStart":return m?a.count*b:b;default:return b}}()+"px";a.transitions&&(e=l?"translate3d(0,"+e+",0)":"translate3d("+e+",0,0)",d=void 0!==d?d/1E3+"s":"0s",a.container.css("-"+a.pfx+"-transition-duration",d));a.args[a.prop]=e;(a.transitions||void 0===d)&&a.container.css(a.args)};a.setup=function(b){if(r)a.slides.css({width:"100%",
 "float":"left",marginRight:"-100%",position:"relative"}),"init"===b&&(p?a.slides.css({opacity:0,display:"block",webkitTransition:"opacity "+c.animationSpeed/1E3+"s ease",zIndex:1}).eq(a.currentSlide).css({opacity:1,zIndex:2}):a.slides.eq(a.currentSlide).fadeIn(c.animationSpeed,c.easing)),c.smoothHeight&&f.smoothHeight();else{var g,n;"init"===b&&(a.viewport=d('<div class="'+e+'viewport"></div>').css({overflow:"hidden",position:"relative"}).appendTo(a).append(a.container),a.cloneCount=0,a.cloneOffset=
 0,m&&(n=d.makeArray(a.slides).reverse(),a.slides=d(n),a.container.empty().append(a.slides)));c.animationLoop&&!h&&(a.cloneCount=2,a.cloneOffset=1,"init"!==b&&a.container.find(".clone").remove(),a.container.append(a.slides.first().clone().addClass("clone")).prepend(a.slides.last().clone().addClass("clone")));a.newSlides=d(c.selector,a);g=m?a.count-1-a.currentSlide+a.cloneOffset:a.currentSlide+a.cloneOffset;l&&!h?(a.container.height(200*(a.count+a.cloneCount)+"%").css("position","absolute").width("100%"),
 setTimeout(function(){a.newSlides.css({display:"block"});a.doMath();a.viewport.height(a.h);a.setProps(g*a.h,"init")},"init"===b?100:0)):(a.container.width(200*(a.count+a.cloneCount)+"%"),a.setProps(g*a.computedW,"init"),setTimeout(function(){a.doMath();a.newSlides.css({width:a.computedW,"float":"left",display:"block"});c.smoothHeight&&f.smoothHeight()},"init"===b?100:0))}h||a.slides.removeClass(e+"active-slide").eq(a.currentSlide).addClass(e+"active-slide")};a.doMath=function(){var b=a.slides.first(),
 d=c.itemMargin,e=c.minItems,f=c.maxItems;a.w=a.width();a.h=b.height();a.boxPadding=b.outerWidth()-b.width();h?(a.itemT=c.itemWidth+d,a.minW=e?e*a.itemT:a.w,a.maxW=f?f*a.itemT:a.w,a.itemW=a.minW>a.w?(a.w-d*e)/e:a.maxW<a.w?(a.w-d*f)/f:c.itemWidth>a.w?a.w:c.itemWidth,a.visible=Math.floor(a.w/(a.itemW+d)),a.move=0<c.move&&c.move<a.visible?c.move:a.visible,a.pagingCount=Math.ceil((a.count-a.visible)/a.move+1),a.last=a.pagingCount-1,a.limit=1===a.pagingCount?0:c.itemWidth>a.w?(a.itemW+2*d)*a.count-a.w-
 d:(a.itemW+d)*a.count-a.w-d):(a.itemW=a.w,a.pagingCount=a.count,a.last=a.count-1);a.computedW=a.itemW-a.boxPadding};a.update=function(b,d){a.doMath();h||(b<a.currentSlide?a.currentSlide+=1:b<=a.currentSlide&&0!==b&&(a.currentSlide-=1),a.animatingTo=a.currentSlide);if(c.controlNav&&!a.manualControls)if("add"===d&&!h||a.pagingCount>a.controlNav.length)f.controlNav.update("add");else if("remove"===d&&!h||a.pagingCount<a.controlNav.length)h&&a.currentSlide>a.last&&(a.currentSlide-=1,a.animatingTo-=1),
 f.controlNav.update("remove",a.last);c.directionNav&&f.directionNav.update()};a.addSlide=function(b,e){var f=d(b);a.count+=1;a.last=a.count-1;l&&m?void 0!==e?a.slides.eq(a.count-e).after(f):a.container.prepend(f):void 0!==e?a.slides.eq(e).before(f):a.container.append(f);a.update(e,"add");a.slides=d(c.selector+":not(.clone)",a);a.setup();c.added(a)};a.removeSlide=function(b){var e=isNaN(b)?a.slides.index(d(b)):b;a.count-=1;a.last=a.count-1;isNaN(b)?d(b,a.slides).remove():l&&m?a.slides.eq(a.last).remove():
 a.slides.eq(b).remove();a.doMath();a.update(e,"remove");a.slides=d(c.selector+":not(.clone)",a);a.setup();c.removed(a)};f.init()};d.flexslider.defaults={namespace:"flex-",selector:".slides > li",animation:"fade",easing:"swing",direction:"horizontal",reverse:!1,animationLoop:!0,smoothHeight:!1,startAt:0,slideshow:!0,slideshowSpeed:7E3,animationSpeed:600,initDelay:0,randomize:!1,pauseOnAction:!0,pauseOnHover:!1,useCSS:!0,touch:!0,video:!1,controlNav:!0,directionNav:!0,prevText:"Previous",nextText:"Next",
 keyboard:!0,multipleKeyboard:!1,mousewheel:!1,pausePlay:!1,pauseText:"Pause",playText:"Play",controlsContainer:"",manualControls:"",sync:"",asNavFor:"",itemWidth:0,itemMargin:0,minItems:0,maxItems:0,move:0,start:function(){},before:function(){},after:function(){},end:function(){},added:function(){},removed:function(){}};d.fn.flexslider=function(i){void 0===i&&(i={});if("object"===typeof i)return this.each(function(){var a=d(this),c=a.find(i.selector?i.selector:".slides > li");1===c.length?(c.fadeIn(400),
 i.start&&i.start(a)):void 0==a.data("flexslider")&&new d.flexslider(this,i)});var k=d(this).data("flexslider");switch(i){case "play":k.play();break;case "pause":k.pause();break;case "next":k.flexAnimate(k.getTarget("next"),!0);break;case "prev":case "previous":k.flexAnimate(k.getTarget("prev"),!0);break;default:"number"===typeof i&&k.flexAnimate(i,!0)}}})(jQuery);


/************************************             /jquery/flat-ui/jquery.ui.touch-punch.min.js             *********************************************/

/*
 * jQuery UI Touch Punch 0.2.2
 *
 * Copyright 2011, Dave Furfero
 * Dual licensed under the MIT or GPL Version 2 licenses.
 *
 * Depends:
 * jquery.ui.widget.js
 * jquery.ui.mouse.js
 */
(function(b){b.support.touch="ontouchend" in document;if(!b.support.touch){return;}var c=b.ui.mouse.prototype,e=c._mouseInit,a;function d(g,h){if(g.originalEvent.touches.length>1){return;}g.preventDefault();var i=g.originalEvent.changedTouches[0],f=document.createEvent("MouseEvents");f.initMouseEvent(h,true,true,window,1,i.screenX,i.screenY,i.clientX,i.clientY,false,false,false,false,0,null);g.target.dispatchEvent(f);}c._touchStart=function(g){var f=this;if(a||!f._mouseCapture(g.originalEvent.changedTouches[0])){return;}a=true;f._touchMoved=false;d(g,"mouseover");d(g,"mousemove");d(g,"mousedown");};c._touchMove=function(f){if(!a){return;}this._touchMoved=true;d(f,"mousemove");};c._touchEnd=function(f){if(!a){return;}d(f,"mouseup");d(f,"mouseout");if(!this._touchMoved){d(f,"click");}a=false;};c._mouseInit=function(){var f=this;f.element.bind("touchstart",b.proxy(f,"_touchStart")).bind("touchmove",b.proxy(f,"_touchMove")).bind("touchend",b.proxy(f,"_touchEnd"));e.call(f);};})(jQuery);


/************************************             /jquery/flat-ui/bootstrap-select.js             *********************************************/

!function($) {
  var Selectpicker = function(element, options, e) {
    if (e ) {
      e.stopPropagation();
      e.preventDefault();
    }
    this.$element = $(element);
    this.$newElement = null;
    this.button = null;

    //Merge defaults, options and data-attributes to make our options
    this.options = $.extend({}, $.fn.selectpicker.defaults, this.$element.data(), typeof options == 'object' && options);

    //If we have no title yet, check the attribute 'title' (this is missed by jq as its not a data-attribute
    if(this.options.title==null)
      this.options.title = this.$element.attr('title');

    //Expose public methods
    this.val = Selectpicker.prototype.val;
    this.render = Selectpicker.prototype.render;
    this.init();
  };

  Selectpicker.prototype = {

    constructor:Selectpicker,

    init:function (e) {
      var _this = this;
      this.$element.hide();
      this.multiple = this.$element.prop('multiple');


      var classList = this.$element.attr('class') !== undefined ? this.$element.attr('class').split(/\s+/) :'';
      var id = this.$element.attr('id');
      this.$element.after( this.createView() );
      this.$newElement = this.$element.next('.select');
      var select = this.$newElement;
      var menu = this.$newElement.find('.dropdown-menu');
      var menuArrow = this.$newElement.find('.dropdown-arrow');
      var menuA = menu.find('li > a');
      var liHeight = select.addClass('open').find('.dropdown-menu li > a').outerHeight();
      select.removeClass('open');
      var divHeight = menu.find('li .divider').outerHeight(true);
      var selectOffset_top = this.$newElement.offset().top;
      var size = 0;
      var menuHeight = 0;
      var selectHeight = this.$newElement.outerHeight();
      this.button = this.$newElement.find('> button');
      if (id !== undefined) {
        this.button.attr('id', id);
        $('label[for="' + id + '"]').click(function(){select.find('button#'+id).focus();})
      }
      for (var i = 0;i < classList.length;i++) {
        if(classList[i] != 'selectpicker') {
          this.$newElement.addClass(classList[i]);
        }
      }
      //If we are multiple, then add the show-tick class by default
      if(this.multiple) {
         this.$newElement.addClass('select-multiple');
      }
      this.button.addClass(this.options.style);
      menu.addClass(this.options.menuStyle);
      menuArrow.addClass(function() {
        if (_this.options.menuStyle) {
          return _this.options.menuStyle.replace('dropdown-', 'dropdown-arrow-');
        }
      });
      this.checkDisabled();
      this.checkTabIndex();
      this.clickListener();
      var menuPadding = parseInt(menu.css('padding-top')) + parseInt(menu.css('padding-bottom')) + parseInt(menu.css('border-top-width')) + parseInt(menu.css('border-bottom-width'));
      if (this.options.size == 'auto') {
        function getSize() {
          var selectOffset_top_scroll = selectOffset_top - $(window).scrollTop();
          var windowHeight = window.innerHeight;
          var menuExtras = menuPadding + parseInt(menu.css('margin-top')) + parseInt(menu.css('margin-bottom')) + 2;
          var selectOffset_bot = windowHeight - selectOffset_top_scroll - selectHeight - menuExtras;
          menuHeight = selectOffset_bot;
          if (select.hasClass('dropup')) {
            menuHeight = selectOffset_top_scroll - menuExtras;
          }
          menu.css({'max-height' :menuHeight + 'px', 'overflow-y' :'auto', 'min-height' :liHeight*3 + 'px'});
      }
        getSize();
        $(window).resize(getSize);
        $(window).scroll(getSize);
        this.$element.bind('DOMNodeInserted', getSize);
      }else if (this.options.size && this.options.size != 'auto' && menu.find('li').length > this.options.size) {
        var optIndex = menu.find("li > *").filter(':not(.divider)').slice(0,this.options.size).last().parent().index();
        var divLength = menu.find("li").slice(0,optIndex + 1).find('.divider').length;
        menuHeight = liHeight*this.options.size + divLength*divHeight + menuPadding;
        menu.css({'max-height' :menuHeight + 'px', 'overflow-y' :'scroll'});
      }

      //Listen for updates to the DOM and re render...
      this.$element.bind('DOMNodeInserted', $.proxy(this.reloadLi, this));

      this.render();
    },

    createDropdown:function() {
      var drop =
        "<div class='btn-group select'>" +
          "<i class='dropdown-arrow'></i>" +
          "<button class='btn dropdown-toggle clearfix' data-toggle='dropdown'>" +
            "<span class='filter-option pull-left'></span>&nbsp;" +
            "<span class='caret'></span>" +
          "</button>" +
          "<ul class='dropdown-menu' role='menu'>" +
          "</ul>" +
        "</div>";

      return $(drop);
    },


    createView:function() {
      var $drop = this.createDropdown();
      var $li = this.createLi();
      $drop.find('ul').append($li);
      return $drop;
    },

    reloadLi:function() {
      //Remove all children.
      this.destroyLi();
      //Re build
      $li = this.createLi();
      this.$newElement.find('ul').append( $li );
      //render view
      this.render();
    },

    destroyLi:function() {
      this.$newElement.find('li').remove();
    },

    createLi:function() {

      var _this = this;
      var _li = [];
      var _liA = [];
      var _liHtml = '';

      this.$element.find('option').each(function(){
        _li.push($(this).text());
      });

      this.$element.find('option').each(function(index) {
        //Get the class and text for the option
        var optionClass = $(this).attr("class") !== undefined ? $(this).attr("class") :'';
        	var text = $(this).text();
        	var subtext = $(this).data('subtext') !== undefined ? '<small class="muted">'+$(this).data('subtext')+'</small>' :'';

        //Append any subtext to the main text.
        text+=subtext;

        if ($(this).parent().is('optgroup') && $(this).data('divider') != true) {
          if ($(this).index() == 0) {
            //Get the opt group label
            var label = $(this).parent().attr('label');
            var labelSubtext = $(this).parent().data('subtext') !== undefined ? '<small class="muted">'+$(this).parent().data('subtext')+'</small>' :'';
            label += labelSubtext;

            if ($(this)[0].index != 0) {
              _liA.push(
                '<div class="divider"></div>'+
                '<dt>'+label+'</dt>'+ 
                _this.createA(text, "opt " + optionClass )
                );
            }else {
              _liA.push(
                '<dt>'+label+'</dt>'+ 
                _this.createA(text, "opt " + optionClass ));
            }
          }else {
             _liA.push( _this.createA(text, "opt " + optionClass ) );
          }
        }else if ($(this).data('divider') == true) {
          _liA.push('<div class="divider"></div>');
        }else {
          _liA.push( _this.createA(text, optionClass ) );
        }
      });

      if (_li.length > 0) {
        for (var i = 0;i < _li.length;i++) {
          var $option = this.$element.find('option').eq(i);
          _liHtml += "<li rel=" + i + ">" + _liA[i] + "</li>";
        }
      }

      //If we dont have a selected item, and we dont have a title, select the first element so something is set in the button
      if(this.$element.find('option:selected').length==0 && !_this.options.title) {
        this.$element.find('option').eq(0).prop('selected', true).attr('selected', 'selected');
      }

      return $(_liHtml);
    },

    createA:function(test, classes) {
     return '<a tabindex="-1" href="#" class="'+classes+'">' +
         '<span class="pull-left">' + test + '</span>' +
         '</a>';

    },

     render:function() {
      var _this = this;

      //Set width of select
       if (this.options.width == 'auto') {
         var ulWidth = this.$newElement.find('.dropdown-menu').css('width');
         this.$newElement.css('width',ulWidth);
       }else if (this.options.width && this.options.width != 'auto') {
         this.$newElement.css('width',this.options.width);
       }

      //Update the LI to match the SELECT
      this.$element.find('option').each(function(index) {
        _this.setDisabled(index, $(this).is(':disabled') || $(this).parent().is(':disabled') );
        _this.setSelected(index, $(this).is(':selected') );
      });



      var selectedItems = this.$element.find('option:selected').map(function(index,value) {
        if($(this).attr('title')!=undefined) {
          return $(this).attr('title');
        }else {
          return $(this).text();
        }
      }).toArray();

      //Convert all the values into a comma delimited string  
      var title = selectedItems.join(", ");

      //If this is multi select, and the selectText type is count, the show 1 of 2 selected etc..          
      if(_this.multiple && _this.options.selectedTextFormat.indexOf('count') > -1) {
        var max = _this.options.selectedTextFormat.split(">");
        if( (max.length>1 && selectedItems.length > max[1]) || (max.length==1 && selectedItems.length>=2)) {
          title = selectedItems.length +' of ' + this.$element.find('option').length + ' selected';
        }
       } 
      
      //If we dont have a title, then use the default, or if nothing is set at all, use the not selected text
      if(!title) {
        title = _this.options.title != undefined ? _this.options.title :_this.options.noneSelectedText;  
      }
      
      this.$element.next('.select').find('.filter-option').html( title );
	  },
	  
    
    
    setSelected:function(index, selected) {
      if(selected) {
        this.$newElement.find('li').eq(index).addClass('selected');
      }else {
        this.$newElement.find('li').eq(index).removeClass('selected');
      }
    },
    
    setDisabled:function(index, disabled) {
      if(disabled) {
        this.$newElement.find('li').eq(index).addClass('disabled');
      }else {
        this.$newElement.find('li').eq(index).removeClass('disabled');
      }
    },
    
    checkDisabled:function() {
      if (this.$element.is(':disabled')) {
        this.button.addClass('disabled');
        this.button.click(function(e) {
          e.preventDefault();
        });
      }
    },
		
		checkTabIndex:function() {
			if (this.$element.is('[tabindex]')) {
				var tabindex = this.$element.attr("tabindex");
				this.button.attr('tabindex', tabindex);
			}
		},
		
		clickListener:function() {
      var _this = this;
      
      $('body').on('touchstart.dropdown', '.dropdown-menu', function (e) {e.stopPropagation();});
      
      
      
      this.$newElement.on('click', 'li a', function(e){
        var clickedIndex = $(this).parent().index(),
          $this = $(this).parent(),
          $select = $this.parents('.select');
        
        
        //Dont close on multi choice menu  
        if(_this.multiple) {
          e.stopPropagation();
        }
        
        e.preventDefault();
        
        //Dont run if we have been disabled
        if ($select.prev('select').not(':disabled') && !$(this).parent().hasClass('disabled')){
          //Deselect all others if not multi select box
          if (!_this.multiple) {
            $select.prev('select').find('option').removeAttr('selected');
            $select.prev('select').find('option').eq(clickedIndex).prop('selected', true).attr('selected', 'selected');
          }
          //Else toggle the one we have chosen if we are multi selet.
          else {
            var selected = $select.prev('select').find('option').eq(clickedIndex).prop('selected');
            
            if(selected) {
              $select.prev('select').find('option').eq(clickedIndex).removeAttr('selected');
            }else {
              $select.prev('select').find('option').eq(clickedIndex).prop('selected', true).attr('selected', 'selected');
            }
          }
          
          
          $select.find('.filter-option').html($this.text());
          $select.find('button').focus();

          // Trigger select 'change'
          $select.prev('select').trigger('change');
        }

      });
      
      this.$newElement.on('click', 'li.disabled a, li dt, li .divider', function(e) {
        e.preventDefault();
        e.stopPropagation();
        $select = $(this).parent().parents('.select');
        $select.find('button').focus();
      });

      this.$element.on('change', function(e) {
        _this.render();
      });
    },
    
    val:function(value) {
      
      if(value!=undefined) {
        this.$element.val( value );
        
        this.$element.trigger('change');
        return this.$element;
      }else {
        return this.$element.val();
      }
    }

  };

  $.fn.selectpicker = function(option, event) {
    //get the args of the outer function..
    var args = arguments;
    var value;
    var chain = this.each(function () {
      var $this = $(this),
        data = $this.data('selectpicker'),
        options = typeof option == 'object' && option;
      
      if (!data) {
      	$this.data('selectpicker', (data = new Selectpicker(this, options, event)));
      }else {
      	for(var i in option) {
      		data[i]=option[i];
      	}
      }
      
      if (typeof option == 'string') {
        //Copy the value of option, as once we shift the arguments
        //it also shifts the value of option.
        property = option;
        if(data[property] instanceof Function) {
          [].shift.apply(args);
          value = data[property].apply(data, args);
        }else {
          value = data[property];
        }
      }
    });
    
    if(value!=undefined) {
      return value;
    }else {
      return chain;
    }
  };

  $.fn.selectpicker.defaults = {
    style:null,
    size:'auto',
    title:null,
    selectedTextFormat :'values',
    noneSelectedText :'Nothing selected',
    width:null,
    menuStyle:null,
    toggleSize:null
  }

}(window.jQuery);



/************************************             /jquery/flat-ui/bootstrap-switch.js             *********************************************/

/* ============================================================
 * bootstrapSwitch v1.3 by Larentis Mattia @spiritualGuru
 * http://www.larentis.eu/switch/
 * ============================================================
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 * ============================================================ */

!function ($) {
 "use strict";

 $.fn['bootstrapSwitch'] = function (method) {
  var methods = {
   init:function () {
    return this.each(function () {
      var $element = $(this)
       , $div
       , $switchLeft
       , $switchRight
       , $label
       , myClasses = ""
       , classes = $element.attr('class')
       , color
       , moving
       , onLabel = "ON"
       , offLabel = "OFF"
       , icon = false;

      $.each(['switch-mini', 'switch-small', 'switch-large'], function (i, el) {
       if (classes.indexOf(el) >= 0)
        myClasses = el;
      });

      $element.addClass('has-switch');

      if ($element.data('on') !== undefined)
       color = "switch-" + $element.data('on');

      if ($element.data('on-label') !== undefined)
       onLabel = $element.data('on-label');

      if ($element.data('off-label') !== undefined)
       offLabel = $element.data('off-label');

      if ($element.data('icon') !== undefined)
       icon = $element.data('icon');

      $switchLeft = $('<span>')
       .addClass("switch-left")
       .addClass(myClasses)
       .addClass(color)
       .html(onLabel);

      color = '';
      if ($element.data('off') !== undefined)
       color = "switch-" + $element.data('off');

      $switchRight = $('<span>')
       .addClass("switch-right")
       .addClass(myClasses)
       .addClass(color)
       .html(offLabel);

      $label = $('<label>')
       .html("&nbsp;")
       .addClass(myClasses)
       .attr('for', $element.find('input').attr('id'));

      if (icon) {
       $label.html('<i class="' + icon + '"></i>');
      }

      $div = $element.find(':checkbox').wrap($('<div>')).parent().data('animated', false);

      if ($element.data('animated') !== false)
       $div.addClass('switch-animate').data('animated', true);

      $div
       .append($switchLeft)
       .append($label)
       .append($switchRight);

      $element.find('>div').addClass(
       $element.find('input').is(':checked') ? 'switch-on' :'switch-off'
      );

      if ($element.find('input').is(':disabled'))
       $(this).addClass('deactivate');

      var changeStatus = function ($this) {
       $this.siblings('label').trigger('mousedown').trigger('mouseup').trigger('click');
      };

      $element.on('keydown', function (e) {
       if (e.keyCode === 32) {
        e.stopImmediatePropagation();
        e.preventDefault();
        changeStatus($(e.target).find('span:first'));
       }
      });

      $switchLeft.on('click', function (e) {
       changeStatus($(this));
      });

      $switchRight.on('click', function (e) {
       changeStatus($(this));
      });

      $element.find('input').on('change', function (e) {
       var $this = $(this)
        , $element = $this.parent()
        , thisState = $this.is(':checked')
        , state = $element.is('.switch-off');

       e.preventDefault();

       $element.css('left', '');

       if (state === thisState) {

        if (thisState)
         $element.removeClass('switch-off').addClass('switch-on');
        else $element.removeClass('switch-on').addClass('switch-off');

        if ($element.data('animated') !== false)
         $element.addClass("switch-animate");

        $element.parent().trigger('switch-change', {'el':$this, 'value':thisState})
       }
      });

      $element.find('label').on('mousedown touchstart', function (e) {
       var $this = $(this);
       moving = false;

       e.preventDefault();
       e.stopImmediatePropagation();

       $this.closest('div').removeClass('switch-animate');

       if ($this.closest('.has-switch').is('.deactivate'))
        $this.unbind('click');
       else {
        $this.on('mousemove touchmove', function (e) {
         var $element = $(this).closest('.switch')
          , relativeX = (e.pageX || e.originalEvent.targetTouches[0].pageX) - $element.offset().left
          , percent = (relativeX / $element.width()) * 100
          , left = 25
          , right = 75;

         moving = true;

         if (percent < left)
          percent = left;
         else if (percent > right)
          percent = right;

         $element.find('>div').css('left', (percent - right) + "%")
        });

        $this.on('click touchend', function (e) {
         var $this = $(this)
          , $target = $(e.target)
          , $myCheckBox = $target.siblings('input');

         e.stopImmediatePropagation();
         e.preventDefault();

         $this.unbind('mouseleave');

         if (moving)
          $myCheckBox.prop('checked', !(parseInt($this.parent().css('left')) < -25));
         else $myCheckBox.prop("checked", !$myCheckBox.is(":checked"));

         moving = false;
         $myCheckBox.trigger('change');
        });

        $this.on('mouseleave', function (e) {
         var $this = $(this)
          , $myCheckBox = $this.siblings('input');

         e.preventDefault();
         e.stopImmediatePropagation();

         $this.unbind('mouseleave');
         $this.trigger('mouseup');

         $myCheckBox.prop('checked', !(parseInt($this.parent().css('left')) < -25)).trigger('change');
        });

        $this.on('mouseup', function (e) {
         e.stopImmediatePropagation();
         e.preventDefault();

         $(this).unbind('mousemove');
        });
       }
      });
     }
    );
   },
   toggleActivation:function () {
    $(this).toggleClass('deactivate');
   },
   isActive:function () {
    return !$(this).hasClass('deactivate');
   },
   setActive:function (active) {
    if (active)
     $(this).removeClass('deactivate');
    else $(this).addClass('deactivate');
   },
   toggleState:function (skipOnChange) {
    var $input = $(this).find('input:checkbox');
    $input.prop('checked', !$input.is(':checked')).trigger('change', skipOnChange);
   },
   setState:function (value, skipOnChange) {
    $(this).find('input:checkbox').prop('checked', value).trigger('change', skipOnChange);
   },
   status:function () {
    return $(this).find('input:checkbox').is(':checked');
   },
   destroy:function () {
    var $div = $(this).find('div')
     , $checkbox;

    $div.find(':not(input:checkbox)').remove();

    $checkbox = $div.children();
    $checkbox.unwrap().unwrap();

    $checkbox.unbind('change');

    return $checkbox;
   }
  };

  if (methods[method])
   return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
  else if (typeof method === 'object' || !method)
   return methods.init.apply(this, arguments);
  else
   $.error('Method ' + method + ' does not exist!');
 };
}(jQuery);

$(function () {
 $('.switch')['bootstrapSwitch']();
});



/************************************             /jquery/flat-ui/flatui-checkbox.js             *********************************************/

/* =============================================================
 * flatui-checkbox.js v0.0.3
 * ============================================================ */
 
!function ($) {

 /* CHECKBOX PUBLIC CLASS DEFINITION
	* ============================== */

	var Checkbox = function (element, options) {
		this.init(element, options);
	}

	Checkbox.prototype = {
		
		constructor:Checkbox
		
	, init:function (element, options) {			 
			var $el = this.$element = $(element)
			
			this.options = $.extend({}, $.fn.checkbox.defaults, options);			 
			$el.before(this.options.template);		
			this.setState();
		}	 
	 
	, setState:function () {		 
			var $el = this.$element
				, $parent = $el.closest('.checkbox');
				
				$el.prop('disabled') && $parent.addClass('disabled');		
				$el.prop('checked') && $parent.addClass('checked');
		}	 
		
	, toggle:function () {		 
			var ch = 'checked'
				, $el = this.$element
				, $parent = $el.closest('.checkbox')
				, checked = $el.prop(ch)
				, e = $.Event('toggle')
			
			if ($el.prop('disabled') == false) {
				$parent.toggleClass(ch) && checked ? $el.removeAttr(ch) :$el.prop(ch, ch);
				$el.trigger(e).trigger('change');
			}
		}	 
		
	, setCheck:function (option) {		 
			var d = 'disabled'
				, ch = 'checked'
				, $el = this.$element
				, $parent = $el.closest('.checkbox')
				, checkAction = option == 'check' ? true :false
				, e = $.Event(option)
			
			$parent[checkAction ? 'addClass' :'removeClass' ](ch) && checkAction ? $el.prop(ch, ch) :$el.removeAttr(ch);
			$el.trigger(e).trigger('change');				
		}	 
			
	}


 /* CHECKBOX PLUGIN DEFINITION
	* ======================== */

	var old = $.fn.checkbox

	$.fn.checkbox = function (option) {
		return this.each(function () {
			var $this = $(this)
				, data = $this.data('checkbox')
				, options = $.extend({}, $.fn.checkbox.defaults, $this.data(), typeof option == 'object' && option);
			if (!data) $this.data('checkbox', (data = new Checkbox(this, options)));
			if (option == 'toggle') data.toggle()
			if (option == 'check' || option == 'uncheck') data.setCheck(option)
			else if (option) data.setState();
		});
	}
	
	$.fn.checkbox.defaults = {
		template:'<span class="icons"><span class="first-icon fui-checkbox-unchecked"></span><span class="second-icon fui-checkbox-checked"></span></span>'
	}


 /* CHECKBOX NO CONFLICT
	* ================== */

	$.fn.checkbox.noConflict = function () {
		$.fn.checkbox = old;
		return this;
	}


 /* CHECKBOX DATA-API
	* =============== */

	$(document).on('click.checkbox.data-api', '[data-toggle^=checkbox], .checkbox', function (e) {
	 var $checkbox = $(e.target);
		if (e.target.tagName != "A") {			
			e && e.preventDefault() && e.stopPropagation();
			if (!$checkbox.hasClass('checkbox')) $checkbox = $checkbox.closest('.checkbox');
			$checkbox.find(':checkbox').checkbox('toggle');
		}
	});
	
	$(function () {
		$('[data-toggle="checkbox"]').each(function () {
			var $checkbox = $(this);
			$checkbox.checkbox();
		});
	});

}(window.jQuery);


/************************************             /jquery/flat-ui/flatui-radio.js             *********************************************/

/* =============================================================
 * flatui-radio.js v0.0.3
 * ============================================================ */

!function ($) {

 /* RADIO PUBLIC CLASS DEFINITION
	* ============================== */

	var Radio = function (element, options) {
		this.init(element, options);
	}

	Radio.prototype = {
	
		constructor:Radio
		
	, init:function (element, options) {			 
			var $el = this.$element = $(element)
			
			this.options = $.extend({}, $.fn.radio.defaults, options);			
			$el.before(this.options.template);		
			this.setState();
		}		
		
	, setState:function () {		 
			var $el = this.$element
				, $parent = $el.closest('.radio');
				
				$el.prop('disabled') && $parent.addClass('disabled');		
				$el.prop('checked') && $parent.addClass('checked');
		}
		
	, toggle:function () {		 
			var d = 'disabled'
				, ch = 'checked'
				, $el = this.$element
				, checked = $el.prop(ch)
				, $parent = $el.closest('.radio')			 
				, $parentWrap = $el.closest('form').length ? $el.closest('form') :$el.closest('body')
				, $elemGroup = $parentWrap.find(':radio[name="' + $el.attr('name') + '"]')
				, e = $.Event('toggle')
				
				$elemGroup.not($el).each(function () {
					var $el = $(this)
						, $parent = $(this).closest('.radio');
						
						if ($el.prop(d) == false) {
							$parent.removeClass(ch) && $el.removeAttr(ch).trigger('change');
						}
				});
			
				if ($el.prop(d) == false) {
					if (checked == false) $parent.addClass(ch) && $el.attr(ch, true);
					$el.trigger(e);
					
					if (checked !== $el.prop(ch)) {
						$el.trigger('change');
					}
				}								
		}
		 
	, setCheck:function (option) {		 
			var ch = 'checked'
				, $el = this.$element
				, $parent = $el.closest('.radio')
				, checkAction = option == 'check' ? true :false
				, checked = $el.prop(ch)
				, $parentWrap = $el.closest('form').length ? $el.closest('form') :$el.closest('body')
				, $elemGroup = $parentWrap.find(':radio[name="' + $el['attr']('name') + '"]')
				, e = $.Event(option)
				
			$elemGroup.not($el).each(function () {
				var $el = $(this)
					, $parent = $(this).closest('.radio');
					
					$parent.removeClass(ch) && $el.removeAttr(ch);
			});
						
			$parent[checkAction ? 'addClass' :'removeClass'](ch) && checkAction ? $el.prop(ch, ch) :$el.removeAttr(ch);
			$el.trigger(e);	 
					
			if (checked !== $el.prop(ch)) {
				$el.trigger('change');
			}
		}	 
		 
	}


 /* RADIO PLUGIN DEFINITION
	* ======================== */

	var old = $.fn.radio

	$.fn.radio = function (option) {
		return this.each(function () {
			var $this = $(this)
				, data = $this.data('radio')
				, options = $.extend({}, $.fn.radio.defaults, $this.data(), typeof option == 'object' && option);
			if (!data) $this.data('radio', (data = new Radio(this, options)));
			if (option == 'toggle') data.toggle()
			if (option == 'check' || option == 'uncheck') data.setCheck(option)
			else if (option) data.setState();
		});
	}
	
	$.fn.radio.defaults = {
		template:'<span class="icons"><span class="first-icon fui-radio-unchecked"></span><span class="second-icon fui-radio-checked"></span></span>'
	}


 /* RADIO NO CONFLICT
	* ================== */

	$.fn.radio.noConflict = function () {
		$.fn.radio = old;
		return this;
	}


 /* RADIO DATA-API
	* =============== */

	$(document).on('click.radio.data-api', '[data-toggle^=radio], .radio', function (e) {
		var $radio = $(e.target);
		if (e.target.tagName != "A") {		
			e && e.preventDefault() && e.stopPropagation();
			if (!$radio.hasClass('radio')) $radio = $radio.closest('.radio');
			$radio.find(':radio').radio('toggle');
		}
	});
	
	$(function () {
		$('[data-toggle="radio"]').each(function () {
			var $radio = $(this);
			$radio.radio();
		});
	});

}(window.jQuery);


/************************************             /jquery/flat-ui/jquery.tagsinput.js             *********************************************/

/*

	jQuery Tags Input Plugin 1.3.3
	
	Copyright (c) 2011 XOXCO, Inc
	
	Documentation for this plugin lives here:
	http://xoxco.com/clickable/jquery-tags-input
	
	Licensed under the MIT license:
	http://www.opensource.org/licenses/mit-license.php

	ben@xoxco.com

*/

(function($) {

	var delimiter = new Array();
	var tags_callbacks = new Array();
	$.fn.doAutosize = function(o){
	  var minWidth = $(this).data('minwidth'),
	    maxWidth = $(this).data('maxwidth'),
	    val = '',
	    input = $(this),
	    testSubject = $('#'+$(this).data('tester_id'));
	
	  if (val === (val = input.val())) {return;}
	
	  // Enter new content into testSubject
	  var escaped = val.replace(/&/g, '&amp;').replace(/\s/g,' ').replace(/</g, '&lt;').replace(/>/g, '&gt;');
	  testSubject.html(escaped);
	  // Calculate new width + whether to change
	  var testerWidth = testSubject.width(),
	    newWidth = (testerWidth + o.comfortZone) >= minWidth ? testerWidth + o.comfortZone :minWidth,
	    currentWidth = input.width(),
	    isValidWidthChange = (newWidth < currentWidth && newWidth >= minWidth)
	               || (newWidth > minWidth && newWidth < maxWidth);
	
	  // Animate width
	  if (isValidWidthChange) {
	    input.width(newWidth);
	  }


 };
 $.fn.resetAutosize = function(options){
  // alert(JSON.stringify(options));
  var minWidth = $(this).data('minwidth') || options.minInputWidth || $(this).width(),
    maxWidth = $(this).data('maxwidth') || options.maxInputWidth || ($(this).closest('.tagsinput').width() - options.inputPadding),
    val = '',
    input = $(this),
    testSubject = $('<tester/>').css({
      position:'absolute',
      top:-9999,
      left:-9999,
      width:'auto',
      fontSize:input.css('fontSize'),
      fontFamily:input.css('fontFamily'),
      fontWeight:input.css('fontWeight'),
      letterSpacing:input.css('letterSpacing'),
      whiteSpace:'nowrap'
    }),
    testerId = $(this).attr('id')+'_autosize_tester';
  if(! $('#'+testerId).length > 0){
   testSubject.attr('id', testerId);
   testSubject.appendTo('body');
  }

  input.data('minwidth', minWidth);
  input.data('maxwidth', maxWidth);
  input.data('tester_id', testerId);
  input.css('width', minWidth);
 };
 
	$.fn.addTag = function(value,options) {
			options = jQuery.extend({focus:false,callback:true},options);
			this.each(function() {
				var id = $(this).attr('id');

				var tagslist = $(this).val().split(delimiter[id]);
				if (tagslist[0] == '') {
					tagslist = new Array();
				}

				value = jQuery.trim(value);
		
				if (options.unique) {
					var skipTag = $(this).tagExist(value);
					if(skipTag == true) {
					  //Marks fake input as not_valid to let styling it
  				  $('#'+id+'_tag').addClass('not_valid');
  				}
				}else {
					var skipTag = false;
				}
				
				if (value !='' && skipTag != true) {
          $('<span>').addClass('tag').append(
            $('<span>').text(value).append('&nbsp;&nbsp;'),
            $('<a class="tagsinput-remove-link">', {
              href :'#',
              title :'Remove tag',
              text :''
            }).click(function () {
              return $('#' + id).removeTag(escape(value));
            })
          ).insertBefore('#' + id + '_addTag');

					tagslist.push(value);
				
					$('#'+id+'_tag').val('');
					if (options.focus) {
						$('#'+id+'_tag').focus();
					}else {		
						$('#'+id+'_tag').blur();
					}
					
					$.fn.tagsInput.updateTagsField(this,tagslist);
					
					if (options.callback && tags_callbacks[id] && tags_callbacks[id]['onAddTag']) {
						var f = tags_callbacks[id]['onAddTag'];
						f.call(this, value);
					}
					if(tags_callbacks[id] && tags_callbacks[id]['onChange'])
					{
						var i = tagslist.length;
						var f = tags_callbacks[id]['onChange'];
						f.call(this, $(this), tagslist[i-1]);
					}					
				}
		
			});		
			
			return false;
		};
		
	$.fn.removeTag = function(value) {
			value = unescape(value);
			this.each(function() {
				var id = $(this).attr('id');
	
				var old = $(this).val().split(delimiter[id]);
					
				$('#'+id+'_tagsinput .tag').remove();
				str = '';
				for (i=0;i< old.length;i++) {
					if (old[i]!=value) {
						str = str + delimiter[id] +old[i];
					}
				}
				
				$.fn.tagsInput.importTags(this,str);

				if (tags_callbacks[id] && tags_callbacks[id]['onRemoveTag']) {
					var f = tags_callbacks[id]['onRemoveTag'];
					f.call(this, value);
				}
			});
					
			return false;
		};
	
	$.fn.tagExist = function(val) {
		var id = $(this).attr('id');
		var tagslist = $(this).val().split(delimiter[id]);
		return (jQuery.inArray(val, tagslist) >= 0);//true when tag exists, false when not
	};
	
	// clear all existing tags and import new ones from a string
	$.fn.importTags = function(str) {
        id = $(this).attr('id');
		$('#'+id+'_tagsinput .tag').remove();
		$.fn.tagsInput.importTags(this,str);
	}
		
	$.fn.tagsInput = function(options) {
  var settings = jQuery.extend({
   interactive:true,
   defaultText:'',
   minChars:0,
   width:'',
   height:'',
   autocomplete:{selectFirst:false },
   'hide':true,
   'delimiter':',',
   'unique':true,
   removeWithBackspace:true,
   placeholderColor:'#666666',
   autosize:true,
   comfortZone:20,
   inputPadding:6*2
  },options);

		this.each(function() {
			if (settings.hide) {
				$(this).hide();				
			}
			var id = $(this).attr('id');
			if (!id || delimiter[$(this).attr('id')]) {
				id = $(this).attr('id', 'tags' + new Date().getTime()).attr('id');
			}
			
			var data = jQuery.extend({
				pid:id,
				real_input:'#'+id,
				holder:'#'+id+'_tagsinput',
				input_wrapper:'#'+id+'_addTag',
				fake_input:'#'+id+'_tag'
			},settings);
	
			delimiter[id] = data.delimiter;
			
			if (settings.onAddTag || settings.onRemoveTag || settings.onChange) {
				tags_callbacks[id] = new Array();
				tags_callbacks[id]['onAddTag'] = settings.onAddTag;
				tags_callbacks[id]['onRemoveTag'] = settings.onRemoveTag;
				tags_callbacks[id]['onChange'] = settings.onChange;
			}
	
      var containerClass = $('#'+id).attr('class').replace('tagsinput', '');
			var markup = '<div id="'+id+'_tagsinput" class="tagsinput '+containerClass+'"><div class="tagsinput-add-container" id="'+id+'_addTag"><div class="tagsinput-add"></div>';
			
			if (settings.interactive) {
				markup = markup + '<input id="'+id+'_tag" value="" data-default="'+settings.defaultText+'" />';
			}
			
			markup = markup + '</div></div>';
			
			$(markup).insertAfter(this);

			$(data.holder).css('width',settings.width);
			$(data.holder).css('min-height',settings.height);
			$(data.holder).css('height','100%');
	
			if ($(data.real_input).val()!='') {
				$.fn.tagsInput.importTags($(data.real_input),$(data.real_input).val());
			}		
			if (settings.interactive) {
				$(data.fake_input).val($(data.fake_input).attr('data-default'));
				$(data.fake_input).css('color',settings.placeholderColor);
		    $(data.fake_input).resetAutosize(settings);
		
				$(data.holder).bind('click',data,function(event) {
					$(event.data.fake_input).focus();
				});
			
				$(data.fake_input).bind('focus',data,function(event) {
					if ($(event.data.fake_input).val()==$(event.data.fake_input).attr('data-default')) {
						$(event.data.fake_input).val('');
					}
					$(event.data.fake_input).css('color','#000000');		
				});
						
				if (settings.autocomplete_url != undefined) {
					autocomplete_options = {source:settings.autocomplete_url};
					for (attrname in settings.autocomplete) {
						autocomplete_options[attrname] = settings.autocomplete[attrname];
					}
				
					if (jQuery.Autocompleter !== undefined) {
						$(data.fake_input).autocomplete(settings.autocomplete_url, settings.autocomplete);
						$(data.fake_input).bind('result',data,function(event,data,formatted) {
							if (data) {
								$('#'+id).addTag(data[0] + "",{focus:true,unique:(settings.unique)});
							}
					 	});
					}else if (jQuery.ui.autocomplete !== undefined) {
						$(data.fake_input).autocomplete(autocomplete_options);
						$(data.fake_input).bind('autocompleteselect',data,function(event,ui) {
							$(event.data.real_input).addTag(ui.item.value,{focus:true,unique:(settings.unique)});
							return false;
						});
					}
				
					
				}else {
						// if a user tabs out of the field, create a new tag
						// this is only available if autocomplete is not used.
						$(data.fake_input).bind('blur',data,function(event) {
							var d = $(this).attr('data-default');
							if ($(event.data.fake_input).val()!='' && $(event.data.fake_input).val()!=d) {
								if( (event.data.minChars <= $(event.data.fake_input).val().length) && (!event.data.maxChars || (event.data.maxChars >= $(event.data.fake_input).val().length)) )
									$(event.data.real_input).addTag($(event.data.fake_input).val(),{focus:true,unique:(settings.unique)});
							}else {
								$(event.data.fake_input).val($(event.data.fake_input).attr('data-default'));
								$(event.data.fake_input).css('color',settings.placeholderColor);
							}
							return false;
						});
				
				}
				// if user types a comma, create a new tag
				$(data.fake_input).bind('keypress',data,function(event) {
					if (event.which==event.data.delimiter.charCodeAt(0) || event.which==13 ) {
					  event.preventDefault();
						if( (event.data.minChars <= $(event.data.fake_input).val().length) && (!event.data.maxChars || (event.data.maxChars >= $(event.data.fake_input).val().length)) )
							$(event.data.real_input).addTag($(event.data.fake_input).val(),{focus:true,unique:(settings.unique)});
					 	$(event.data.fake_input).resetAutosize(settings);
						return false;
					}else if (event.data.autosize) {
			      $(event.data.fake_input).doAutosize(settings);
      
     			}
				});
				//Delete last tag on backspace
				data.removeWithBackspace && $(data.fake_input).bind('keydown', function(event)
				{
					if(event.keyCode == 8 && $(this).val() == '')
					{
						 event.preventDefault();
						 var last_tag = $(this).closest('.tagsinput').find('.tag:last').text();
						 var id = $(this).attr('id').replace(/_tag$/, '');
						 last_tag = last_tag.replace(/[\s\u00a0]+x$/, '');
						 $('#' + id).removeTag(escape(last_tag));
						 $(this).trigger('focus');
					}
				});
				$(data.fake_input).blur();
				
				//Removes the not_valid class when user changes the value of the fake input
				if(data.unique) {
				  $(data.fake_input).keydown(function(event){
				    if(event.keyCode == 8 || String.fromCharCode(event.which).match(/\w+|[áéíóúÁÉÍÓÚñÑ,/]+/)) {
				      $(this).removeClass('not_valid');
				    }
				  });
				}
			}// if settings.interactive
		});
			
		return this;
	
	};
	
	$.fn.tagsInput.updateTagsField = function(obj,tagslist) {
		var id = $(obj).attr('id');
		$(obj).val(tagslist.join(delimiter[id]));
	};
	
	$.fn.tagsInput.importTags = function(obj,val) {			
		$(obj).val('');
		var id = $(obj).attr('id');
		var tags = val.split(delimiter[id]);
		for (i=0;i<tags.length;i++) {
			$(obj).addTag(tags[i],{focus:false,callback:false});
		}
		if(tags_callbacks[id] && tags_callbacks[id]['onChange'])
		{
			var f = tags_callbacks[id]['onChange'];
			f.call(obj, obj, tags[i]);
		}
	};

})(jQuery);



/************************************             /jquery/flat-ui/jquery.placeholder.js             *********************************************/

/*! http://mths.be/placeholder v2.0.7 by @mathias */
;(function(window, document, $) {

	var isInputSupported = 'placeholder' in document.createElement('input'),
	  isTextareaSupported = 'placeholder' in document.createElement('textarea'),
	  prototype = $.fn,
	  valHooks = $.valHooks,
	  hooks,
	  placeholder;

	if (isInputSupported && isTextareaSupported) {

		placeholder = prototype.placeholder = function() {
			return this;
		};

		placeholder.input = placeholder.textarea = true;

	}else {

		placeholder = prototype.placeholder = function() {
			var $this = this;
			$this
				.filter((isInputSupported ? 'textarea' :':input') + '[placeholder]')
				.not('.placeholder')
				.bind({
					'focus.placeholder':clearPlaceholder,
					'blur.placeholder':setPlaceholder
				})
				.data('placeholder-enabled', true)
				.trigger('blur.placeholder');
			return $this;
		};

		placeholder.input = isInputSupported;
		placeholder.textarea = isTextareaSupported;

		hooks = {
			'get':function(element) {
				var $element = $(element);
				return $element.data('placeholder-enabled') && $element.hasClass('placeholder') ? '' :element.value;
			},
			'set':function(element, value) {
				var $element = $(element);
				if (!$element.data('placeholder-enabled')) {
					return element.value = value;
				}
				if (value == '') {
					element.value = value;
					// Issue #56:Setting the placeholder causes problems if the element continues to have focus.
					if (element != document.activeElement) {
						// We can't use `triggerHandler` here because of dummy text/password inputs :(
						setPlaceholder.call(element);
					}
				}else if ($element.hasClass('placeholder')) {
					clearPlaceholder.call(element, true, value) || (element.value = value);
				}else {
					element.value = value;
				}
				// `set` can not return `undefined`;see http://jsapi.info/jquery/1.7.1/val#L2363
				return $element;
			}
		};

		isInputSupported || (valHooks.input = hooks);
		isTextareaSupported || (valHooks.textarea = hooks);

		$(function() {
			// Look for forms
			$(document).delegate('form', 'submit.placeholder', function() {
				// Clear the placeholder values so they don't get submitted
				var $inputs = $('.placeholder', this).each(clearPlaceholder);
				setTimeout(function() {
					$inputs.each(setPlaceholder);
				}, 10);
			});
		});

		// Clear placeholder values upon page reload
		$(window).bind('beforeunload.placeholder', function() {
			$('.placeholder').each(function() {
				this.value = '';
			});
		});

	}

	function args(elem) {
		// Return an object of element attributes
		var newAttrs = {},
		  rinlinejQuery = /^jQuery\d+$/;
		$.each(elem.attributes, function(i, attr) {
			if (attr.specified && !rinlinejQuery.test(attr.name)) {
				newAttrs[attr.name] = attr.value;
			}
		});
		return newAttrs;
	}

	function clearPlaceholder(event, value) {
		var input = this,
		  $input = $(input);
		if (input.value == $input.attr('placeholder') && $input.hasClass('placeholder')) {
			if ($input.data('placeholder-password')) {
				$input = $input.hide().next().show().attr('id', $input.removeAttr('id').data('placeholder-id'));
				// If `clearPlaceholder` was called from `$.valHooks.input.set`
				if (event === true) {
					return $input[0].value = value;
				}
				$input.focus();
			}else {
				input.value = '';
				$input.removeClass('placeholder');
				input == document.activeElement && input.select();
			}
		}
	}

	function setPlaceholder() {
		var $replacement,
		  input = this,
		  $input = $(input),
		  $origInput = $input,
		  id = this.id;
		if (input.value == '') {
			if (input.type == 'password') {
				if (!$input.data('placeholder-textinput')) {
					try {
						$replacement = $input.clone().attr({'type':'text' });
					}catch(e) {
						$replacement = $('<input>').attr($.extend(args(this), {'type':'text' }));
					}
					$replacement
						.removeAttr('name')
						.data({
							'placeholder-password':true,
							'placeholder-id':id
						})
						.bind('focus.placeholder', clearPlaceholder);
					$input
						.data({
							'placeholder-textinput':$replacement,
							'placeholder-id':id
						})
						.before($replacement);
				}
				$input = $input.removeAttr('id').hide().prev().attr('id', id).show();
				// Note:`$input[0] != input` now!
			}
			$input.addClass('placeholder');
			$input[0].value = $input.attr('placeholder');
		}else {
			$input.removeClass('placeholder');
		}
	}

}(this, document, jQuery));


/************************************             /jquery/lwd_mobile_pop_nav/nav.js             *********************************************/

$( window ).resize(function() {
	lwd_pop_nav_resize();
});

$('document').ready(function() {
	// Sets proper right position on page load
		var menu_width = $('#lwd_mobile_pop_nav .menu').width();
		$('.phone-menu').stop().animate({right:'-'+menu_width+'px' }, 150);





	// Set proper heights for each nav item
		lwd_pop_nav_resize();
});


// On Click event to open/close the menu

	$(document).on('click', '.phone-menu .menu-btn', function(e) {
		e.preventDefault();

		var menu_width = $('#lwd_mobile_pop_nav .menu').width();

		if ($('.phone-menu').css('right') == '-'+menu_width+'px') {
			$('.phone-menu').animate({right:0 }, 150);
		}

		else {
			$('.phone-menu').stop().animate({right:'-'+menu_width+'px' }, 150);
		}
	});


function lwd_pop_nav_resize() {

	var document_height = $(document).height();
	$('.phone-menu .menu').height(document_height);

	var window_height = $(window).height();

	var bottom_logo_height = $('.bottom-logo').height();

	var nav_height = window_height - bottom_logo_height;

	var nav_items = $('.menu-item').length;

	  var nav_item_height = (nav_height / nav_items);

	// Min height of nav items
	nav_item_height = (nav_item_height > 38 ? nav_item_height :38);

	$('a.menu-item').css({'line-height':nav_item_height+'px', 'height':nav_item_height+'px' });


}


/************************************             /jquery/icon-hover/modernizr.custom.js             *********************************************/

/* Modernizr 2.6.2 (Custom Build) | MIT & BSD
 * Build:http://modernizr.com/download/#-touch-shiv-cssclasses-teststyles-prefixes-load
 */
;window.Modernizr=function(a,b,c){function w(a){j.cssText=a}function x(a,b){return w(m.join(a+";")+(b||""))}function y(a,b){return typeof a===b}function z(a,b){return!!~(""+a).indexOf(b)}function A(a,b,d){for(var e in a){var f=b[a[e]];if(f!==c)return d===!1?a[e]:y(f,"function")?f.bind(d||b):f}return!1}var d="2.6.2",e={},f=!0,g=b.documentElement,h="modernizr",i=b.createElement(h),j=i.style,k,l={}.toString,m=" -webkit- -moz- -o- -ms- ".split(" "),n={},o={},p={},q=[],r=q.slice,s,t=function(a,c,d,e){var f,i,j,k,l=b.createElement("div"),m=b.body,n=m||b.createElement("body");if(parseInt(d,10))while(d--)j=b.createElement("div"),j.id=e?e[d]:h+(d+1),l.appendChild(j);return f=["&#173;",'<style id="s',h,'">',a,"</style>"].join(""),l.id=h,(m?l:n).innerHTML+=f,n.appendChild(l),m||(n.style.background="",n.style.overflow="hidden",k=g.style.overflow,g.style.overflow="hidden",g.appendChild(n)),i=c(l,a),m?l.parentNode.removeChild(l):(n.parentNode.removeChild(n),g.style.overflow=k),!!i},u={}.hasOwnProperty,v;!y(u,"undefined")&&!y(u.call,"undefined")?v=function(a,b){return u.call(a,b)}:v=function(a,b){return b in a&&y(a.constructor.prototype[b],"undefined")},Function.prototype.bind||(Function.prototype.bind=function(b){var c=this;if(typeof c!="function")throw new TypeError;var d=r.call(arguments,1),e=function(){if(this instanceof e){var a=function(){};a.prototype=c.prototype;var f=new a,g=c.apply(f,d.concat(r.call(arguments)));return Object(g)===g?g:f}return c.apply(b,d.concat(r.call(arguments)))};return e}),n.touch=function(){var c;return"ontouchstart"in a||a.DocumentTouch&&b instanceof DocumentTouch?c=!0:t(["@media (",m.join("touch-enabled),("),h,")","{#modernizr{top:9px;position:absolute}}"].join(""),function(a){c=a.offsetTop===9}),c};for(var B in n)v(n,B)&&(s=B.toLowerCase(),e[s]=n[B](),q.push((e[s]?"":"no-")+s));return e.addTest=function(a,b){if(typeof a=="object")for(var d in a)v(a,d)&&e.addTest(d,a[d]);else{a=a.toLowerCase();if(e[a]!==c)return e;b=typeof b=="function"?b():b,typeof f!="undefined"&&f&&(g.className+=" "+(b?"":"no-")+a),e[a]=b}return e},w(""),i=k=null,function(a,b){function k(a,b){var c=a.createElement("p"),d=a.getElementsByTagName("head")[0]||a.documentElement;return c.innerHTML="x<style>"+b+"</style>",d.insertBefore(c.lastChild,d.firstChild)}function l(){var a=r.elements;return typeof a=="string"?a.split(" "):a}function m(a){var b=i[a[g]];return b||(b={},h++,a[g]=h,i[h]=b),b}function n(a,c,f){c||(c=b);if(j)return c.createElement(a);f||(f=m(c));var g;return f.cache[a]?g=f.cache[a].cloneNode():e.test(a)?g=(f.cache[a]=f.createElem(a)).cloneNode():g=f.createElem(a),g.canHaveChildren&&!d.test(a)?f.frag.appendChild(g):g}function o(a,c){a||(a=b);if(j)return a.createDocumentFragment();c=c||m(a);var d=c.frag.cloneNode(),e=0,f=l(),g=f.length;for(;e<g;e++)d.createElement(f[e]);return d}function p(a,b){b.cache||(b.cache={},b.createElem=a.createElement,b.createFrag=a.createDocumentFragment,b.frag=b.createFrag()),a.createElement=function(c){return r.shivMethods?n(c,a,b):b.createElem(c)},a.createDocumentFragment=Function("h,f","return function(){var n=f.cloneNode(),c=n.createElement;h.shivMethods&&("+l().join().replace(/\w+/g,function(a){return b.createElem(a),b.frag.createElement(a),'c("'+a+'")'})+");return n}")(r,b.frag)}function q(a){a||(a=b);var c=m(a);return r.shivCSS&&!f&&!c.hasCSS&&(c.hasCSS=!!k(a,"article,aside,figcaption,figure,footer,header,hgroup,nav,section{display:block}mark{background:#FF0;color:#000}")),j||p(a,c),a}var c=a.html5||{},d=/^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i,e=/^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i,f,g="_html5shiv",h=0,i={},j;(function(){try{var a=b.createElement("a");a.innerHTML="<xyz></xyz>",f="hidden"in a,j=a.childNodes.length==1||function(){b.createElement("a");var a=b.createDocumentFragment();return typeof a.cloneNode=="undefined"||typeof a.createDocumentFragment=="undefined"||typeof a.createElement=="undefined"}()}catch(c){f=!0,j=!0}})();var r={elements:c.elements||"abbr article aside audio bdi canvas data datalist details figcaption figure footer header hgroup mark meter nav output progress section summary time video",shivCSS:c.shivCSS!==!1,supportsUnknownElements:j,shivMethods:c.shivMethods!==!1,type:"default",shivDocument:q,createElement:n,createDocumentFragment:o};a.html5=r,q(b)}(this,b),e._version=d,e._prefixes=m,e.testStyles=t,g.className=g.className.replace(/(^|\s)no-js(\s|$)/,"$1$2")+(f?" js "+q.join(" "):""),e}(this,this.document),function(a,b,c){function d(a){return"[object Function]"==o.call(a)}function e(a){return"string"==typeof a}function f(){}function g(a){return!a||"loaded"==a||"complete"==a||"uninitialized"==a}function h(){var a=p.shift();q=1,a?a.t?m(function(){("c"==a.t?B.injectCss:B.injectJs)(a.s,0,a.a,a.x,a.e,1)},0):(a(),h()):q=0}function i(a,c,d,e,f,i,j){function k(b){if(!o&&g(l.readyState)&&(u.r=o=1,!q&&h(),l.onload=l.onreadystatechange=null,b)){"img"!=a&&m(function(){t.removeChild(l)},50);for(var d in y[c])y[c].hasOwnProperty(d)&&y[c][d].onload()}}var j=j||B.errorTimeout,l=b.createElement(a),o=0,r=0,u={t:d,s:c,e:f,a:i,x:j};1===y[c]&&(r=1,y[c]=[]),"object"==a?l.data=c:(l.src=c,l.type=a),l.width=l.height="0",l.onerror=l.onload=l.onreadystatechange=function(){k.call(this,r)},p.splice(e,0,u),"img"!=a&&(r||2===y[c]?(t.insertBefore(l,s?null:n),m(k,j)):y[c].push(l))}function j(a,b,c,d,f){return q=0,b=b||"j",e(a)?i("c"==b?v:u,a,b,this.i++,c,d,f):(p.splice(this.i++,0,a),1==p.length&&h()),this}function k(){var a=B;return a.loader={load:j,i:0},a}var l=b.documentElement,m=a.setTimeout,n=b.getElementsByTagName("script")[0],o={}.toString,p=[],q=0,r="MozAppearance"in l.style,s=r&&!!b.createRange().compareNode,t=s?l:n.parentNode,l=a.opera&&"[object Opera]"==o.call(a.opera),l=!!b.attachEvent&&!l,u=r?"object":l?"script":"img",v=l?"script":u,w=Array.isArray||function(a){return"[object Array]"==o.call(a)},x=[],y={},z={timeout:function(a,b){return b.length&&(a.timeout=b[0]),a}},A,B;B=function(a){function b(a){var a=a.split("!"),b=x.length,c=a.pop(),d=a.length,c={url:c,origUrl:c,prefixes:a},e,f,g;for(f=0;f<d;f++)g=a[f].split("="),(e=z[g.shift()])&&(c=e(c,g));for(f=0;f<b;f++)c=x[f](c);return c}function g(a,e,f,g,h){var i=b(a),j=i.autoCallback;i.url.split(".").pop().split("?").shift(),i.bypass||(e&&(e=d(e)?e:e[a]||e[g]||e[a.split("/").pop().split("?")[0]]),i.instead?i.instead(a,e,f,g,h):(y[i.url]?i.noexec=!0:y[i.url]=1,f.load(i.url,i.forceCSS||!i.forceJS&&"css"==i.url.split(".").pop().split("?").shift()?"c":c,i.noexec,i.attrs,i.timeout),(d(e)||d(j))&&f.load(function(){k(),e&&e(i.origUrl,h,g),j&&j(i.origUrl,h,g),y[i.url]=2})))}function h(a,b){function c(a,c){if(a){if(e(a))c||(j=function(){var a=[].slice.call(arguments);k.apply(this,a),l()}),g(a,j,b,0,h);else if(Object(a)===a)for(n in m=function(){var b=0,c;for(c in a)a.hasOwnProperty(c)&&b++;return b}(),a)a.hasOwnProperty(n)&&(!c&&!--m&&(d(j)?j=function(){var a=[].slice.call(arguments);k.apply(this,a),l()}:j[n]=function(a){return function(){var b=[].slice.call(arguments);a&&a.apply(this,b),l()}}(k[n])),g(a[n],j,b,n,h))}else!c&&l()}var h=!!a.test,i=a.load||a.both,j=a.callback||f,k=j,l=a.complete||f,m,n;c(h?a.yep:a.nope,!!i),i&&c(i)}var i,j,l=this.yepnope.loader;if(e(a))g(a,0,l,0);else if(w(a))for(i=0;i<a.length;i++)j=a[i],e(j)?g(j,0,l,0):w(j)?B(j):Object(j)===j&&h(j,l);else Object(a)===a&&h(a,l)},B.addPrefix=function(a,b){z[a]=b},B.addFilter=function(a){x.push(a)},B.errorTimeout=1e4,null==b.readyState&&b.addEventListener&&(b.readyState="loading",b.addEventListener("DOMContentLoaded",A=function(){b.removeEventListener("DOMContentLoaded",A,0),b.readyState="complete"},0)),a.yepnope=k(),a.yepnope.executeStack=h,a.yepnope.injectJs=function(a,c,d,e,i,j){var k=b.createElement("script"),l,o,e=e||B.errorTimeout;k.src=a;for(o in d)k.setAttribute(o,d[o]);c=j?h:c||f,k.onreadystatechange=k.onload=function(){!l&&g(k.readyState)&&(l=1,c(),k.onload=k.onreadystatechange=null)},m(function(){l||(l=1,c(1))},e),i?k.onload():n.parentNode.insertBefore(k,n)},a.yepnope.injectCss=function(a,c,d,e,g,i){var e=b.createElement("link"),j,c=i?h:c||f;e.href=a,e.rel="stylesheet",e.type="text/css";for(j in d)e.setAttribute(j,d[j]);g||(n.parentNode.insertBefore(e,n),m(c,0))}}(this,document),Modernizr.load=function(){yepnope.apply(window,[].slice.call(arguments,0))};
/**
 * BPL Three PR HTML5 Logic v03 - 30-11-2016
 * Modified by dee.patel@bplmarketing.com:
 */
 
 
var creative = {};

var checkMobile;
var isMobile = false;;
var isDesktop = false;;
var isInnApp = false;

/**
 * Window onload handler.
 */
function preInit() {
	 console.log("PRE INIT");
  setupDom();
  if (Enabler.isInitialized()) {
    pageloaded();
  } else {
    Enabler.addEventListener(studio.events.StudioEvent.INIT, pageloaded);
  }
}
// Runs when Enabler is ready.
function pageloaded() {
	console.log("PAGE LOADED");
  if (Enabler.isPageLoaded()) {
    init();
  } else {
    Enabler.addEventListener(studio.events.StudioEvent.PAGE_LOADED, init);
  }
};

// Runs when the page is completely loaded.   
/**
 * Initializes the ad components
 */
function setupDom() {
	updateMediaType();
  creative.dom = {};
  creative.dom.mainContainer = document.getElementById('main-container');
  creative.dom.exit00 = document.getElementById('exit-00');
  creative.dom.loader= document.getElementById('loader');
  creative.dom.frames = document.getElementById('frames');
  creative.dom.frames.style.visibility  = 'hidden';
   
  creative.dom.termsBtn = document.getElementById('termsBtn');
  creative.dom.termsBtn.style.visibility  = 'hidden';
  
    creative.dom.termsTxt = document.getElementById('termsTxt');
  creative.dom.termsTxt.style.visibility  = 'hidden';
}

/**
 * Ad initialisation.
 */
function init() {
	console.log("INIT");
	// testing envirment detection
 checkMobile = {
  Android: function() {
    return navigator.userAgent.match(/Android/i);
  },
  BlackBerry: function() {
    return navigator.userAgent.match(/BlackBerry/i);
  },
  iOS: function() {
    return navigator.userAgent.match(/iPhone|iPad|iPod/i);
  },
  Opera: function() {
    return navigator.userAgent.match(/Opera Mini/i);
  },
  Windows: function() {
    return navigator.userAgent.match(/IEMobile/i);
  },
  any: function() {
    return (checkMobile.Android() || checkMobile.BlackBerry() || checkMobile.iOS() || checkMobile.Opera() || checkMobile.Windows());

  }
  
};

//------------------------------------
	
	checkEnvironment();
  addListeners();
	initAnim();
  // Polite loading
  show();
}


function checkEnvironment() {
		if (studio.common.Environment.hasType(studio.common.Environment.Type.IN_APP)) {
    		// Show in-app "Tap to expand" call to action.
			isInApp = true;
			console.log("IN_APP");
    		//document.getElementById("cta_text").textContent = "Tap to expand";
		} else if (checkMobile.any()){
			isMobile = true;
			console.log("MOBILE_WEB");
			
			
 	 } else {
		 isDesktop = true;
	 console.log("DESKTOP");
    // Show desktop "Click to expand" call to action.
   // document.getElementById("cta_text").textContent = "Click to expand";
  }	
	
}

/**
 * Adds appropriate listeners at initialization time
 */
function addListeners() {
  creative.dom.exit00.addEventListener('click', exitClickHandler);
  creative.dom.exit00.addEventListener('mouseover', exitOverHandler);
  creative.dom.exit00.addEventListener('mouseout', exitOutHandler);
  
  creative.dom.termsBtn.addEventListener('click', exitClickHandler);
  creative.dom.termsBtn.addEventListener('mouseover', termsOverHandler);
  creative.dom.termsBtn.addEventListener('mouseout', termsOutHandler);
}

/**
 *  Shows the ad.
 */
function show() {
  creative.dom.exit00.style.display = 'block';
  creative.dom.loader.style.visibility  = 'hidden';
animate();
	 console.log("SHOW");
}

// ---------------------------------------------------------------------------------
// MAIN
// ---------------------------------------------------------------------------------

var frameNum;

function regFrame(frameLabel) {
	//alert(frameLabel);
	frameNum = frameLabel;
}


function exitClickHandler() { 
	
	Enabler.exit('landingpage_exit00');
		/*switch(frameNum){

		  	case "frame00":
		  		 
	  		break;	
		  		case "frame01":
		  		Enabler.exit('product_exit01');
	  		break;	
				case "frame02":
		  		Enabler.exit('product_exit02');
	  		break;			
				case "frame03":
		  		Enabler.exit('product_exit03');
	  		break;									
		}*/
  
}





function updateMediaType() {

	 if (window.location.hostname == "s0.2mdn.net") {
   		 var imgArray = document.getElementsByTagName("img");
   		 for (var j = 0; j < imgArray.length; j++) {
   		  //console.log(imgArray[j].getAttribute("src"));
	 
	  			var str = imgArray[j].getAttribute("src");
				var res = str.replace("../imgs/", "");
				console.log(res);
       	 		imgArray[j].setAttribute("src", res)
   		 }
	 }
}
  



// /**
//  *  Main onload handler
//  */
window.addEventListener('load', preInit);
// document.addEventListener('DOMContentLoaded', preInit);
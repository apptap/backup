// JavaScript Document


// declare all variables here


 
 //..............................
 

 
function initAnim(){
// define variables here

// insert mobile terms line here!!!
if (!isDesktop) {
	creative.dom.termsBtn.textContent = "See Three.co.uk/terms";
}
}


 // --------------------------------------------------------
 
// Returns a random integer between min (included) and max (included)

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}



 // The following defines the frame by frame animation initated once the ad has loaded

function animate() {
	
	var anim = new TimelineLite({onStart:showAnim});


	// frame 00
	// registers frame for clickTags - if single clickTag only use frame00. If multiple, use frame01, frame02 etc as required, with frame00 for endframe
	anim.call(regFrame, ["frame00"]);
			
	anim.to(["#loader","#blank"], 0.5, {autoAlpha:0, ease: Quad.easeOut});
	
	//anim.staggerFrom(["#handset-06","#handset-05","#handset-04","#handset-03","#handset-02","#handset-01"], 0.5, {x:-200, ease:Power2.easeOut}, 0.15);

	anim.to("#txt-00", 0.5, {alpha:0,  ease: Quad.easeOut},"+=2.5");

	
	anim.from("#txt-02", 0.5, {alpha:0, ease: Quad.easeOut},"+=0")
	.to("#handset", 0.5, {x:-100, ease: Quad.easeOut},"-=0.5")
		.from("#roundel-01", 0.5, {alpha:0, scale:2, ease: Back.easeOut},"+=0.5")
		.from(["#cta-01", "#termsBtn"], 0.5, {autoAlpha:0, ease:Power2.easeOut},"+=0.5");
	
	anim.to("#cta-01", 0.15, {x: "+=10"}, "+=0.5")
			.to("#cta-01", 0.15, {x: "-=10"})
			.to("#cta-01", 0.15, {x: "+=10"})
			.to("#cta-01", 0.15, {x: "-=10"});
	
	
	


	
/*	anim.from("#pig",1, {x:-180, y:+200, ease: Power1.easeOut},"+=0.2")
		.from("#sun-01",0.35, {alpha:0, scale:0, ease: Power1.easeOut},"-=0.2")
		.from("#sun-02",0.35, {alpha:0, scale:0, ease: Power1.easeOut},"+=0.5")*/
	


	



	


			
			

		
}

// do not edit below this line - makes the frames and terms asstes visiable when ready-----------------------------------!!


function showAnim() {
	
	TweenLite.to("#termsTxt", 0, {autoAlpha:0});

	creative.dom.frames.style.visibility  = 'visible';

}

// banner cta rollovers
function exitOverHandler() {
	if (isDesktop) {
		 TweenLite.to([".ctaBlock", ".ctaArrow"], 0.25, {css:{className:"+=ctaOver"}, ease:Power2.easeOut});
	}
}

function exitOutHandler() {
	if (isDesktop) {
		 TweenLite.to([".ctaBlock", ".ctaArrow"], 0.25, {css:{className:"-=ctaOver"}, ease:Power2.easeOut});
	}
}


function termsOverHandler() {
	console.log(isDesktop);
	if ( isDesktop && creative.dom.termsBtn.style.visibility !== 'hidden')  {
		TweenLite.to("#termsTxt", 0.25, {autoAlpha:1});
	}
	

}

function termsOutHandler() {
	if (isDesktop && creative.dom.termsBtn.style.visibility !== 'hidden') {
		TweenLite.to("#termsTxt", 0.25, {autoAlpha:0});
	}


}

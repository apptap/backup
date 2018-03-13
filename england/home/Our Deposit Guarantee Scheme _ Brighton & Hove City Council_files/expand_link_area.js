/**
* attaches a click event handler to any list item with class gridItem and takes target from first child <a>
*/

jQuery(document).ready(function(){


	jQuery(document).delegate("ul.gridItem li", "click", function() {
	    window.location = jQuery(this).find("a").attr("href");
	});
	/* change the mouse pointer on mouseover for clickArea */

	jQuery(document).delegate('ul.gridItem li', 'hover', function(event) {

	    if (event.type === 'mouseenter') {
	        jQuery(this).css('background-color', 'rgb(34,86,156)');
	        jQuery(this).css('cursor', 'pointer');
		    }
	    else if (event.type === 'mouseleave') {
	        jQuery(this).css('cursor', 'auto');
	    	jQuery(this).css('background-color', 'rgb(0,151,255)');
	    }

	});
});
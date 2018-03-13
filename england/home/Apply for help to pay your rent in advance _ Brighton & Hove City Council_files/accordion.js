  if (window.matchMedia){
  enquire.register("screen and (max-width:750px)", {

    // OPTIONAL
    // If supplied, triggered when a media query matches.
    match : function() {
	 
		( function($) {
	$('.collapsible').slideUp('fast');
	 /* Binding a click event handler to the links: */
    $('#block-views-do-it-now-menu-block h2, section[id*="find-it-menu-block"] h2').click(function(e){
		 $('.collapsible').slideToggle('slow');
        /* Preventing the default event (which would be to navigate the browser to the link's address) */
        e.preventDefault();
    })
	  })( jQuery );

	},      
                                
    // OPTIONAL
    // If supplied, triggered when the media query transitions 
    // *from a matched state to an unmatched state*.
    unmatch : function() {
	
		( function($) {
	$('.collapsible').slideDown('fast');
	/* unbind click event handler */
	$('#block-views-do-it-now-menu-block h2, section[id*="find-it-menu-block"] h2').unbind('click');
	  })( jQuery );
	
	},  
    
    // OPTIONAL
    // If supplied, triggered once, when the handler is registered.
    setup : function() {
		
	( function($) {
$(document).ready(function(){
    $.easing.def = "easeInOutQuint";
	$('.collapsible').slideUp(10);
/*	$('.collapsible').slideToggle('fast'); */
    /* Binding a click event handler to the links: */
    $('#block-views-do-it-now-menu-block h2, section[id*="find-it-menu-block"] h2').click(function(e){ 
		$('.collapsible').slideToggle(400);
        /* Preventing the default event (which would be to navigate the browser to the link's address) */
        e.preventDefault();
    })

});
  })( jQuery );
  		
	
	},    
                                
    // OPTIONAL, defaults to false
    // If set to true, defers execution of the setup function 
    // until the first time the media query is matched
    deferSetup : true,
                                
    // OPTIONAL
    // If supplied, triggered when handler is unregistered. 
    // Place cleanup code here
    destroy : function() {}
      
});
}
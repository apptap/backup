// using jQuery to update target attribute of links that point to maps, to save having to update all these links in the database
jQuery(document).ready(function($){
		var patt = new RegExp("mapindex.cfm");
		// locate all a elements
		$("a").each(function( index ) {
			var href = $( this ).attr("href");
			w = window.screen.availWidth * 0.5;
			h = window.screen.availHeight * 0.75;
			// if href points to mapindex change it
			if (patt.test(href)==true){
				var original_href = $(this).attr("href");
				attr = 'width='+w+',height='+h+',scrollbars=yes, resizable=yes, top=20, left=20';
				$(this).attr("href", "#");
				var new_href = original_href.replace("mapindex.cfm", "locationmap/popup");
				// ESRI maps not yet available on https so need to force http.
				new_href = new_href.replace("https:", "http:");
				$(this).click(function(){ window.open(new_href,"",attr);});
			} 
		});
	})	
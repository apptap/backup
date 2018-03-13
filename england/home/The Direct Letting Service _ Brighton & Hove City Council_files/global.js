// Will add JS here for devices with a width under 768 - mobiles.


(function($){ 

  $(function() {

    // Correctly scale the carousel
    $(window).load(function() {
      scaleCarousel();
    });

    $(window).resize(function() {
      scaleCarousel();
    });

    function scaleCarousel() {
      $('.views_slideshow_singleframe_teaser_section, .views-slideshow-cycle-main-frame, .views-slideshow-cycle-main-frame-row').each(function(){
        var ratio = 296 / 743;
      $(this).height($(this).width() * ratio);
      });
    }

    /* Touch controls for slideshow */
    Drupal.settings.isTouchDevice = function() {
      return "ontouchstart" in window;
    }

    if ( Drupal.settings.isTouchDevice() ) {
      Drupal.behaviors.jQueryMobileSlideShowTouchAdvance = {
        attach: function(context, settings) {
          self = Drupal.behaviors.jQueryMobileSlideShowTouchAdvance;
          jQuery.each(jQuery(".views_slideshow_cycle_main.viewsSlideshowCycle-processed"), function(idx, value) {
            value.addEventListener("touchstart", self.handleTouchStart);
            jQuery(value).addClass("views-slideshow-mobile-processed");
          })
          jQuery(self).bind("swipe", self.handleSwipe);
        },
        detach: function() { }, original: { x: 0, y: 0},
        changed: { x: 0, y: 0}, direction: { x: "", y: "" }, fired: false,
        handleTouchStart: function(evt) {
          self = Drupal.behaviors.jQueryMobileSlideShowTouchAdvance;
          if (evt.touches) {
            if (evt.targetTouches.length != 1) { return false; } // don't respond to gestures
            if (evt.touches.length) { evt.preventDefault(); evt.stopPropagation() }
            self.original = { x: evt.touches[0].clientX, y: evt.touches[0].clientY }
            self.target = jQuery(this).attr("id").replace("views_slideshow_cycle_main_", "");
            Drupal.viewsSlideshow.action({ "action": "pause", "slideshowID": self.target });
            evt.target.addEventListener("touchmove", self.handleTouchMove);
            evt.target.addEventListener("touchend", self.handleTouchEnd);
          }
        },
        handleTouchMove: function(evt) {
          self = Drupal.behaviors.jQueryMobileSlideShowTouchAdvance;
          self.changed = {
            x: (evt.touches.length) ? evt.touches[0].clientX: evt.changedTouches[0].clientX,
            y: (evt.touches.length) ? evt.touches[0].clientY: evt.changedTouches[0].clientY
          };
          h = parseInt(self.original.x - self.changed.x), v = parseInt(self.original.y - self.changed.y);
          if (h !== 0) { self.direction.x = (h < 0) ? "right":"left"; }
          if (v !== 0) { self.direction.y = (v < 0) ? "up": "down"; }
          if ((h+v) != 0) {
            jQuery(self).trigger("swipe");
          }
        },
        handleTouchEnd: function(evt) {
          self = Drupal.behaviors.jQueryMobileSlideShowTouchAdvance;
          evt.target.removeEventListener("touchmove", self.handleTouchMove);
          evt.target.removeEventListener("touchend", self.handleTouchEnd);
          self.fired = false;
        },
        handleSwipe: function(evt) {
          self = Drupal.behaviors.jQueryMobileSlideShowTouchAdvance;
          if (evt != undefined && self.fired == false) {
            Drupal.viewsSlideshow.action({ "action":  (self.direction.x == "left")?"nextSlide":"previousSlide", "slideshowID": self.target });
            self.fired = true; //only fire advance once per touch
          }
        }
      }
    }

    // Only update our footer contact button when we have a contact this service button
    if( $('.view-contact-this-service-article').length > 0 ) {
      // Setup some global variables
      var $footer = [];
      var $doItNow = [];
      // Update footer based on our device
      enquire.register('screen and (max-width:768px)', {
        setup : function() {
          // Get the default do it now
          $doItNow['text'] = $('.view-contact-this-service-article a:first').text();
          $doItNow['href'] = $('.view-contact-this-service-article a:first').attr('href');
          // Get the default footer text & href values
          $footer['text'] = $('#boxes-box-bhcc_contact_us_footer a:first');
          $footer['text_original'] = $('#boxes-box-bhcc_contact_us_footer a:first').text();
          $footer['href'] = $('#boxes-box-bhcc_contact_us_footer a:first');
          $footer['href_original'] = $('#boxes-box-bhcc_contact_us_footer a:first').attr('href');
        },
        match : function() {
          // Set the footer contact link to the corect vales
          $footer['text'].text($doItNow['text']);
          $footer['href'].attr('href', $doItNow['href']);
        },
        unmatch : function() {
          // Set the footer back to its original values
          $footer['text'].text($footer['text_original']);
          $footer['href'].attr('href', $footer['href_original']);
        }
      });

    }

  });

})(jQuery);
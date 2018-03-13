$(document).ready(function () {

  if ($("body").hasClass("mobile")) {

    if ($(".contact-header").length) {
      $(".contact-header").html($(".contact-header").html().replace(/&nbsp;/g, ''));
    }

    var hidecontact = true;
    var showcontact = false;
    var showhidecontact = true;
    var movecontactdetails = false;
    var collapsesubnav = false;

    if (hidecontact) {
      $(".fs.pims .profile-info .panel-profile-summary p").hide();
    }

    if (showcontact) {
      $(".fs.pims .profile-info .panel-profile-summary p").show();
    }

    if (showhidecontact) {

      $(".panel-profile-summary p").before('<span class="show-contact"><a href="">Show contact details</a> <span class="showdown">&#9660;</span></span>');
      $(".panel-profile-summary p").attr({ "id": "contact-details", "aria-expanded": "false", "aria-hidden": "true" }).hide();
      $(".show-contact a").attr({ "aria-controls": "contact-details", "role": "button" });

      $(".show-contact a").on("click", function (e) {
        e.preventDefault();
        $(".panel-profile-summary p").slideToggle(200, function () {
          if ($("span.show-contact + p").css("display") == "none") {
            $(this).attr({ "aria-hidden": "true", "aria-expanded": "false" });
            $(".show-contact a").text('Show contact details');
            $(".showdown").html('&#9660;');
          } else {
            $(this).attr({ "aria-hidden": "false", "aria-expanded": "true" });
            $(".show-contact a").text('Hide contact details');
            $(".showdown").html('&#9650;');
          }
        });
      });

      $(".show-contact a").keydown(function (e) {
        if (e.which === 13 || e.which === 32) { // pressing enter or space bar
          e.preventDefault();
          $(this).click();
        }
      });

    }

    if (movecontactdetails) {

      if ($(".contact-details").length) {
        var h3 = $(".contact-details").prev("h3");
        $(".col.three-sm").prepend($("h2#section-top"));
        $(".contact-details").parents("div.panel").addClass("moving");
        $("div.moving .contact-header").wrap('<div class="panel contact-details panel-contact-box"></div>');
        $(".col.three-sm").prepend($("div.moving .panel-contact-box")).prepend($(h3));
      }

    }

    if (collapsesubnav) {

      if ($(".tabs-nav").length) {
        var subnav = $(".tabs-nav");
        $(subnav).addClass("collapsable");
        $(subnav).before('<a href="#mobile-subnav" class="mobile-subnav">In this section: <span>&#9660;</span></a>');
        $(subnav).hide();
      }

      $('.mobile-subnav').click(function (e) {
        e.preventDefault();
        $(subnav).slideToggle();
      });

    }


    if ($(".pims-opening-times").length) {

      if ($(".pims-opening-times .last-verified").length) {
        $(".pims-opening-times").after($(".pims-opening-times .last-verified"));
      }

      if ($(".tab-content").closest("span").length > 0) {
        $(".tab-content").unwrap();
      }

      if ($(".out-of-hours").length) {
        $(".out-of-hours p").wrapAll('<div class="out-of-hours-wrap"></div>');
      }

      $(".tab-item .tab-content").unwrap();
      $(".pims-opening-times").accordion({ heightStyle: "content", collapsible: "true" });
    }


    /* hide empty panels as it messes up the spacing */
    $(".panel .panel-content .pad.clear").each(function () {
      var content = $(this).html().replace(/\s/g, ""); // strip spaces to check content
      if ($(content).length == 0) {
        $(this).parents(".panel").addClass("hidden");
      }
    });

    /* hide empty panels as it messes up the spacing */
    $(".box-list").each(function () {
      var content = $(this).html().replace(/\s/g, ""); // strip spaces to check content
      if ($(content).length == 0) {
        $(this).addClass("hidden");
      }
    });

    /* show hide photo gallery */
    if ($(".img-gallery").length) {
      $(".img-gallery").hide();
      $(".img-gallery").prev("h3").addClass("gallery-header");
      $(".gallery-header").wrapInner('<span class="ghead"></span>');
      $(".gallery-header").append('<span class="arrow">&#9660;</span>');

      $(".gallery-header").on("click", function () {
        $(this).next("div.img-gallery").slideToggle(200, function () {
          if ($("div.img-gallery").css("display") == "none") {
            $(".gallery-header span.arrow").html("&#9660;");
          } else {
            $(".gallery-header span.arrow").html("&#9650;");
          }
        });
      });

      $(".gallery-header").next(".img-gallery").andSelf().wrapAll('<div class="gallery-container" />');
    }

    /* show hide latest news */
    if ($(".news-panel").length) {
      $(".news-panel .panel:not(.news-panel .panel .panel)").wrapAll('<div class="news-panels" />');
      $(".news-panels").attr({ "id": "news-panels", "aria-expanded": "false", "aria-hidden": "true" }).hide();
      $("#news-title").wrapInner('<span class="nhead" role="button" aria-controls="news-panels" tabIndex="0"></span>');
      $("#news-title").append('<span class="arrow">&#9660;</span>');

      $("#news-title").on("click", function () {
        $(this).next("div.news-panels").slideToggle(200, function () {
          if ($("div.news-panels").css("display") == "none") {
            $("div.news-panels").attr({ "aria-expanded": "false", "aria-hidden": "true" });
            $("#news-title span.arrow").html("&#9660;");
          } else {
            $("div.news-panels").attr({ "aria-expanded": "true", "aria-hidden": "false" });
            $("#news-title span.arrow").html("&#9650;");
          }
        });

      });
    }

    $(".nhead").keydown(function (e) {
      if (e.which === 13 || e.which === 32) { // pressing enter or space bar
        e.preventDefault();
        $(this).click();
      }
    });

    /* ward tables */
    if ($(".ward-nurse-staffing-levels").length) {

      if ($(window).width() <= 480) {

        $(".ward-nurse-staffing-levels tbody tr").each(function () {
          count = 1;
          $("td", this).each(function () {
            label = '<span class="label">' + $(".ward-nurse-staffing-levels thead th:eq(" + count + ")").text() + '</span>';
            count = count + 1;
            $(this).prepend($(label));
          });

          $("th", this).each(function () {
            headlabel = '<span class="label">' + $(".ward-nurse-staffing-levels thead th:eq(0)").text() + ' - </span>';
            $(this).prepend($(headlabel));
          });

        });

      }
    }

  }

});
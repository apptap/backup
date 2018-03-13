var Crisis = window.Crisis || {};
var stopPop = false;

Crisis.util = {
    debounce: function (func, wait, immediate) {
        var timeout;
        return function() {
            var context = this, args = arguments;
            var later = function() {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            var callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    },
    _doc: null,
    checkDocSet: function () {
        if (Crisis.util._doc == null) {
            Crisis.util._doc = window.document.documentElement;
        }
        return Crisis.util._doc;
    },
    getViewportH: function () {
        var self = this,
            client = self.checkDocSet()['clientHeight'],
            inner = window['innerHeight'];

        if (client < inner)
            return inner;
        else
            return client;
    },
    scrollY: function () {
        var self = this;
        return window.pageYOffset || self.checkDocSet().scrollTop;
    },
    getOffset: function (el) {
        var self = this, offsetTop = 0, offsetLeft = 0;
        do {
            if (!isNaN(el.offsetTop)) {
                offsetTop += el.offsetTop;
            }
            if (!isNaN(el.offsetLeft)) {
                offsetLeft += el.offsetLeft;
            }
        } while (el = el.offsetParent)

        return {
            top: offsetTop,
            left: offsetLeft
        }

    },
    inViewport: function (el, h) {
        var self = this,
            elH = el.offsetHeight,
        scrolled = self.scrollY(),
        viewed = scrolled + self.getViewportH(),
        elTop = self.getOffset(el).top,
        elBottom = elTop + elH,
        // if 0, the element is considered in the viewport as soon as it enters.
        // if 1, the element is considered in the viewport only when it's fully inside
        // value in percentage (1 >= h >= 0)
        h = h || 0;

        return (elTop + elH * h) <= viewed && (elBottom - elH * h) >= scrolled;
    },
    getCurrentFilterObject: function () {
        var allFilters = $('input[type="checkbox"][data-name="flt-tag"]:checked');
        var dtFrom = $('#fltDateFrom').val();
        var dtTo = $('#fltDateTo').val();

        var selectedFilters = [];

        allFilters.map(function (idx, flt) {
            var $el = $(flt),
                pvGrp = $el.attr('data-pvgroup');

            if (!selectedFilters[pvGrp]) {
                selectedFilters[pvGrp] = [];
            }
            selectedFilters[pvGrp].push('\'' + $el.attr('data-pv') + '\'');
        });

        var postData = {
            fromDate: dtFrom,
            toDate: dtTo
        };

        for (var grp in selectedFilters) {
            postData[grp] = selectedFilters[grp];
        }

        return postData;
    },
    initialiseMap: function (ele) {
        var lat = $(ele).attr('data-lat'),
            lng = $(ele).attr('data-lng'),
            pos = { lat: parseFloat(lat), lng: parseFloat(lng) },
            map = new google.maps.Map(ele, {
                center: pos,
                scrollwheel: false,
                zoom: 17
            });

        var marker = new google.maps.Marker({
            map: map,
            position: pos,
            icon: '/content/images/map-marker.png'
        });
    },
    gmapsReady: function () {
        if ($('.gmap').length) {
            $('.gmap').each(function () {
                var id = $(this).attr('id');
                Crisis.util.initialiseMap(document.getElementById(id));
            });
        }
    },
    setupContactForm: function () {
        $('#cntSubject').on('change', function () {
            var grp = $(this).find('option:selected').attr('data-related-group');
            $('div.form-group[data-related-group]').hide().find('select').prop('disabled', true);
            if (grp !== '') {
                $('div.form-group[data-related-group="' + grp + '"]').show().find('select').prop('disabled', false);
            }
        });
        $('#cntSubject').trigger('change');
    },
    skmapReady: function () {
        if ($('#skmap').length) {
            if (skmap_locations) {
                Crisis.util.initialiseSkylightMap(document.getElementById('skmap'));
            }
        }
    },
    initialiseSkylightMap: function (ele) {
        var map = new google.maps.Map(ele, {
            zoom: 15,
            center: { lat: skmap_locations[0].lat, lng: skmap_locations[0].lng }
        }),
        bounds = new google.maps.LatLngBounds();

        for (var idx = 0; idx < skmap_locations.length; idx++) {
            (function (loc) {
                var mrk = new google.maps.Marker({
                    map: map,
                    position: { lat: skmap_locations[idx].lat, lng: skmap_locations[idx].lng },
                    icon: '/content/images/map-marker.png'
                });
                bounds.extend(mrk.getPosition());
            })(skmap_locations[idx]);
        }

        google.maps.event.addListenerOnce(map, 'bounds_changed', function (event) {
            this.setZoom(map.getZoom() - 1);

            if (this.getZoom() > 15) {
                this.setZoom(15);
            }
        });

        map.fitBounds(bounds);
    },
    onAccountVerificationResponse: function (response) {
        var sc1 = $('#sc1'),
            sc2 = $('#sc2'),
            sc3 = $('#sc3'),
            accNumber = $('#accountNumber'),
            bankName = $('#bankName'),
            branchName = $('#branchName');

        console.log(response);

        if (response.length == 1 && typeof (response[0].Error) != 'undefined') {
            // Show the error message
            Crisis.util.fnShowAccWarning();
        }
        else {
            // Check if there were any items found
            if (response.length == 0) {
                Crisis.util.fnShowAccWarning();
            } else {
                if (response[0].IsCorrect.toLowerCase() != "false") {
                    bankName.val(response[0].Bank);
                    branchName.val(response[0].Branch)
                    $('.donation-form button').removeAttr("disabled").removeClass("ui-state-disabled");
                } else {
                    Crisis.util.fnShowAccWarning();
                    accNumber.attr("pattern", "(?=a)b");
                    $('.donation-form button').attr("disabled", "disabled").addClass("ui-state-disabled");
                }
            }
        }
    },
    fnShowAccWarning: function () {
        if (!stopPop) {
            alert('error validating bank account');
        }
        stopPop = true;
        setTimeout(function () {
            stopPop = false;
        }, 2000)
    },
    getAbsoluteUrl : (function() {
        var a;

        return function(url) {
            if(!a) a = document.createElement('a');
            a.href = url;

            return a.href;
        };
    })()
}

$(document).ready(function () {
    var shiftWindow = function () { scrollBy(0, -120); };
    if (location.hash) shiftWindow();
    window.addEventListener("hashchange", shiftWindow);

    $('#btnApplyFilters').on('click', function (evt) {
        evt.preventDefault();
        $('#scrollLoadChecker').attr('data-pageidx', 0);
        loadMoreArticles(0, true);
    });

    if (localStorage.cookies === undefined) {
        try {
            $('#cookie-bar').slideDown();
        }
        catch (err) { }
    }

    $('#cookie-bar a.btn').on('click touch', function () {
        localStorage.cookies = "on";
        $('#cookie-bar').slideUp();
        return false;
    });

    if($('#cntSubject').length) {
        Crisis.util.setupContactForm();
    }

    $('.btn-share-fb').on('click', function (evt) {
        evt.preventDefault();

        FB.ui({
            method: 'share',
            display: 'popup',
            href: window.location.href,
        }, function (response) { });
    });

    $('.btn-share-gp').on('click', function (evt) {
        evt.preventDefault();
        window.open(this.href, '', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600');
    });

    if ($('#lstSkylightPicker').length) {
        $('#lstSkylightPicker').on('change', function (evt) {
        //$('#btnSkylightSelected').on('click', function (evt) {
            evt.preventDefault();
            var v = $('#lstSkylightPicker option:selected').attr('data-url');
            if (v) {
                window.location.href = v;
            }
        });
    }

    var fnApplyTimetableFilters = function () {
        var selectedFilters = $('.classtypefilter:checked').map(function (idx, e) {
            return $(e).attr('data-classtypeid');
        }).get();

        var selectedAtFilters = $('.classattrfilter:checked').map(function (idx, e) {
            return $(e).attr('data-classatt');
        }).get();


        $('.tt-activity').hide();

        var baseFilter = '.tt-activity[data-classtypeid="' + selectedFilters.join('"],[data-classtypeid="') + '"]';
        var $set = $(baseFilter);

        if ($('#ttFltVenue').length || $('#ttFltArea').val() != '') {
            var selectedAreaFilter = $('#ttFltArea').val();
            var selectedVenueFilter = $('#ttFltVenueContainer').is(':visible') ? $('#ttFltVenue').val() : '';

            if (selectedVenueFilter != '') {
                var newFilter = '[data-venueid="' + selectedVenueFilter + '"]';
                $set = $set.filter(newFilter);
            } else if (selectedAreaFilter != '' && typeof selectedAreaFilter !== 'undefined') {
                var combinedVenuFilters = $.map($('#ttFltVenue').find('option'), function (ele, idx) {
                    if ($(ele).attr('data-areaid') == selectedAreaFilter) {
                        return $(ele).val();
                    }
                });
                var newFilter = '[data-venueid="' + combinedVenuFilters.join('"],[data-venueid="') + '"]';
                $set = $set.filter(newFilter);
            }
        }

        if (selectedAtFilters.length) {
            var f = '[data-att-' + selectedAtFilters.join('],[data-att-') + ']';
            $set = $set.filter(f);
        }

        $set.show();

        //update download link
        var dlLink = $('a[data-rooturl]').eq(0);
        var fullUrl = dlLink.attr('data-rooturl');

        if(selectedFilters.length) {
            fullUrl = fullUrl + '&classTypeFilter=' + selectedFilters.join(',');
        }

        if (selectedAtFilters.length) {
            fullUrl = fullUrl + '&classAttributeFilter=' + selectedAtFilters.join(',');
        }

        dlLink.attr('href', fullUrl);
    };

    if ($('.classtypefilter').length) {
        $('.classtypefilter').on('change', function (evt) {
            var srcElement = $(evt.target);
            var altElement = $('.classtypefilter[data-classtypeid="' + srcElement.attr('data-classtypeid') + '"]').not(srcElement);

            console.log(altElement);

            if (srcElement.is(':checked')) {
                altElement.prop('checked', true);
            } else {
                altElement.prop('checked', false);
            }

            fnApplyTimetableFilters();
        });

        $('#ttCtrlChangeWeek').on('change', function (evt) {
            window.location.href = $('#ttCtrlChangeWeek').attr('data-baseurl') + '?tdd=' + $('#ttCtrlChangeWeek').val();
        });
    }

    if ($('.classattrfilter').length) {
        $('.classattrfilter').on('change', function (evt) {

            var srcElement = $(evt.target);
            var altElement = $('.classattrfilter[data-classatt="' + srcElement.attr('data-classatt') + '"]').not(srcElement);

            console.log(altElement);

            if (srcElement.is(':checked')) {
                altElement.prop('checked', true);
            } else {
                altElement.prop('checked', false);
            }

            fnApplyTimetableFilters();
        });
    }

    if ($('.tt-activity').length) {
        $('.tt-activity').on('click', function (evt) {
            var id = $(this).attr('data-classid'),
                displayDate = $(this).attr('data-classdate');

            if (displayDate) {
                $('#activityModal-' + id).find('.phClassDate').text(displayDate);
            }

            $('#activityModal-'+id).modal('show');
        });
    }

    if ($('#ttFltArea').length) {
        $('#ttFltArea').on('change', function (evt) {
            var v = $('#ttFltArea').val();
            if (v == '') {
                //deselect all options and hide dropdown
                $('#ttFltVenueContainer').hide();

            } else {
                //filter options & display dropdown
                $('#ttFltVenueContainer').show();
                $('#ttFltVenue option:hidden').show();
                $('#ttFltVenue option').not('[data-areaid="' + v + '"]').hide();
                $('#ttFltVenue option[value=""]').show();
            }
            fnApplyTimetableFilters();
        });
    }

    if ($('#ttFltVenue').length) {
        $('#ttFltVenue').on('change', function (evt) {
            fnApplyTimetableFilters();
        });
    }

    if ($('#tt-filters-mobile').length) {
        $('#tt-filters-mobile').on('show.bs.collapse', function (evt) {
            $('#btnMobileFilterToggle span').removeClass('fa-chevron-down').addClass('fa-chevron-up');
        }).on('hide.bs.collapse', function (evt) {
            $('#btnMobileFilterToggle span').removeClass('fa-chevron-up').addClass('fa-chevron-down');
        });
    }

    var fnCheckTimetableDayHeights = Crisis.util.debounce(function () {
        var rows = $('.timetable-wrapper');
        rows.each(function (idx, ele) {
            var days = $(ele).find('.day'),
                heights = days.map(function (idx, day) {
                    return $(day).height();
                }).get();

            var allSame = !!heights.reduce(function (a, b) { return (a === b) ? a : NaN; });
            if (!allSame) {
                var tallest = Math.max.apply(Math, heights);
                $(days).css('min-height', (tallest + 10) + 'px');
            }
        });
    }, 100);

    if ($('.timetable').length) {
        //check and adjust day heights
        fnCheckTimetableDayHeights();

        $(window).on('resize', function () {
            fnCheckTimetableDayHeights();
        });
    }

    $('li.dropdown :first-child').on('click', function () {
        var $el = $(this).parent();
        if ($el.hasClass('open')) {
            var $a = $el.children('a.dropdown-toggle');
            if ($a.length && $a.attr('href')) {
                location.href = $a.attr('href');
            }
        }
    });
    //Video Overlay switch
    $(".overlay-play").on("click", function () {
        $(this).hide();
        var iframe = $(this).parent().find(".jVideoHandler iframe");
        $(this).parent().find(".jVideoHandler").show();
        iframe.attr('src', iframe.attr('src') + "&autoplay=1");
    });


    if ($('#prsSearchForm').length) {
        var selects = $('#prsSearchForm select');
        $(selects).select2({
            placeholder: 'please select'
        });

        $(selects).on('change', function () {
            var $that = $(this),
                $others = selects.not($that);

            if ($that.val() == '' || !$that.val()) {
                $others.prop('disabled', false);
            } else {
                $others.prop('disabled', true);
            }
        });

        for (var i = 0; i < selects.length; i++) {
            if (selects.eq(i).val() != '') {
                selects.eq(i).trigger('change');
            }
        }

        $('#prsSearchForm button[type="reset"]').on('click', function (evt) {
            var selects = $('#prsSearchForm select');
            //this shouldn't work in theory - but it does....
            $(selects).select2('val', '*');
        });
    }

    if ($('#wpCardDetails').length) {
        var fnInitWorldpay = function () {
            if (Worldpay) {
                //much pain!!! having to override the WP modal position due to miscalculations
                //var fnOrig = Worldpay.template.formLoaded;
                //Worldpay.template.formLoaded = function () {
                //    var closeTop = (parseInt($('#wpCardDetails').position().top) - 166) + 'px';
                //    $('#_iframe_close').css('top', closeTop);
                //    fnOrig();
                //}

                //var btnTop = (parseInt($('#wpCardDetails').position().top) - 166) + 'px';
                //$('#_iframe_close').css('top', btnTop);
                Worldpay.useTemplateForm({
                    'clientKey': 'T_C_75d759c7-b167-4d7c-9112-1dbbee0d8fb0',
                    'saveButton': false,
                    'form': 'donationForm',
                    'paymentSection': 'wpCardDetails',
                    'display': 'inline',
                    'reusable': true,
                    'type': 'card',
                    //'templateOptions': {
                    //    iframeHolderModal: "position: absolute;top: " + btnTop + ";left: -350px;background-color: #fff;width: 220px;height: 220px;margin-left: 50%;border:none;",
                    //    iframeClose: 'position: relative;top: 10px;height: 20px;width: 20px;right: -350px;text-decoration: none;margin-right: 50%;cursor: pointer;z-index: 999;color: #000;font-size: 16px;font-weight: bold;text-align: center;',
                    //},
                    'callback': function (obj) {
                        if (obj && obj.token) {
                            $('input[name="token"]').val(obj.token);
                            $('#displayToken').text(obj.paymentMethod.maskedCardNumber);
                        }

                        $('#frmDonation').submit();

                        //Worldpay.closeTemplateModal();
                    }
                });
            }
        }

        fnInitWorldpay();
    }

    var fnDiffDays = function (a, b) {
        var _MS_PER_DAY = 1000 * 60 * 60 * 24;

        var utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
        var utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

        return Math.floor((utc2 - utc1) / _MS_PER_DAY);
    }

    var fnDiffWorkDays = function(start, end) {
        var first = start.clone().endOf('week'); // end of first week
        var last = end.clone().startOf('week'); // start of last week
        var days = last.diff(first, 'days') * 5 / 7; // this will always multiply of 7
        var wfirst = first.day() - start.day(); // check first week
        if (start.day() == 0)--wfirst; // -1 if start with sunday
        var wlast = end.day() - last.day(); // check last week
        if (end.day() == 6)--wlast; // -1 if end with saturday
        return Math.floor(wfirst + days + wlast); // get the total
    }

    if ($('a[data-presetDonation="1"]').length) {
        $('a[data-presetDonation="1"]').on('click', function (evt) {
            evt.preventDefault();
            var src = $(this);
            $(src.attr('data-target')).val(src.attr('data-value'));
        });
    }

    if ($('a[data-presetRaffle="1"]').length) {
        $('a[data-presetRaffle="1"]').on('click', function (evt) {
            evt.preventDefault();
            var src = $(this);
            $(src.attr('data-target')).val(src.attr('data-value'));
        });
    }

    if ($('#firstPaymentDay').length) {
        $('#firstPaymentDay,#firstPaymentMonth,#firstPaymentYear').on('change', function (evt) {
            var today = new Date(),
                selectedDate = new Date($('#firstPaymentYear').val(), $('#firstPaymentMonth').val() - 1, $('#firstPaymentDay').val());

            var diffDays = fnDiffWorkDays(moment(today), moment(selectedDate));

            if (diffDays < 10) {
                alert('start date must be at least 10 days in the future');
                $('#txtDdDateError').show();
            } else {
                $('#txtDdDateError').hide();
            }
        });
    }

    //modal close stop video
    $('.modal-video').on('hidden.bs.modal', function (e) {
        if ($(this).find('.ytmodalplayer').length) {
            var playerElement = $(this).find('.ytmodalplayer').eq(0);
            playerElement.attr('data-src', playerElement.attr('src'));
            playerElement.attr('src', ' ');
        } else {
             $(this).find("video").get(0).pause();
        }
    });

    $('.modal').on('shown.bs.modal', function (e) {
        if ($(this).find('.history-img').length) {
            var modalH = $(this).find('.modal-content').outerHeight();
            $(this).find('.history-img').height(modalH);
        }

        if ($(this).find('.ytmodalplayer').length) {
            var playerElement = $(this).find('.ytmodalplayer').eq(0);
            if (playerElement.attr('data-src')) {
                playerElement.attr('src', playerElement.attr('data-src'));
            }
            
            playerElement.attr('data-src', ' ');
        }
    })

    //history page image fix for IE


    if ($('#sc1').length && $('#accountNumber').length) {
        var sc1 = $('#sc1'),
            sc2 = $('#sc2'),
            sc3 = $('#sc3'),
            accNumber = $('#accountNumber'),
            bankName = $('#bankName'),
            branchName = $('#branchName'),
            pcaKey = 'pr99-xw29-pu92-fx57',
            pcaUrl = 'https://services.postcodeanywhere.co.uk/BankAccountValidation/Interactive/Validate/v2.00/json.ws?',
            scriptTag = document.getElementById("pcascript"),
			headTag = document.getElementsByTagName("head").item(0);


        $('#sc1,#sc2,#sc3,#accountNumber').on('blur', function (evt) {
            if (sc1.val() && sc2.val() && sc3.val() && accNumber.val()) {
                var url = pcaUrl + 'Key=' + pcaKey,
                    sortCode = sc1.val() + '-' + sc2.val() + '-' + sc3.val();

                url += '&SortCode=' + encodeURIComponent(sortCode);
                url += '&AccountNumber=' + encodeURIComponent(accNumber.val());
                url += '&CallbackFunction=Crisis.util.onAccountVerificationResponse';

                if (scriptTag)
                    try { headTag.removeChild(scriptTag); } catch (e) { }

                scriptTag = document.createElement("script");
                scriptTag.src = url;
                scriptTag.type = "text/javascript";
                scriptTag.id = "pcascript";
                headTag.appendChild(scriptTag);
            }
        });
    }


    //specific to the payment forms (for now)
    if($('.donation-form .jDonate').length) {
        $('.jDonate a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
            if ($(e.target).attr('data-presetdonation') == '2') {
                $('#grpDonationAmount').show();
            } else {
                $('#grpDonationAmount').hide();
            }
        });
    }

    //  raffle donation form
    if ($('.donation-form .jRaffle').length) {
        $('.jRaffle a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
            if ($(e.target).attr('data-presetraffle') == '2') {
                $('#grpRaffleAmount').show();
            } else {
                $('#grpRaffleAmount').hide();
            }
        });

        $('#chkRaffleEligible').change(function () {
            $("#grpRaffleEligible").toggle(this.checked);
        })
    }

    if ($('form[name="evtRegistrationForm"]').length) {
        //we are on the event registration form
        setTimeout(function () {
            pca.capturePlus.listen('populate', function (address) {
                console.log('populate fired!');
                console.log(address);

                $('form[name="evtRegistrationForm"] .pcafield').each(function (idx, ele) {
                    angular.element($(ele).get(0)).triggerHandler('change');
                });
            });
        }, 800);
    }

    //donation amount tab
    $(".jDonate li a").on("touch click", function () {
        var parentPane = $(this).parents('.tab-pane');
        var url = parentPane.find(".jDonate").attr("data-url") + $(this).attr("data-query");
        var amount = $(this).html();
        parentPane.find(".jAmount a").attr('href', url);
        parentPane.find(".jAmount span").html(amount);
    });
    $(".input select").on("change", function () {
        var parentPane = $(this).parents('.tab-pane');

        var url = $(this).val() + $(this).closest(".donation-content").find(".jDonate .active a").attr("data-query");
        var amount = $(".input input[type='text']").val();
        parentPane.find(".input").attr("data-url", $(this).val());
        parentPane.find(".jDonate").attr("data-url", $(this).val());
        parentPane.find(".jAmount a").attr("href", url);
        if (amount != null && amount != "") {
            parentPane.find(".jDonateLinkReplace").attr("href", $(this).val() + "?amount=" + amount);
        }
        else {
            parentPane.find(".jDonateLinkReplace").attr("href", $(this).val());
        }
    });
    $(".input input[type='text']").on("change paste keyup", function () {
        var amount = $(this).val();
        var url = $(this).parent(".input").attr("data-url") + "?amount=" + amount;
        $(".jDonateLinkReplace").attr("href", url);
    });

    $('a.scroll').on('click', function (evt) {
        evt.preventDefault();
        scrollToAnchor($(this).attr('data-target'));
    });

    //Image replace Tab control
    $(".jTImageReplace").on("click touch", function () {
        var imgUrl = $(this).attr("data-img");
        $(this).closest(".tab-pane").find(".jImageReplace").attr("src", imgUrl);
    });


    function scrollToAnchor(aid) {
        var aTag = $("a[name='" + aid + "']");
        $('html,body').animate({ scrollTop: (aTag.offset().top - 100) }, 'slow');
    }

    //  volunteer application form
    if ($('#applicationApplyNow').length && $('#applicationForm').length) {
        $('#applicationApplyNow').click(function () {
            $("#applicationApplyNow").hide();
            $("#applicationForm").show();
        })
    }
});

$(document).ready(function () {
    if ($('.tweet-counter').length) {
        $('.tweet-counter').each(function () {
            var $that = $(this),
                url = $that.parents('.boot-item').find('.see-more');

            if (!$that.parents('.item').length) {
                url = $that.parents('.boot-item').find('.see-more');
            }

            if ($that.parents('.article-date').length) {
                //article heading (on page)
                url = $('<a>');
                url.attr('href', document.location.href);
            }

            if (url.length) {
                var absUrl = Crisis.util.getAbsoluteUrl(url.attr('href'));

                $.get('https://graph.facebook.com/?fields=og_object{likes.limit(0).summary(true)},share&ids=' + encodeURIComponent(absUrl), function (result) {
                    if (result[absUrl].share && typeof (result[absUrl].share) !== undefined) {
                        $that.html(result[absUrl].share.share_count);
                    } else {
                        $that.html('0');
                    }
                });
            }
        });
    }
    $('.dropdown-toggle .fa-open-close').on('click touch', function () {
        event.stopImmediatePropagation();
        event.preventDefault();
        $(this).parent().dropdown("toggle");
    });
});

//== Off canvas menu button
//
//* Toggle active class on menu button
$('#off-canvas-open, #off-canvas-close, #off-canvas-close-after').on('click touchstart', function (e) {
    if (e.type == 'touchstart') {
        e.stopImmediatePropagation();
        e.preventDefault();
    }

    $('body').toggleClass('off-canvas-active');
});


//shrink/expand nav bar
$(window).scroll(function () {
    if ($(document).scrollTop() > 100) {
        $('nav').addClass('shrink');
    } else {
        $('nav').removeClass('shrink');
    }

    if ($(document).scrollTop() > 200) {
        $('a.scroll').show('fade');
    } else {
        $('a.scroll').hide('fade');
    }
});

//https://services.postcodeanywhere.co.uk/BankAccountValidation/Interactive/Validate/v2.00/json.ws?Key=AA11-AA11-AA11-AA11&AccountNumber=12345678&SortCode=00-00-99

//http://services.postcodeanywhere.co.uk/Capture/Interactive/Find/v1.00/json3ex.ws?Key=AA11-AA11-AA11-AA11&Text=wr2 6nj&Method=Predict&Container=&Origin=&Filter=&Limit=&Language=&Countries=
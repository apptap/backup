! function e(t, n, r) {
    function s(o, u) {
        if (!n[o]) {
            if (!t[o]) {
                var a = "function" == typeof require && require;
                if (!u && a) return a(o, !0);
                if (i) return i(o, !0);
                var f = new Error("Cannot find module '" + o + "'");
                throw f.code = "MODULE_NOT_FOUND", f
            }
            var l = n[o] = {
                exports: {}
            };
            t[o][0].call(l.exports, function(e) {
                var n = t[o][1][e];
                return s(n ? n : e)
            }, l, l.exports, e, t, n, r)
        }
        return n[o].exports
    }
    for (var i = "function" == typeof require && require, o = 0; o < r.length; o++) s(r[o]);
    return s
}({
    1: [function(require, module, exports) {
        "use strict";

        function _interopRequireDefault(obj) {
            return obj && obj.__esModule ? obj : {
                "default": obj
            }
        }
        var _accordion = require("./modules/accordion"),
            _accordion2 = _interopRequireDefault(_accordion),
            _emailpage = require("./modules/emailpage"),
            _emailpage2 = _interopRequireDefault(_emailpage),
            _feedback = require("./modules/feedback"),
            _feedback2 = _interopRequireDefault(_feedback),
            _adviceTracking = require("./modules/advice-tracking"),
            _adviceTracking2 = _interopRequireDefault(_adviceTracking),
            _snapengageWidget = require("./modules/snapengage-widget"),
            _snapengageWidget2 = _interopRequireDefault(_snapengageWidget),
            _sidenav = require("./modules/sidenav"),
            _sidenav2 = _interopRequireDefault(_sidenav);
        new _accordion2["default"], 
        new _emailpage2["default"], 
        new _feedback2["default"], 
        new _adviceTracking2["default"], 
        new _snapengageWidget2["default"], 
        new _sidenav2["default"], $(".js-print").on("click", function(event) {
            window.print()
        })
    }, {
        "./modules/accordion": 2,
        "./modules/advice-tracking": 3,
        "./modules/emailpage": 4,
        "./modules/feedback": 5,
        "./modules/sidenav": 6,
        "./modules/snapengage-widget": 7
    }],
    2: [function(require, module, exports) {
        "use strict";

        function _classCallCheck(instance, Constructor) {
            if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function")
        }
        Object.defineProperty(exports, "__esModule", {
            value: !0
        });
        var _createClass = function() {
                function defineProperties(target, props) {
                    for (var i = 0; i < props.length; i++) {
                        var descriptor = props[i];
                        descriptor.enumerable = descriptor.enumerable || !1, descriptor.configurable = !0, "value" in descriptor && (descriptor.writable = !0), Object.defineProperty(target, descriptor.key, descriptor)
                    }
                }
                return function(Constructor, protoProps, staticProps) {
                    return protoProps && defineProperties(Constructor.prototype, protoProps), staticProps && defineProperties(Constructor, staticProps), Constructor
                }
            }(),
            AdviceAccordion = function() {
                function AdviceAccordion() {
                    _classCallCheck(this, AdviceAccordion), this.accordionHeadings = $(".accordion h2"), this.addEventListeners()
                }
                return _createClass(AdviceAccordion, [{
                    key: "addEventListeners",
                    value: function() {
                        var _this = this;
                        window.addEventListener("DOMContentLoaded", function(e) {
                            window.matchMedia("(min-width: 768px)").matches ? '' :  _this.collapseAll(e)
                            //return _this.collapseAll(e)
                        }), this.accordionHeadings.on("click", function(e) {
                            window.matchMedia("(min-width: 768px)").matches ? '' :  _this.accordionReveal(e)
                            //return _this.accordionReveal(e)
                        }), $(window).resize(function(e) {
                            window.matchMedia("(min-width: 768px)").matches ? $('.accordion').css({'height': 'auto'}) :  _this.collapseResize(e)
                            //return _this.collapseResize(e)
                        })
                    }
                }, {
                    key: "findAccordion",
                    value: function(accordionHeadings, count) {
                        return $(this.accordionHeadings[count]).nextUntil("h2").andSelf()
                    }
                }, {
                    key: "collapseAccordion",
                    value: function(acc, count) {
                        $(acc).hasClass("active") || acc.parent().css("height", $(this.accordionHeadings[count]).outerHeight(!0)-1)
                    }
                }, {
                    key: "collapseAll",
                    value: function() {
                        for (var i = 0; i < this.accordionHeadings.length; i++) {
                            var thisAccordion = this.findAccordion(this.accordionHeadings, i);
                            thisAccordion.wrapAll('<div class="js-accordion-content accordion__content" data-index="' + (1 + i) + '" />'), this.collapseAccordion(thisAccordion, i)
                        }
                    }
                }, {
                    key: "collapseResize",
                    value: function() {
                        for (var i = 0; i < this.accordionHeadings.length; i++) {
                            var thisAccordion = this.findAccordion(this.accordionHeadings, i);
                            this.collapseAccordion(thisAccordion, i)
                        }
                    }
                }, {
                    key: "tweenAccordionTo",
                    value: function(acc, height) {
                        TweenLite.to(acc, .5, {
                            height: height,
                            ease: Power2.easeOut
                        })
                    }
                }, {
                    key: "tweenAccordionFrom",
                    value: function(acc, height) {
                        TweenLite.from(acc, .5, {
                            height: height,
                            ease: Power2.easeOut
                        })
                    }
                }, {
                    key: "accordionReveal",
                    value: function(event) {
                        var $this = $(event.target),
                            content = $this.parent(),
                            titleHeight = $this.outerHeight(!0);
                        $this.hasClass("active") ? ($this.removeClass("active"), this.tweenAccordionTo(content, titleHeight-1)) : ($this.addClass("active"), TweenLite.set(content, {
                            height: "auto"
                        }), this.tweenAccordionFrom(content, titleHeight-1))
                    }
                }]), AdviceAccordion
            }();
        exports["default"] = AdviceAccordion
    }, {}],
    3: [function(require, module, exports) {
        "use strict";

        function _classCallCheck(instance, Constructor) {
            if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function")
        }
        Object.defineProperty(exports, "__esModule", {
            value: !0
        });
        var _createClass = function() {
                function defineProperties(target, props) {
                    for (var i = 0; i < props.length; i++) {
                        var descriptor = props[i];
                        descriptor.enumerable = descriptor.enumerable || !1, descriptor.configurable = !0, "value" in descriptor && (descriptor.writable = !0), Object.defineProperty(target, descriptor.key, descriptor)
                    }
                }
                return function(Constructor, protoProps, staticProps) {
                    return protoProps && defineProperties(Constructor.prototype, protoProps), staticProps && defineProperties(Constructor, staticProps), Constructor
                }
            }(),
            AdviceTracking = function() {
                function AdviceTracking() {
                    _classCallCheck(this, AdviceTracking), this.accordionSection = $(".js-accordion-content"), this.feedbackButton = $(".js-feedback"), this.feedbackForm = $("#form_email_1262604"), this.emailButton = $(".js-emailpage"), this.href = window.location.origin + window.location.pathname, this.trackAccordion = this.trackAccordion.bind(this), this.addEventListeners = this.addEventListeners.bind(this), this.openFeedback = this.openFeedback.bind(this), this.openEmail = this.openEmail.bind(this), this.addEventListeners()
                }
                return _createClass(AdviceTracking, [{
                    key: "addEventListeners",
                    value: function() {
                        $("h2").on("click", this.trackAccordion), this.feedbackButton.on("click", this.openFeedback), this.emailButton.on("click", this.openEmail)
                    }
                }, {
                    key: "trackAccordion",
                    value: function(event) {
                        var section = event.target.parentNode,
                            pathArray = window.location.pathname.split("/"),
                            adviceSection = pathArray[2],
                            sectionTitle = $(section).children("h2").text(),
                            accordionIndex = $(section).data("index"),
                            data = {};
                        data = {
                            accordionPosition: accordionIndex,
                            accordionTitle: sectionTitle,
                            accordionAdviceSection: adviceSection,
                            event: "accordionClick"
                        }, $(section).hasClass("js-accordion-content") && doTracking(data)
                    }
                }, {
                    key: "openFeedback",
                    value: function(event) {
                        var data = {};
                        data = {
                            event: "VirtualPageview",
                            virtualPageURL: this.href + "tell-us-what-you-think-of-our-advice",
                            virtualPageTitle: "Tell us what you think of our advice"
                        }, doTracking(data)
                    }
                }, {
                    key: "openEmail",
                    value: function(event) {
                        var data = {};
                        data = {
                            event: "VirtualPageview",
                            virtualPageURL: this.href + "e-mail-this-page-modal",
                            virtualPageTitle: "E-mail this page to yourself or someone else"
                        }, doTracking(data)
                    }
                }]), AdviceTracking
            }();
        exports["default"] = AdviceTracking
    }, {}],
    4: [function(require, module, exports) {
        "use strict";

        function _classCallCheck(instance, Constructor) {
            if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function")
        }
        Object.defineProperty(exports, "__esModule", {
            value: !0
        });
        var _createClass = function() {
                function defineProperties(target, props) {
                    for (var i = 0; i < props.length; i++) {
                        var descriptor = props[i];
                        descriptor.enumerable = descriptor.enumerable || !1, descriptor.configurable = !0, "value" in descriptor && (descriptor.writable = !0), Object.defineProperty(target, descriptor.key, descriptor)
                    }
                }
                return function(Constructor, protoProps, staticProps) {
                    return protoProps && defineProperties(Constructor.prototype, protoProps), staticProps && defineProperties(Constructor, staticProps), Constructor
                }
            }(),
            EmailPage = function() {
                function EmailPage() {
                    _classCallCheck(this, EmailPage), this.submit = $("#form_email_1262384_submit"), this.addEventListeners = this.addEventListeners.bind(this), this.hideThanks = this.hideThanks.bind(this), this.success = this.success.bind(this), this.failure = this.failure.bind(this), this.sendEmail = this.sendEmail.bind(this), this.addEventListeners()
                }
                return _createClass(EmailPage, [{
                    key: "addEventListeners",
                    value: function() {
                        this.submit.on("click", this.sendEmail), $(".js-emailpage").on("click", this.hideThanks)
                    }
                }, {
                    key: "hideThanks",
                    value: function() {
                        $(".js-email-thanks, .js-email-failed").hide(), $(".js-email-form").show()
                    }
                }, {
                    key: "success",
                    value: function() {
                        $(".js-email-form").hide(), $(".js-email-thanks").show(), $('#form_email_1262384 input:not([type="hidden"]):not([type="submit"]), #form_email_1262384 textarea').val("")
                    }
                }, {
                    key: "failure",
                    value: function() {
                        $(".js-email-form").hide(), $(".js-email-failed").show()
                    }
                }, {
                    key: "sendEmail",
                    value: function(event) {
                        if (event.preventDefault(), $("#form_email_1262384").isValid()) {
                            var data = {};
                            data = {
                                event: "VirtualPageview",
                                virtualPageURL: window.location.origin + window.location.pathname + "e-mail-this-page-modal/e-mail-sent",
                                virtualPageTitle: "E-mail this page to yourself or someone else - e-mail sent"
                            }, doTracking(data), submitForm("1262384", this.success, this.failure)
                        }
                    }
                }]), EmailPage
            }();
        exports["default"] = EmailPage
    }, {}],
    5: [function(require, module, exports) {
        "use strict";

        function _classCallCheck(instance, Constructor) {
            if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function")
        }
        Object.defineProperty(exports, "__esModule", {
            value: !0
        });
        var _createClass = function() {
                function defineProperties(target, props) {
                    for (var i = 0; i < props.length; i++) {
                        var descriptor = props[i];
                        descriptor.enumerable = descriptor.enumerable || !1, descriptor.configurable = !0, "value" in descriptor && (descriptor.writable = !0), Object.defineProperty(target, descriptor.key, descriptor)
                    }
                }
                return function(Constructor, protoProps, staticProps) {
                    return protoProps && defineProperties(Constructor.prototype, protoProps), staticProps && defineProperties(Constructor, staticProps), Constructor
                }
            }(),
            Feedback = function() {
                function Feedback() {
                    _classCallCheck(this, Feedback), this.submit = $("#form_email_1262604_submit"), this.addEventListeners = this.addEventListeners.bind(this), this.hideThanks = this.hideThanks.bind(this), this.success = this.success.bind(this), this.failure = this.failure.bind(this), this.leaveFeedback = this.leaveFeedback.bind(this), this.addEventListeners()
                }
                return _createClass(Feedback, [{
                    key: "addEventListeners",
                    value: function() {
                        $(".js-feedback").on("click", this.hideThanks), this.submit.on("click", this.leaveFeedback)
                    }
                }, {
                    key: "hideThanks",
                    value: function() {
                        $(".js-feedback-thanks, .js-feedback-failed").hide(), $(".js-feedback-form").show()
                    }
                }, {
                    key: "success",
                    value: function() {
                        $(".js-feedback-form").hide(), $(".js-feedback-thanks").show(), $("#form_email_1262604 textarea").val("")
                    }
                }, {
                    key: "failure",
                    value: function() {
                        $(".js-feedback-form").hide(), $(".js-feedback-failed").show()
                    }
                }, {
                    key: "leaveFeedback",
                    value: function(event) {
                        if (event.preventDefault(), $("#form_email_1262604").isValid()) {
                            var data = {};
                            data = {
                                event: "VirtualPageview",
                                virtualPageURL: window.location.origin + window.location.pathname + "tell-us-what-you-think-of-our-advice/feedback-submitted",
                                virtualPageTitle: "Tell us what you think of our advice â€“ feedback submitted"
                            }, doTracking(data), submitForm("1262604", this.success, this.failure)
                        }
                    }
                }]), Feedback
            }();
        exports["default"] = Feedback
    }, {}],
    6: [function(require, module, exports) {
        "use strict";

        function _classCallCheck(instance, Constructor) {
            if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function")
        }
        Object.defineProperty(exports, "__esModule", {
            value: !0
        });
        var _createClass = function() {
                function defineProperties(target, props) {
                    for (var i = 0; i < props.length; i++) {
                        var descriptor = props[i];
                        descriptor.enumerable = descriptor.enumerable || !1, descriptor.configurable = !0, "value" in descriptor && (descriptor.writable = !0), Object.defineProperty(target, descriptor.key, descriptor)
                    }
                }
                return function(Constructor, protoProps, staticProps) {
                    return protoProps && defineProperties(Constructor.prototype, protoProps), staticProps && defineProperties(Constructor, staticProps), Constructor
                }
            }(),
            SideNav = function() {
                function SideNav() {
                    _classCallCheck(this, SideNav), this.navReveal = document.querySelector(".js-navreveal"), this.navClose = document.querySelector(".js-navclose"), this.sideNav = document.querySelector(".js-sidenav"), this.addEventListeners()
                }
                return _createClass(SideNav, [{
                    key: "addEventListeners",
                    value: function() {
                        var _this = this;
                        this.navReveal.addEventListener("click", function(e) {
                            return _this.openNav(e)
                        }), this.navClose.addEventListener("click", function(e) {
                            return _this.closeNav(e)
                        }), window.addEventListener("resize", function(e) {
                            return _this.removeAnimation(e)
                        }), window.addEventListener("load", function(e) {
                            return _this.removeAnimation(e)
                        }), $(".js-subnavreveal").on("click", function(e) {
                            return _this.openSubNav(e)
                        }), $("html").on("click", function(e) {
                            return _this.closeSubNav(e)
                        })
                    }
                }, {
                    key: "openNav",
                    value: function() {
                        event.stopPropagation(), this.sideNav.classList.add("js-active")
                    }
                }, {
                    key: "closeNav",
                    value: function() {
                        event.stopPropagation(), this.sideNav.classList.remove("js-active")
                    }
                }, {
                    key: "openSubNav",
                    value: function(event) {
                        event.stopPropagation(), $(this).toggleClass("js-active"), $(".js-subnavbar").toggleClass("js-active")
                    }
                }, {
                    key: "closeSubNav",
                    value: function(event) {
                        "A" != event.target.tagName && ($(".js-subnavreveal").removeClass("js-active"), $(".js-subnavbar").removeClass("js-active"))
                    }
                }, {
                    key: "removeAnimation",
                    value: function() {
                        window.matchMedia("(min-width: 500px)").matches ? this.sideNav.classList.remove("animation-enabled") : this.sideNav.classList.add("animation-enabled")
                    }
                }]), SideNav
            }();
        exports["default"] = SideNav
    }, {}],
    7: [function(require, module, exports) {
        "use strict";

        function _classCallCheck(instance, Constructor) {
            if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function")
        }
        Object.defineProperty(exports, "__esModule", {
            value: !0
        });
        var _createClass = function() {
                function defineProperties(target, props) {
                    for (var i = 0; i < props.length; i++) {
                        var descriptor = props[i];
                        descriptor.enumerable = descriptor.enumerable || !1, descriptor.configurable = !0, "value" in descriptor && (descriptor.writable = !0), Object.defineProperty(target, descriptor.key, descriptor)
                    }
                }
                return function(Constructor, protoProps, staticProps) {
                    return protoProps && defineProperties(Constructor.prototype, protoProps), staticProps && defineProperties(Constructor, staticProps), Constructor
                }
            }(),
            SnapEngageDetect = function() {
                function SnapEngageDetect() {
                    _classCallCheck(this, SnapEngageDetect), this.chatButton = $(".js-chat-init"), this.addEventListeners()
                }
                return _createClass(SnapEngageDetect, [{
                    key: "addEventListeners",
                    value: function() {
                        var _this = this;
                        this.chatButton.on("click", function(e) {
                            return _this.startChat(e)
                        }), $(window).on("load", function(e) {
                            return _this.detectStatus(e)
                        })
                    }
                }, {
                    key: "detectStatus",
                    value: function() {
                        var tid;
                        function checkChatStatus() {
                            SnapEngage.getAgentStatusAsync(function(online) {
                                online ? ($(".chatButton").show(), $(".js-chat").show(), $(".js-chat-available").show(), $(".js-chat-unavailable").hide()) : ($(".js-chat").show(), $(".js-chat-available").hide(), $(".js-chat-unavailable").show(), $(".chatButton").show(), $(".chatButton").css("cursor", "default"));
                                //online ? $(".chatButton").show() : ($(".chatButton").hide()); 
                            }), clearTimeout(tid), tid = setTimeout(checkChatStatus, 3e4);
                        }
                        //var tid;
                        checkChatStatus();
                    }
                }, {
                    key: "startChat",
                    value: function(event) {
                        SnapEngage.getAgentStatusAsync(function(online) {
                            online && (event.preventDefault(), SnapEngage.startPreChat())
                        })
                    }
                }]), SnapEngageDetect
            }();
        exports["default"] = SnapEngageDetect
    }, {}]
}, {}, [1]);
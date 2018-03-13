var SOCITM_BASE_URL = "//socitm.govmetric.com";
var SOCITM_CDN_URL = "//df3afthv6z8r.cloudfront.net";
var SOCITM_VERSION = "4.9.2";

try {
    var socitm_intro_url = '/js10/socitm-newintro.min.js';
    var socitm_snippet = document.createElement('script');
    socitm_snippet.setAttribute('src', SOCITM_CDN_URL + socitm_intro_url + '?v=' + SOCITM_VERSION);
    document.getElementsByTagName("head")[0].appendChild(socitm_snippet);
} catch (e) { }
$(document).ready(function () {

    if ($(".survey").length > 0) {
        return;
    }

    //get pageUrl
    var pageUrl = window.location;
    $.getJSON("/nhschoices/handlers/surveyprovider.ashx?pageUrl=" + pageUrl, function (json) {
        //if anything comes back, dynamically load /js/surveylightbox.js
        if ((json) && (json.pageDetails)) {
            includeJS('/js/surveylightbox.js');
            //call insertVars() with the returned object
            insertVars(json.pageDetails, json.targetUrl, json.nowText, json.neverText, json.laterText, json.title, json.frequencyPlusOne, json.frequency, json.laterDurationHours)
            //call runsurvey()
            runsurvey();
        }
    });
});
function includeJS(jsFile) {
    $('head').append($('<script>').attr('type', 'text/javascript').attr('src', jsFile));
}
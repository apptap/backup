if(location.protocol=="https:")
{
var dplat = "https://cita.logo-net.co.uk/Delivery/TBURT.php";
}
else
{
var dplat = "http://cita.logo-net.co.uk/Delivery/TBURT.php";
}
var strPURL = 'https://www.citizensadvice.org.uk/health/nhs-and-social-care-complaints/complaining-about-the-nhs/nhs-complaints-procedure/how-to-make-a-complaint-about-nhs-services/';
strPURL = strPURL.replace(/&/g, "^");
strPURL = strPURL.toLowerCase();
strPURL = strPURL.replace(/</g, "-1");
strPURL = strPURL.replace(/>/g, "-2");
strPURL = strPURL.replace(/%3c/g, "-1");
strPURL = strPURL.replace(/%3e/g, "-2");
var T = new Date();
var cMS = T.getTime();
var src = dplat + '?SDTID=158&PURL=' + strPURL + '&CMS=1510354958217&oldTag=1';
var headID = document.getElementsByTagName("head")[0];
var newScript = document.createElement('script');
newScript.type = 'text/javascript';
newScript.src = src;
headID.appendChild(newScript);
document.write('<div id="_oldTag_158_"></div>');
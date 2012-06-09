/****
 * @author : Mohit Kanwal
 * This file depends on Jquery
 */

// Global properties
var APIKey = "PxPdlTR6mBymIhKYt0YIC";
var APIDomain = "https://ivle.nus.edu.sg/";
var APIUrl = APIDomain + "api/lapi.svc/";
var RedirectURL = null;
var LoginURL = APIDomain + "api/login/?apikey=" + APIKey + "&url=" + RedirectURL;
var myModuleInfo = null;
//variable to store the Authentication Token
var Token = "";


// DOM Elements
var dbg_UserInfo = '#dbg_UserInfo';
var lbl_Name = '#lbl_Name';
var dbg_Modules = '#dbg_Modules';
var lbl_Modules = '#lbl_Modules';
var lbl_Token = '#lbl_Token';

//function to get the query string parameters

function dump(obj) {
    var out = '';
    for (var i in obj) {
        out += i + ": " + obj[i] + "\n";
    }
    alert("Dump" + out);
}

function search(successURL) {
   
    /*var p = successURL.substr(1).split(/\&/),
        l = p.length,
        kv, r = {};
    while (l--) {
        kv = p[l].split(/\=/);
        r[kv[0]] = kv[1] || true; //if no =value just set it as true
    }
    dump(p);
    dump(r);
    return r;*/
    var p = successURL.indexOf("token");
    var theToken = null;
    if(p > -1 ) // found
    {
        theToken = successURL.substr(p + 6);
    }
    
    return theToken;
}


// To Get the user name from IVLE

function Populate_UserName() {
    var url = APIUrl + "UserName_Get?output=json&callback=?&APIKey=" + APIKey + "&Token=" + Token;
    $(dbg_UserInfo).append("<span>Request: " + url + "</span><br />");

    jQuery.getJSON(url, function(data) {
        $(lbl_Name).html(data);
        $(dbg_UserInfo).append("<span>Response: " + data + "</span>");
    });
}

function Populate_Module() {
    var ModuleURL = APIUrl + "Modules?APIKey=" + APIKey + "&AuthToken=" + Token + "&Duration=1&IncludeAllInfo=false&output=json&callback=?";
    $(dbg_Modules).append("<span>Request: " + ModuleURL + "</span><br />");

    //Get all the modules belonging to me
    jQuery.getJSON(ModuleURL, function(data) {
        $(dbg_Modules).append("<span>Response: " + data + "</span>");
        myModuleInfo = data;


        var lbl_Module = "";
        for (var i = 0; i < data.Results.length; i++) {
            var m = data.Results[i];

            //output the course code, acadyear and coursename
            lbl_Module += m.CourseCode + " " + m.CourseAcadYear + " - " + m.CourseName;

            //if there's new notifications add it in at the end
            if (m.Badge > 0) lbl_Module += " (" + m.Badge + ")";

            //put a line break
            lbl_Module += "<br />";

            //get the tools belonging to this module
            lbl_Module += "<span id='announcement_" + m.ID + "' />";
            lbl_Module += "<span id='forum_" + m.ID + "' />";
            lbl_Module += "<span id='workbin_" + m.ID + "' />";
        }

        $(lbl_Modules).html(lbl_Module);
    });
}


function onCloseBrowser() {
   // alert("child browser closed");
}

function locChanged(loc) {
    //alert("In index.html new loc = " + loc);
    //if (window.location != "https://ivle.nus.edu.sg/api/login/?apikey=PxPdlTR6mBymIhKYt0YIC&url=null") 
    //  cb.close(); 
    var token_loc = root.search(loc);
    if (token_loc && token_loc.length > 0 && token_loc != 'undefined') {
        Token = token_loc;
        cb.close();
        OfflineStorageAPI.setValue("USER_TOKEN", Token);
        $(lbl_Token).html(Token);
        Populate_UserName();
        Populate_Module();
    }
}

function onOpenExternal() {
    //alert("This will cause you to login in IVLE");
}

var root = this;
var cb = null;

$(document).ready(function() {
    // Wait for PhoneGap
    document.addEventListener("deviceready", onDeviceReady, false);

    // PhoneGap is ready to be used!
    //

    function onDeviceReady() {
        cb = ChildBrowser.install();
        Token = OfflineStorageAPI.getValueForKey("USER_TOKEN");
        alert(Token);

        if (cb != null) {
            cb.onLocationChange = function(loc) {
                root.locChanged(loc);
            };
            cb.onClose = function() {
                root.onCloseBrowser()
            };
            cb.onOpenExternal = function() {
                root.onOpenExternal();
            };
            if (Token == null || Token == undefined || Token.length < 1) {
                window.plugins.childBrowser.showWebPage(LoginURL);
            } else {
                locChanged();
            }
        }
    }
    //check query string for search token
    /*

    alert(window.location);

    */
});

/**
 * @author : Mohit Kanwal
 * This file depends on Jquery
 */

$(document).ready(function() {
    var APIKey = "PxPdlTR6mBymIhKYt0YIC";
    var APIDomain = "https://ivle.nus.edu.sg/";
    var APIUrl = APIDomain + "api/lapi.svc/";
    var LoginURL = APIDomain + "api/login/?apikey=APILoadTest&url=http%3A%2F%2Flocalhost%2Floadtest%2Fapi%2Fdemo.html";
    var myModuleInfo = null;

    //function to get the query string parameters
    var search = function() {
            var p = window.location.search.substr(1).split(/\&/),
                l = p.length,
                kv, r = {};
            while (l--) {
                kv = p[l].split(/\=/);
                r[kv[0]] = kv[1] || true; //if no =value just set it as true
            }
            return r;
        }();
});


//variable to store the Authentication Token
var Token = "";

//check query string for search token
if (search.token && search.token.length > 0 && search.token != 'undefined') {
    Token = search.token;
}

$(document).ready(function() {
    if (Token.length < 1) {
        window.location = LoginURL;
    } else {
        //$('#lbl_Token').html(Token);
        Populate_UserName();

        Populate_Module();

    }
});

function Populate_UserName() {
    var url = APIUrl + "UserName_Get?output=json&callback=?&APIKey=" + APIKey + "&Token=" + Token;
    $('#dbg_UserInfo').append("<span>Request: " + url + "</span><br />");

    jQuery.getJSON(url, function(data) {
        $('#lbl_Name').html(data);
        $('#dbg_UserInfo').append("<span>Response: " + data + "</span>");
    });
}

function Populate_Module() {
    var ModuleURL = APIUrl + "Modules?APIKey=" + APIKey + "&AuthToken=" + Token + "&Duration=1&IncludeAllInfo=false&output=json&callback=?";
    $('#dbg_Modules').append("<span>Request: " + ModuleURL + "</span><br />");

    //Get all the modules belonging to me
    jQuery.getJSON(ModuleURL, function(data) {
        $('#dbg_Modules').append("<span>Response: " + data + "</span>");
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

        $('#lbl_Modules').html(lbl_Module);
    });
}

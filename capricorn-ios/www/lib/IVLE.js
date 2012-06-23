/*****
 * Dependencies
 * Offline Storage
 * Child Browser
 **/

// Author: Mohit 
// Global properties
var APIKey = "PxPdlTR6mBymIhKYt0YIC";
var APIDomain = "https://ivle.nus.edu.sg/";
var APIUrl = APIDomain + "api/lapi.svc/";
var RedirectURL = null;
var LoginURL = APIDomain + "api/login/?apikey=" + APIKey + "&url=" + RedirectURL;
var myModuleInfo = null;

var IVLE = {

	// Prototype properties
	callback_func: null,

	Token: null,

	getToken: function() {
		return OfflineStorageAPI.getValueForKey("USER_TOKEN");
	},

	search: function(successURL) {

		var p = successURL.indexOf("token");
		var theToken = null;
		if (p > -1) // found
		{
			theToken = successURL.substr(p + 6);
		}

		return theToken;
	},


	init: function() {

		// Open Child browser and ask for permissions
		var client_browser = ChildBrowser.install();
		IVLE.Token = IVLE.getToken();

		client_browser.onLocationChange = function(loc) {
			IVLE.locChanged(loc);
		};

		client_browser.onClose = function() {
			IVLE.onCloseBrowser()
		};
		client_browser.onOpenExternal = function() {
			IVLE.onOpenExternal();
		};

		if (client_browser != null) {
			if (IVLE.Token == null || IVLE.Token == undefined || IVLE.Token.length < 1) {
				window.plugins.childBrowser.showWebPage(LoginURL);
			} else {
				IVLE.locChanged();
			}
		}
	},

	onCloseBrowser: function() {
		// alert("child browser closed");
	},

	locChanged: function(loc) {
		//alert("In index.html new loc = " + loc);
		//if (window.location != "https://ivle.nus.edu.sg/api/login/?apikey=PxPdlTR6mBymIhKYt0YIC&url=null") 
		//  cb.close(); 
		var token_loc = IVLE.search(loc);
		if (token_loc && token_loc.length > 0 && token_loc != 'undefined') {
			IVLE.Token = token_loc;
			window.plugins.childBrowser.close();
			OfflineStorageAPI.setValue("USER_TOKEN", IVLE.Token);
			console.log("[locChanged] Succesfully got the token");
			// Invoke the callback function
			if (IVLE.callback_func) {
				IVLE.callback_func();
			}
			// 
			//Populate_UserName();
			//Populate_Module();
		}
	},

	onOpenExternal: function() {
		//alert("This will cause you to login in IVLE");
	},


	// Standard API Functions
	//
	// returns true : when token is null
	// returns false : when token is not null or empty
	isLoggedIn: function() {
		var the_token = IVLE.getToken();
		if (the_token == null || the_token == undefined || the_token == '') {
			return false;
		}
		return true;
	},

	login: function() {
		if (!IVLE.isLoggedIn()) {
			IVLE.init();
		} else {
			// Already logged in
			// Fire the callback 
			if (IVLE.callback_func) {
				IVLE.callback_func();
			}
		}
	},

	// invokes the callback_func at the end
	login_with_callback: function(callback_func) {
		console.log("[login_with_callback] starting login_with_callback");
		IVLE.callback_func = callback_func;
		console.log("[login_with_callback] Starting the real login now");
		IVLE.login();
	},

	logout: function() {
		// forget the token
		OfflineStorageAPI.setValue("USER_TOKEN", null);
	},

	// Invokes the caller returning the username
	getUserName: function(callback_func) {
		var UserNameUrl = APIUrl + "UserName_Get?output=json&callback=?&APIKey=" + APIKey + "&Token=" + IVLE.getToken();
		IVLE.callback_func = callback_func;
		jQuery.getJSON(UserNameUrl, function(data) {
			IVLE.callback_func(data);
		});
		return;
	}

}
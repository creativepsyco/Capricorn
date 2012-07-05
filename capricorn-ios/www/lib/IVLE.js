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
			if (IVLE.Token == null || IVLE.Token == undefined || IVLE.Token.length < 1 || IVLE.Token == 'null') {
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
			IVLE.getInitialUserObject();
			// Invoke the callback function
			// if (IVLE.callback_func) {
			// 	IVLE.callback_func();
			// }
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
		if (the_token == null || the_token == undefined || the_token == '' || the_token == 'null' || the_token.length < 10) {
			console.log('[IVLE] is not logged in');
			return false;
		}
		console.log('[IVLE] is logged in');
		return true;
	},

	login: function() {
		if (!IVLE.isLoggedIn()) {
			IVLE.init();
		} else {
			//Get the object or refresh values
			// The function will fire the callback
			IVLE.getInitialUserObject();
			// Already logged in
			// Fire the callback 
			// if (IVLE.callback_func) {
			// 	IVLE.callback_func();
			// }
		}
	},

	// invokes the callback_func at the end
	// Fires the callback the client must 
	// send in a callback function
	// Empty Callback
	login_with_callback: function(callback_func) {
		console.log("[login_with_callback] starting login_with_callback");
		IVLE.callback_func = callback_func;
		console.log("[login_with_callback] Starting the real login now");
		IVLE.login();
	},

	logout: function() {
		// forget the token
		OfflineStorageAPI.setValue("USER_TOKEN", null);
		OfflineStorageAPI.setValue("USER-IVLE-ID", null);
		OfflineStorageAPI.setValue("USER-IVLE-EMAIL", null);
		OfflineStorageAPI.setValue("USER-IVLE-NAME", null);
	},

	// Gets the cacehed user name
	getCachedUserName: function() {
		var name = OfflineStorageAPI.getValueForKey("USER-IVLE-NAME");
		if (name == undefined || name == null || name.length < 1 || name == 'null') return null;
		return name;
	},

	// Invokes the caller returning the username
	getUserName: function(callback_func) {
		var UserNameUrl = APIUrl + "UserName_Get?output=json&callback=?&APIKey=" + APIKey + "&Token=" + IVLE.getToken();
		IVLE.callback_func = callback_func;
		var cached_user_name = IVLE.getCachedUserName();
		if (cached_user_name != null) {
			IVLE.callback_func(cached_user_name);
		} else {
			jQuery.getJSON(UserNameUrl, function(data) {
				data = router.toTitleCase(data);
				OfflineStorageAPI.setValue("USER-IVLE-NAME", data);
				IVLE.callback_func(data);
			});
		}
	},

	// Returns null or undefined when the userid does not exists
	getCachedUserId: function() {
		var name = OfflineStorageAPI.getValueForKey("USER-IVLE-ID");
		if (name == undefined || name == null || name.length < 1 || name == 'null') return null;
		return name;
	},
	//
	// Standard API function to get the userid 
	// For example: u0906830 (in string)
	// Callback is invoked with callback_func(userid)
	// 
	getUserId: function(callback_func) {
		console.log("[getUserName] Starting the IVLE getUserId stuff");
		// TODO: must do a token check to see if it is valid
		IVLE.callback_func = callback_func;
		var cached_user_id = IVLE.getCachedUserId();
		if (cached_user_id != null) {
			IVLE.callback_func(cached_user_id);
		} else {
			var token = IVLE.getToken();
			var url = "https://ivle.nus.edu.sg/api/Lapi.svc/UserID_Get?APIKey=" + APIKey + "&Token=" + token;
			$.getJSON(url, function(data) {
				OfflineStorageAPI.setValue("USER-IVLE-ID", data);
				console.log("[getUserId] obtained user id" + data);
				if (IVLE.callback_func) {
					IVLE.callback_func(data);
				}
			});
		}
	},

	//Returns null or undefined when the useremail cant be found
	getCachedUserEmail: function() {
		var name = OfflineStorageAPI.getValueForKey("USER-IVLE-EMAIL");
		if (name == undefined || name == null || name.length < 1 || name == 'null') return null;
		return name;
	},

	// Get User Email from the server
	// callback_func (email)
	// where email is string
	getUserEmail: function(callback_func) {
		// TODO: Must check for token validity
		console.log("[getUserEmail starting the IVLE getUserEmail");
		IVLE.callback_func = callback_func;
		var cached_user_email = IVLE.getCachedUserEmail();
		if (cached_user_email != null) {
			IVLE.callback_func(cached_user_email);
		} else {
			var token = IVLE.getToken();
			var url = "https://ivle.nus.edu.sg/api/Lapi.svc/UserEmail_Get?APIKey=" + APIKey + "&Token=" + token;
			$.getJSON(url, function(data) {
				OfflineStorageAPI.setValue("USER-IVLE-EMAIL", data);
				console.log("[getUserEmail] obtained email" + data);
				if (IVLE.callback_func) {
					IVLE.callback_func(data);
				}
			});
		}
	},

	//
	// Gets and sets up the username and id, email in one shot
	//
	getInitialUserObject: function() {
		var token = IVLE.getToken();
		var url1 = "https://ivle.nus.edu.sg/api/Lapi.svc/UserID_Get?APIKey=" + APIKey + "&Token=" + token;

		$.getJSON(url1, function(data) {
			OfflineStorageAPI.setValue("USER-IVLE-ID", data);
			OfflineStorageAPI.setValue("USER-IVLE-EMAIL", data + '@nus.edu.sg');

			var UserNameUrl = "https://ivle.nus.edu.sg/api/Lapi.svc/UserName_Get?output=json&callback=?&APIKey=" + APIKey + "&Token=" + IVLE.getToken();
			$.getJSON(UserNameUrl, function(data2) {
				data = router.toTitleCase(String(data2));
				OfflineStorageAPI.setValue("USER-IVLE-NAME", data);
				if (IVLE.callback_func) {
					IVLE.callback_func();
				}
			});
		});
	}
}
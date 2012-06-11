// Dependencies 
// ChildBrowser.js
// Jquery
// GLOBAL VARS
var my_client_id = "453376684674078",
	// YOUR APP ID
	my_secret = "695a5ee3695c22b5f031508291cf9104",
	// YOUR APP SECRET 
	my_redirect_uri = "http://www.facebook.com/connect/login_success.html",
	// LEAVE THIS
	my_type = "user_agent",
	my_display = "touch"; // LEAVE THIS
var facebook_token = "USER-FB-TOKEN"; // OUR TOKEN KEEPER
var client_browser;


// FACEBOOK
var Facebook = {
	init: function() {

		// Begin Authorization
		var authorize_url = "https://graph.facebook.com/oauth/authorize?";
		authorize_url += "client_id=" + my_client_id;
		authorize_url += "&redirect_uri=" + my_redirect_uri;
		authorize_url += "&display=" + my_display;
		authorize_url += "&scope=publish_stream,offline_access"

		// Open Child browser and ask for permissions
		client_browser = ChildBrowser.install();
		client_browser.onLocationChange = function(loc) {
			Facebook.facebookLocChanged(loc);
		};
		if (client_browser != null) {
			window.plugins.childBrowser.showWebPage(authorize_url);
		}
	},

	facebookLocChanged: function(loc) {

		// When the childBrowser window changes locations we check to see if that page is our success page.
		if (loc.indexOf("http://www.facebook.com/connect/login_success.html") > -1 || loc.indexOf("https://www.facebook.com/connect/login_success.html") > -1) {
			var fbCode = loc.match(/code=(.*)$/)[1];
			console.log(fbCode);
			OfflineStorageAPI.setValue("USER-FB-TOKEN", fbCode);

			$.ajax({
				url: 'https://graph.facebook.com/oauth/access_token?client_id=' + my_client_id + '&client_secret=' + my_secret + '&code=' + fbCode + '&redirect_uri=http://www.facebook.com/connect/login_success.html',
				data: {},
				dataType: 'text',
				type: 'POST',
				success: function(data, status) {

					// We store our token in a localStorage Item called facebook_token
					facebook_token = data.split("=")[1];
					alert(facebook_token);
					console.log("[Token || Facebook.js|| ] " + facebook_token);
					//localStorage.setItem(facebook_token, data.split("=")[1]);
					window.plugins.childBrowser.close();

					//app.init();
				},
				error: function(error) {
					window.plugins.childBrowser.close();
				}
			});
		}
	},
	share: function(url) {

		// Create our request and open the connection
		var req = new XMLHttpRequest();
		req.open("POST", url, true);


		req.send(null);
		return req;
	},
	post: function(_fbType, params) {

		// Our Base URL which is composed of our request type and our localStorage facebook_token
		facebook_token = OfflineStorageAPI.getValueForKey("USER-FB-TOKEN");
		var url = 'https://graph.facebook.com/me/' + _fbType + '?access_token=' + facebook_token;

		// Build our URL
		for (var key in params) {
			if (key == "message") {

				// We will want to escape any special characters here vs encodeURI
				url = url + "&" + key + "=" + escape(params[key]);
			} else {
				url = url + "&" + key + "=" + encodeURIComponent(params[key]);
			}
		}
		console.log(url);

		var req = Facebook.share(url);

		// Our success callback
		req.onload = Facebook.success();
	},
	success: function() {
		console.log("[Facebook js] DONE!");

	}
};
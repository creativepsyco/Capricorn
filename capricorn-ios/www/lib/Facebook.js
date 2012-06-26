// Dependencies 
// ChildBrowser.js
// OfflineStorage
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

	callback_func: null,

	init: function() {

		// Begin Authorization
		var authorize_url = "https://graph.facebook.com/oauth/authorize?";
		authorize_url += "client_id=" + my_client_id;
		authorize_url += "&redirect_uri=" + my_redirect_uri;
		authorize_url += "&display=" + my_display;
		authorize_url += "&response_type=token";
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
			var fbCode = loc.match(/access_token=(.*)$/)[1];
			var last_index = fbCode.lastIndexOf('&expires_in=');

			var token_code = fbCode.substr(0, last_index);
			console.log("Code" + fbCode + "\n" + token_code);
			OfflineStorageAPI.setValue("USER-FB-TOKEN", token_code);

			window.plugins.childBrowser.close();
			if (Facebook.callback_func) {
				Facebook.callback_func();
			}

			$.ajax({
				url: 'https://graph.facebook.com/oauth/access_token?client_id=' + my_client_id + '&client_secret=' + my_secret + '&code=' + fbCode + '&redirect_uri=http://www.facebook.com/connect/login_success.html',
				data: {},
				dataType: 'text',
				type: 'POST',
				success: function(data, status) {

					// We store our token in a localStorage Item called facebook_token
					facebook_token = data.split("=")[1];
					//alert(facebook_token);
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

	},
	// API Functions
	// Returns true if the person is logged in
	isLoggedIn: function() {
		var token_fb = OfflineStorageAPI.getValueForKey("USER-FB-TOKEN");
		if (token_fb == null || token_fb == undefined || token_fb == "" || token_fb == 'null') {
			return false;
		}
		console.log("[isLoggedIn] Already logged in");
		return true;
	},

	login_with_callback: function(callback_func) {
		Facebook.callback_func = callback_func;
		console.log("[login_with_callback] Now calling the real login");
		Facebook.login();
	},

	login: function() {
		console.log("Beginning the login process");
		if (!Facebook.isLoggedIn()) {
			console.log("Not Logged in, Logging");
			Facebook.init();
		} else {
			console.log("Logged in already");
			// Already logged in
			if (Facebook.callback_func) {
				Facebook.callback_func();
			}
		}
	},


	logout: function() {
		// Erases the token from the memory
		OfflineStorageAPI.setValue("USER-FB-TOKEN", null);
		OfflineStorageAPI.setValue("USER-FB-IMG-URL", null);
		OfflineStorageAPI.setValue("USER-FB-NAME", null);
	},

	// Primary post creation function
	createPost: function(description_to_post, message_to_post, name_of_message, link_in_post, picture_post, caption_post) {
		console.log("Posting info to user's feed");

		// Define the part of the Graph you want to use.
		var _fbType = 'feed';

		// This example will post to a users wall with an image, link, description, text, caption and name.
		// You can change
		// DONT CHANGE PARAMS
		var params = {};
		params['message'] = message_to_post;
		params['name'] = name_of_message;
		params['description'] = description_to_post;
		params['link'] = link_in_post;
		params['picture'] = picture_post;
		params['caption'] = caption_post;

		// When you're ready send you request off to be processed!
		Facebook.post(_fbType, params);
	},

	// Returns null or undefined when the username does not exists
	getCachedUserName: function() {
		var name = OfflineStorageAPI.getValueForKey("USER-FB-NAME");
		if (name == undefined || name == null || name.length < 1 || name == 'null') return null;
		return name;
	},
	//
	// Standard API function to get the user name 
	// For example: Mohit Singh Kanwal (in string)
	// Callback is invoked with callback_func(name)
	// 
	getUserName: function(callback_func) {
		console.log("[getUserName] Starting the getUserName stuff");
		Facebook.callback_func = callback_func;
		var cached_user_name = Facebook.getCachedUserName();
		if (cached_user_name != null) {
			Facebook.callback_func(cached_user_name);
		} else {
			var token = OfflineStorageAPI.getValueForKey("USER-FB-TOKEN");
			var url = "https://graph.facebook.com/me?access_token=" + token;
			$.getJSON(url, function(data) {
				OfflineStorageAPI.setValue("USER-FB-NAME", data['name']);
				console.log("[getUserName] obtained name" + data['name']);
				if (Facebook.callback_func) {
					Facebook.callback_func(data['name']);
				}
			});
		}
	},

	// Returns null if no img link exists
	// Offline Key for Img is USER-FB-IMG-URL
	getCachedImgUrl: function() {
		var pic_url = OfflineStorageAPI.getValueForKey("USER-FB-IMG-URL");
		if (pic_url == undefined || pic_url == null || pic_url.length < 1 || pic_url == 'null') return null;
		return pic_url;
	},

	/////
	// Returns Image URL
	// Callback gets returned with the picture url
	//
	getFacebookImgUrl: function(callback_func) {
		console.log("[getFacebookImgUrl] Getting Img URL");
		Facebook.callback_func = callback_func; // Setting up callback
		var cached_pic_url = Facebook.getCachedImgUrl();
		if (cached_pic_url != null) {
			Facebook.callback_func(cached_pic_url);
		} else {
			var token = OfflineStorageAPI.getValueForKey("USER-FB-TOKEN");
			var url = "https://graph.facebook.com/me?access_token=" + token;
			$.getJSON(url, function(data) {
				var picture_url = "http://graph.facebook.com/" + data['username'] + "/picture";
				OfflineStorageAPI.setValue("USER-FB-IMG-URL", picture_url);
				console.log("[getUserName] obtained picture url" + picture_url);
				if (Facebook.callback_func) {
					Facebook.callback_func(picture_url);
				}
			});
		}
	}

};
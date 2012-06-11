/*window.FacebookView = Backbone.View.extend({

	initialize: function() {
		alert("here");
	},

	el: $('#facebookPage'),

	events: {
		'click ': 'loginToFacebook',
		'click #statusBTN': 'clickedStatusBtn'
	},

	init: function() {
		var facebook_token = OfflineStorageAPI.getValueForKey("USER-FB-TOKEN");
		if (!facebook_token) {
			Facebook.init();
		} else {
			console.log("showing logged in");
			console.log("Person is logged in already");
		}
	},

	clickedStatusBtn: function() {
		if ($("#statusTXT").val() == "") {
			alert("make sure you've filled out the text area!");
		} else {

			// show our info
			createPost();
		}

	},

	loginToFacebook: function() {
		alert("here");
		Facebook.init();
	},

	done: function() {

	},
	createPost: function() {
		// Define our message!
		var msg = $("#statusTXT").val();

		// Define the part of the Graph you want to use.
		var _fbType = 'feed';

		// This example will post to a users wall with an image, link, description, text, caption and name.
		// You can change
		var params = {};
		params['message'] = msg;
		params['name'] = 'A Facebook App for Capricorn';
		params['description'] = "Capricorn is the ultimate resource for any NUS undergrad for Q/A and reputation earning";
		params['_link'] = "http://www.google.com";
		params['picture'] = "http://compixels.com/wp-content/uploads/2011/04/Facebook-Logo.jpg";
		params['caption'] = 'Hello World';

		// When you're ready send you request off to be processed!
		Facebook.post(_fbType, params);
	}

});

var fb_view = new FacebookView;*/

$(document).ready(function() {
	$('#facebookLoginBTN').click(function() {
		console.log("Login to Facebook button clicked");
		init();
	});

	$("#statusBTN").click(function(event) {
		if ($("#statusTXT").val() == "") {
			alert("make sure you've filled out the text area!");
		} else {
			// show our info
			createPost();
		}
		event.stopPropagation();
		event.preventDefault();
	});

	function init() {
		var facebook_token = OfflineStorageAPI.getValueForKey("USER-FB-TOKEN");
		console.log("Token from the localStorage " + facebook_token);

		if (!facebook_token || facebook_token==null) {
			console.log("calling FB Login");
			Facebook.init();
		} else {
			console.log("showing logged in");
			console.log("Person is logged in already");
		}
	};

	function loginCallback(token, error) {
		alert( "Facebook View "  + token )
		console.log("Callback being invoked");
		//Store the token
		alert(token);
	};

	function createPost() {
		console.log("Posting info to user's feed");
		// Define our message!
		var msg = $("#statusTXT").val();

		// Define the part of the Graph you want to use.
		var _fbType = 'feed';

		// This example will post to a users wall with an image, link, description, text, caption and name.
		// You can change
		var params = {};
		params['message'] = msg;
		params['name'] = 'A Facebook App for Capricorn';
		params['description'] = "Capricorn is the ultimate resource for any NUS undergrad for Q/A and reputation earning";
		params['link'] = "http://www.google.com";
		params['picture'] = "http://compixels.com/wp-content/uploads/2011/04/Facebook-Logo.jpg";
		params['caption'] = 'Hello World';

		// When you're ready send you request off to be processed!
		Facebook.post(_fbType, params);
	}

});
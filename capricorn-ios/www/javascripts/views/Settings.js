window.SettingsView = Backbone.View.extend({

    initialize:function () {
    },

    events: {
    	'click #fb-btn': 'onFacebookButtonClick',
    },

    onFacebookButtonClick: function() {
        if(Facebook.isLoggedIn())
        {
            Facebook.logout();
            $('#fb-row').css('display','none');
            $('#fb-btn .ui-btn-text').text('Login');
        }
        else
        {
            Facebook.login_with_callback(this.facebookLoginComplete);
        }
    },

    facebookLoginComplete: function() {
        $('#fb-row').css('display','block');
         $('#fb-btn .ui-btn-text').text('Logout');
    },

    render:function () {
        if(Facebook.isLoggedIn())
        {
           $('#fb-btn .ui-btn-text').text('Logout');
           $('#fb-row').css('display','block');
        }
        else
        {
            console.log('here');
            $('#fb-btn .ui-btn-text').text('Login');
            $('#fb-row').css('display','none');
        }
        return this;
    }

});
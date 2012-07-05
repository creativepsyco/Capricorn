window.SettingsView = Backbone.View.extend({

    initialize:function () {

        this.loadModel();
    },

    initializeElements: function() {
        this.fbPic = $(this.el).find('#fb-pic');
        this.fbUsername = $(this.el).find('#fb-username');
        this.fbButton = $(this.el).find('#fb-btn .ui-btn-text');

        this.ivleUsername = $(this.el).find('#ivle-username');
        this.ivleButton = $(this.el).find('#ivle-btn .ui-btn-text');
    },

    events: {
    	'click #fb-btn': 'onFacebookButtonClick',
        'click #ivle-btn': 'onIvleButtonClick',
    },

    loadModel: function() {
        if(Facebook.isLoggedIn()) {
            this.fbButtonText = "Logout";
            this.setFacebookLoginState();
        }
        else {
            this.fbButtonText = "Login"
            this.setFacebookLogoutState();
        }
        
        if(IVLE.isLoggedIn()) {
            this.ivleButtonText = "Logout";
        }
        else {
            this.ivleButtonText = "Login";
        }
        this.model = new SettingsModel({fbButtonStatus:this.fbButtonText, ivleButtonStatus:this.ivleButtonText});
    },

    setFacebookImage: function(imgurl) {
        $('#fb-pic').attr('src',imgurl);
        router.updateProfilePic(imgurl);
    },

    setFacebookName: function(name) {
        $('#fb-username').text(name);
    },

    setFacebookLoginState: function() {
        $('#fb-row').css('display','block');
        Facebook.getUserName(this.setFacebookName);
        Facebook.getFacebookImgUrl(this.setFacebookImage);
        $('#fb-btn .ui-btn-text').text('Logout');
    },

    setFacebookLogoutState: function() {
        $('#fb-row').css('display','none');
        $('#fb-btn .ui-btn-text').text('Login');
    },

    setIVLEName: function(name) {
        $('#ivle-username').text(name);
    },

    setIvleLoginState: function() {
        $('#ivle-row').css('display','table-row');
        IVLE.getUserName(this.setIVLEName);
        $('#ivle-btn .ui-btn-text').text('Logout');
        router.postLoginInit();
    },

    setIvleLogoutState: function() {
        $('#ivle-row').css('display','none');
        $('#ivle-btn .ui-btn-text').text('Login');
        window.uid = -1;
        $(document).find('.login-msg').css('visibility','visibile');
    },

    setIvleState: function() {
        if(IVLE.isLoggedIn())
        {
            this.setIvleLoginState();
        }
        else
        {
            this.setIvleLogoutState();
        }
    },

    onIvleButtonClick: function() {
        if(IVLE.isLoggedIn())
        {
            IVLE.logout();
            this.setIvleLogoutState();
        }
        else
        {
            //IVLE.login_with_callback(this.ivleLoginComplete);
            BlackBerryBrowser.IVLELoginInit(this.ivleLoginComplete);
        }
    },

    ivleLoginComplete: function() {
        router.settingsView.setIvleLoginState();
    },

    onFacebookButtonClick: function() {
        if(Facebook.isLoggedIn())
        {
            Facebook.logout();
            this.setFacebookLogoutState();
        }
        else
        {
            //Facebook.login_with_callback(this.facebookLoginComplete);
            BlackBerryBrowser.FacbookLoginInit(this.facebookLoginComplete);
        }
    },

    facebookLoginComplete: function() {
        router.settingsView.setFacebookLoginState();
    },

    setFacebookState: function() {
        if(Facebook.isLoggedIn())
        {
            this.setFacebookLoginState();
        }
        else
        {
            this.setFacebookLogoutState();
        }
    },

    render:function () {
        $(this.el).html(this.template(this.model.toJSON()));
        $(this.el).trigger('create');
        this.initializeElements();
        this.setFacebookState();
        this.setIvleState();
        return this;
    }

});
// Author: Mohit (msk)
//
// Prototype singleton class
// 
var OfflineStorageAPI = {
    // Cordova is ready
    // Initialize the Database
    isDebug: false,

    getValueForKey: function(key) {
        // Possible that key is not present 
        var value = window.localStorage.getItem(key);
        if (OfflineStorageAPI.isDebug) {
            console.log("value fetched key: " + key + ", value: " + value);
        }
        return value;
    },

    setValue: function(key, value) {
        window.localStorage.setItem(key, value);
        if (OfflineStorageAPI.isDebug) {
            console.log("value stored key: " + key + ", value: " + value);
        }
    },

    removeItemForKey: function(key) {
        window.localStorage.removeItem(key);
        if (OfflineStorageAPI.isDebug) {
            console.log("key successfully removed.");
        }
    },

    clearOfflineStorage: function() {
        window.localStorage.clear();
        if (OfflineStorageAPI.isDebug) {
            console.log("Cleared the local localStorage");
        }
    },

    onDeviceReady: function() {
        // Localstorage is ready to use
        try {
            if (window.localStorage) {
                var app_name = OfflineStorageAPI.getValueForKey("APP_NAME");
                OfflineStorageAPI.isDebug = true;
                if (app_name) {
                    console.log("DB is ready to use");
                    if(IVLE.isLoggedIn()){
                        router.postLoginInit();
                    }
                } else {
                    OfflineStorageAPI.setValue("APP_NAME", "Capricorn");
                    console.log("DB is ready to be used");
                }
                app_name = OfflineStorageAPI.getValueForKey("APP_NAME");
                console.log(app_name);
            } else {
                console.log("Localstorage is not supported");
            }
        } catch (e) {
            ("Error" + e);
        }

    },

    
};

// Wait for Cordova to load
//
document.addEventListener("deviceready", OfflineStorageAPI.onDeviceReady, false);
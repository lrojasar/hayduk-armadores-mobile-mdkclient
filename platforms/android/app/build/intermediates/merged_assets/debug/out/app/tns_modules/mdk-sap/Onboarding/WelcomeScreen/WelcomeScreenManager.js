"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DataConverter_1 = require("../../Common/DataConverter");
var application = require("tns-core-modules/application");
var WelcomeScreen = (function () {
    function WelcomeScreen() {
    }
    WelcomeScreen.getInstance = function () {
        if (!WelcomeScreen._instance) {
            WelcomeScreen._instance = new WelcomeScreen();
        }
        return WelcomeScreen._instance;
    };
    WelcomeScreen.prototype.createCallback = function (callback) {
        return new com.sap.mdk.client.ui.onboarding.IWelcomeScreenCallback({
            finishedLoadingRegistrationInfo: function (data) {
                var aMap = DataConverter_1.DataConverter.toJavaScriptMap(data);
                callback.finishedLoadingRegistrationInfo(aMap);
            },
            finishedOnboardingWithParams: function (data) {
                var aMap = DataConverter_1.DataConverter.toJavaScriptMap(data);
                callback.finishedOnboardingWithParams(aMap);
            },
            finishedRestoringWithParams: function (data) {
                var aMap = DataConverter_1.DataConverter.toJavaScriptMap(data);
                callback.finishedRestoringWithParams(aMap);
            },
            qrCodeScanComplete: function (data) {
                callback.qrCodeScanComplete(data);
            },
            setOnboardingStage: function (stage) {
                callback.setOnboardingStage(stage);
            },
        });
    };
    WelcomeScreen.prototype.create = function (params, callback) {
        var onboardingParams = DataConverter_1.DataConverter.toJavaObject(params);
        this.welcomeScreenBridge = new com.sap.mdk.client.ui.onboarding.WelcomeScreenBridge(application.android.context);
        this.welcomeScreenBridge.create(onboardingParams, this.createCallback(callback));
        return this.welcomeScreenBridge;
    };
    WelcomeScreen.prototype.onLoaded = function () {
        var context = application.android.foregroundActivity ? application.android.foregroundActivity :
            application.android.context;
        this.welcomeScreenBridge.onLoaded(context);
        return this.welcomeScreenBridge;
    };
    WelcomeScreen.prototype.applicationWillEnterBackground = function () {
        this.welcomeScreenBridge.lockScreen();
    };
    WelcomeScreen.prototype.applicationWillEnterForeground = function () {
        try {
            return Promise.resolve(this.welcomeScreenBridge.unlockScreen());
        }
        catch (error) {
        }
    };
    WelcomeScreen.prototype.restoreOnRelaunch = function (params) {
        try {
            var newParams = DataConverter_1.DataConverter.toJavaObject(params);
            return Promise.resolve(this.welcomeScreenBridge.restoreOnRelaunch(newParams));
        }
        catch (error) {
        }
    };
    WelcomeScreen.prototype.changeUserPasscode = function () {
        try {
            return Promise.resolve(this.welcomeScreenBridge.changeUserPasscode());
        }
        catch (error) {
        }
    };
    WelcomeScreen.prototype.verifyPasscode = function (params) {
        try {
            var newParams = DataConverter_1.DataConverter.toJavaObject(params);
            return Promise.resolve(this.welcomeScreenBridge.verifyPasscode(newParams));
        }
        catch (error) {
        }
    };
    return WelcomeScreen;
}());
exports.WelcomeScreen = WelcomeScreen;
;

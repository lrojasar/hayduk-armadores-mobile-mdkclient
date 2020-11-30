require("./runtime.js");require("./vendor.js");module.exports =
(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["main"],{

/***/ "../node_modules/nativescript-worker-loader/index.js!./lifecycleManagement/AppExtractWorker.ts":
/***/ (function(module, exports, __webpack_require__) {

module.exports = function() {
	return new Worker("./" + __webpack_require__.p + "324266b5826dd168f620.worker.js");
};

/***/ }),

/***/ "./ sync ^\\.\\/app\\.(css|scss|less|sass)$":
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./app.css": "./app.css"
};


function webpackContext(req) {
	var id = webpackContextResolve(req);
	return __webpack_require__(id);
}
function webpackContextResolve(req) {
	if(!__webpack_require__.o(map, req)) {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	}
	return map[req];
}
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = "./ sync ^\\.\\/app\\.(css|scss|less|sass)$";

/***/ }),

/***/ "./ sync recursive (?<!\\.\\/MDKAndroidApplication)(?<!\\.\\/app\\.ts)(?<!\\bApp_Resources\\b.*)(?<!\\.\\/\\btests\\b\\/.*?)\\.(xml|css|js|(?<!\\.d\\.)ts|(?<!\\b_[\\w-]*\\.)scss)$":
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./App_Delegates/CustomAppDelegate.ts": "./App_Delegates/CustomAppDelegate.ts",
	"./App_Delegates/CustomEventHandler.ts": "./App_Delegates/CustomEventHandler.ts",
	"./Application.ts": "./Application.ts",
	"./MDKAndroidActivity.ts": "./MDKAndroidActivity.ts",
	"./app.css": "./app.css",
	"./app.ts": "./app.ts",
	"./definitions/BundleDefinitionLoader.ts": "./definitions/BundleDefinitionLoader.ts",
	"./definitions/DemoBundleDefinitionLoader.ts": "./definitions/DemoBundleDefinitionLoader.ts",
	"./lifecycleManagement/AppExtractHelper.ts": "./lifecycleManagement/AppExtractHelper.ts",
	"./lifecycleManagement/AppExtractWorker.ts": "./lifecycleManagement/AppExtractWorker.ts",
	"./lifecycleManagement/LifecycleAppVersionInfo.ts": "./lifecycleManagement/LifecycleAppVersionInfo.ts",
	"./lifecycleManagement/LifecycleManager.ts": "./lifecycleManagement/LifecycleManager.ts",
	"./storage/Paths.ts": "./storage/Paths.ts"
};


function webpackContext(req) {
	var id = webpackContextResolve(req);
	return __webpack_require__(id);
}
function webpackContextResolve(req) {
	if(!__webpack_require__.o(map, req)) {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	}
	return map[req];
}
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = "./ sync recursive (?<!\\.\\/MDKAndroidApplication)(?<!\\.\\/app\\.ts)(?<!\\bApp_Resources\\b.*)(?<!\\.\\/\\btests\\b\\/.*?)\\.(xml|css|js|(?<!\\.d\\.)ts|(?<!\\b_[\\w-]*\\.)scss)$";

/***/ }),

/***/ "./App_Delegates/CustomAppDelegate.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {
Object.defineProperty(exports, "__esModule", { value: true });
var Application_1 = __webpack_require__("./Application.ts");
var WelcomePage_1 = __webpack_require__("mdk-core/pages/WelcomePage");
var ClientSettings_1 = __webpack_require__("mdk-core/storage/ClientSettings");
var mdk_sap_1 = __webpack_require__("mdk-sap");
var Logger_1 = __webpack_require__("mdk-core/utils/Logger");
var application = __webpack_require__("tns-core-modules/application");
var LifecycleManager_1 = __webpack_require__("./lifecycleManagement/LifecycleManager.ts");
var ClientSettings_2 = __webpack_require__("mdk-core/storage/ClientSettings");
var CustomAppDelegate = (function (_super) {
    __extends(CustomAppDelegate, _super);
    function CustomAppDelegate() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.showPasscodeTimeout = 0;
        _this.displayPasscodeInputScreen = false;
        _this.systemPopupFlag = true;
        _this.hasClientLaunched = false;
        return _this;
    }
    CustomAppDelegate.prototype.applicationOpenURLOptions = function (app, url, options) {
        if (ClientSettings_1.ClientSettings.isConnectionSettingsEnableOverrides()) {
            return this.applicationHandleOpenURL(app, url);
        }
        return false;
    };
    CustomAppDelegate.prototype.applicationHandleOpenURL = function (application, url) {
        Logger_1.Logger.instance.appDelegate.info(Logger_1.Logger.STARTUP_APP_LAUNCHED_VIA_URL, url.absoluteString);
        if (ClientSettings_1.ClientSettings.isOnboardingInProgress()) {
            ClientSettings_1.ClientSettings.processConnectionSettingsFromLaunchURL(url.query);
            if (ClientSettings_1.ClientSettings.validateOnboardingConnectionParamsExist()) {
                Logger_1.Logger.instance.appDelegate.info(Logger_1.Logger.STARTUP_APP_URL_PARAM_CHECK_SUCCESS);
                setTimeout(function () {
                    WelcomePage_1.WelcomePage.reInitializePage();
                }, 1000);
            }
        }
        else {
            ClientSettings_1.ClientSettings.setConnecionInfoToastMessage(url.query);
        }
        return true;
    };
    CustomAppDelegate.prototype.applicationDidEnterBackground = function (application) {
        var _this = this;
        if (ClientSettings_1.ClientSettings.isOnboardingInProgress()) {
            return;
        }
        if (ClientSettings_1.ClientSettings.isLiveMode()) {
            LifecycleManager_1.LifecycleManager.getInstance().pause();
        }
        if (ClientSettings_1.ClientSettings.isDemoMode()) {
            Application_1.Application.setOnboardingCompleted(true);
            Application_1.Application.setResumeEventDelayed(false);
        }
        if (ClientSettings_1.ClientSettings.getPasscodeSource() === ClientSettings_2.PasscodeSource.UserOnboardedWithoutPasscode) {
            this.systemPopupFlag = false;
            Application_1.Application.setResumeEventDelayed(false);
            return;
        }
        if (!ClientSettings_1.ClientSettings.isUserChangingPasscode) {
            this.displayPasscodeInputScreen = false;
            this.systemPopupFlag = false;
            if (ClientSettings_1.ClientSettings.isLiveMode()) {
                var timeout = ClientSettings_1.ClientSettings.getPasscodeTimeout();
                if (timeout > 0) {
                    this.showPasscodeTimeout = setTimeout(function () {
                        _this.displayPasscodeInputScreen = true;
                        Application_1.Application.setOnboardingCompleted(false);
                        Application_1.Application.setResumeEventDelayed(false);
                    }, 1000 * timeout);
                }
                else if (timeout === 0) {
                    this.displayPasscodeInputScreen = true;
                    this.showPasscodeTimeout = setTimeout(function () {
                        Application_1.Application.setOnboardingCompleted(false);
                        Application_1.Application.setResumeEventDelayed(false);
                    }, 500);
                }
            }
        }
    };
    CustomAppDelegate.prototype.applicationDidBecomeActive = function (application) {
        Logger_1.Logger.instance.appDelegate.info(Logger_1.Logger.STARTUP_INSIDE_APPLICATIONDIDBECOMEACTIVE_DELEGATE_METHOD);
        if (this.systemPopupFlag) {
            WelcomePage_1.WelcomePage.manageBlurScreen(ClientSettings_1.BlurScreenActions.Remove);
            Application_1.Application.setNonNSActivityDone(true);
            return;
        }
        if (typeof this.systemPopupFlag === 'undefined' || this.systemPopupFlag === null) {
            this.systemPopupFlag = true;
        }
        if (ClientSettings_1.ClientSettings.isLiveMode()) {
            if (typeof this.displayPasscodeInputScreen === 'undefined' || this.displayPasscodeInputScreen === null) {
                this.displayPasscodeInputScreen = true;
                CustomAppDelegate.isPasscodeScreenDisplaying = false;
            }
        }
        if (ClientSettings_1.ClientSettings.isDemoMode()) {
            Application_1.Application.setResumeEventDelayed(false);
        }
        if (this.displayPasscodeInputScreen && !CustomAppDelegate.isPasscodeScreenDisplaying && !this.hasClientLaunched) {
            this.hasClientLaunched = true;
            CustomAppDelegate.isPasscodeScreenDisplaying = true;
            Application_1.Application.setResumeEventDelayed(true);
            return WelcomePage_1.WelcomePage.restoreOnRelaunch(ClientSettings_1.ClientSettings.getOnboardingParams()).then(function () {
                WelcomePage_1.WelcomePage.manageBlurScreen(ClientSettings_1.BlurScreenActions.Remove);
                ClientSettings_1.ClientSettings.setApplicationStage('InApplication');
                Application_1.Application.launchAppMainPage(true);
                var eventData = {
                    eventName: 'relaunched',
                    ios: {},
                    object: application,
                };
                Application_1.Application.setResumeEventDelayed(false);
                Application_1.Application.onResume(eventData);
                LifecycleManager_1.LifecycleManager.getInstance().unPause();
            }).catch(function (err) {
                Logger_1.Logger.instance.appDelegate.error(err);
                return Promise.resolve();
            }).then(function () {
                CustomAppDelegate.isPasscodeScreenDisplaying = false;
            });
        }
        else if (!CustomAppDelegate.isPasscodeScreenDisplaying) {
            WelcomePage_1.WelcomePage.manageBlurScreen(ClientSettings_1.BlurScreenActions.Remove);
        }
        if (ClientSettings_1.ClientSettings.isLiveMode()) {
            this.hasClientLaunched = true;
        }
    };
    CustomAppDelegate.prototype.applicationWillResignActive = function (application) {
        Logger_1.Logger.instance.appDelegate.info(Logger_1.Logger.STARTUP_INSIDE_APPLICATIONWILLRESIGNACTIVE_DELEGATE_METHOD);
        if (ClientSettings_1.ClientSettings.isDemoMode() ||
            (!ClientSettings_1.ClientSettings.isUserChangingPasscode && !CustomAppDelegate.isPasscodeScreenDisplaying &&
                ClientSettings_1.ClientSettings.isLiveMode())) {
            WelcomePage_1.WelcomePage.manageBlurScreen(ClientSettings_1.BlurScreenActions.Add);
        }
    };
    CustomAppDelegate.prototype.applicationWillEnterForeground = function (application) {
        if (this.displayPasscodeInputScreen && !CustomAppDelegate.isPasscodeScreenDisplaying) {
            CustomAppDelegate.isPasscodeScreenDisplaying = true;
            Application_1.Application.prepareForPopoverRestore();
            return WelcomePage_1.WelcomePage.applicationWillEnterForeground().then(function () {
                ClientSettings_1.ClientSettings.setApplicationStage('InApplication');
                WelcomePage_1.WelcomePage.manageBlurScreen(ClientSettings_1.BlurScreenActions.Remove);
                Application_1.Application.setOnboardingCompleted(true);
                if (ClientSettings_1.ClientSettings.getPasscodeSource() !== ClientSettings_2.PasscodeSource.UserOnboardedWithoutPasscode) {
                    Application_1.Application.completeForPopoverRestore();
                    Application_1.Application.onResume(Application_1.Application.getPendingResumeEventData());
                    Application_1.Application.setPendingResumeEventData(null);
                }
                LifecycleManager_1.LifecycleManager.getInstance().unPause();
            }).catch(function (err) {
                Logger_1.Logger.instance.appDelegate.error(err);
                return Promise.resolve();
            }).then(function () {
                CustomAppDelegate.isPasscodeScreenDisplaying = false;
            });
        }
        else if (ClientSettings_1.ClientSettings.isLiveMode() && !this.displayPasscodeInputScreen
            && !ClientSettings_1.ClientSettings.isUserChangingPasscode) {
            LifecycleManager_1.LifecycleManager.getInstance().unPause();
            WelcomePage_1.WelcomePage.manageBlurScreen(ClientSettings_1.BlurScreenActions.Remove);
        }
        else {
            WelcomePage_1.WelcomePage.manageBlurScreen(ClientSettings_1.BlurScreenActions.Remove);
        }
        if (this.showPasscodeTimeout) {
            clearTimeout(this.showPasscodeTimeout);
            this.showPasscodeTimeout = 0;
        }
    };
    CustomAppDelegate.prototype.applicationDidFinishLaunchingWithOptions = function (application, launchOptions) {
        Logger_1.Logger.instance.appDelegate.info('Inside applicationDidFinishLaunchingWithOptions app delegate method');
        var center = UNUserNotificationCenter.currentNotificationCenter();
        center.delegate = this;
        this._registerDefaultsFromSettingsBundle();
        return true;
    };
    CustomAppDelegate.prototype.applicationDidRegisterForRemoteNotificationsWithDeviceToken = function (application, deviceToken) {
        Logger_1.Logger.instance.appDelegate.info('Inside applicationDidRegisterForRemoteNotificationsWithDeviceToken app delegate method');
        mdk_sap_1.PushNotification.getInstance().didRegisterForRemoteNotifications(deviceToken);
    };
    CustomAppDelegate.prototype.applicationDidFailToRegisterForRemoteNotificationsWithError = function (application, error) {
        Logger_1.Logger.instance.appDelegate.info('Inside applicationDidFailToRegisterForRemoteNotificationsWithError app delegate method');
        mdk_sap_1.PushNotification.getInstance().didFailToRegisterNotifications(error);
    };
    CustomAppDelegate.prototype.userNotificationCenterWillPresentNotificationWithCompletionHandler = function (center, notification, completionHandler) {
        var payload = notification.request.content.userInfo;
        var eventData = {
            eventName: 'foregroundNotificationEvent',
            object: {
                PresentationOptions: {
                    Alert: 4,
                    All: 7,
                    Badge: 1,
                    None: 0,
                    Sound: 2,
                },
                badge: notification.request.content.badge,
                body: notification.request.content.body,
                completionHandler: completionHandler,
                payload: this._dictionaryToObject(payload),
                title: notification.request.content.title,
            },
        };
        this._unifyEventData(eventData);
        application.notify(eventData);
    };
    CustomAppDelegate.prototype.applicationDidReceiveRemoteNotificationFetchCompletionHandler = function (uiApplication, payload, completionHandler) {
        var oPayload = this._dictionaryToObject(payload);
        var eventData = {
            eventName: 'contentAvailableEvent',
            object: {
                FetchResult: {
                    Failed: 2,
                    NewData: 0,
                    NoData: 1,
                },
                badge: oPayload.aps.badge,
                body: oPayload.aps.alert.body,
                completionHandler: completionHandler,
                payload: oPayload,
                title: oPayload.aps.alert.title,
            },
        };
        this._unifyEventData(eventData);
        application.notify(eventData);
    };
    CustomAppDelegate.prototype.userNotificationCenterDidReceiveNotificationResponseWithCompletionHandler = function (center, response, completionHandler) {
        var actionIdentifier = response.actionIdentifier;
        var payload = response.notification.request.content.userInfo;
        var oPayload = this._dictionaryToObject(payload);
        var eventData = {
            eventName: 'receiveNotificationResponseEvent',
            object: {
                actionIdentifier: actionIdentifier,
                badge: oPayload.aps.badge,
                body: oPayload.aps.alert.body,
                completionHandler: completionHandler,
                payload: oPayload,
                title: oPayload.aps.alert.title,
            },
        };
        this._unifyEventData(eventData);
        application.notify(eventData);
    };
    CustomAppDelegate.prototype._unifyEventData = function (eventData) {
        var payload = eventData.object.payload;
        if (payload.data && typeof payload.data === 'string') {
            try {
                eventData.object.data = JSON.parse(payload.data);
            }
            catch (e) {
                var sData = payload.data.replace(/'/g, '"');
                try {
                    eventData.object.data = JSON.parse(sData);
                }
                catch (e) {
                    eventData.object.data = payload.data;
                }
            }
        }
        if (payload.aps.alert['title-loc-key'] ||
            payload.aps.alert['loc-key']) {
            payload.notification = payload.notification || {};
            payload.notification.titleLocKey = payload.aps.alert['title-loc-key'];
            payload.notification.titleLocArgs = payload.aps.alert['title-loc-args'];
            payload.notification.bodyLocKey = payload.aps.alert['loc-key'];
            payload.notification.bodyLocArgs = payload.aps.alert['loc-args'];
        }
    };
    CustomAppDelegate.prototype._dictionaryToObject = function (dict) {
        var jsonData = NSJSONSerialization.dataWithJSONObjectOptionsError(dict, 1);
        var jsonString = NSString.alloc().initWithBytesLengthEncoding(jsonData.bytes, jsonData.length, NSUTF8StringEncoding);
        return JSON.parse(jsonString.toString());
    };
    CustomAppDelegate.prototype._registerDefaultsFromSettingsBundle = function () {
        var settingsPath = NSBundle.mainBundle.pathForResourceOfType('Settings', 'bundle');
        var settingsBundle = NSString.stringWithString(settingsPath);
        var rootPath = settingsBundle.stringByAppendingPathComponent('Root.plist');
        var settings = NSDictionary.dictionaryWithContentsOfFile(rootPath);
        var preferences = settings.objectForKey('PreferenceSpecifiers');
        var prefs = preferences.count;
        var defaultsToRegister = NSMutableDictionary.alloc().initWithCapacity(prefs);
        var prefSpecification = null;
        var key = null;
        var value = null;
        for (var i = 0; i < prefs; i++) {
            prefSpecification = preferences.objectAtIndex(i);
            key = prefSpecification.objectForKey('Key');
            value = prefSpecification.objectForKey('DefaultValue');
            if (key && value) {
                defaultsToRegister.setObjectForKey(value, key);
            }
        }
        NSUserDefaults.standardUserDefaults.registerDefaults(defaultsToRegister);
        NSUserDefaults.standardUserDefaults.synchronize();
    };
    CustomAppDelegate.ObjCProtocols = [UIApplicationDelegate, UNUserNotificationCenterDelegate];
    CustomAppDelegate.isPasscodeScreenDisplaying = null;
    return CustomAppDelegate;
}(UIResponder));
exports.CustomAppDelegate = CustomAppDelegate;
; 
if ( true && global._isModuleLoadedForUI && global._isModuleLoadedForUI("./App_Delegates/CustomAppDelegate.ts") ) {
    
    module.hot.accept();
    module.hot.dispose(() => {
        global.hmrRefresh({ type: "script", path: "./App_Delegates/CustomAppDelegate.ts" });
    });
} 
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("../node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./App_Delegates/CustomEventHandler.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {
Object.defineProperty(exports, "__esModule", { value: true });
var Application_1 = __webpack_require__("./Application.ts");
var WelcomePage_1 = __webpack_require__("mdk-core/pages/WelcomePage");
var ClientSettings_1 = __webpack_require__("mdk-core/storage/ClientSettings");
var ClientSettings_2 = __webpack_require__("mdk-core/storage/ClientSettings");
var frameModule = __webpack_require__("tns-core-modules/ui/frame");
var Logger_1 = __webpack_require__("mdk-core/utils/Logger");
var application = __webpack_require__("tns-core-modules/application");
var MDKPage_1 = __webpack_require__("mdk-core/pages/MDKPage");
var EventHandler_1 = __webpack_require__("mdk-core/EventHandler");
var PageRenderer_1 = __webpack_require__("mdk-core/pages/PageRenderer");
var CustomEventHandler_1 = __webpack_require__("mdk-core/CustomEventHandler");
var I18nLanguage_1 = __webpack_require__("mdk-core/utils/I18nLanguage");
var CustomEventHandler = (function () {
    function CustomEventHandler() {
        this._showPasscodeTimeout = 0;
        this._resumedAct = null;
        this._pausedAct = null;
        this._lifecycleCallback = null;
    }
    CustomEventHandler._appSuspensionHelper = function () {
        if (ClientSettings_1.ClientSettings.isLiveMode() && Application_1.Application.isMainPageRendered() &&
            !CustomEventHandler_1.CustomEventHandler.isPasscodeScreenDisplaying &&
            CustomEventHandler_1.CustomEventHandler.displayPasscodeInputScreen) {
            WelcomePage_1.WelcomePage.applicationWillEnterBackground();
        }
        else {
            CustomEventHandler_1.CustomEventHandler.displayPasscodeInputScreen = false;
        }
    };
    CustomEventHandler.prototype.onAppResumed = function (args) {
        if (ClientSettings_1.ClientSettings.getPasscodeSource() === ClientSettings_2.PasscodeSource.UserOnboardedWithoutPasscode) {
            Application_1.Application.onResume(args);
            return;
        }
        if (ClientSettings_1.ClientSettings.isLiveMode() && Application_1.Application.isMainPageRendered() &&
            !CustomEventHandler_1.CustomEventHandler.isPasscodeScreenDisplaying && CustomEventHandler_1.CustomEventHandler.displayPasscodeInputScreen) {
            CustomEventHandler_1.CustomEventHandler.isPasscodeScreenDisplaying = true;
            WelcomePage_1.WelcomePage.applicationWillEnterForeground();
        }
        if (this._showPasscodeTimeout) {
            clearTimeout(this._showPasscodeTimeout);
            this._showPasscodeTimeout = 0;
            Application_1.Application.onResume(args);
        }
        if (ClientSettings_1.ClientSettings.isDemoMode()) {
            Application_1.Application.onResume(args);
        }
    };
    CustomEventHandler.prototype.onAppSuspended = function (args) {
        var _this = this;
        if (CustomEventHandler_1.CustomEventHandler.isPasscodeScreenDisplaying || ClientSettings_1.ClientSettings.isUserChangingPasscode) {
            CustomEventHandler_1.CustomEventHandler.isPasscodeScreenDisplaying = false;
            CustomEventHandler_1.CustomEventHandler.displayPasscodeInputScreen = true;
            return;
        }
        if (ClientSettings_1.ClientSettings.getPasscodeSource() === ClientSettings_2.PasscodeSource.UserOnboardedWithoutPasscode) {
            Application_1.Application.onSuspend(args);
            return;
        }
        setTimeout(function () {
            if (_this._resumedAct && _this._pausedAct &&
                _this._resumedAct.getClass().getSimpleName() === _this._pausedAct.getClass().getSimpleName()) {
                return;
            }
            if (_this._resumedAct && _this._pausedAct &&
                _this._resumedAct.getClass().getSimpleName().includes('ListPickerFormCellActivity') &&
                _this._pausedAct.getClass().getSimpleName() === 'MDKAndroidActivity') {
                return;
            }
            if (ClientSettings_1.ClientSettings.isLiveMode() && !CustomEventHandler_1.CustomEventHandler.displayPasscodeInputScreen) {
                var timeout = ClientSettings_1.ClientSettings.getPasscodeTimeout();
                if (timeout > 0) {
                    if (_this._showPasscodeTimeout) {
                        clearTimeout(_this._showPasscodeTimeout);
                    }
                    _this._showPasscodeTimeout = setTimeout(function () {
                        Application_1.Application.setOnboardingCompleted(false);
                        CustomEventHandler_1.CustomEventHandler.displayPasscodeInputScreen = true;
                        CustomEventHandler._appSuspensionHelper();
                    }, 1000 * timeout);
                    Application_1.Application.onSuspend(args);
                }
                else if (timeout === 0) {
                    Application_1.Application.onSuspend(args);
                    Application_1.Application.setOnboardingCompleted(false);
                    CustomEventHandler_1.CustomEventHandler.displayPasscodeInputScreen = true;
                    CustomEventHandler._appSuspensionHelper();
                }
            }
            if (ClientSettings_1.ClientSettings.isDemoMode()) {
                Application_1.Application.onSuspend(args);
            }
        }, 500);
    };
    CustomEventHandler.prototype.onAppLaunched = function (args) {
        var _this = this;
        if (Application_1.Application.isMainPageRendered()) {
            this.onAppResumed(args);
            return;
        }
        if (this._lifecycleCallback == null) {
            this._lifecycleCallback = new com.sap.mdk.client.ui.lifecycle.IMDKEventHandler({
                onAppResumed: function () {
                    var resumeEventData = {
                        android: {},
                        eventName: 'resumed',
                        object: application,
                    };
                    return _this.onAppResumed(resumeEventData);
                },
                onAppSuspended: function () {
                    var suspendEventData = {
                        android: {},
                        eventName: 'suspended',
                        object: application,
                    };
                    _this.onAppSuspended(suspendEventData);
                },
            });
            com.sap.mdk.client.ui.lifecycle.MDKLifecycleObserver.addObserver(this._lifecycleCallback);
        }
        if (ClientSettings_1.ClientSettings.isLiveMode() && !CustomEventHandler_1.CustomEventHandler.isReLaunchInProgress) {
            CustomEventHandler_1.CustomEventHandler.isReLaunchInProgress = true;
            if (ClientSettings_1.ClientSettings.getPasscodeSource() !== ClientSettings_2.PasscodeSource.UserOnboardedWithoutPasscode) {
                CustomEventHandler_1.CustomEventHandler.isPasscodeScreenDisplaying = true;
            }
            if (args.android.getData() !== null) {
                ClientSettings_1.ClientSettings.setConnecionInfoToastMessage(args.android.getData());
            }
            var oPage = new WelcomePage_1.WelcomePage();
            var onboardingParams = ClientSettings_1.ClientSettings.getOnboardingParams();
            var passcodeSrc = ClientSettings_1.ClientSettings.getPasscodeSource().toString();
            var passcodeSrcParam = {
                PasscodeSource: passcodeSrc,
            };
            onboardingParams = Object.assign(onboardingParams, passcodeSrcParam);
            WelcomePage_1.WelcomePage.restoreOnRelaunch(onboardingParams);
            this.activateAppLifeCycleCallbacks();
        }
        else if (!ClientSettings_1.ClientSettings.isLiveMode()) {
            if (args.android && args.android.getData && (args.android.getData() !== null)) {
                var launchUrl = args.android.getDataString();
                var startIdx = launchUrl.indexOf('?');
                if (startIdx > 0) {
                    Logger_1.Logger.instance.appDelegate.info(Logger_1.Logger.STARTUP_APP_LAUNCHED_VIA_URL, launchUrl);
                    if (ClientSettings_1.ClientSettings.isConnectionSettingsEnableOverrides()) {
                        ClientSettings_1.ClientSettings.processConnectionSettingsFromLaunchURL(launchUrl.substring(startIdx + 1));
                    }
                }
            }
        }
    };
    CustomEventHandler.prototype.onActivityResumed = function (args) {
        this._resumedAct = args.activity;
        if (ClientSettings_1.ClientSettings.getScreenSharingWithAndroidVersion()) {
            this._resumedAct.getWindow().clearFlags(android.view.WindowManager.LayoutParams.FLAG_SECURE);
        }
        else {
            this._resumedAct.getWindow().setFlags(android.view.WindowManager.LayoutParams.FLAG_SECURE, android.view.WindowManager.LayoutParams.FLAG_SECURE);
        }
        var activityType = this._resumedAct.getClass().getSimpleName();
        if (activityType === 'FingerprintActivity'
            || activityType === 'MDKAndroidActivity') {
            if (CustomEventHandler_1.CustomEventHandler.passcodeChangeActionComplete !== null) {
                WelcomePage_1.WelcomePage.fireChangeUserPasscodeSuccessOrFailureAction(CustomEventHandler_1.CustomEventHandler.passcodeChangeActionComplete);
                CustomEventHandler_1.CustomEventHandler.passcodeChangeActionComplete = null;
            }
            else if (CustomEventHandler_1.CustomEventHandler.passcodeVerifyActionComplete !== null) {
                WelcomePage_1.WelcomePage.fireVerifyPasscodeSuccessOrFailureAction(CustomEventHandler_1.CustomEventHandler.passcodeVerifyActionComplete);
                CustomEventHandler_1.CustomEventHandler.passcodeVerifyActionComplete = null;
            }
        }
        else if (activityType === 'MDKLaunchScreenActivity') {
            this.activateAppLifeCycleCallbacks();
        }
        var topFrame = frameModule.Frame.topmost();
        if (topFrame && topFrame.currentPage) {
            var mdkPage = topFrame.currentPage;
            if (mdkPage && mdkPage.isResuming) {
                mdkPage.isResuming = false;
                var onResumeEvent = mdkPage.definition.getOnResumeEvent();
                var handler = new EventHandler_1.EventHandler();
                handler.executeActionOrRule(onResumeEvent, mdkPage.context).then(function () {
                    PageRenderer_1.PageRenderer.currentlyRenderedPage = undefined;
                }).catch(function () {
                    PageRenderer_1.PageRenderer.currentlyRenderedPage = undefined;
                });
            }
        }
        var appLang = ClientSettings_1.ClientSettings.getAppLanguage();
        Application_1.Application.initializeLocalizationAndCustomization();
        if (activityType === 'WebViewActivity') {
            I18nLanguage_1.I18nLanguage.applyLanguage(appLang);
        }
        var isRTL;
        if (appLang !== undefined) {
            isRTL = ClientSettings_1.ClientSettings.getAppLanguageIsRTL();
            var foregroundAct = args.activity;
            var foregroundWindow = foregroundAct.getWindow();
            if (foregroundWindow) {
                var foregroundDecorView = foregroundWindow.getDecorView();
                if (foregroundDecorView) {
                    if (isRTL) {
                        foregroundDecorView.setLayoutDirection(android.view.View.LAYOUT_DIRECTION_RTL);
                    }
                    else {
                        foregroundDecorView.setLayoutDirection(android.view.View.LAYOUT_DIRECTION_LTR);
                    }
                }
            }
        }
    };
    CustomEventHandler.prototype.onActivityPaused = function (args) {
        var _this = this;
        this._pausedAct = args.activity;
        if (!ClientSettings_1.ClientSettings.getScreenSharing()) {
            this._pausedAct.getWindow().setFlags(android.view.WindowManager.LayoutParams.FLAG_SECURE, android.view.WindowManager.LayoutParams.FLAG_SECURE);
        }
        this._resumedAct = null;
        var act = args.activity.getClass().getSimpleName();
        if (act.includes('Passcode') || act === 'FingerprintActivity' || act.includes('ListPickerFormCellActivity')) {
            if (act.includes('ListPickerFormCellActivity')) {
                MDKPage_1.MDKPage.setDisplayingExternalPage(true);
            }
            setTimeout(function () {
                if (_this._resumedAct === null) {
                    if (ClientSettings_1.ClientSettings.isUserChangingPasscode) {
                        CustomEventHandler_1.CustomEventHandler.displayPasscodeInputScreen = false;
                        ClientSettings_1.ClientSettings.isUserChangingPasscode = false;
                    }
                    else if (CustomEventHandler_1.CustomEventHandler.isReLaunchInProgress) {
                        args.activity.finishAffinity();
                        frameModule.Frame.topmost().android.activity.finish();
                        CustomEventHandler_1.CustomEventHandler.isReLaunchInProgress = false;
                    }
                }
            }, 1000);
        }
        else {
            MDKPage_1.MDKPage.setDisplayingExternalPage(false);
        }
    };
    CustomEventHandler.prototype.onActivityResult = function (args) {
        switch (args.requestCode) {
            case ClientSettings_1.ActivityResultRequestCode.AttachmentFormCell:
            case ClientSettings_1.ActivityResultRequestCode.OpenDocument:
                Application_1.Application.setNonNSActivityDone(true);
                break;
            default:
                break;
        }
    };
    CustomEventHandler.prototype.activateAppLifeCycleCallbacks = function () {
        var _this = this;
        application.off(application.launchEvent);
        application.on(application.launchEvent, function (args) { return _this.onAppLaunched(args); });
    };
    return CustomEventHandler;
}());
exports.CustomEventHandler = CustomEventHandler;
; 
if ( true && global._isModuleLoadedForUI && global._isModuleLoadedForUI("./App_Delegates/CustomEventHandler.ts") ) {
    
    module.hot.accept();
    module.hot.dispose(() => {
        global.hmrRefresh({ type: "script", path: "./App_Delegates/CustomEventHandler.ts" });
    });
} 
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("../node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./Application.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {
Object.defineProperty(exports, "__esModule", { value: true });
var frame_1 = __webpack_require__("tns-core-modules/ui/frame");
var dialogs_1 = __webpack_require__("tns-core-modules/ui/dialogs");
var application = __webpack_require__("tns-core-modules/application");
var IContext = __webpack_require__("mdk-core/context/IContext");
var Context_1 = __webpack_require__("mdk-core/context/Context");
var ClientSettings_1 = __webpack_require__("mdk-core/storage/ClientSettings");
var ClientSettings_2 = __webpack_require__("mdk-core/storage/ClientSettings");
var PageRenderer_1 = __webpack_require__("mdk-core/pages/PageRenderer");
var MDKPage_1 = __webpack_require__("mdk-core/pages/MDKPage");
var DefinitionProvider_1 = __webpack_require__("mdk-core/definitions/DefinitionProvider");
var IDefinitionProvider_1 = __webpack_require__("mdk-core/definitions/IDefinitionProvider");
var EventHandler_1 = __webpack_require__("mdk-core/EventHandler");
var BundleDefinitionLoader_1 = __webpack_require__("./definitions/BundleDefinitionLoader.ts");
var DemoBundleDefinitionLoader_1 = __webpack_require__("./definitions/DemoBundleDefinitionLoader.ts");
var IDataService_1 = __webpack_require__("mdk-core/data/IDataService");
var ODataService_1 = __webpack_require__("mdk-core/data/ODataService");
var IRestService_1 = __webpack_require__("mdk-core/data/IRestService");
var RestService_1 = __webpack_require__("mdk-core/data/RestService");
var LifecycleManager_1 = __webpack_require__("./lifecycleManagement/LifecycleManager.ts");
var IActionFactory_1 = __webpack_require__("mdk-core/actions/IActionFactory");
var ActionFactory_1 = __webpack_require__("mdk-core/actions/ActionFactory");
var ISegmentFactory_1 = __webpack_require__("mdk-core/targetpath/segments/ISegmentFactory");
var SegmentFactory_1 = __webpack_require__("mdk-core/targetpath/segments/SegmentFactory");
var IControlFactory_1 = __webpack_require__("mdk-core/controls/IControlFactory");
var SecureStore_1 = __webpack_require__("mdk-core/storage/SecureStore");
var SDKStylingManager_1 = __webpack_require__("mdk-core/styling/SDKStylingManager");
var mdk_sap_1 = __webpack_require__("mdk-sap");
var mdk_sap_2 = __webpack_require__("mdk-sap");
var TypeConverter_1 = __webpack_require__("mdk-core/utils/TypeConverter");
var Logger_1 = __webpack_require__("mdk-core/utils/Logger");
var AppSettingsManager_1 = __webpack_require__("mdk-core/utils/AppSettingsManager");
var I18nLanguage_1 = __webpack_require__("mdk-core/utils/I18nLanguage");
var I18nHelper_1 = __webpack_require__("mdk-core/utils/I18nHelper");
var mdk_sap_3 = __webpack_require__("mdk-sap");
var fs = __webpack_require__("tns-core-modules/file-system");
var mdk_sap_4 = __webpack_require__("mdk-sap");
var mdk_sap_5 = __webpack_require__("mdk-sap");
var Paths_1 = __webpack_require__("./storage/Paths.ts");
var ModalFrame_1 = __webpack_require__("mdk-core/pages/ModalFrame");
var ControlFactorySync_1 = __webpack_require__("mdk-core/controls/ControlFactorySync");
var mdk_sap_6 = __webpack_require__("mdk-sap");
var ImageHelper_1 = __webpack_require__("mdk-core/utils/ImageHelper");
var TabFrame_1 = __webpack_require__("mdk-core/pages/TabFrame");
var mdk_sap_7 = __webpack_require__("mdk-sap");
var ApplicationDataBuilder_1 = __webpack_require__("mdk-core/builders/ApplicationDataBuilder");
var MDKNavigationType_1 = __webpack_require__("mdk-core/common/MDKNavigationType");
var nativescript_ui_sidedrawer_1 = __webpack_require__("nativescript-ui-sidedrawer");
var Application = (function () {
    function Application() {
    }
    Application.isMainPageRendered = function () {
        return this._mainPageRendered;
    };
    Application.setMainPageRendered = function (mainPageRendered) {
        this._mainPageRendered = mainPageRendered;
    };
    Application.isNonNSActivityDone = function () {
        return this._nonNSActivityDone;
    };
    Application.setNonNSActivityDone = function (nonNSActivityDone) {
        this._nonNSActivityDone = nonNSActivityDone;
    };
    Application.launchAppMainPage = function (didLaunchApp) {
        var _this = this;
        this.setOnboardingCompleted(true);
        Application.setOnResumeProcessing(false);
        return this._createSingletons().then(function () {
            AppSettingsManager_1.AppSettingsManager.instance().removePendingActions();
            var startupPage = Application._applicationParams.mainPage;
            _this.initializeLocalizationAndCustomization();
            var stylePath = Application._applicationParams.stylePath;
            if (stylePath) {
                var style = IDefinitionProvider_1.IDefinitionProvider.instance().getDefinition(stylePath);
                if (style) {
                    application.addCss(style.toString());
                    ClientSettings_1.ClientSettings.setUpdateCSSRuleSetFlag(true);
                }
            }
            var launchPromise;
            if (didLaunchApp) {
                if (PageRenderer_1.PageRenderer.appLevelSideDrawer !== undefined) {
                    launchPromise = PageRenderer_1.PageRenderer.appLevelSideDrawer.renderMainPage();
                }
                else {
                    launchPromise = PageRenderer_1.PageRenderer.pushNavigation(startupPage, true, MDKNavigationType_1.MDKNavigationType.Root);
                }
            }
            else {
                launchPromise = PageRenderer_1.PageRenderer.startupNavigation(startupPage, true);
            }
            if (application.android) {
                mdk_sap_2.ActivityIndicator.instance.setScreenSharing(ClientSettings_1.ClientSettings.getScreenSharingWithAndroidVersion());
            }
            return launchPromise.then(function (result) {
                Application._setupForApplicationLaunch(didLaunchApp, undefined);
                return result;
            }).catch(function (error) {
                Logger_1.Logger.instance.startup.error(Logger_1.Logger.ERROR, error, error.stack);
            });
        });
    };
    Application.onDidUpdate = function () {
        var handlerPath = Application._appDefinition.getOnDidUpdate();
        if (handlerPath) {
            return Application._executeWithHandlerPath(handlerPath, undefined);
        }
        else {
            return Promise.resolve();
        }
    };
    Application.onExit = function (appEventData) {
        Application.removeApplicationListener();
        Application.setOnboardingCompleted(false);
        Application.setMainPageRendered(false);
        var handlerPath = Application._appDefinition.getOnExit();
        return Application._executeWithHandlerPath(handlerPath, appEventData);
    };
    Application.onLaunch = function (appEventData) {
        var sHandlerPath = Application._appDefinition.getOnLaunch();
        return Application._executeWithHandlerPaths(TypeConverter_1.TypeConverter.toArray(sHandlerPath), appEventData).then(function () {
            if (ClientSettings_1.ClientSettings.isLiveMode()) {
                LifecycleManager_1.LifecycleManager.getInstance().start();
            }
        }).catch(function (error) {
            Logger_1.Logger.instance.startup.error(Logger_1.Logger.STARTUP_LAUNCH_FAILED, error);
            if (ClientSettings_1.ClientSettings.isLiveMode()) {
                LifecycleManager_1.LifecycleManager.getInstance().start();
            }
        }).then(function () {
            Application.setResumeEventDelayed(false);
        });
    };
    Application.onUnCaughtError = function (appEventData) {
        var handlerPath = Application._appDefinition.getOnUnCaughtError();
        Application._executeWithHandlerPath(handlerPath, appEventData);
    };
    Application.onSuspend = function (appEventData) {
        Application.setOnResumeProcessing(false);
        if (!ClientSettings_1.ClientSettings.isDemoMode() && !Application.isOnBoardingComleted()) {
            return null;
        }
        LifecycleManager_1.LifecycleManager.getInstance().stop();
        var handlerPath = Application._appDefinition.getOnSuspend();
        Application._executeWithHandlerPath(handlerPath, appEventData);
    };
    Application.onResume = function (appEventData) {
        if (Application.isOnResumeProcessing()) {
            return null;
        }
        if (!ClientSettings_1.ClientSettings.isDemoMode()) {
            if (!Application.isOnBoardingComleted() || Application.isResumeEventDelayed()) {
                Logger_1.Logger.instance.app.info("App onResume handler is to be delayed, setting the appEventData - " + appEventData);
                Application.setPendingResumeEventData(appEventData);
                return null;
            }
        }
        Application.setOnResumeProcessing(true);
        if (Application.isNonNSActivityDone() && appEventData.eventName !== 'relaunched') {
            LifecycleManager_1.LifecycleManager.getInstance().startDelayed();
            Application.setNonNSActivityDone(false);
        }
        else if (appEventData === null || appEventData === undefined || appEventData.eventName !== 'relaunched') {
            LifecycleManager_1.LifecycleManager.getInstance().start();
        }
        MDKPage_1.MDKPage.resetNavigateFlags();
        var hasDeviceLanguageChanged = false;
        var hasDeviceFontScaleChanged = false;
        var prevAppLanguage = I18nLanguage_1.I18nLanguage.getAppLanguage();
        var prevAppFontScale = ClientSettings_1.ClientSettings.getAppFontScale();
        Application.initializeLocalizationAndCustomization();
        var appLanguageSource = ClientSettings_1.ClientSettings.getAppLanguageSource();
        var currentAppLanguage = I18nLanguage_1.I18nLanguage.getAppLanguage();
        var currentAppFontScale = ClientSettings_1.ClientSettings.getAppFontScale();
        if (appLanguageSource === I18nLanguage_1.LanguageSource.DeviceSetting) {
            hasDeviceLanguageChanged = prevAppLanguage !== currentAppLanguage;
        }
        hasDeviceFontScaleChanged = prevAppFontScale !== currentAppFontScale;
        var definitionOnResumePromise;
        var handlerPath = Application._appDefinition.getOnResume();
        if (handlerPath) {
            definitionOnResumePromise = Application._executeWithHandlerPath(handlerPath, appEventData);
        }
        else {
            definitionOnResumePromise = Promise.resolve();
        }
        var topFrame = TabFrame_1.TabFrame.getCorrectTopmostFrame();
        definitionOnResumePromise.then(function () {
            if (application.android && (hasDeviceLanguageChanged || hasDeviceFontScaleChanged)) {
                if (topFrame) {
                    setTimeout(function () {
                        if (PageRenderer_1.PageRenderer.appLevelSideDrawer !== undefined) {
                            PageRenderer_1.PageRenderer.appLevelSideDrawer.renderMainPage();
                        }
                        else {
                            PageRenderer_1.PageRenderer.pushNavigation(Application._applicationParams.mainPage, true, MDKNavigationType_1.MDKNavigationType.Root);
                        }
                        Application.setOnResumeProcessing(false);
                    }, 0);
                }
            }
            else {
                if (topFrame && topFrame.currentPage) {
                    var mdkPage = topFrame.currentPage;
                    if (mdkPage && mdkPage.definition && mdkPage.definition.getOnResumeEvent()) {
                        if (application.android) {
                            mdkPage.isResuming = true;
                            Application.setOnResumeProcessing(false);
                        }
                        else {
                            var onResumeEvent = mdkPage.definition.getOnResumeEvent();
                            var handler = new EventHandler_1.EventHandler();
                            handler.executeActionOrRule(onResumeEvent, mdkPage.context).then(function () {
                                PageRenderer_1.PageRenderer.currentlyRenderedPage = undefined;
                                Application.setOnResumeProcessing(false);
                            }).catch(function () {
                                PageRenderer_1.PageRenderer.currentlyRenderedPage = undefined;
                                Application.setOnResumeProcessing(false);
                            });
                        }
                    }
                }
            }
        });
    };
    Application.prepareForPopoverRestore = function () {
        var topFrame = TabFrame_1.TabFrame.getCorrectTopmostFrame();
        if (topFrame && topFrame.currentPage) {
            var mdkPage = topFrame.currentPage;
            if (mdkPage) {
                if (mdkPage.popOverData) {
                    mdkPage.dismissPopoverForRestore();
                }
            }
        }
    };
    Application.completeForPopoverRestore = function () {
        var topFrame = TabFrame_1.TabFrame.getCorrectTopmostFrame();
        if (topFrame && topFrame.currentPage) {
            var mdkPage = topFrame.currentPage;
            if (mdkPage) {
                if (mdkPage.popOverData) {
                    mdkPage.restorePopover();
                }
                if (mdkPage.frame.popOverAnchorItem) {
                    mdkPage.updateModalPopoverAnchor();
                }
            }
        }
    };
    Application.onWillUpdate = function () {
        var handlerPath = Application._appDefinition.getOnWillUpdate();
        if (handlerPath) {
            return Application._executeWithHandlerPath(handlerPath, undefined);
        }
        else {
            return Promise.resolve();
        }
    };
    Application.onReceiveNotificationResponse = function (notification) {
        return new Promise(function (resolve, reject) {
            (function waitUntilInApp() {
                if (ClientSettings_1.ClientSettings.getOnboardingState() === ClientSettings_2.OnboardingState.Live
                    && Application.isOnBoardingComleted() && Application.isMainPageRendered()) {
                    return Application.onReceivePushNotification(notification).then(function () {
                        return resolve();
                    });
                }
                setTimeout(waitUntilInApp, 250);
            })();
        });
    };
    Application.onReceivePushNotification = function (notification) {
        var handlerPath = Application._appDefinition[notification.eventName + 'Handler'];
        var eventObj = notification.object;
        var payload = eventObj.payload;
        if (payload.notification && payload.notification.titleLocKey) {
            eventObj.title = I18nHelper_1.I18nHelper.localizeDefinitionText(payload.notification.titleLocKey, payload.notification.titleLocArgs, null);
        }
        if (payload.notification && payload.notification.bodyLocKey) {
            eventObj.body = I18nHelper_1.I18nHelper.localizeDefinitionText(payload.notification.bodyLocKey, payload.notification.bodyLocArgs, null);
        }
        if (typeof handlerPath === 'function') {
            handlerPath = handlerPath();
        }
        var completionHandler = notification.object.completionHandler;
        if (handlerPath) {
            return Application._executeWithHandlerPath(handlerPath, eventObj).then(function (result) {
                if (typeof result === 'number') {
                    completionHandler(result);
                }
                else {
                    completionHandler(0);
                }
                return result;
            });
        }
        else {
            if (eventObj.body) {
                dialogs_1.alert(eventObj.body);
            }
            else if (payload.data && payload.data.alert) {
                dialogs_1.alert(payload.data.alert);
            }
            else if (payload.aps && payload.aps.alert) {
                if (typeof payload.aps.alert === 'string') {
                    dialogs_1.alert(payload.aps.alert);
                }
                else if (typeof payload.aps.alert === 'object') {
                    dialogs_1.alert(payload.aps.alert.body);
                }
            }
            return Promise.resolve();
        }
    };
    Application.resetAppState = function () {
        LifecycleManager_1.LifecycleManager.getInstance().reset();
        ClientSettings_1.ClientSettings.reset();
        mdk_sap_4.LoggerManager.clearLog();
        SecureStore_1.SecureStore.getInstance().removeStore();
        this.setMainPageRendered(false);
    };
    Application.resetClient = function () {
        var _this = this;
        try {
            ImageHelper_1.ImageHelper.deleteCachedImages();
        }
        catch (err) {
            Logger_1.Logger.instance.core.error('Failed to clear cache directory: ', err);
        }
        try {
            mdk_sap_7.OpenDocumentBridge.getInstance().clearCache();
            Logger_1.Logger.instance.core.info('Cleared document cache directory');
        }
        catch (err) {
            Logger_1.Logger.instance.core.error("Failed to clear document cache directory: " + err);
        }
        if (IDataService_1.IDataService.isValid()) {
            IDataService_1.IDataService.instance().clearResolvedServiceInfo();
        }
        else {
            this.setODataService();
        }
        Application.removeApplicationListener();
        Application._resetFlags();
        var service = IDataService_1.IDataService.instance();
        var paths = new Set(ClientSettings_1.ClientSettings.getHistoricalODataServicePath());
        var promises = [];
        if (!ClientSettings_1.ClientSettings.isDemoMode()) {
            var applicationId = ClientSettings_1.ClientSettings.getAppId();
            var baseUrl = ClientSettings_1.ClientSettings.getCpmsUrl();
            mdk_sap_6.PushNotification.getInstance().unregisterForPushNotification(applicationId, baseUrl, null);
        }
        var serviceNames = ClientSettings_1.ClientSettings.getApplicationServicePaths();
        if (serviceNames && serviceNames.length > 0) {
            for (var _i = 0, serviceNames_1 = serviceNames; _i < serviceNames_1.length; _i++) {
                var serviceName = serviceNames_1[_i];
                if (IDefinitionProvider_1.IDefinitionProvider.instance().isDefinitionPathValid(serviceName) && service.offlineEnabled(serviceName)) {
                    var serviceUrl = serviceName ? service.urlForServiceName(serviceName) : undefined;
                    promises.push(this._resetClientHelper(service, serviceUrl));
                    if (serviceUrl !== undefined && paths.has(serviceUrl)) {
                        paths.delete(serviceUrl);
                    }
                }
            }
            ClientSettings_1.ClientSettings.setHistoricalODataServicePath(paths);
        }
        else {
            Application.resetAppState();
            return Promise.resolve();
        }
        return Promise.all(promises)
            .then(function (result) {
            return _this._clearHistoricalODataOfflineStore();
        }).then(function (result) {
            Application.resetAppState();
            Logger_1.Logger.instance.startup.log(Logger_1.Logger.STARTUP_STORE_CLIENT_RESET_SUCCEED);
            ClientSettings_1.ClientSettings.setApplicationServicePaths([]);
            mdk_sap_1.MessageDialog.getInstance().closeAll();
        }).catch(function (e) {
            Logger_1.Logger.instance.app.error(e);
        });
    };
    Application.start = function () {
        var _this = this;
        try {
            SDKStylingManager_1.SDKStylingManager.applyBrandingStyles();
            application.on('foregroundNotificationEvent', Application.onReceivePushNotification);
            application.on('contentAvailableEvent', Application.onReceivePushNotification);
            application.on('receiveNotificationResponseEvent', Application.onReceiveNotificationResponse);
            if (application.android) {
                application.android.on(application.AndroidApplication.activityBackPressedEvent, function (args) {
                    var triggerBackPressedHandler = true;
                    var topFrame = TabFrame_1.TabFrame.getCorrectTopmostFrame();
                    if (topFrame && topFrame.currentPage) {
                        var page = topFrame.currentPage;
                        if (page.hasListeners(application.AndroidApplication.activityBackPressedEvent)) {
                            triggerBackPressedHandler = false;
                            page.notify(args);
                        }
                    }
                    if (triggerBackPressedHandler) {
                        _this.activityBackPressedEventHandler(args);
                    }
                });
            }
            if (ClientSettings_1.ClientSettings.hasLogSettings()) {
                application.on(application.launchEvent, function () {
                    mdk_sap_4.LoggerManager.init(ClientSettings_1.ClientSettings.getLogFileName(), ClientSettings_1.ClientSettings.getLogFileSize());
                    var logger = mdk_sap_4.LoggerManager.getInstance();
                    var levelFromUserDefaults = logger.getLevelFromUserDefaults();
                    if (levelFromUserDefaults !== '') {
                        logger.setLevel(levelFromUserDefaults);
                    }
                    else {
                        logger.setLevel(ClientSettings_1.ClientSettings.getLogLevel());
                    }
                    logger.on();
                });
            }
            return this._setDefinitionProvider(undefined).then(function () {
                IContext.setFromPageFunction(Context_1.Context.fromPage);
                _this.initializeLocalizationAndCustomization();
                mdk_sap_1.NavigationBarBridge.applyFioriStyle();
                Application.context = new Context_1.Context({}, _this);
                if (!ClientSettings_1.ClientSettings.isDemoMode()) {
                    var promise = void 0;
                    if (ClientSettings_1.ClientSettings.isOnboardingInProgress()) {
                        promise = PageRenderer_1.PageRenderer.showWelcomePage();
                    }
                    else {
                        promise = PageRenderer_1.PageRenderer.showPasscodePage();
                    }
                    return promise;
                }
                else {
                    return Application.launchAppMainPage(false);
                }
            });
        }
        catch (error) {
            Logger_1.Logger.instance.startup.error(Logger_1.Logger.ERROR, error, error.stack);
            return Promise.reject(error);
        }
    };
    Application.startApplication = function (secretKeys) {
        if (ClientSettings_1.ClientSettings.isLiveMode()) {
            SecureStore_1.SecureStore.getInstance().setString('OFFLINE_STORE_ENCRYPTION_KEY', secretKeys.get('OfflineKey'));
            ClientSettings_1.ClientSettings.setPasscodeSource(secretKeys.get('PasscodeSource'));
        }
        this.setResumeEventDelayed(true);
        return Application.launchAppMainPage(true);
    };
    Application.update = function (bundlePath) {
        var _this = this;
        var isAppUpdating = false;
        if (!this._appDefinition) {
            return Promise.reject('No application definitions loaded');
        }
        if (!Application.isOnBoardingComleted()) {
            return Promise.reject('App update pending due to application is not running');
        }
        var previousServicePaths = ClientSettings_1.ClientSettings.getApplicationServicePaths();
        Application.setOnUpdateProcessing(true);
        return Application.onWillUpdate().then(function (result) {
            isAppUpdating = true;
            return _this._setDefinitionProvider(bundlePath).then(function () {
                return Application.doLoadMainPageAndDidUpdate().then(function () {
                    if (LifecycleManager_1.LifecycleManager.getInstance().promoteStagedVersion()) {
                        _this._setVersionInfo();
                    }
                    LifecycleManager_1.LifecycleManager.getInstance().startDelayed();
                }).catch(function (error) {
                    dialogs_1.alert(I18nHelper_1.I18nHelper.localizeMDKText('update_fail_roll_back') + (" " + error.message)).then(function () {
                        Application.setOnUpdateProcessing(false);
                        return _this._rollbackDefinitionProvider().then(function () {
                            LifecycleManager_1.LifecycleManager.getInstance().startDelayed();
                            Logger_1.Logger.instance.appUpdate.error(Logger_1.Logger.APPUPDATE_FAILED, error);
                            if (isAppUpdating) {
                                Logger_1.Logger.instance.appUpdate.log(Logger_1.Logger.APPUPDATE_ROLL_BACK_PREVIOUS, previousServicePaths.toString());
                                ClientSettings_1.ClientSettings.setApplicationServicePaths(previousServicePaths);
                                return Application.doLoadMainPageAndDidUpdate();
                            }
                        });
                    });
                });
            });
        }).catch(function (error) {
            Application.setOnUpdateProcessing(false);
            LifecycleManager_1.LifecycleManager.getInstance().startDelayed();
            Logger_1.Logger.instance.appUpdate.error(Logger_1.Logger.APPUPDATE_FAILED, error);
        });
    };
    Application.reInitializeLogger = function () {
        if (ClientSettings_1.ClientSettings.hasLogSettings()) {
            mdk_sap_4.LoggerManager.init(ClientSettings_1.ClientSettings.getLogFileName(), ClientSettings_1.ClientSettings.getLogFileSize());
            var logger = mdk_sap_4.LoggerManager.getInstance();
            logger.on();
            logger.setLevel(ClientSettings_1.ClientSettings.getLogLevel());
        }
    };
    Application.activityBackPressedEventHandler = function (args) {
        var topFrame = TabFrame_1.TabFrame.getCorrectTopmostFrame();
        if (this._shouldMoveTaskToBackground(topFrame)) {
            var moveTaskToBackground = true;
            if (TabFrame_1.TabFrame.isTab(topFrame)) {
                var parentPage = topFrame.parentPage;
                var parentFrame = parentPage.frame;
                if (!this._shouldMoveTaskToBackground(parentFrame)) {
                    moveTaskToBackground = false;
                }
            }
            if (moveTaskToBackground) {
                args.cancel = true;
                var activity = application.android.foregroundActivity;
                if (activity) {
                    if (activity.getClass().getSimpleName() === 'MDKAndroidActivity') {
                        activity.moveTaskToBack(false);
                    }
                }
            }
        }
    };
    Application.setOnboardingCompleted = function (completed) {
        this._onBoardingCompleted = completed;
    };
    Application.isOnBoardingComleted = function () {
        return this._onBoardingCompleted;
    };
    Application.setResumeEventDelayed = function (delayed) {
        this._resumeEventDelayed = delayed;
    };
    Application.isResumeEventDelayed = function () {
        return this._resumeEventDelayed;
    };
    Application.setPendingResumeEventData = function (eventData) {
        this._pendingResumeEventData = eventData;
    };
    Application.getPendingResumeEventData = function () {
        return this._pendingResumeEventData;
    };
    Application.isOnUpdateProcessing = function () {
        return this._onUpdateProcessing;
    };
    Application.setOnUpdateProcessing = function (flag) {
        this._onUpdateProcessing = flag;
    };
    Application.isOnResumeProcessing = function () {
        return this._onResumeProcessing;
    };
    Application.setOnResumeProcessing = function (flag) {
        this._onResumeProcessing = flag;
    };
    Application.initializeLocalizationAndCustomization = function () {
        I18nLanguage_1.I18nLanguage.loadAppLanguage();
        var params = ClientSettings_1.ClientSettings.getOnboardingCustomizations();
        mdk_sap_5.OnboardingCustomizationBridge.configOnboardingPages(params);
    };
    Application.getApplicationParams = function () {
        return this._applicationParams;
    };
    Application._createSingletons = function () {
        return this._setDefinitionProvider(undefined).then(function () {
            Application.setODataService();
            IActionFactory_1.IActionFactory.setCreateFunction(ActionFactory_1.ActionFactory.Create);
            IActionFactory_1.IActionFactory.setCreateActionRunnerFunction(ActionFactory_1.ActionFactory.CreateActionRunner);
            ISegmentFactory_1.ISegmentFactory.setBuildFunction(SegmentFactory_1.SegmentFactory.build);
            IControlFactory_1.IControlFactory.setCreateFunction(ControlFactorySync_1.ControlFactorySync.Create);
            IContext.setFromPageFunction(Context_1.Context.fromPage);
        });
    };
    Application.setODataService = function () {
        IDataService_1.IDataService.setInstance(new ODataService_1.ODataService());
        IRestService_1.IRestService.setInstance(new RestService_1.RestService());
    };
    Application._executeWithHandlerPaths = function (handlerPath, appEventData) {
        var promises = handlerPath.map(function (rule) {
            return Application._executeWithHandlerPath(rule, appEventData);
        });
        return Promise.all(promises);
    };
    Application._executeWithHandlerPath = function (handlerPath, appEventData) {
        if (handlerPath) {
            Context_1.Context.fromPage().clientAPIProps.appEventData = appEventData;
            var oEventHandler = new EventHandler_1.EventHandler();
            return oEventHandler.executeActionOrRule(handlerPath, Context_1.Context.fromPage()).catch(function (error) {
                Logger_1.Logger.instance.startup.error(Logger_1.Logger.STARTUP_EXECUTE_FAILED, handlerPath, error);
                throw new Error(error);
            });
        }
        else if (appEventData && appEventData.ios) {
            Logger_1.Logger.instance.startup.log(Logger_1.Logger.STARTUP_ERROR_IN_APPEVENTDATA_IOS, Application._appDefinition.getName(), appEventData.ios);
            Logger_1.Logger.instance.startup.log(Logger_1.Logger.STARTUP_STACKTRACE, appEventData.ios.stack);
            return Promise.reject(Application._appDefinition.getName() + ' Error ' + appEventData.ios);
        }
    };
    Application._launchStartupEvents = function (timeout) {
        return new Promise(function (resolve) {
            setTimeout(function () {
                return Application.onLaunch(undefined).then(function () {
                    resolve();
                });
            }, timeout);
        }).then(function () {
            if (PageRenderer_1.PageRenderer.appLevelSideDrawer !== undefined) {
                PageRenderer_1.PageRenderer.appLevelSideDrawer.redraw();
            }
        });
    };
    Application._resetClientHelper = function (service, serviceUrl, force) {
        if (force === void 0) { force = true; }
        return service.clearOfflineStore({ serviceUrl: serviceUrl, force: force }).then(function () {
        }).catch(function (e) {
            Logger_1.Logger.instance.app.error(e);
        });
    };
    Application._rollbackDefinitionProvider = function () {
        return this._setDefinitionProvider(LifecycleManager_1.LifecycleManager.getInstance().getCurrentDefinitionPath());
    };
    Application._setDefinitionProvider = function (definitionPath) {
        var _this = this;
        var currentDefinitionPath;
        var demoBundlePath;
        var bundleDefinitionLoader;
        if (ClientSettings_1.ClientSettings.isDemoMode()) {
            demoBundlePath = ClientSettings_1.ClientSettings.getDemoBundlePath();
            if (typeof demoBundlePath !== 'undefined' && demoBundlePath !== null && typeof demoBundlePath === 'string') {
                currentDefinitionPath = fs.path.join(Paths_1.Paths.getOverridePath(), demoBundlePath);
            }
            bundleDefinitionLoader = new DemoBundleDefinitionLoader_1.DemoBundleDefinitionLoader(currentDefinitionPath);
        }
        else {
            currentDefinitionPath = definitionPath ? definitionPath :
                LifecycleManager_1.LifecycleManager.getInstance().getCurrentDefinitionPath();
            bundleDefinitionLoader = new BundleDefinitionLoader_1.BundleDefinitionLoader(currentDefinitionPath);
        }
        return bundleDefinitionLoader.loadBundle().then(function () {
            IDefinitionProvider_1.IDefinitionProvider.setInstance(new DefinitionProvider_1.DefinitionProvider(bundleDefinitionLoader));
            _this._appDefinition = IDefinitionProvider_1.IDefinitionProvider.instance().getApplicationDefinition();
            return _this._resolveApplicationParams();
        });
    };
    Application._setupForApplicationLaunch = function (didLaunchApp, definitionPath) {
        application.on(application.uncaughtErrorEvent, Application.onUnCaughtError);
        application.on(application.exitEvent, Application.onExit);
        if (application.ios) {
            application.on(application.suspendEvent, Application.onSuspend);
            application.on(application.resumeEvent, Application.onResume);
        }
        this._setVersionInfo();
        var sdkStylePath = Application._applicationParams.sdkStylePath;
        if (sdkStylePath) {
            var sdkStyle = IDefinitionProvider_1.IDefinitionProvider.instance().getDefinition(sdkStylePath);
            if (sdkStyle) {
                var content = sdkStyle.toString();
                if (typeof (sdkStyle === 'object') && sdkStyle instanceof Array === false) {
                    content = JSON.stringify(sdkStyle);
                }
                SDKStylingManager_1.SDKStylingManager.saveSDKStyleFile(content).then(function () {
                    Logger_1.Logger.instance.startup.log(Logger_1.Logger.STARTUP_SUCCEED_APPLY_STYLES, sdkStylePath);
                    SDKStylingManager_1.SDKStylingManager.applySDKStyle();
                }, function (error) {
                    Logger_1.Logger.instance.startup.error(Logger_1.Logger.ERROR, error, error.stack);
                });
            }
        }
        if (didLaunchApp) {
            return Application._launchStartupEvents(1500).then(function () {
                Application.setMainPageRendered(true);
            });
        }
        else {
            return application.on(application.launchEvent, function () {
                return Application._launchStartupEvents(250);
            });
        }
    };
    Application.doLoadMainPageAndDidUpdate = function () {
        if (ModalFrame_1.ModalFrame.isTopMostModal()) {
            frame_1.Frame.topmost().closeModal();
        }
        else if (TabFrame_1.TabFrame.isTopMostTab()) {
            var topFrame = frame_1.Frame.topmost();
            if (topFrame && topFrame.currentPage && topFrame.currentPage.modal) {
                topFrame.currentPage.modal.closeModal();
            }
        }
        var stylePath = Application._applicationParams.stylePath;
        if (stylePath) {
            var style = IDefinitionProvider_1.IDefinitionProvider.instance().getDefinition(stylePath);
            if (style) {
                application.addCss(style.toString());
                ClientSettings_1.ClientSettings.setUpdateCSSRuleSetFlag(true);
                Logger_1.Logger.instance.appUpdate.log(Logger_1.Logger.APPUPDATE_SUCCESSFULLY_APPLY_STYLES, stylePath);
            }
        }
        var sdkStylePath = Application._applicationParams.sdkStylePath;
        if (sdkStylePath) {
            var sdkStyle = IDefinitionProvider_1.IDefinitionProvider.instance().getDefinition(sdkStylePath);
            if (sdkStyle) {
                var content = sdkStyle.toString();
                if (typeof (sdkStyle === 'object') && sdkStyle instanceof Array === false) {
                    content = JSON.stringify(sdkStyle);
                }
                SDKStylingManager_1.SDKStylingManager.saveSDKStyleFile(content).then(function () {
                    Logger_1.Logger.instance.appUpdate.log(Logger_1.Logger.APPUPDATE_SUCCESSFULLY_APPLY_SDK_STYLES, sdkStylePath);
                    SDKStylingManager_1.SDKStylingManager.applySDKStyle();
                }, function (error) {
                    Logger_1.Logger.instance.appUpdate.error(Logger_1.Logger.ERROR, error, error.stack);
                });
            }
        }
        this.initializeLocalizationAndCustomization();
        ClientSettings_1.ClientSettings.resetExtensionControlSourceMap();
        return this.resetApplicationRootViewIfSideDrawerChanged().then(function () {
            var launchPromise;
            var mainPage = Application._applicationParams.mainPage;
            if (PageRenderer_1.PageRenderer.appLevelSideDrawer !== undefined) {
                launchPromise = PageRenderer_1.PageRenderer.appLevelSideDrawer.renderMainPage();
            }
            else {
                launchPromise = PageRenderer_1.PageRenderer.pushNavigation(mainPage, true, MDKNavigationType_1.MDKNavigationType.Root);
            }
            return launchPromise.then(function () {
                return new Promise(function (resolve) {
                    setTimeout(resolve, 750);
                }).then(function () {
                    Application.setOnUpdateProcessing(true);
                    return Application.onDidUpdate().then(function (result) {
                        if (PageRenderer_1.PageRenderer.appLevelSideDrawer !== undefined) {
                            PageRenderer_1.PageRenderer.appLevelSideDrawer.redraw();
                        }
                        Application.setOnUpdateProcessing(false);
                        return Promise.resolve(result);
                    }).catch(function (error) {
                        Application.setOnUpdateProcessing(false);
                        return Promise.reject(error);
                    });
                });
            });
        });
    };
    Application.resetApplicationRootViewIfSideDrawerChanged = function () {
        var rootView = application.getRootView();
        var mainPageRef = Application._applicationParams.mainPage;
        return IDefinitionProvider_1.IDefinitionProvider.instance().getDefinition(mainPageRef).then(function (mainPageDef) {
            if (mainPageDef.getSideDrawer() !== undefined || rootView instanceof nativescript_ui_sidedrawer_1.RadSideDrawer) {
                return PageRenderer_1.PageRenderer.startupNavigation(undefined, false).then(function (rootEntry) {
                    application._resetRootView(rootEntry);
                });
            }
            else {
                return Promise.resolve();
            }
        });
    };
    Application._setVersionInfo = function () {
        if (Application._applicationParams.version) {
            if (application.android && !application.android.context) {
            }
            else {
                mdk_sap_3.VersionInfoBridge.setVersionInfo(Application._applicationParams.version);
            }
        }
    };
    Application._shouldMoveTaskToBackground = function (frame) {
        return frame && !ModalFrame_1.ModalFrame.isModal(frame) &&
            ((frame.backStack && frame.backStack.length === 0) || !frame.backStack);
    };
    Application.removeApplicationListener = function () {
        application.off(application.uncaughtErrorEvent, Application.onUnCaughtError);
        application.off(application.exitEvent, Application.onExit);
        if (application.ios) {
            application.off(application.suspendEvent, Application.onSuspend);
            application.off(application.resumeEvent, Application.onResume);
        }
    };
    Application._resetFlags = function () {
        Application.setOnboardingCompleted(false);
        Application.setOnUpdateProcessing(false);
        Application.setResumeEventDelayed(false);
        Application.setPendingResumeEventData(null);
    };
    Application._clearHistoricalODataOfflineStore = function () {
        var _this = this;
        var promises = [];
        var force = true;
        var _historicalODataServicePath = ClientSettings_1.ClientSettings.getHistoricalODataServicePath();
        var service = IDataService_1.IDataService.instance();
        _historicalODataServicePath.forEach(function (serviceUrl) {
            promises.push(_this._resetClientHelper(service, serviceUrl));
        });
        _historicalODataServicePath = new Set();
        ClientSettings_1.ClientSettings.setHistoricalODataServicePath(_historicalODataServicePath);
        return Promise.all(promises);
    };
    Application._resolveApplicationParams = function () {
        var builder = new ApplicationDataBuilder_1.ApplicationDataBuilder(Context_1.Context.fromPage());
        builder.setMainPage(this._appDefinition.getMainPage())
            .setStylePath(this._appDefinition.getStyles())
            .setSDKStylesPath(this._appDefinition.getSDKStyles())
            .setVersion(this._appDefinition.getVersion())
            .setLocalization(this._appDefinition.getLocalization());
        return builder.build().then(function (result) {
            if (result) {
                Application._applicationParams = result;
            }
        });
    };
    Application.context = null;
    Application._mainPageRendered = false;
    Application._nonNSActivityDone = false;
    Application._applicationParams = {
        mainPage: '',
        stylePath: '',
        sdkStylePath: '',
        version: '',
        localization: '',
    };
    Application._onBoardingCompleted = false;
    Application._resumeEventDelayed = false;
    Application._onExitIgnoreCount = 0;
    Application._onUpdateProcessing = false;
    Application._onResumeProcessing = false;
    return Application;
}());
exports.Application = Application;
; 
if ( true && global._isModuleLoadedForUI && global._isModuleLoadedForUI("./Application.ts") ) {
    
    module.hot.accept();
    module.hot.dispose(() => {
        global.hmrRefresh({ type: "script", path: "./Application.ts" });
    });
} 
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("../node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./app.css":
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {module.exports = {"type":"stylesheet","stylesheet":{"rules":[{"type":"comment","comment":" These are the client's default styles for built-in controls in Android "},{"type":"comment","comment":"\nThis style will apply to action bar if search is enabled.\nThis style is exposed.\n"},{"type":"rule","selectors":["ActionBarForSearch"],"declarations":[{"type":"declaration","property":"background-color","value":"#ffffff"}]},{"type":"rule","selectors":["TitleStyleForSearch"],"declarations":[{"type":"declaration","property":"color","value":"#ffffff"},{"type":"declaration","property":"background-color","value":"#808080"}]},{"type":"comment","comment":"\nThis style will apply to all Pages in the application.\nThis style is exposed.\n"},{"type":"rule","selectors":["ToolBar"],"declarations":[{"type":"declaration","property":"background-color","value":"#ffffff"},{"type":"declaration","property":"border-top-color","value":"#eeeeef"},{"type":"declaration","property":"border-top-width","value":"1"}]},{"type":"rule","selectors":["ToolBar :disabled"],"declarations":[{"type":"declaration","property":"color","value":"#808080"}]},{"type":"rule","selectors":["ToolBarItemStyle"],"declarations":[{"type":"declaration","property":"color","value":"#0A6ED1"},{"type":"declaration","property":"font-family","value":"\"f72_regular\", \"f72_bold\", \"f72_italic\", \"f72_bold_italic\""},{"type":"declaration","property":"font-size","value":"14sp"}]},{"type":"rule","selectors":["ToolBarItemDisabledStyle"],"declarations":[{"type":"declaration","property":"color","value":"#0A6ED1"},{"type":"declaration","property":"font-family","value":"\"f72_regular\", \"f72_bold\", \"f72_italic\", \"f72_bold_italic\""},{"type":"declaration","property":"font-size","value":"14sp"},{"type":"declaration","property":"opacity","value":"0.5"}]},{"type":"rule","selectors":["ToolBarItemPressedStyle"],"declarations":[{"type":"declaration","property":"color","value":"#e0eef6"}]},{"type":"rule","selectors":["ToolBarContainedItemStyle"],"declarations":[{"type":"declaration","property":"background-color","value":"#0A6ED1"},{"type":"declaration","property":"color","value":"#ffffff"},{"type":"declaration","property":"border-radius","value":"4"},{"type":"declaration","property":"margin-left","value":"16"},{"type":"declaration","property":"margin-right","value":"16"}]},{"type":"rule","selectors":["ToolBarContainedItemDisabledStyle"],"declarations":[{"type":"declaration","property":"background-color","value":"#0A6ED1"},{"type":"declaration","property":"color","value":"#ffffff"},{"type":"declaration","property":"border-radius","value":"4"},{"type":"declaration","property":"margin-left","value":"16"},{"type":"declaration","property":"margin-right","value":"16"},{"type":"declaration","property":"opacity","value":"0.5"}]},{"type":"rule","selectors":["ToolBarContainedItemPressedStyle"],"declarations":[{"type":"declaration","property":"color","value":"#2987be"}]},{"type":"comment","comment":"\nThis style will apply to all non-clickable toolbar items (labels) by default.\n"},{"type":"rule","selectors":["ToolBarLabelStyle"],"declarations":[{"type":"declaration","property":"color","value":"#333333"},{"type":"declaration","property":"font-family","value":"\"f72_regular\", \"f72_bold\", \"f72_italic\", \"f72_bold_italic\""},{"type":"declaration","property":"font-size","value":"16sp"},{"type":"declaration","property":"border-radius","value":"4"}]},{"type":"rule","selectors":["Button"],"declarations":[{"type":"declaration","property":"color","value":"#0a6ed1"}]},{"type":"rule","selectors":["TabStrip"],"declarations":[{"type":"declaration","property":"background-color","value":"#ffffff"},{"type":"declaration","property":"border-top-color","value":"#eeeeef"},{"type":"declaration","property":"border-top-width","value":"1"},{"type":"declaration","property":"selected-item-color","value":"#0A6ED1"},{"type":"declaration","property":"un-selected-item-color","value":"#6A6D70"}]},{"type":"rule","selectors":[".sap-icons"],"declarations":[{"type":"declaration","property":"font-family","value":"\"SAP-icons\""},{"type":"declaration","property":"font-weight","value":"900"}]},{"type":"rule","selectors":[".sap-icons-actionbar-x-small"],"declarations":[{"type":"declaration","property":"font-family","value":"\"SAP-icons\""},{"type":"declaration","property":"font-weight","value":"900"},{"type":"declaration","property":"font-size","value":"6"},{"type":"declaration","property":"color","value":"white"}]},{"type":"rule","selectors":[".sap-icons-actionbar-small"],"declarations":[{"type":"declaration","property":"font-family","value":"\"SAP-icons\""},{"type":"declaration","property":"font-weight","value":"900"},{"type":"declaration","property":"font-size","value":"8"},{"type":"declaration","property":"color","value":"white"}]},{"type":"rule","selectors":[".sap-icons-actionbar-medium"],"declarations":[{"type":"declaration","property":"font-family","value":"\"SAP-icons\""},{"type":"declaration","property":"font-weight","value":"900"},{"type":"declaration","property":"font-size","value":"10"},{"type":"declaration","property":"color","value":"white"}]},{"type":"rule","selectors":[".drawerContent"],"declarations":[{"type":"declaration","property":"background-color","value":"#ffffff"}]},{"type":"rule","selectors":[".sidedrawer-header"],"declarations":[{"type":"declaration","property":"height","value":"auto"},{"type":"declaration","property":"padding","value":"15"},{"type":"declaration","property":"border-bottom-width","value":"0.5"},{"type":"declaration","property":"border-bottom-color","value":"rgb(104, 103, 103)"}]},{"type":"rule","selectors":[".sidedrawer-header-icon"],"declarations":[{"type":"declaration","property":"width","value":"20%"},{"type":"declaration","property":"margin-bottom","value":"20"}]},{"type":"rule","selectors":[".sidedrawer-header-icon.ltr"],"declarations":[{"type":"declaration","property":"horizontal-align","value":"left"}]},{"type":"rule","selectors":[".sidedrawer-header-icon.rtl"],"declarations":[{"type":"declaration","property":"horizontal-align","value":"right"}]},{"type":"rule","selectors":[".sidedrawer-header-headline"],"declarations":[{"type":"declaration","property":"font-size","value":"20"},{"type":"declaration","property":"font-weight","value":"bold"},{"type":"declaration","property":"color","value":"black"}]},{"type":"rule","selectors":[".sidedrawer-header-subheadline"],"declarations":[{"type":"declaration","property":"font-size","value":"16"},{"type":"declaration","property":"font-weight","value":"500"}]},{"type":"rule","selectors":[".sidedrawer-section"],"declarations":[{"type":"declaration","property":"padding-bottom","value":"10"}]},{"type":"rule","selectors":[".sidedrawer-section-separator"],"declarations":[{"type":"declaration","property":"border-bottom-width","value":"0.5"},{"type":"declaration","property":"border-bottom-color","value":"rgb(104, 103, 103)"}]},{"type":"rule","selectors":[".sidedrawer-section-caption"],"declarations":[{"type":"declaration","property":"padding-bottom","value":"5"},{"type":"declaration","property":"padding-top","value":"5"},{"type":"declaration","property":"height","value":"40"},{"type":"declaration","property":"font-size","value":"16"},{"type":"declaration","property":"font-weight","value":"500"},{"type":"declaration","property":"color","value":"rgb(104, 103, 103)"},{"type":"declaration","property":"padding-top","value":"9"}]},{"type":"rule","selectors":[".sidedrawer-section-caption.ltr"],"declarations":[{"type":"declaration","property":"padding-left","value":"15"}]},{"type":"rule","selectors":[".sidedrawer-section-caption.rtl"],"declarations":[{"type":"declaration","property":"padding-right","value":"15"}]},{"type":"rule","selectors":[".sidedrawer-list-item"],"declarations":[{"type":"declaration","property":"color","value":"black"},{"type":"declaration","property":"padding-left","value":"20"},{"type":"declaration","property":"padding-right","value":"10"}]},{"type":"rule","selectors":[".sidedrawer-list-item-active"],"declarations":[{"type":"declaration","property":"padding-left","value":"20"},{"type":"declaration","property":"padding-right","value":"10"},{"type":"declaration","property":"color","value":"white"},{"type":"declaration","property":"background-color","value":"#0A6ED1"}]},{"type":"rule","selectors":[".sidedrawer-list-item-onpress"],"declarations":[{"type":"declaration","property":"background-color","value":"rgb(235, 231, 231)"},{"type":"declaration","property":"color","value":"black"},{"type":"declaration","property":"padding-left","value":"20"},{"type":"declaration","property":"padding-right","value":"10"}]},{"type":"rule","selectors":[".sidedrawer-list-item-icon"],"declarations":[{"type":"declaration","property":"height","value":"24"},{"type":"declaration","property":"width","value":"10%"},{"type":"declaration","property":"margin-right","value":"20"}]},{"type":"rule","selectors":[".sidedrawer-list-item-title"],"declarations":[{"type":"declaration","property":"font-size","value":"16"},{"type":"declaration","property":"height","value":"40"},{"type":"declaration","property":"font-weight","value":"500"},{"type":"declaration","property":"padding-top","value":"9"}]}],"parsingErrors":[]}};; 
if ( true && global._isModuleLoadedForUI && global._isModuleLoadedForUI("./app.css") ) {
    
    module.hot.accept();
    module.hot.dispose(() => {
        global.hmrRefresh({ type: "style", path: "./app.css" });
    });
} 
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("../node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./app.ts":
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {
        const isAndroid = __webpack_require__("@nativescript/core").isAndroid;
        if (isAndroid && !global["__snapshot"]) {
            __webpack_require__("@nativescript/core/ui/frame");
__webpack_require__("@nativescript/core/ui/frame/activity");
__webpack_require__("./MDKAndroidActivity.ts");
        }

        
            __webpack_require__("../node_modules/@nativescript/webpack/helpers/load-application-css-regular.js")();
            
            
        if (true) {
            const hmrUpdate = __webpack_require__("../node_modules/@nativescript/webpack/hmr/index.js").hmrUpdate;
            global.__coreModulesLiveSync = global.__onLiveSync;

            global.__onLiveSync = function () {
                // handle hot updated on LiveSync
                hmrUpdate();
            };

            global.hmrRefresh = function({ type, path } = {}) {
                // the hot updates are applied, ask the modules to apply the changes
                setTimeout(() => {
                    global.__coreModulesLiveSync({ type, path });
                });
            };

            // handle hot updated on initial app start
            hmrUpdate();
        }
        
            const context = __webpack_require__("./ sync recursive (?<!\\.\\/MDKAndroidApplication)(?<!\\.\\/app\\.ts)(?<!\\bApp_Resources\\b.*)(?<!\\.\\/\\btests\\b\\/.*?)\\.(xml|css|js|(?<!\\.d\\.)ts|(?<!\\b_[\\w-]*\\.)scss)$");
            global.registerWebpackModules(context);
            if (true) {
                module.hot.accept(context.id, () => { 
                    console.log("HMR: Accept module '" + context.id + "' from '" + module.i + "'"); 
                });
            }
            
        __webpack_require__("@nativescript/core/bundle-entry-points");
        "use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var application = __webpack_require__("tns-core-modules/application");
var trace_1 = __webpack_require__("tns-core-modules/trace");
var Application_1 = __webpack_require__("mdk-core/Application");
var Application_2 = __webpack_require__("./Application.ts");
var LifecycleManager_1 = __webpack_require__("mdk-core/lifecycleManagement/LifecycleManager");
var LifecycleManager_2 = __webpack_require__("./lifecycleManagement/LifecycleManager.ts");
var Paths_1 = __webpack_require__("mdk-core/storage/Paths");
var Paths_2 = __webpack_require__("./storage/Paths.ts");
var CustomEventHandler_1 = __webpack_require__("./App_Delegates/CustomEventHandler.ts");
var ClientSettings_1 = __webpack_require__("mdk-core/storage/ClientSettings");
var DemoBundleDefinitionLoader_1 = __webpack_require__("mdk-core/definitions/DemoBundleDefinitionLoader");
var DemoBundleDefinitionLoader_2 = __webpack_require__("./definitions/DemoBundleDefinitionLoader.ts");
var RequireUtil_1 = __webpack_require__("mdk-core/utils/RequireUtil");
var ConsoleWriter_1 = __webpack_require__("mdk-core/utils/ConsoleWriter");
Application_1.Application.setApplication(Application_2.Application);
LifecycleManager_1.LifecycleManager.setInstance(LifecycleManager_2.LifecycleManager.getInstance());
Paths_1.Paths.setClass(Paths_2.Paths);
DemoBundleDefinitionLoader_1.DemoBundleDefinitionLoader.setLoader(DemoBundleDefinitionLoader_2.DemoBundleDefinitionLoader);
RequireUtil_1.RequireUtil.setRequire(global.loadModule);
global['mdkRequire'] = RequireUtil_1.RequireUtil.require;
if (ClientSettings_1.ClientSettings.getTracingEnabled()) {
    var traceCategories_1 = '';
    ClientSettings_1.ClientSettings.getTracingCategories().forEach(function (category) {
        traceCategories_1 = trace_1.categories.concat(traceCategories_1, category);
    });
    trace_1.enable();
    trace_1.setCategories(traceCategories_1);
    trace_1.clearWriters();
    trace_1.addWriter(new ConsoleWriter_1.ConsoleWriter(traceCategories_1));
}
if (application.ios) {
    var customAppDelegate = __webpack_require__("./App_Delegates/CustomAppDelegate.ts");
    application.ios.delegate = customAppDelegate.CustomAppDelegate;
}
else if (application.android) {
    var custHander_1 = new CustomEventHandler_1.CustomEventHandler();
    application.on(application.launchEvent, function (args) { return custHander_1.onAppLaunched(args); });
    application.android.on(application.AndroidApplication.activityResumedEvent, function (args) { return custHander_1.onActivityResumed(args); });
    application.android.on(application.AndroidApplication.activityPausedEvent, function (args) { return custHander_1.onActivityPaused(args); });
    application.android.on(application.AndroidApplication.activityResultEvent, function (args) { return custHander_1.onActivityResult(args); });
}
application.loadAppCss();
Application_2.Application.start().then(function (navigation) {
    application.run(navigation);
});
; 
if ( true && global._isModuleLoadedForUI && global._isModuleLoadedForUI("./app.ts") ) {
    
    module.hot.accept();
    module.hot.dispose(() => {
        global.hmrRefresh({ type: "script", path: "./app.ts" });
    });
} 
    
        
        
    
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("../node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./definitions/BundleDefinitionLoader.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {
Object.defineProperty(exports, "__esModule", { value: true });
var fs = __webpack_require__("tns-core-modules/file-system");
var PathToExportName = __webpack_require__("mdk-core/definitions/PathToExportName");
var Logger_1 = __webpack_require__("mdk-core/utils/Logger");
var BundleDefinitionLoader = (function () {
    function BundleDefinitionLoader(bundlePath) {
        this.bundlePath = bundlePath;
        this.mdkApplication = undefined;
    }
    BundleDefinitionLoader.bundleExist = function (bundlePath) {
        return fs.File.exists(bundlePath);
    };
    BundleDefinitionLoader.validLocationExists = function () {
        return this.bundleExist(BundleDefinitionLoader.BUNDLE_PATH) ||
            this.bundleExist(BundleDefinitionLoader.DEFAULT_BUNDLE_PATH);
    };
    BundleDefinitionLoader.prototype.getLocalizationResourceList = function () {
        if (this.mdkApplication) {
            return Object.keys(this.mdkApplication)
                .filter(function (key) { return key.indexOf('_i18n_') >= 0 && key.indexOf('_properties') > key.indexOf('_i18n_') &&
                key.indexOf('_extensions_') < 0; });
        }
    };
    BundleDefinitionLoader.prototype.loadJsonDefinition = function (sPath) {
        return Promise.resolve(this.loadDefinition(sPath));
    };
    BundleDefinitionLoader.prototype.loadJsDefinition = function (sPath) {
        return Promise.resolve(this.loadDefinition(sPath));
    };
    BundleDefinitionLoader.prototype.loadDefinition = function (sApplicationReference) {
        if (!sApplicationReference) {
            sApplicationReference = './Application.app';
        }
        var sName = PathToExportName.pathToExportName(sApplicationReference, this.mdkApplication.version_mdkbundlerversion);
        return this.mdkApplication[sName];
    };
    BundleDefinitionLoader.prototype.loadBundle = function () {
        var sourceBundlePath;
        var paths = [];
        if (this.bundlePath) {
            paths.push(this.bundlePath);
        }
        paths.push(this.getBundleLocation());
        paths.push(this.getDefaultLocation());
        for (var _i = 0, paths_1 = paths; _i < paths_1.length; _i++) {
            var path = paths_1[_i];
            if (BundleDefinitionLoader.bundleExist(path)) {
                sourceBundlePath = path;
                break;
            }
        }
        if (!sourceBundlePath) {
            Logger_1.Logger.instance.definitionLoader.error(Logger_1.Logger.DEFINITIONLOADER_APPLICATION_DEFINITIONS_NOT_FOUND);
            this.mdkApplication = [];
            return Promise.resolve();
        }
        Logger_1.Logger.instance.definitionLoader.log(Logger_1.Logger.DEFINITIONLOADER_LOADING_DEFINITIONS, sourceBundlePath);
        this.mdkApplication = global.require(sourceBundlePath);
        return Promise.resolve();
    };
    BundleDefinitionLoader.prototype.getBundleLocation = function () {
        return BundleDefinitionLoader.BUNDLE_PATH;
    };
    BundleDefinitionLoader.prototype.getDefaultLocation = function () {
        return BundleDefinitionLoader.DEFAULT_BUNDLE_PATH;
    };
    BundleDefinitionLoader.BUNDLE_PATH = fs.path.join(fs.knownFolders.currentApp().path, 'bundle.js');
    BundleDefinitionLoader.DEFAULT_BUNDLE_PATH = fs.path.join(fs.knownFolders.currentApp().path, 'default.js');
    return BundleDefinitionLoader;
}());
exports.BundleDefinitionLoader = BundleDefinitionLoader;
; 
if ( true && global._isModuleLoadedForUI && global._isModuleLoadedForUI("./definitions/BundleDefinitionLoader.ts") ) {
    
    module.hot.accept();
    module.hot.dispose(() => {
        global.hmrRefresh({ type: "script", path: "./definitions/BundleDefinitionLoader.ts" });
    });
} 
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("../node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./definitions/DemoBundleDefinitionLoader.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {
Object.defineProperty(exports, "__esModule", { value: true });
var BundleDefinitionLoader_1 = __webpack_require__("./definitions/BundleDefinitionLoader.ts");
var fs = __webpack_require__("tns-core-modules/file-system");
var DemoBundleDefinitionLoader = (function (_super) {
    __extends(DemoBundleDefinitionLoader, _super);
    function DemoBundleDefinitionLoader(bundlePath) {
        return _super.call(this, bundlePath) || this;
    }
    DemoBundleDefinitionLoader.validLocationExists = function () {
        return BundleDefinitionLoader_1.BundleDefinitionLoader.bundleExist(DemoBundleDefinitionLoader.DEMO_BUNDLE_PATH);
    };
    DemoBundleDefinitionLoader.prototype.getBundleLocation = function () {
        return DemoBundleDefinitionLoader.DEMO_BUNDLE_PATH;
    };
    DemoBundleDefinitionLoader.prototype.getDefaultLocation = function () {
        return undefined;
    };
    DemoBundleDefinitionLoader.DEMO_BUNDLE_PATH = fs.path.join(fs.knownFolders.currentApp().path, 'demo.js');
    return DemoBundleDefinitionLoader;
}(BundleDefinitionLoader_1.BundleDefinitionLoader));
exports.DemoBundleDefinitionLoader = DemoBundleDefinitionLoader;
; 
if ( true && global._isModuleLoadedForUI && global._isModuleLoadedForUI("./definitions/DemoBundleDefinitionLoader.ts") ) {
    
    module.hot.accept();
    module.hot.dispose(() => {
        global.hmrRefresh({ type: "script", path: "./definitions/DemoBundleDefinitionLoader.ts" });
    });
} 
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("../node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./lifecycleManagement/AppExtractHelper.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {
Object.defineProperty(exports, "__esModule", { value: true });
var zip_plugin_1 = __webpack_require__("zip-plugin");
var fs = __webpack_require__("tns-core-modules/file-system");
var Logger_1 = __webpack_require__("mdk-core/utils/Logger");
var RequireUtil_1 = __webpack_require__("mdk-core/utils/RequireUtil");
var AppExtractHelper = (function () {
    function AppExtractHelper() {
    }
    AppExtractHelper.getInstance = function () {
        return AppExtractHelper._instance;
    };
    AppExtractHelper.prototype.extract = function (msg) {
        var error;
        this.zipSource = msg.data.zipSource;
        this.zipDest = msg.data.zipDestPath;
        var bundleDest = msg.data.bundleDest;
        Logger_1.Logger.instance.core.info('Unzip started: from ' + this.zipSource + ' to ' + this.zipDest);
        zip_plugin_1.Zip.unzip(this.zipSource, this.zipDest);
        var bundleSourcePath = fs.path.join(this.zipDest, 'bundle.js');
        error = this._moveBundleFile(bundleSourcePath, bundleDest, function (sContents) {
            return RequireUtil_1.RequireUtil.replaceMdkRequire(sContents);
        });
        if (!error) {
            this._moveBundleFile(fs.path.join(this.zipDest, 'bundle.js.map'), bundleDest + '.map');
        }
        return error;
    };
    AppExtractHelper.prototype.removeFolder = function () {
        var extractedZipFolder = fs.Folder.fromPath(this.zipDest);
        extractedZipFolder.removeSync(function (e) {
            Logger_1.Logger.instance.core.error("Failed to remove extracted zip folder: " + e);
        });
    };
    AppExtractHelper.prototype.removeDownloadedZipFile = function () {
        var zipSourceFile = fs.File.fromPath(this.zipSource);
        zipSourceFile.removeSync(function (e) {
            Logger_1.Logger.instance.core.error("Failed to remove temp download zip: " + e);
        });
    };
    AppExtractHelper.prototype._moveBundleFile = function (bundleSourcePath, bundleDest, cb) {
        var error;
        var bundleExists = fs.File.exists(bundleSourcePath);
        var bundleSourceFile;
        var bundleSourceData;
        if (bundleExists) {
            bundleSourceFile = fs.File.fromPath(bundleSourcePath);
        }
        else {
            error = bundleSourcePath + ' does not exist';
        }
        if (!error) {
            bundleSourceData = bundleSourceFile.readTextSync(function (e) {
                error = e;
                Logger_1.Logger.instance.core.error("App download file read failed: " + error);
            });
        }
        if (!error) {
            if (cb) {
                bundleSourceData = cb(bundleSourceData);
            }
            var bundleDesthFile = fs.File.fromPath(bundleDest);
            bundleDesthFile.writeTextSync(bundleSourceData, function (e) {
                error = e;
                Logger_1.Logger.instance.core.error("App download file write failed: " + error);
            });
        }
        return error;
    };
    AppExtractHelper._instance = new AppExtractHelper();
    return AppExtractHelper;
}());
exports.AppExtractHelper = AppExtractHelper;
; 
if ( true && global._isModuleLoadedForUI && global._isModuleLoadedForUI("./lifecycleManagement/AppExtractHelper.ts") ) {
    
    module.hot.accept();
    module.hot.dispose(() => {
        global.hmrRefresh({ type: "script", path: "./lifecycleManagement/AppExtractHelper.ts" });
    });
} 
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("../node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./lifecycleManagement/AppExtractWorker.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {
Object.defineProperty(exports, "__esModule", { value: true });
__webpack_require__("tns-core-modules/globals");
var AppExtractHelper_1 = __webpack_require__("./lifecycleManagement/AppExtractHelper.ts");
var context = self;
context.onmessage = function (msg) {
    setTimeout(function () {
        var error = AppExtractHelper_1.AppExtractHelper.getInstance().extract(msg);
        global.postMessage({ err: error });
        AppExtractHelper_1.AppExtractHelper.getInstance().removeFolder();
        AppExtractHelper_1.AppExtractHelper.getInstance().removeDownloadedZipFile();
    }, 500);
};
; 
if ( true && global._isModuleLoadedForUI && global._isModuleLoadedForUI("./lifecycleManagement/AppExtractWorker.ts") ) {
    
    module.hot.accept();
    module.hot.dispose(() => {
        global.hmrRefresh({ type: "script", path: "./lifecycleManagement/AppExtractWorker.ts" });
    });
} 
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("../node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./lifecycleManagement/LifecycleAppVersionInfo.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {
Object.defineProperty(exports, "__esModule", { value: true });
var xml = __webpack_require__("tns-core-modules/xml");
var Logger_1 = __webpack_require__("mdk-core/utils/Logger");
var LifecycleAppVersionInfo = (function () {
    function LifecycleAppVersionInfo(lcmsVersionXml) {
        this.parse(lcmsVersionXml);
    }
    Object.defineProperty(LifecycleAppVersionInfo.prototype, "url", {
        get: function () {
            return this._url;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LifecycleAppVersionInfo.prototype, "revision", {
        get: function () {
            return this._revision;
        },
        enumerable: true,
        configurable: true
    });
    LifecycleAppVersionInfo.prototype.parse = function (lcmsVersionXml) {
        var _this = this;
        this._url = undefined;
        this._revision = undefined;
        var currentElementName;
        var currentText;
        var xmlParser = new xml.XmlParser(function (event) {
            switch (event.eventType) {
                case xml.ParserEventType.StartElement:
                    currentElementName = event.elementName;
                    break;
                case xml.ParserEventType.EndElement:
                    if (currentElementName === 'd:Revision') {
                        _this._revision = Number(currentText);
                    }
                    else if (currentElementName === 'd:Path') {
                        _this._url = currentText;
                    }
                    currentElementName = undefined;
                    currentText = undefined;
                    break;
                case xml.ParserEventType.Text:
                    currentText = event.data.trim();
                    break;
                default:
                    Logger_1.Logger.instance.lcms.error("Invalid event type onXmlEventCallback " + event.eventType);
            }
        }, function (error) {
            Logger_1.Logger.instance.lcms.error("Error parsing XML: " + error);
            _this._url = undefined;
            _this._revision = undefined;
        });
        xmlParser.parse(lcmsVersionXml);
        Logger_1.Logger.instance.lcms.info('LCMS version data parsed');
        Logger_1.Logger.instance.lcms.info("\tlatest revision: " + this._revision + " | url: " + this._url);
    };
    return LifecycleAppVersionInfo;
}());
exports.LifecycleAppVersionInfo = LifecycleAppVersionInfo;
; 
if ( true && global._isModuleLoadedForUI && global._isModuleLoadedForUI("./lifecycleManagement/LifecycleAppVersionInfo.ts") ) {
    
    module.hot.accept();
    module.hot.dispose(() => {
        global.hmrRefresh({ type: "script", path: "./lifecycleManagement/LifecycleAppVersionInfo.ts" });
    });
} 
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("../node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./lifecycleManagement/LifecycleManager.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {
Object.defineProperty(exports, "__esModule", { value: true });
var timer = __webpack_require__("tns-core-modules/timer");
var fs = __webpack_require__("tns-core-modules/file-system");
var Application_1 = __webpack_require__("./Application.ts");
var LifecycleAppVersionInfo_1 = __webpack_require__("./lifecycleManagement/LifecycleAppVersionInfo.ts");
var ClientSettings_1 = __webpack_require__("mdk-core/storage/ClientSettings");
var mdk_sap_1 = __webpack_require__("mdk-sap");
var ErrorMessage_1 = __webpack_require__("mdk-core/errorHandling/ErrorMessage");
var Logger_1 = __webpack_require__("mdk-core/utils/Logger");
var RequireUtil_1 = __webpack_require__("mdk-core/utils/RequireUtil");
var observable_1 = __webpack_require__("tns-core-modules/data/observable/observable");
var TsWorker = __webpack_require__("../node_modules/nativescript-worker-loader/index.js!./lifecycleManagement/AppExtractWorker.ts");
var States;
(function (States) {
    States[States["Running"] = 0] = "Running";
    States[States["Paused"] = 1] = "Paused";
    States[States["Pending"] = 2] = "Pending";
    States[States["Stopped"] = 3] = "Stopped";
})(States || (States = {}));
;
var ActionStatus;
(function (ActionStatus) {
    ActionStatus[ActionStatus["Success"] = 0] = "Success";
    ActionStatus[ActionStatus["Failure"] = 1] = "Failure";
})(ActionStatus || (ActionStatus = {}));
var LifecycleManager = (function () {
    function LifecycleManager() {
        var _this = this;
        this._state = States.Stopped;
        this._appDownloadErrorCount = 0;
        this._isActionRunning = false;
        this.versionChecker = function () {
            if (Application_1.Application.isOnUpdateProcessing()) {
                _this.setState(States.Stopped);
                return;
            }
            if (_this.isStopped()) {
                _this.setState(States.Stopped);
                return Promise.resolve('LCMS Stopped due to Application updating');
            }
            if (_this.isPaused() || _this.isPending()) {
                _this.setState(States.Pending);
                Logger_1.Logger.instance.lcms.log('Version checker request initiated when not active, queuing up request');
                return Promise.resolve('LCMS Paused, queuing version checker request');
            }
            var requestUrl = _this.getVersionCheckUrl();
            var param = { 'header': { 'Accept': 'application/xml,application/atom+xml' } };
            var appId = ClientSettings_1.ClientSettings.getAppId();
            Logger_1.Logger.instance.lcms.info("Requesting LCMS version info: " + requestUrl + " with header X-SMP-APPID: " + appId);
            timer.clearTimeout(_this._timerId);
            return mdk_sap_1.CpmsSession.getInstance().sendRequest(requestUrl, param)
                .then(function (response) {
                if (response.statusCode === 200) {
                    Logger_1.Logger.instance.lcms.info("Response Recieved, httpStatus: " + response.statusCode);
                    _this.handleVersionInfo(response.content.toString());
                }
                else {
                    var versionResponseText = 'LCMS GET Version Response Error Response Status:';
                    var bodyText = "Body: " + response.content.toString();
                    if (bodyText.indexOf('<code>NotFoundException</code>') > 0) {
                        _this.setAppUpdateStatus(ActionStatus.Success, 'AppUpdate is not enabled or no revision found from backend');
                    }
                    else {
                        _this.setAppUpdateStatus(ActionStatus.Failure, versionResponseText + " " + response.statusCode + " | " + bodyText);
                    }
                    Logger_1.Logger.instance.lcms.error(versionResponseText + " " + response.statusCode + " | " + bodyText);
                    _this.startVersionCheckerTimer();
                }
            }, function (error) {
                _this.setAppUpdateStatus(ActionStatus.Failure, "LCMS GET Version Response failed: " + error);
                Logger_1.Logger.instance.lcms.error("LCMS GET Version Response failed: " + error);
                _this.startVersionCheckerTimer();
            });
        };
        this.appDownloader = function (version) {
            if (_this.isPaused()) {
                _this.setState(States.Pending);
                Logger_1.Logger.instance.lcms.log('appDownloader request initiated when not active, queuing up request');
                return Promise.resolve();
            }
            if (_this.getStagedVersion() >= version.revision) {
                if (_this._isActionRunning) {
                    _this.setAppUpdateStatus(ActionStatus.Success, "" + version.revision);
                }
                var updatePromise = Application_1.Application.update(_this.getBundlePath(version.revision));
                _this.startVersionCheckerTimer();
                return updatePromise;
            }
            else {
                return mdk_sap_1.CpmsSession.getInstance().sendRequest(version.url)
                    .then(function (response) {
                    Logger_1.Logger.instance.lcms.info("App download response code: " + response.statusCode);
                    _this.updateApplication(response.content.toFile(LifecycleManager.TEMP_SAVE_PATH), version.revision);
                    _this.startVersionCheckerTimer();
                }, function (e) {
                    Logger_1.Logger.instance.lcms.error("file downloaded error: " + e);
                    _this.setAppUpdateStatus(ActionStatus.Failure, "file downloaded error: " + e);
                    if (_this._appDownloadErrorCount < ClientSettings_1.ClientSettings.getLcmsAppDownloadRetryCount()) {
                        _this._appDownloadErrorCount++;
                        var errorCount = _this._appDownloadErrorCount;
                        var retryAttemptText = "Attempting to retry application download.  Retry " + errorCount;
                        Logger_1.Logger.instance.lcms.error(retryAttemptText + " of " + ClientSettings_1.ClientSettings.getLcmsAppDownloadRetryCount());
                        _this._timerId = timer.setTimeout(function () {
                            _this.appDownloader(version);
                        }, ClientSettings_1.ClientSettings.getLcmsAppDownloadRetryPeriod());
                        var retryPeriod = ClientSettings_1.ClientSettings.getLcmsAppDownloadRetryPeriod();
                        var retryTimerText = "Setting LCMS App Download retry timer: " + retryPeriod;
                        Logger_1.Logger.instance.lcms.info(retryTimerText + " | timer id: " + _this._timerId);
                    }
                    else {
                        Logger_1.Logger.instance.lcms.error('Max application download retries failed.');
                        _this.startVersionCheckerTimer();
                    }
                });
            }
        };
        if (LifecycleManager._instance) {
            throw new Error(ErrorMessage_1.ErrorMessage.INITIALIZE_FAIL_SHOULD_USE_GETINSTANCE);
        }
        LifecycleManager._instance = this;
    }
    LifecycleManager.getInstance = function () {
        return LifecycleManager._instance;
    };
    LifecycleManager.prototype.start = function () {
        if (!this.isStopped()) {
            timer.clearTimeout(this._timerId);
        }
        if (Application_1.Application.isOnUpdateProcessing()) {
            return;
        }
        this.setState(States.Running);
        Logger_1.Logger.instance.lcms.info('Starting LCMS Version Checking');
        return this.versionChecker();
    };
    LifecycleManager.prototype.startDelayed = function () {
        if (!this.isStopped()) {
            Logger_1.Logger.instance.lcms.info('LCMS Version Checking already running, ignoring request');
            return Promise.reject('LCMS Version Checking already running, ignoring request');
        }
        this.setState(States.Running);
        Logger_1.Logger.instance.lcms.info('Delay Starting LCMS Version Checking');
        this.startVersionCheckerTimer();
    };
    LifecycleManager.prototype.stop = function () {
        timer.clearTimeout(this._timerId);
        this.setState(States.Stopped);
    };
    LifecycleManager.prototype.pause = function () {
        if (this.isPauseable()) {
            this.setState(States.Paused);
        }
        else {
            Logger_1.Logger.instance.lcms.info("LCMS is not being paused as its current state is :|" + this._state + "|");
        }
    };
    LifecycleManager.prototype.unPause = function () {
        if (this.isPending()) {
            this.restart();
        }
        else if (this.isPaused()) {
            this.setState(States.Running);
        }
    };
    LifecycleManager.prototype.getCurrentDefinitionPath = function () {
        return this.getBundlePath(this.getCurrentVersion());
    };
    LifecycleManager.prototype.getStagedDefinitionPath = function () {
        return this.getBundlePath(this.getStagedVersion());
    };
    LifecycleManager.prototype.promoteStagedVersion = function () {
        var version = this.getStagedVersion();
        if (fs.File.exists(this.getBundlePath(version))) {
            if (version > this.getCurrentVersion()) {
                this.setCurrentVersion(version);
                this.cleanupPreviousVersions(version);
                return true;
            }
        }
        return false;
    };
    LifecycleManager.prototype.reset = function () {
        this.stop();
        ClientSettings_1.ClientSettings.resetApplicationVersions();
        this.cleanupPreviousVersions();
    };
    LifecycleManager.prototype.executeAppUpdateCheck = function () {
        var _this = this;
        this._statusModel = observable_1.fromObject({});
        this._isActionRunning = true;
        var self = this;
        return new Promise(function (resolve, reject) {
            self._statusModel.on(LifecycleManager.ACTION_STATUS_CHANGED, function (args) {
                if (args.object.get('ActionStatus') === ActionStatus.Success) {
                    self._isActionRunning = false;
                    resolve(args.object.get('Message'));
                }
                if (args.object.get('ActionStatus') === ActionStatus.Failure) {
                    self._isActionRunning = false;
                    reject(new Error(args.object.get('Message')));
                }
            });
            _this.restart();
        });
    };
    LifecycleManager.prototype.setAppUpdateStatus = function (status, message) {
        if (this._isActionRunning) {
            this._statusModel.set('Message', message);
            this._statusModel.set('ActionStatus', status);
            var eventData = {
                eventName: LifecycleManager.ACTION_STATUS_CHANGED,
                object: this._statusModel,
            };
            this._statusModel.notify(eventData);
            this._statusModel.off(LifecycleManager.ACTION_STATUS_CHANGED);
        }
    };
    LifecycleManager.prototype.isPauseable = function () {
        return this._state === States.Running;
    };
    LifecycleManager.prototype.isPaused = function () {
        return this._state === States.Paused;
    };
    LifecycleManager.prototype.isPending = function () {
        return this._state === States.Pending;
    };
    LifecycleManager.prototype.isStopped = function () {
        return this._state === States.Stopped;
    };
    LifecycleManager.prototype.setState = function (state) {
        this._state = state;
    };
    LifecycleManager.prototype.restart = function () {
        this.stop();
        this.start();
    };
    LifecycleManager.prototype.cleanupPreviousVersions = function (version) {
        var bundleFolder = fs.Folder.fromPath(this.getBundleFolder());
        var currentBundleFile = version ? this.getBundleFilename(version) : undefined;
        bundleFolder.eachEntity(function (entity) {
            if (!entity.name.startsWith(currentBundleFile) &&
                entity.name.startsWith(LifecycleManager.BUNDLE_FILE_PREFIX) &&
                (entity.name.endsWith(LifecycleManager.BUNDLE_FILE_SUFFIX) ||
                    entity.name.endsWith(LifecycleManager.BUNDLE_SOURCEMAP_SUFFIX))) {
                entity.remove()
                    .then(function (result) {
                    Logger_1.Logger.instance.lcms.info("Successfully removed old definition file " + entity.name);
                }, function (error) {
                    var message = "Error while attempting to remove an old definition file " + entity.name + " - " + error;
                    Logger_1.Logger.instance.lcms.error(message);
                });
            }
            return true;
        });
    };
    LifecycleManager.prototype.startVersionCheckerTimer = function () {
        var timeout = ClientSettings_1.ClientSettings.getLcmsVersionCheckMinPeriod() +
            Math.floor(Math.random() * ClientSettings_1.ClientSettings.getLcmsVersionCheckRandomMax());
        this._timerId = timer.setTimeout(this.versionChecker, timeout);
        Logger_1.Logger.instance.lcms.info("Setting LCMS Version Checker timer: " + timeout + " | timer id: " + this._timerId);
    };
    LifecycleManager.prototype.getVersionCheckUrl = function () {
        return ClientSettings_1.ClientSettings.getCpmsUrl() + LifecycleManager.VERSION_CHECK_PATH +
            ClientSettings_1.ClientSettings.getAppId() + LifecycleManager.VERSION_CHECK_PATH_SUFFIX;
    };
    LifecycleManager.prototype.handleVersionInfo = function (verionInfoXml) {
        Logger_1.Logger.instance.lcms.info("Received Version Data: " + verionInfoXml);
        var latestVersionInfo = new LifecycleAppVersionInfo_1.LifecycleAppVersionInfo(verionInfoXml);
        if (!latestVersionInfo.revision || !latestVersionInfo.url) {
            Logger_1.Logger.instance.lcms.error('Invalid LCMS XML data, skipping upgrade');
            Logger_1.Logger.instance.lcms.info("LCMS XML revision: " + latestVersionInfo.revision + " | url: " + latestVersionInfo.url);
            this.startVersionCheckerTimer();
            return;
        }
        if (this.isUpgradeNeeded(latestVersionInfo.revision)) {
            this.upgradeApplication(latestVersionInfo);
        }
        else {
            var log = "Current version is already up to date: " + ClientSettings_1.ClientSettings.getCurrentApplicationVersion();
            this.setAppUpdateStatus(ActionStatus.Success, log);
            Logger_1.Logger.instance.lcms.info(log);
            this.startVersionCheckerTimer();
        }
    };
    LifecycleManager.prototype.isUpgradeNeeded = function (latestLcmsVersion) {
        var latestVersionText = "LCMS latest version is: " + latestLcmsVersion;
        var currentVersionText = "Current Application Version: " + this.getCurrentVersion();
        var stagedVersionText = "Staged Application Version: " + this.getStagedVersion();
        Logger_1.Logger.instance.lcms.info(latestVersionText + " | " + currentVersionText + " | " + stagedVersionText);
        return latestLcmsVersion > this.getCurrentVersion();
    };
    LifecycleManager.prototype.getCurrentVersion = function () {
        return ClientSettings_1.ClientSettings.getCurrentApplicationVersion();
    };
    LifecycleManager.prototype.setCurrentVersion = function (version) {
        return ClientSettings_1.ClientSettings.setCurrentApplicationVersion(version);
    };
    LifecycleManager.prototype.getStagedVersion = function () {
        return ClientSettings_1.ClientSettings.getStagedApplicationVersion();
    };
    LifecycleManager.prototype.upgradeApplication = function (version) {
        Logger_1.Logger.instance.lcms.info("Upgrading application to version " + version.revision + " via " + version.url);
        this._appDownloadErrorCount = 0;
        return this.appDownloader(version);
    };
    LifecycleManager.prototype.getBundleFolder = function () {
        return RequireUtil_1.RequireUtil.getDefinitionBundleFolder();
    };
    LifecycleManager.prototype.getBundlePath = function (version) {
        return fs.path.join(this.getBundleFolder(), this.getBundleFilename(version));
    };
    LifecycleManager.prototype.getBundleFilename = function (version) {
        return LifecycleManager.BUNDLE_FILE_PREFIX +
            '.' + version + '.' + LifecycleManager.BUNDLE_FILE_SUFFIX;
    };
    LifecycleManager.prototype.updateApplication = function (sourceFile, newVersion) {
        var _this = this;
        Logger_1.Logger.instance.lcms.info('Updating Application');
        Logger_1.Logger.instance.lcms.info("sourceFile: " + sourceFile.path);
        var appExtractWorker = new TsWorker();
        appExtractWorker.onmessage = function (msg) {
            if (msg.data.err) {
                Logger_1.Logger.instance.lcms.error("App extraction failed: " + msg.data.err);
                if (_this._isActionRunning) {
                    _this.setAppUpdateStatus(ActionStatus.Failure, "App extraction failed: " + msg.data.err);
                }
            }
            else {
                if (_this._isActionRunning) {
                    _this.setAppUpdateStatus(ActionStatus.Success, "" + newVersion);
                }
                Logger_1.Logger.instance.lcms.info("App extracted successfully with new version: " + newVersion);
                ClientSettings_1.ClientSettings.setStagedApplicationVersion(newVersion);
                Application_1.Application.update(_this.getBundlePath(newVersion));
            }
        };
        appExtractWorker.onerror = function (err) {
            Logger_1.Logger.instance.lcms.error("Uncaught app extraction failure: " + err);
            _this.setAppUpdateStatus(ActionStatus.Failure, "Uncaught app extraction failure: " + err);
            return true;
        };
        appExtractWorker.postMessage({
            bundleDest: this.getBundlePath(newVersion),
            zipDestPath: LifecycleManager.ZIP_EXTRACT_PATH,
            zipSource: LifecycleManager.TEMP_SAVE_PATH,
        });
    };
    LifecycleManager.VERSION_CHECK_PATH = '/odata/lcm/v1/Apps(AppId=\'';
    LifecycleManager.VERSION_CHECK_PATH_SUFFIX = '\',Platform=\'AppModeler\')';
    LifecycleManager.TEMP_SAVE_PATH = fs.path.join(fs.knownFolders.temp().path, 'lcmsDownload.zip');
    LifecycleManager.ZIP_EXTRACT_PATH = fs.path.join(fs.knownFolders.temp().path, 'SeamExtract');
    LifecycleManager.ACTION_STATUS_CHANGED = 'ActionStatusChanged';
    LifecycleManager.BUNDLE_FILE_PREFIX = 'bundle';
    LifecycleManager.BUNDLE_FILE_SUFFIX = 'js';
    LifecycleManager.BUNDLE_SOURCEMAP_SUFFIX = 'js.map';
    LifecycleManager._instance = new LifecycleManager();
    return LifecycleManager;
}());
exports.LifecycleManager = LifecycleManager;
; 
if ( true && global._isModuleLoadedForUI && global._isModuleLoadedForUI("./lifecycleManagement/LifecycleManager.ts") ) {
    
    module.hot.accept();
    module.hot.dispose(() => {
        global.hmrRefresh({ type: "script", path: "./lifecycleManagement/LifecycleManager.ts" });
    });
} 
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("../node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./storage/Paths.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {
Object.defineProperty(exports, "__esModule", { value: true });
var app = __webpack_require__("tns-core-modules/application");
var Logger_1 = __webpack_require__("mdk-core/utils/Logger");
var Paths = (function () {
    function Paths() {
    }
    Paths.getOverridePath = function () {
        return Paths.getPrivateExternalStoragePath();
    };
    Paths.getSavedSettingsPath = function () {
        return Paths.getPrivateInternalStoragePath();
    };
    Paths.getPrivateExternalStoragePath = function () {
        try {
            var overridePath = undefined;
            if (Paths.isExternalStorageMounted() || Paths.isExternalStorageMountedReadOnly()) {
                Logger_1.Logger.instance.paths.info(Logger_1.Logger.PATHS_EXTERNAL_STORAGE_MOUNT_STATUS, Paths.isExternalStorageMounted(), Paths.isExternalStorageMountedReadOnly());
                var context = app.android.context;
                overridePath = context.getExternalFilesDir(null).getAbsolutePath();
            }
            return overridePath;
        }
        catch (error) {
            Logger_1.Logger.instance.paths.error(Logger_1.Logger.PATHS_FAILED_ACCESSS_EXTERNAL_STORAGE, error);
            return "";
        }
    };
    Paths.getPrivateInternalStoragePath = function () {
        try {
            var overridePath = undefined;
            var context = app.android.context;
            overridePath = context.getFilesDir().getAbsolutePath();
            return overridePath;
        }
        catch (error) {
            Logger_1.Logger.instance.paths.error(Logger_1.Logger.PATHS_FAILED_ACCESSS_INTERNAL_STORAGE, error);
            return "";
        }
    };
    Paths.printDebug = function () {
        var eSD = android.os.Environment.getExternalStorageDirectory();
        var eSPD = android.os.Environment.getExternalStoragePublicDirectory(android.os.Environment.DIRECTORY_DOWNLOADS);
        var eSS = android.os.Environment.getExternalStorageState();
        var iESD = android.os.Environment.isExternalStorageEmulated();
        var iESR = android.os.Environment.isExternalStorageRemovable();
        Logger_1.Logger.instance.paths.log("eSD: " + eSD + " | eSPD: " + eSPD + " | eSS: " + eSS + " | iESD: " + iESD + " | iESR: " + iESR);
        var context = app.android.context;
        var pPath = context.getExternalFilesDir(null).getAbsolutePath();
        Logger_1.Logger.instance.paths.log("private external storage path: " + pPath);
    };
    Paths.isExternalStorageMounted = function () {
        return android.os.Environment.getExternalStorageState() === android.os.Environment.MEDIA_MOUNTED;
    };
    Paths.isExternalStorageMountedReadOnly = function () {
        return android.os.Environment.getExternalStorageState() === android.os.Environment.MEDIA_MOUNTED_READ_ONLY;
    };
    return Paths;
}());
exports.Paths = Paths;
; 
if ( true && global._isModuleLoadedForUI && global._isModuleLoadedForUI("./storage/Paths.ts") ) {
    
    module.hot.accept();
    module.hot.dispose(() => {
        global.hmrRefresh({ type: "script", path: "./storage/Paths.ts" });
    });
} 
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("../node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "@nativescript/core":
/***/ (function(module, exports) {

module.exports = require("@nativescript/core");

/***/ }),

/***/ "@nativescript/core/bundle-entry-points":
/***/ (function(module, exports) {

module.exports = require("@nativescript/core/bundle-entry-points");

/***/ }),

/***/ "@nativescript/core/ui/frame":
/***/ (function(module, exports) {

module.exports = require("@nativescript/core/ui/frame");

/***/ }),

/***/ "@nativescript/core/ui/frame/activity":
/***/ (function(module, exports) {

module.exports = require("@nativescript/core/ui/frame/activity");

/***/ }),

/***/ "@nativescript/core/ui/styling/style-scope":
/***/ (function(module, exports) {

module.exports = require("@nativescript/core/ui/styling/style-scope");

/***/ }),

/***/ "mdk-core/Application":
/***/ (function(module, exports) {

module.exports = require("mdk-core/Application");

/***/ }),

/***/ "mdk-core/CustomEventHandler":
/***/ (function(module, exports) {

module.exports = require("mdk-core/CustomEventHandler");

/***/ }),

/***/ "mdk-core/EventHandler":
/***/ (function(module, exports) {

module.exports = require("mdk-core/EventHandler");

/***/ }),

/***/ "mdk-core/actions/ActionFactory":
/***/ (function(module, exports) {

module.exports = require("mdk-core/actions/ActionFactory");

/***/ }),

/***/ "mdk-core/actions/IActionFactory":
/***/ (function(module, exports) {

module.exports = require("mdk-core/actions/IActionFactory");

/***/ }),

/***/ "mdk-core/builders/ApplicationDataBuilder":
/***/ (function(module, exports) {

module.exports = require("mdk-core/builders/ApplicationDataBuilder");

/***/ }),

/***/ "mdk-core/common/MDKNavigationType":
/***/ (function(module, exports) {

module.exports = require("mdk-core/common/MDKNavigationType");

/***/ }),

/***/ "mdk-core/context/Context":
/***/ (function(module, exports) {

module.exports = require("mdk-core/context/Context");

/***/ }),

/***/ "mdk-core/context/IContext":
/***/ (function(module, exports) {

module.exports = require("mdk-core/context/IContext");

/***/ }),

/***/ "mdk-core/controls/ControlFactorySync":
/***/ (function(module, exports) {

module.exports = require("mdk-core/controls/ControlFactorySync");

/***/ }),

/***/ "mdk-core/controls/IControlFactory":
/***/ (function(module, exports) {

module.exports = require("mdk-core/controls/IControlFactory");

/***/ }),

/***/ "mdk-core/data/IDataService":
/***/ (function(module, exports) {

module.exports = require("mdk-core/data/IDataService");

/***/ }),

/***/ "mdk-core/data/IRestService":
/***/ (function(module, exports) {

module.exports = require("mdk-core/data/IRestService");

/***/ }),

/***/ "mdk-core/data/ODataService":
/***/ (function(module, exports) {

module.exports = require("mdk-core/data/ODataService");

/***/ }),

/***/ "mdk-core/data/RestService":
/***/ (function(module, exports) {

module.exports = require("mdk-core/data/RestService");

/***/ }),

/***/ "mdk-core/definitions/DefinitionProvider":
/***/ (function(module, exports) {

module.exports = require("mdk-core/definitions/DefinitionProvider");

/***/ }),

/***/ "mdk-core/definitions/DemoBundleDefinitionLoader":
/***/ (function(module, exports) {

module.exports = require("mdk-core/definitions/DemoBundleDefinitionLoader");

/***/ }),

/***/ "mdk-core/definitions/IDefinitionProvider":
/***/ (function(module, exports) {

module.exports = require("mdk-core/definitions/IDefinitionProvider");

/***/ }),

/***/ "mdk-core/definitions/PathToExportName":
/***/ (function(module, exports) {

module.exports = require("mdk-core/definitions/PathToExportName");

/***/ }),

/***/ "mdk-core/errorHandling/ErrorMessage":
/***/ (function(module, exports) {

module.exports = require("mdk-core/errorHandling/ErrorMessage");

/***/ }),

/***/ "mdk-core/lifecycleManagement/LifecycleManager":
/***/ (function(module, exports) {

module.exports = require("mdk-core/lifecycleManagement/LifecycleManager");

/***/ }),

/***/ "mdk-core/pages/MDKPage":
/***/ (function(module, exports) {

module.exports = require("mdk-core/pages/MDKPage");

/***/ }),

/***/ "mdk-core/pages/ModalFrame":
/***/ (function(module, exports) {

module.exports = require("mdk-core/pages/ModalFrame");

/***/ }),

/***/ "mdk-core/pages/PageRenderer":
/***/ (function(module, exports) {

module.exports = require("mdk-core/pages/PageRenderer");

/***/ }),

/***/ "mdk-core/pages/TabFrame":
/***/ (function(module, exports) {

module.exports = require("mdk-core/pages/TabFrame");

/***/ }),

/***/ "mdk-core/pages/WelcomePage":
/***/ (function(module, exports) {

module.exports = require("mdk-core/pages/WelcomePage");

/***/ }),

/***/ "mdk-core/storage/ClientSettings":
/***/ (function(module, exports) {

module.exports = require("mdk-core/storage/ClientSettings");

/***/ }),

/***/ "mdk-core/storage/Paths":
/***/ (function(module, exports) {

module.exports = require("mdk-core/storage/Paths");

/***/ }),

/***/ "mdk-core/storage/SecureStore":
/***/ (function(module, exports) {

module.exports = require("mdk-core/storage/SecureStore");

/***/ }),

/***/ "mdk-core/styling/SDKStylingManager":
/***/ (function(module, exports) {

module.exports = require("mdk-core/styling/SDKStylingManager");

/***/ }),

/***/ "mdk-core/targetpath/segments/ISegmentFactory":
/***/ (function(module, exports) {

module.exports = require("mdk-core/targetpath/segments/ISegmentFactory");

/***/ }),

/***/ "mdk-core/targetpath/segments/SegmentFactory":
/***/ (function(module, exports) {

module.exports = require("mdk-core/targetpath/segments/SegmentFactory");

/***/ }),

/***/ "mdk-core/utils/AppSettingsManager":
/***/ (function(module, exports) {

module.exports = require("mdk-core/utils/AppSettingsManager");

/***/ }),

/***/ "mdk-core/utils/ConsoleWriter":
/***/ (function(module, exports) {

module.exports = require("mdk-core/utils/ConsoleWriter");

/***/ }),

/***/ "mdk-core/utils/I18nHelper":
/***/ (function(module, exports) {

module.exports = require("mdk-core/utils/I18nHelper");

/***/ }),

/***/ "mdk-core/utils/I18nLanguage":
/***/ (function(module, exports) {

module.exports = require("mdk-core/utils/I18nLanguage");

/***/ }),

/***/ "mdk-core/utils/ImageHelper":
/***/ (function(module, exports) {

module.exports = require("mdk-core/utils/ImageHelper");

/***/ }),

/***/ "mdk-core/utils/Logger":
/***/ (function(module, exports) {

module.exports = require("mdk-core/utils/Logger");

/***/ }),

/***/ "mdk-core/utils/RequireUtil":
/***/ (function(module, exports) {

module.exports = require("mdk-core/utils/RequireUtil");

/***/ }),

/***/ "mdk-core/utils/TypeConverter":
/***/ (function(module, exports) {

module.exports = require("mdk-core/utils/TypeConverter");

/***/ }),

/***/ "mdk-sap":
/***/ (function(module, exports) {

module.exports = require("mdk-sap");

/***/ }),

/***/ "nativescript-ui-sidedrawer":
/***/ (function(module, exports) {

module.exports = require("nativescript-ui-sidedrawer");

/***/ }),

/***/ "tns-core-modules/application":
/***/ (function(module, exports) {

module.exports = require("tns-core-modules/application");

/***/ }),

/***/ "tns-core-modules/data/observable/observable":
/***/ (function(module, exports) {

module.exports = require("tns-core-modules/data/observable/observable");

/***/ }),

/***/ "tns-core-modules/file-system":
/***/ (function(module, exports) {

module.exports = require("tns-core-modules/file-system");

/***/ }),

/***/ "tns-core-modules/globals":
/***/ (function(module, exports) {

module.exports = require("tns-core-modules/globals");

/***/ }),

/***/ "tns-core-modules/timer":
/***/ (function(module, exports) {

module.exports = require("tns-core-modules/timer");

/***/ }),

/***/ "tns-core-modules/trace":
/***/ (function(module, exports) {

module.exports = require("tns-core-modules/trace");

/***/ }),

/***/ "tns-core-modules/ui/dialogs":
/***/ (function(module, exports) {

module.exports = require("tns-core-modules/ui/dialogs");

/***/ }),

/***/ "tns-core-modules/ui/frame":
/***/ (function(module, exports) {

module.exports = require("tns-core-modules/ui/frame");

/***/ }),

/***/ "tns-core-modules/xml":
/***/ (function(module, exports) {

module.exports = require("tns-core-modules/xml");

/***/ }),

/***/ "zip-plugin":
/***/ (function(module, exports) {

module.exports = require("zip-plugin");

/***/ })

},[["./app.ts","runtime","vendor"]]]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9saWZlY3ljbGVNYW5hZ2VtZW50L0FwcEV4dHJhY3RXb3JrZXIudHM/ZWM2OCIsIndlYnBhY2s6Ly8vLiBzeW5jIG5vbnJlY3Vyc2l2ZSBeXFwuXFwvYXBwXFwuKGNzc3xzY3NzfGxlc3N8c2FzcykkIiwid2VicGFjazovLy9cXGJfW1xcdy1dKlxcLilzY3NzKSQiLCJ3ZWJwYWNrOi8vLy4vQXBwX0RlbGVnYXRlcy9DdXN0b21BcHBEZWxlZ2F0ZS50cyIsIndlYnBhY2s6Ly8vLi9BcHBfRGVsZWdhdGVzL0N1c3RvbUV2ZW50SGFuZGxlci50cyIsIndlYnBhY2s6Ly8vLi9BcHBsaWNhdGlvbi50cyIsIndlYnBhY2s6Ly8vLi9hcHAuY3NzIiwid2VicGFjazovLy8uL2FwcC50cyIsIndlYnBhY2s6Ly8vLi9kZWZpbml0aW9ucy9CdW5kbGVEZWZpbml0aW9uTG9hZGVyLnRzIiwid2VicGFjazovLy8uL2RlZmluaXRpb25zL0RlbW9CdW5kbGVEZWZpbml0aW9uTG9hZGVyLnRzIiwid2VicGFjazovLy8uL2xpZmVjeWNsZU1hbmFnZW1lbnQvQXBwRXh0cmFjdEhlbHBlci50cyIsIndlYnBhY2s6Ly8vLi9saWZlY3ljbGVNYW5hZ2VtZW50L0FwcEV4dHJhY3RXb3JrZXIudHMiLCJ3ZWJwYWNrOi8vLy4vbGlmZWN5Y2xlTWFuYWdlbWVudC9MaWZlY3ljbGVBcHBWZXJzaW9uSW5mby50cyIsIndlYnBhY2s6Ly8vLi9saWZlY3ljbGVNYW5hZ2VtZW50L0xpZmVjeWNsZU1hbmFnZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc3RvcmFnZS9QYXRocy50cyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJAbmF0aXZlc2NyaXB0L2NvcmVcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJAbmF0aXZlc2NyaXB0L2NvcmUvYnVuZGxlLWVudHJ5LXBvaW50c1wiIiwid2VicGFjazovLy9leHRlcm5hbCBcIkBuYXRpdmVzY3JpcHQvY29yZS91aS9mcmFtZVwiIiwid2VicGFjazovLy9leHRlcm5hbCBcIkBuYXRpdmVzY3JpcHQvY29yZS91aS9mcmFtZS9hY3Rpdml0eVwiIiwid2VicGFjazovLy9leHRlcm5hbCBcIkBuYXRpdmVzY3JpcHQvY29yZS91aS9zdHlsaW5nL3N0eWxlLXNjb3BlXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwibWRrLWNvcmUvQXBwbGljYXRpb25cIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJtZGstY29yZS9DdXN0b21FdmVudEhhbmRsZXJcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJtZGstY29yZS9FdmVudEhhbmRsZXJcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJtZGstY29yZS9hY3Rpb25zL0FjdGlvbkZhY3RvcnlcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJtZGstY29yZS9hY3Rpb25zL0lBY3Rpb25GYWN0b3J5XCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwibWRrLWNvcmUvYnVpbGRlcnMvQXBwbGljYXRpb25EYXRhQnVpbGRlclwiIiwid2VicGFjazovLy9leHRlcm5hbCBcIm1kay1jb3JlL2NvbW1vbi9NREtOYXZpZ2F0aW9uVHlwZVwiIiwid2VicGFjazovLy9leHRlcm5hbCBcIm1kay1jb3JlL2NvbnRleHQvQ29udGV4dFwiIiwid2VicGFjazovLy9leHRlcm5hbCBcIm1kay1jb3JlL2NvbnRleHQvSUNvbnRleHRcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJtZGstY29yZS9jb250cm9scy9Db250cm9sRmFjdG9yeVN5bmNcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJtZGstY29yZS9jb250cm9scy9JQ29udHJvbEZhY3RvcnlcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJtZGstY29yZS9kYXRhL0lEYXRhU2VydmljZVwiIiwid2VicGFjazovLy9leHRlcm5hbCBcIm1kay1jb3JlL2RhdGEvSVJlc3RTZXJ2aWNlXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwibWRrLWNvcmUvZGF0YS9PRGF0YVNlcnZpY2VcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJtZGstY29yZS9kYXRhL1Jlc3RTZXJ2aWNlXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwibWRrLWNvcmUvZGVmaW5pdGlvbnMvRGVmaW5pdGlvblByb3ZpZGVyXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwibWRrLWNvcmUvZGVmaW5pdGlvbnMvRGVtb0J1bmRsZURlZmluaXRpb25Mb2FkZXJcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJtZGstY29yZS9kZWZpbml0aW9ucy9JRGVmaW5pdGlvblByb3ZpZGVyXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwibWRrLWNvcmUvZGVmaW5pdGlvbnMvUGF0aFRvRXhwb3J0TmFtZVwiIiwid2VicGFjazovLy9leHRlcm5hbCBcIm1kay1jb3JlL2Vycm9ySGFuZGxpbmcvRXJyb3JNZXNzYWdlXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwibWRrLWNvcmUvbGlmZWN5Y2xlTWFuYWdlbWVudC9MaWZlY3ljbGVNYW5hZ2VyXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwibWRrLWNvcmUvcGFnZXMvTURLUGFnZVwiIiwid2VicGFjazovLy9leHRlcm5hbCBcIm1kay1jb3JlL3BhZ2VzL01vZGFsRnJhbWVcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJtZGstY29yZS9wYWdlcy9QYWdlUmVuZGVyZXJcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJtZGstY29yZS9wYWdlcy9UYWJGcmFtZVwiIiwid2VicGFjazovLy9leHRlcm5hbCBcIm1kay1jb3JlL3BhZ2VzL1dlbGNvbWVQYWdlXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwibWRrLWNvcmUvc3RvcmFnZS9DbGllbnRTZXR0aW5nc1wiIiwid2VicGFjazovLy9leHRlcm5hbCBcIm1kay1jb3JlL3N0b3JhZ2UvUGF0aHNcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJtZGstY29yZS9zdG9yYWdlL1NlY3VyZVN0b3JlXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwibWRrLWNvcmUvc3R5bGluZy9TREtTdHlsaW5nTWFuYWdlclwiIiwid2VicGFjazovLy9leHRlcm5hbCBcIm1kay1jb3JlL3RhcmdldHBhdGgvc2VnbWVudHMvSVNlZ21lbnRGYWN0b3J5XCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwibWRrLWNvcmUvdGFyZ2V0cGF0aC9zZWdtZW50cy9TZWdtZW50RmFjdG9yeVwiIiwid2VicGFjazovLy9leHRlcm5hbCBcIm1kay1jb3JlL3V0aWxzL0FwcFNldHRpbmdzTWFuYWdlclwiIiwid2VicGFjazovLy9leHRlcm5hbCBcIm1kay1jb3JlL3V0aWxzL0NvbnNvbGVXcml0ZXJcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJtZGstY29yZS91dGlscy9JMThuSGVscGVyXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwibWRrLWNvcmUvdXRpbHMvSTE4bkxhbmd1YWdlXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwibWRrLWNvcmUvdXRpbHMvSW1hZ2VIZWxwZXJcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJtZGstY29yZS91dGlscy9Mb2dnZXJcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJtZGstY29yZS91dGlscy9SZXF1aXJlVXRpbFwiIiwid2VicGFjazovLy9leHRlcm5hbCBcIm1kay1jb3JlL3V0aWxzL1R5cGVDb252ZXJ0ZXJcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJtZGstc2FwXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwibmF0aXZlc2NyaXB0LXVpLXNpZGVkcmF3ZXJcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJ0bnMtY29yZS1tb2R1bGVzL2FwcGxpY2F0aW9uXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwidG5zLWNvcmUtbW9kdWxlcy9kYXRhL29ic2VydmFibGUvb2JzZXJ2YWJsZVwiIiwid2VicGFjazovLy9leHRlcm5hbCBcInRucy1jb3JlLW1vZHVsZXMvZmlsZS1zeXN0ZW1cIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJ0bnMtY29yZS1tb2R1bGVzL2dsb2JhbHNcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJ0bnMtY29yZS1tb2R1bGVzL3RpbWVyXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwidG5zLWNvcmUtbW9kdWxlcy90cmFjZVwiIiwid2VicGFjazovLy9leHRlcm5hbCBcInRucy1jb3JlLW1vZHVsZXMvdWkvZGlhbG9nc1wiIiwid2VicGFjazovLy9leHRlcm5hbCBcInRucy1jb3JlLW1vZHVsZXMvdWkvZnJhbWVcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJ0bnMtY29yZS1tb2R1bGVzL3htbFwiIiwid2VicGFjazovLy9leHRlcm5hbCBcInppcC1wbHVnaW5cIiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQTtBQUNBLDBCQUEwQixxQkFBdUI7QUFDakQsRTs7Ozs7OztBQ0ZBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlFOzs7Ozs7O0FDdEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlNOzs7Ozs7Ozs7O0FDbENBLDREQUE2QztBQUM3QyxzRUFBeUQ7QUFDekQsOEVBQW9HO0FBQ3BHLCtDQUEyQztBQUMzQyw0REFBK0M7QUFDL0Msc0VBQTREO0FBQzVELDBGQUEyRTtBQUUzRSw4RUFBaUU7QUFFakU7SUFBdUMscUNBQVc7SUFBbEQ7UUFBQSxxRUE0VkM7UUF2VlMseUJBQW1CLEdBQUcsQ0FBQyxDQUFDO1FBQ3hCLGdDQUEwQixHQUFHLEtBQUssQ0FBQztRQUtuQyxxQkFBZSxHQUFHLElBQUks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O0FDQUEsdUQ7Ozs7Ozs7QUNBQSx1RDs7Ozs7OztBQ0FBLHVEOzs7Ozs7O0FDQUEsc0Q7Ozs7Ozs7QUNBQSxvRTs7Ozs7OztBQ0FBLDRFOzs7Ozs7O0FDQUEscUU7Ozs7Ozs7QUNBQSxrRTs7Ozs7OztBQ0FBLGdFOzs7Ozs7O0FDQUEsMEU7Ozs7Ozs7QUNBQSxtRDs7Ozs7OztBQ0FBLHNEOzs7Ozs7O0FDQUEsd0Q7Ozs7Ozs7QUNBQSxvRDs7Ozs7OztBQ0FBLHVEOzs7Ozs7O0FDQUEsNEQ7Ozs7Ozs7QUNBQSxtRDs7Ozs7OztBQ0FBLHlEOzs7Ozs7O0FDQUEsK0Q7Ozs7Ozs7QUNBQSx5RTs7Ozs7OztBQ0FBLHdFOzs7Ozs7O0FDQUEsOEQ7Ozs7Ozs7QUNBQSx5RDs7Ozs7OztBQ0FBLHNEOzs7Ozs7O0FDQUEsd0Q7Ozs7Ozs7QUNBQSx1RDs7Ozs7OztBQ0FBLGtEOzs7Ozs7O0FDQUEsdUQ7Ozs7Ozs7QUNBQSx5RDs7Ozs7OztBQ0FBLG9DOzs7Ozs7O0FDQUEsdUQ7Ozs7Ozs7QUNBQSx5RDs7Ozs7OztBQ0FBLHdFOzs7Ozs7O0FDQUEseUQ7Ozs7Ozs7QUNBQSxxRDs7Ozs7OztBQ0FBLG1EOzs7Ozs7O0FDQUEsbUQ7Ozs7Ozs7QUNBQSx3RDs7Ozs7OztBQ0FBLHNEOzs7Ozs7O0FDQUEsaUQ7Ozs7Ozs7QUNBQSx1QyIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbigpIHtcblx0cmV0dXJuIG5ldyBXb3JrZXIoXCIuL1wiICsgX193ZWJwYWNrX3B1YmxpY19wYXRoX18gKyBcIjMyNDI2NmI1ODI2ZGQxNjhmNjIwLndvcmtlci5qc1wiKTtcbn07IiwidmFyIG1hcCA9IHtcblx0XCIuL2FwcC5jc3NcIjogXCIuL2FwcC5jc3NcIlxufTtcblxuXG5mdW5jdGlvbiB3ZWJwYWNrQ29udGV4dChyZXEpIHtcblx0dmFyIGlkID0gd2VicGFja0NvbnRleHRSZXNvbHZlKHJlcSk7XG5cdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKGlkKTtcbn1cbmZ1bmN0aW9uIHdlYnBhY2tDb250ZXh0UmVzb2x2ZShyZXEpIHtcblx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhtYXAsIHJlcSkpIHtcblx0XHR2YXIgZSA9IG5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIgKyByZXEgKyBcIidcIik7XG5cdFx0ZS5jb2RlID0gJ01PRFVMRV9OT1RfRk9VTkQnO1xuXHRcdHRocm93IGU7XG5cdH1cblx0cmV0dXJuIG1hcFtyZXFdO1xufVxud2VicGFja0NvbnRleHQua2V5cyA9IGZ1bmN0aW9uIHdlYnBhY2tDb250ZXh0S2V5cygpIHtcblx0cmV0dXJuIE9iamVjdC5rZXlzKG1hcCk7XG59O1xud2VicGFja0NvbnRleHQucmVzb2x2ZSA9IHdlYnBhY2tDb250ZXh0UmVzb2x2ZTtcbm1vZHVsZS5leHBvcnRzID0gd2VicGFja0NvbnRleHQ7XG53ZWJwYWNrQ29udGV4dC5pZCA9IFwiLi8gc3luYyBeXFxcXC5cXFxcL2FwcFxcXFwuKGNzc3xzY3NzfGxlc3N8c2FzcykkXCI7IiwidmFyIG1hcCA9IHtcblx0XCIuL0FwcF9EZWxlZ2F0ZXMvQ3VzdG9tQXBwRGVsZWdhdGUudHNcIjogXCIuL0FwcF9EZWxlZ2F0ZXMvQ3VzdG9tQXBwRGVsZWdhdGUudHNcIixcblx0XCIuL0FwcF9EZWxlZ2F0ZXMvQ3VzdG9tRXZlbnRIYW5kbGVyLnRzXCI6IFwiLi9BcHBfRGVsZWdhdGVzL0N1c3RvbUV2ZW50SGFuZGxlci50c1wiLFxuXHRcIi4vQXBwbGljYXRpb24udHNcIjogXCIuL0FwcGxpY2F0aW9uLnRzXCIsXG5cdFwiLi9NREtBbmRyb2lkQWN0aXZpdHkudHNcIjogXCIuL01ES0FuZHJvaWRBY3Rpdml0eS50c1wiLFxuXHRcIi4vYXBwLmNzc1wiOiBcIi4vYXBwLmNzc1wiLFxuXHRcIi4vYXBwLnRzXCI6IFwiLi9hcHAudHNcIixcblx0XCIuL2RlZmluaXRpb25zL0J1bmRsZURlZmluaXRpb25Mb2FkZXIudHNcIjogXCIuL2RlZmluaXRpb25zL0J1bmRsZURlZmluaXRpb25Mb2FkZXIudHNcIixcblx0XCIuL2RlZmluaXRpb25zL0RlbW9CdW5kbGVEZWZpbml0aW9uTG9hZGVyLnRzXCI6IFwiLi9kZWZpbml0aW9ucy9EZW1vQnVuZGxlRGVmaW5pdGlvbkxvYWRlci50c1wiLFxuXHRcIi4vbGlmZWN5Y2xlTWFuYWdlbWVudC9BcHBFeHRyYWN0SGVscGVyLnRzXCI6IFwiLi9saWZlY3ljbGVNYW5hZ2VtZW50L0FwcEV4dHJhY3RIZWxwZXIudHNcIixcblx0XCIuL2xpZmVjeWNsZU1hbmFnZW1lbnQvQXBwRXh0cmFjdFdvcmtlci50c1wiOiBcIi4vbGlmZWN5Y2xlTWFuYWdlbWVudC9BcHBFeHRyYWN0V29ya2VyLnRzXCIsXG5cdFwiLi9saWZlY3ljbGVNYW5hZ2VtZW50L0xpZmVjeWNsZUFwcFZlcnNpb25JbmZvLnRzXCI6IFwiLi9saWZlY3ljbGVNYW5hZ2VtZW50L0xpZmVjeWNsZUFwcFZlcnNpb25JbmZvLnRzXCIsXG5cdFwiLi9saWZlY3ljbGVNYW5hZ2VtZW50L0xpZmVjeWNsZU1hbmFnZXIudHNcIjogXCIuL2xpZmVjeWNsZU1hbmFnZW1lbnQvTGlmZWN5Y2xlTWFuYWdlci50c1wiLFxuXHRcIi4vc3RvcmFnZS9QYXRocy50c1wiOiBcIi4vc3RvcmFnZS9QYXRocy50c1wiXG59O1xuXG5cbmZ1bmN0aW9uIHdlYnBhY2tDb250ZXh0KHJlcSkge1xuXHR2YXIgaWQgPSB3ZWJwYWNrQ29udGV4dFJlc29sdmUocmVxKTtcblx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oaWQpO1xufVxuZnVuY3Rpb24gd2VicGFja0NvbnRleHRSZXNvbHZlKHJlcSkge1xuXHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKG1hcCwgcmVxKSkge1xuXHRcdHZhciBlID0gbmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIiArIHJlcSArIFwiJ1wiKTtcblx0XHRlLmNvZGUgPSAnTU9EVUxFX05PVF9GT1VORCc7XG5cdFx0dGhyb3cgZTtcblx0fVxuXHRyZXR1cm4gbWFwW3JlcV07XG59XG53ZWJwYWNrQ29udGV4dC5rZXlzID0gZnVuY3Rpb24gd2VicGFja0NvbnRleHRLZXlzKCkge1xuXHRyZXR1cm4gT2JqZWN0LmtleXMobWFwKTtcbn07XG53ZWJwYWNrQ29udGV4dC5yZXNvbHZlID0gd2VicGFja0NvbnRleHRSZXNvbHZlO1xubW9kdWxlLmV4cG9ydHMgPSB3ZWJwYWNrQ29udGV4dDtcbndlYnBhY2tDb250ZXh0LmlkID0gXCIuLyBzeW5jIHJlY3Vyc2l2ZSAoPzwhXFxcXC5cXFxcL01ES0FuZHJvaWRBcHBsaWNhdGlvbikoPzwhXFxcXC5cXFxcL2FwcFxcXFwudHMpKD88IVxcXFxiQXBwX1Jlc291cmNlc1xcXFxiLiopKD88IVxcXFwuXFxcXC9cXFxcYnRlc3RzXFxcXGJcXFxcLy4qPylcXFxcLih4bWx8Y3NzfGpzfCg/PCFcXFxcLmRcXFxcLil0c3woPzwhXFxcXGJfW1xcXFx3LV0qXFxcXC4pc2NzcykkXCI7IiwiaW1wb3J0IHsgQXBwbGljYXRpb24gfSBmcm9tICcuLi9BcHBsaWNhdGlvbic7XG5pbXBvcnQgeyBXZWxjb21lUGFnZSB9IGZyb20gJ21kay1jb3JlL3BhZ2VzL1dlbGNvbWVQYWdlJztcbmltcG9ydCB7IE9uYm9hcmRpbmdTdGF0ZSwgQ2xpZW50U2V0dGluZ3MsIEJsdXJTY3JlZW5BY3Rpb25zfSBmcm9tICdtZGstY29yZS9zdG9yYWdlL0NsaWVudFNldHRpbmdzJztcbmltcG9ydCB7IFB1c2hOb3RpZmljYXRpb24gfSBmcm9tICdtZGstc2FwJztcbmltcG9ydCB7IExvZ2dlciB9IGZyb20gJ21kay1jb3JlL3V0aWxzL0xvZ2dlcic7XG5pbXBvcnQgKiBhcyBhcHBsaWNhdGlvbiBmcm9tICd0bnMtY29yZS1tb2R1bGVzL2FwcGxpY2F0aW9uJztcbmltcG9ydCB7IExpZmVjeWNsZU1hbmFnZXIgfSBmcm9tICcuLi9saWZlY3ljbGVNYW5hZ2VtZW50L0xpZmVjeWNsZU1hbmFnZXInO1xuaW1wb3J0IHsgQXBwbGljYXRpb25FdmVudERhdGEgfSBmcm9tICd0bnMtY29yZS1tb2R1bGVzL2FwcGxpY2F0aW9uJztcbmltcG9ydCB7IFBhc3Njb2RlU291cmNlIH0gZnJvbSAnbWRrLWNvcmUvc3RvcmFnZS9DbGllbnRTZXR0aW5ncyc7XG5cbmV4cG9ydCBjbGFzcyBDdXN0b21BcHBEZWxlZ2F0ZSBleHRlbmRzIFVJUmVzcG9uZGVyIGltcGxlbWVudHMgVUlBcHBsaWNhdGlvbkRlbGVnYXRlLCBVTlVzZXJOb3RpZmljYXRpb25DZW50ZXJEZWxlZ2F0ZSB7XG4gICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6dmFyaWFibGUtbmFtZVxuICBwdWJsaWMgc3RhdGljIE9iakNQcm90b2NvbHMgPSBbVUlBcHBsaWNhdGlvbkRlbGVnYXRlLCBVTlVzZXJOb3RpZmljYXRpb25DZW50ZXJEZWxlZ2F0ZV07XG4gIHB1YmxpYyBzdGF0aWMgaXNQYXNzY29kZVNjcmVlbkRpc3BsYXlpbmcgPSBudWxsO1xuXG4gIHByaXZhdGUgc2hvd1Bhc3Njb2RlVGltZW91dCA9IDA7XG4gIHByaXZhdGUgZGlzcGxheVBhc3Njb2RlSW5wdXRTY3JlZW4gPSBmYWxzZTtcblxuICAvLyBBcHBsaWNhdGlvbiBpcyBub3QgY29uc2lkZXJlZCBiYWNrZ3JvdW5kZWQgd2hlbiBhIHN5c3RlbSBwb3B1cCBsaWtlICdjYW1lcmEgcGVybWlzc2lvblwiIHNob3dzIHVwLCBob3dldmVyLFxuICAvLyB0aGUgY2FsbGJhY2sgbWV0aG9kIGlzIHN0aWxsIGZpcmVkIGJ5IHRoZSBzeXN0ZW0uXG4gIC8vIFNvLCBPbmx5IHdoZW4gdGhpcyBmbGFnIGlzIGZhbHNlLCB3ZSBhcmUgYWN0dWFsbHkgYmFja2dyb3VuZGVkIGFuZCBoZW5jZSBtdXN0IHNob3cgcGFzc2NvZGUgc2NyZWVuLlxuICBwcml2YXRlIHN5c3RlbVBvcHVwRmxhZyA9IHRydWU7XG5cbiAgcHJpdmF0ZSBoYXNDbGllbnRMYXVuY2hlZDogYm9vbGVhbiA9IGZhbHNlO1xuICAvLyBIYW5kbGVyIGZvciB3aGVuIGFuIGluc3RhbGxlZCBjbGllbnQgZ2V0cyBsYXVuY2hlZCB2aWEgYSBVUkwuICBcbiAgcHVibGljIGFwcGxpY2F0aW9uT3BlblVSTE9wdGlvbnM/KGFwcDogVUlBcHBsaWNhdGlvbiwgdXJsOiBOU1VSTCwgb3B0aW9uczogTlNEaWN0aW9uYXJ5PHN0cmluZywgYW55Pik6IGJvb2xlYW4ge1xuICAgIGlmIChDbGllbnRTZXR0aW5ncy5pc0Nvbm5lY3Rpb25TZXR0aW5nc0VuYWJsZU92ZXJyaWRlcygpKSB7XG4gICAgICByZXR1cm4gdGhpcy5hcHBsaWNhdGlvbkhhbmRsZU9wZW5VUkwoYXBwLCB1cmwpO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBwdWJsaWMgYXBwbGljYXRpb25IYW5kbGVPcGVuVVJMPyhhcHBsaWNhdGlvbjogVUlBcHBsaWNhdGlvbiwgdXJsOiBOU1VSTCkge1xuICAgIExvZ2dlci5pbnN0YW5jZS5hcHBEZWxlZ2F0ZS5pbmZvKExvZ2dlci5TVEFSVFVQX0FQUF9MQVVOQ0hFRF9WSUFfVVJMLCB1cmwuYWJzb2x1dGVTdHJpbmcpO1xuICAgIGlmIChDbGllbnRTZXR0aW5ncy5pc09uYm9hcmRpbmdJblByb2dyZXNzKCkpIHtcbiAgICAgIC8vIFdlIGFyZSBvbiB3ZWxjb21lIHNjcmVlbiwgcGFyc2UgYW55IFVSTCBwYXJhbXMgYW5kIHVzZSB0aGVtIGZvciBPbmJvYXJkaW5nLlxuICAgICAgLy8gVGhlc2UgcGFyYW1zIG92ZXJyaWRlIGFueSBzZXR0aW5ncyB0aGF0IHdlcmUgaW4gQnJhbmRlZFNldHRpbmdzLlxuICAgICAgQ2xpZW50U2V0dGluZ3MucHJvY2Vzc0Nvbm5lY3Rpb25TZXR0aW5nc0Zyb21MYXVuY2hVUkwodXJsLnF1ZXJ5KTtcbiAgICAgIGlmIChDbGllbnRTZXR0aW5ncy52YWxpZGF0ZU9uYm9hcmRpbmdDb25uZWN0aW9uUGFyYW1zRXhpc3QoKSkge1xuICAgICAgICBMb2dnZXIuaW5zdGFuY2UuYXBwRGVsZWdhdGUuaW5mbyhMb2dnZXIuU1RBUlRVUF9BUFBfVVJMX1BBUkFNX0NIRUNLX1NVQ0NFU1MpO1xuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAvLyBHaXZlIFNESyBhIGJpdCB0byBkcmF3IHVwIHRoZSB3ZWxjb21lUGFnZSBiZWZvcmUgd2UgdXBkYXRlIHN0YXJ0IGJ1dHRvbiBzdGF0ZS5cbiAgICAgICAgICBXZWxjb21lUGFnZS5yZUluaXRpYWxpemVQYWdlKCk7XG4gICAgICAgIH0sIDEwMDApO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBDbGllbnRTZXR0aW5ncy5zZXRDb25uZWNpb25JbmZvVG9hc3RNZXNzYWdlKHVybC5xdWVyeSk7XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgcHVibGljIGFwcGxpY2F0aW9uRGlkRW50ZXJCYWNrZ3JvdW5kPyhhcHBsaWNhdGlvbjogVUlBcHBsaWNhdGlvbikge1xuICAgIGlmIChDbGllbnRTZXR0aW5ncy5pc09uYm9hcmRpbmdJblByb2dyZXNzKCkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKENsaWVudFNldHRpbmdzLmlzTGl2ZU1vZGUoKSkge1xuICAgICAgTGlmZWN5Y2xlTWFuYWdlci5nZXRJbnN0YW5jZSgpLnBhdXNlKCk7XG4gICAgfVxuICAgIGlmIChDbGllbnRTZXR0aW5ncy5pc0RlbW9Nb2RlKCkpIHtcbiAgICAgIEFwcGxpY2F0aW9uLnNldE9uYm9hcmRpbmdDb21wbGV0ZWQodHJ1ZSk7XG4gICAgICBBcHBsaWNhdGlvbi5zZXRSZXN1bWVFdmVudERlbGF5ZWQoZmFsc2UpO1xuICAgIH1cbiAgICBpZiAoQ2xpZW50U2V0dGluZ3MuZ2V0UGFzc2NvZGVTb3VyY2UoKSA9PT0gUGFzc2NvZGVTb3VyY2UuVXNlck9uYm9hcmRlZFdpdGhvdXRQYXNzY29kZSkge1xuICAgICAgdGhpcy5zeXN0ZW1Qb3B1cEZsYWcgPSBmYWxzZTtcbiAgICAgIEFwcGxpY2F0aW9uLnNldFJlc3VtZUV2ZW50RGVsYXllZChmYWxzZSk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmICghQ2xpZW50U2V0dGluZ3MuaXNVc2VyQ2hhbmdpbmdQYXNzY29kZSkge1xuICAgICAgdGhpcy5kaXNwbGF5UGFzc2NvZGVJbnB1dFNjcmVlbiA9IGZhbHNlO1xuICAgICAgdGhpcy5zeXN0ZW1Qb3B1cEZsYWcgPSBmYWxzZTtcbiAgICAgIGlmIChDbGllbnRTZXR0aW5ncy5pc0xpdmVNb2RlKCkpIHtcbiAgICAgICAgbGV0IHRpbWVvdXQgPSBDbGllbnRTZXR0aW5ncy5nZXRQYXNzY29kZVRpbWVvdXQoKTtcbiAgICAgICAgaWYgKHRpbWVvdXQgPiAwKSB7XG4gICAgICAgICAgdGhpcy5zaG93UGFzc2NvZGVUaW1lb3V0ID0gPGFueT4gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAvLyBzZXQgZmxhZyBhZnRlciB0aW1lb3V0XG4gICAgICAgICAgICB0aGlzLmRpc3BsYXlQYXNzY29kZUlucHV0U2NyZWVuID0gdHJ1ZTtcbiAgICAgICAgICAgIEFwcGxpY2F0aW9uLnNldE9uYm9hcmRpbmdDb21wbGV0ZWQoZmFsc2UpO1xuICAgICAgICAgICAgQXBwbGljYXRpb24uc2V0UmVzdW1lRXZlbnREZWxheWVkKGZhbHNlKTtcbiAgICAgICAgICB9LCAxMDAwICogdGltZW91dCk7XG4gICAgICAgIH0gZWxzZSBpZiAodGltZW91dCA9PT0gMCkge1xuICAgICAgICAgIC8vIGFsd2F5cyBzaG93IHBhc3Njb2RlXG4gICAgICAgICAgdGhpcy5kaXNwbGF5UGFzc2NvZGVJbnB1dFNjcmVlbiA9IHRydWU7XG4gICAgICAgICAgLy8gYWRkIHRoaXMgZm9yIGtlZXAgc2FtZSBiZWhhdmlvciBhcyBhbmRyb2lkXG4gICAgICAgICAgdGhpcy5zaG93UGFzc2NvZGVUaW1lb3V0ID0gPGFueT4gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICBBcHBsaWNhdGlvbi5zZXRPbmJvYXJkaW5nQ29tcGxldGVkKGZhbHNlKTtcbiAgICAgICAgICAgIEFwcGxpY2F0aW9uLnNldFJlc3VtZUV2ZW50RGVsYXllZChmYWxzZSk7XG4gICAgICAgICAgfSwgNTAwKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuICBcbiAgcHVibGljIGFwcGxpY2F0aW9uRGlkQmVjb21lQWN0aXZlKGFwcGxpY2F0aW9uOiBVSUFwcGxpY2F0aW9uKSB7XG4gICAgTG9nZ2VyLmluc3RhbmNlLmFwcERlbGVnYXRlLmluZm8oTG9nZ2VyLlNUQVJUVVBfSU5TSURFX0FQUExJQ0FUSU9ORElEQkVDT01FQUNUSVZFX0RFTEVHQVRFX01FVEhPRCk7XG4gICAgaWYgKHRoaXMuc3lzdGVtUG9wdXBGbGFnKSB7XG4gICAgICAvLyBUaGlzIG1ldGhvZCBhbHNvIGZpcmVzIGlmIHdlIGhhdmUgYSBzeXN0ZW0gYWxlcnQgcG9wIHVwIHdoZW4gaW4gdGhlIGFwcCBsaWtlIHBlcm1pc3Npb24gdG8gdXNlIGNhbWVyYSwgIFxuICAgICAgLy8gU28gaWYgZmxhZyBzZXQsIHRoaXMgaXMgYSBuby1vcC4gIEZsYWcgaXMgc2V0IHRvIGZhbHNlIHdoZW4gd2UgYWN0dWFsbHkgYmFja2dyb3VuZCB0aGUgYXBwLlxuICAgICAgV2VsY29tZVBhZ2UubWFuYWdlQmx1clNjcmVlbihCbHVyU2NyZWVuQWN0aW9ucy5SZW1vdmUpO1xuICAgICAgQXBwbGljYXRpb24uc2V0Tm9uTlNBY3Rpdml0eURvbmUodHJ1ZSk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmICh0eXBlb2YgdGhpcy5zeXN0ZW1Qb3B1cEZsYWcgPT09ICd1bmRlZmluZWQnIHx8IHRoaXMuc3lzdGVtUG9wdXBGbGFnID09PSBudWxsKSB7XG4gICAgICAvLyBGbGFnIHdvdWxkIGJlIHVuZGVmaW5lZCwgd2hlbiBhcHAgbGF1bmNoZWQgZnJvbSBhbiBpY29uIHNvLCBzZXQgaXQgYWdhaW4gaGVyZS5cbiAgICAgIHRoaXMuc3lzdGVtUG9wdXBGbGFnID0gdHJ1ZTtcbiAgICB9XG4gICAgXG4gICAgaWYgKENsaWVudFNldHRpbmdzLmlzTGl2ZU1vZGUoKSkge1xuICAgICAgLy8gV2UgaGF2ZSBhbHJlYWR5IG9uYm9hcmRlZC4uLlxuICAgICAgaWYgKHR5cGVvZiB0aGlzLmRpc3BsYXlQYXNzY29kZUlucHV0U2NyZWVuID09PSAndW5kZWZpbmVkJyB8fCB0aGlzLmRpc3BsYXlQYXNzY29kZUlucHV0U2NyZWVuID09PSBudWxsKSB7XG4gICAgICAgIC8vIC4uLiBhbmQgdXNlciBtdXN0IGhhdmUgZXhpdGVkIHRoZSBhcHAgYW5kIFxuICAgICAgICAvLyByZS1sYXVuY2hlZCBieSBjbGlja2luZyB0aGUgaWNvbiBzbyBzZXR1cCBvdXIgZmxhZ3MgYXMgd2UgbXVzdCBzaG93IHBhc3Njb2RlIHNjcmVlbi5cbiAgICAgICAgdGhpcy5kaXNwbGF5UGFzc2NvZGVJbnB1dFNjcmVlbiA9IHRydWU7XG4gICAgICAgIEN1c3RvbUFwcERlbGVnYXRlLmlzUGFzc2NvZGVTY3JlZW5EaXNwbGF5aW5nID0gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuICAgIGlmIChDbGllbnRTZXR0aW5ncy5pc0RlbW9Nb2RlKCkpIHtcbiAgICAgIEFwcGxpY2F0aW9uLnNldFJlc3VtZUV2ZW50RGVsYXllZChmYWxzZSk7XG4gICAgfVxuICAgIC8vIFRoaXMgbWV0aG9kIGFsc28gZ2V0cyBjYWxsZWQgd2hlbiB1c2VyIGRvdWJsZSB0YXBzIGhvbWUgYnV0dG9uIGFuZCBqdXN0IHNlbGVjdHMgb3VyIGFwcCBhZ2Fpbi4gIFxuICAgIC8vIEhvd2V2ZXIsIHdlIHdhbnQgdG8gZXhlY3V0ZSBvbmx5IGF0IGFwcCBsYXVuY2hlcyBzbyBjaGVjayBmb3IgY2xpZW50IGxhdW5jaGVkLlxuICAgIGlmICh0aGlzLmRpc3BsYXlQYXNzY29kZUlucHV0U2NyZWVuICYmICFDdXN0b21BcHBEZWxlZ2F0ZS5pc1Bhc3Njb2RlU2NyZWVuRGlzcGxheWluZyAmJiAhdGhpcy5oYXNDbGllbnRMYXVuY2hlZCkge1xuICAgICAgdGhpcy5oYXNDbGllbnRMYXVuY2hlZCA9IHRydWU7XG4gICAgICBDdXN0b21BcHBEZWxlZ2F0ZS5pc1Bhc3Njb2RlU2NyZWVuRGlzcGxheWluZyA9IHRydWU7XG4gICAgICBBcHBsaWNhdGlvbi5zZXRSZXN1bWVFdmVudERlbGF5ZWQodHJ1ZSk7XG4gICAgICByZXR1cm4gV2VsY29tZVBhZ2UucmVzdG9yZU9uUmVsYXVuY2goQ2xpZW50U2V0dGluZ3MuZ2V0T25ib2FyZGluZ1BhcmFtcygpKS50aGVuKCgpID0+IHtcbiAgICAgICAgV2VsY29tZVBhZ2UubWFuYWdlQmx1clNjcmVlbihCbHVyU2NyZWVuQWN0aW9ucy5SZW1vdmUpO1xuICAgICAgICBDbGllbnRTZXR0aW5ncy5zZXRBcHBsaWNhdGlvblN0YWdlKCdJbkFwcGxpY2F0aW9uJyk7XG4gICAgICAgIEFwcGxpY2F0aW9uLmxhdW5jaEFwcE1haW5QYWdlKHRydWUpO1xuICAgICAgICAvLyByZXN0b3JlT25SZWxhdW5jaCBjYW4gdHJpZ2dlciBvblJlc3VtZSBFdmVudFxuICAgICAgICAvLyBCQ1AtMTk4MDA1MjE4MyBXaGVuIHVzZXIgaGFzIGNvbXBsZXRlZCB0aGUgb25ib2FyZGluZyBwcm9jZXNzLCBraWxsZWQgdGhlIGFwcCBhbmQgaGFzIGxhdW5jaGVkIHRoZVxuICAgICAgICAvLyBhcHAgYWdhaW4uIEJvdGggdGhlIG9uTGF1bmNoIGFuZCBvblJlc3VtZSBldmVudCB3aWxsIGJlIHRyaWdnZXIuIEJvdGggZXZlbnRzIHdpbGwgdHJpZ2dlciB0aGUgYXBwXG4gICAgICAgIC8vIHVwZGF0ZS4gSW4gdGhpcyBjYXNlLCB0aGUgQXBwIHVwZGF0ZSBzaG91bGQgYmUgb25seSBoYW5kbGVkIGJ5IG9uTGF1bmNoIGV2ZW50LiBIZW5jZSwgdGhlIGV2ZW50RGF0YVxuICAgICAgICAvLyBpcyBjcmVhdGVkIHRvIGF2b2lkIHRoZSBhcHAgdXBkYXRlIGJlaW5nIHRyaWdnZXJlZCBieSBvblJlc3VtZSBldmVudC5cbiAgICAgICAgbGV0IGV2ZW50RGF0YTogQXBwbGljYXRpb25FdmVudERhdGEgPSAge1xuICAgICAgICAgICAgICBldmVudE5hbWU6ICdyZWxhdW5jaGVkJyxcbiAgICAgICAgICAgICAgaW9zOiB7fSxcbiAgICAgICAgICAgICAgb2JqZWN0OiBhcHBsaWNhdGlvbixcbiAgICAgICAgfTtcbiAgICAgICAgQXBwbGljYXRpb24uc2V0UmVzdW1lRXZlbnREZWxheWVkKGZhbHNlKTtcbiAgICAgICAgQXBwbGljYXRpb24ub25SZXN1bWUoZXZlbnREYXRhKTtcbiAgICAgICAgTGlmZWN5Y2xlTWFuYWdlci5nZXRJbnN0YW5jZSgpLnVuUGF1c2UoKTtcbiAgICAgIH0pLmNhdGNoKChlcnIpID0+IHtcbiAgICAgICAgTG9nZ2VyLmluc3RhbmNlLmFwcERlbGVnYXRlLmVycm9yKGVycik7XG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcbiAgICAgIH0pLnRoZW4oKCkgPT4ge1xuICAgICAgICAvLyBmaW5hbGx5XG4gICAgICAgIEN1c3RvbUFwcERlbGVnYXRlLmlzUGFzc2NvZGVTY3JlZW5EaXNwbGF5aW5nID0gZmFsc2U7XG4gICAgICB9KTtcbiAgICB9IGVsc2UgaWYgKCFDdXN0b21BcHBEZWxlZ2F0ZS5pc1Bhc3Njb2RlU2NyZWVuRGlzcGxheWluZykge1xuICAgICAgLy8gTm8gcGFzc2NvZGUgc2NyZWVuIGRpc3BsYXlpbmcsIE5vcm1hbCByZXN1bXB0aW9uIGZyb20gdGFzayBtYW5hZ2VyIHNvIGNsZWFyIGJsdXIuIFxuICAgICAgLy8gTm90ZTogSWYgUGFzc2NvZGUgc2NyZWVuIGRpc3BsYXlpbmcsIGl0IGltcGxpZXMgUmVzdW1wdGlvbiBmcm9tIGJhY2tncm91bmQgYW5kIHRoZSBibHVyIFxuICAgICAgLy8gd291bGQgYmUgcmVtb3ZlZCBpbiBhcHBXaWxsRW50ZXJGb3JlZ3JvdW5kIG1ldGhvZC4gXG4gICAgICBXZWxjb21lUGFnZS5tYW5hZ2VCbHVyU2NyZWVuKEJsdXJTY3JlZW5BY3Rpb25zLlJlbW92ZSk7XG4gICAgfVxuICAgIGlmIChDbGllbnRTZXR0aW5ncy5pc0xpdmVNb2RlKCkpIHtcbiAgICAgIHRoaXMuaGFzQ2xpZW50TGF1bmNoZWQgPSB0cnVlO1xuICAgIH1cbiAgfVxuXG4gIC8vIFdlIGFyZSB0cmFuc2l0aW9uaW5nIHRvIGJhY2tncm91bmQgc28gaGlkZSBhbnkgYXBwbGljYXRpb24gc2NyZWVuIHRvIHByZXZlbnQgaU9TIHRha2luZyBzY3JlZW4gc2hvdC5cbiAgcHVibGljIGFwcGxpY2F0aW9uV2lsbFJlc2lnbkFjdGl2ZShhcHBsaWNhdGlvbjogVUlBcHBsaWNhdGlvbikge1xuICAgIExvZ2dlci5pbnN0YW5jZS5hcHBEZWxlZ2F0ZS5pbmZvKExvZ2dlci5TVEFSVFVQX0lOU0lERV9BUFBMSUNBVElPTldJTExSRVNJR05BQ1RJVkVfREVMRUdBVEVfTUVUSE9EKTtcbiAgICBpZiAoQ2xpZW50U2V0dGluZ3MuaXNEZW1vTW9kZSgpIHx8IFxuICAgICAgICAoIUNsaWVudFNldHRpbmdzLmlzVXNlckNoYW5naW5nUGFzc2NvZGUgJiYgIUN1c3RvbUFwcERlbGVnYXRlLmlzUGFzc2NvZGVTY3JlZW5EaXNwbGF5aW5nICYmIFxuICAgICAgICAgIENsaWVudFNldHRpbmdzLmlzTGl2ZU1vZGUoKSkpIHtcbiAgICAgIFdlbGNvbWVQYWdlLm1hbmFnZUJsdXJTY3JlZW4oQmx1clNjcmVlbkFjdGlvbnMuQWRkKTtcbiAgICB9XG4gIH1cblxuICAvLyBXZSB3aWxsIG9ubHkgc2hvdyB0aGUgcGFzc2NvZGUgc2NyZWVuIHdoZW4gYXBwbGljYXRpb24gaXMgZWl0aGVyIGNvbWluZyBmcm9tIGJhY2tncm91bmRcbiAgLy8gT3IgbGF1bmNoaW5nLiBSZW1vdmUgYW55IGJsdXIgc2NyZWVuIGF0IHRoaXMgdGltZSBzbyBwYXNzY29kZSBpbnB1dCBzY3JlZW4gaXMgc2hvd24uXG4gIHB1YmxpYyBhcHBsaWNhdGlvbldpbGxFbnRlckZvcmVncm91bmQoYXBwbGljYXRpb246IFVJQXBwbGljYXRpb24pIHtcbiAgICBpZiAodGhpcy5kaXNwbGF5UGFzc2NvZGVJbnB1dFNjcmVlbiAmJiAhQ3VzdG9tQXBwRGVsZWdhdGUuaXNQYXNzY29kZVNjcmVlbkRpc3BsYXlpbmcpIHtcbiAgICAgIEN1c3RvbUFwcERlbGVnYXRlLmlzUGFzc2NvZGVTY3JlZW5EaXNwbGF5aW5nID0gdHJ1ZTtcbiAgICAgIEFwcGxpY2F0aW9uLnByZXBhcmVGb3JQb3BvdmVyUmVzdG9yZSgpO1xuICAgICAgcmV0dXJuIFdlbGNvbWVQYWdlLmFwcGxpY2F0aW9uV2lsbEVudGVyRm9yZWdyb3VuZCgpLnRoZW4oKCkgPT4ge1xuICAgICAgICBDbGllbnRTZXR0aW5ncy5zZXRBcHBsaWNhdGlvblN0YWdlKCdJbkFwcGxpY2F0aW9uJyk7XG4gICAgICAgIFdlbGNvbWVQYWdlLm1hbmFnZUJsdXJTY3JlZW4oQmx1clNjcmVlbkFjdGlvbnMuUmVtb3ZlKTtcbiAgICAgICAgQXBwbGljYXRpb24uc2V0T25ib2FyZGluZ0NvbXBsZXRlZCh0cnVlKTtcbiAgICAgICAgaWYgKENsaWVudFNldHRpbmdzLmdldFBhc3Njb2RlU291cmNlKCkgIT09IFBhc3Njb2RlU291cmNlLlVzZXJPbmJvYXJkZWRXaXRob3V0UGFzc2NvZGUpIHtcbiAgICAgICAgICBBcHBsaWNhdGlvbi5jb21wbGV0ZUZvclBvcG92ZXJSZXN0b3JlKCk7XG4gICAgICAgICAgQXBwbGljYXRpb24ub25SZXN1bWUoQXBwbGljYXRpb24uZ2V0UGVuZGluZ1Jlc3VtZUV2ZW50RGF0YSgpKTtcbiAgICAgICAgICBBcHBsaWNhdGlvbi5zZXRQZW5kaW5nUmVzdW1lRXZlbnREYXRhKG51bGwpO1xuICAgICAgICB9XG4gICAgICAgIExpZmVjeWNsZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS51blBhdXNlKCk7XG4gICAgICB9KS5jYXRjaCgoZXJyKSA9PiB7XG4gICAgICAgIExvZ2dlci5pbnN0YW5jZS5hcHBEZWxlZ2F0ZS5lcnJvcihlcnIpO1xuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XG4gICAgICB9KS50aGVuKCgpID0+IHtcbiAgICAgICAgLy8gZmluYWxseVxuICAgICAgICBDdXN0b21BcHBEZWxlZ2F0ZS5pc1Bhc3Njb2RlU2NyZWVuRGlzcGxheWluZyA9IGZhbHNlO1xuICAgICAgfSk7XG4gICAgfSBlbHNlIGlmIChDbGllbnRTZXR0aW5ncy5pc0xpdmVNb2RlKCkgJiYgIXRoaXMuZGlzcGxheVBhc3Njb2RlSW5wdXRTY3JlZW4gXG4gICAgICAgICAgICAgICAgJiYgIUNsaWVudFNldHRpbmdzLmlzVXNlckNoYW5naW5nUGFzc2NvZGUpIHtcbiAgICAgICAgTGlmZWN5Y2xlTWFuYWdlci5nZXRJbnN0YW5jZSgpLnVuUGF1c2UoKTtcbiAgICAgICAgV2VsY29tZVBhZ2UubWFuYWdlQmx1clNjcmVlbihCbHVyU2NyZWVuQWN0aW9ucy5SZW1vdmUpO1xuICAgIH0gZWxzZSB7XG4gICAgICBXZWxjb21lUGFnZS5tYW5hZ2VCbHVyU2NyZWVuKEJsdXJTY3JlZW5BY3Rpb25zLlJlbW92ZSk7XG4gICAgfVxuICAgIGlmICh0aGlzLnNob3dQYXNzY29kZVRpbWVvdXQpIHtcbiAgICAgIGNsZWFyVGltZW91dCh0aGlzLnNob3dQYXNzY29kZVRpbWVvdXQpO1xuICAgICAgdGhpcy5zaG93UGFzc2NvZGVUaW1lb3V0ID0gMDtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgYXBwbGljYXRpb25EaWRGaW5pc2hMYXVuY2hpbmdXaXRoT3B0aW9ucz8oXG4gICAgICAgIGFwcGxpY2F0aW9uOiBVSUFwcGxpY2F0aW9uLCBsYXVuY2hPcHRpb25zOiBOU0RpY3Rpb25hcnk8YW55LCBhbnk+KTogYm9vbGVhbiB7XG4gICAgTG9nZ2VyLmluc3RhbmNlLmFwcERlbGVnYXRlLmluZm8oJ0luc2lkZSBhcHBsaWNhdGlvbkRpZEZpbmlzaExhdW5jaGluZ1dpdGhPcHRpb25zIGFwcCBkZWxlZ2F0ZSBtZXRob2QnKTtcbiAgICBsZXQgY2VudGVyID0gIFVOVXNlck5vdGlmaWNhdGlvbkNlbnRlci5jdXJyZW50Tm90aWZpY2F0aW9uQ2VudGVyKCk7XG4gICAgY2VudGVyLmRlbGVnYXRlID0gdGhpcztcblxuICAgIHRoaXMuX3JlZ2lzdGVyRGVmYXVsdHNGcm9tU2V0dGluZ3NCdW5kbGUoKTtcblxuICAgIHJldHVybiB0cnVlO1xuICB9ICBcblxuICBwdWJsaWMgYXBwbGljYXRpb25EaWRSZWdpc3RlckZvclJlbW90ZU5vdGlmaWNhdGlvbnNXaXRoRGV2aWNlVG9rZW4oXG4gICAgICAgIGFwcGxpY2F0aW9uOiBVSUFwcGxpY2F0aW9uLCBkZXZpY2VUb2tlbjogTlNEYXRhKTogdm9pZCB7XG4gICAgTG9nZ2VyLmluc3RhbmNlLmFwcERlbGVnYXRlLmluZm8oXG4gICAgICAnSW5zaWRlIGFwcGxpY2F0aW9uRGlkUmVnaXN0ZXJGb3JSZW1vdGVOb3RpZmljYXRpb25zV2l0aERldmljZVRva2VuIGFwcCBkZWxlZ2F0ZSBtZXRob2QnKTtcbiAgICBQdXNoTm90aWZpY2F0aW9uLmdldEluc3RhbmNlKCkuZGlkUmVnaXN0ZXJGb3JSZW1vdGVOb3RpZmljYXRpb25zKGRldmljZVRva2VuKTtcbiAgfVxuXG4gIHB1YmxpYyBhcHBsaWNhdGlvbkRpZEZhaWxUb1JlZ2lzdGVyRm9yUmVtb3RlTm90aWZpY2F0aW9uc1dpdGhFcnJvcihhcHBsaWNhdGlvbjogVUlBcHBsaWNhdGlvbiwgZXJyb3I6IE5TRXJyb3IpOiB2b2lkIHtcbiAgICBMb2dnZXIuaW5zdGFuY2UuYXBwRGVsZWdhdGUuaW5mbyhcbiAgICAgICdJbnNpZGUgYXBwbGljYXRpb25EaWRGYWlsVG9SZWdpc3RlckZvclJlbW90ZU5vdGlmaWNhdGlvbnNXaXRoRXJyb3IgYXBwIGRlbGVnYXRlIG1ldGhvZCcpO1xuICAgIFB1c2hOb3RpZmljYXRpb24uZ2V0SW5zdGFuY2UoKS5kaWRGYWlsVG9SZWdpc3Rlck5vdGlmaWNhdGlvbnMoZXJyb3IpO1xuICB9XG5cbiAgcHVibGljIHVzZXJOb3RpZmljYXRpb25DZW50ZXJXaWxsUHJlc2VudE5vdGlmaWNhdGlvbldpdGhDb21wbGV0aW9uSGFuZGxlcihcbiAgICAgICAgY2VudGVyOiBVTlVzZXJOb3RpZmljYXRpb25DZW50ZXIsIG5vdGlmaWNhdGlvbjogVU5Ob3RpZmljYXRpb24sIFxuICAgICAgICBjb21wbGV0aW9uSGFuZGxlcjogKHAxOiBVTk5vdGlmaWNhdGlvblByZXNlbnRhdGlvbk9wdGlvbnMpID0+IHZvaWQpOiB2b2lkIHtcbiAgICBsZXQgcGF5bG9hZCA9IG5vdGlmaWNhdGlvbi5yZXF1ZXN0LmNvbnRlbnQudXNlckluZm87XG4gICAgbGV0IGV2ZW50RGF0YSA9IHtcbiAgICAgIGV2ZW50TmFtZTogJ2ZvcmVncm91bmROb3RpZmljYXRpb25FdmVudCcsXG4gICAgICBvYmplY3Q6IHtcbiAgICAgICAgUHJlc2VudGF0aW9uT3B0aW9uczoge1xuICAgICAgICAgIEFsZXJ0OiA0LFxuICAgICAgICAgIEFsbDogNyxcbiAgICAgICAgICBCYWRnZTogMSxcbiAgICAgICAgICBOb25lOiAwLFxuICAgICAgICAgIFNvdW5kOiAyLFxuICAgICAgICB9LFxuICAgICAgICBiYWRnZTogbm90aWZpY2F0aW9uLnJlcXVlc3QuY29udGVudC5iYWRnZSxcbiAgICAgICAgYm9keTogbm90aWZpY2F0aW9uLnJlcXVlc3QuY29udGVudC5ib2R5LFxuICAgICAgICBjb21wbGV0aW9uSGFuZGxlcixcbiAgICAgICAgcGF5bG9hZDogdGhpcy5fZGljdGlvbmFyeVRvT2JqZWN0KHBheWxvYWQpLFxuICAgICAgICB0aXRsZTogbm90aWZpY2F0aW9uLnJlcXVlc3QuY29udGVudC50aXRsZSxcbiAgICAgIH0sXG4gICAgfTtcbiAgICB0aGlzLl91bmlmeUV2ZW50RGF0YShldmVudERhdGEpO1xuICAgIGFwcGxpY2F0aW9uLm5vdGlmeShldmVudERhdGEpO1xuICB9XG5cbiAgcHVibGljIGFwcGxpY2F0aW9uRGlkUmVjZWl2ZVJlbW90ZU5vdGlmaWNhdGlvbkZldGNoQ29tcGxldGlvbkhhbmRsZXIoXG4gICAgICAgIHVpQXBwbGljYXRpb246IFVJQXBwbGljYXRpb24sIHBheWxvYWQ6IE5TRGljdGlvbmFyeTxhbnksIGFueT4sIFxuICAgICAgICBjb21wbGV0aW9uSGFuZGxlcjogKHAxOiBVSUJhY2tncm91bmRGZXRjaFJlc3VsdCkgPT4gdm9pZCk6IHZvaWQge1xuICAgIGxldCBvUGF5bG9hZCA9IHRoaXMuX2RpY3Rpb25hcnlUb09iamVjdChwYXlsb2FkKTtcbiAgICBsZXQgZXZlbnREYXRhID0ge1xuICAgICAgZXZlbnROYW1lOiAnY29udGVudEF2YWlsYWJsZUV2ZW50JyxcbiAgICAgIG9iamVjdDoge1xuICAgICAgICBGZXRjaFJlc3VsdDoge1xuICAgICAgICAgIEZhaWxlZDogMixcbiAgICAgICAgICBOZXdEYXRhOiAwLFxuICAgICAgICAgIE5vRGF0YTogMSxcbiAgICAgICAgfSxcbiAgICAgICAgYmFkZ2U6IG9QYXlsb2FkLmFwcy5iYWRnZSxcbiAgICAgICAgYm9keTogb1BheWxvYWQuYXBzLmFsZXJ0LmJvZHksXG4gICAgICAgIGNvbXBsZXRpb25IYW5kbGVyLFxuICAgICAgICBwYXlsb2FkOiBvUGF5bG9hZCxcbiAgICAgICAgdGl0bGU6IG9QYXlsb2FkLmFwcy5hbGVydC50aXRsZSxcbiAgICAgIH0sXG4gICAgfTtcbiAgICB0aGlzLl91bmlmeUV2ZW50RGF0YShldmVudERhdGEpO1xuICAgIGFwcGxpY2F0aW9uLm5vdGlmeShldmVudERhdGEpO1xuICB9XG5cbiAgcHVibGljIHVzZXJOb3RpZmljYXRpb25DZW50ZXJEaWRSZWNlaXZlTm90aWZpY2F0aW9uUmVzcG9uc2VXaXRoQ29tcGxldGlvbkhhbmRsZXIoXG4gICAgICAgIGNlbnRlcjogVU5Vc2VyTm90aWZpY2F0aW9uQ2VudGVyLCByZXNwb25zZTogVU5Ob3RpZmljYXRpb25SZXNwb25zZSxcbiAgICAgICAgY29tcGxldGlvbkhhbmRsZXI6ICgpID0+IHZvaWQpOiB2b2lkIHtcbiAgICBsZXQgYWN0aW9uSWRlbnRpZmllciA9IHJlc3BvbnNlLmFjdGlvbklkZW50aWZpZXI7XG4gICAgbGV0IHBheWxvYWQgPSByZXNwb25zZS5ub3RpZmljYXRpb24ucmVxdWVzdC5jb250ZW50LnVzZXJJbmZvO1xuICAgIGxldCBvUGF5bG9hZCA9IHRoaXMuX2RpY3Rpb25hcnlUb09iamVjdChwYXlsb2FkKTtcbiAgICBsZXQgZXZlbnREYXRhID0ge1xuICAgICAgZXZlbnROYW1lOiAncmVjZWl2ZU5vdGlmaWNhdGlvblJlc3BvbnNlRXZlbnQnLFxuICAgICAgb2JqZWN0OiB7XG4gICAgICAgIGFjdGlvbklkZW50aWZpZXIsXG4gICAgICAgIGJhZGdlOiBvUGF5bG9hZC5hcHMuYmFkZ2UsXG4gICAgICAgIGJvZHk6IG9QYXlsb2FkLmFwcy5hbGVydC5ib2R5LFxuICAgICAgICBjb21wbGV0aW9uSGFuZGxlcixcbiAgICAgICAgcGF5bG9hZDogb1BheWxvYWQsXG4gICAgICAgIHRpdGxlOiBvUGF5bG9hZC5hcHMuYWxlcnQudGl0bGUsXG4gICAgICB9LFxuICAgIH07XG4gICAgdGhpcy5fdW5pZnlFdmVudERhdGEoZXZlbnREYXRhKTtcbiAgICBhcHBsaWNhdGlvbi5ub3RpZnkoZXZlbnREYXRhKTtcbiAgfVxuXG4gIHByaXZhdGUgX3VuaWZ5RXZlbnREYXRhKGV2ZW50RGF0YTogYW55KSB7XG4gICAgbGV0IHBheWxvYWQgPSBldmVudERhdGEub2JqZWN0LnBheWxvYWQ7XG4gICAgLy8gdW5pZnkgZGF0YSBmaWVsZFxuICAgIGlmIChwYXlsb2FkLmRhdGEgJiYgdHlwZW9mIHBheWxvYWQuZGF0YSA9PT0gJ3N0cmluZycpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGV2ZW50RGF0YS5vYmplY3QuZGF0YSA9IEpTT04ucGFyc2UocGF5bG9hZC5kYXRhKTtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgLy8gY29udmVyIHNpbmdsZSBxdW90ZSB0byBkb3VibGUgcXVvdGUsIGFuZCB0cnkgYWdhaW5cbiAgICAgICAgbGV0IHNEYXRhID0gcGF5bG9hZC5kYXRhLnJlcGxhY2UoLycvZywgJ1wiJyk7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgZXZlbnREYXRhLm9iamVjdC5kYXRhID0gSlNPTi5wYXJzZShzRGF0YSk7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICBldmVudERhdGEub2JqZWN0LmRhdGEgPSBwYXlsb2FkLmRhdGE7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgLy8gbW92ZSBsb2Mta2V5IGFuZCBsb2MtYXJncyB0byB1bmRlciBub3RpZmljYXRpb24gc2VjdGlvbixcbiAgICAvLyBvblJlY2VpdmVQdXNoTm90aWZpY2F0aW9uIHdpbGwgdXNlIGl0IHRvIGxvY2FsaXplIHRoZSBtZXNzYWdlXG4gICAgaWYgKHBheWxvYWQuYXBzLmFsZXJ0Wyd0aXRsZS1sb2Mta2V5J10gfHxcbiAgICAgICAgcGF5bG9hZC5hcHMuYWxlcnRbJ2xvYy1rZXknXSkge1xuICAgICAgcGF5bG9hZC5ub3RpZmljYXRpb24gPSBwYXlsb2FkLm5vdGlmaWNhdGlvbiB8fCB7fTtcbiAgICAgIHBheWxvYWQubm90aWZpY2F0aW9uLnRpdGxlTG9jS2V5ID0gcGF5bG9hZC5hcHMuYWxlcnRbJ3RpdGxlLWxvYy1rZXknXTtcbiAgICAgIHBheWxvYWQubm90aWZpY2F0aW9uLnRpdGxlTG9jQXJncyA9IHBheWxvYWQuYXBzLmFsZXJ0Wyd0aXRsZS1sb2MtYXJncyddO1xuICAgICAgcGF5bG9hZC5ub3RpZmljYXRpb24uYm9keUxvY0tleSA9IHBheWxvYWQuYXBzLmFsZXJ0Wydsb2Mta2V5J107XG4gICAgICBwYXlsb2FkLm5vdGlmaWNhdGlvbi5ib2R5TG9jQXJncyA9IHBheWxvYWQuYXBzLmFsZXJ0Wydsb2MtYXJncyddO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX2RpY3Rpb25hcnlUb09iamVjdChkaWN0OiBOU0RpY3Rpb25hcnk8c3RyaW5nLCBhbnk+KTogYW55IHtcbiAgICBsZXQganNvbkRhdGEgPSBOU0pTT05TZXJpYWxpemF0aW9uLmRhdGFXaXRoSlNPTk9iamVjdE9wdGlvbnNFcnJvcihkaWN0LCAxKTtcbiAgICBsZXQganNvblN0cmluZyA9IE5TU3RyaW5nLmFsbG9jKCkuaW5pdFdpdGhCeXRlc0xlbmd0aEVuY29kaW5nKFxuICAgICAgICBqc29uRGF0YS5ieXRlcywganNvbkRhdGEubGVuZ3RoLCBOU1VURjhTdHJpbmdFbmNvZGluZyk7XG4gICAgcmV0dXJuIEpTT04ucGFyc2UoanNvblN0cmluZy50b1N0cmluZygpKTtcbiAgfVxuXG4gIHByaXZhdGUgX3JlZ2lzdGVyRGVmYXVsdHNGcm9tU2V0dGluZ3NCdW5kbGUoKSB7XG4gICAgbGV0IHNldHRpbmdzUGF0aCA9IE5TQnVuZGxlLm1haW5CdW5kbGUucGF0aEZvclJlc291cmNlT2ZUeXBlKCdTZXR0aW5ncycsICdidW5kbGUnKTtcbiAgICBsZXQgc2V0dGluZ3NCdW5kbGU6IE5TU3RyaW5nID0gTlNTdHJpbmcuc3RyaW5nV2l0aFN0cmluZyhzZXR0aW5nc1BhdGgpO1xuICAgIGxldCByb290UGF0aCA9IHNldHRpbmdzQnVuZGxlLnN0cmluZ0J5QXBwZW5kaW5nUGF0aENvbXBvbmVudCgnUm9vdC5wbGlzdCcpO1xuXG4gICAgbGV0IHNldHRpbmdzID0gTlNEaWN0aW9uYXJ5LmRpY3Rpb25hcnlXaXRoQ29udGVudHNPZkZpbGUocm9vdFBhdGgpO1xuICAgIGxldCBwcmVmZXJlbmNlcyA9IHNldHRpbmdzLm9iamVjdEZvcktleSgnUHJlZmVyZW5jZVNwZWNpZmllcnMnKTtcbiAgICBsZXQgcHJlZnM6IG51bWJlciA9ICg8YW55PiBwcmVmZXJlbmNlcykuY291bnQ7XG4gICAgbGV0IGRlZmF1bHRzVG9SZWdpc3RlciA9IE5TTXV0YWJsZURpY3Rpb25hcnkuYWxsb2MoKS5pbml0V2l0aENhcGFjaXR5KHByZWZzKTtcblxuICAgIGxldCBwcmVmU3BlY2lmaWNhdGlvbiA9IG51bGw7XG4gICAgbGV0IGtleSA9IG51bGw7XG4gICAgbGV0IHZhbHVlID0gbnVsbDtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHByZWZzOyBpKyspIHtcbiAgICAgICAgcHJlZlNwZWNpZmljYXRpb24gPSAoPGFueT4gcHJlZmVyZW5jZXMpLm9iamVjdEF0SW5kZXgoaSk7XG4gICAgICAgIGtleSA9IHByZWZTcGVjaWZpY2F0aW9uLm9iamVjdEZvcktleSgnS2V5Jyk7XG4gICAgICAgIHZhbHVlID0gcHJlZlNwZWNpZmljYXRpb24ub2JqZWN0Rm9yS2V5KCdEZWZhdWx0VmFsdWUnKTtcbiAgICAgICAgaWYgKGtleSAmJiB2YWx1ZSkge1xuICAgICAgICAgICAgZGVmYXVsdHNUb1JlZ2lzdGVyLnNldE9iamVjdEZvcktleSh2YWx1ZSwga2V5KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIE5TVXNlckRlZmF1bHRzLnN0YW5kYXJkVXNlckRlZmF1bHRzLnJlZ2lzdGVyRGVmYXVsdHMoZGVmYXVsdHNUb1JlZ2lzdGVyIGFzIGFueSk7XG4gICAgTlNVc2VyRGVmYXVsdHMuc3RhbmRhcmRVc2VyRGVmYXVsdHMuc3luY2hyb25pemUoKTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgQXBwbGljYXRpb24gfSBmcm9tICcuLi9BcHBsaWNhdGlvbic7XG5pbXBvcnQgeyBBcHBsaWNhdGlvbkV2ZW50RGF0YSB9IGZyb20gJ3Rucy1jb3JlLW1vZHVsZXMvYXBwbGljYXRpb24nO1xuaW1wb3J0IHsgV2VsY29tZVBhZ2UgfSBmcm9tICdtZGstY29yZS9wYWdlcy9XZWxjb21lUGFnZSc7XG5pbXBvcnQgeyBDbGllbnRTZXR0aW5ncywgQWN0aXZpdHlSZXN1bHRSZXF1ZXN0Q29kZSB9IGZyb20gJ21kay1jb3JlL3N0b3JhZ2UvQ2xpZW50U2V0dGluZ3MnO1xuaW1wb3J0IHsgUGFzc2NvZGVTb3VyY2UgfSBmcm9tICdtZGstY29yZS9zdG9yYWdlL0NsaWVudFNldHRpbmdzJztcbmltcG9ydCAqIGFzIGZyYW1lTW9kdWxlIGZyb20gJ3Rucy1jb3JlLW1vZHVsZXMvdWkvZnJhbWUnO1xuaW1wb3J0IHsgTG9nZ2VyIH0gZnJvbSAnbWRrLWNvcmUvdXRpbHMvTG9nZ2VyJztcbmltcG9ydCAqIGFzIGFwcGxpY2F0aW9uIGZyb20gJ3Rucy1jb3JlLW1vZHVsZXMvYXBwbGljYXRpb24nO1xuaW1wb3J0IHsgTURLUGFnZSB9IGZyb20gJ21kay1jb3JlL3BhZ2VzL01ES1BhZ2UnO1xuaW1wb3J0IHsgRXZlbnRIYW5kbGVyIH0gZnJvbSAnbWRrLWNvcmUvRXZlbnRIYW5kbGVyJztcbmltcG9ydCB7IFBhZ2VSZW5kZXJlciB9IGZyb20gJ21kay1jb3JlL3BhZ2VzL1BhZ2VSZW5kZXJlcic7XG5pbXBvcnQgeyBDdXN0b21FdmVudEhhbmRsZXIgYXMgQ3VzdG9tRXZlbnRIYW5kbGVyQmFzZSB9IGZyb20gJ21kay1jb3JlL0N1c3RvbUV2ZW50SGFuZGxlcic7XG5pbXBvcnQgeyBJMThuTGFuZ3VhZ2V9IGZyb20gJ21kay1jb3JlL3V0aWxzL0kxOG5MYW5ndWFnZSc7XG5cbmRlY2xhcmUgdmFyIGNvbTogYW55O1xuXG5leHBvcnQgY2xhc3MgQ3VzdG9tRXZlbnRIYW5kbGVyIHtcblxuICBwcml2YXRlIHN0YXRpYyBfYXBwU3VzcGVuc2lvbkhlbHBlcigpIHtcbiAgICBpZiAoQ2xpZW50U2V0dGluZ3MuaXNMaXZlTW9kZSgpICYmIEFwcGxpY2F0aW9uLmlzTWFpblBhZ2VSZW5kZXJlZCgpICYmXG4gICAgICAhQ3VzdG9tRXZlbnRIYW5kbGVyQmFzZS5pc1Bhc3Njb2RlU2NyZWVuRGlzcGxheWluZyAmJlxuICAgICAgQ3VzdG9tRXZlbnRIYW5kbGVyQmFzZS5kaXNwbGF5UGFzc2NvZGVJbnB1dFNjcmVlbikge1xuICAgICAgV2VsY29tZVBhZ2UuYXBwbGljYXRpb25XaWxsRW50ZXJCYWNrZ3JvdW5kKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIHdlIGFyZW4ndCBiYWNrZ3JvdW5kaW5nIChtb3N0IGxpa2VseSBtYWluIHBhZ2UgaGFzbid0IHlldCByZW5kZXJlZCBjdXogbWF5IGJlIHN0aWxsIGRvaW5nIG9kYXRhIGluaXQpLiBcbiAgICAgIC8vIFJlc2V0IHRoZSBmbGFnIGZvciBuZXh0IHRpbWUgd2UgY29tZSBoZXJlLlxuICAgICAgQ3VzdG9tRXZlbnRIYW5kbGVyQmFzZS5kaXNwbGF5UGFzc2NvZGVJbnB1dFNjcmVlbiA9IGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX3Nob3dQYXNzY29kZVRpbWVvdXQgPSAwO1xuICBwcml2YXRlIF9yZXN1bWVkQWN0ID0gbnVsbDtcbiAgcHJpdmF0ZSBfcGF1c2VkQWN0ID0gbnVsbDtcbiAgcHJpdmF0ZSBfbGlmZWN5Y2xlQ2FsbGJhY2sgPSBudWxsO1xuXG4gIHB1YmxpYyBvbkFwcFJlc3VtZWQoYXJnczogYW55KSB7XG4gICAgaWYgKENsaWVudFNldHRpbmdzLmdldFBhc3Njb2RlU291cmNlKCkgPT09IFBhc3Njb2RlU291cmNlLlVzZXJPbmJvYXJkZWRXaXRob3V0UGFzc2NvZGUpIHtcbiAgICAgIEFwcGxpY2F0aW9uLm9uUmVzdW1lKGFyZ3MpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICAvLyBtYWluUGFnZVJlbmRlcmVkIGZsYWcgaXMgdXNlZCB0byBlbnN1cmUgb2ZmbGluZSBpbml0IGhhcyBjb21wbGV0ZWQgYWZ0ZXIgb25ib2FyZGluZyBiZWZvcmUgd2UgZ2V0IGhlcmUuXG4gICAgaWYgKENsaWVudFNldHRpbmdzLmlzTGl2ZU1vZGUoKSAmJiBBcHBsaWNhdGlvbi5pc01haW5QYWdlUmVuZGVyZWQoKSAmJlxuICAgICAgIUN1c3RvbUV2ZW50SGFuZGxlckJhc2UuaXNQYXNzY29kZVNjcmVlbkRpc3BsYXlpbmcgJiYgQ3VzdG9tRXZlbnRIYW5kbGVyQmFzZS5kaXNwbGF5UGFzc2NvZGVJbnB1dFNjcmVlbikge1xuICAgICAgQ3VzdG9tRXZlbnRIYW5kbGVyQmFzZS5pc1Bhc3Njb2RlU2NyZWVuRGlzcGxheWluZyA9IHRydWU7XG5cbiAgICAgIFdlbGNvbWVQYWdlLmFwcGxpY2F0aW9uV2lsbEVudGVyRm9yZWdyb3VuZCgpO1xuICAgIH1cbiAgICBpZiAodGhpcy5fc2hvd1Bhc3Njb2RlVGltZW91dCkge1xuICAgICAgY2xlYXJUaW1lb3V0KHRoaXMuX3Nob3dQYXNzY29kZVRpbWVvdXQpO1xuICAgICAgdGhpcy5fc2hvd1Bhc3Njb2RlVGltZW91dCA9IDA7XG4gICAgICBBcHBsaWNhdGlvbi5vblJlc3VtZShhcmdzKTtcbiAgICB9XG4gICAgLy8gZW5hYmxlIGRlbW8gbW9kZSByZXN1bWUgZXZlbnRcbiAgICBpZiAoQ2xpZW50U2V0dGluZ3MuaXNEZW1vTW9kZSgpKSB7XG4gICAgICBBcHBsaWNhdGlvbi5vblJlc3VtZShhcmdzKTtcbiAgICB9XG4gIH1cblxuICAvLyBUaGlzIGFwcGxpY2F0aW9uIGNhbGxiYWNrIG1ldGhvZCBpcyBmaXJlZCBieSB7Tn0gZWFjaCB0aW1lIHRoZSBhcHAgaXMgc3VzcGVuZGVkLiAgXG4gIC8vIFRoZSBhcHAgY2FuIGdldCBvbnN1c3BlbmRlZCBjYWxsIHR3byB3YXlzLlxuICAvLyAgICBhKSBVc3VhbCB3aGVuIGFwcCBiYWNrZ3JvdW5kcy4gIFxuICAvLyAgICBiKSBUaGUgcnVubmluZyBhY3Rpdml0eSBjYWxscyBpbnRvIGEgbm9uLXtOfSBhY3Rpdml0eS4gRm9yIGluc3RhbmNlLCBcbiAgLy8gICAgdGhlIGZvcm0gY2VsbCBsaXN0IHBpY2tlciB3aGVuIG9wZW5lZCBsYXVuY2hlcyBhIG5ldyBhY3Rpdml0eSBjb250cm9sbGVkIGJ5IHRoZSBTREsgdGhhdCB7Tn0gaGFzIG5vIGlkZWEgYWJvdXQsIFxuICAvLyBJbiBjYXNlIGIpIHNpbmNlIHtOfSBpcyB0cnlpbmcgdG8gc3VzcGVuZCB0aGUgYXBwIHdlIG5lZWQgdG8gcHJldmVudCBpdCBhcyBhcHAgaXMgc3RpbGwgYWN0aXZlLFxuICAvLyBlbHNlIHRoZSBwYXNzY29kZSBlbnRyeSB3aW5kb3cgd2lsbCBzaG93IHVwIHdoZW4gdXNlciByZXR1cm5zIGZyb20gbGlzdCBwaWNrZXIuXG4gIC8vIE5vdywgdGhlIHRyaWNreSBwYXJ0IGlzIGhvdyB0byBkaXN0aW5ndWlzaCBiZXR3ZWVuIGNhc2UgYSkgYW5kIGNhc2UgYikgc28gdGhlIGJlbG93IGNvZGUgb25seSBleGVjdXRlcyBmb3IgY2FzZSBhKS5cbiAgLy8gU29sdXRpb246XG4gIC8vIFdlIG5lZWQgdG8gZ28gbW9yZSBncmFudWxhciBhbmQgY2hlY2sgb24gYWN0aXZpdHkgY2FsbGJhY2tzOiBhY3Rpdml0eVBhdXNlZCBhbmQgYWN0aXZpdHlSZXN1bWVkLlxuICAvLyBGb3IgY2FzZSBhKSBUaGUgc2VxdWVuY2Ugb2YgY2FsbGJhY2tzIHdoZW4gd2UganVzdCBiYWNrZ3JvdW5kOlxuICAvLyAgICBvbkFwcFBhdXNlLCBvbkFjdGl2aXR5UGF1c2VcbiAgLy8gVGhlIHNlcXVlbmNlIG9mIGNhbGxiYWNrcyB3aGVuIHdlIG9wZW4gYSBsaXN0IHBpY2tlcjpcbiAgLy8gICAgb25BcHBQYXVzZSwgb25BY3Rpdml0eVBhdXNlLCBvbkFwcFJlc3VtZWQsIG9uQWN0aXZpdHlSZXN1bWVkICAoZWFjaCBldmVudCBmaXJlZCBvbmUgYWZ0ZXIgYW5vdGhlciB2ZXJ5IHF1aWNrbHkpLlxuICAvLyAgV2hlbiBhcHAgZ2V0cyBzdXNwZW5kZWQgYW5kIHdlIGdldCBoZXJlLCB3YWl0IHZlcnkgYnJpZWZseSBmb3IgYWxsIGNhbGxiYWNrcyB0byBmaXJlIGFuZCB0aGVuXG4gIC8vICAgIElmIHRoZXJlIGlzIGFuIGFjdGl2aXR5IHRoYXQgZ290IHJlc3VtZWQgd2Uga25vdyB3ZSBhcmUgbmF2aWdhdGluZyBpbiBvdXIgYXBwIChsaWtlIGxpc3QgcGlja2VyKS5cbiAgLy8gICAgSWYgdGhlcmUgaXMgbm8gYWN0aXZpdHkgZ2V0dGluZyByZXN1bWVkLCB3ZSBrbm93IGFwcCBpcyBnZXR0aW5nIHN1c3BlbmRlZCBhbmQgd2UgcnVuIHRoZSBjb2RlLlxuXG4gIHB1YmxpYyBvbkFwcFN1c3BlbmRlZChhcmdzOiBhbnkpIHtcbiAgICBpZiAoQ3VzdG9tRXZlbnRIYW5kbGVyQmFzZS5pc1Bhc3Njb2RlU2NyZWVuRGlzcGxheWluZyB8fCBDbGllbnRTZXR0aW5ncy5pc1VzZXJDaGFuZ2luZ1Bhc3Njb2RlKSB7XG4gICAgICAvLyBXZSBnb3QgcGF1c2VkIHdoZW4gb24gcGFzc2NvZGUgZW50cnkgc2NyZWVuLiAgSWYgc28sIGRvbid0IHN1c3BlbmQsIFxuICAgICAgLy8ganVzdCByZXNldCB0aGUgZmxhZ3MgYW5kIGl0J3MgYmFjayB0byBwYXNzY29kZSBlbnRyeS5cbiAgICAgIEN1c3RvbUV2ZW50SGFuZGxlckJhc2UuaXNQYXNzY29kZVNjcmVlbkRpc3BsYXlpbmcgPSBmYWxzZTtcbiAgICAgIEN1c3RvbUV2ZW50SGFuZGxlckJhc2UuZGlzcGxheVBhc3Njb2RlSW5wdXRTY3JlZW4gPSB0cnVlO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmIChDbGllbnRTZXR0aW5ncy5nZXRQYXNzY29kZVNvdXJjZSgpID09PSBQYXNzY29kZVNvdXJjZS5Vc2VyT25ib2FyZGVkV2l0aG91dFBhc3Njb2RlKSB7XG4gICAgICBBcHBsaWNhdGlvbi5vblN1c3BlbmQoYXJncyk7XG4gICAgICByZXR1cm47ICAvLyBuby1vcFxuICAgIH1cblxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgLy8gY29uc3QgcmVzdW1lZEFjdGl2aXR5VHlwZSA9IHRoaXMuX3Jlc3VtZWRBY3QuZ2V0Q2xhc3MoKS5nZXRTaW1wbGVOYW1lKCk7XG4gICAgICAvLyBjb25zdCBwYXVzZWRBY3Rpdml0eVR5cGUgPSB0aGlzLl9wYXVzZWRBY3QuZ2V0Q2xhc3MoKS5nZXRTaW1wbGVOYW1lKCk7XG4gICAgICBpZiAodGhpcy5fcmVzdW1lZEFjdCAmJiB0aGlzLl9wYXVzZWRBY3QgJiZcbiAgICAgICAgdGhpcy5fcmVzdW1lZEFjdC5nZXRDbGFzcygpLmdldFNpbXBsZU5hbWUoKSA9PT0gdGhpcy5fcGF1c2VkQWN0LmdldENsYXNzKCkuZ2V0U2ltcGxlTmFtZSgpKSB7XG4gICAgICAgIC8vIFdlIGp1c3QgbmF2aWdhdGVkIHdpdGhpbiBNREsgYXBwIChlLmcuIGF0dGFjaG1lbnQpLCBcbiAgICAgICAgLy8gSWYgZm9yIHNvbWUgcmVhc29uIHtOfSBzdGlsbCBmaXJlZCBhIHN1c3BlbmRlZCBldmVudCwgTm8tb3AuXG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGlmICh0aGlzLl9yZXN1bWVkQWN0ICYmIHRoaXMuX3BhdXNlZEFjdCAmJlxuICAgICAgICB0aGlzLl9yZXN1bWVkQWN0LmdldENsYXNzKCkuZ2V0U2ltcGxlTmFtZSgpLmluY2x1ZGVzKCdMaXN0UGlja2VyRm9ybUNlbGxBY3Rpdml0eScpICYmXG4gICAgICAgIHRoaXMuX3BhdXNlZEFjdC5nZXRDbGFzcygpLmdldFNpbXBsZU5hbWUoKSA9PT0gJ01ES0FuZHJvaWRBY3Rpdml0eScpIHtcbiAgICAgICAgLy8gV2UganVzdCBuYXZpZ2F0ZWQgd2l0aGluIE1ESyBhcHAgKGUuZy4gbGlzdCBwaWNrZXIpLCBcbiAgICAgICAgLy8gSWYgZm9yIHNvbWUgcmVhc29uIHtOfSBzdGlsbCBmaXJlZCBhIHN1c3BlbmRlZCBldmVudCwgTm8tb3AuXG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGlmIChDbGllbnRTZXR0aW5ncy5pc0xpdmVNb2RlKCkgJiYgIUN1c3RvbUV2ZW50SGFuZGxlckJhc2UuZGlzcGxheVBhc3Njb2RlSW5wdXRTY3JlZW4pIHtcbiAgICAgICAgbGV0IHRpbWVvdXQgPSBDbGllbnRTZXR0aW5ncy5nZXRQYXNzY29kZVRpbWVvdXQoKTtcbiAgICAgICAgaWYgKHRpbWVvdXQgPiAwKSB7XG4gICAgICAgICAgaWYgKHRoaXMuX3Nob3dQYXNzY29kZVRpbWVvdXQpIHtcbiAgICAgICAgICAgIGNsZWFyVGltZW91dCh0aGlzLl9zaG93UGFzc2NvZGVUaW1lb3V0KTtcbiAgICAgICAgICB9XG4gICAgICAgICAgdGhpcy5fc2hvd1Bhc3Njb2RlVGltZW91dCA9IDxhbnk+IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgLy8gc2V0IGZsYWcgYWZ0ZXIgdGltZW91dFxuICAgICAgICAgICAgQXBwbGljYXRpb24uc2V0T25ib2FyZGluZ0NvbXBsZXRlZChmYWxzZSk7XG4gICAgICAgICAgICBDdXN0b21FdmVudEhhbmRsZXJCYXNlLmRpc3BsYXlQYXNzY29kZUlucHV0U2NyZWVuID0gdHJ1ZTtcbiAgICAgICAgICAgIEN1c3RvbUV2ZW50SGFuZGxlci5fYXBwU3VzcGVuc2lvbkhlbHBlcigpO1xuICAgICAgICAgIH0sIDEwMDAgKiB0aW1lb3V0KTtcbiAgICAgICAgICBBcHBsaWNhdGlvbi5vblN1c3BlbmQoYXJncyk7XG4gICAgICAgIH0gZWxzZSBpZiAodGltZW91dCA9PT0gMCkge1xuICAgICAgICAgIC8vIGFsd2F5cyBzaG93IHBhc3Njb2RlXG4gICAgICAgICAgQXBwbGljYXRpb24ub25TdXNwZW5kKGFyZ3MpO1xuICAgICAgICAgIEFwcGxpY2F0aW9uLnNldE9uYm9hcmRpbmdDb21wbGV0ZWQoZmFsc2UpO1xuICAgICAgICAgIEN1c3RvbUV2ZW50SGFuZGxlckJhc2UuZGlzcGxheVBhc3Njb2RlSW5wdXRTY3JlZW4gPSB0cnVlO1xuICAgICAgICAgIEN1c3RvbUV2ZW50SGFuZGxlci5fYXBwU3VzcGVuc2lvbkhlbHBlcigpO1xuICAgICAgICB9XG4gICAgICB9IC8vIGVsc2Ugbm8tb3AgYXMgd2UganVzdCBtb3ZlZCB0byBhbm90aGVyIGFjdGl2aXR5IGluIG91ciBhcHAgdGhhdCB7Tn0gZG9lcyBub3Qga25vdyBhbnl0aGluZyBhYm91dC5cbiAgICAgIC8vIGVuYWJsZSBkZW1vIG1vZGUgc3VzcGVuZCBldmVudFxuICAgICAgaWYgKENsaWVudFNldHRpbmdzLmlzRGVtb01vZGUoKSkge1xuICAgICAgICBBcHBsaWNhdGlvbi5vblN1c3BlbmQoYXJncyk7XG4gICAgICB9XG4gICAgfSwgNTAwKTtcbiAgfVxuXG4gIHB1YmxpYyBvbkFwcExhdW5jaGVkKGFyZ3M6IGFueSkgeyAgICBcbiAgICAvLyB7Tn0gdHJlYXRzIHJlLW9wZW5pbmcgdGhlIGFwcGxpY2F0aW9uIGFzIGEgdG90YWwgcmVsYXVuY2ggaW5zdGVhZCBvZiBhIHJlc3VtZS4gIElmIHRoZSBhcHAgaXMgYWxyZWFkeVxuICAgIC8vIG9wZW4sIGp1c3QgZ28gdGhyb3VnaCBvdXIgb25BcHBSZXN1bWVkLlxuICAgIGlmIChBcHBsaWNhdGlvbi5pc01haW5QYWdlUmVuZGVyZWQoKSkge1xuICAgICAgdGhpcy5vbkFwcFJlc3VtZWQoYXJncyk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy8gQ3JlYXRlIGFuIG9ic2VydmVyIGZvciB0aGlzIGFjdGl2aXR5IHdpdGhpbiB0aGUgTURLTGlmZWN5Y2xlT2JzZXJ2ZXIgdG8gbWFuYWdlIGFwcCBsaWZlY3ljbGUgZXZlbnRzXG4gICAgaWYgKHRoaXMuX2xpZmVjeWNsZUNhbGxiYWNrID09IG51bGwpIHtcbiAgICAgIHRoaXMuX2xpZmVjeWNsZUNhbGxiYWNrID0gbmV3IGNvbS5zYXAubWRrLmNsaWVudC51aS5saWZlY3ljbGUuSU1ES0V2ZW50SGFuZGxlcih7XG4gICAgICAgIG9uQXBwUmVzdW1lZDogKCkgPT4ge1xuICAgICAgICAgIC8vIGNyZWF0aW5nIGN1c3RvbSByZXN1bWUvc3VzcGVuZCBldmVudCBvYmplY3RzIGFzIGl0cyBub3QgcGFzc2VkIGZyb20gbmF0aXZlIGxheWVyXG4gICAgICAgICAgY29uc3QgcmVzdW1lRXZlbnREYXRhOiBBcHBsaWNhdGlvbkV2ZW50RGF0YSA9IHtcbiAgICAgICAgICAgIGFuZHJvaWQ6IHt9LFxuICAgICAgICAgICAgZXZlbnROYW1lOiAncmVzdW1lZCcsXG4gICAgICAgICAgICBvYmplY3Q6IGFwcGxpY2F0aW9uLFxuICAgICAgICAgIH07XG4gICAgICAgICAgcmV0dXJuIHRoaXMub25BcHBSZXN1bWVkKHJlc3VtZUV2ZW50RGF0YSk7XG4gICAgICAgIH0sXG4gICAgICAgIG9uQXBwU3VzcGVuZGVkOiAoKSA9PiB7XG4gICAgICAgICAgY29uc3Qgc3VzcGVuZEV2ZW50RGF0YTogQXBwbGljYXRpb25FdmVudERhdGEgPSB7XG4gICAgICAgICAgICBhbmRyb2lkOiB7fSxcbiAgICAgICAgICAgIGV2ZW50TmFtZTogJ3N1c3BlbmRlZCcsXG4gICAgICAgICAgICBvYmplY3Q6IGFwcGxpY2F0aW9uLFxuICAgICAgICAgIH07XG4gICAgICAgICAgdGhpcy5vbkFwcFN1c3BlbmRlZChzdXNwZW5kRXZlbnREYXRhKTtcbiAgICAgICAgfSxcbiAgICAgIH0pO1xuICAgICAgY29tLnNhcC5tZGsuY2xpZW50LnVpLmxpZmVjeWNsZS5NREtMaWZlY3ljbGVPYnNlcnZlci5hZGRPYnNlcnZlcih0aGlzLl9saWZlY3ljbGVDYWxsYmFjayk7XG4gICAgfVxuXG4gICAgaWYgKENsaWVudFNldHRpbmdzLmlzTGl2ZU1vZGUoKSAmJiAhQ3VzdG9tRXZlbnRIYW5kbGVyQmFzZS5pc1JlTGF1bmNoSW5Qcm9ncmVzcykge1xuICAgICAgQ3VzdG9tRXZlbnRIYW5kbGVyQmFzZS5pc1JlTGF1bmNoSW5Qcm9ncmVzcyA9IHRydWU7XG4gICAgICAvLyBPbmJvYXJkZWQgVXNlciBleGl0ZWQgY2xpZW50IGFuZCByZXR1cm5pbmcuICBXZSB3aWxsIHN0YXJ0IG91dCB3aXRoIHBhc3Njb2RlL2Jpb21ldHJpY3MuXG4gICAgICAvLyBPbmx5IHRoZSBicmlkZ2UgcmUtY3JlYXRlZCBoZXJlIGJ5IG5hdGl2ZSBzaWRlIGJhc2VkIG9uIHBhcmFtcyBwYXNzZWQgaW4uXG4gICAgICBpZiAoQ2xpZW50U2V0dGluZ3MuZ2V0UGFzc2NvZGVTb3VyY2UoKSAhPT0gUGFzc2NvZGVTb3VyY2UuVXNlck9uYm9hcmRlZFdpdGhvdXRQYXNzY29kZSkge1xuICAgICAgICBDdXN0b21FdmVudEhhbmRsZXJCYXNlLmlzUGFzc2NvZGVTY3JlZW5EaXNwbGF5aW5nID0gdHJ1ZTtcbiAgICAgIH1cblxuICAgICAgaWYgKGFyZ3MuYW5kcm9pZC5nZXREYXRhKCkgIT09IG51bGwpIHtcbiAgICAgICAgQ2xpZW50U2V0dGluZ3Muc2V0Q29ubmVjaW9uSW5mb1RvYXN0TWVzc2FnZShhcmdzLmFuZHJvaWQuZ2V0RGF0YSgpKTtcbiAgICAgIH1cbiAgICAgIFxuICAgICAgbGV0IG9QYWdlID0gbmV3IFdlbGNvbWVQYWdlKCk7XG4gICAgICBsZXQgb25ib2FyZGluZ1BhcmFtcyA9IENsaWVudFNldHRpbmdzLmdldE9uYm9hcmRpbmdQYXJhbXMoKTtcblxuICAgICAgY29uc3QgcGFzc2NvZGVTcmMgPSBDbGllbnRTZXR0aW5ncy5nZXRQYXNzY29kZVNvdXJjZSgpLnRvU3RyaW5nKCk7XG4gICAgICBsZXQgcGFzc2NvZGVTcmNQYXJhbSA9IHtcbiAgICAgICAgUGFzc2NvZGVTb3VyY2U6IHBhc3Njb2RlU3JjLFxuICAgICAgfTtcbiAgICAgIC8vIFNpbmNlIGFwcCByZS1sYXVuY2hlZCwgbmF0aXZlIHNpZGUgaGFzIGZvcmdvdHRlbiBvdXIgcGFzc2NvZGUgc291cmNlLiAgUmVmcmVzaCBpdC5cbiAgICAgIG9uYm9hcmRpbmdQYXJhbXMgPSBPYmplY3QuYXNzaWduKG9uYm9hcmRpbmdQYXJhbXMsIHBhc3Njb2RlU3JjUGFyYW0pO1xuICAgICAgV2VsY29tZVBhZ2UucmVzdG9yZU9uUmVsYXVuY2gob25ib2FyZGluZ1BhcmFtcyk7XG4gICAgIFxuICAgICAgdGhpcy5hY3RpdmF0ZUFwcExpZmVDeWNsZUNhbGxiYWNrcygpO1xuICAgIH0gZWxzZSBpZiAoIUNsaWVudFNldHRpbmdzLmlzTGl2ZU1vZGUoKSkge1xuICAgICAgLy8gV2UgYXJlIG9uYm9hcmRpbmcuICBDaGVjayBpZiBsYXVuY2ggd2FzIHZpYSBhIFVSTC5cbiAgICAgIGlmIChhcmdzLmFuZHJvaWQgJiYgYXJncy5hbmRyb2lkLmdldERhdGEgJiYgKGFyZ3MuYW5kcm9pZC5nZXREYXRhKCkgIT09IG51bGwpKSB7XG4gICAgICAgIC8vIHNjaGVtYW5hbWU6Ly8/PGtleTE9dmFsdWUxJmtleTI9dmFsdWUyPiBGb3IgZXg6IG1ka2NsaWVudDovLz9BcHBJZD1PRGF0YU9ubHkmQ2xpZW50SWQ9YWJjZC0xMjM0XG4gICAgICAgIGxldCBsYXVuY2hVcmwgPSBhcmdzLmFuZHJvaWQuZ2V0RGF0YVN0cmluZygpO1xuICAgICAgICBsZXQgc3RhcnRJZHggPSBsYXVuY2hVcmwuaW5kZXhPZignPycpO1xuICAgICAgICBpZiAoc3RhcnRJZHggPiAwKSB7XG4gICAgICAgICAgTG9nZ2VyLmluc3RhbmNlLmFwcERlbGVnYXRlLmluZm8oTG9nZ2VyLlNUQVJUVVBfQVBQX0xBVU5DSEVEX1ZJQV9VUkwsIGxhdW5jaFVybCk7XG4gICAgICAgICAgaWYgKENsaWVudFNldHRpbmdzLmlzQ29ubmVjdGlvblNldHRpbmdzRW5hYmxlT3ZlcnJpZGVzKCkpIHtcbiAgICAgICAgICAgIENsaWVudFNldHRpbmdzLnByb2Nlc3NDb25uZWN0aW9uU2V0dGluZ3NGcm9tTGF1bmNoVVJMKGxhdW5jaFVybC5zdWJzdHJpbmcoc3RhcnRJZHggKyAxKSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIC8vIEp1c3QgcHJvY2VzcyB0aGUgc2V0dGluZ3MgaXMgZW5vdWdoLCBpdCBnZXRzIHBpY2tlZCB1cCBhbmQgc2VudCBvdmVyIHRvIG5hdGl2ZSBzaWRlIFxuICAgICAgICAgIC8vIHRvIGJlIHVzZWQgYnkgV2VsY29tZSBzY3JlZW4gbmV4dCB0aW1lIGl0IHNob3dzLlxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLy8gQWN0aXZpdHkgY2FsbGJhY2tzIG5lZWRlZCBmb3IgYW4gZWRnZSBjYXNlLiAgXG4gIC8vIElmIHVzZXIgZXhpdHMgb25ib2FyZGVkIGFwcCwgYW5kIHJldHVybnMgd2Ugc2hvdyBwYXNzY29kZS9GUCBmb3IgYSByZS1sYXVuY2guXG4gIC8vIElmIHVzZXIgYWdhaW4gYmFja2dyb3VuZHMgYXQgdGhpcyBwYXNzY29kZS9GUCBzY3JlZW4sIHRoZSBhY3Rpdml0eSBpcyBwYXVzZWQvc3RvcHBlZCBieSBhbmRyb2lkIGFuZCBpZiB1c2VyIFxuICAvLyBjbGlja3MgYXBwIGljb24gYWdhaW4gaGUgd291bGQgc2VlIHBhc3Njb2RlL0ZQIHNjcmVlbiBhbmQgb24gZW50ZXJpbmcgcGFzc2NvZGUvRlAgYXBwIG11c3QgcmUtbGF1bmNoIFxuICAvLyBidXQgYW5kcm9pZCBkb2VzIGFuIGFwcCByZXN1bWUgaW5zdGVhZCBvZiB0aGUgcmUtbGF1bmNoIHdlIG5lZWQuXG4gIC8vIEhlbmNlIG5lZWQgdG8gdXNlIHRoZXNlIGFjdGl2aXR5IGNhbGxiYWNrcyB0byBjaGVjayB3aGljaCBhY3Rpdml0eSBpcyBnZXR0aW5nIHBhdXNlZC5cblxuICAvLyBpZiBhbnkgYWN0aXZpdHkgaXMgcmVzdW1lZCB3ZSBjYWNoZSB0aGF0IGhlcmUuLi4uXG4gIHB1YmxpYyBvbkFjdGl2aXR5UmVzdW1lZChhcmdzOiBhbnkpIHtcbiAgICB0aGlzLl9yZXN1bWVkQWN0ID0gYXJncy5hY3Rpdml0eTtcbiAgICBpZiAoQ2xpZW50U2V0dGluZ3MuZ2V0U2NyZWVuU2hhcmluZ1dpdGhBbmRyb2lkVmVyc2lvbigpKSB7XG4gICAgICB0aGlzLl9yZXN1bWVkQWN0LmdldFdpbmRvdygpLmNsZWFyRmxhZ3MoYW5kcm9pZC52aWV3LldpbmRvd01hbmFnZXIuTGF5b3V0UGFyYW1zLkZMQUdfU0VDVVJFKTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gRGlzYWJsZSBTY3JlZW5TaGFyaW5nIFxuICAgICAgdGhpcy5fcmVzdW1lZEFjdC5nZXRXaW5kb3coKS5zZXRGbGFncyhcbiAgICAgICAgYW5kcm9pZC52aWV3LldpbmRvd01hbmFnZXIuTGF5b3V0UGFyYW1zLkZMQUdfU0VDVVJFLCBhbmRyb2lkLnZpZXcuV2luZG93TWFuYWdlci5MYXlvdXRQYXJhbXMuRkxBR19TRUNVUkUpO1xuICAgIH1cbiAgICAvLyBJZiBvdXIgcGFzc2NvZGUgY2hhbmdlIGFjdGlvbiBjb21wbGV0ZWQgYW5kIHdlIGFyZSBub3cgaW4gRlAgKG1lYW5zIHBhc3Njb2RlIGNoYW5nZSB3YXMgZG9uZSksIGlmIHdlIGFyZSBpbiBcbiAgICAvLyBOYXRpdmVzY3JpcHRBY3Rpdml0eSBtZWFucyBhY3Rpb24gZmFpbGVkLiAgRWl0aGVyIHdheSB3ZSBuZWVkIHRvIGZpcmUgdGhlIGhhbmRsZXJzIG5vdy5cbiAgICBjb25zdCBhY3Rpdml0eVR5cGUgPSB0aGlzLl9yZXN1bWVkQWN0LmdldENsYXNzKCkuZ2V0U2ltcGxlTmFtZSgpO1xuICAgIGlmIChhY3Rpdml0eVR5cGUgPT09ICdGaW5nZXJwcmludEFjdGl2aXR5J1xuICAgICAgICB8fCBhY3Rpdml0eVR5cGUgPT09ICdNREtBbmRyb2lkQWN0aXZpdHknKSB7XG4gICAgICBpZiAoQ3VzdG9tRXZlbnRIYW5kbGVyQmFzZS5wYXNzY29kZUNoYW5nZUFjdGlvbkNvbXBsZXRlICE9PSBudWxsKSB7XG4gICAgICAgIFdlbGNvbWVQYWdlLmZpcmVDaGFuZ2VVc2VyUGFzc2NvZGVTdWNjZXNzT3JGYWlsdXJlQWN0aW9uKEN1c3RvbUV2ZW50SGFuZGxlckJhc2UucGFzc2NvZGVDaGFuZ2VBY3Rpb25Db21wbGV0ZSk7XG4gICAgICAgIEN1c3RvbUV2ZW50SGFuZGxlckJhc2UucGFzc2NvZGVDaGFuZ2VBY3Rpb25Db21wbGV0ZSA9IG51bGw7XG4gICAgICB9IGVsc2UgaWYgKEN1c3RvbUV2ZW50SGFuZGxlckJhc2UucGFzc2NvZGVWZXJpZnlBY3Rpb25Db21wbGV0ZSAhPT0gbnVsbCkge1xuICAgICAgICBXZWxjb21lUGFnZS5maXJlVmVyaWZ5UGFzc2NvZGVTdWNjZXNzT3JGYWlsdXJlQWN0aW9uKEN1c3RvbUV2ZW50SGFuZGxlckJhc2UucGFzc2NvZGVWZXJpZnlBY3Rpb25Db21wbGV0ZSk7XG4gICAgICAgIEN1c3RvbUV2ZW50SGFuZGxlckJhc2UucGFzc2NvZGVWZXJpZnlBY3Rpb25Db21wbGV0ZSA9IG51bGw7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChhY3Rpdml0eVR5cGUgPT09ICdNREtMYXVuY2hTY3JlZW5BY3Rpdml0eScpIHtcbiAgICAgIC8vIFdlIGFyZSBzdGFydGluZyAob3IgcmVzdGFydGluZyBhZnRlciBhIGxvZ291dCkuICBHZXQgb3VyIGxpc3RlbmVycyBzZXR1cC5cbiAgICAgIHRoaXMuYWN0aXZhdGVBcHBMaWZlQ3ljbGVDYWxsYmFja3MoKTtcbiAgICB9XG4gICAgY29uc3QgdG9wRnJhbWUgPSBmcmFtZU1vZHVsZS5GcmFtZS50b3Btb3N0KCk7XG4gICAgaWYgKHRvcEZyYW1lICYmIHRvcEZyYW1lLmN1cnJlbnRQYWdlKSB7XG4gICAgICBsZXQgbWRrUGFnZSA9IHRvcEZyYW1lLmN1cnJlbnRQYWdlIGFzIE1ES1BhZ2U7XG4gICAgICBpZiAobWRrUGFnZSAmJiBtZGtQYWdlLmlzUmVzdW1pbmcpIHtcbiAgICAgICAgbWRrUGFnZS5pc1Jlc3VtaW5nID0gZmFsc2U7XG4gICAgICAgIGNvbnN0IG9uUmVzdW1lRXZlbnQgPSBtZGtQYWdlLmRlZmluaXRpb24uZ2V0T25SZXN1bWVFdmVudCgpO1xuICAgICAgICBjb25zdCBoYW5kbGVyOiBFdmVudEhhbmRsZXIgPSBuZXcgRXZlbnRIYW5kbGVyKCk7XG4gICAgICAgIGhhbmRsZXIuZXhlY3V0ZUFjdGlvbk9yUnVsZShvblJlc3VtZUV2ZW50LCBtZGtQYWdlLmNvbnRleHQpLnRoZW4oKCkgPT4ge1xuICAgICAgICAgIFBhZ2VSZW5kZXJlci5jdXJyZW50bHlSZW5kZXJlZFBhZ2UgPSB1bmRlZmluZWQ7XG4gICAgICAgIH0pLmNhdGNoKCgpID0+IHtcbiAgICAgICAgICBQYWdlUmVuZGVyZXIuY3VycmVudGx5UmVuZGVyZWRQYWdlID0gdW5kZWZpbmVkO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBsZXQgYXBwTGFuZyA9IENsaWVudFNldHRpbmdzLmdldEFwcExhbmd1YWdlKCk7XG4gICAgLy8gQWZ0ZXIgcmVzdW1pbmcgdGhlIGFwcCwgaWYgdXNlciBpcyBpbiBvbmJvYXJkaW5nIHBhZ2VzLCBpdCB3aWxsIGVuc3VyZSB0aGUgY29ycmVjdCBsYW5ndWFnZSBpcyByZWZsZWN0ZWRcbiAgICBBcHBsaWNhdGlvbi5pbml0aWFsaXplTG9jYWxpemF0aW9uQW5kQ3VzdG9taXphdGlvbigpO1xuXG4gICAgLy8ga2VlcCBsb2NhbGUgZm9yIGxvZ2luIHBhZ2VcbiAgICBpZiAoYWN0aXZpdHlUeXBlID09PSAnV2ViVmlld0FjdGl2aXR5Jykge1xuICAgICAgSTE4bkxhbmd1YWdlLmFwcGx5TGFuZ3VhZ2UoYXBwTGFuZyk7XG4gICAgfVxuXG4gICAgbGV0IGlzUlRMOiBib29sZWFuO1xuXG4gICAgLyogQWZ0ZXIgbG9nb3V0LCB0aGUgaTE4biBzZXR0aW5ncyBhcmUgcmVzZXQgYW5kIGFwcCBsYW51Z2FnZSBpcyB1bmRlZmluZWQuXG4gICAgSW4gdGhhdCBzY2VuYXJpbywgdGhlIGxheW91dCBkaXJlY3Rpb24gd291bGQgYmUgYWNjb3JkaW5nIHRvIHRoZSBkZXZpY2UgbGFuZ3VhZ2UuKi9cblxuICAgIGlmIChhcHBMYW5nICE9PSB1bmRlZmluZWQpIHsgXG4gICAgICBpc1JUTCA9IENsaWVudFNldHRpbmdzLmdldEFwcExhbmd1YWdlSXNSVEwoKTtcbiAgICAgIGxldCBmb3JlZ3JvdW5kQWN0ID0gYXJncy5hY3Rpdml0eTtcbiAgICAgIGxldCBmb3JlZ3JvdW5kV2luZG93ID0gZm9yZWdyb3VuZEFjdC5nZXRXaW5kb3coKTtcbiAgICAgIGlmIChmb3JlZ3JvdW5kV2luZG93KSB7XG4gICAgICAgIGxldCBmb3JlZ3JvdW5kRGVjb3JWaWV3ID0gZm9yZWdyb3VuZFdpbmRvdy5nZXREZWNvclZpZXcoKTtcbiAgICAgICAgaWYgKGZvcmVncm91bmREZWNvclZpZXcpIHtcbiAgICAgICAgICBpZiAoaXNSVEwpIHtcbiAgICAgICAgICAgIGZvcmVncm91bmREZWNvclZpZXcuc2V0TGF5b3V0RGlyZWN0aW9uKGFuZHJvaWQudmlldy5WaWV3LkxBWU9VVF9ESVJFQ1RJT05fUlRMKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZm9yZWdyb3VuZERlY29yVmlldy5zZXRMYXlvdXREaXJlY3Rpb24oYW5kcm9pZC52aWV3LlZpZXcuTEFZT1VUX0RJUkVDVElPTl9MVFIpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICB9XG4gIC8vIElmIGFueSBhY3Rpdml0eSBwYXVzZWQsICBMZXRzIHNldCBvdXIgcmVzdW1lZEFjdCB0byBiZSBudWxsIGFzIGl0IHdpbGwgYmUgcG9wdWxhdGVkIGJ5IGFib3ZlIGNhbGxiYWNrIHZlcnkgc29vbiBcbiAgLy8gaWYgc29tZXRoaW5nIGVsc2UgcmVzdW1lZCBhZnRlciB0aGUgcGF1c2UgKGkuZS4gd2UgYXJlIG1vdmluZyBiZXR3ZWVuIGFjdGl2aXRpZXMpLiAgXG4gIC8vIElmIG5vdGhpbmcgcmVzdW1lcyAoaS5lLiB1c2VyIGp1c3QgYmFja2dyb3VuZGVkIGhpcyBhY3Rpdml0eSkgb3VyIF9yZXN1bWVkQWN0IHdpbGwgcmVtYWluIG51bGwuXG4gIHB1YmxpYyBvbkFjdGl2aXR5UGF1c2VkKGFyZ3M6IGFueSkge1xuICAgIHRoaXMuX3BhdXNlZEFjdCA9IGFyZ3MuYWN0aXZpdHk7XG4gICAgaWYgKCFDbGllbnRTZXR0aW5ncy5nZXRTY3JlZW5TaGFyaW5nKCkpIHtcbiAgICAgIHRoaXMuX3BhdXNlZEFjdC5nZXRXaW5kb3coKS5zZXRGbGFncyhcbiAgICAgICAgYW5kcm9pZC52aWV3LldpbmRvd01hbmFnZXIuTGF5b3V0UGFyYW1zLkZMQUdfU0VDVVJFLCBhbmRyb2lkLnZpZXcuV2luZG93TWFuYWdlci5MYXlvdXRQYXJhbXMuRkxBR19TRUNVUkUpO1xuICAgIH1cbiAgICB0aGlzLl9yZXN1bWVkQWN0ID0gbnVsbDtcbiAgICAvL1xuICAgIGxldCBhY3QgPSBhcmdzLmFjdGl2aXR5LmdldENsYXNzKCkuZ2V0U2ltcGxlTmFtZSgpO1xuICAgIGlmIChhY3QuaW5jbHVkZXMoJ1Bhc3Njb2RlJykgfHwgYWN0ID09PSAnRmluZ2VycHJpbnRBY3Rpdml0eScgfHwgYWN0LmluY2x1ZGVzKCdMaXN0UGlja2VyRm9ybUNlbGxBY3Rpdml0eScpKSB7XG4gICAgICAvLyBVc2VyIGJhY2tncm91bmRpbmcgb24gcGFzc2NvZGUvRlAgYWN0aXZpdHkuICBcbiAgICAgIC8vIElmIHdlIHdlcmUgaW4gbWlkc3Qgb2YgcGFzc2NvZGUgY2hhbmdlLCByZXNldCBmbGFnLlxuICAgICAgLy8gZWxzZSBpZiBpdHMgYSByZWxhdW5jaCwganVzdCBraWxsIHRoZSBwYXNzY29kZS9GUCBhY3Rpdml0eSBhbmQgaXRzIHRhc2suXG4gICAgICAvLyAgc28gd2hlbiB1c2VyIGNsaWNrcyBpY29uIG5leHQgdGltZSwgcmVsYXVuY2ggd2lsbCBvY2N1ciBhcyB1c3VhbCBjcmVhdGluZyBhIG5ldyBwYXNjb2RlL0ZQIGFjdGl2aXR5LlxuICAgICAgLy8gXG4gICAgICAvLyBHaXZlIGEgc2xpZ2h0IGRlbGF5IHNvIGFsbCBhY3Rpdml0eSBjYWxsYmFja3MgaGF2ZSBmaXJlZC5cbiAgICAgIGlmIChhY3QuaW5jbHVkZXMoJ0xpc3RQaWNrZXJGb3JtQ2VsbEFjdGl2aXR5JykpIHtcbiAgICAgICAgTURLUGFnZS5zZXREaXNwbGF5aW5nRXh0ZXJuYWxQYWdlKHRydWUpO1xuICAgICAgfVxuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIGlmICh0aGlzLl9yZXN1bWVkQWN0ID09PSBudWxsKSB7XG4gICAgICAgICAgaWYgKENsaWVudFNldHRpbmdzLmlzVXNlckNoYW5naW5nUGFzc2NvZGUpIHtcbiAgICAgICAgICAgIC8vIFVzZXIgYmFja2dyb3VuZGVkLCBzbyBjYWxsIGFwcFN1c3BlbmRlZCBzbyBhbnkgcGFzc2NvZGUgdGltZW91dCBjYW4ga2ljayBpbiBhcyBpbiBub3JtYWwgYXBwIHN1c3BlbnNpb24uIFxuICAgICAgICAgICAgLy8gTm90ZSB0aGF0IGJlY2F1c2Ugd2UgYXJlIGluIHBhc3Njb2RlL0ZQIGFjdGl2aXR5IHdoaWNoIGlzIG5vdCBuYXRpdmVzY3JpcHQsIFxuICAgICAgICAgICAgLy8gc28gd2UgbWFudWFsbHkgbmVlZCB0byBjYWxsIHN1c3BlbmRcbiAgICAgICAgICAgIEN1c3RvbUV2ZW50SGFuZGxlckJhc2UuZGlzcGxheVBhc3Njb2RlSW5wdXRTY3JlZW4gPSBmYWxzZTtcbiAgICAgICAgICAgIENsaWVudFNldHRpbmdzLmlzVXNlckNoYW5naW5nUGFzc2NvZGUgPSBmYWxzZTtcbiAgICAgICAgICB9IGVsc2UgaWYgKEN1c3RvbUV2ZW50SGFuZGxlckJhc2UuaXNSZUxhdW5jaEluUHJvZ3Jlc3MpIHtcbiAgICAgICAgICAgIGFyZ3MuYWN0aXZpdHkuZmluaXNoQWZmaW5pdHkoKTtcbiAgICAgICAgICAgIGZyYW1lTW9kdWxlLkZyYW1lLnRvcG1vc3QoKS5hbmRyb2lkLmFjdGl2aXR5LmZpbmlzaCgpO1xuICAgICAgICAgICAgQ3VzdG9tRXZlbnRIYW5kbGVyQmFzZS5pc1JlTGF1bmNoSW5Qcm9ncmVzcyA9IGZhbHNlO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSwgMTAwMCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIE1ES1BhZ2Uuc2V0RGlzcGxheWluZ0V4dGVybmFsUGFnZShmYWxzZSk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIG9uQWN0aXZpdHlSZXN1bHQoYXJnczogYW55KSB7XG4gICAgLy8gVXNpbmcgc3dpdGNoIGhlcmUgaW5jYXNlIHJlc3VsdCBmcm9tIG90aGVyIGFjdGl2aXRpZXMgbmVlZHMgdG8gYmUgaGFuZGxlZCBpbiB0aGUgZnV0dXJlLlxuICAgIHN3aXRjaCAoYXJncy5yZXF1ZXN0Q29kZSkge1xuICAgICAgY2FzZSBBY3Rpdml0eVJlc3VsdFJlcXVlc3RDb2RlLkF0dGFjaG1lbnRGb3JtQ2VsbDpcbiAgICAgIGNhc2UgQWN0aXZpdHlSZXN1bHRSZXF1ZXN0Q29kZS5PcGVuRG9jdW1lbnQ6XG4gICAgICAgIEFwcGxpY2F0aW9uLnNldE5vbk5TQWN0aXZpdHlEb25lKHRydWUpO1xuICAgICAgICBicmVhaztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgYWN0aXZhdGVBcHBMaWZlQ3ljbGVDYWxsYmFja3MoKSB7XG4gICAgLy8gV2UgYXJlIHN0YXJ0aW5nIChvciByZXN0YXJ0aW5nIGFmdGVyIGEgbG9nb3V0KS4gIEdldCBvdXIgbGlzdGVuZXJzIHNldHVwLlxuICAgIC8vIE5vdGUgdGhhdCB3ZSBuZWVkIHRvIHR1cm5vZmYgYW5kIHR1cm5vbiBhZ2Fpbi5cbiAgICAvLyBJZiBub3QsIGlmIGl0IHdhcyBhbHJlYWR5IG9uLCBldmVudHMgZmlyZSBtdWx0aXBsZSB0aW1lcyB3aGVuIHdlIGdldCBoZXJlLlxuICAgIGFwcGxpY2F0aW9uLm9mZihhcHBsaWNhdGlvbi5sYXVuY2hFdmVudCk7XG4gICAgYXBwbGljYXRpb24ub24oYXBwbGljYXRpb24ubGF1bmNoRXZlbnQsIChhcmdzKSA9PiB0aGlzLm9uQXBwTGF1bmNoZWQoYXJncykpO1xuICB9XG59XG4iLCIvKipcbiAqIEFwcGxpY2F0aW9uLmpzIGlzIHRoZSBhY3R1YWwgcG9pbnQgb2YgZW50cnkgZm9yIHRoZSBhcHAuIEl0IHN0YXJ0cyB0aGUgYXBwIGJ5IGZpcnN0IGxvYWRpbmcgZGVmaW5pdGlvbnMgb2YgdGhlIGFwcFxuICogYW5kIGl0cyBtYWluIHBhZ2UsIHRoZW4gc2hvd2luZyB0aGUgbWFpbiBwYWdlIHVzaW5nIHRoZSAzcmQgcGFydHkgTmF2aWdhdGlvbiBjbGFzcy5cbiAqL1xuaW1wb3J0IHsgTmF2aWdhdGlvbkVudHJ5LCBGcmFtZSB9IGZyb20gJ3Rucy1jb3JlLW1vZHVsZXMvdWkvZnJhbWUnO1xuaW1wb3J0IHsgYWxlcnQgfSBmcm9tICd0bnMtY29yZS1tb2R1bGVzL3VpL2RpYWxvZ3MnO1xuaW1wb3J0ICogYXMgYXBwbGljYXRpb24gZnJvbSAndG5zLWNvcmUtbW9kdWxlcy9hcHBsaWNhdGlvbic7XG5pbXBvcnQgKiBhcyBJQ29udGV4dCBmcm9tICdtZGstY29yZS9jb250ZXh0L0lDb250ZXh0JztcbmltcG9ydCB7IENvbnRleHQgfSBmcm9tICdtZGstY29yZS9jb250ZXh0L0NvbnRleHQnO1xuaW1wb3J0IHsgQXBwbGljYXRpb25FdmVudERhdGEgfSBmcm9tICd0bnMtY29yZS1tb2R1bGVzL2FwcGxpY2F0aW9uJztcbmltcG9ydCB7IENsaWVudFNldHRpbmdzIH0gZnJvbSAnbWRrLWNvcmUvc3RvcmFnZS9DbGllbnRTZXR0aW5ncyc7XG5pbXBvcnQgeyBPbmJvYXJkaW5nU3RhdGUgfSBmcm9tICdtZGstY29yZS9zdG9yYWdlL0NsaWVudFNldHRpbmdzJztcbmltcG9ydCB7IFBhZ2VSZW5kZXJlciB9IGZyb20gJ21kay1jb3JlL3BhZ2VzL1BhZ2VSZW5kZXJlcic7XG5pbXBvcnQgeyBNREtQYWdlIH0gZnJvbSAnbWRrLWNvcmUvcGFnZXMvTURLUGFnZSc7XG5pbXBvcnQgeyBEZWZpbml0aW9uUHJvdmlkZXIgfSBmcm9tICdtZGstY29yZS9kZWZpbml0aW9ucy9EZWZpbml0aW9uUHJvdmlkZXInO1xuaW1wb3J0IHsgSURlZmluaXRpb25Qcm92aWRlciB9IGZyb20gJ21kay1jb3JlL2RlZmluaXRpb25zL0lEZWZpbml0aW9uUHJvdmlkZXInO1xuaW1wb3J0IHsgRXZlbnRIYW5kbGVyIH0gZnJvbSAnbWRrLWNvcmUvRXZlbnRIYW5kbGVyJztcbmltcG9ydCB7IElEZWZpbml0aW9uTG9hZGVyIH0gZnJvbSAnbWRrLWNvcmUvZGVmaW5pdGlvbnMvSURlZmluaXRpb25Mb2FkZXInO1xuaW1wb3J0IHsgQnVuZGxlRGVmaW5pdGlvbkxvYWRlciB9IGZyb20gJy4vZGVmaW5pdGlvbnMvQnVuZGxlRGVmaW5pdGlvbkxvYWRlcic7XG5pbXBvcnQgeyBEZW1vQnVuZGxlRGVmaW5pdGlvbkxvYWRlciB9IGZyb20gJy4vZGVmaW5pdGlvbnMvRGVtb0J1bmRsZURlZmluaXRpb25Mb2FkZXInO1xuaW1wb3J0IHsgSURhdGFTZXJ2aWNlIH0gZnJvbSAnbWRrLWNvcmUvZGF0YS9JRGF0YVNlcnZpY2UnO1xuaW1wb3J0IHsgT0RhdGFTZXJ2aWNlIH0gZnJvbSAnbWRrLWNvcmUvZGF0YS9PRGF0YVNlcnZpY2UnO1xuaW1wb3J0IHsgSVJlc3RTZXJ2aWNlIH0gZnJvbSAnbWRrLWNvcmUvZGF0YS9JUmVzdFNlcnZpY2UnO1xuaW1wb3J0IHsgUmVzdFNlcnZpY2UgfSBmcm9tICdtZGstY29yZS9kYXRhL1Jlc3RTZXJ2aWNlJztcbmltcG9ydCB7IExpZmVjeWNsZU1hbmFnZXIgfSBmcm9tICcuL2xpZmVjeWNsZU1hbmFnZW1lbnQvTGlmZWN5Y2xlTWFuYWdlcic7XG5pbXBvcnQgeyBJQWN0aW9uRmFjdG9yeSB9IGZyb20gJ21kay1jb3JlL2FjdGlvbnMvSUFjdGlvbkZhY3RvcnknO1xuaW1wb3J0IHsgQWN0aW9uRmFjdG9yeSB9IGZyb20gJ21kay1jb3JlL2FjdGlvbnMvQWN0aW9uRmFjdG9yeSc7XG5pbXBvcnQgeyBJU2VnbWVudEZhY3RvcnkgfSBmcm9tICdtZGstY29yZS90YXJnZXRwYXRoL3NlZ21lbnRzL0lTZWdtZW50RmFjdG9yeSc7XG5pbXBvcnQgeyBTZWdtZW50RmFjdG9yeSB9IGZyb20gJ21kay1jb3JlL3RhcmdldHBhdGgvc2VnbWVudHMvU2VnbWVudEZhY3RvcnknO1xuaW1wb3J0IHsgSUNvbnRyb2xGYWN0b3J5IH0gZnJvbSAnbWRrLWNvcmUvY29udHJvbHMvSUNvbnRyb2xGYWN0b3J5JztcbmltcG9ydCB7IFNlY3VyZVN0b3JlIH0gZnJvbSAnbWRrLWNvcmUvc3RvcmFnZS9TZWN1cmVTdG9yZSc7XG5pbXBvcnQgeyBTREtTdHlsaW5nTWFuYWdlciB9IGZyb20gJ21kay1jb3JlL3N0eWxpbmcvU0RLU3R5bGluZ01hbmFnZXInO1xuaW1wb3J0IHsgTmF2aWdhdGlvbkJhckJyaWRnZSwgTWVzc2FnZURpYWxvZyB9IGZyb20gJ21kay1zYXAnO1xuaW1wb3J0IHsgQWN0aXZpdHlJbmRpY2F0b3IgfSBmcm9tICdtZGstc2FwJztcbmltcG9ydCB7IFR5cGVDb252ZXJ0ZXIgfSBmcm9tICdtZGstY29yZS91dGlscy9UeXBlQ29udmVydGVyJztcbmltcG9ydCB7IExvZ2dlciB9IGZyb20gJ21kay1jb3JlL3V0aWxzL0xvZ2dlcic7XG5pbXBvcnQgeyBBcHBTZXR0aW5nc01hbmFnZXJ9IGZyb20gJ21kay1jb3JlL3V0aWxzL0FwcFNldHRpbmdzTWFuYWdlcic7XG5pbXBvcnQgeyBJMThuTGFuZ3VhZ2UsIExhbmd1YWdlU291cmNlfSBmcm9tICdtZGstY29yZS91dGlscy9JMThuTGFuZ3VhZ2UnO1xuaW1wb3J0IHsgSTE4bkhlbHBlciB9IGZyb20gJ21kay1jb3JlL3V0aWxzL0kxOG5IZWxwZXInO1xuaW1wb3J0IHsgVmVyc2lvbkluZm9CcmlkZ2UgfSBmcm9tICdtZGstc2FwJztcbmltcG9ydCAqIGFzIGZzIGZyb20gJ3Rucy1jb3JlLW1vZHVsZXMvZmlsZS1zeXN0ZW0nO1xuaW1wb3J0IHsgQXBwbGljYXRpb25EZWZpbml0aW9uIH0gZnJvbSAnbWRrLWNvcmUvZGVmaW5pdGlvbnMvQXBwbGljYXRpb25EZWZpbml0aW9uJztcbmltcG9ydCB7IExvZ2dlck1hbmFnZXIgfSBmcm9tICdtZGstc2FwJztcbmltcG9ydCB7IE9uYm9hcmRpbmdDdXN0b21pemF0aW9uQnJpZGdlIH0gZnJvbSAnbWRrLXNhcCc7XG5pbXBvcnQgeyBQYXRocyB9IGZyb20gJy4vc3RvcmFnZS9QYXRocyc7XG5pbXBvcnQgeyBNb2RhbEZyYW1lIH0gZnJvbSAnbWRrLWNvcmUvcGFnZXMvTW9kYWxGcmFtZSc7XG5pbXBvcnQgeyBDb250cm9sRmFjdG9yeVN5bmMgfSBmcm9tICdtZGstY29yZS9jb250cm9scy9Db250cm9sRmFjdG9yeVN5bmMnO1xuaW1wb3J0IHsgUHVzaE5vdGlmaWNhdGlvbiB9IGZyb20gJ21kay1zYXAnO1xuaW1wb3J0IHsgSW1hZ2VIZWxwZXIgfSBmcm9tICdtZGstY29yZS91dGlscy9JbWFnZUhlbHBlcic7XG5pbXBvcnQgeyBUYWJGcmFtZSB9IGZyb20gJ21kay1jb3JlL3BhZ2VzL1RhYkZyYW1lJztcbmltcG9ydCB7IE9wZW5Eb2N1bWVudEJyaWRnZSB9IGZyb20gJ21kay1zYXAnO1xuaW1wb3J0IHsgSUFwcGxpY2F0aW9uRGF0YSB9IGZyb20gJy4vSUFwcGxpY2F0aW9uRGF0YSc7XG5pbXBvcnQgeyBBcHBsaWNhdGlvbkRhdGFCdWlsZGVyIH0gZnJvbSAnbWRrLWNvcmUvYnVpbGRlcnMvQXBwbGljYXRpb25EYXRhQnVpbGRlcic7XG5pbXBvcnQgeyBNREtOYXZpZ2F0aW9uVHlwZSB9IGZyb20gJ21kay1jb3JlL2NvbW1vbi9NREtOYXZpZ2F0aW9uVHlwZSc7XG5pbXBvcnQgeyBSYWRTaWRlRHJhd2VyIH0gZnJvbSAnbmF0aXZlc2NyaXB0LXVpLXNpZGVkcmF3ZXInO1xuXG5leHBvcnQgY2xhc3MgQXBwbGljYXRpb24ge1xuICBwdWJsaWMgc3RhdGljIGNvbnRleHQgPSBudWxsO1xuICBwdWJsaWMgc3RhdGljIGlzTWFpblBhZ2VSZW5kZXJlZCgpIHtcbiAgICByZXR1cm4gdGhpcy5fbWFpblBhZ2VSZW5kZXJlZDtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgc2V0TWFpblBhZ2VSZW5kZXJlZChtYWluUGFnZVJlbmRlcmVkOiBib29sZWFuKSB7XG4gICAgdGhpcy5fbWFpblBhZ2VSZW5kZXJlZCA9IG1haW5QYWdlUmVuZGVyZWQ7XG4gIH1cblxuICAvLyBCQ1AtMTk3MDUwNzAwMjogVGhpcyBmbGFnIGlzIHRoZW4gY2hlY2tlZCBpbiBvblJlc3VtZSBldmVudCBoYW5kbGVyIHRvIGRlY2lkZVxuICAvLyB3aGV0aGVyIHRvIHNob3cgdXBkYXRlIHBvcCB1cCBvciB0byBza2lwIGl0LlxuICBwdWJsaWMgc3RhdGljIGlzTm9uTlNBY3Rpdml0eURvbmUoKSB7XG4gICAgcmV0dXJuIHRoaXMuX25vbk5TQWN0aXZpdHlEb25lO1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBzZXROb25OU0FjdGl2aXR5RG9uZShub25OU0FjdGl2aXR5RG9uZTogYm9vbGVhbikge1xuICAgIHRoaXMuX25vbk5TQWN0aXZpdHlEb25lID0gbm9uTlNBY3Rpdml0eURvbmU7XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGxhdW5jaEFwcE1haW5QYWdlKGRpZExhdW5jaEFwcDogYm9vbGVhbik6IFByb21pc2U8YW55PiB7XG4gICAgdGhpcy5zZXRPbmJvYXJkaW5nQ29tcGxldGVkKHRydWUpO1xuICAgIEFwcGxpY2F0aW9uLnNldE9uUmVzdW1lUHJvY2Vzc2luZyhmYWxzZSk7XG4gICAgcmV0dXJuIHRoaXMuX2NyZWF0ZVNpbmdsZXRvbnMoKS50aGVuKCgpID0+IHtcbiAgICAgIEFwcFNldHRpbmdzTWFuYWdlci5pbnN0YW5jZSgpLnJlbW92ZVBlbmRpbmdBY3Rpb25zKCk7XG4gICAgICBjb25zdCBzdGFydHVwUGFnZSA9IEFwcGxpY2F0aW9uLl9hcHBsaWNhdGlvblBhcmFtcy5tYWluUGFnZTtcblxuICAgICAgLy8gSW5pdGlhbGl6ZSB0byBjYXRlciBmb3IgYWZ0ZXIgYXBwIHJlc2V0IHNjZW5hcmlvXG4gICAgICB0aGlzLmluaXRpYWxpemVMb2NhbGl6YXRpb25BbmRDdXN0b21pemF0aW9uKCk7XG5cbiAgICAgIC8qKiBTTk9XQkxJTkQtNDc3MiAtIEZpbHRlciBIZWFkZXIgbGFiZWwgdGV4dCBpcyBub3Qgc3R5bGluZyB0byB0aGUgY29ycmVjdCBjb2xvclxuICAgICAgICogTmVlZCB0byBhZGQgYXBwbGljYXRpb24gc3R5bGVzIGFzIGVhcmx5IGFzIHBvc3NpYmxlLlxuICAgICAgICogT3RoZXJ3aXNlLCBDc3NQcm9wZXJ0eVBhcnNlci5nZXRQcm9wZXJ0eUZyb21TZWxlY3RvcigpIGNhbiBub3QgZ2V0IHRoZSBzdHlsZXMgZGVmaW5lZCBpbiBhcHBsaWNhdGlvbiBtZXRhZGF0YS5cbiAgICAgICAqL1xuICAgICAgY29uc3Qgc3R5bGVQYXRoID0gQXBwbGljYXRpb24uX2FwcGxpY2F0aW9uUGFyYW1zLnN0eWxlUGF0aDtcbiAgICAgIGlmIChzdHlsZVBhdGgpIHtcbiAgICAgICAgY29uc3Qgc3R5bGUgPSBJRGVmaW5pdGlvblByb3ZpZGVyLmluc3RhbmNlKCkuZ2V0RGVmaW5pdGlvbihzdHlsZVBhdGgpO1xuICAgICAgICBpZiAoc3R5bGUpIHtcbiAgICAgICAgICBhcHBsaWNhdGlvbi5hZGRDc3Moc3R5bGUudG9TdHJpbmcoKSk7XG4gICAgICAgICAgLy8gU0VBTS02NzogaW5kaWNhdG9yIHRvIHVwZGF0ZSBydWxlc2V0IG9uIENzc1Byb3BlcnR5UGFyc2VyXG4gICAgICAgICAgQ2xpZW50U2V0dGluZ3Muc2V0VXBkYXRlQ1NTUnVsZVNldEZsYWcodHJ1ZSk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgbGV0IGxhdW5jaFByb21pc2U6IFByb21pc2U8TmF2aWdhdGlvbkVudHJ5PjtcbiAgICAgIGlmIChkaWRMYXVuY2hBcHApIHtcbiAgICAgICAgLy8gQ2xlYXIgb3VyIG5hdmlnYXRpb24gc3RhY2sgYW5kIHNob3cgdGhlIGFwcC5cbiAgICAgICAgaWYoUGFnZVJlbmRlcmVyLmFwcExldmVsU2lkZURyYXdlciAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgbGF1bmNoUHJvbWlzZSA9IFBhZ2VSZW5kZXJlci5hcHBMZXZlbFNpZGVEcmF3ZXIucmVuZGVyTWFpblBhZ2UoKTtcbiAgICAgICAgfWVsc2UgeyBcbiAgICAgICAgICBsYXVuY2hQcm9taXNlID0gUGFnZVJlbmRlcmVyLnB1c2hOYXZpZ2F0aW9uKHN0YXJ0dXBQYWdlLCB0cnVlLCBNREtOYXZpZ2F0aW9uVHlwZS5Sb290KTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbGF1bmNoUHJvbWlzZSA9IFBhZ2VSZW5kZXJlci5zdGFydHVwTmF2aWdhdGlvbihzdGFydHVwUGFnZSwgdHJ1ZSk7XG4gICAgICB9XG5cbiAgICAgIC8vIHNldCBzY3JlZW4gc2hhcmluZyBmb3IgaW5kaWNhdG9yXG4gICAgICBpZiAoYXBwbGljYXRpb24uYW5kcm9pZCkge1xuICAgICAgICBBY3Rpdml0eUluZGljYXRvci5pbnN0YW5jZS5zZXRTY3JlZW5TaGFyaW5nKENsaWVudFNldHRpbmdzLmdldFNjcmVlblNoYXJpbmdXaXRoQW5kcm9pZFZlcnNpb24oKSk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBsYXVuY2hQcm9taXNlLnRoZW4oKHJlc3VsdCkgPT4ge1xuICAgICAgICBBcHBsaWNhdGlvbi5fc2V0dXBGb3JBcHBsaWNhdGlvbkxhdW5jaChkaWRMYXVuY2hBcHAsIHVuZGVmaW5lZCk7XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICB9KS5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgIExvZ2dlci5pbnN0YW5jZS5zdGFydHVwLmVycm9yKExvZ2dlci5FUlJPUiwgZXJyb3IsIGVycm9yLnN0YWNrKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBvbkRpZFVwZGF0ZSgpIHtcbiAgICBsZXQgaGFuZGxlclBhdGg6IHN0cmluZyA9IEFwcGxpY2F0aW9uLl9hcHBEZWZpbml0aW9uLmdldE9uRGlkVXBkYXRlKCk7XG4gICAgaWYgKGhhbmRsZXJQYXRoKSB7XG4gICAgICByZXR1cm4gQXBwbGljYXRpb24uX2V4ZWN1dGVXaXRoSGFuZGxlclBhdGgoaGFuZGxlclBhdGgsIHVuZGVmaW5lZCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIG9uRXhpdChhcHBFdmVudERhdGE6IEFwcGxpY2F0aW9uRXZlbnREYXRhKSB7XG4gICAgLy8gVG8gdGVzdCwgcnVuIHRoZSBhcHAgaW4gZm9yZWdyb3VuZCBhbmQgcHJlc3Mgc2hpZnQgKyBjb21tYW5kICsgSCArIEgsIHRoZW4gc3dpcGUgdGhlIGFwcCB0byBraWxsIGl0LlxuICAgIC8vIElmIHRoZSBhcHAgaXMgYWxyZWF5IGluIGJhY2tncm91bmQsIGl0IGRvZXNuJ3Qgd29yay5cblxuICAgIC8vIHJlbW92ZSByZWdpc3RlcmVkIGV2ZW50IGhhbmRsZXIgd2hlbiBvbmV4aXRcbiAgICBBcHBsaWNhdGlvbi5yZW1vdmVBcHBsaWNhdGlvbkxpc3RlbmVyKCk7XG4gICAgQXBwbGljYXRpb24uc2V0T25ib2FyZGluZ0NvbXBsZXRlZChmYWxzZSk7XG4gICAgQXBwbGljYXRpb24uc2V0TWFpblBhZ2VSZW5kZXJlZChmYWxzZSk7XG4gICAgbGV0IGhhbmRsZXJQYXRoOiBzdHJpbmcgPSBBcHBsaWNhdGlvbi5fYXBwRGVmaW5pdGlvbi5nZXRPbkV4aXQoKTtcbiAgICByZXR1cm4gQXBwbGljYXRpb24uX2V4ZWN1dGVXaXRoSGFuZGxlclBhdGgoaGFuZGxlclBhdGgsIGFwcEV2ZW50RGF0YSk7XG4gIH1cblxuICAvLyBOb3RlIHRoYXQgdGhpcyBtZXRob2QgbmVlZHMgdG8gYmUgY2FsbGVkIGV4cGxpY2l0bHkgYXMgaW4gc2V0dXBGb3JBcHBsaWNhdGlvbkxhdW5jaCgpXG4gIC8vIGFib3ZlLiAgVGhpcyBpcyBiZWNhdXNlIHdoZW4gb25MYXVuY2ggZXZlbnQgaXMgZmlyZWQgYnkge059IHdlIGhhdmVudCBPbmJvYXJkZWQgYW5kIGhlbmNlXG4gIC8vIGhhdmUgbm8gbWV0YWRhdGEuXG4gIHB1YmxpYyBzdGF0aWMgb25MYXVuY2goYXBwRXZlbnREYXRhOiBBcHBsaWNhdGlvbkV2ZW50RGF0YSk6IFByb21pc2U8YW55PiB7XG4gICAgLy8gb25MYXVuY2ggZXZlbnQgY2FuIGFjY2VwdCBhIHNpbXBsZSBvYmplY3QgYW5kIGFuIGFuIGFycmF5IGFzIHdlbGxcbiAgICBsZXQgc0hhbmRsZXJQYXRoID0gQXBwbGljYXRpb24uX2FwcERlZmluaXRpb24uZ2V0T25MYXVuY2goKTtcblxuICAgIHJldHVybiBBcHBsaWNhdGlvbi5fZXhlY3V0ZVdpdGhIYW5kbGVyUGF0aHMoVHlwZUNvbnZlcnRlci50b0FycmF5KHNIYW5kbGVyUGF0aCksIGFwcEV2ZW50RGF0YSkudGhlbigoKSA9PiB7XG4gICAgICAvLyBPbiBMYXVuY2ggQ29tcGxldGVkXG4gICAgICBpZiAoQ2xpZW50U2V0dGluZ3MuaXNMaXZlTW9kZSgpKSB7XG4gICAgICAgIExpZmVjeWNsZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zdGFydCgpO1xuICAgICAgfVxuICAgIH0pLmNhdGNoKChlcnJvcikgPT4ge1xuICAgICAgTG9nZ2VyLmluc3RhbmNlLnN0YXJ0dXAuZXJyb3IoTG9nZ2VyLlNUQVJUVVBfTEFVTkNIX0ZBSUxFRCwgZXJyb3IpO1xuICAgICAgLy8gU3RpbGwgc3RhcnQgTENNUyBjaGVja2luZyBvbiBlcnJvciwgbmV3IGFwcCBjb3VsZCBmaXggbGF1bmNoIGlzc3Vlc1xuICAgICAgaWYgKENsaWVudFNldHRpbmdzLmlzTGl2ZU1vZGUoKSkge1xuICAgICAgICBMaWZlY3ljbGVNYW5hZ2VyLmdldEluc3RhbmNlKCkuc3RhcnQoKTtcbiAgICAgIH1cbiAgICB9KS50aGVuKCgpID0+IHtcbiAgICAgIEFwcGxpY2F0aW9uLnNldFJlc3VtZUV2ZW50RGVsYXllZChmYWxzZSk7XG4gICAgfSk7XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIG9uVW5DYXVnaHRFcnJvcihhcHBFdmVudERhdGE6IEFwcGxpY2F0aW9uRXZlbnREYXRhKSB7XG4gICAgbGV0IGhhbmRsZXJQYXRoOiBzdHJpbmcgPSBBcHBsaWNhdGlvbi5fYXBwRGVmaW5pdGlvbi5nZXRPblVuQ2F1Z2h0RXJyb3IoKTtcbiAgICBBcHBsaWNhdGlvbi5fZXhlY3V0ZVdpdGhIYW5kbGVyUGF0aChoYW5kbGVyUGF0aCwgYXBwRXZlbnREYXRhKTtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgb25TdXNwZW5kKGFwcEV2ZW50RGF0YTogQXBwbGljYXRpb25FdmVudERhdGEpIHtcbiAgICAvLyBpbiBQYXNzY29kZSBkaXNwbGF5aW5nLCBkaXNhYmxlIHN1c3BlbmQgZXZlbnRcbiAgICBBcHBsaWNhdGlvbi5zZXRPblJlc3VtZVByb2Nlc3NpbmcoZmFsc2UpO1xuICAgIGlmICghQ2xpZW50U2V0dGluZ3MuaXNEZW1vTW9kZSgpICYmICFBcHBsaWNhdGlvbi5pc09uQm9hcmRpbmdDb21sZXRlZCgpKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgTGlmZWN5Y2xlTWFuYWdlci5nZXRJbnN0YW5jZSgpLnN0b3AoKTtcbiAgICBsZXQgaGFuZGxlclBhdGg6IHN0cmluZyA9IEFwcGxpY2F0aW9uLl9hcHBEZWZpbml0aW9uLmdldE9uU3VzcGVuZCgpO1xuICAgIEFwcGxpY2F0aW9uLl9leGVjdXRlV2l0aEhhbmRsZXJQYXRoKGhhbmRsZXJQYXRoLCBhcHBFdmVudERhdGEpO1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBvblJlc3VtZShhcHBFdmVudERhdGE6IEFwcGxpY2F0aW9uRXZlbnREYXRhKSB7XG4gICAgaWYgKEFwcGxpY2F0aW9uLmlzT25SZXN1bWVQcm9jZXNzaW5nKCkpIHtcbiAgICAgIC8vIHByZXZlbnQgb25SZXN1bWUgZXZlbnQgYmVlbiBjYWxsZWQgYXQgdGhlIHNhbWUgdGltZS4gXG4gICAgICAvLyBFbmFibGUgRmFjZSBJZCB3aWxsIGNhbGwgdGhlIG9uUmVzdW1lIHR3aWNlIGluIHNob3J0IHRpbWUoQkNQLTIwODAxNjkwOTEpXG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgaWYgKCFDbGllbnRTZXR0aW5ncy5pc0RlbW9Nb2RlKCkpIHtcbiAgICAgIGlmICghQXBwbGljYXRpb24uaXNPbkJvYXJkaW5nQ29tbGV0ZWQoKSB8fCBBcHBsaWNhdGlvbi5pc1Jlc3VtZUV2ZW50RGVsYXllZCgpKSB7XG4gICAgICAgIExvZ2dlci5pbnN0YW5jZS5hcHAuaW5mbyhgQXBwIG9uUmVzdW1lIGhhbmRsZXIgaXMgdG8gYmUgZGVsYXllZCwgc2V0dGluZyB0aGUgYXBwRXZlbnREYXRhIC0gJHthcHBFdmVudERhdGF9YCk7XG4gICAgICAgIEFwcGxpY2F0aW9uLnNldFBlbmRpbmdSZXN1bWVFdmVudERhdGEoYXBwRXZlbnREYXRhKTtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICB9XG4gICAgfVxuICAgIC8vIEJDUC0xOTcwNDY1MjM1IFRoZSBhcHAgcmVzdW1lIGFmdGVyIGFuIGF0dGFjaG1lbnQgYWN0aXZpdHkgaGFkIHJldHVybmVkLiBMY21zIGFwcCB1cGRhdGVcbiAgICAvLyBpcyBkZWZmZXJyZWQgaW4gdGhpcyBjYXNlLlxuICAgIEFwcGxpY2F0aW9uLnNldE9uUmVzdW1lUHJvY2Vzc2luZyh0cnVlKTtcbiAgICBpZiAoQXBwbGljYXRpb24uaXNOb25OU0FjdGl2aXR5RG9uZSgpICYmIGFwcEV2ZW50RGF0YS5ldmVudE5hbWUgIT09ICdyZWxhdW5jaGVkJykge1xuICAgICAgLy8gU3RhcnQgbGlmZWN5Y2xlIE1hbmFnZXIgd2l0aG91dCBydW5uaW5nIHZlcnNpb24gY2hlY2tlclxuICAgICAgTGlmZWN5Y2xlTWFuYWdlci5nZXRJbnN0YW5jZSgpLnN0YXJ0RGVsYXllZCgpO1xuICAgICAgQXBwbGljYXRpb24uc2V0Tm9uTlNBY3Rpdml0eURvbmUoZmFsc2UpO1xuICAgIH0gZWxzZSBpZiAoYXBwRXZlbnREYXRhID09PSBudWxsIHx8IGFwcEV2ZW50RGF0YSA9PT0gdW5kZWZpbmVkIHx8IGFwcEV2ZW50RGF0YS5ldmVudE5hbWUgIT09ICdyZWxhdW5jaGVkJykge1xuICAgIC8vIEJDUC0xOTgwMDUyMTgzIFdoZW4gdXNlciBoYXMgY29tcGxldGVkIHRoZSBvbmJvYXJkaW5nIHByb2Nlc3MsIGtpbGxlZCB0aGUgYXBwIGFuZCBoYXMgbGF1bmNoZWQgdGhlXG4gICAgLy8gYXBwIGFnYWluLiBCb3RoIHRoZSBvbkxhdW5jaCBhbmQgb25SZXN1bWUgZXZlbnQgd2lsbCBiZSB0cmlnZ2VyLiB0aGUgQXBwIHVwZGF0ZSBzaG91bGQgYmUgb25seVxuICAgIC8vIGhhbmRsZWQgYnkgb25MYXVuY2ggZXZlbnQuIEluIHRoaXMgY2FzZSwgdGhlIGFwcCB1cGRhdGUgb3ZlciBoZXJlIGlzIG5vdCBuZWNjZXNhcnkgaWYgdGhlIGV2ZW5OYW1lXG4gICAgLy8gaXMgcmVsYXVuY2hlZC5cbiAgICAgIExpZmVjeWNsZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zdGFydCgpO1xuICAgIH1cblxuICAgIE1ES1BhZ2UucmVzZXROYXZpZ2F0ZUZsYWdzKCk7XG5cbiAgICAvLyBDaGVjayBpZiBzeXN0ZW0gbGFuZ3VhZ2Ugb3IgZm9udCBzY2FsZSBoYXMgY2hhbmdlZC5cbiAgICBsZXQgaGFzRGV2aWNlTGFuZ3VhZ2VDaGFuZ2VkID0gZmFsc2U7XG4gICAgbGV0IGhhc0RldmljZUZvbnRTY2FsZUNoYW5nZWQgPSBmYWxzZTtcbiAgICBjb25zdCBwcmV2QXBwTGFuZ3VhZ2UgPSBJMThuTGFuZ3VhZ2UuZ2V0QXBwTGFuZ3VhZ2UoKTtcbiAgICBjb25zdCBwcmV2QXBwRm9udFNjYWxlID0gQ2xpZW50U2V0dGluZ3MuZ2V0QXBwRm9udFNjYWxlKCk7XG5cbiAgICAvLyBQZXJmb3JtIGxvY2FsaXphdGlvbiBjaGVja2luZyBhbmQgY3VzdG9taXphdGlvblxuICAgIC8vIEFueSBBcHBMYW5ndWFnZSBjaGFuZ2VzIHdvdWxkIG9jY3VyIGluIHRoaXMgcHJvY2Vzcy5cbiAgICBBcHBsaWNhdGlvbi5pbml0aWFsaXplTG9jYWxpemF0aW9uQW5kQ3VzdG9taXphdGlvbigpO1xuXG4gICAgLy8gR2V0IGxhbmd1YWdlIHNvdXJjZSBhbmQgYXBwIGxhbmd1YWdlIGFmdGVyIHRoZSBsYW5ndWFnZSBjaGVja2luZyBwcm9jZXNzLlxuICAgIGNvbnN0IGFwcExhbmd1YWdlU291cmNlID0gQ2xpZW50U2V0dGluZ3MuZ2V0QXBwTGFuZ3VhZ2VTb3VyY2UoKTtcbiAgICBjb25zdCBjdXJyZW50QXBwTGFuZ3VhZ2UgPSBJMThuTGFuZ3VhZ2UuZ2V0QXBwTGFuZ3VhZ2UoKTtcbiAgICBjb25zdCBjdXJyZW50QXBwRm9udFNjYWxlID0gQ2xpZW50U2V0dGluZ3MuZ2V0QXBwRm9udFNjYWxlKCk7XG5cbiAgICBpZiAoYXBwTGFuZ3VhZ2VTb3VyY2UgPT09IExhbmd1YWdlU291cmNlLkRldmljZVNldHRpbmcpIHtcbiAgICAgIGhhc0RldmljZUxhbmd1YWdlQ2hhbmdlZCA9IHByZXZBcHBMYW5ndWFnZSAhPT0gY3VycmVudEFwcExhbmd1YWdlO1xuICAgIH1cblxuICAgIC8vIEJDUC0xOTcwNTUyNzk0OiBoYW5kbGUgZGV2aWNlIGZvbnQgc2NhbGUgY2hhbmdlZFxuICAgIGhhc0RldmljZUZvbnRTY2FsZUNoYW5nZWQgPSBwcmV2QXBwRm9udFNjYWxlICE9PSBjdXJyZW50QXBwRm9udFNjYWxlO1xuXG4gICAgbGV0IGRlZmluaXRpb25PblJlc3VtZVByb21pc2U7XG4gICAgbGV0IGhhbmRsZXJQYXRoOiBzdHJpbmcgPSBBcHBsaWNhdGlvbi5fYXBwRGVmaW5pdGlvbi5nZXRPblJlc3VtZSgpO1xuICAgIGlmIChoYW5kbGVyUGF0aCkge1xuICAgICAgZGVmaW5pdGlvbk9uUmVzdW1lUHJvbWlzZSA9IEFwcGxpY2F0aW9uLl9leGVjdXRlV2l0aEhhbmRsZXJQYXRoKGhhbmRsZXJQYXRoLCBhcHBFdmVudERhdGEpO1xuICAgIH0gZWxzZSB7XG4gICAgICBkZWZpbml0aW9uT25SZXN1bWVQcm9taXNlID0gUHJvbWlzZS5yZXNvbHZlKCk7XG4gICAgfVxuICAgIGNvbnN0IHRvcEZyYW1lID0gVGFiRnJhbWUuZ2V0Q29ycmVjdFRvcG1vc3RGcmFtZSgpO1xuICAgIGRlZmluaXRpb25PblJlc3VtZVByb21pc2UudGhlbigoKSA9PiB7XG4gICAgICAvKiBCQ1AtMTk4MDAwMzk0MFxuICAgICAgICogQW5kcm9pZCBBcHAgY3Jhc2hlcyB3aGVuIHJlc3VtaW5nIHRoZSBhcHAgYWZ0ZXIgY2hhbmdpbmcgZGV2aWNlIGxhbmd1YWdlLlxuICAgICAgICogRml4OiBBZGRlZCBsb2NhbGUgYW5kIGxheW91dERpcmVjdGlvbiB0byBBbmRyb2lkIE1hbmlmZXN0IHRvIHByZXZlbnQgYXBwIGJlaW5nIGRlc3Ryb3llZC5cbiAgICAgICAqIEFkZGVkIG5hdmlnYXRpb24gYWN0aW9uIHRvIG1haW4gcGFnZSBpZiB0aGUgbGFuZ3VhZ2UgaGFzIGNoYW5nZWQgKG9ubHkgZm9yIEFuZHJvaWQpLlxuICAgICAgICovXG4gICAgICBpZiAoYXBwbGljYXRpb24uYW5kcm9pZCAmJiAoaGFzRGV2aWNlTGFuZ3VhZ2VDaGFuZ2VkIHx8IGhhc0RldmljZUZvbnRTY2FsZUNoYW5nZWQpKSB7XG4gICAgICAgIC8vIGlmIGRldmljZSBsYW5ndWFnZSBvciBmb250IHNjYWxlIGhhcyBjaGFuZ2VkLCBmb3Igbm93LCByZWRpcmVjdCB1c2VyIHRvIG1haW4gcGFnZSB0byByZWZsZWN0IHRoZSBwYWdlIGluIG5ldyBsYW5ndWFnZS5cbiAgICAgICAgaWYgKHRvcEZyYW1lKSB7XG4gICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICBpZiAoUGFnZVJlbmRlcmVyLmFwcExldmVsU2lkZURyYXdlciAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgIFBhZ2VSZW5kZXJlci5hcHBMZXZlbFNpZGVEcmF3ZXIucmVuZGVyTWFpblBhZ2UoKTtcbiAgICAgICAgICAgIH0gZWxzZSB7IFxuICAgICAgICAgICAgICBQYWdlUmVuZGVyZXIucHVzaE5hdmlnYXRpb24oQXBwbGljYXRpb24uX2FwcGxpY2F0aW9uUGFyYW1zLm1haW5QYWdlLCB0cnVlLCBNREtOYXZpZ2F0aW9uVHlwZS5Sb290KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIEFwcGxpY2F0aW9uLnNldE9uUmVzdW1lUHJvY2Vzc2luZyhmYWxzZSk7XG4gICAgICAgICAgfSwgMCk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIHRyaWdnZXIgcGFnZSBvblJlc3VtZSBldmVudCBpZiBleGlzdGluZ1xuICAgICAgICBpZiAodG9wRnJhbWUgJiYgdG9wRnJhbWUuY3VycmVudFBhZ2UpIHtcbiAgICAgICAgICBsZXQgbWRrUGFnZSA9IHRvcEZyYW1lLmN1cnJlbnRQYWdlIGFzIE1ES1BhZ2U7XG4gICAgICAgICAgaWYgKG1ka1BhZ2UgJiYgbWRrUGFnZS5kZWZpbml0aW9uICYmIG1ka1BhZ2UuZGVmaW5pdGlvbi5nZXRPblJlc3VtZUV2ZW50KCkpIHtcbiAgICAgICAgICAgIGlmIChhcHBsaWNhdGlvbi5hbmRyb2lkKSB7XG4gICAgICAgICAgICAgIC8vIGZvciBhbmRyb2lkIHBsYXRmb3JtIHRoZSBvblJlc3VtZSBldmVudCB3aWxsIGJlIHRyaWdnZXJlZCBpbiBBY3Rpdml0eSBSZXN1bWVkIGV2ZW50XG4gICAgICAgICAgICAgIG1ka1BhZ2UuaXNSZXN1bWluZyA9IHRydWU7XG4gICAgICAgICAgICAgIEFwcGxpY2F0aW9uLnNldE9uUmVzdW1lUHJvY2Vzc2luZyhmYWxzZSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBjb25zdCBvblJlc3VtZUV2ZW50ID0gbWRrUGFnZS5kZWZpbml0aW9uLmdldE9uUmVzdW1lRXZlbnQoKTtcbiAgICAgICAgICAgICAgY29uc3QgaGFuZGxlcjogRXZlbnRIYW5kbGVyID0gbmV3IEV2ZW50SGFuZGxlcigpO1xuICAgICAgICAgICAgICBoYW5kbGVyLmV4ZWN1dGVBY3Rpb25PclJ1bGUob25SZXN1bWVFdmVudCwgbWRrUGFnZS5jb250ZXh0KS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICBQYWdlUmVuZGVyZXIuY3VycmVudGx5UmVuZGVyZWRQYWdlID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAgIEFwcGxpY2F0aW9uLnNldE9uUmVzdW1lUHJvY2Vzc2luZyhmYWxzZSk7XG4gICAgICAgICAgICAgIH0pLmNhdGNoKCgpID0+IHtcbiAgICAgICAgICAgICAgICBQYWdlUmVuZGVyZXIuY3VycmVudGx5UmVuZGVyZWRQYWdlID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAgIEFwcGxpY2F0aW9uLnNldE9uUmVzdW1lUHJvY2Vzc2luZyhmYWxzZSk7XG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBwcmVwYXJlRm9yUG9wb3ZlclJlc3RvcmUoKSB7XG4gICAgY29uc3QgdG9wRnJhbWUgPSBUYWJGcmFtZS5nZXRDb3JyZWN0VG9wbW9zdEZyYW1lKCk7XG4gICAgaWYgKHRvcEZyYW1lICYmIHRvcEZyYW1lLmN1cnJlbnRQYWdlKSB7XG4gICAgICBsZXQgbWRrUGFnZTogTURLUGFnZSA9IHRvcEZyYW1lLmN1cnJlbnRQYWdlIGFzIE1ES1BhZ2U7XG4gICAgICBpZiAobWRrUGFnZSkge1xuICAgICAgICBpZiAobWRrUGFnZS5wb3BPdmVyRGF0YSkge1xuICAgICAgICAgIG1ka1BhZ2UuZGlzbWlzc1BvcG92ZXJGb3JSZXN0b3JlKCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGNvbXBsZXRlRm9yUG9wb3ZlclJlc3RvcmUoKSB7XG4gICAgY29uc3QgdG9wRnJhbWUgPSBUYWJGcmFtZS5nZXRDb3JyZWN0VG9wbW9zdEZyYW1lKCk7XG4gICAgaWYgKHRvcEZyYW1lICYmIHRvcEZyYW1lLmN1cnJlbnRQYWdlKSB7XG4gICAgICBsZXQgbWRrUGFnZTogTURLUGFnZSA9IHRvcEZyYW1lLmN1cnJlbnRQYWdlIGFzIE1ES1BhZ2U7XG4gICAgICBpZiAobWRrUGFnZSkge1xuICAgICAgICBpZiAobWRrUGFnZS5wb3BPdmVyRGF0YSkge1xuICAgICAgICAgIG1ka1BhZ2UucmVzdG9yZVBvcG92ZXIoKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoKDxNb2RhbEZyYW1lPm1ka1BhZ2UuZnJhbWUpLnBvcE92ZXJBbmNob3JJdGVtKSB7XG4gICAgICAgICAgbWRrUGFnZS51cGRhdGVNb2RhbFBvcG92ZXJBbmNob3IoKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgb25XaWxsVXBkYXRlKCkge1xuICAgIGxldCBoYW5kbGVyUGF0aDogc3RyaW5nID0gQXBwbGljYXRpb24uX2FwcERlZmluaXRpb24uZ2V0T25XaWxsVXBkYXRlKCk7XG4gICAgaWYgKGhhbmRsZXJQYXRoKSB7XG4gICAgICByZXR1cm4gQXBwbGljYXRpb24uX2V4ZWN1dGVXaXRoSGFuZGxlclBhdGgoaGFuZGxlclBhdGgsIHVuZGVmaW5lZCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIG9uUmVjZWl2ZU5vdGlmaWNhdGlvblJlc3BvbnNlKG5vdGlmaWNhdGlvbjogQXBwbGljYXRpb25FdmVudERhdGEpOiBQcm9taXNlPGFueT4ge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAoZnVuY3Rpb24gd2FpdFVudGlsSW5BcHAoKXtcbiAgICAgICAgaWYgKENsaWVudFNldHRpbmdzLmdldE9uYm9hcmRpbmdTdGF0ZSgpID09PSBPbmJvYXJkaW5nU3RhdGUuTGl2ZVxuICAgICAgICAgICYmIEFwcGxpY2F0aW9uLmlzT25Cb2FyZGluZ0NvbWxldGVkKCkgJiYgQXBwbGljYXRpb24uaXNNYWluUGFnZVJlbmRlcmVkKCkpIHtcbiAgICAgICAgICByZXR1cm4gQXBwbGljYXRpb24ub25SZWNlaXZlUHVzaE5vdGlmaWNhdGlvbihub3RpZmljYXRpb24pLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUoKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBzZXRUaW1lb3V0KHdhaXRVbnRpbEluQXBwLCAyNTApO1xuICAgICAgfSkoKTtcbiAgICB9KTtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgb25SZWNlaXZlUHVzaE5vdGlmaWNhdGlvbihub3RpZmljYXRpb246IEFwcGxpY2F0aW9uRXZlbnREYXRhKTogUHJvbWlzZTxhbnk+IHtcbiAgICBsZXQgaGFuZGxlclBhdGg6IHN0cmluZyA9IEFwcGxpY2F0aW9uLl9hcHBEZWZpbml0aW9uW25vdGlmaWNhdGlvbi5ldmVudE5hbWUgKyAnSGFuZGxlciddO1xuICAgIGNvbnN0IGV2ZW50T2JqID0gbm90aWZpY2F0aW9uLm9iamVjdDtcbiAgICBjb25zdCBwYXlsb2FkID0gZXZlbnRPYmoucGF5bG9hZDtcblxuICAgIC8vIGxvY2FsaXplIHB1c2ggbm90aWZpY2F0aW9uIGZvciBhbmRyb2lkXG4gICAgaWYgKHBheWxvYWQubm90aWZpY2F0aW9uICYmIHBheWxvYWQubm90aWZpY2F0aW9uLnRpdGxlTG9jS2V5KSB7XG4gICAgICBldmVudE9iai50aXRsZSA9IEkxOG5IZWxwZXIubG9jYWxpemVEZWZpbml0aW9uVGV4dChcbiAgICAgICAgcGF5bG9hZC5ub3RpZmljYXRpb24udGl0bGVMb2NLZXksXG4gICAgICAgIHBheWxvYWQubm90aWZpY2F0aW9uLnRpdGxlTG9jQXJncyxcbiAgICAgICAgbnVsbCk7XG4gICAgfVxuICAgIGlmIChwYXlsb2FkLm5vdGlmaWNhdGlvbiAmJiBwYXlsb2FkLm5vdGlmaWNhdGlvbi5ib2R5TG9jS2V5KSB7XG4gICAgICBldmVudE9iai5ib2R5ID0gSTE4bkhlbHBlci5sb2NhbGl6ZURlZmluaXRpb25UZXh0KFxuICAgICAgICBwYXlsb2FkLm5vdGlmaWNhdGlvbi5ib2R5TG9jS2V5LFxuICAgICAgICBwYXlsb2FkLm5vdGlmaWNhdGlvbi5ib2R5TG9jQXJncyxcbiAgICAgICAgbnVsbCk7XG4gICAgfVxuICAgIGlmICh0eXBlb2YgaGFuZGxlclBhdGggPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIC8vIGZvciB1bml0IHRlc3RcbiAgICAgIGhhbmRsZXJQYXRoID0gKGhhbmRsZXJQYXRoIGFzIEZ1bmN0aW9uKSgpO1xuICAgIH1cbiAgICBsZXQgY29tcGxldGlvbkhhbmRsZXIgPSBub3RpZmljYXRpb24ub2JqZWN0LmNvbXBsZXRpb25IYW5kbGVyO1xuICAgIGlmIChoYW5kbGVyUGF0aCkge1xuICAgICAgcmV0dXJuIEFwcGxpY2F0aW9uLl9leGVjdXRlV2l0aEhhbmRsZXJQYXRoKGhhbmRsZXJQYXRoLCBldmVudE9iaikudGhlbigocmVzdWx0KSA9PiB7XG4gICAgICAgIGlmICh0eXBlb2YgcmVzdWx0ID09PSAnbnVtYmVyJykge1xuICAgICAgICAgIGNvbXBsZXRpb25IYW5kbGVyKHJlc3VsdCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY29tcGxldGlvbkhhbmRsZXIoMCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAoZXZlbnRPYmouYm9keSkge1xuICAgICAgICBhbGVydChldmVudE9iai5ib2R5KTtcbiAgICAgIH0gZWxzZSBpZiAocGF5bG9hZC5kYXRhICYmIHBheWxvYWQuZGF0YS5hbGVydCkge1xuICAgICAgICBhbGVydChwYXlsb2FkLmRhdGEuYWxlcnQpO1xuICAgICAgfSBlbHNlIGlmIChwYXlsb2FkLmFwcyAmJiBwYXlsb2FkLmFwcy5hbGVydCkge1xuICAgICAgICBpZiAodHlwZW9mIHBheWxvYWQuYXBzLmFsZXJ0ID09PSAnc3RyaW5nJykge1xuICAgICAgICAgIGFsZXJ0KHBheWxvYWQuYXBzLmFsZXJ0KTtcbiAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgcGF5bG9hZC5hcHMuYWxlcnQgPT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgYWxlcnQocGF5bG9hZC5hcHMuYWxlcnQuYm9keSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIHJlc2V0QXBwU3RhdGUoKTogdm9pZCB7XG4gICAgTGlmZWN5Y2xlTWFuYWdlci5nZXRJbnN0YW5jZSgpLnJlc2V0KCk7XG4gICAgQ2xpZW50U2V0dGluZ3MucmVzZXQoKTtcbiAgICBMb2dnZXJNYW5hZ2VyLmNsZWFyTG9nKCk7XG4gICAgU2VjdXJlU3RvcmUuZ2V0SW5zdGFuY2UoKS5yZW1vdmVTdG9yZSgpO1xuICAgIC8vIEJDUC0xOTgwMjUyNjAwIElmIHVzZXIgZW50ZXIgZGVtbyBtb2RlIGZpcnN0LCB0aGUgbWFpblBhZ2VSZW5kZXJlZCBmbGFnIGlzIHNldC4gV2hlbiB1c2VyIHJlc2V0IGNsaWVudFxuICAgIC8vIHRoaXMgZmxhZyBzaG91bGQgcmVzZXQgYXMgd2VsbC5cbiAgICB0aGlzLnNldE1haW5QYWdlUmVuZGVyZWQoZmFsc2UpO1xuICB9XG5cbiAgLy8gVGhpcyBtZXRob2QgY2FuIGJlIGNhbGxlZCBmcm9tIHBsYWNlcyBsaWtlIGxvZ291dCBhY3Rpb24gb3Igd2hlbiBhIGNsaWVudCBuZWVkcyB0byBiZSByZXNldFxuICAvLyBkdWUgdG8gdXNlciBmb3JnZXR0aW5nIHBhc3Njb2RlIGV0Yy5cbiAgLy8gQ2xlYXJzIG91dCB0aGUgT2ZmbGluZSBzdG9yZSBhbmQgU2VjdXJlIHN0b3JlIGFuZCByZXNldCBjbGllbnQgc3RhdGUuXG4gIHB1YmxpYyBzdGF0aWMgcmVzZXRDbGllbnQoKTogUHJvbWlzZTxhbnk+IHtcblxuICAgIHRyeSB7XG4gICAgICBJbWFnZUhlbHBlci5kZWxldGVDYWNoZWRJbWFnZXMoKTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIExvZ2dlci5pbnN0YW5jZS5jb3JlLmVycm9yKCdGYWlsZWQgdG8gY2xlYXIgY2FjaGUgZGlyZWN0b3J5OiAnICwgZXJyKTtcbiAgICB9XG5cbiAgICB0cnkge1xuICAgICAgT3BlbkRvY3VtZW50QnJpZGdlLmdldEluc3RhbmNlKCkuY2xlYXJDYWNoZSgpO1xuICAgICAgTG9nZ2VyLmluc3RhbmNlLmNvcmUuaW5mbygnQ2xlYXJlZCBkb2N1bWVudCBjYWNoZSBkaXJlY3RvcnknKVxuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICBMb2dnZXIuaW5zdGFuY2UuY29yZS5lcnJvcihgRmFpbGVkIHRvIGNsZWFyIGRvY3VtZW50IGNhY2hlIGRpcmVjdG9yeTogJHtlcnJ9YCk7XG4gICAgfVxuXG4gICAgaWYgKElEYXRhU2VydmljZS5pc1ZhbGlkKCkpIHtcbiAgICAgIElEYXRhU2VydmljZS5pbnN0YW5jZSgpLmNsZWFyUmVzb2x2ZWRTZXJ2aWNlSW5mbygpO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBXaGVuIHJlc2V0dGluZyBiZWZvcmUgdGhlIGFwcGxpY2F0aW9uIGhhcyBiZWVuIGdvbmUgdGhyb3VnaCAnbGF1bmNoQXBwTWFpblBhZ2UoKScgaGFzIG9jY3VyZWQsXG4gICAgICAvLyB0aGUgSURhdGFTZXJ2aWNlIGluc3RhbmNlIGhhc24ndCBiZWVuIGdlbmVyYXRlZC4gVGhpcyByZXNldCBjYW4gb2NjdXIsIG9uIGNsaWVudCBzdGFydHVwIGFmdGVyIGEgc3VjY2Vzc2Z1bFxuICAgICAgLy8gb25ib2FyZGluZy4gIFRoZSBwYXNzY29kZSBzY3JlZW4gaXMgdGhlIGxhdW5jaCBzY3JlZW4sIGFuZCByZXNldCBkdWUgdG8gaGl0dGluZyBtYXggYXR0ZW1wdHMgb3IgaW5pdCByZXNldC5cbiAgICAgIC8vIFRoaXMgYmVjb21lcyBhIHRlbXAgaW5zdGFuY2UsIGFzICdsYXVuY2hBcHBNYWluUGFnZSgpJyB3aWxsIGNyZWF0ZSB0aGUgc2luZ2xldG9ucyBhbmQgb3ZlcndyaXRlIHRoaXMgaW5zdGFuY2UuXG4gICAgICB0aGlzLnNldE9EYXRhU2VydmljZSgpO1xuICAgIH1cbiAgICAvLyB1bnJlZ2lzdGVyIGlvcyBhcHBsaWNhaW9uIGxpc3RlbmVyXG4gICAgQXBwbGljYXRpb24ucmVtb3ZlQXBwbGljYXRpb25MaXN0ZW5lcigpO1xuXG4gICAgLy8gcmVzZXQgdGhlIGZsYWdzXG4gICAgQXBwbGljYXRpb24uX3Jlc2V0RmxhZ3MoKTtcblxuICAgIGNvbnN0IHNlcnZpY2UgPSBJRGF0YVNlcnZpY2UuaW5zdGFuY2UoKTtcbiAgICBsZXQgcGF0aHMgPSBuZXcgU2V0KENsaWVudFNldHRpbmdzLmdldEhpc3RvcmljYWxPRGF0YVNlcnZpY2VQYXRoKCkpO1xuICAgIGxldCBwcm9taXNlcyA9IFtdO1xuICAgIC8vIHVucmVnaXN0ZXIgZm9yIHB1c2ggbm90aWZhY3Rpb25cbiAgICBpZiAoIUNsaWVudFNldHRpbmdzLmlzRGVtb01vZGUoKSkge1xuICAgICAgbGV0IGFwcGxpY2F0aW9uSWQgPSBDbGllbnRTZXR0aW5ncy5nZXRBcHBJZCgpO1xuICAgICAgbGV0IGJhc2VVcmwgPSBDbGllbnRTZXR0aW5ncy5nZXRDcG1zVXJsKCk7XG4gICAgICBQdXNoTm90aWZpY2F0aW9uLmdldEluc3RhbmNlKCkudW5yZWdpc3RlckZvclB1c2hOb3RpZmljYXRpb24oYXBwbGljYXRpb25JZCwgYmFzZVVybCwgbnVsbCk7XG4gICAgfVxuICAgIGNvbnN0IHNlcnZpY2VOYW1lcyA9IENsaWVudFNldHRpbmdzLmdldEFwcGxpY2F0aW9uU2VydmljZVBhdGhzKCk7XG4gICAgaWYgKHNlcnZpY2VOYW1lcyAmJiBzZXJ2aWNlTmFtZXMubGVuZ3RoID4gMCkge1xuICAgICAgZm9yIChjb25zdCBzZXJ2aWNlTmFtZSBvZiBzZXJ2aWNlTmFtZXMpIHtcbiAgICAgICAgaWYgKElEZWZpbml0aW9uUHJvdmlkZXIuaW5zdGFuY2UoKS5pc0RlZmluaXRpb25QYXRoVmFsaWQoc2VydmljZU5hbWUpICYmIHNlcnZpY2Uub2ZmbGluZUVuYWJsZWQoc2VydmljZU5hbWUpKSB7XG4gICAgICAgICAgY29uc3Qgc2VydmljZVVybCA9IHNlcnZpY2VOYW1lID8gc2VydmljZS51cmxGb3JTZXJ2aWNlTmFtZShzZXJ2aWNlTmFtZSkgOiB1bmRlZmluZWQ7XG4gICAgICAgICAgcHJvbWlzZXMucHVzaCh0aGlzLl9yZXNldENsaWVudEhlbHBlcihzZXJ2aWNlLCBzZXJ2aWNlVXJsKSk7XG4gICAgICAgICAgaWYgKHNlcnZpY2VVcmwgIT09IHVuZGVmaW5lZCAmJiBwYXRocy5oYXMoc2VydmljZVVybCkpIHtcbiAgICAgICAgICAgIHBhdGhzLmRlbGV0ZShzZXJ2aWNlVXJsKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIENsaWVudFNldHRpbmdzLnNldEhpc3RvcmljYWxPRGF0YVNlcnZpY2VQYXRoKHBhdGhzKTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gTm8gc2VydmljZSB3YXMgc3BlY2lmaWVkIGluIG1ldGFkYXRhIHNvIG9mZmxpbmUgc3RvcmUgd2FzIG5ldmVyIGNyZWF0ZWQuICBKdXN0IGNsZWFuLXVwLlxuICAgICAgQXBwbGljYXRpb24ucmVzZXRBcHBTdGF0ZSgpO1xuICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xuICAgIH1cblxuICAgIHJldHVybiBQcm9taXNlLmFsbChwcm9taXNlcylcbiAgICAudGhlbigocmVzdWx0KSA9PiB7XG4gICAgICByZXR1cm4gdGhpcy5fY2xlYXJIaXN0b3JpY2FsT0RhdGFPZmZsaW5lU3RvcmUoKTtcbiAgICB9KS50aGVuKChyZXN1bHQpID0+IHtcbiAgICAgIEFwcGxpY2F0aW9uLnJlc2V0QXBwU3RhdGUoKTtcbiAgICAgIExvZ2dlci5pbnN0YW5jZS5zdGFydHVwLmxvZyhMb2dnZXIuU1RBUlRVUF9TVE9SRV9DTElFTlRfUkVTRVRfU1VDQ0VFRCk7XG5cbiAgICAgIENsaWVudFNldHRpbmdzLnNldEFwcGxpY2F0aW9uU2VydmljZVBhdGhzKFtdKTtcblxuICAgICAgLy8gQkNQLTE5NzA0MzkxNzk6IENsb3NlIGFsbCBhY3RpdmUgZGlhbG9ncyBvbiByZXNldFxuICAgICAgTWVzc2FnZURpYWxvZy5nZXRJbnN0YW5jZSgpLmNsb3NlQWxsKCk7XG4gICAgfSkuY2F0Y2goZSA9PiB7XG4gICAgICBMb2dnZXIuaW5zdGFuY2UuYXBwLmVycm9yKGUpO1xuICAgIH0pO1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBzdGFydCgpOiBQcm9taXNlPE5hdmlnYXRpb25FbnRyeT4ge1xuICAgIHRyeSB7XG4gICAgICBTREtTdHlsaW5nTWFuYWdlci5hcHBseUJyYW5kaW5nU3R5bGVzKCk7XG5cbiAgICAgIC8vIE9uYm9hcmRpbmcgaGFzIDQgbWFpbiBzdGFnZXMuIFdlbGNvbWVQYWdlIC0+Q2xvdWRMb2dpbiAtPkVVTEEgc2NyZWVuIC0+UGFzc2NvZGUgc2NyZWVuXG4gICAgICAvLyBGdXJ0aGVyIGRldGFpbHM6IGh0dHBzOi8vZ2l0aHViLndkZi5zYXAuY29ycC9zbm93YmxpbmQvc2RrL2Jsb2IvZG9jcy9vbmJvYXJkaW5nL2RvY3Mvb25ib2FyZGluZy9PbmJvYXJkaW5nLm1kXG4gICAgICAvLyBXZSB3b24ndCBoYXZlIG1ldGEtZGF0YSB1bnRpbCB1c2VyIG9uYm9hcmRzIGFuZCBob29rcyB1cCB3aXRoIExDTVMuXG4gICAgICAvLyBMYXVuY2ggd2VsY29tZSBwYWdlIHdpdGggdGhlIGNvbnRlbnRzIHJldHVybmVkIGZyb20gRmlvcmlVSSBpZiB0aGlzIGlzIGEgZmlyc3QgbGF1bmNoLlxuICAgICAgYXBwbGljYXRpb24ub24oJ2ZvcmVncm91bmROb3RpZmljYXRpb25FdmVudCcsIEFwcGxpY2F0aW9uLm9uUmVjZWl2ZVB1c2hOb3RpZmljYXRpb24pO1xuICAgICAgYXBwbGljYXRpb24ub24oJ2NvbnRlbnRBdmFpbGFibGVFdmVudCcsIEFwcGxpY2F0aW9uLm9uUmVjZWl2ZVB1c2hOb3RpZmljYXRpb24pO1xuICAgICAgYXBwbGljYXRpb24ub24oJ3JlY2VpdmVOb3RpZmljYXRpb25SZXNwb25zZUV2ZW50JywgQXBwbGljYXRpb24ub25SZWNlaXZlTm90aWZpY2F0aW9uUmVzcG9uc2UpO1xuICAgICAgaWYgKGFwcGxpY2F0aW9uLmFuZHJvaWQpIHtcbiAgICAgICAgYXBwbGljYXRpb24uYW5kcm9pZC5vbihhcHBsaWNhdGlvbi5BbmRyb2lkQXBwbGljYXRpb24uYWN0aXZpdHlCYWNrUHJlc3NlZEV2ZW50LFxuICAgICAgICAgIChhcmdzOiBhcHBsaWNhdGlvbi5BbmRyb2lkQWN0aXZpdHlCYWNrUHJlc3NlZEV2ZW50RGF0YSkgPT4ge1xuICAgICAgICAgIGxldCB0cmlnZ2VyQmFja1ByZXNzZWRIYW5kbGVyID0gdHJ1ZTtcbiAgICAgICAgICBjb25zdCB0b3BGcmFtZSA9IFRhYkZyYW1lLmdldENvcnJlY3RUb3Btb3N0RnJhbWUoKTtcbiAgICAgICAgICBpZiAodG9wRnJhbWUgJiYgdG9wRnJhbWUuY3VycmVudFBhZ2UpIHtcbiAgICAgICAgICAgIGNvbnN0IHBhZ2UgPSB0b3BGcmFtZS5jdXJyZW50UGFnZTtcbiAgICAgICAgICAgIGlmIChwYWdlLmhhc0xpc3RlbmVycyhhcHBsaWNhdGlvbi5BbmRyb2lkQXBwbGljYXRpb24uYWN0aXZpdHlCYWNrUHJlc3NlZEV2ZW50KSkge1xuICAgICAgICAgICAgICB0cmlnZ2VyQmFja1ByZXNzZWRIYW5kbGVyID0gZmFsc2U7XG4gICAgICAgICAgICAgIHBhZ2Uubm90aWZ5KGFyZ3MpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmICh0cmlnZ2VyQmFja1ByZXNzZWRIYW5kbGVyKSB7XG4gICAgICAgICAgICB0aGlzLmFjdGl2aXR5QmFja1ByZXNzZWRFdmVudEhhbmRsZXIoYXJncyk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIGlmIChDbGllbnRTZXR0aW5ncy5oYXNMb2dTZXR0aW5ncygpKSB7XG4gICAgICAgIGFwcGxpY2F0aW9uLm9uKGFwcGxpY2F0aW9uLmxhdW5jaEV2ZW50LCAoKSA9PiB7XG4gICAgICAgICAgTG9nZ2VyTWFuYWdlci5pbml0KENsaWVudFNldHRpbmdzLmdldExvZ0ZpbGVOYW1lKCksIENsaWVudFNldHRpbmdzLmdldExvZ0ZpbGVTaXplKCkpO1xuICAgICAgICAgIGxldCBsb2dnZXIgPSBMb2dnZXJNYW5hZ2VyLmdldEluc3RhbmNlKCk7XG4gICAgICAgICAgLy8gQkNQLTIwNzAyMDQxNzIsIHNldCBsb2cgbGV2ZWwgZnJvbSB0aGUgdXNlciBzZXR0aW5ncywgaWYgZWFybGllciBzZXQuXG4gICAgICAgICAgbGV0IGxldmVsRnJvbVVzZXJEZWZhdWx0cyA9IGxvZ2dlci5nZXRMZXZlbEZyb21Vc2VyRGVmYXVsdHMoKTtcbiAgICAgICAgICBpZiAobGV2ZWxGcm9tVXNlckRlZmF1bHRzICE9PSAnJykge1xuICAgICAgICAgICAgbG9nZ2VyLnNldExldmVsKGxldmVsRnJvbVVzZXJEZWZhdWx0cyk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGxvZ2dlci5zZXRMZXZlbChDbGllbnRTZXR0aW5ncy5nZXRMb2dMZXZlbCgpKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgbG9nZ2VyLm9uKCk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICAvLyBJbnN0YW50aWF0ZSBkZWZpbml0aW9uIHByb3ZpZGVyIGluc3RhbmNlIGFuZCBzZXQgY29udGV4dCB0byBzdXBwb3J0IGkxOG4gb24gT25ib2FyZGluZyBzdGFnZS5cbiAgICAgIHJldHVybiB0aGlzLl9zZXREZWZpbml0aW9uUHJvdmlkZXIodW5kZWZpbmVkKS50aGVuKCgpID0+IHtcbiAgICAgICAgSUNvbnRleHQuc2V0RnJvbVBhZ2VGdW5jdGlvbihDb250ZXh0LmZyb21QYWdlKTtcbiAgICAgICAgdGhpcy5pbml0aWFsaXplTG9jYWxpemF0aW9uQW5kQ3VzdG9taXphdGlvbigpO1xuXG4gICAgICAgIE5hdmlnYXRpb25CYXJCcmlkZ2UuYXBwbHlGaW9yaVN0eWxlKCk7XG4gICAgICAgIEFwcGxpY2F0aW9uLmNvbnRleHQgPSBuZXcgQ29udGV4dCh7fSwgdGhpcyk7XG5cbiAgICAgICAgLy8gVGhlIG9uYm9hcmRlZCBmbGFnIGFuZCBBcHBTdGF0ZSBpcyBwZXJzaXN0ZWQgaW4gdXNlciBzZXR0aW5ncyBzbyB3aWxsIGJlXG4gICAgICAgIC8vIGF2YWlsYWJsZSBpZiBhcHAgZXhpdHMgYW5kIHJlbGF1bmNoZWQuXG4gICAgICAgIGlmICghQ2xpZW50U2V0dGluZ3MuaXNEZW1vTW9kZSgpKSB7XG4gICAgICAgICAgLy8gRmlyc3QgdGltZSBsYXVuY2guICBUYWtlIHVzZXIgdG8gd2VsY29tZSBwYWdlIGZvciBvbmJvYXJkaW5nIChvciBkZW1vIG1vZGUuKVxuICAgICAgICAgIGxldCBwcm9taXNlOiBQcm9taXNlPGFueT47XG4gICAgICAgICAgaWYgKENsaWVudFNldHRpbmdzLmlzT25ib2FyZGluZ0luUHJvZ3Jlc3MoKSkge1xuICAgICAgICAgICAgcHJvbWlzZSA9IFBhZ2VSZW5kZXJlci5zaG93V2VsY29tZVBhZ2UoKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcHJvbWlzZSA9IFBhZ2VSZW5kZXJlci5zaG93UGFzc2NvZGVQYWdlKCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiBwcm9taXNlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIFRoaXMgaXMgYSByZS1sYXVuY2ggb2YgdGhlIGFwcCwgcGVyaGFwcyB1c2VyIGV4aXRlZCB0aGUgYXBwLlxuICAgICAgICAgIC8vIERlbW8gbW9kZSB1c2VyOiBVc2Ugb3VyIGhhcmQtY29kZWQgcGFzc2NvZGUuXG4gICAgICAgICAgcmV0dXJuIEFwcGxpY2F0aW9uLmxhdW5jaEFwcE1haW5QYWdlKGZhbHNlKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIExvZ2dlci5pbnN0YW5jZS5zdGFydHVwLmVycm9yKExvZ2dlci5FUlJPUiwgZXJyb3IsIGVycm9yLnN0YWNrKTtcbiAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChlcnJvcik7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIHN0YXRpYyBzdGFydEFwcGxpY2F0aW9uKHNlY3JldEtleXM6IGFueSkge1xuICAgIC8vIHN0YXJ0QXBwbGljYXRpb24gaXMgY2FsbGVkIG9uIG9uYm9hcmQgY29tcGxldGUgKGVudGVyIGxpdmUgbW9lKSBvciBlbnRlcmluZyBkZW1vIG1vZGVcbiAgICBpZiAoQ2xpZW50U2V0dGluZ3MuaXNMaXZlTW9kZSgpKSB7XG4gICAgICAvLyBPbmJvYXJkaW5nIGlzIGNvbXBsZXRlZCBhbmQgcGFzc2NvZGUgKGFuZCBvdGhlciBrZXlzKSBub3cgYXZhaWxhYmxlLlxuICAgICAgU2VjdXJlU3RvcmUuZ2V0SW5zdGFuY2UoKS5zZXRTdHJpbmcoJ09GRkxJTkVfU1RPUkVfRU5DUllQVElPTl9LRVknLCBzZWNyZXRLZXlzLmdldCgnT2ZmbGluZUtleScpKTtcbiAgICAgIENsaWVudFNldHRpbmdzLnNldFBhc3Njb2RlU291cmNlKHNlY3JldEtleXMuZ2V0KCdQYXNzY29kZVNvdXJjZScpKTtcbiAgICB9XG4gICAgLy8gd2hlbiBlbnRlcmluZyBkZW1vLCB1c2UgdGhlIGRlZmF1bHQgcGFzc2NvZGUuICBUaGUgZGVmYXVsdCBpcyBoYW5kbGVkIGJ5IENsaWVudFNldHRpbmdzLCBzbyBuby1vcFxuXG4gICAgLy8gc2V0IGlzUmVzdW1lRXZlbnREZWxheWVkIHRvIHRydWUgdG8gZGlzYWJsZSBvblJlc3VtZSBldmVudCB3aGVuIGZpcnN0IHRpbWUgbGF1bmNoIGFwcCBmb3IgYW5kcm9pZFxuICAgIC8vIGlmIGlzUGFzc2NvZGVSZXF1aXJlZCA9IHRydWUgd2lsbCBpbmdvcmUgb25SZXN1bWUgZXZlbnQsIGZvciB0aG9zZSBjYXNlcyB3ZSBuZWVkIHRvIGlnbm9yZSBvblJlc3VtZSBldmVudFxuICAgIC8vIDEgRmlyc3QgbGF1bmNoIGFwcFxuICAgIC8vIDIgd2hlbiBhcHAgY29tZSBiYWNrIHRvIGZvcmVncm91bmQgYmVmb3JlIHBhc3Njb2RlIHRpbWVvdXRcbiAgICAvLyAzIHBhc3Njb2RlIGNoYW5nZXNcbiAgICAvLyA0IGFwcCByZXNldCBhbmQgc3RhcnRcbiAgICB0aGlzLnNldFJlc3VtZUV2ZW50RGVsYXllZCh0cnVlKTtcblxuICAgIHJldHVybiBBcHBsaWNhdGlvbi5sYXVuY2hBcHBNYWluUGFnZSh0cnVlKTtcbiAgfVxuXG4gIC8vIHVzZWQgdG8gdXBkYXRlIHRoZSBhcHBsaWNhdGlvbiB3aGVuIHRoZSBkZWZpbml0aW9ucyBoYXZlIGJlZW4gdXBkYXRlZFxuICAvLyBoYW5kbGVzIGNhbGxzIHRvIG9uV2lsbFVwZGF0ZSBhbmQgb25EaWRVcGRhdGUgZm9yIHRoZSB1cGRhdGUgcHJvY2Vzc1xuICBwdWJsaWMgc3RhdGljIHVwZGF0ZShidW5kbGVQYXRoOiBzdHJpbmcpIHtcbiAgICBsZXQgaXNBcHBVcGRhdGluZzogYm9vbGVhbiA9IGZhbHNlO1xuICAgIGlmICghdGhpcy5fYXBwRGVmaW5pdGlvbikge1xuICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KCdObyBhcHBsaWNhdGlvbiBkZWZpbml0aW9ucyBsb2FkZWQnKTtcbiAgICB9XG4gICAgaWYgKCFBcHBsaWNhdGlvbi5pc09uQm9hcmRpbmdDb21sZXRlZCgpKSB7XG4gICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoJ0FwcCB1cGRhdGUgcGVuZGluZyBkdWUgdG8gYXBwbGljYXRpb24gaXMgbm90IHJ1bm5pbmcnKTtcbiAgICB9XG5cbiAgICBjb25zdCBwcmV2aW91c1NlcnZpY2VQYXRocyA9IENsaWVudFNldHRpbmdzLmdldEFwcGxpY2F0aW9uU2VydmljZVBhdGhzKCk7XG5cbiAgICBBcHBsaWNhdGlvbi5zZXRPblVwZGF0ZVByb2Nlc3NpbmcodHJ1ZSk7XG4gICAgcmV0dXJuIEFwcGxpY2F0aW9uLm9uV2lsbFVwZGF0ZSgpLnRoZW4oKHJlc3VsdCkgPT4ge1xuICAgICAgaXNBcHBVcGRhdGluZyA9IHRydWU7XG4gICAgICByZXR1cm4gdGhpcy5fc2V0RGVmaW5pdGlvblByb3ZpZGVyKGJ1bmRsZVBhdGgpLnRoZW4oKCkgPT4ge1xuICAgICAgICByZXR1cm4gQXBwbGljYXRpb24uZG9Mb2FkTWFpblBhZ2VBbmREaWRVcGRhdGUoKS50aGVuKCgpID0+IHtcbiAgICAgICAgICBpZiAoTGlmZWN5Y2xlTWFuYWdlci5nZXRJbnN0YW5jZSgpLnByb21vdGVTdGFnZWRWZXJzaW9uKCkpIHtcbiAgICAgICAgICAgIHRoaXMuX3NldFZlcnNpb25JbmZvKCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIExpZmVjeWNsZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKS5zdGFydERlbGF5ZWQoKTtcbiAgICAgICAgfSkuY2F0Y2goKGVycm9yKSA9PiB7XG4gICAgICAgICAgLy8gQWxlcnQgdGhlIHVzZXIgZm9yIHJvbGxiYWNrXG4gICAgICAgICAgYWxlcnQoSTE4bkhlbHBlci5sb2NhbGl6ZU1ES1RleHQoJ3VwZGF0ZV9mYWlsX3JvbGxfYmFjaycpICsgYCAke2Vycm9yLm1lc3NhZ2V9YCkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAvLyBSZXNldCBhcHBsaWNhdGlvbiB0byBwcmV2aW91cyBhcHBcbiAgICAgICAgICAgIEFwcGxpY2F0aW9uLnNldE9uVXBkYXRlUHJvY2Vzc2luZyhmYWxzZSk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fcm9sbGJhY2tEZWZpbml0aW9uUHJvdmlkZXIoKS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgTGlmZWN5Y2xlTWFuYWdlci5nZXRJbnN0YW5jZSgpLnN0YXJ0RGVsYXllZCgpO1xuICAgICAgICAgICAgICBMb2dnZXIuaW5zdGFuY2UuYXBwVXBkYXRlLmVycm9yKExvZ2dlci5BUFBVUERBVEVfRkFJTEVELCBlcnJvcik7XG4gICAgICAgICAgICAgIGlmIChpc0FwcFVwZGF0aW5nKSB7XG4gICAgICAgICAgICAgICAgLy8gV2UgcmFuIGludG8gYW4gZXJyb3Igd2hpbGUgdXBkYXRpbmcuICBGb3Igbm93LCBzZW5kIHVzZXIgYmFjayB0byBtYWluIHBhZ2UuXG4gICAgICAgICAgICAgICAgTG9nZ2VyLmluc3RhbmNlLmFwcFVwZGF0ZS5sb2coTG9nZ2VyLkFQUFVQREFURV9ST0xMX0JBQ0tfUFJFVklPVVMsIHByZXZpb3VzU2VydmljZVBhdGhzLnRvU3RyaW5nKCkpO1xuICAgICAgICAgICAgICAgIENsaWVudFNldHRpbmdzLnNldEFwcGxpY2F0aW9uU2VydmljZVBhdGhzKHByZXZpb3VzU2VydmljZVBhdGhzKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gQXBwbGljYXRpb24uZG9Mb2FkTWFpblBhZ2VBbmREaWRVcGRhdGUoKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfSkuY2F0Y2goKGVycm9yKSA9PiB7XG4gICAgICBBcHBsaWNhdGlvbi5zZXRPblVwZGF0ZVByb2Nlc3NpbmcoZmFsc2UpO1xuICAgICAgTGlmZWN5Y2xlTWFuYWdlci5nZXRJbnN0YW5jZSgpLnN0YXJ0RGVsYXllZCgpO1xuICAgICAgTG9nZ2VyLmluc3RhbmNlLmFwcFVwZGF0ZS5lcnJvcihMb2dnZXIuQVBQVVBEQVRFX0ZBSUxFRCwgZXJyb3IpO1xuICAgIH0pO1xuICB9XG5cbiAgLy8gcmUtaW5pdGlhbGl6ZSBsb2dnZXIgZm9yIG9uYm9hcmRpbmcgcHJvY2VzcyB3aGVuIGxvZ291dFxuICBwdWJsaWMgc3RhdGljIHJlSW5pdGlhbGl6ZUxvZ2dlcigpIHtcbiAgICBpZiAoQ2xpZW50U2V0dGluZ3MuaGFzTG9nU2V0dGluZ3MoKSkge1xuICAgICAgTG9nZ2VyTWFuYWdlci5pbml0KENsaWVudFNldHRpbmdzLmdldExvZ0ZpbGVOYW1lKCksIENsaWVudFNldHRpbmdzLmdldExvZ0ZpbGVTaXplKCkpO1xuICAgICAgbGV0IGxvZ2dlciA9IExvZ2dlck1hbmFnZXIuZ2V0SW5zdGFuY2UoKTtcbiAgICAgIGxvZ2dlci5vbigpO1xuICAgICAgbG9nZ2VyLnNldExldmVsKENsaWVudFNldHRpbmdzLmdldExvZ0xldmVsKCkpO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgYWN0aXZpdHlCYWNrUHJlc3NlZEV2ZW50SGFuZGxlcihhcmdzOiBhcHBsaWNhdGlvbi5BbmRyb2lkQWN0aXZpdHlCYWNrUHJlc3NlZEV2ZW50RGF0YSkge1xuICAgIGNvbnN0IHRvcEZyYW1lOiBhbnkgPSBUYWJGcmFtZS5nZXRDb3JyZWN0VG9wbW9zdEZyYW1lKCk7XG4gICAgaWYgKHRoaXMuX3Nob3VsZE1vdmVUYXNrVG9CYWNrZ3JvdW5kKHRvcEZyYW1lKSkge1xuICAgICAgbGV0IG1vdmVUYXNrVG9CYWNrZ3JvdW5kID0gdHJ1ZTtcbiAgICAgIC8vIGlmIHRvcEZyYW1lIGlzIFRhYkZyYW1lLCBjaGVjayBmb3IgdGhlIHBhcmVudCBmcmFtZSwgXG4gICAgICAvLyBlbnN1cmUgdGhhdCB0aGUgcGFyZW50IGZyYW1lIGRvZXMgbm90IGhhdmUgYmFjayBzdGFjayBiZWZvcmUgcHJvY2VlZCB3aXRoIG1vdmUgdGFzayB0byBiYWNrZ3JvdW5kLlxuICAgICAgaWYgKFRhYkZyYW1lLmlzVGFiKHRvcEZyYW1lKSkge1xuICAgICAgICBjb25zdCBwYXJlbnRQYWdlID0gKHRvcEZyYW1lIGFzIFRhYkZyYW1lKS5wYXJlbnRQYWdlO1xuICAgICAgICBjb25zdCBwYXJlbnRGcmFtZSA9IHBhcmVudFBhZ2UuZnJhbWU7XG4gICAgICAgIGlmICghdGhpcy5fc2hvdWxkTW92ZVRhc2tUb0JhY2tncm91bmQocGFyZW50RnJhbWUpKSB7XG4gICAgICAgICAgbW92ZVRhc2tUb0JhY2tncm91bmQgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAobW92ZVRhc2tUb0JhY2tncm91bmQpIHtcbiAgICAgICAgLy8gQkNQLTE4ODA2OTMyNjdcbiAgICAgICAgLy8gSWYgd2UgYXJlIG9uIHRoZSBtYWluIHBhZ2UgYW5kIHRoZSBiYWNrIGJ1dHRvbiBpcyBwcmVzc2VkLCB3ZSBqdXN0IHdhbnQgdG8gdHJlYXQgaXQgbGlrZSB3ZSBhcmVcbiAgICAgICAgLy8gYmFja2dyb3VuZGluZyB0aGUgYXBwLiAgSWYgd2UgYXJlIG9uIGEgc2Vjb25kYXJ5IHBhZ2UsIGp1c3QgbGV0IEFuZHJvaWQgYmFjayB1cCBub3JtYWxseVxuICAgICAgICBhcmdzLmNhbmNlbCA9IHRydWU7XG4gICAgICAgIGNvbnN0IGFjdGl2aXR5ID0gYXBwbGljYXRpb24uYW5kcm9pZC5mb3JlZ3JvdW5kQWN0aXZpdHk7XG4gICAgICAgIGlmIChhY3Rpdml0eSkge1xuICAgICAgICAgIGlmIChhY3Rpdml0eS5nZXRDbGFzcygpLmdldFNpbXBsZU5hbWUoKSA9PT0gJ01ES0FuZHJvaWRBY3Rpdml0eScpIHtcbiAgICAgICAgICAgIGFjdGl2aXR5Lm1vdmVUYXNrVG9CYWNrKGZhbHNlKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIHNldE9uYm9hcmRpbmdDb21wbGV0ZWQoY29tcGxldGVkOiBib29sZWFuKSB7XG4gICAgdGhpcy5fb25Cb2FyZGluZ0NvbXBsZXRlZCA9IGNvbXBsZXRlZDtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgaXNPbkJvYXJkaW5nQ29tbGV0ZWQoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX29uQm9hcmRpbmdDb21wbGV0ZWQ7XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIHNldFJlc3VtZUV2ZW50RGVsYXllZChkZWxheWVkOiBib29sZWFuKSB7XG4gICAgdGhpcy5fcmVzdW1lRXZlbnREZWxheWVkID0gZGVsYXllZDtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgaXNSZXN1bWVFdmVudERlbGF5ZWQoKTogYm9vbGVhbiAge1xuICAgIHJldHVybiB0aGlzLl9yZXN1bWVFdmVudERlbGF5ZWQ7XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIHNldFBlbmRpbmdSZXN1bWVFdmVudERhdGEoZXZlbnREYXRhOiBBcHBsaWNhdGlvbkV2ZW50RGF0YSkge1xuICAgIHRoaXMuX3BlbmRpbmdSZXN1bWVFdmVudERhdGEgPSBldmVudERhdGE7XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGdldFBlbmRpbmdSZXN1bWVFdmVudERhdGEoKTogQXBwbGljYXRpb25FdmVudERhdGEgIHtcbiAgICByZXR1cm4gdGhpcy5fcGVuZGluZ1Jlc3VtZUV2ZW50RGF0YTtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgaXNPblVwZGF0ZVByb2Nlc3NpbmcoKSB7XG4gICAgcmV0dXJuIHRoaXMuX29uVXBkYXRlUHJvY2Vzc2luZztcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgc2V0T25VcGRhdGVQcm9jZXNzaW5nKGZsYWc6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9vblVwZGF0ZVByb2Nlc3NpbmcgPSBmbGFnO1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBpc09uUmVzdW1lUHJvY2Vzc2luZygpIHtcbiAgICByZXR1cm4gdGhpcy5fb25SZXN1bWVQcm9jZXNzaW5nO1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBzZXRPblJlc3VtZVByb2Nlc3NpbmcoZmxhZzogYm9vbGVhbikge1xuICAgIHRoaXMuX29uUmVzdW1lUHJvY2Vzc2luZyA9IGZsYWc7XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGluaXRpYWxpemVMb2NhbGl6YXRpb25BbmRDdXN0b21pemF0aW9uKCkge1xuICAgIC8vIHJlbG9hZCBhcHAgbGFuZ3VhZ2UgZm9yIGkxOG5cbiAgICBJMThuTGFuZ3VhZ2UubG9hZEFwcExhbmd1YWdlKCk7XG4gICAgLy8gY3VzdG9taXplICYgbG9jYWxpemUgb25ib2FyZGluZyBzY3JlZW5zIChwYXNzY29kZSwgdG91Y2hJZCwgRVVMQS4uLilcbiAgICBsZXQgcGFyYW1zID0gQ2xpZW50U2V0dGluZ3MuZ2V0T25ib2FyZGluZ0N1c3RvbWl6YXRpb25zKCk7XG4gICAgT25ib2FyZGluZ0N1c3RvbWl6YXRpb25CcmlkZ2UuY29uZmlnT25ib2FyZGluZ1BhZ2VzKHBhcmFtcyk7XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGdldEFwcGxpY2F0aW9uUGFyYW1zKCk6IElBcHBsaWNhdGlvbkRhdGEge1xuICAgIHJldHVybiB0aGlzLl9hcHBsaWNhdGlvblBhcmFtcztcbiAgfVxuXG4gIHByaXZhdGUgc3RhdGljIF9tYWluUGFnZVJlbmRlcmVkID0gZmFsc2U7XG4gIHByaXZhdGUgc3RhdGljIF9ub25OU0FjdGl2aXR5RG9uZSA9IGZhbHNlO1xuXG4gIHByaXZhdGUgc3RhdGljIF9hcHBsaWNhdGlvblBhcmFtczogSUFwcGxpY2F0aW9uRGF0YSA9IHtcbiAgICBtYWluUGFnZTogJycsXG4gICAgc3R5bGVQYXRoOiAnJyxcbiAgICBzZGtTdHlsZVBhdGg6ICcnLFxuICAgIHZlcnNpb246ICcnLFxuICAgIGxvY2FsaXphdGlvbjogJycsXG4gIH07XG4gIHByaXZhdGUgc3RhdGljIF9hcHBEZWZpbml0aW9uOiBBcHBsaWNhdGlvbkRlZmluaXRpb247XG4gIHByaXZhdGUgc3RhdGljIF9wZW5kaW5nUmVzdW1lRXZlbnREYXRhOiBBcHBsaWNhdGlvbkV2ZW50RGF0YTtcbiAgcHJpdmF0ZSBzdGF0aWMgX29uQm9hcmRpbmdDb21wbGV0ZWQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgcHJpdmF0ZSBzdGF0aWMgX3Jlc3VtZUV2ZW50RGVsYXllZDogYm9vbGVhbiA9IGZhbHNlO1xuICBwcml2YXRlIHN0YXRpYyBfb25FeGl0SWdub3JlQ291bnQ6IG51bWJlciA9IDA7XG4gIHByaXZhdGUgc3RhdGljIF9vblVwZGF0ZVByb2Nlc3Npbmc6IGJvb2xlYW4gPSBmYWxzZTtcbiAgcHJpdmF0ZSBzdGF0aWMgX29uUmVzdW1lUHJvY2Vzc2luZzogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIHByaXZhdGUgc3RhdGljIF9jcmVhdGVTaW5nbGV0b25zKCk6IFByb21pc2U8YW55PiB7XG4gICAgcmV0dXJuIHRoaXMuX3NldERlZmluaXRpb25Qcm92aWRlcih1bmRlZmluZWQpLnRoZW4oKCkgPT4ge1xuICAgICAgQXBwbGljYXRpb24uc2V0T0RhdGFTZXJ2aWNlKCk7XG4gICAgICBJQWN0aW9uRmFjdG9yeS5zZXRDcmVhdGVGdW5jdGlvbihBY3Rpb25GYWN0b3J5LkNyZWF0ZSk7XG4gICAgICBJQWN0aW9uRmFjdG9yeS5zZXRDcmVhdGVBY3Rpb25SdW5uZXJGdW5jdGlvbihBY3Rpb25GYWN0b3J5LkNyZWF0ZUFjdGlvblJ1bm5lcik7XG4gICAgICBJU2VnbWVudEZhY3Rvcnkuc2V0QnVpbGRGdW5jdGlvbihTZWdtZW50RmFjdG9yeS5idWlsZCk7XG4gICAgICBJQ29udHJvbEZhY3Rvcnkuc2V0Q3JlYXRlRnVuY3Rpb24oQ29udHJvbEZhY3RvcnlTeW5jLkNyZWF0ZSk7XG4gICAgICBJQ29udGV4dC5zZXRGcm9tUGFnZUZ1bmN0aW9uKENvbnRleHQuZnJvbVBhZ2UpO1xuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBzdGF0aWMgc2V0T0RhdGFTZXJ2aWNlKCkge1xuICAgIElEYXRhU2VydmljZS5zZXRJbnN0YW5jZShuZXcgT0RhdGFTZXJ2aWNlKCkpO1xuICAgIElSZXN0U2VydmljZS5zZXRJbnN0YW5jZShuZXcgUmVzdFNlcnZpY2UoKSk7XG4gIH1cblxuICBwcml2YXRlIHN0YXRpYyBfZXhlY3V0ZVdpdGhIYW5kbGVyUGF0aHMoaGFuZGxlclBhdGg6IHN0cmluZ1tdLCBhcHBFdmVudERhdGE6IEFwcGxpY2F0aW9uRXZlbnREYXRhKTogUHJvbWlzZTxhbnk+IHtcbiAgICBsZXQgcHJvbWlzZXM6IFByb21pc2U8YW55PltdID0gaGFuZGxlclBhdGgubWFwKHJ1bGUgPT4ge1xuICAgICAgcmV0dXJuIEFwcGxpY2F0aW9uLl9leGVjdXRlV2l0aEhhbmRsZXJQYXRoKHJ1bGUsIGFwcEV2ZW50RGF0YSk7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gUHJvbWlzZS5hbGwocHJvbWlzZXMpO1xuICB9XG5cbiAgcHJpdmF0ZSBzdGF0aWMgX2V4ZWN1dGVXaXRoSGFuZGxlclBhdGgoaGFuZGxlclBhdGg6IHN0cmluZywgYXBwRXZlbnREYXRhOiBBcHBsaWNhdGlvbkV2ZW50RGF0YSk6IFByb21pc2U8YW55PiB7XG4gICAgaWYgKGhhbmRsZXJQYXRoKSB7XG4gICAgICBDb250ZXh0LmZyb21QYWdlKCkuY2xpZW50QVBJUHJvcHMuYXBwRXZlbnREYXRhID0gYXBwRXZlbnREYXRhO1xuICAgICAgbGV0IG9FdmVudEhhbmRsZXIgPSBuZXcgRXZlbnRIYW5kbGVyKCk7XG4gICAgICAvLyB0aGlzIHdpbGwgdHlwaWNhbGx5IGJlIGEgcnVsZSBidXQgaW4gdGhlIGZ1dHVyZSBjb3VsZCB2ZXJ5IHdlbGwgYmUgYW4gYWN0aW9uXG4gICAgICByZXR1cm4gb0V2ZW50SGFuZGxlci5leGVjdXRlQWN0aW9uT3JSdWxlKGhhbmRsZXJQYXRoLCBDb250ZXh0LmZyb21QYWdlKCkpLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgTG9nZ2VyLmluc3RhbmNlLnN0YXJ0dXAuZXJyb3IoTG9nZ2VyLlNUQVJUVVBfRVhFQ1VURV9GQUlMRUQsIGhhbmRsZXJQYXRoLCBlcnJvcik7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihlcnJvcik7XG4gICAgICB9KTtcbiAgICB9IGVsc2UgaWYgKGFwcEV2ZW50RGF0YSAmJiBhcHBFdmVudERhdGEuaW9zKSB7XG4gICAgICAvLyBGb3IgaU9TIGFwcGxpY2F0aW9ucywgYXJncy5pb3MgaXMgTmF0aXZlU2NyaXB0RXJyb3IuXG4gICAgICBMb2dnZXIuaW5zdGFuY2Uuc3RhcnR1cC5sb2coTG9nZ2VyLlNUQVJUVVBfRVJST1JfSU5fQVBQRVZFTlREQVRBX0lPUywgQXBwbGljYXRpb24uX2FwcERlZmluaXRpb24uZ2V0TmFtZSgpLFxuICAgICAgICBhcHBFdmVudERhdGEuaW9zKTtcbiAgICAgIExvZ2dlci5pbnN0YW5jZS5zdGFydHVwLmxvZyhMb2dnZXIuU1RBUlRVUF9TVEFDS1RSQUNFLCBhcHBFdmVudERhdGEuaW9zLnN0YWNrKTtcbiAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChBcHBsaWNhdGlvbi5fYXBwRGVmaW5pdGlvbi5nZXROYW1lKCkgKyAnIEVycm9yICcgKyBhcHBFdmVudERhdGEuaW9zKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHN0YXRpYyBfbGF1bmNoU3RhcnR1cEV2ZW50cyh0aW1lb3V0OiBudW1iZXIpOiBQcm9taXNlPGFueT4ge1xuICAgIC8vIHRoZSB0aW1lb3V0IGlzIHRvIGFsbG93IHtOfSB0byBjb250aW51ZSBpbml0aWFsaXppbmcgYmVmb3JlIHdlIGxhdW5jaCBvdXIgZXZlbnRzXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgcmV0dXJuIEFwcGxpY2F0aW9uLm9uTGF1bmNoKHVuZGVmaW5lZCkudGhlbigoKSA9PiB7XG4gICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICB9KTtcbiAgICAgIH0sIHRpbWVvdXQpO1xuICAgIH0pLnRoZW4oKCkgPT4ge1xuICAgICAgLyoqIEFwcGxpY2F0aW9uIGxhdW5jaCBlbnN1cmVzIGFsbCB0aGUgT0RhdGEgU2VydmljZXMgaGF2ZSBiZWVuIGluaXRpYWxpemVkLlxuICAgICAgICogU2lkZSBkcmF3ZXIgaXMgY3JlYXRlZCBiZWZvcmUgdGhlIE9EYXRhIHNlcnZpY2VzIGFyZSBpbml0aWFsaXplZC5cbiAgICAgICAqIEhlbmNlLCB3ZSByZWRyYXcgdGhlIHNpZGUgZHJhd2VyIGFmdGVyIHRoZSBhcHBsaWNhdGlvbiBsYXVuY2ggdG8gbWFrZSBzdXJlXG4gICAgICAgKiBpZiBzaWRlIGRyYXdlciBkZWZpbml0aW9uIHVzZXMgYW55IGVudGl0eSBvciBPRGF0YSBTZXJ2aWNlIHJlc3VsdCwgdGhlIHNpZGUgZHJhd2VyIGNvbnRyb2xcbiAgICAgICAqIGlzIHVwZGF0ZWQgd2l0aCB0aGUgY29ycmVjdCB2YWx1ZXMuXG4gICAgICAgKi9cbiAgICAgIGlmIChQYWdlUmVuZGVyZXIuYXBwTGV2ZWxTaWRlRHJhd2VyICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgUGFnZVJlbmRlcmVyLmFwcExldmVsU2lkZURyYXdlci5yZWRyYXcoKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIC8vIElmIHRoZXJlIGFyZSBwZW5kaW5nIHVwbG9hZHMgaW4gdGhlIG9mZmxpbmUgc3RvcmU6XG4gIC8vIFdpdGggZm9yY2UgYmVpbmcgdHJ1ZSwgdGhlIG9mZmxpbmUgc3RvcmUgZ2V0cyBudWtlZCByZWdhcmRsZXNzIG9mIHBlbmRpbmcgdHJhbnNhY3Rpb25zLlxuICAvLyAoRm9yIG5vdywgdGhlIHJlcXVpcmVtZW50IGlzIHRvIGFsd2F5cyBkbyBhIHJlc2V0IGNsaWVudCwgc28gZm9yY2Ugd2lsbCBhbHdheXMgYmUgdHJ1ZSlcbiAgLy8gV2UgYXJlIHJldHVybmVkIHRvIHdlbGNvbWUgc2NyZWVuIGFmdGVyIGEgY2xpZW50IHJlc2V0LlxuICBwcml2YXRlIHN0YXRpYyBfcmVzZXRDbGllbnRIZWxwZXIoc2VydmljZTogYW55LCBzZXJ2aWNlVXJsOiBhbnksIGZvcmNlOiBib29sZWFuID0gdHJ1ZSk6IFByb21pc2U8YW55PiB7XG4gICAgcmV0dXJuIHNlcnZpY2UuY2xlYXJPZmZsaW5lU3RvcmUoeyBzZXJ2aWNlVXJsLCBmb3JjZSB9KS50aGVuKCgpID0+IHtcbiAgICAgIC8vXG4gICAgfSkuY2F0Y2ggKGUgPT4ge1xuICAgICAgTG9nZ2VyLmluc3RhbmNlLmFwcC5lcnJvcihlKTtcbiAgICAgIC8vIFdlIGdvdCBoZXJlIG1vc3QgbGlrZWx5IGJlY2F1c2Ugc3RvcmUgY2xlYXIgZmFpbGVkIGJlY2F1c2Ugc2FpZCBzdG9yZSBkb2VzIG5vdCBleGlzdCBvciBkaWQgbm90XG4gICAgICAvLyBpbml0aWFsaXplIGNvcnJlY3RseS4gIEFzIHVzZXIgaXMgYXR0ZW1wdGluZyBhIHJlc2V0LCBqdXN0IGFsbG93IHVzZXIgdG8gcHJvY2VlZCB0byB3ZWxjb21lIHNjcmVlbi5cbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgc3RhdGljIF9yb2xsYmFja0RlZmluaXRpb25Qcm92aWRlcigpOiBQcm9taXNlPGFueT4ge1xuICAgIHJldHVybiB0aGlzLl9zZXREZWZpbml0aW9uUHJvdmlkZXIoTGlmZWN5Y2xlTWFuYWdlci5nZXRJbnN0YW5jZSgpLmdldEN1cnJlbnREZWZpbml0aW9uUGF0aCgpKTtcbiAgfVxuXG4gIHByaXZhdGUgc3RhdGljIF9zZXREZWZpbml0aW9uUHJvdmlkZXIoZGVmaW5pdGlvblBhdGg6IHN0cmluZyk6IFByb21pc2U8YW55PiB7XG4gICAgbGV0IGN1cnJlbnREZWZpbml0aW9uUGF0aDtcbiAgICBsZXQgZGVtb0J1bmRsZVBhdGg7XG4gICAgbGV0IGJ1bmRsZURlZmluaXRpb25Mb2FkZXI6IElEZWZpbml0aW9uTG9hZGVyO1xuICAgIGlmIChDbGllbnRTZXR0aW5ncy5pc0RlbW9Nb2RlKCkpIHtcbiAgICAgIGRlbW9CdW5kbGVQYXRoID0gQ2xpZW50U2V0dGluZ3MuZ2V0RGVtb0J1bmRsZVBhdGgoKTtcbiAgICAgIGlmICh0eXBlb2YgZGVtb0J1bmRsZVBhdGggIT09ICd1bmRlZmluZWQnICYmIGRlbW9CdW5kbGVQYXRoICE9PSBudWxsICYmIHR5cGVvZiBkZW1vQnVuZGxlUGF0aCA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgLy8gV2UgYXJlIGluIGRlbW8gbW9kZSBhbmQgdXNlciBoYXMgc3BlY2lmaWVkIGEgcmVsYXRpdmUgcGF0aCBmb3IgdGhlIGJ1bmRsZSBpbiBicmFuZGVkIHNldHRpbmdzLlxuICAgICAgICAvLyBUaGUgcmVsYXRpdmUgcGF0aCBlbmRzIHdpdGggYnVuZGxlIGZpbGUgbmFtZS4gRm9yIEV4YW1wbGUsIFwiQnVuZGxlUGF0aFwiOiBcIi9idW5kbGVzL2J1bmRsZS5qc1wiXG4gICAgICAgIC8vIFRoZSBidW5kbGVEZWZpbml0aW9uTG9hZGVyIHdpbGwgY2hlY2sgZm9yIHRoaXMgZmlsZSdzIGV4aXN0ZW5jZSBhbmQgaWYgbm90IGZvdW5kLFxuICAgICAgICAvLyB3aWxsIGZhbGwgYmFjayB0byB1c3VhbCBkZW1vLmpzIGxvY2F0ZWQgaW4gYXBwIGZvbGRlci5cbiAgICAgICAgY3VycmVudERlZmluaXRpb25QYXRoID0gZnMucGF0aC5qb2luKFBhdGhzLmdldE92ZXJyaWRlUGF0aCgpLCBkZW1vQnVuZGxlUGF0aCk7XG4gICAgICB9XG4gICAgICBidW5kbGVEZWZpbml0aW9uTG9hZGVyID0gbmV3IERlbW9CdW5kbGVEZWZpbml0aW9uTG9hZGVyKGN1cnJlbnREZWZpbml0aW9uUGF0aCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGN1cnJlbnREZWZpbml0aW9uUGF0aCA9IGRlZmluaXRpb25QYXRoID8gZGVmaW5pdGlvblBhdGggOlxuICAgICAgICBMaWZlY3ljbGVNYW5hZ2VyLmdldEluc3RhbmNlKCkuZ2V0Q3VycmVudERlZmluaXRpb25QYXRoKCk7XG4gICAgICBidW5kbGVEZWZpbml0aW9uTG9hZGVyID0gbmV3IEJ1bmRsZURlZmluaXRpb25Mb2FkZXIoY3VycmVudERlZmluaXRpb25QYXRoKTtcbiAgICB9XG5cbiAgICByZXR1cm4gYnVuZGxlRGVmaW5pdGlvbkxvYWRlci5sb2FkQnVuZGxlKCkudGhlbigoKSA9PiB7XG4gICAgICBJRGVmaW5pdGlvblByb3ZpZGVyLnNldEluc3RhbmNlKG5ldyBEZWZpbml0aW9uUHJvdmlkZXIoYnVuZGxlRGVmaW5pdGlvbkxvYWRlcikpO1xuICAgICAgdGhpcy5fYXBwRGVmaW5pdGlvbiA9IElEZWZpbml0aW9uUHJvdmlkZXIuaW5zdGFuY2UoKS5nZXRBcHBsaWNhdGlvbkRlZmluaXRpb24oKSBhcyBBcHBsaWNhdGlvbkRlZmluaXRpb247XG4gICAgICByZXR1cm4gdGhpcy5fcmVzb2x2ZUFwcGxpY2F0aW9uUGFyYW1zKCk7XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIHN0YXRpYyBfc2V0dXBGb3JBcHBsaWNhdGlvbkxhdW5jaChkaWRMYXVuY2hBcHA6IGJvb2xlYW4sIGRlZmluaXRpb25QYXRoOiBzdHJpbmcpIHtcbiAgICBhcHBsaWNhdGlvbi5vbihhcHBsaWNhdGlvbi51bmNhdWdodEVycm9yRXZlbnQsIEFwcGxpY2F0aW9uLm9uVW5DYXVnaHRFcnJvcik7XG4gICAgYXBwbGljYXRpb24ub24oYXBwbGljYXRpb24uZXhpdEV2ZW50LCBBcHBsaWNhdGlvbi5vbkV4aXQpO1xuICAgIGlmIChhcHBsaWNhdGlvbi5pb3MpIHtcbiAgICAgIGFwcGxpY2F0aW9uLm9uKGFwcGxpY2F0aW9uLnN1c3BlbmRFdmVudCwgQXBwbGljYXRpb24ub25TdXNwZW5kKTtcbiAgICAgIGFwcGxpY2F0aW9uLm9uKGFwcGxpY2F0aW9uLnJlc3VtZUV2ZW50LCBBcHBsaWNhdGlvbi5vblJlc3VtZSk7XG4gICAgfVxuXG4gICAgdGhpcy5fc2V0VmVyc2lvbkluZm8oKTtcblxuICAgIGNvbnN0IHNka1N0eWxlUGF0aCA9IEFwcGxpY2F0aW9uLl9hcHBsaWNhdGlvblBhcmFtcy5zZGtTdHlsZVBhdGg7XG4gIFxuICAgIGlmIChzZGtTdHlsZVBhdGgpIHtcbiAgICAgIGNvbnN0IHNka1N0eWxlID0gSURlZmluaXRpb25Qcm92aWRlci5pbnN0YW5jZSgpLmdldERlZmluaXRpb24oc2RrU3R5bGVQYXRoKTtcbiAgICAgIGlmIChzZGtTdHlsZSkge1xuICAgICAgICBsZXQgY29udGVudCA9IHNka1N0eWxlLnRvU3RyaW5nKCk7XG4gICAgICAgIGlmICh0eXBlb2Yoc2RrU3R5bGUgPT09ICdvYmplY3QnKSAmJiBzZGtTdHlsZSBpbnN0YW5jZW9mIEFycmF5ID09PSBmYWxzZSkge1xuICAgICAgICAgIGNvbnRlbnQgPSBKU09OLnN0cmluZ2lmeShzZGtTdHlsZSk7XG4gICAgICAgIH1cbiAgICAgICAgU0RLU3R5bGluZ01hbmFnZXIuc2F2ZVNES1N0eWxlRmlsZShjb250ZW50KS50aGVuKCgpID0+IHtcbiAgICAgICAgICBMb2dnZXIuaW5zdGFuY2Uuc3RhcnR1cC5sb2coTG9nZ2VyLlNUQVJUVVBfU1VDQ0VFRF9BUFBMWV9TVFlMRVMsIHNka1N0eWxlUGF0aCk7XG4gICAgICAgICAgU0RLU3R5bGluZ01hbmFnZXIuYXBwbHlTREtTdHlsZSgpO1xuICAgICAgICB9LCAoZXJyb3IpID0+IHtcbiAgICAgICAgICBMb2dnZXIuaW5zdGFuY2Uuc3RhcnR1cC5lcnJvcihMb2dnZXIuRVJST1IsIGVycm9yLCBlcnJvci5zdGFjayk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChkaWRMYXVuY2hBcHApIHtcbiAgICAgIC8vIGZvciBCQ1AtMTg4MDYxMDAxNiwgZnVydGhlciBwb3N0cG9uZSB0aGUgT25MYXVuY2ggZXZlbnRcbiAgICAgIC8vIHRvIG1ha2Ugc3VyZSBpdCBpcyB0cmlnZ2VyZWQgYWZ0ZXIgbWFpbiBwYWdlIGlzIHJlbmRlcmVkXG4gICAgICAvLyBUT0RPLUZVVFVSRTogd2Ugc2hvdWxkIGZpbmQgYSBiZXR0ZXIgd2F5IHRvIGdldCByaWQgb2YgdGhlIHRpbWVyXG4gICAgICAvLyBiZWluZyB1c2VkIGluIF9sYXVuY2hTdGFydHVwRXZlbnRzKClcblxuICAgICAgLy8gY29taW5nIG91dCBvZiB0aGUgd2VsY29tZSBwYWdlIHNlZW1zIHRvIHRha2UgYSBiaXQgbG9uZ2VyXG4gICAgICByZXR1cm4gQXBwbGljYXRpb24uX2xhdW5jaFN0YXJ0dXBFdmVudHMoMTUwMCkudGhlbigoKSA9PiB7XG4gICAgICAgIEFwcGxpY2F0aW9uLnNldE1haW5QYWdlUmVuZGVyZWQodHJ1ZSk7XG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGFwcGxpY2F0aW9uLm9uKGFwcGxpY2F0aW9uLmxhdW5jaEV2ZW50LCAoKSA9PiB7XG4gICAgICAgIHJldHVybiBBcHBsaWNhdGlvbi5fbGF1bmNoU3RhcnR1cEV2ZW50cygyNTApO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbsKgIHByaXZhdGUgc3RhdGljIGRvTG9hZE1haW5QYWdlQW5kRGlkVXBkYXRlKCk6IFByb21pc2U8YW55PiB7XG4gICAgaWYgKE1vZGFsRnJhbWUuaXNUb3BNb3N0TW9kYWwoKSkge1xuICAgICAgRnJhbWUudG9wbW9zdCgpLmNsb3NlTW9kYWwoKTtcbiAgICB9IGVsc2UgaWYgKFRhYkZyYW1lLmlzVG9wTW9zdFRhYigpKSB7XG4gICAgICBsZXQgdG9wRnJhbWUgPSBGcmFtZS50b3Btb3N0KCk7XG4gICAgICBpZiAodG9wRnJhbWUgJiYgdG9wRnJhbWUuY3VycmVudFBhZ2UgJiYgdG9wRnJhbWUuY3VycmVudFBhZ2UubW9kYWwpIHtcbiAgICAgICAgdG9wRnJhbWUuY3VycmVudFBhZ2UubW9kYWwuY2xvc2VNb2RhbCgpO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIFNFQU0tNjc6IHJlbG9hZCBzdHlsZXMgYWZ0ZXIgTENNUyB1cGRhdGVcbiAgICBjb25zdCBzdHlsZVBhdGggPSBBcHBsaWNhdGlvbi5fYXBwbGljYXRpb25QYXJhbXMuc3R5bGVQYXRoO1xuICAgIGlmIChzdHlsZVBhdGgpIHtcbiAgICAgIGNvbnN0IHN0eWxlID0gSURlZmluaXRpb25Qcm92aWRlci5pbnN0YW5jZSgpLmdldERlZmluaXRpb24oc3R5bGVQYXRoKTtcbiAgICAgIGlmIChzdHlsZSkge1xuICAgICAgICBhcHBsaWNhdGlvbi5hZGRDc3Moc3R5bGUudG9TdHJpbmcoKSk7XG4gICAgICAgIC8vIFNFQU0tNjc6IGluZGljYXRvciB0byB1cGRhdGUgcnVsZXNldCBvbiBDc3NQcm9wZXJ0eVBhcnNlclxuICAgICAgICBDbGllbnRTZXR0aW5ncy5zZXRVcGRhdGVDU1NSdWxlU2V0RmxhZyh0cnVlKTtcbiAgICAgICAgTG9nZ2VyLmluc3RhbmNlLmFwcFVwZGF0ZS5sb2coTG9nZ2VyLkFQUFVQREFURV9TVUNDRVNTRlVMTFlfQVBQTFlfU1RZTEVTLCBzdHlsZVBhdGgpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IHNka1N0eWxlUGF0aCA9IEFwcGxpY2F0aW9uLl9hcHBsaWNhdGlvblBhcmFtcy5zZGtTdHlsZVBhdGg7XG4gICAgaWYgKHNka1N0eWxlUGF0aCkge1xuICAgICAgY29uc3Qgc2RrU3R5bGUgPSBJRGVmaW5pdGlvblByb3ZpZGVyLmluc3RhbmNlKCkuZ2V0RGVmaW5pdGlvbihzZGtTdHlsZVBhdGgpO1xuICAgICAgaWYgKHNka1N0eWxlKSB7XG4gICAgICAgIGxldCBjb250ZW50ID0gc2RrU3R5bGUudG9TdHJpbmcoKTtcbiAgICAgICAgaWYgKHR5cGVvZihzZGtTdHlsZSA9PT0gJ29iamVjdCcpICYmIHNka1N0eWxlIGluc3RhbmNlb2YgQXJyYXkgPT09IGZhbHNlKSB7XG4gICAgICAgICAgY29udGVudCA9IEpTT04uc3RyaW5naWZ5KHNka1N0eWxlKTtcbiAgICAgICAgfVxuICAgICAgICBTREtTdHlsaW5nTWFuYWdlci5zYXZlU0RLU3R5bGVGaWxlKGNvbnRlbnQpLnRoZW4oKCkgPT4ge1xuICAgICAgICAgIExvZ2dlci5pbnN0YW5jZS5hcHBVcGRhdGUubG9nKExvZ2dlci5BUFBVUERBVEVfU1VDQ0VTU0ZVTExZX0FQUExZX1NES19TVFlMRVMsIHNka1N0eWxlUGF0aCk7XG4gICAgICAgICAgU0RLU3R5bGluZ01hbmFnZXIuYXBwbHlTREtTdHlsZSgpO1xuICAgICAgICB9LCAoZXJyb3IpID0+IHtcbiAgICAgICAgICBMb2dnZXIuaW5zdGFuY2UuYXBwVXBkYXRlLmVycm9yKExvZ2dlci5FUlJPUiwgZXJyb3IsIGVycm9yLnN0YWNrKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdGhpcy5pbml0aWFsaXplTG9jYWxpemF0aW9uQW5kQ3VzdG9taXphdGlvbigpO1xuXG4gICAgQ2xpZW50U2V0dGluZ3MucmVzZXRFeHRlbnNpb25Db250cm9sU291cmNlTWFwKCk7XG5cbiAgICByZXR1cm4gdGhpcy5yZXNldEFwcGxpY2F0aW9uUm9vdFZpZXdJZlNpZGVEcmF3ZXJDaGFuZ2VkKCkudGhlbigoKSA9PiB7XG4gICAgICBsZXQgbGF1bmNoUHJvbWlzZTtcbiAgICAgIGNvbnN0IG1haW5QYWdlID0gQXBwbGljYXRpb24uX2FwcGxpY2F0aW9uUGFyYW1zLm1haW5QYWdlO1xuICAgICAgaWYgKFBhZ2VSZW5kZXJlci5hcHBMZXZlbFNpZGVEcmF3ZXIgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBsYXVuY2hQcm9taXNlID0gUGFnZVJlbmRlcmVyLmFwcExldmVsU2lkZURyYXdlci5yZW5kZXJNYWluUGFnZSgpO1xuICAgICAgfSBlbHNlIHsgXG4gICAgICAgIGxhdW5jaFByb21pc2UgPSBQYWdlUmVuZGVyZXIucHVzaE5hdmlnYXRpb24obWFpblBhZ2UsIHRydWUsIE1ES05hdmlnYXRpb25UeXBlLlJvb3QpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGxhdW5jaFByb21pc2UudGhlbigoKSA9PiB7XG4gIMKgIMKgIMKgICAgLy8gU05PV0JMSU5ELTUzMjA6IFdlIG5lZWQgdG8gZ2l2ZSB0aGUgbWFpbiBwYWdlIGEgYml0IG9mIHRpbWUgdG8gcmVuZGVyIGJlZm9yZSB3ZSBydW5cbiAgwqAgwqAgwqAgLy8gdGhlIG9uRGlkVXBkYXRlKCkgYWN0aW9uIHNvIGl0IGNhbiBoYW5kbGUgYW55IHJlZHJhd3MgdGhhdCBpdCBuZWVkcyB0byBtYWtlIHdpdGggdGhlIHJlc3VsdFxuICAgICAgICAvLyBXcmFwcGVkIHRoZSB0aW1lciBpbiBhIHByb21pc2UgdG8gbWFrZSBzdXJlIHRoZSBwcm9taXNlIGNoYWluIGlzIHJldHVybmVkIGNvcnJlY3RseS5cbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XG4gICAgICAgICAgLy8gVXNlIE5hdGl2ZXNjcmlwdCdzIHRpbWVyIGltcGxlbWVudGF0aW9uIHRvIG1ha2UgdGhpcyB0ZXN0YWJsZS5cbiAgICAgICAgICAvLyBVc2luZyBKUydzIHNldFRpbWVvdXQgbWFkZSB0aGlzIHVudGVzdGFibGUgYXMgY291bGRuJ3Qgc2V0IHRoZSBmYWtlIHRpbWVyIHRvIHRpY2tcbiAgICAgICAgICAvLyBhdCB0aGUgZXhhY3QgcG9pbnQuXG4gICAgICAgICAgc2V0VGltZW91dChyZXNvbHZlLCA3NTApO1xuICAgICAgICB9KS50aGVuKCgpID0+IHtcbiAgICAgICAgICBBcHBsaWNhdGlvbi5zZXRPblVwZGF0ZVByb2Nlc3NpbmcodHJ1ZSk7XG4gIMKgIMKgIMKgIMKgIHJldHVybiBBcHBsaWNhdGlvbi5vbkRpZFVwZGF0ZSgpLnRoZW4oKHJlc3VsdCkgPT4ge1xuICAgICAgICAgICAgaWYgKFBhZ2VSZW5kZXJlci5hcHBMZXZlbFNpZGVEcmF3ZXIgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICBQYWdlUmVuZGVyZXIuYXBwTGV2ZWxTaWRlRHJhd2VyLnJlZHJhdygpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgQXBwbGljYXRpb24uc2V0T25VcGRhdGVQcm9jZXNzaW5nKGZhbHNlKTtcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUocmVzdWx0KTtcbiAgICAgICAgICB9KS5jYXRjaCgoZXJyb3IpID0+IHtcbiAgICAgICAgICAgIEFwcGxpY2F0aW9uLnNldE9uVXBkYXRlUHJvY2Vzc2luZyhmYWxzZSk7XG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoZXJyb3IpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBzdGF0aWMgcmVzZXRBcHBsaWNhdGlvblJvb3RWaWV3SWZTaWRlRHJhd2VyQ2hhbmdlZCgpIHtcbiAgICBsZXQgcm9vdFZpZXcgPSBhcHBsaWNhdGlvbi5nZXRSb290VmlldygpO1xuICAgIGNvbnN0IG1haW5QYWdlUmVmID0gQXBwbGljYXRpb24uX2FwcGxpY2F0aW9uUGFyYW1zLm1haW5QYWdlO1xuICAgIHJldHVybiBJRGVmaW5pdGlvblByb3ZpZGVyLmluc3RhbmNlKCkuZ2V0RGVmaW5pdGlvbihtYWluUGFnZVJlZikudGhlbigobWFpblBhZ2VEZWYpID0+IHtcbiAgICAgIGlmIChtYWluUGFnZURlZi5nZXRTaWRlRHJhd2VyKCkgIT09IHVuZGVmaW5lZCB8fCByb290VmlldyBpbnN0YW5jZW9mIFJhZFNpZGVEcmF3ZXIpIHtcbiAgICAgICAgcmV0dXJuIFBhZ2VSZW5kZXJlci5zdGFydHVwTmF2aWdhdGlvbih1bmRlZmluZWQsIGZhbHNlKS50aGVuKChyb290RW50cnkpID0+IHtcbiAgICAgICAgICBhcHBsaWNhdGlvbi5fcmVzZXRSb290Vmlldyhyb290RW50cnkpO1xuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgc3RhdGljIF9zZXRWZXJzaW9uSW5mbygpIHtcbiAgICBpZiAoQXBwbGljYXRpb24uX2FwcGxpY2F0aW9uUGFyYW1zLnZlcnNpb24pIHtcbiAgICAgIGlmIChhcHBsaWNhdGlvbi5hbmRyb2lkICYmICFhcHBsaWNhdGlvbi5hbmRyb2lkLmNvbnRleHQpIHtcbiAgICAgICAgLy8gIEJDUDIwODAyOTY2ODMsIFN5c3RlbS5lcnI6IFVuYWJsZSB0byBzdGFydCBhY3Rpdml0eVxuICAgICAgICAvLyB3aGVuIGRlbW8gYXBwbGljYXRpb24gcmVzdGFydCwgd2UgZG9uJ3QgbmVlZCBzZXQgdmVyc2lvbiBhZ2FpbiBpZiBhcHBsaWNhdGlvbi5hbmRyb2lkLmNvbnRleHRcbiAgICAgICAgLy8gaXMgdW5hdmFpbGFibGUsIGFzIHRoZSB2ZXJzaW9uIGhhcyBiZWVuIHNhdmVkIHRvIGFuZHJvaWQgU2hhcmVkUHJlZmVyZW5jZXMgd2hlbiBzdGFydCBhcHBsaWNhdGlvbiBmaXJzdCB0aW1lLlxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgVmVyc2lvbkluZm9CcmlkZ2Uuc2V0VmVyc2lvbkluZm8oQXBwbGljYXRpb24uX2FwcGxpY2F0aW9uUGFyYW1zLnZlcnNpb24pO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgc3RhdGljIF9zaG91bGRNb3ZlVGFza1RvQmFja2dyb3VuZChmcmFtZTogYW55KTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIGZyYW1lICYmICFNb2RhbEZyYW1lLmlzTW9kYWwoZnJhbWUpICYmIFxuICAgICAgKChmcmFtZS5iYWNrU3RhY2sgJiYgZnJhbWUuYmFja1N0YWNrLmxlbmd0aCA9PT0gMCkgfHwgIWZyYW1lLmJhY2tTdGFjayk7XG4gIH1cblxuICBwcml2YXRlIHN0YXRpYyByZW1vdmVBcHBsaWNhdGlvbkxpc3RlbmVyKCkge1xuICAgIGFwcGxpY2F0aW9uLm9mZihhcHBsaWNhdGlvbi51bmNhdWdodEVycm9yRXZlbnQsIEFwcGxpY2F0aW9uLm9uVW5DYXVnaHRFcnJvcik7XG4gICAgYXBwbGljYXRpb24ub2ZmKGFwcGxpY2F0aW9uLmV4aXRFdmVudCwgQXBwbGljYXRpb24ub25FeGl0KTtcbiAgICBpZiAoYXBwbGljYXRpb24uaW9zKSB7XG4gICAgICBhcHBsaWNhdGlvbi5vZmYoYXBwbGljYXRpb24uc3VzcGVuZEV2ZW50LCBBcHBsaWNhdGlvbi5vblN1c3BlbmQpO1xuICAgICAgYXBwbGljYXRpb24ub2ZmKGFwcGxpY2F0aW9uLnJlc3VtZUV2ZW50LCBBcHBsaWNhdGlvbi5vblJlc3VtZSk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBzdGF0aWMgX3Jlc2V0RmxhZ3MoKTogdm9pZCB7XG4gICAgQXBwbGljYXRpb24uc2V0T25ib2FyZGluZ0NvbXBsZXRlZChmYWxzZSk7XG4gICAgQXBwbGljYXRpb24uc2V0T25VcGRhdGVQcm9jZXNzaW5nKGZhbHNlKTtcbiAgICBBcHBsaWNhdGlvbi5zZXRSZXN1bWVFdmVudERlbGF5ZWQoZmFsc2UpO1xuICAgIEFwcGxpY2F0aW9uLnNldFBlbmRpbmdSZXN1bWVFdmVudERhdGEobnVsbCk7XG4gIH1cblxuICBwcml2YXRlIHN0YXRpYyBfY2xlYXJIaXN0b3JpY2FsT0RhdGFPZmZsaW5lU3RvcmUoKTogUHJvbWlzZTxhbnk+IHtcbiAgICBsZXQgcHJvbWlzZXMgPSBbXTtcbiAgICBsZXQgZm9yY2U6IGJvb2xlYW4gPSB0cnVlO1xuICAgIGxldCBfaGlzdG9yaWNhbE9EYXRhU2VydmljZVBhdGggPSBDbGllbnRTZXR0aW5ncy5nZXRIaXN0b3JpY2FsT0RhdGFTZXJ2aWNlUGF0aCgpO1xuICAgIGNvbnN0IHNlcnZpY2UgPSBJRGF0YVNlcnZpY2UuaW5zdGFuY2UoKTtcbiAgICBfaGlzdG9yaWNhbE9EYXRhU2VydmljZVBhdGguZm9yRWFjaCgoc2VydmljZVVybCkgPT4ge1xuICAgICAgcHJvbWlzZXMucHVzaCh0aGlzLl9yZXNldENsaWVudEhlbHBlcihzZXJ2aWNlLCBzZXJ2aWNlVXJsKSk7XG4gICAgfSk7XG4gICAgX2hpc3RvcmljYWxPRGF0YVNlcnZpY2VQYXRoID0gbmV3IFNldDxTdHJpbmc+KCk7XG4gICAgQ2xpZW50U2V0dGluZ3Muc2V0SGlzdG9yaWNhbE9EYXRhU2VydmljZVBhdGgoX2hpc3RvcmljYWxPRGF0YVNlcnZpY2VQYXRoKTtcbiAgICByZXR1cm4gUHJvbWlzZS5hbGwocHJvbWlzZXMpO1xuICB9XG5cbiAgcHJpdmF0ZSBzdGF0aWMgX3Jlc29sdmVBcHBsaWNhdGlvblBhcmFtcygpOiBQcm9taXNlPGFueT4ge1xuICAgIGxldCBidWlsZGVyID0gbmV3IEFwcGxpY2F0aW9uRGF0YUJ1aWxkZXIoQ29udGV4dC5mcm9tUGFnZSgpKTtcbiAgICBidWlsZGVyLnNldE1haW5QYWdlKHRoaXMuX2FwcERlZmluaXRpb24uZ2V0TWFpblBhZ2UoKSlcbiAgICAuc2V0U3R5bGVQYXRoKHRoaXMuX2FwcERlZmluaXRpb24uZ2V0U3R5bGVzKCkpXG4gICAgLnNldFNES1N0eWxlc1BhdGgodGhpcy5fYXBwRGVmaW5pdGlvbi5nZXRTREtTdHlsZXMoKSlcbiAgICAuc2V0VmVyc2lvbih0aGlzLl9hcHBEZWZpbml0aW9uLmdldFZlcnNpb24oKSlcbiAgICAuc2V0TG9jYWxpemF0aW9uKHRoaXMuX2FwcERlZmluaXRpb24uZ2V0TG9jYWxpemF0aW9uKCkpO1xuICAgIHJldHVybiBidWlsZGVyLmJ1aWxkKCkudGhlbigocmVzdWx0OiBJQXBwbGljYXRpb25EYXRhKSA9PiB7XG4gICAgICBpZiAocmVzdWx0KSB7XG4gICAgICAgIEFwcGxpY2F0aW9uLl9hcHBsaWNhdGlvblBhcmFtcyA9IHJlc3VsdDtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxufVxuIiwibW9kdWxlLmV4cG9ydHMgPSB7XCJ0eXBlXCI6XCJzdHlsZXNoZWV0XCIsXCJzdHlsZXNoZWV0XCI6e1wicnVsZXNcIjpbe1widHlwZVwiOlwiY29tbWVudFwiLFwiY29tbWVudFwiOlwiIFRoZXNlIGFyZSB0aGUgY2xpZW50J3MgZGVmYXVsdCBzdHlsZXMgZm9yIGJ1aWx0LWluIGNvbnRyb2xzIGluIEFuZHJvaWQgXCJ9LHtcInR5cGVcIjpcImNvbW1lbnRcIixcImNvbW1lbnRcIjpcIlxcblRoaXMgc3R5bGUgd2lsbCBhcHBseSB0byBhY3Rpb24gYmFyIGlmIHNlYXJjaCBpcyBlbmFibGVkLlxcblRoaXMgc3R5bGUgaXMgZXhwb3NlZC5cXG5cIn0se1widHlwZVwiOlwicnVsZVwiLFwic2VsZWN0b3JzXCI6W1wiQWN0aW9uQmFyRm9yU2VhcmNoXCJdLFwiZGVjbGFyYXRpb25zXCI6W3tcInR5cGVcIjpcImRlY2xhcmF0aW9uXCIsXCJwcm9wZXJ0eVwiOlwiYmFja2dyb3VuZC1jb2xvclwiLFwidmFsdWVcIjpcIiNmZmZmZmZcIn1dfSx7XCJ0eXBlXCI6XCJydWxlXCIsXCJzZWxlY3RvcnNcIjpbXCJUaXRsZVN0eWxlRm9yU2VhcmNoXCJdLFwiZGVjbGFyYXRpb25zXCI6W3tcInR5cGVcIjpcImRlY2xhcmF0aW9uXCIsXCJwcm9wZXJ0eVwiOlwiY29sb3JcIixcInZhbHVlXCI6XCIjZmZmZmZmXCJ9LHtcInR5cGVcIjpcImRlY2xhcmF0aW9uXCIsXCJwcm9wZXJ0eVwiOlwiYmFja2dyb3VuZC1jb2xvclwiLFwidmFsdWVcIjpcIiM4MDgwODBcIn1dfSx7XCJ0eXBlXCI6XCJjb21tZW50XCIsXCJjb21tZW50XCI6XCJcXG5UaGlzIHN0eWxlIHdpbGwgYXBwbHkgdG8gYWxsIFBhZ2VzIGluIHRoZSBhcHBsaWNhdGlvbi5cXG5UaGlzIHN0eWxlIGlzIGV4cG9zZWQuXFxuXCJ9LHtcInR5cGVcIjpcInJ1bGVcIixcInNlbGVjdG9yc1wiOltcIlRvb2xCYXJcIl0sXCJkZWNsYXJhdGlvbnNcIjpbe1widHlwZVwiOlwiZGVjbGFyYXRpb25cIixcInByb3BlcnR5XCI6XCJiYWNrZ3JvdW5kLWNvbG9yXCIsXCJ2YWx1ZVwiOlwiI2ZmZmZmZlwifSx7XCJ0eXBlXCI6XCJkZWNsYXJhdGlvblwiLFwicHJvcGVydHlcIjpcImJvcmRlci10b3AtY29sb3JcIixcInZhbHVlXCI6XCIjZWVlZWVmXCJ9LHtcInR5cGVcIjpcImRlY2xhcmF0aW9uXCIsXCJwcm9wZXJ0eVwiOlwiYm9yZGVyLXRvcC13aWR0aFwiLFwidmFsdWVcIjpcIjFcIn1dfSx7XCJ0eXBlXCI6XCJydWxlXCIsXCJzZWxlY3RvcnNcIjpbXCJUb29sQmFyIDpkaXNhYmxlZFwiXSxcImRlY2xhcmF0aW9uc1wiOlt7XCJ0eXBlXCI6XCJkZWNsYXJhdGlvblwiLFwicHJvcGVydHlcIjpcImNvbG9yXCIsXCJ2YWx1ZVwiOlwiIzgwODA4MFwifV19LHtcInR5cGVcIjpcInJ1bGVcIixcInNlbGVjdG9yc1wiOltcIlRvb2xCYXJJdGVtU3R5bGVcIl0sXCJkZWNsYXJhdGlvbnNcIjpbe1widHlwZVwiOlwiZGVjbGFyYXRpb25cIixcInByb3BlcnR5XCI6XCJjb2xvclwiLFwidmFsdWVcIjpcIiMwQTZFRDFcIn0se1widHlwZVwiOlwiZGVjbGFyYXRpb25cIixcInByb3BlcnR5XCI6XCJmb250LWZhbWlseVwiLFwidmFsdWVcIjpcIlxcXCJmNzJfcmVndWxhclxcXCIsIFxcXCJmNzJfYm9sZFxcXCIsIFxcXCJmNzJfaXRhbGljXFxcIiwgXFxcImY3Ml9ib2xkX2l0YWxpY1xcXCJcIn0se1widHlwZVwiOlwiZGVjbGFyYXRpb25cIixcInByb3BlcnR5XCI6XCJmb250LXNpemVcIixcInZhbHVlXCI6XCIxNHNwXCJ9XX0se1widHlwZVwiOlwicnVsZVwiLFwic2VsZWN0b3JzXCI6W1wiVG9vbEJhckl0ZW1EaXNhYmxlZFN0eWxlXCJdLFwiZGVjbGFyYXRpb25zXCI6W3tcInR5cGVcIjpcImRlY2xhcmF0aW9uXCIsXCJwcm9wZXJ0eVwiOlwiY29sb3JcIixcInZhbHVlXCI6XCIjMEE2RUQxXCJ9LHtcInR5cGVcIjpcImRlY2xhcmF0aW9uXCIsXCJwcm9wZXJ0eVwiOlwiZm9udC1mYW1pbHlcIixcInZhbHVlXCI6XCJcXFwiZjcyX3JlZ3VsYXJcXFwiLCBcXFwiZjcyX2JvbGRcXFwiLCBcXFwiZjcyX2l0YWxpY1xcXCIsIFxcXCJmNzJfYm9sZF9pdGFsaWNcXFwiXCJ9LHtcInR5cGVcIjpcImRlY2xhcmF0aW9uXCIsXCJwcm9wZXJ0eVwiOlwiZm9udC1zaXplXCIsXCJ2YWx1ZVwiOlwiMTRzcFwifSx7XCJ0eXBlXCI6XCJkZWNsYXJhdGlvblwiLFwicHJvcGVydHlcIjpcIm9wYWNpdHlcIixcInZhbHVlXCI6XCIwLjVcIn1dfSx7XCJ0eXBlXCI6XCJydWxlXCIsXCJzZWxlY3RvcnNcIjpbXCJUb29sQmFySXRlbVByZXNzZWRTdHlsZVwiXSxcImRlY2xhcmF0aW9uc1wiOlt7XCJ0eXBlXCI6XCJkZWNsYXJhdGlvblwiLFwicHJvcGVydHlcIjpcImNvbG9yXCIsXCJ2YWx1ZVwiOlwiI2UwZWVmNlwifV19LHtcInR5cGVcIjpcInJ1bGVcIixcInNlbGVjdG9yc1wiOltcIlRvb2xCYXJDb250YWluZWRJdGVtU3R5bGVcIl0sXCJkZWNsYXJhdGlvbnNcIjpbe1widHlwZVwiOlwiZGVjbGFyYXRpb25cIixcInByb3BlcnR5XCI6XCJiYWNrZ3JvdW5kLWNvbG9yXCIsXCJ2YWx1ZVwiOlwiIzBBNkVEMVwifSx7XCJ0eXBlXCI6XCJkZWNsYXJhdGlvblwiLFwicHJvcGVydHlcIjpcImNvbG9yXCIsXCJ2YWx1ZVwiOlwiI2ZmZmZmZlwifSx7XCJ0eXBlXCI6XCJkZWNsYXJhdGlvblwiLFwicHJvcGVydHlcIjpcImJvcmRlci1yYWRpdXNcIixcInZhbHVlXCI6XCI0XCJ9LHtcInR5cGVcIjpcImRlY2xhcmF0aW9uXCIsXCJwcm9wZXJ0eVwiOlwibWFyZ2luLWxlZnRcIixcInZhbHVlXCI6XCIxNlwifSx7XCJ0eXBlXCI6XCJkZWNsYXJhdGlvblwiLFwicHJvcGVydHlcIjpcIm1hcmdpbi1yaWdodFwiLFwidmFsdWVcIjpcIjE2XCJ9XX0se1widHlwZVwiOlwicnVsZVwiLFwic2VsZWN0b3JzXCI6W1wiVG9vbEJhckNvbnRhaW5lZEl0ZW1EaXNhYmxlZFN0eWxlXCJdLFwiZGVjbGFyYXRpb25zXCI6W3tcInR5cGVcIjpcImRlY2xhcmF0aW9uXCIsXCJwcm9wZXJ0eVwiOlwiYmFja2dyb3VuZC1jb2xvclwiLFwidmFsdWVcIjpcIiMwQTZFRDFcIn0se1widHlwZVwiOlwiZGVjbGFyYXRpb25cIixcInByb3BlcnR5XCI6XCJjb2xvclwiLFwidmFsdWVcIjpcIiNmZmZmZmZcIn0se1widHlwZVwiOlwiZGVjbGFyYXRpb25cIixcInByb3BlcnR5XCI6XCJib3JkZXItcmFkaXVzXCIsXCJ2YWx1ZVwiOlwiNFwifSx7XCJ0eXBlXCI6XCJkZWNsYXJhdGlvblwiLFwicHJvcGVydHlcIjpcIm1hcmdpbi1sZWZ0XCIsXCJ2YWx1ZVwiOlwiMTZcIn0se1widHlwZVwiOlwiZGVjbGFyYXRpb25cIixcInByb3BlcnR5XCI6XCJtYXJnaW4tcmlnaHRcIixcInZhbHVlXCI6XCIxNlwifSx7XCJ0eXBlXCI6XCJkZWNsYXJhdGlvblwiLFwicHJvcGVydHlcIjpcIm9wYWNpdHlcIixcInZhbHVlXCI6XCIwLjVcIn1dfSx7XCJ0eXBlXCI6XCJydWxlXCIsXCJzZWxlY3RvcnNcIjpbXCJUb29sQmFyQ29udGFpbmVkSXRlbVByZXNzZWRTdHlsZVwiXSxcImRlY2xhcmF0aW9uc1wiOlt7XCJ0eXBlXCI6XCJkZWNsYXJhdGlvblwiLFwicHJvcGVydHlcIjpcImNvbG9yXCIsXCJ2YWx1ZVwiOlwiIzI5ODdiZVwifV19LHtcInR5cGVcIjpcImNvbW1lbnRcIixcImNvbW1lbnRcIjpcIlxcblRoaXMgc3R5bGUgd2lsbCBhcHBseSB0byBhbGwgbm9uLWNsaWNrYWJsZSB0b29sYmFyIGl0ZW1zIChsYWJlbHMpIGJ5IGRlZmF1bHQuXFxuXCJ9LHtcInR5cGVcIjpcInJ1bGVcIixcInNlbGVjdG9yc1wiOltcIlRvb2xCYXJMYWJlbFN0eWxlXCJdLFwiZGVjbGFyYXRpb25zXCI6W3tcInR5cGVcIjpcImRlY2xhcmF0aW9uXCIsXCJwcm9wZXJ0eVwiOlwiY29sb3JcIixcInZhbHVlXCI6XCIjMzMzMzMzXCJ9LHtcInR5cGVcIjpcImRlY2xhcmF0aW9uXCIsXCJwcm9wZXJ0eVwiOlwiZm9udC1mYW1pbHlcIixcInZhbHVlXCI6XCJcXFwiZjcyX3JlZ3VsYXJcXFwiLCBcXFwiZjcyX2JvbGRcXFwiLCBcXFwiZjcyX2l0YWxpY1xcXCIsIFxcXCJmNzJfYm9sZF9pdGFsaWNcXFwiXCJ9LHtcInR5cGVcIjpcImRlY2xhcmF0aW9uXCIsXCJwcm9wZXJ0eVwiOlwiZm9udC1zaXplXCIsXCJ2YWx1ZVwiOlwiMTZzcFwifSx7XCJ0eXBlXCI6XCJkZWNsYXJhdGlvblwiLFwicHJvcGVydHlcIjpcImJvcmRlci1yYWRpdXNcIixcInZhbHVlXCI6XCI0XCJ9XX0se1widHlwZVwiOlwicnVsZVwiLFwic2VsZWN0b3JzXCI6W1wiQnV0dG9uXCJdLFwiZGVjbGFyYXRpb25zXCI6W3tcInR5cGVcIjpcImRlY2xhcmF0aW9uXCIsXCJwcm9wZXJ0eVwiOlwiY29sb3JcIixcInZhbHVlXCI6XCIjMGE2ZWQxXCJ9XX0se1widHlwZVwiOlwicnVsZVwiLFwic2VsZWN0b3JzXCI6W1wiVGFiU3RyaXBcIl0sXCJkZWNsYXJhdGlvbnNcIjpbe1widHlwZVwiOlwiZGVjbGFyYXRpb25cIixcInByb3BlcnR5XCI6XCJiYWNrZ3JvdW5kLWNvbG9yXCIsXCJ2YWx1ZVwiOlwiI2ZmZmZmZlwifSx7XCJ0eXBlXCI6XCJkZWNsYXJhdGlvblwiLFwicHJvcGVydHlcIjpcImJvcmRlci10b3AtY29sb3JcIixcInZhbHVlXCI6XCIjZWVlZWVmXCJ9LHtcInR5cGVcIjpcImRlY2xhcmF0aW9uXCIsXCJwcm9wZXJ0eVwiOlwiYm9yZGVyLXRvcC13aWR0aFwiLFwidmFsdWVcIjpcIjFcIn0se1widHlwZVwiOlwiZGVjbGFyYXRpb25cIixcInByb3BlcnR5XCI6XCJzZWxlY3RlZC1pdGVtLWNvbG9yXCIsXCJ2YWx1ZVwiOlwiIzBBNkVEMVwifSx7XCJ0eXBlXCI6XCJkZWNsYXJhdGlvblwiLFwicHJvcGVydHlcIjpcInVuLXNlbGVjdGVkLWl0ZW0tY29sb3JcIixcInZhbHVlXCI6XCIjNkE2RDcwXCJ9XX0se1widHlwZVwiOlwicnVsZVwiLFwic2VsZWN0b3JzXCI6W1wiLnNhcC1pY29uc1wiXSxcImRlY2xhcmF0aW9uc1wiOlt7XCJ0eXBlXCI6XCJkZWNsYXJhdGlvblwiLFwicHJvcGVydHlcIjpcImZvbnQtZmFtaWx5XCIsXCJ2YWx1ZVwiOlwiXFxcIlNBUC1pY29uc1xcXCJcIn0se1widHlwZVwiOlwiZGVjbGFyYXRpb25cIixcInByb3BlcnR5XCI6XCJmb250LXdlaWdodFwiLFwidmFsdWVcIjpcIjkwMFwifV19LHtcInR5cGVcIjpcInJ1bGVcIixcInNlbGVjdG9yc1wiOltcIi5zYXAtaWNvbnMtYWN0aW9uYmFyLXgtc21hbGxcIl0sXCJkZWNsYXJhdGlvbnNcIjpbe1widHlwZVwiOlwiZGVjbGFyYXRpb25cIixcInByb3BlcnR5XCI6XCJmb250LWZhbWlseVwiLFwidmFsdWVcIjpcIlxcXCJTQVAtaWNvbnNcXFwiXCJ9LHtcInR5cGVcIjpcImRlY2xhcmF0aW9uXCIsXCJwcm9wZXJ0eVwiOlwiZm9udC13ZWlnaHRcIixcInZhbHVlXCI6XCI5MDBcIn0se1widHlwZVwiOlwiZGVjbGFyYXRpb25cIixcInByb3BlcnR5XCI6XCJmb250LXNpemVcIixcInZhbHVlXCI6XCI2XCJ9LHtcInR5cGVcIjpcImRlY2xhcmF0aW9uXCIsXCJwcm9wZXJ0eVwiOlwiY29sb3JcIixcInZhbHVlXCI6XCJ3aGl0ZVwifV19LHtcInR5cGVcIjpcInJ1bGVcIixcInNlbGVjdG9yc1wiOltcIi5zYXAtaWNvbnMtYWN0aW9uYmFyLXNtYWxsXCJdLFwiZGVjbGFyYXRpb25zXCI6W3tcInR5cGVcIjpcImRlY2xhcmF0aW9uXCIsXCJwcm9wZXJ0eVwiOlwiZm9udC1mYW1pbHlcIixcInZhbHVlXCI6XCJcXFwiU0FQLWljb25zXFxcIlwifSx7XCJ0eXBlXCI6XCJkZWNsYXJhdGlvblwiLFwicHJvcGVydHlcIjpcImZvbnQtd2VpZ2h0XCIsXCJ2YWx1ZVwiOlwiOTAwXCJ9LHtcInR5cGVcIjpcImRlY2xhcmF0aW9uXCIsXCJwcm9wZXJ0eVwiOlwiZm9udC1zaXplXCIsXCJ2YWx1ZVwiOlwiOFwifSx7XCJ0eXBlXCI6XCJkZWNsYXJhdGlvblwiLFwicHJvcGVydHlcIjpcImNvbG9yXCIsXCJ2YWx1ZVwiOlwid2hpdGVcIn1dfSx7XCJ0eXBlXCI6XCJydWxlXCIsXCJzZWxlY3RvcnNcIjpbXCIuc2FwLWljb25zLWFjdGlvbmJhci1tZWRpdW1cIl0sXCJkZWNsYXJhdGlvbnNcIjpbe1widHlwZVwiOlwiZGVjbGFyYXRpb25cIixcInByb3BlcnR5XCI6XCJmb250LWZhbWlseVwiLFwidmFsdWVcIjpcIlxcXCJTQVAtaWNvbnNcXFwiXCJ9LHtcInR5cGVcIjpcImRlY2xhcmF0aW9uXCIsXCJwcm9wZXJ0eVwiOlwiZm9udC13ZWlnaHRcIixcInZhbHVlXCI6XCI5MDBcIn0se1widHlwZVwiOlwiZGVjbGFyYXRpb25cIixcInByb3BlcnR5XCI6XCJmb250LXNpemVcIixcInZhbHVlXCI6XCIxMFwifSx7XCJ0eXBlXCI6XCJkZWNsYXJhdGlvblwiLFwicHJvcGVydHlcIjpcImNvbG9yXCIsXCJ2YWx1ZVwiOlwid2hpdGVcIn1dfSx7XCJ0eXBlXCI6XCJydWxlXCIsXCJzZWxlY3RvcnNcIjpbXCIuZHJhd2VyQ29udGVudFwiXSxcImRlY2xhcmF0aW9uc1wiOlt7XCJ0eXBlXCI6XCJkZWNsYXJhdGlvblwiLFwicHJvcGVydHlcIjpcImJhY2tncm91bmQtY29sb3JcIixcInZhbHVlXCI6XCIjZmZmZmZmXCJ9XX0se1widHlwZVwiOlwicnVsZVwiLFwic2VsZWN0b3JzXCI6W1wiLnNpZGVkcmF3ZXItaGVhZGVyXCJdLFwiZGVjbGFyYXRpb25zXCI6W3tcInR5cGVcIjpcImRlY2xhcmF0aW9uXCIsXCJwcm9wZXJ0eVwiOlwiaGVpZ2h0XCIsXCJ2YWx1ZVwiOlwiYXV0b1wifSx7XCJ0eXBlXCI6XCJkZWNsYXJhdGlvblwiLFwicHJvcGVydHlcIjpcInBhZGRpbmdcIixcInZhbHVlXCI6XCIxNVwifSx7XCJ0eXBlXCI6XCJkZWNsYXJhdGlvblwiLFwicHJvcGVydHlcIjpcImJvcmRlci1ib3R0b20td2lkdGhcIixcInZhbHVlXCI6XCIwLjVcIn0se1widHlwZVwiOlwiZGVjbGFyYXRpb25cIixcInByb3BlcnR5XCI6XCJib3JkZXItYm90dG9tLWNvbG9yXCIsXCJ2YWx1ZVwiOlwicmdiKDEwNCwgMTAzLCAxMDMpXCJ9XX0se1widHlwZVwiOlwicnVsZVwiLFwic2VsZWN0b3JzXCI6W1wiLnNpZGVkcmF3ZXItaGVhZGVyLWljb25cIl0sXCJkZWNsYXJhdGlvbnNcIjpbe1widHlwZVwiOlwiZGVjbGFyYXRpb25cIixcInByb3BlcnR5XCI6XCJ3aWR0aFwiLFwidmFsdWVcIjpcIjIwJVwifSx7XCJ0eXBlXCI6XCJkZWNsYXJhdGlvblwiLFwicHJvcGVydHlcIjpcIm1hcmdpbi1ib3R0b21cIixcInZhbHVlXCI6XCIyMFwifV19LHtcInR5cGVcIjpcInJ1bGVcIixcInNlbGVjdG9yc1wiOltcIi5zaWRlZHJhd2VyLWhlYWRlci1pY29uLmx0clwiXSxcImRlY2xhcmF0aW9uc1wiOlt7XCJ0eXBlXCI6XCJkZWNsYXJhdGlvblwiLFwicHJvcGVydHlcIjpcImhvcml6b250YWwtYWxpZ25cIixcInZhbHVlXCI6XCJsZWZ0XCJ9XX0se1widHlwZVwiOlwicnVsZVwiLFwic2VsZWN0b3JzXCI6W1wiLnNpZGVkcmF3ZXItaGVhZGVyLWljb24ucnRsXCJdLFwiZGVjbGFyYXRpb25zXCI6W3tcInR5cGVcIjpcImRlY2xhcmF0aW9uXCIsXCJwcm9wZXJ0eVwiOlwiaG9yaXpvbnRhbC1hbGlnblwiLFwidmFsdWVcIjpcInJpZ2h0XCJ9XX0se1widHlwZVwiOlwicnVsZVwiLFwic2VsZWN0b3JzXCI6W1wiLnNpZGVkcmF3ZXItaGVhZGVyLWhlYWRsaW5lXCJdLFwiZGVjbGFyYXRpb25zXCI6W3tcInR5cGVcIjpcImRlY2xhcmF0aW9uXCIsXCJwcm9wZXJ0eVwiOlwiZm9udC1zaXplXCIsXCJ2YWx1ZVwiOlwiMjBcIn0se1widHlwZVwiOlwiZGVjbGFyYXRpb25cIixcInByb3BlcnR5XCI6XCJmb250LXdlaWdodFwiLFwidmFsdWVcIjpcImJvbGRcIn0se1widHlwZVwiOlwiZGVjbGFyYXRpb25cIixcInByb3BlcnR5XCI6XCJjb2xvclwiLFwidmFsdWVcIjpcImJsYWNrXCJ9XX0se1widHlwZVwiOlwicnVsZVwiLFwic2VsZWN0b3JzXCI6W1wiLnNpZGVkcmF3ZXItaGVhZGVyLXN1YmhlYWRsaW5lXCJdLFwiZGVjbGFyYXRpb25zXCI6W3tcInR5cGVcIjpcImRlY2xhcmF0aW9uXCIsXCJwcm9wZXJ0eVwiOlwiZm9udC1zaXplXCIsXCJ2YWx1ZVwiOlwiMTZcIn0se1widHlwZVwiOlwiZGVjbGFyYXRpb25cIixcInByb3BlcnR5XCI6XCJmb250LXdlaWdodFwiLFwidmFsdWVcIjpcIjUwMFwifV19LHtcInR5cGVcIjpcInJ1bGVcIixcInNlbGVjdG9yc1wiOltcIi5zaWRlZHJhd2VyLXNlY3Rpb25cIl0sXCJkZWNsYXJhdGlvbnNcIjpbe1widHlwZVwiOlwiZGVjbGFyYXRpb25cIixcInByb3BlcnR5XCI6XCJwYWRkaW5nLWJvdHRvbVwiLFwidmFsdWVcIjpcIjEwXCJ9XX0se1widHlwZVwiOlwicnVsZVwiLFwic2VsZWN0b3JzXCI6W1wiLnNpZGVkcmF3ZXItc2VjdGlvbi1zZXBhcmF0b3JcIl0sXCJkZWNsYXJhdGlvbnNcIjpbe1widHlwZVwiOlwiZGVjbGFyYXRpb25cIixcInByb3BlcnR5XCI6XCJib3JkZXItYm90dG9tLXdpZHRoXCIsXCJ2YWx1ZVwiOlwiMC41XCJ9LHtcInR5cGVcIjpcImRlY2xhcmF0aW9uXCIsXCJwcm9wZXJ0eVwiOlwiYm9yZGVyLWJvdHRvbS1jb2xvclwiLFwidmFsdWVcIjpcInJnYigxMDQsIDEwMywgMTAzKVwifV19LHtcInR5cGVcIjpcInJ1bGVcIixcInNlbGVjdG9yc1wiOltcIi5zaWRlZHJhd2VyLXNlY3Rpb24tY2FwdGlvblwiXSxcImRlY2xhcmF0aW9uc1wiOlt7XCJ0eXBlXCI6XCJkZWNsYXJhdGlvblwiLFwicHJvcGVydHlcIjpcInBhZGRpbmctYm90dG9tXCIsXCJ2YWx1ZVwiOlwiNVwifSx7XCJ0eXBlXCI6XCJkZWNsYXJhdGlvblwiLFwicHJvcGVydHlcIjpcInBhZGRpbmctdG9wXCIsXCJ2YWx1ZVwiOlwiNVwifSx7XCJ0eXBlXCI6XCJkZWNsYXJhdGlvblwiLFwicHJvcGVydHlcIjpcImhlaWdodFwiLFwidmFsdWVcIjpcIjQwXCJ9LHtcInR5cGVcIjpcImRlY2xhcmF0aW9uXCIsXCJwcm9wZXJ0eVwiOlwiZm9udC1zaXplXCIsXCJ2YWx1ZVwiOlwiMTZcIn0se1widHlwZVwiOlwiZGVjbGFyYXRpb25cIixcInByb3BlcnR5XCI6XCJmb250LXdlaWdodFwiLFwidmFsdWVcIjpcIjUwMFwifSx7XCJ0eXBlXCI6XCJkZWNsYXJhdGlvblwiLFwicHJvcGVydHlcIjpcImNvbG9yXCIsXCJ2YWx1ZVwiOlwicmdiKDEwNCwgMTAzLCAxMDMpXCJ9LHtcInR5cGVcIjpcImRlY2xhcmF0aW9uXCIsXCJwcm9wZXJ0eVwiOlwicGFkZGluZy10b3BcIixcInZhbHVlXCI6XCI5XCJ9XX0se1widHlwZVwiOlwicnVsZVwiLFwic2VsZWN0b3JzXCI6W1wiLnNpZGVkcmF3ZXItc2VjdGlvbi1jYXB0aW9uLmx0clwiXSxcImRlY2xhcmF0aW9uc1wiOlt7XCJ0eXBlXCI6XCJkZWNsYXJhdGlvblwiLFwicHJvcGVydHlcIjpcInBhZGRpbmctbGVmdFwiLFwidmFsdWVcIjpcIjE1XCJ9XX0se1widHlwZVwiOlwicnVsZVwiLFwic2VsZWN0b3JzXCI6W1wiLnNpZGVkcmF3ZXItc2VjdGlvbi1jYXB0aW9uLnJ0bFwiXSxcImRlY2xhcmF0aW9uc1wiOlt7XCJ0eXBlXCI6XCJkZWNsYXJhdGlvblwiLFwicHJvcGVydHlcIjpcInBhZGRpbmctcmlnaHRcIixcInZhbHVlXCI6XCIxNVwifV19LHtcInR5cGVcIjpcInJ1bGVcIixcInNlbGVjdG9yc1wiOltcIi5zaWRlZHJhd2VyLWxpc3QtaXRlbVwiXSxcImRlY2xhcmF0aW9uc1wiOlt7XCJ0eXBlXCI6XCJkZWNsYXJhdGlvblwiLFwicHJvcGVydHlcIjpcImNvbG9yXCIsXCJ2YWx1ZVwiOlwiYmxhY2tcIn0se1widHlwZVwiOlwiZGVjbGFyYXRpb25cIixcInByb3BlcnR5XCI6XCJwYWRkaW5nLWxlZnRcIixcInZhbHVlXCI6XCIyMFwifSx7XCJ0eXBlXCI6XCJkZWNsYXJhdGlvblwiLFwicHJvcGVydHlcIjpcInBhZGRpbmctcmlnaHRcIixcInZhbHVlXCI6XCIxMFwifV19LHtcInR5cGVcIjpcInJ1bGVcIixcInNlbGVjdG9yc1wiOltcIi5zaWRlZHJhd2VyLWxpc3QtaXRlbS1hY3RpdmVcIl0sXCJkZWNsYXJhdGlvbnNcIjpbe1widHlwZVwiOlwiZGVjbGFyYXRpb25cIixcInByb3BlcnR5XCI6XCJwYWRkaW5nLWxlZnRcIixcInZhbHVlXCI6XCIyMFwifSx7XCJ0eXBlXCI6XCJkZWNsYXJhdGlvblwiLFwicHJvcGVydHlcIjpcInBhZGRpbmctcmlnaHRcIixcInZhbHVlXCI6XCIxMFwifSx7XCJ0eXBlXCI6XCJkZWNsYXJhdGlvblwiLFwicHJvcGVydHlcIjpcImNvbG9yXCIsXCJ2YWx1ZVwiOlwid2hpdGVcIn0se1widHlwZVwiOlwiZGVjbGFyYXRpb25cIixcInByb3BlcnR5XCI6XCJiYWNrZ3JvdW5kLWNvbG9yXCIsXCJ2YWx1ZVwiOlwiIzBBNkVEMVwifV19LHtcInR5cGVcIjpcInJ1bGVcIixcInNlbGVjdG9yc1wiOltcIi5zaWRlZHJhd2VyLWxpc3QtaXRlbS1vbnByZXNzXCJdLFwiZGVjbGFyYXRpb25zXCI6W3tcInR5cGVcIjpcImRlY2xhcmF0aW9uXCIsXCJwcm9wZXJ0eVwiOlwiYmFja2dyb3VuZC1jb2xvclwiLFwidmFsdWVcIjpcInJnYigyMzUsIDIzMSwgMjMxKVwifSx7XCJ0eXBlXCI6XCJkZWNsYXJhdGlvblwiLFwicHJvcGVydHlcIjpcImNvbG9yXCIsXCJ2YWx1ZVwiOlwiYmxhY2tcIn0se1widHlwZVwiOlwiZGVjbGFyYXRpb25cIixcInByb3BlcnR5XCI6XCJwYWRkaW5nLWxlZnRcIixcInZhbHVlXCI6XCIyMFwifSx7XCJ0eXBlXCI6XCJkZWNsYXJhdGlvblwiLFwicHJvcGVydHlcIjpcInBhZGRpbmctcmlnaHRcIixcInZhbHVlXCI6XCIxMFwifV19LHtcInR5cGVcIjpcInJ1bGVcIixcInNlbGVjdG9yc1wiOltcIi5zaWRlZHJhd2VyLWxpc3QtaXRlbS1pY29uXCJdLFwiZGVjbGFyYXRpb25zXCI6W3tcInR5cGVcIjpcImRlY2xhcmF0aW9uXCIsXCJwcm9wZXJ0eVwiOlwiaGVpZ2h0XCIsXCJ2YWx1ZVwiOlwiMjRcIn0se1widHlwZVwiOlwiZGVjbGFyYXRpb25cIixcInByb3BlcnR5XCI6XCJ3aWR0aFwiLFwidmFsdWVcIjpcIjEwJVwifSx7XCJ0eXBlXCI6XCJkZWNsYXJhdGlvblwiLFwicHJvcGVydHlcIjpcIm1hcmdpbi1yaWdodFwiLFwidmFsdWVcIjpcIjIwXCJ9XX0se1widHlwZVwiOlwicnVsZVwiLFwic2VsZWN0b3JzXCI6W1wiLnNpZGVkcmF3ZXItbGlzdC1pdGVtLXRpdGxlXCJdLFwiZGVjbGFyYXRpb25zXCI6W3tcInR5cGVcIjpcImRlY2xhcmF0aW9uXCIsXCJwcm9wZXJ0eVwiOlwiZm9udC1zaXplXCIsXCJ2YWx1ZVwiOlwiMTZcIn0se1widHlwZVwiOlwiZGVjbGFyYXRpb25cIixcInByb3BlcnR5XCI6XCJoZWlnaHRcIixcInZhbHVlXCI6XCI0MFwifSx7XCJ0eXBlXCI6XCJkZWNsYXJhdGlvblwiLFwicHJvcGVydHlcIjpcImZvbnQtd2VpZ2h0XCIsXCJ2YWx1ZVwiOlwiNTAwXCJ9LHtcInR5cGVcIjpcImRlY2xhcmF0aW9uXCIsXCJwcm9wZXJ0eVwiOlwicGFkZGluZy10b3BcIixcInZhbHVlXCI6XCI5XCJ9XX1dLFwicGFyc2luZ0Vycm9yc1wiOltdfX07OyBcbmlmIChtb2R1bGUuaG90ICYmIGdsb2JhbC5faXNNb2R1bGVMb2FkZWRGb3JVSSAmJiBnbG9iYWwuX2lzTW9kdWxlTG9hZGVkRm9yVUkoXCIuL2FwcC5jc3NcIikgKSB7XG4gICAgXG4gICAgbW9kdWxlLmhvdC5hY2NlcHQoKTtcbiAgICBtb2R1bGUuaG90LmRpc3Bvc2UoKCkgPT4ge1xuICAgICAgICBnbG9iYWwuaG1yUmVmcmVzaCh7IHR5cGU6IFwic3R5bGVcIiwgcGF0aDogXCIuL2FwcC5jc3NcIiB9KTtcbiAgICB9KTtcbn0gIiwiXG5pbXBvcnQgKiBhcyBhcHBsaWNhdGlvbiBmcm9tICd0bnMtY29yZS1tb2R1bGVzL2FwcGxpY2F0aW9uJztcbmltcG9ydCB7IGNhdGVnb3JpZXMsIGVuYWJsZSwgc2V0Q2F0ZWdvcmllcywgY2xlYXJXcml0ZXJzLCBhZGRXcml0ZXIgfSBmcm9tICd0bnMtY29yZS1tb2R1bGVzL3RyYWNlJztcbmltcG9ydCB7IEFwcGxpY2F0aW9uIGFzIEFwcGxpY2F0aW9uQnJpZGdlIH0gZnJvbSAnbWRrLWNvcmUvQXBwbGljYXRpb24nO1xuaW1wb3J0IHsgQXBwbGljYXRpb24gfSBmcm9tICcuL0FwcGxpY2F0aW9uJztcbmltcG9ydCB7IExpZmVjeWNsZU1hbmFnZXIgYXMgTGlmZWN5Y2xlTWFuYWdlckJyaWRnZSB9IGZyb20gJ21kay1jb3JlL2xpZmVjeWNsZU1hbmFnZW1lbnQvTGlmZWN5Y2xlTWFuYWdlcic7XG5pbXBvcnQgeyBMaWZlY3ljbGVNYW5hZ2VyIH0gZnJvbSAnLi9saWZlY3ljbGVNYW5hZ2VtZW50L0xpZmVjeWNsZU1hbmFnZXInO1xuaW1wb3J0IHsgUGF0aHMgYXMgUGF0aHNCcmlkZ2UgfSBmcm9tICdtZGstY29yZS9zdG9yYWdlL1BhdGhzJztcbmltcG9ydCB7IFBhdGhzIH0gZnJvbSAnLi9zdG9yYWdlL1BhdGhzJztcbmltcG9ydCB7IEN1c3RvbUV2ZW50SGFuZGxlciB9IGZyb20gJy4vQXBwX0RlbGVnYXRlcy9DdXN0b21FdmVudEhhbmRsZXInO1xuaW1wb3J0IHsgQ2xpZW50U2V0dGluZ3MgfSBmcm9tICdtZGstY29yZS9zdG9yYWdlL0NsaWVudFNldHRpbmdzJztcbmltcG9ydCB7IERlbW9CdW5kbGVEZWZpbml0aW9uTG9hZGVyIGFzIERlbW9CdW5kbGVEZWZpbml0aW9uTG9hZGVyQnJpZGdlIH1cbiAgZnJvbSAnbWRrLWNvcmUvZGVmaW5pdGlvbnMvRGVtb0J1bmRsZURlZmluaXRpb25Mb2FkZXInO1xuaW1wb3J0IHsgRGVtb0J1bmRsZURlZmluaXRpb25Mb2FkZXIgfSBmcm9tICcuL2RlZmluaXRpb25zL0RlbW9CdW5kbGVEZWZpbml0aW9uTG9hZGVyJztcbmltcG9ydCB7IFJlcXVpcmVVdGlsIH0gZnJvbSAnbWRrLWNvcmUvdXRpbHMvUmVxdWlyZVV0aWwnO1xuaW1wb3J0IHsgQ29uc29sZVdyaXRlciB9IGZyb20gJ21kay1jb3JlL3V0aWxzL0NvbnNvbGVXcml0ZXInO1xuXG5BcHBsaWNhdGlvbkJyaWRnZS5zZXRBcHBsaWNhdGlvbihBcHBsaWNhdGlvbik7XG5MaWZlY3ljbGVNYW5hZ2VyQnJpZGdlLnNldEluc3RhbmNlKExpZmVjeWNsZU1hbmFnZXIuZ2V0SW5zdGFuY2UoKSk7XG5QYXRoc0JyaWRnZS5zZXRDbGFzcyhQYXRocyk7XG5EZW1vQnVuZGxlRGVmaW5pdGlvbkxvYWRlckJyaWRnZS5zZXRMb2FkZXIoRGVtb0J1bmRsZURlZmluaXRpb25Mb2FkZXIpO1xuXG5SZXF1aXJlVXRpbC5zZXRSZXF1aXJlKGdsb2JhbC5sb2FkTW9kdWxlKTtcbi8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1zdHJpbmctbGl0ZXJhbFxuZ2xvYmFsWydtZGtSZXF1aXJlJ10gPSBSZXF1aXJlVXRpbC5yZXF1aXJlO1xuXG5pZiAoQ2xpZW50U2V0dGluZ3MuZ2V0VHJhY2luZ0VuYWJsZWQoKSkge1xuICBsZXQgdHJhY2VDYXRlZ29yaWVzOiBzdHJpbmcgPSAnJztcbiAgQ2xpZW50U2V0dGluZ3MuZ2V0VHJhY2luZ0NhdGVnb3JpZXMoKS5mb3JFYWNoKGNhdGVnb3J5ID0+IHtcbiAgICB0cmFjZUNhdGVnb3JpZXMgPSBjYXRlZ29yaWVzLmNvbmNhdCh0cmFjZUNhdGVnb3JpZXMsIGNhdGVnb3J5KTtcbiAgfSk7XG4gIGVuYWJsZSgpO1xuICBzZXRDYXRlZ29yaWVzKHRyYWNlQ2F0ZWdvcmllcyk7XG4gIGNsZWFyV3JpdGVycygpO1xuICBhZGRXcml0ZXIobmV3IENvbnNvbGVXcml0ZXIodHJhY2VDYXRlZ29yaWVzKSk7XG59XG5cbmlmIChhcHBsaWNhdGlvbi5pb3MpIHtcbiAgLy8gdHNsaW50OmRpc2FibGU6bm8tdmFyLXJlcXVpcmVzXG4gIGxldCBjdXN0b21BcHBEZWxlZ2F0ZSA9IHJlcXVpcmUoJy4vQXBwX0RlbGVnYXRlcy9DdXN0b21BcHBEZWxlZ2F0ZScpO1xuICBhcHBsaWNhdGlvbi5pb3MuZGVsZWdhdGUgPSBjdXN0b21BcHBEZWxlZ2F0ZS5DdXN0b21BcHBEZWxlZ2F0ZTtcbn0gZWxzZSBpZiAoYXBwbGljYXRpb24uYW5kcm9pZCkge1xuICBsZXQgY3VzdEhhbmRlciA9IG5ldyBDdXN0b21FdmVudEhhbmRsZXIoKTtcblxuICAvLyBhcHAgbGlmZWN5Y2xlIGV2ZW50c1xuICBhcHBsaWNhdGlvbi5vbihhcHBsaWNhdGlvbi5sYXVuY2hFdmVudCwgKGFyZ3MpID0+IGN1c3RIYW5kZXIub25BcHBMYXVuY2hlZChhcmdzKSk7XG5cbiAgLy8gYWN0aXZpdHkgbGlmZWN5Y2xlIGV2ZW50c1xuICBhcHBsaWNhdGlvbi5hbmRyb2lkLm9uKGFwcGxpY2F0aW9uLkFuZHJvaWRBcHBsaWNhdGlvbi5hY3Rpdml0eVJlc3VtZWRFdmVudCxcbiAgICAoYXJncykgPT4gY3VzdEhhbmRlci5vbkFjdGl2aXR5UmVzdW1lZChhcmdzKSk7XG4gIGFwcGxpY2F0aW9uLmFuZHJvaWQub24oYXBwbGljYXRpb24uQW5kcm9pZEFwcGxpY2F0aW9uLmFjdGl2aXR5UGF1c2VkRXZlbnQsXG4gICAgKGFyZ3MpID0+IGN1c3RIYW5kZXIub25BY3Rpdml0eVBhdXNlZChhcmdzKSk7XG5cbiAgLy8gQWN0aXZpdHkgcmVzdWx0IGV2ZW50LlxuICAvLyBDYWxsZWQgd2hlbiBhbiBhY3Rpdml0eSB5b3UgbGF1bmNoZWQgKGUuZy4gdGhlIFFSIGNvZGUgcmVhZGVyIGFjdGl2aXR5KSBleGl0cyxcbiAgLy8gZ2l2aW5nIHlvdSB0aGUgcmVxdWVzdENvZGUgeW91IHN0YXJ0ZWQgaXQgd2l0aCxcbiAgLy8gdGhlIHJlc3VsdENvZGUgaXQgcmV0dXJuZWQsIGFuZCBhbnkgYWRkaXRpb25hbCBkYXRhIGZyb20gaXQuXG4gIC8vIFRoZSByZXN1bHRDb2RlIHdpbGwgYmUgUkVTVUxUX0NBTkNFTEVEIGlmIHRoZSBhY3Rpdml0eSBleHBsaWNpdGx5IHJldHVybmVkIHRoYXQsXG4gIC8vIGRpZG4ndCByZXR1cm4gYW55IHJlc3VsdCwgb3IgY3Jhc2hlZCBkdXJpbmcgaXRzIG9wZXJhdGlvbi5cbiAgLy9cbiAgLy8gWW91IHdpbGwgcmVjZWl2ZSB0aGlzIGNhbGwgaW1tZWRpYXRlbHkgYmVmb3JlIG9uUmVzdW1lKCkgd2hlbiB5b3VyIGFjdGl2aXR5IGlzIHJlLXN0YXJ0aW5nLlxuICAvL1xuICAvLyBUaGlzIG1ldGhvZCBpcyBuZXZlciBpbnZva2VkIGlmIHlvdXIgYWN0aXZpdHkgc2V0cyBub0hpc3RvcnkgdG8gdHJ1ZS5cblxuICBhcHBsaWNhdGlvbi5hbmRyb2lkLm9uKGFwcGxpY2F0aW9uLkFuZHJvaWRBcHBsaWNhdGlvbi5hY3Rpdml0eVJlc3VsdEV2ZW50LFxuICAgIChhcmdzKSA9PiBjdXN0SGFuZGVyLm9uQWN0aXZpdHlSZXN1bHQoYXJncykpO1xufVxuXG4vLyBsb2FkIHRoZSBjc3MgaGVyZSBzbyB0aGV5IGFyZSBhdmFpbGFibGUgaW4gZGVtbyBtb2RlXG5hcHBsaWNhdGlvbi5sb2FkQXBwQ3NzKCk7XG5BcHBsaWNhdGlvbi5zdGFydCgpLnRoZW4oKG5hdmlnYXRpb24pID0+IHtcbiAgYXBwbGljYXRpb24ucnVuKG5hdmlnYXRpb24pO1xufSk7XG4iLCJpbXBvcnQgeyBJRGVmaW5pdGlvbkxvYWRlciB9IGZyb20gJ21kay1jb3JlL2RlZmluaXRpb25zL0lEZWZpbml0aW9uTG9hZGVyJztcbmltcG9ydCAqIGFzIGZzIGZyb20gJ3Rucy1jb3JlLW1vZHVsZXMvZmlsZS1zeXN0ZW0nO1xuaW1wb3J0ICogYXMgUGF0aFRvRXhwb3J0TmFtZSBmcm9tICdtZGstY29yZS9kZWZpbml0aW9ucy9QYXRoVG9FeHBvcnROYW1lJztcbmltcG9ydCB7IExvZ2dlciB9IGZyb20gJ21kay1jb3JlL3V0aWxzL0xvZ2dlcic7XG5cbmV4cG9ydCBjbGFzcyBCdW5kbGVEZWZpbml0aW9uTG9hZGVyIGltcGxlbWVudHMgSURlZmluaXRpb25Mb2FkZXIge1xuICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IEJVTkRMRV9QQVRIID0gZnMucGF0aC5qb2luKGZzLmtub3duRm9sZGVycy5jdXJyZW50QXBwKCkucGF0aCwgJ2J1bmRsZS5qcycpO1xuICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IERFRkFVTFRfQlVORExFX1BBVEggPSBmcy5wYXRoLmpvaW4oZnMua25vd25Gb2xkZXJzLmN1cnJlbnRBcHAoKS5wYXRoLCAnZGVmYXVsdC5qcycpO1xuXG4gIHB1YmxpYyBzdGF0aWMgYnVuZGxlRXhpc3QoYnVuZGxlUGF0aDogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIGZzLkZpbGUuZXhpc3RzKGJ1bmRsZVBhdGgpO1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyB2YWxpZExvY2F0aW9uRXhpc3RzKCkge1xuICAgIC8vIGNoZWNrIGZvciAnYnVuZGxlLmpzJyBvciAnZGVmYXVsdC5qcydcbiAgICAvLyAnZGVtby5qcycgaXMgbm90IHVzZWQgZm9yIExpdmUgbW9kZVxuICAgIHJldHVybiB0aGlzLmJ1bmRsZUV4aXN0KEJ1bmRsZURlZmluaXRpb25Mb2FkZXIuQlVORExFX1BBVEgpIHx8XG4gICAgdGhpcy5idW5kbGVFeGlzdChCdW5kbGVEZWZpbml0aW9uTG9hZGVyLkRFRkFVTFRfQlVORExFX1BBVEgpO1xuICB9XG5cbiAgcHJpdmF0ZSBtZGtBcHBsaWNhdGlvbiA9IHVuZGVmaW5lZDtcbiAgY29uc3RydWN0b3IocHJvdGVjdGVkIGJ1bmRsZVBhdGg6IHN0cmluZykge1xuICB9XG5cbiAgLyoqXG4gICAqIFRoaXMgbWV0aG9kIGlzIHRvIHJldHVybiBsaXN0IGxvY2FsaXphdGlvbiByZXNvdXJjZSBmaWxlcyBpbiBkZWZpbml0aW9uIGtleXMgdGhhdCBzdGFydHMgd2l0aCBfaTE4bl9cbiAgICogU2hvdWxkIG5vdCBpbmNsdWRlIHByb3BlcnRpZXMgZmlsZXMgZnJvbSBfZXh0ZW5zaW9uc18gZm9sZGVyXG4gICAqIFNhbXBsZTogX2kxOG5faTE4bl9kZV9wcm9wZXJ0aWVzLCBfaTE4bl9pMThuX2VuX2diX3Byb3BlcnRpZXMsIF9pMThuX2kxOG5fZW5fdXNfcHJvcGVydGllc1xuICAgKlxuICAgKi9cbiAgcHVibGljIGdldExvY2FsaXphdGlvblJlc291cmNlTGlzdCgpOiBhbnkge1xuICAgIGlmICh0aGlzLm1ka0FwcGxpY2F0aW9uKSB7XG4gICAgICAvLyBGaWx0ZXIgZm9yXG4gICAgICAvLyAtIGluY2x1ZGUgL2kxOG4vXG4gICAgICAvLyAtIC5wcm9wZXJ0aWVzIGlzIGJlaGluZCAvaTE4bi9cbiAgICAgIC8vIC0gZXhjbHVkZSAvRXh0ZW5zaW9ucy9cbiAgICAgIHJldHVybiBPYmplY3Qua2V5cyh0aGlzLm1ka0FwcGxpY2F0aW9uKVxuICAgICAgLmZpbHRlcihrZXkgPT4ga2V5LmluZGV4T2YoJ19pMThuXycpID49IDAgJiYga2V5LmluZGV4T2YoJ19wcm9wZXJ0aWVzJykgPiBrZXkuaW5kZXhPZignX2kxOG5fJykgJiZcbiAgICAgICBrZXkuaW5kZXhPZignX2V4dGVuc2lvbnNfJykgPCAwKTtcbiAgICB9XG4gIH1cbiAgcHVibGljIGxvYWRKc29uRGVmaW5pdGlvbihzUGF0aCkge1xuICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUodGhpcy5sb2FkRGVmaW5pdGlvbihzUGF0aCkpO1xuICB9XG4gIHB1YmxpYyBsb2FkSnNEZWZpbml0aW9uKHNQYXRoKSB7XG4gICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSh0aGlzLmxvYWREZWZpbml0aW9uKHNQYXRoKSk7XG4gIH1cbiAgcHVibGljIGxvYWREZWZpbml0aW9uKHNBcHBsaWNhdGlvblJlZmVyZW5jZSkge1xuICAgIGlmICghc0FwcGxpY2F0aW9uUmVmZXJlbmNlKSB7XG4gICAgICAvLyBUaGV5IGp1c3Qgd2FudCB0aGUgQXBwbGljYXRpb24uYXBwIGRlZmludGlvblxuICAgICAgc0FwcGxpY2F0aW9uUmVmZXJlbmNlID0gJy4vQXBwbGljYXRpb24uYXBwJztcbiAgICB9XG4gICAgY29uc3Qgc05hbWUgPSBQYXRoVG9FeHBvcnROYW1lLnBhdGhUb0V4cG9ydE5hbWUoc0FwcGxpY2F0aW9uUmVmZXJlbmNlLFxuICAgICAgdGhpcy5tZGtBcHBsaWNhdGlvbi52ZXJzaW9uX21ka2J1bmRsZXJ2ZXJzaW9uKTtcbiAgICByZXR1cm4gdGhpcy5tZGtBcHBsaWNhdGlvbltzTmFtZV07XG4gIH1cblxuICAvLyBsb2FkcyB0aGUgZ2l2ZW4gYnVuZGxlLCByZXBsYWNpbmcgdGhlIGV4aXN0aW5nIGRlZmluaXRpb25zLlxuICAvLyBpdCBpcyBpbXBvcnRhbnQgdG8gbm90ZSB0aGF0IHJlbG9hZGluZyB0aGUgc2FtZSBidW5kbGUgZmlsZSB3aWxsXG4gIC8vIG5vdCBsb2FkIGFueSBuZXcgZGVmaW5pdGlvbnMsIGV2ZW4gaWYgdGhlIGZpbGUgaXRzZWxmIGhhcyBjaGFuZ2VkLlxuICAvLyBhbnkgbmV3IGRlZmluaXRpb25zIHdpbGwgbmVlZCB0byBiZSBwdXQgaW50byBhIGZpbGUgdGhhdCBoYXMgbm90IGJlZW5cbiAgLy8gcmVxdWlyZSgpZCBiZWZvcmUgaW4gb3JkZXIgZm9yIHRoZW0gdG8gbG9hZCBpbiBhbiBydW5uaW5nIGFwcC5cbiAgLy8gc2lkZSBub3RlOiB0aGUgb2xkIGRlZmluaXRpb25zIHdpbGwgdGFrZSB1cCBzcGFjZSBpbiBtZW1vcnkgZHVlIHRvIGhvd1xuICAvLyB0aGUgamF2YXNjcmlwdCBlbmdpbmUgd29ya3MsIGFuZCB3aWxsIHN0YXkgdGhlcmUgdW50aWwgdGhlIGFwcCBpc1xuICAvLyByZXN0YXJ0ZWQuXG4gIHB1YmxpYyBsb2FkQnVuZGxlKCk6IFByb21pc2U8YW55PiB7XG4gICAgbGV0IHNvdXJjZUJ1bmRsZVBhdGg6IHN0cmluZztcbiAgICBsZXQgcGF0aHM6IHN0cmluZ1tdID0gW107XG5cbiAgICBpZiAodGhpcy5idW5kbGVQYXRoKSB7XG4gICAgICAvLyBBZGQgdGhlIGJ1bmRsZSBwYXRoIHRvIHRoZSBmcm9udCBvZiB0aGUgbGlzdFxuICAgICAgcGF0aHMucHVzaCh0aGlzLmJ1bmRsZVBhdGgpO1xuICAgIH1cbiAgICBwYXRocy5wdXNoKHRoaXMuZ2V0QnVuZGxlTG9jYXRpb24oKSk7XG4gICAgcGF0aHMucHVzaCh0aGlzLmdldERlZmF1bHRMb2NhdGlvbigpKTtcblxuICAgIGZvciAobGV0IHBhdGggb2YgcGF0aHMpIHtcbiAgICAgIGlmIChCdW5kbGVEZWZpbml0aW9uTG9hZGVyLmJ1bmRsZUV4aXN0KHBhdGgpKSB7XG4gICAgICAgIHNvdXJjZUJ1bmRsZVBhdGggPSBwYXRoO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoIXNvdXJjZUJ1bmRsZVBhdGgpIHtcbiAgICAgIExvZ2dlci5pbnN0YW5jZS5kZWZpbml0aW9uTG9hZGVyLmVycm9yKExvZ2dlci5ERUZJTklUSU9OTE9BREVSX0FQUExJQ0FUSU9OX0RFRklOSVRJT05TX05PVF9GT1VORCk7XG4gICAgICB0aGlzLm1ka0FwcGxpY2F0aW9uID0gW107XG4gICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XG4gICAgfVxuXG4gICAgTG9nZ2VyLmluc3RhbmNlLmRlZmluaXRpb25Mb2FkZXIubG9nKExvZ2dlci5ERUZJTklUSU9OTE9BREVSX0xPQURJTkdfREVGSU5JVElPTlMsIHNvdXJjZUJ1bmRsZVBhdGgpO1xuXG4gICAgdGhpcy5tZGtBcHBsaWNhdGlvbiA9IGdsb2JhbC5yZXF1aXJlKHNvdXJjZUJ1bmRsZVBhdGgpO1xuXG4gICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xuICB9XG5cbiAgcHJvdGVjdGVkIGdldEJ1bmRsZUxvY2F0aW9uKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIEJ1bmRsZURlZmluaXRpb25Mb2FkZXIuQlVORExFX1BBVEg7XG4gIH1cblxuICBwcm90ZWN0ZWQgZ2V0RGVmYXVsdExvY2F0aW9uKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIEJ1bmRsZURlZmluaXRpb25Mb2FkZXIuREVGQVVMVF9CVU5ETEVfUEFUSDtcbiAgfVxufVxuIiwiaW1wb3J0IHsgQnVuZGxlRGVmaW5pdGlvbkxvYWRlciB9IGZyb20gJy4vQnVuZGxlRGVmaW5pdGlvbkxvYWRlcic7XG5pbXBvcnQgKiBhcyBmcyBmcm9tICd0bnMtY29yZS1tb2R1bGVzL2ZpbGUtc3lzdGVtJztcblxuZXhwb3J0IGNsYXNzIERlbW9CdW5kbGVEZWZpbml0aW9uTG9hZGVyIGV4dGVuZHMgQnVuZGxlRGVmaW5pdGlvbkxvYWRlciB7XG4gIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgREVNT19CVU5ETEVfUEFUSCA9IGZzLnBhdGguam9pbihmcy5rbm93bkZvbGRlcnMuY3VycmVudEFwcCgpLnBhdGgsICdkZW1vLmpzJyk7XG5cbiAgcHVibGljIHN0YXRpYyB2YWxpZExvY2F0aW9uRXhpc3RzKCkge1xuICAgIC8vIG9ubHkgY2hlY2sgJ2RlbW8uanMnXG4gICAgLy8gJ2J1bmRsZS5qcycgYW5kICdkZWZhdWx0LmpzJyBhcmUgbm90IHVzZWQgd2hlbiBpbiBEZW1vIG1vZGVcbiAgICByZXR1cm4gQnVuZGxlRGVmaW5pdGlvbkxvYWRlci5idW5kbGVFeGlzdChEZW1vQnVuZGxlRGVmaW5pdGlvbkxvYWRlci5ERU1PX0JVTkRMRV9QQVRIKTtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKGJ1bmRsZVBhdGg6IHN0cmluZykge1xuICAgIHN1cGVyKGJ1bmRsZVBhdGgpO1xuICB9XG5cbiAgcHJvdGVjdGVkIGdldEJ1bmRsZUxvY2F0aW9uKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIERlbW9CdW5kbGVEZWZpbml0aW9uTG9hZGVyLkRFTU9fQlVORExFX1BBVEg7XG4gIH1cblxuICBwcm90ZWN0ZWQgZ2V0RGVmYXVsdExvY2F0aW9uKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHVuZGVmaW5lZDsgIC8vIEZvciBkZW1vIG1vZGUsIGRvIG5vdCB1c2UgJ2RlZmF1bHQuanMnXG4gIH1cbn1cbiIsImltcG9ydCB7IFppcCB9IGZyb20gJ3ppcC1wbHVnaW4nO1xuaW1wb3J0ICogYXMgZnMgZnJvbSAndG5zLWNvcmUtbW9kdWxlcy9maWxlLXN5c3RlbSc7XG5pbXBvcnQgeyBMb2dnZXIgfSBmcm9tICdtZGstY29yZS91dGlscy9Mb2dnZXInO1xuaW1wb3J0IHsgUmVxdWlyZVV0aWwgfSBmcm9tICdtZGstY29yZS91dGlscy9SZXF1aXJlVXRpbCc7XG5cbmV4cG9ydCBjbGFzcyBBcHBFeHRyYWN0SGVscGVyIHtcblxuICBwdWJsaWMgc3RhdGljIGdldEluc3RhbmNlKCk6IEFwcEV4dHJhY3RIZWxwZXIge1xuICAgIHJldHVybiBBcHBFeHRyYWN0SGVscGVyLl9pbnN0YW5jZTtcbiAgfVxuXG4gIHByaXZhdGUgc3RhdGljIF9pbnN0YW5jZTogQXBwRXh0cmFjdEhlbHBlciA9IG5ldyBBcHBFeHRyYWN0SGVscGVyKCk7XG4gIHByaXZhdGUgemlwRGVzdDogc3RyaW5nO1xuICBwcml2YXRlIHppcFNvdXJjZTogc3RyaW5nO1xuXG4gIHB1YmxpYyBleHRyYWN0KG1zZzogYW55KSB7XG4gICAgbGV0IGVycm9yO1xuICAgIHRoaXMuemlwU291cmNlID0gbXNnLmRhdGEuemlwU291cmNlO1xuICAgIHRoaXMuemlwRGVzdCA9IG1zZy5kYXRhLnppcERlc3RQYXRoO1xuICAgIGNvbnN0IGJ1bmRsZURlc3Q6IHN0cmluZyA9IG1zZy5kYXRhLmJ1bmRsZURlc3Q7XG4gICAgTG9nZ2VyLmluc3RhbmNlLmNvcmUuaW5mbygnVW56aXAgc3RhcnRlZDogZnJvbSAnICsgdGhpcy56aXBTb3VyY2UgKyAnIHRvICcgKyB0aGlzLnppcERlc3QpO1xuICAgIFppcC51bnppcCh0aGlzLnppcFNvdXJjZSwgdGhpcy56aXBEZXN0KTtcblxuICAgICAgICAvLyBNb3ZlIHRoZSBidW5kbGUgdG8gc3BlY2lmaWVkIHppcERlc3RQYXRcbiAgICBsZXQgYnVuZGxlU291cmNlUGF0aCA9IGZzLnBhdGguam9pbih0aGlzLnppcERlc3QsICdidW5kbGUuanMnKTtcbiAgICBlcnJvciA9IHRoaXMuX21vdmVCdW5kbGVGaWxlKGJ1bmRsZVNvdXJjZVBhdGgsIGJ1bmRsZURlc3QsIChzQ29udGVudHMpID0+IHtcbiAgICAgIHJldHVybiBSZXF1aXJlVXRpbC5yZXBsYWNlTWRrUmVxdWlyZShzQ29udGVudHMpO1xuICAgIH0pO1xuXG4gICAgaWYgKCFlcnJvcikge1xuICAgICAgICB0aGlzLl9tb3ZlQnVuZGxlRmlsZShmcy5wYXRoLmpvaW4odGhpcy56aXBEZXN0LCAnYnVuZGxlLmpzLm1hcCcpLCBidW5kbGVEZXN0ICsgJy5tYXAnKTtcbiAgICB9XG5cbiAgICByZXR1cm4gZXJyb3I7XG4gIH1cblxuICBwdWJsaWMgcmVtb3ZlRm9sZGVyKCkge1xuICAgIC8vIFJlbW92ZSBleHRyYWN0ZWQgZm9sZGVyXG4gICAgbGV0IGV4dHJhY3RlZFppcEZvbGRlciA9IGZzLkZvbGRlci5mcm9tUGF0aCh0aGlzLnppcERlc3QpO1xuICAgIGV4dHJhY3RlZFppcEZvbGRlci5yZW1vdmVTeW5jKGUgPT4ge1xuICAgICAgTG9nZ2VyLmluc3RhbmNlLmNvcmUuZXJyb3IoYEZhaWxlZCB0byByZW1vdmUgZXh0cmFjdGVkIHppcCBmb2xkZXI6ICR7ZX1gKTtcbiAgICB9KTtcbiAgfVxuXG4gIHB1YmxpYyByZW1vdmVEb3dubG9hZGVkWmlwRmlsZSgpIHtcbiAgICBsZXQgemlwU291cmNlRmlsZSA9IGZzLkZpbGUuZnJvbVBhdGgodGhpcy56aXBTb3VyY2UpO1xuICAgIHppcFNvdXJjZUZpbGUucmVtb3ZlU3luYyhlID0+IHtcbiAgICAgIExvZ2dlci5pbnN0YW5jZS5jb3JlLmVycm9yKGBGYWlsZWQgdG8gcmVtb3ZlIHRlbXAgZG93bmxvYWQgemlwOiAke2V9YCk7XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIF9tb3ZlQnVuZGxlRmlsZShidW5kbGVTb3VyY2VQYXRoLCBidW5kbGVEZXN0LCBjYj8pIHtcbiAgICBsZXQgZXJyb3I7XG4gICAgY29uc3QgYnVuZGxlRXhpc3RzID0gZnMuRmlsZS5leGlzdHMoYnVuZGxlU291cmNlUGF0aCk7XG4gICAgbGV0IGJ1bmRsZVNvdXJjZUZpbGU7XG4gICAgbGV0IGJ1bmRsZVNvdXJjZURhdGE6IHN0cmluZztcblxuICAgIGlmIChidW5kbGVFeGlzdHMpIHtcbiAgICAgICAgYnVuZGxlU291cmNlRmlsZSA9IGZzLkZpbGUuZnJvbVBhdGgoYnVuZGxlU291cmNlUGF0aCk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgZXJyb3IgPSBidW5kbGVTb3VyY2VQYXRoICsgJyBkb2VzIG5vdCBleGlzdCc7XG4gICAgfVxuXG4gICAgaWYgKCFlcnJvcikge1xuICAgICAgICBidW5kbGVTb3VyY2VEYXRhID0gYnVuZGxlU291cmNlRmlsZS5yZWFkVGV4dFN5bmMoZSA9PiB7XG4gICAgICAgICAgZXJyb3IgPSBlO1xuICAgICAgICAgIExvZ2dlci5pbnN0YW5jZS5jb3JlLmVycm9yKGBBcHAgZG93bmxvYWQgZmlsZSByZWFkIGZhaWxlZDogJHtlcnJvcn1gKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWYgKCFlcnJvcikge1xuICAgICAgICBpZiAoY2IpIHtcbiAgICAgICAgICAgIGJ1bmRsZVNvdXJjZURhdGEgPSBjYihidW5kbGVTb3VyY2VEYXRhKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBidW5kbGVEZXN0aEZpbGUgPSBmcy5GaWxlLmZyb21QYXRoKGJ1bmRsZURlc3QpO1xuICAgICAgICBidW5kbGVEZXN0aEZpbGUud3JpdGVUZXh0U3luYyhidW5kbGVTb3VyY2VEYXRhLCBlID0+IHtcbiAgICAgICAgICBlcnJvciA9IGU7XG4gICAgICAgICAgTG9nZ2VyLmluc3RhbmNlLmNvcmUuZXJyb3IoYEFwcCBkb3dubG9hZCBmaWxlIHdyaXRlIGZhaWxlZDogJHtlcnJvcn1gKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGVycm9yO1xuICB9XG5cbn1cbiIsImltcG9ydCAndG5zLWNvcmUtbW9kdWxlcy9nbG9iYWxzJztcbmltcG9ydCB7IEFwcEV4dHJhY3RIZWxwZXIgfSBmcm9tICcuL0FwcEV4dHJhY3RIZWxwZXInO1xuXG5jb25zdCBjb250ZXh0OiBXb3JrZXIgPSBzZWxmIGFzIGFueTtcbi8vIE5PVEU6IENBTk5PVCBERUJVRyBXT1JLRVJTXG4vLyBSZWNvbW1lbmRlZCB0byBhZGQgdGhpcyBjb2RlIGluIGEgZnVuY3Rpb24gaW4gdGhlIGludm9raW5nIGNvZGUgdG8gZGVidWdcbmNvbnRleHQub25tZXNzYWdlID0gbXNnID0+IHtcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgbGV0IGVycm9yID0gQXBwRXh0cmFjdEhlbHBlci5nZXRJbnN0YW5jZSgpLmV4dHJhY3QobXNnKTtcbiAgICAgICAgKDxhbnk+IGdsb2JhbCkucG9zdE1lc3NhZ2Uoe2VycjogZXJyb3J9KTtcbiAgICAgICAgQXBwRXh0cmFjdEhlbHBlci5nZXRJbnN0YW5jZSgpLnJlbW92ZUZvbGRlcigpO1xuICAgICAgICBBcHBFeHRyYWN0SGVscGVyLmdldEluc3RhbmNlKCkucmVtb3ZlRG93bmxvYWRlZFppcEZpbGUoKTtcbiAgICB9LCA1MDApO1xufTtcblxuLy8gb25lcnJvciBpbnRlbnRpb25hbGx5IGxlZnQgb3V0LCB0aGVyZSBpcyBubyBzcGVjaWFsIGhhbmRsaW5nIHRvIGJlIGRvbmUgaW4gdGhlIHdvcmtlclxuLy8gcGFzcyBlcnJvciBiYWNrIHRvIGNhbGxlclxuIiwiXG5pbXBvcnQgKiBhcyB4bWwgZnJvbSAndG5zLWNvcmUtbW9kdWxlcy94bWwnO1xuaW1wb3J0IHsgTG9nZ2VyIH0gZnJvbSAnbWRrLWNvcmUvdXRpbHMvTG9nZ2VyJztcblxuZXhwb3J0IGNsYXNzIExpZmVjeWNsZUFwcFZlcnNpb25JbmZvIHtcbiAgcHJpdmF0ZSBfdXJsOiBzdHJpbmc7XG4gIHB1YmxpYyBnZXQgdXJsKCkge1xuICAgIHJldHVybiB0aGlzLl91cmw7XG4gIH1cblxuICBwcml2YXRlIF9yZXZpc2lvbjogbnVtYmVyO1xuICBwdWJsaWMgZ2V0IHJldmlzaW9uKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX3JldmlzaW9uO1xuICB9XG5cbiAgY29uc3RydWN0b3IobGNtc1ZlcnNpb25YbWw6IHN0cmluZykge1xuICAgIHRoaXMucGFyc2UobGNtc1ZlcnNpb25YbWwpO1xuICB9XG5cbiAgLy8gVmVyeSBydWRpbWVudGFyeSBwYXJzaW5nIGxvb2tpbmcgc3BlY2ZpY2FsbHkgZm9yIHRoZSBlbGVtZW50czpcbiAgLy8gICAgICBkOlJldmlzaW9uXG4gIC8vICAgICAgZDpQYXRoXG4gIC8vIElmIG1vcmUgcm9idXN0IGNoZWtpbmcgaXMgbmVlZGVkIChsaWtlIHBhdGggY2hlY2tpbmcpLCBjb25zaWRlciB1c2luZ1xuICAvLyAgICAgIGh0dHBzOi8vd3d3Lm5wbWpzLmNvbS9wYWNrYWdlL25hdGl2ZXNjcmlwdC14bWxvYmplY3RzXG4gIHB1YmxpYyBwYXJzZShsY21zVmVyc2lvblhtbDogc3RyaW5nKSB7XG4gICAgdGhpcy5fdXJsID0gdW5kZWZpbmVkO1xuICAgIHRoaXMuX3JldmlzaW9uID0gdW5kZWZpbmVkO1xuICAgIGxldCBjdXJyZW50RWxlbWVudE5hbWU6IHN0cmluZztcbiAgICBsZXQgY3VycmVudFRleHQ6IHN0cmluZztcblxuICAgIC8vIHBhcnNlIHRoZSBkYXRhXG4gICAgbGV0IHhtbFBhcnNlciA9IG5ldyB4bWwuWG1sUGFyc2VyKCAoZXZlbnQ6IHhtbC5QYXJzZXJFdmVudCkgPT4ge1xuICAgICAgICBzd2l0Y2ggKGV2ZW50LmV2ZW50VHlwZSkge1xuICAgICAgICAgIGNhc2UgeG1sLlBhcnNlckV2ZW50VHlwZS5TdGFydEVsZW1lbnQ6XG4gICAgICAgICAgICBjdXJyZW50RWxlbWVudE5hbWUgPSBldmVudC5lbGVtZW50TmFtZTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgeG1sLlBhcnNlckV2ZW50VHlwZS5FbmRFbGVtZW50OlxuICAgICAgICAgICAgaWYgKGN1cnJlbnRFbGVtZW50TmFtZSA9PT0gJ2Q6UmV2aXNpb24nKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fcmV2aXNpb24gPSBOdW1iZXIoY3VycmVudFRleHQpO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChjdXJyZW50RWxlbWVudE5hbWUgPT09ICdkOlBhdGgnKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fdXJsID0gY3VycmVudFRleHQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjdXJyZW50RWxlbWVudE5hbWUgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICBjdXJyZW50VGV4dCA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgeG1sLlBhcnNlckV2ZW50VHlwZS5UZXh0OlxuICAgICAgICAgICAgY3VycmVudFRleHQgPSBldmVudC5kYXRhLnRyaW0oKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICBMb2dnZXIuaW5zdGFuY2UubGNtcy5lcnJvcihgSW52YWxpZCBldmVudCB0eXBlIG9uWG1sRXZlbnRDYWxsYmFjayAke2V2ZW50LmV2ZW50VHlwZX1gKTtcbiAgICAgICAgfVxuICAgICAgfSwgKGVycm9yOiBFcnJvcikgPT4ge1xuICAgICAgICBMb2dnZXIuaW5zdGFuY2UubGNtcy5lcnJvcihgRXJyb3IgcGFyc2luZyBYTUw6ICR7ZXJyb3J9YCk7XG4gICAgICAgIHRoaXMuX3VybCA9IHVuZGVmaW5lZDtcbiAgICAgICAgdGhpcy5fcmV2aXNpb24gPSB1bmRlZmluZWQ7XG4gICAgfSk7XG4gICAgeG1sUGFyc2VyLnBhcnNlKGxjbXNWZXJzaW9uWG1sKTtcbiAgICBMb2dnZXIuaW5zdGFuY2UubGNtcy5pbmZvKCdMQ01TIHZlcnNpb24gZGF0YSBwYXJzZWQnKTtcbiAgICBMb2dnZXIuaW5zdGFuY2UubGNtcy5pbmZvKGBcXHRsYXRlc3QgcmV2aXNpb246ICR7dGhpcy5fcmV2aXNpb259IHwgdXJsOiAke3RoaXMuX3VybH1gKTtcbiAgfVxufVxuIiwiaW1wb3J0ICogYXMgdGltZXIgZnJvbSAndG5zLWNvcmUtbW9kdWxlcy90aW1lcic7XG5pbXBvcnQgKiBhcyBmcyBmcm9tICd0bnMtY29yZS1tb2R1bGVzL2ZpbGUtc3lzdGVtJztcblxuaW1wb3J0IHsgQXBwbGljYXRpb24gfSBmcm9tICcuLi9BcHBsaWNhdGlvbic7XG5pbXBvcnQgeyBMaWZlY3ljbGVBcHBWZXJzaW9uSW5mbyB9IGZyb20gJy4vTGlmZWN5Y2xlQXBwVmVyc2lvbkluZm8nO1xuaW1wb3J0IHsgQ2xpZW50U2V0dGluZ3MgfSBmcm9tICdtZGstY29yZS9zdG9yYWdlL0NsaWVudFNldHRpbmdzJztcbmltcG9ydCB7IENwbXNTZXNzaW9uIH0gZnJvbSAnbWRrLXNhcCc7XG5pbXBvcnQgeyBFcnJvck1lc3NhZ2UgfSBmcm9tICdtZGstY29yZS9lcnJvckhhbmRsaW5nL0Vycm9yTWVzc2FnZSc7XG5pbXBvcnQgKiBhcyBhcHAgZnJvbSAndG5zLWNvcmUtbW9kdWxlcy9hcHBsaWNhdGlvbic7XG5pbXBvcnQgeyBMb2dnZXIgfSBmcm9tICdtZGstY29yZS91dGlscy9Mb2dnZXInO1xuaW1wb3J0IHsgUmVxdWlyZVV0aWwgfSBmcm9tICdtZGstY29yZS91dGlscy9SZXF1aXJlVXRpbCc7XG5pbXBvcnQgeyBmcm9tT2JqZWN0LCBFdmVudERhdGEgfSBmcm9tICd0bnMtY29yZS1tb2R1bGVzL2RhdGEvb2JzZXJ2YWJsZS9vYnNlcnZhYmxlJztcbmltcG9ydCAqIGFzIFRzV29ya2VyIGZyb20gJ25hdGl2ZXNjcmlwdC13b3JrZXItbG9hZGVyIS4vQXBwRXh0cmFjdFdvcmtlcic7XG5cbmVudW0gU3RhdGVzIHtcbiAgUnVubmluZywgUGF1c2VkLCBQZW5kaW5nLCBTdG9wcGVkLFxufTtcblxuZW51bSBBY3Rpb25TdGF0dXMge1xuICBTdWNjZXNzLCBGYWlsdXJlLFxufVxuXG5leHBvcnQgY2xhc3MgTGlmZWN5Y2xlTWFuYWdlciB7XG4gIHB1YmxpYyBzdGF0aWMgZ2V0SW5zdGFuY2UoKTogTGlmZWN5Y2xlTWFuYWdlciB7XG4gICAgcmV0dXJuIExpZmVjeWNsZU1hbmFnZXIuX2luc3RhbmNlO1xuICB9XG4gIHByaXZhdGUgc3RhdGljIHJlYWRvbmx5IFZFUlNJT05fQ0hFQ0tfUEFUSDogc3RyaW5nID0gJy9vZGF0YS9sY20vdjEvQXBwcyhBcHBJZD1cXCcnO1xuICBwcml2YXRlIHN0YXRpYyByZWFkb25seSBWRVJTSU9OX0NIRUNLX1BBVEhfU1VGRklYOiBzdHJpbmcgPSAnXFwnLFBsYXRmb3JtPVxcJ0FwcE1vZGVsZXJcXCcpJztcbiAgcHJpdmF0ZSBzdGF0aWMgcmVhZG9ubHkgVEVNUF9TQVZFX1BBVEggPSBmcy5wYXRoLmpvaW4oZnMua25vd25Gb2xkZXJzLnRlbXAoKS5wYXRoLCAnbGNtc0Rvd25sb2FkLnppcCcpO1xuICBwcml2YXRlIHN0YXRpYyByZWFkb25seSBaSVBfRVhUUkFDVF9QQVRIID0gZnMucGF0aC5qb2luKGZzLmtub3duRm9sZGVycy50ZW1wKCkucGF0aCwgJ1NlYW1FeHRyYWN0Jyk7XG4gIHByaXZhdGUgc3RhdGljIHJlYWRvbmx5IEFDVElPTl9TVEFUVVNfQ0hBTkdFRCA9ICdBY3Rpb25TdGF0dXNDaGFuZ2VkJztcblxuICAvLyB0c2xpbnQ6ZGlzYWJsZTptYXgtbGluZS1sZW5ndGhcbiAgLy8gRm9yIGlPUywgY2Fubm90IHVzZSBkb2N1bWVudHMgZm9sZGVyIGFzIHVzZXIgY2FuIG1vZGlmeSB0aGF0IGZvbGRlciB2aWEgaVR1bmVzL2lFeHBsb3JlcixcbiAgLy8gIHVzZSBhIG5vbi11c2VyIGFjY2Vzc2libGUgcGF0aFxuICAvLyAnVXNlIHRoZSBMaWJyYXJ5IHN1YmRpcmVjdG9yaWVzIGZvciBhbnkgZmlsZXMgeW91IGRvbuKAmXQgd2FudCBleHBvc2VkIHRvIHRoZSB1c2VyLlxuICAvLyBZb3VyIGFwcCBzaG91bGQgbm90IHVzZSB0aGVzZSBkaXJlY3RvcmllcyBmb3IgdXNlciBkYXRhIGZpbGVzLidcbiAgLy8gaHR0cHM6Ly9kZXZlbG9wZXIuYXBwbGUuY29tL2xpYnJhcnkvY29udGVudC9kb2N1bWVudGF0aW9uL0ZpbGVNYW5hZ2VtZW50L0NvbmNlcHR1YWwvRmlsZVN5c3RlbVByb2dyYW1taW5nR3VpZGUvRmlsZVN5c3RlbU92ZXJ2aWV3L0ZpbGVTeXN0ZW1PdmVydmlldy5odG1sXG4gIC8vIHRzbGludDplbmFibGU6bWF4LWxpbmUtbGVuZ3RoXG5cbiAgcHJpdmF0ZSBzdGF0aWMgcmVhZG9ubHkgQlVORExFX0ZJTEVfUFJFRklYID0gJ2J1bmRsZSc7XG4gIHByaXZhdGUgc3RhdGljIHJlYWRvbmx5IEJVTkRMRV9GSUxFX1NVRkZJWCA9ICdqcyc7XG4gIHByaXZhdGUgc3RhdGljIHJlYWRvbmx5IEJVTkRMRV9TT1VSQ0VNQVBfU1VGRklYID0gJ2pzLm1hcCc7XG5cbiAgcHJpdmF0ZSBzdGF0aWMgX2luc3RhbmNlOiBMaWZlY3ljbGVNYW5hZ2VyID0gbmV3IExpZmVjeWNsZU1hbmFnZXIoKTtcbiAgcHJpdmF0ZSBfc3RhdGU6IFN0YXRlcyA9IFN0YXRlcy5TdG9wcGVkO1xuICBwcml2YXRlIF90aW1lcklkOiBudW1iZXI7XG4gIHByaXZhdGUgX2FwcERvd25sb2FkRXJyb3JDb3VudDogbnVtYmVyID0gMDtcbiAgcHJpdmF0ZSBfc3RhdHVzTW9kZWw6IGFueTtcbiAgcHJpdmF0ZSBfaXNBY3Rpb25SdW5uaW5nOiBCb29sZWFuID0gZmFsc2U7XG5cbiAgcHJpdmF0ZSBjb25zdHJ1Y3RvcigpIHtcbiAgICBpZiAoTGlmZWN5Y2xlTWFuYWdlci5faW5zdGFuY2UpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihFcnJvck1lc3NhZ2UuSU5JVElBTElaRV9GQUlMX1NIT1VMRF9VU0VfR0VUSU5TVEFOQ0UpO1xuICAgIH1cbiAgICBMaWZlY3ljbGVNYW5hZ2VyLl9pbnN0YW5jZSA9IHRoaXM7XG4gIH1cblxuICAvLyBDaGVjayB2ZXJzaW9uIGluZm9ybWF0aW9uIHJpZ2h0IGF3YXlcbiAgcHVibGljIHN0YXJ0KCkge1xuICAgIGlmICghdGhpcy5pc1N0b3BwZWQoKSkge1xuICAgICAgLy8gaW1tZWRpYXRlbHkgc3RhcnQgYSB2ZXJzaW9uIGNoZWNrZXIgYW5kIGNsZWFyIHByZXZpb3VzIHRpbWVyXG4gICAgICB0aW1lci5jbGVhclRpbWVvdXQodGhpcy5fdGltZXJJZCk7XG4gICAgfVxuICAgIGlmIChBcHBsaWNhdGlvbi5pc09uVXBkYXRlUHJvY2Vzc2luZygpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuc2V0U3RhdGUoU3RhdGVzLlJ1bm5pbmcpO1xuXG4gICAgLy8gRmlyZSBvZmYgdmVyc2lvbiBjaGVja2VyXG4gICAgTG9nZ2VyLmluc3RhbmNlLmxjbXMuaW5mbygnU3RhcnRpbmcgTENNUyBWZXJzaW9uIENoZWNraW5nJyk7XG4gICAgcmV0dXJuIHRoaXMudmVyc2lvbkNoZWNrZXIoKTtcbiAgfVxuXG4gIC8vIERvIG5vdCByZXF1ZXN0IHZlcnNpb24gaW5mbyBvbiBjYWxsLCBzZXQgYSB0aW1lciB0byBjaGVja1xuICBwdWJsaWMgc3RhcnREZWxheWVkKCkge1xuICAgIGlmICghdGhpcy5pc1N0b3BwZWQoKSkge1xuICAgICAgTG9nZ2VyLmluc3RhbmNlLmxjbXMuaW5mbygnTENNUyBWZXJzaW9uIENoZWNraW5nIGFscmVhZHkgcnVubmluZywgaWdub3JpbmcgcmVxdWVzdCcpO1xuICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KCdMQ01TIFZlcnNpb24gQ2hlY2tpbmcgYWxyZWFkeSBydW5uaW5nLCBpZ25vcmluZyByZXF1ZXN0Jyk7XG4gICAgfVxuICAgIHRoaXMuc2V0U3RhdGUoU3RhdGVzLlJ1bm5pbmcpO1xuXG4gICAgLy8gRmlyZSBvZmYgdGltZXIgdG8gZGVsYXkgdGhlIHZlcnNpb24gY2hlY2tlclxuICAgIExvZ2dlci5pbnN0YW5jZS5sY21zLmluZm8oJ0RlbGF5IFN0YXJ0aW5nIExDTVMgVmVyc2lvbiBDaGVja2luZycpO1xuICAgIHRoaXMuc3RhcnRWZXJzaW9uQ2hlY2tlclRpbWVyKCk7XG4gIH1cblxuICBwdWJsaWMgc3RvcCgpOiB2b2lkIHtcbiAgICB0aW1lci5jbGVhclRpbWVvdXQodGhpcy5fdGltZXJJZCk7XG4gICAgdGhpcy5zZXRTdGF0ZShTdGF0ZXMuU3RvcHBlZCk7XG4gIH1cblxuICAvLyBTdG9wIGhhbmRsaW5nIHRpbWVvdXRzLCBidXQga2VlcCB0aGUgdGltZXIgdGlja2luZ1xuICAvLyBJZiBhIHRpbWVyIGRvZXMgdGltZW91dCwgc3RhdGUgd2lsbCB0cmFuc2lzdGlvbiB0byBQZW5kaW5nXG4gIHB1YmxpYyBwYXVzZSgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5pc1BhdXNlYWJsZSgpKSB7XG4gICAgICB0aGlzLnNldFN0YXRlKFN0YXRlcy5QYXVzZWQpO1xuICAgIH0gZWxzZSB7XG4gICAgICBMb2dnZXIuaW5zdGFuY2UubGNtcy5pbmZvKGBMQ01TIGlzIG5vdCBiZWluZyBwYXVzZWQgYXMgaXRzIGN1cnJlbnQgc3RhdGUgaXMgOnwke3RoaXMuX3N0YXRlfXxgKTtcbiAgICB9XG4gIH1cblxuICAvLyBTdGFydCBoYW5kbGluZyB0aW1lb3V0c1xuICAvLyBJZiBhIHRpbWVvdXQgb2NjdXJyZWQgd2hlbiBwYXVzZWQgKFBlbmRpbmcgc3RhdGUpLCBpbml0aWF0ZSBhIHZlcnNpb24gY2hlY2sgYnkgcmVzZXRpbmdcbiAgcHVibGljIHVuUGF1c2UoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuaXNQZW5kaW5nKCkpIHtcbiAgICAgIHRoaXMucmVzdGFydCgpO1xuICAgIH0gZWxzZSBpZiAodGhpcy5pc1BhdXNlZCgpKSB7XG4gICAgICB0aGlzLnNldFN0YXRlKFN0YXRlcy5SdW5uaW5nKTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgZ2V0Q3VycmVudERlZmluaXRpb25QYXRoKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0QnVuZGxlUGF0aCh0aGlzLmdldEN1cnJlbnRWZXJzaW9uKCkpO1xuICB9XG5cbiAgcHVibGljIGdldFN0YWdlZERlZmluaXRpb25QYXRoKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0QnVuZGxlUGF0aCh0aGlzLmdldFN0YWdlZFZlcnNpb24oKSk7XG4gIH1cblxuICBwdWJsaWMgcHJvbW90ZVN0YWdlZFZlcnNpb24oKTogYm9vbGVhbiB7XG4gICAgY29uc3QgdmVyc2lvbiA9IHRoaXMuZ2V0U3RhZ2VkVmVyc2lvbigpO1xuICAgIGlmIChmcy5GaWxlLmV4aXN0cyh0aGlzLmdldEJ1bmRsZVBhdGgodmVyc2lvbikpKSB7XG4gICAgICBpZiAodmVyc2lvbiA+IHRoaXMuZ2V0Q3VycmVudFZlcnNpb24oKSkge1xuICAgICAgICB0aGlzLnNldEN1cnJlbnRWZXJzaW9uKHZlcnNpb24pO1xuICAgICAgICB0aGlzLmNsZWFudXBQcmV2aW91c1ZlcnNpb25zKHZlcnNpb24pO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgLy8gUmVzZXRzIHRoZSBMQ01TIHZlcnNpb25zL2Rvd25sb2FkZWQgYXBwbGljYXRpb25zXG4gIHB1YmxpYyByZXNldCgpOiB2b2lkIHtcbiAgICB0aGlzLnN0b3AoKTtcbiAgICBDbGllbnRTZXR0aW5ncy5yZXNldEFwcGxpY2F0aW9uVmVyc2lvbnMoKTtcbiAgICB0aGlzLmNsZWFudXBQcmV2aW91c1ZlcnNpb25zKCk7XG4gIH1cblxuICBwdWJsaWMgZXhlY3V0ZUFwcFVwZGF0ZUNoZWNrKCk6IFByb21pc2U8YW55PiB7XG4gICAgdGhpcy5fc3RhdHVzTW9kZWwgPSBmcm9tT2JqZWN0KHt9KTtcbiAgICB0aGlzLl9pc0FjdGlvblJ1bm5pbmcgPSB0cnVlO1xuICAgIGxldCBzZWxmID0gdGhpcztcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgc2VsZi5fc3RhdHVzTW9kZWwub24oTGlmZWN5Y2xlTWFuYWdlci5BQ1RJT05fU1RBVFVTX0NIQU5HRUQsIChhcmdzOiBFdmVudERhdGEpID0+IHtcbiAgICAgICAgaWYgKGFyZ3Mub2JqZWN0LmdldCgnQWN0aW9uU3RhdHVzJykgPT09IEFjdGlvblN0YXR1cy5TdWNjZXNzKSB7XG4gICAgICAgICAgc2VsZi5faXNBY3Rpb25SdW5uaW5nID0gZmFsc2U7XG4gICAgICAgICAgcmVzb2x2ZShhcmdzLm9iamVjdC5nZXQoJ01lc3NhZ2UnKSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGFyZ3Mub2JqZWN0LmdldCgnQWN0aW9uU3RhdHVzJykgPT09IEFjdGlvblN0YXR1cy5GYWlsdXJlKSB7XG4gICAgICAgICAgc2VsZi5faXNBY3Rpb25SdW5uaW5nID0gZmFsc2U7XG4gICAgICAgICAgcmVqZWN0KG5ldyBFcnJvcihhcmdzLm9iamVjdC5nZXQoJ01lc3NhZ2UnKSkpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIHRoaXMucmVzdGFydCgpO1xuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBzZXRBcHBVcGRhdGVTdGF0dXMoc3RhdHVzOiBBY3Rpb25TdGF0dXMgLCBtZXNzYWdlOiBTdHJpbmcpIHtcbiAgICBpZiAodGhpcy5faXNBY3Rpb25SdW5uaW5nKSB7XG4gICAgICB0aGlzLl9zdGF0dXNNb2RlbC5zZXQoJ01lc3NhZ2UnLCBtZXNzYWdlKTtcbiAgICAgIHRoaXMuX3N0YXR1c01vZGVsLnNldCgnQWN0aW9uU3RhdHVzJywgc3RhdHVzKTtcbiAgICAgIGxldCBldmVudERhdGE6IEV2ZW50RGF0YSA9IHtcbiAgICAgICAgZXZlbnROYW1lOiBMaWZlY3ljbGVNYW5hZ2VyLkFDVElPTl9TVEFUVVNfQ0hBTkdFRCxcbiAgICAgICAgb2JqZWN0OiB0aGlzLl9zdGF0dXNNb2RlbCxcbiAgICAgIH07XG4gICAgICB0aGlzLl9zdGF0dXNNb2RlbC5ub3RpZnkoZXZlbnREYXRhKTtcbiAgICAgIHRoaXMuX3N0YXR1c01vZGVsLm9mZihMaWZlY3ljbGVNYW5hZ2VyLkFDVElPTl9TVEFUVVNfQ0hBTkdFRCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBpc1BhdXNlYWJsZSgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fc3RhdGUgPT09IFN0YXRlcy5SdW5uaW5nO1xuICB9XG5cbiAgcHJpdmF0ZSBpc1BhdXNlZCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fc3RhdGUgPT09IFN0YXRlcy5QYXVzZWQ7XG4gIH1cblxuICBwcml2YXRlIGlzUGVuZGluZygpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fc3RhdGUgPT09IFN0YXRlcy5QZW5kaW5nO1xuICB9XG5cbiAgcHJpdmF0ZSBpc1N0b3BwZWQoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX3N0YXRlID09PSBTdGF0ZXMuU3RvcHBlZDtcbiAgfVxuXG4gIC8vIEhlbHBlciBmdW5jdGlvbiwgY3VycmVudGx5IGRvZXNuJ3QgZG8gYW55IHN0YXRlIHRyYW5zaXN0aW9uIGNoZWNraW5nXG4gIHByaXZhdGUgc2V0U3RhdGUoc3RhdGU6IFN0YXRlcyk6IHZvaWQge1xuICAgIHRoaXMuX3N0YXRlID0gc3RhdGU7XG4gIH1cblxuICBwcml2YXRlIHJlc3RhcnQoKTogdm9pZCB7XG4gICAgdGhpcy5zdG9wKCk7XG4gICAgdGhpcy5zdGFydCgpO1xuICB9XG5cbiAgcHJpdmF0ZSBjbGVhbnVwUHJldmlvdXNWZXJzaW9ucyh2ZXJzaW9uPzogbnVtYmVyKSB7XG4gICAgbGV0IGJ1bmRsZUZvbGRlciA9IGZzLkZvbGRlci5mcm9tUGF0aCh0aGlzLmdldEJ1bmRsZUZvbGRlcigpKTtcbiAgICBsZXQgY3VycmVudEJ1bmRsZUZpbGUgPSB2ZXJzaW9uID8gdGhpcy5nZXRCdW5kbGVGaWxlbmFtZSh2ZXJzaW9uKSA6IHVuZGVmaW5lZDtcbiAgICBidW5kbGVGb2xkZXIuZWFjaEVudGl0eSgoZW50aXR5KSA9PiB7XG4gICAgICBpZiAoIWVudGl0eS5uYW1lLnN0YXJ0c1dpdGgoY3VycmVudEJ1bmRsZUZpbGUpICYmXG4gICAgICAgICAgZW50aXR5Lm5hbWUuc3RhcnRzV2l0aChMaWZlY3ljbGVNYW5hZ2VyLkJVTkRMRV9GSUxFX1BSRUZJWCkgJiZcbiAgICAgICAgICAoZW50aXR5Lm5hbWUuZW5kc1dpdGgoTGlmZWN5Y2xlTWFuYWdlci5CVU5ETEVfRklMRV9TVUZGSVgpIHx8XG4gICAgICAgICAgZW50aXR5Lm5hbWUuZW5kc1dpdGgoTGlmZWN5Y2xlTWFuYWdlci5CVU5ETEVfU09VUkNFTUFQX1NVRkZJWCkpKSB7XG4gICAgICAgIGVudGl0eS5yZW1vdmUoKVxuICAgICAgICAgIC50aGVuKChyZXN1bHQpID0+IHtcbiAgICAgICAgICAgIExvZ2dlci5pbnN0YW5jZS5sY21zLmluZm8oYFN1Y2Nlc3NmdWxseSByZW1vdmVkIG9sZCBkZWZpbml0aW9uIGZpbGUgJHtlbnRpdHkubmFtZX1gKTtcbiAgICAgICAgICB9LCAoZXJyb3IpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IG1lc3NhZ2U6IHN0cmluZyA9IGBFcnJvciB3aGlsZSBhdHRlbXB0aW5nIHRvIHJlbW92ZSBhbiBvbGQgZGVmaW5pdGlvbiBmaWxlICR7ZW50aXR5Lm5hbWV9IC0gJHtlcnJvcn1gO1xuICAgICAgICAgICAgTG9nZ2VyLmluc3RhbmNlLmxjbXMuZXJyb3IobWVzc2FnZSk7XG4gICAgICAgICAgfSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgdmVyc2lvbkNoZWNrZXIgPSAoKSA9PiB7XG4gICAgaWYgKEFwcGxpY2F0aW9uLmlzT25VcGRhdGVQcm9jZXNzaW5nKCkpIHtcbiAgICAgIHRoaXMuc2V0U3RhdGUoU3RhdGVzLlN0b3BwZWQpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAodGhpcy5pc1N0b3BwZWQoKSkge1xuICAgICAgdGhpcy5zZXRTdGF0ZShTdGF0ZXMuU3RvcHBlZCk7XG4gICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCdMQ01TIFN0b3BwZWQgZHVlIHRvIEFwcGxpY2F0aW9uIHVwZGF0aW5nJyk7XG4gICAgfVxuICAgIGlmICh0aGlzLmlzUGF1c2VkKCkgfHwgdGhpcy5pc1BlbmRpbmcoKSkge1xuICAgICAgdGhpcy5zZXRTdGF0ZShTdGF0ZXMuUGVuZGluZyk7XG4gICAgICBMb2dnZXIuaW5zdGFuY2UubGNtcy5sb2coJ1ZlcnNpb24gY2hlY2tlciByZXF1ZXN0IGluaXRpYXRlZCB3aGVuIG5vdCBhY3RpdmUsIHF1ZXVpbmcgdXAgcmVxdWVzdCcpO1xuICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgnTENNUyBQYXVzZWQsIHF1ZXVpbmcgdmVyc2lvbiBjaGVja2VyIHJlcXVlc3QnKTtcbiAgICB9XG5cbiAgICBjb25zdCByZXF1ZXN0VXJsOiBzdHJpbmcgPSB0aGlzLmdldFZlcnNpb25DaGVja1VybCgpO1xuICAgIGNvbnN0IHBhcmFtID0geyAnaGVhZGVyJzogeyAnQWNjZXB0JzogJ2FwcGxpY2F0aW9uL3htbCxhcHBsaWNhdGlvbi9hdG9tK3htbCcgfX07XG4gICAgbGV0IGFwcElkID0gQ2xpZW50U2V0dGluZ3MuZ2V0QXBwSWQoKTtcbiAgICBMb2dnZXIuaW5zdGFuY2UubGNtcy5pbmZvKGBSZXF1ZXN0aW5nIExDTVMgdmVyc2lvbiBpbmZvOiAke3JlcXVlc3RVcmx9IHdpdGggaGVhZGVyIFgtU01QLUFQUElEOiAke2FwcElkfWApO1xuICAgIHRpbWVyLmNsZWFyVGltZW91dCh0aGlzLl90aW1lcklkKTtcbiAgICByZXR1cm4gQ3Btc1Nlc3Npb24uZ2V0SW5zdGFuY2UoKS5zZW5kUmVxdWVzdChyZXF1ZXN0VXJsLCBwYXJhbSlcbiAgICAudGhlbihyZXNwb25zZSA9PiB7XG4gICAgICBpZiAocmVzcG9uc2Uuc3RhdHVzQ29kZSA9PT0gMjAwKSB7XG4gICAgICAgIExvZ2dlci5pbnN0YW5jZS5sY21zLmluZm8oYFJlc3BvbnNlIFJlY2lldmVkLCBodHRwU3RhdHVzOiAke3Jlc3BvbnNlLnN0YXR1c0NvZGV9YCk7XG4gICAgICAgIHRoaXMuaGFuZGxlVmVyc2lvbkluZm8ocmVzcG9uc2UuY29udGVudC50b1N0cmluZygpKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnN0IHZlcnNpb25SZXNwb25zZVRleHQ6IHN0cmluZyA9ICdMQ01TIEdFVCBWZXJzaW9uIFJlc3BvbnNlIEVycm9yIFJlc3BvbnNlIFN0YXR1czonO1xuICAgICAgICBjb25zdCBib2R5VGV4dCA9IGBCb2R5OiAke3Jlc3BvbnNlLmNvbnRlbnQudG9TdHJpbmcoKX1gO1xuICAgICAgICBpZiAoYm9keVRleHQuaW5kZXhPZignPGNvZGU+Tm90Rm91bmRFeGNlcHRpb248L2NvZGU+JykgPiAwKSB7XG4gICAgICAgICAgdGhpcy5zZXRBcHBVcGRhdGVTdGF0dXMoQWN0aW9uU3RhdHVzLlN1Y2Nlc3MsICdBcHBVcGRhdGUgaXMgbm90IGVuYWJsZWQgb3Igbm8gcmV2aXNpb24gZm91bmQgZnJvbSBiYWNrZW5kJyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5zZXRBcHBVcGRhdGVTdGF0dXMoQWN0aW9uU3RhdHVzLkZhaWx1cmUsIGAke3ZlcnNpb25SZXNwb25zZVRleHR9ICR7cmVzcG9uc2Uuc3RhdHVzQ29kZX0gfCAke2JvZHlUZXh0fWApO1xuICAgICAgICB9XG4gICAgICAgIExvZ2dlci5pbnN0YW5jZS5sY21zLmVycm9yKGAke3ZlcnNpb25SZXNwb25zZVRleHR9ICR7cmVzcG9uc2Uuc3RhdHVzQ29kZX0gfCAke2JvZHlUZXh0fWApO1xuICAgICAgICB0aGlzLnN0YXJ0VmVyc2lvbkNoZWNrZXJUaW1lcigpO1xuICAgICAgfVxuICAgIH0sIChlcnJvcikgPT4ge1xuICAgICAgdGhpcy5zZXRBcHBVcGRhdGVTdGF0dXMoQWN0aW9uU3RhdHVzLkZhaWx1cmUsIGBMQ01TIEdFVCBWZXJzaW9uIFJlc3BvbnNlIGZhaWxlZDogJHtlcnJvcn1gKTtcbiAgICAgIExvZ2dlci5pbnN0YW5jZS5sY21zLmVycm9yKGBMQ01TIEdFVCBWZXJzaW9uIFJlc3BvbnNlIGZhaWxlZDogJHtlcnJvcn1gKTtcbiAgICAgIHRoaXMuc3RhcnRWZXJzaW9uQ2hlY2tlclRpbWVyKCk7XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIHN0YXJ0VmVyc2lvbkNoZWNrZXJUaW1lcigpOiB2b2lkIHtcbiAgICAvLyBQaWNrIGEgcmFuZG9tIHRpbWVvdXQgYmV0d2VlbiBtaW4gYW5kIChtaW4gKyByYW5kb20gbWF4KVxuICAgIC8vIFRoZSBpbnRlbnQgaXMgdG8gcHJldmVudCBtdWx0aXBsZSBkZXZpY2VzIGF0dGVtcHRpbmcgdG8gY29ubmVjdCBhdCB0aGUgc2FtZSB0aW1lb3V0LlxuICAgIC8vIFRoaXMgd2lsbCBzcHJlYWQgb3V0IHRoZSB2ZXJzaW9uIGNoZWNrcy5cbiAgICBsZXQgdGltZW91dCA9IENsaWVudFNldHRpbmdzLmdldExjbXNWZXJzaW9uQ2hlY2tNaW5QZXJpb2QoKSArXG4gICAgICBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBDbGllbnRTZXR0aW5ncy5nZXRMY21zVmVyc2lvbkNoZWNrUmFuZG9tTWF4KCkpO1xuICAgIHRoaXMuX3RpbWVySWQgPSB0aW1lci5zZXRUaW1lb3V0KHRoaXMudmVyc2lvbkNoZWNrZXIsIHRpbWVvdXQpO1xuICAgIExvZ2dlci5pbnN0YW5jZS5sY21zLmluZm8oYFNldHRpbmcgTENNUyBWZXJzaW9uIENoZWNrZXIgdGltZXI6ICR7dGltZW91dH0gfCB0aW1lciBpZDogJHt0aGlzLl90aW1lcklkfWApO1xuICB9XG5cbiAgcHJpdmF0ZSBnZXRWZXJzaW9uQ2hlY2tVcmwoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gQ2xpZW50U2V0dGluZ3MuZ2V0Q3Btc1VybCgpICsgTGlmZWN5Y2xlTWFuYWdlci5WRVJTSU9OX0NIRUNLX1BBVEggK1xuICAgICAgQ2xpZW50U2V0dGluZ3MuZ2V0QXBwSWQoKSArIExpZmVjeWNsZU1hbmFnZXIuVkVSU0lPTl9DSEVDS19QQVRIX1NVRkZJWDtcbiAgfVxuXG4gIHByaXZhdGUgaGFuZGxlVmVyc2lvbkluZm8odmVyaW9uSW5mb1htbDogc3RyaW5nKTogdm9pZCB7XG4gICAgTG9nZ2VyLmluc3RhbmNlLmxjbXMuaW5mbyhgUmVjZWl2ZWQgVmVyc2lvbiBEYXRhOiAke3ZlcmlvbkluZm9YbWx9YCk7XG4gICAgY29uc3QgbGF0ZXN0VmVyc2lvbkluZm8gPSBuZXcgTGlmZWN5Y2xlQXBwVmVyc2lvbkluZm8odmVyaW9uSW5mb1htbCk7XG4gICAgaWYgKCFsYXRlc3RWZXJzaW9uSW5mby5yZXZpc2lvbiB8fCAhbGF0ZXN0VmVyc2lvbkluZm8udXJsKSB7XG4gICAgICBMb2dnZXIuaW5zdGFuY2UubGNtcy5lcnJvcignSW52YWxpZCBMQ01TIFhNTCBkYXRhLCBza2lwcGluZyB1cGdyYWRlJyk7XG4gICAgICBMb2dnZXIuaW5zdGFuY2UubGNtcy5pbmZvKGBMQ01TIFhNTCByZXZpc2lvbjogJHtsYXRlc3RWZXJzaW9uSW5mby5yZXZpc2lvbn0gfCB1cmw6ICR7bGF0ZXN0VmVyc2lvbkluZm8udXJsfWApO1xuICAgICAgdGhpcy5zdGFydFZlcnNpb25DaGVja2VyVGltZXIoKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5pc1VwZ3JhZGVOZWVkZWQobGF0ZXN0VmVyc2lvbkluZm8ucmV2aXNpb24pKSB7XG4gICAgICB0aGlzLnVwZ3JhZGVBcHBsaWNhdGlvbihsYXRlc3RWZXJzaW9uSW5mbyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IGxvZzogc3RyaW5nID0gYEN1cnJlbnQgdmVyc2lvbiBpcyBhbHJlYWR5IHVwIHRvIGRhdGU6ICR7Q2xpZW50U2V0dGluZ3MuZ2V0Q3VycmVudEFwcGxpY2F0aW9uVmVyc2lvbigpfWA7XG4gICAgICB0aGlzLnNldEFwcFVwZGF0ZVN0YXR1cyhBY3Rpb25TdGF0dXMuU3VjY2VzcywgbG9nKTtcbiAgICAgIExvZ2dlci5pbnN0YW5jZS5sY21zLmluZm8obG9nKTtcbiAgICAgIHRoaXMuc3RhcnRWZXJzaW9uQ2hlY2tlclRpbWVyKCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBpc1VwZ3JhZGVOZWVkZWQobGF0ZXN0TGNtc1ZlcnNpb246IG51bWJlcikge1xuICAgIGNvbnN0IGxhdGVzdFZlcnNpb25UZXh0OiBzdHJpbmcgPSBgTENNUyBsYXRlc3QgdmVyc2lvbiBpczogJHtsYXRlc3RMY21zVmVyc2lvbn1gO1xuICAgIGNvbnN0IGN1cnJlbnRWZXJzaW9uVGV4dDogc3RyaW5nID0gYEN1cnJlbnQgQXBwbGljYXRpb24gVmVyc2lvbjogJHt0aGlzLmdldEN1cnJlbnRWZXJzaW9uKCl9YDtcbiAgICBjb25zdCBzdGFnZWRWZXJzaW9uVGV4dDogc3RyaW5nID0gYFN0YWdlZCBBcHBsaWNhdGlvbiBWZXJzaW9uOiAke3RoaXMuZ2V0U3RhZ2VkVmVyc2lvbigpfWA7XG4gICAgTG9nZ2VyLmluc3RhbmNlLmxjbXMuaW5mbyhgJHtsYXRlc3RWZXJzaW9uVGV4dH0gfCAke2N1cnJlbnRWZXJzaW9uVGV4dH0gfCAke3N0YWdlZFZlcnNpb25UZXh0fWApO1xuICAgIHJldHVybiBsYXRlc3RMY21zVmVyc2lvbiA+IHRoaXMuZ2V0Q3VycmVudFZlcnNpb24oKTtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0Q3VycmVudFZlcnNpb24oKTogbnVtYmVyIHtcbiAgICByZXR1cm4gQ2xpZW50U2V0dGluZ3MuZ2V0Q3VycmVudEFwcGxpY2F0aW9uVmVyc2lvbigpO1xuICB9XG5cbiAgcHJpdmF0ZSBzZXRDdXJyZW50VmVyc2lvbih2ZXJzaW9uOiBudW1iZXIpIHtcbiAgICByZXR1cm4gQ2xpZW50U2V0dGluZ3Muc2V0Q3VycmVudEFwcGxpY2F0aW9uVmVyc2lvbih2ZXJzaW9uKTtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0U3RhZ2VkVmVyc2lvbigpOiBudW1iZXIge1xuICAgIHJldHVybiBDbGllbnRTZXR0aW5ncy5nZXRTdGFnZWRBcHBsaWNhdGlvblZlcnNpb24oKTtcbiAgfVxuXG4gIHByaXZhdGUgdXBncmFkZUFwcGxpY2F0aW9uKHZlcnNpb246IExpZmVjeWNsZUFwcFZlcnNpb25JbmZvKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgTG9nZ2VyLmluc3RhbmNlLmxjbXMuaW5mbyhgVXBncmFkaW5nIGFwcGxpY2F0aW9uIHRvIHZlcnNpb24gJHt2ZXJzaW9uLnJldmlzaW9ufSB2aWEgJHt2ZXJzaW9uLnVybH1gKTtcblxuICAgIHRoaXMuX2FwcERvd25sb2FkRXJyb3JDb3VudCA9IDA7XG4gICAgcmV0dXJuIHRoaXMuYXBwRG93bmxvYWRlcih2ZXJzaW9uKTtcbiAgfVxuXG4gIHByaXZhdGUgYXBwRG93bmxvYWRlciA9ICh2ZXJzaW9uOiBMaWZlY3ljbGVBcHBWZXJzaW9uSW5mbykgPT4ge1xuICAgIGlmICh0aGlzLmlzUGF1c2VkKCkpIHtcbiAgICAgIHRoaXMuc2V0U3RhdGUoU3RhdGVzLlBlbmRpbmcpO1xuICAgICAgTG9nZ2VyLmluc3RhbmNlLmxjbXMubG9nKCdhcHBEb3dubG9hZGVyIHJlcXVlc3QgaW5pdGlhdGVkIHdoZW4gbm90IGFjdGl2ZSwgcXVldWluZyB1cCByZXF1ZXN0Jyk7XG4gICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XG4gICAgfVxuICAgIGlmICh0aGlzLmdldFN0YWdlZFZlcnNpb24oKSA+PSB2ZXJzaW9uLnJldmlzaW9uKSB7XG4gICAgICBpZiAodGhpcy5faXNBY3Rpb25SdW5uaW5nKSB7XG4gICAgICAgIHRoaXMuc2V0QXBwVXBkYXRlU3RhdHVzKEFjdGlvblN0YXR1cy5TdWNjZXNzLCBgJHt2ZXJzaW9uLnJldmlzaW9ufWApO1xuICAgICAgfVxuICAgICAgY29uc3QgdXBkYXRlUHJvbWlzZSA9IEFwcGxpY2F0aW9uLnVwZGF0ZSh0aGlzLmdldEJ1bmRsZVBhdGgodmVyc2lvbi5yZXZpc2lvbikpO1xuICAgICAgdGhpcy5zdGFydFZlcnNpb25DaGVja2VyVGltZXIoKTtcbiAgICAgIHJldHVybiB1cGRhdGVQcm9taXNlO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gQ3Btc1Nlc3Npb24uZ2V0SW5zdGFuY2UoKS5zZW5kUmVxdWVzdCh2ZXJzaW9uLnVybClcbiAgICAgIC50aGVuKChyZXNwb25zZSkgPT4ge1xuICAgICAgICBMb2dnZXIuaW5zdGFuY2UubGNtcy5pbmZvKGBBcHAgZG93bmxvYWQgcmVzcG9uc2UgY29kZTogJHtyZXNwb25zZS5zdGF0dXNDb2RlfWApO1xuXG4gICAgICAgIHRoaXMudXBkYXRlQXBwbGljYXRpb24ocmVzcG9uc2UuY29udGVudC50b0ZpbGUoTGlmZWN5Y2xlTWFuYWdlci5URU1QX1NBVkVfUEFUSCksIHZlcnNpb24ucmV2aXNpb24pO1xuICAgICAgICB0aGlzLnN0YXJ0VmVyc2lvbkNoZWNrZXJUaW1lcigpO1xuXG4gICAgICB9LCAoZSkgPT4ge1xuICAgICAgICBMb2dnZXIuaW5zdGFuY2UubGNtcy5lcnJvcihgZmlsZSBkb3dubG9hZGVkIGVycm9yOiAke2V9YCk7XG4gICAgICAgIHRoaXMuc2V0QXBwVXBkYXRlU3RhdHVzKEFjdGlvblN0YXR1cy5GYWlsdXJlLCBgZmlsZSBkb3dubG9hZGVkIGVycm9yOiAke2V9YCk7XG4gICAgICAgIGlmICh0aGlzLl9hcHBEb3dubG9hZEVycm9yQ291bnQgPCBDbGllbnRTZXR0aW5ncy5nZXRMY21zQXBwRG93bmxvYWRSZXRyeUNvdW50KCkpIHtcbiAgICAgICAgICB0aGlzLl9hcHBEb3dubG9hZEVycm9yQ291bnQrKztcbiAgICAgICAgICBjb25zdCBlcnJvckNvdW50OiBudW1iZXIgPSB0aGlzLl9hcHBEb3dubG9hZEVycm9yQ291bnQ7XG4gICAgICAgICAgY29uc3QgcmV0cnlBdHRlbXB0VGV4dDogc3RyaW5nID0gYEF0dGVtcHRpbmcgdG8gcmV0cnkgYXBwbGljYXRpb24gZG93bmxvYWQuICBSZXRyeSAke2Vycm9yQ291bnR9YDtcbiAgICAgICAgICBMb2dnZXIuaW5zdGFuY2UubGNtcy5lcnJvcihgJHtyZXRyeUF0dGVtcHRUZXh0fSBvZiAke0NsaWVudFNldHRpbmdzLmdldExjbXNBcHBEb3dubG9hZFJldHJ5Q291bnQoKX1gKTtcbiAgICAgICAgICB0aGlzLl90aW1lcklkID0gdGltZXIuc2V0VGltZW91dCggKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5hcHBEb3dubG9hZGVyKHZlcnNpb24pO1xuICAgICAgICAgIH0sIENsaWVudFNldHRpbmdzLmdldExjbXNBcHBEb3dubG9hZFJldHJ5UGVyaW9kKCkpO1xuICAgICAgICAgIGNvbnN0IHJldHJ5UGVyaW9kOiBudW1iZXIgPSBDbGllbnRTZXR0aW5ncy5nZXRMY21zQXBwRG93bmxvYWRSZXRyeVBlcmlvZCgpO1xuICAgICAgICAgIGNvbnN0IHJldHJ5VGltZXJUZXh0OiBzdHJpbmcgPSBgU2V0dGluZyBMQ01TIEFwcCBEb3dubG9hZCByZXRyeSB0aW1lcjogJHtyZXRyeVBlcmlvZH1gO1xuICAgICAgICAgIExvZ2dlci5pbnN0YW5jZS5sY21zLmluZm8oYCR7cmV0cnlUaW1lclRleHR9IHwgdGltZXIgaWQ6ICR7dGhpcy5fdGltZXJJZH1gKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBMb2dnZXIuaW5zdGFuY2UubGNtcy5lcnJvcignTWF4IGFwcGxpY2F0aW9uIGRvd25sb2FkIHJldHJpZXMgZmFpbGVkLicpO1xuICAgICAgICAgIHRoaXMuc3RhcnRWZXJzaW9uQ2hlY2tlclRpbWVyKCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgZ2V0QnVuZGxlRm9sZGVyKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIFJlcXVpcmVVdGlsLmdldERlZmluaXRpb25CdW5kbGVGb2xkZXIoKTtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0QnVuZGxlUGF0aCh2ZXJzaW9uOiBudW1iZXIpOiBzdHJpbmcge1xuICAgIHJldHVybiBmcy5wYXRoLmpvaW4odGhpcy5nZXRCdW5kbGVGb2xkZXIoKSxcbiAgICAgICAgdGhpcy5nZXRCdW5kbGVGaWxlbmFtZSh2ZXJzaW9uKSk7XG4gIH1cblxuICBwcml2YXRlIGdldEJ1bmRsZUZpbGVuYW1lKHZlcnNpb246IG51bWJlcik6IHN0cmluZyB7XG4gICAgcmV0dXJuIExpZmVjeWNsZU1hbmFnZXIuQlVORExFX0ZJTEVfUFJFRklYICtcbiAgICAgICAgJy4nICsgdmVyc2lvbiArICcuJyArIExpZmVjeWNsZU1hbmFnZXIuQlVORExFX0ZJTEVfU1VGRklYO1xuICB9XG5cbiAgcHJpdmF0ZSB1cGRhdGVBcHBsaWNhdGlvbihzb3VyY2VGaWxlOiBmcy5GaWxlLCBuZXdWZXJzaW9uOiBudW1iZXIpOiB2b2lkIHtcbiAgICBMb2dnZXIuaW5zdGFuY2UubGNtcy5pbmZvKCdVcGRhdGluZyBBcHBsaWNhdGlvbicpO1xuICAgIExvZ2dlci5pbnN0YW5jZS5sY21zLmluZm8oYHNvdXJjZUZpbGU6ICR7c291cmNlRmlsZS5wYXRofWApO1xuXG4gICAgY29uc3QgYXBwRXh0cmFjdFdvcmtlciA9IG5ldyBUc1dvcmtlcigpO1xuXG4gICAgYXBwRXh0cmFjdFdvcmtlci5vbm1lc3NhZ2UgPSBtc2cgPT4ge1xuICAgICAgaWYgKG1zZy5kYXRhLmVycikge1xuICAgICAgICBMb2dnZXIuaW5zdGFuY2UubGNtcy5lcnJvcihgQXBwIGV4dHJhY3Rpb24gZmFpbGVkOiAke21zZy5kYXRhLmVycn1gKTtcbiAgICAgICAgaWYgKHRoaXMuX2lzQWN0aW9uUnVubmluZykge1xuICAgICAgICAgIHRoaXMuc2V0QXBwVXBkYXRlU3RhdHVzKEFjdGlvblN0YXR1cy5GYWlsdXJlLCBgQXBwIGV4dHJhY3Rpb24gZmFpbGVkOiAke21zZy5kYXRhLmVycn1gKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKHRoaXMuX2lzQWN0aW9uUnVubmluZykge1xuICAgICAgICAgIHRoaXMuc2V0QXBwVXBkYXRlU3RhdHVzKEFjdGlvblN0YXR1cy5TdWNjZXNzLCBgJHtuZXdWZXJzaW9ufWApO1xuICAgICAgICB9XG4gICAgICAgIExvZ2dlci5pbnN0YW5jZS5sY21zLmluZm8oYEFwcCBleHRyYWN0ZWQgc3VjY2Vzc2Z1bGx5IHdpdGggbmV3IHZlcnNpb246ICR7bmV3VmVyc2lvbn1gKTtcbiAgICAgICAgQ2xpZW50U2V0dGluZ3Muc2V0U3RhZ2VkQXBwbGljYXRpb25WZXJzaW9uKG5ld1ZlcnNpb24pO1xuICAgICAgICBBcHBsaWNhdGlvbi51cGRhdGUodGhpcy5nZXRCdW5kbGVQYXRoKG5ld1ZlcnNpb24pKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgYXBwRXh0cmFjdFdvcmtlci5vbmVycm9yID0gZXJyID0+IHtcbiAgICAgIExvZ2dlci5pbnN0YW5jZS5sY21zLmVycm9yKGBVbmNhdWdodCBhcHAgZXh0cmFjdGlvbiBmYWlsdXJlOiAke2Vycn1gKTtcbiAgICAgIHRoaXMuc2V0QXBwVXBkYXRlU3RhdHVzKEFjdGlvblN0YXR1cy5GYWlsdXJlLCBgVW5jYXVnaHQgYXBwIGV4dHJhY3Rpb24gZmFpbHVyZTogJHtlcnJ9YCk7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9O1xuXG4gICAgYXBwRXh0cmFjdFdvcmtlci5wb3N0TWVzc2FnZSh7XG4gICAgICBidW5kbGVEZXN0OiB0aGlzLmdldEJ1bmRsZVBhdGgobmV3VmVyc2lvbiksXG4gICAgICB6aXBEZXN0UGF0aDogTGlmZWN5Y2xlTWFuYWdlci5aSVBfRVhUUkFDVF9QQVRILFxuICAgICAgemlwU291cmNlOiBMaWZlY3ljbGVNYW5hZ2VyLlRFTVBfU0FWRV9QQVRILFxuICAgIH0pO1xuICB9XG59XG4iLCJpbXBvcnQgKiBhcyBhcHAgZnJvbSAndG5zLWNvcmUtbW9kdWxlcy9hcHBsaWNhdGlvbic7XG5pbXBvcnQgeyBMb2dnZXIgfSBmcm9tICdtZGstY29yZS91dGlscy9Mb2dnZXInO1xuXG5leHBvcnQgY2xhc3MgUGF0aHMge1xuXG4gIHB1YmxpYyBzdGF0aWMgZ2V0T3ZlcnJpZGVQYXRoKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIFBhdGhzLmdldFByaXZhdGVFeHRlcm5hbFN0b3JhZ2VQYXRoKCk7XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGdldFNhdmVkU2V0dGluZ3NQYXRoKCk6IHN0cmluZyB7XG4gICAgLy8gY2hhbmdlIHRvIGludGVybmFsIHN0b3JhZ2UgZHVlIHRvIHRocmVhdGVuIG1vZGVsaW5nXG4gICAgcmV0dXJuIFBhdGhzLmdldFByaXZhdGVJbnRlcm5hbFN0b3JhZ2VQYXRoKCk7XG4gIH1cblxuICBwcml2YXRlIHN0YXRpYyBnZXRQcml2YXRlRXh0ZXJuYWxTdG9yYWdlUGF0aCgpOiBzdHJpbmcge1xuICAgIHRyeSB7XG4gICAgICBsZXQgb3ZlcnJpZGVQYXRoOiBzdHJpbmcgPSB1bmRlZmluZWQ7XG4gICAgICBpZiAoUGF0aHMuaXNFeHRlcm5hbFN0b3JhZ2VNb3VudGVkKCkgfHwgUGF0aHMuaXNFeHRlcm5hbFN0b3JhZ2VNb3VudGVkUmVhZE9ubHkoKSkge1xuICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bWF4LWxpbmUtbGVuZ3RoXG4gICAgICAgIExvZ2dlci5pbnN0YW5jZS5wYXRocy5pbmZvKExvZ2dlci5QQVRIU19FWFRFUk5BTF9TVE9SQUdFX01PVU5UX1NUQVRVUywgUGF0aHMuaXNFeHRlcm5hbFN0b3JhZ2VNb3VudGVkKCksIFBhdGhzLmlzRXh0ZXJuYWxTdG9yYWdlTW91bnRlZFJlYWRPbmx5KCkpO1xuICAgICAgICBcbiAgICAgICAgbGV0IGNvbnRleHQgPSBhcHAuYW5kcm9pZC5jb250ZXh0O1xuICAgICAgICBvdmVycmlkZVBhdGggPSBjb250ZXh0LmdldEV4dGVybmFsRmlsZXNEaXIobnVsbCkuZ2V0QWJzb2x1dGVQYXRoKCk7XG4gICAgICAgIFxuICAgICAgICAvLyB1bmNvbW1lbnQgZm9yIHRlbXAgZGVidWdnaW5nIGFzIEV4dGVybmFsIFN0b3JhZ2UgaXNuJ3QgYWx3YXlzXG4gICAgICAgIC8vIFBhdGhzLnByaW50RGVidWcoKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBvdmVycmlkZVBhdGg7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIC8vIEV2ZW4gd2l0aCBleHRlcm5hbCBzdG9yYWdlIGJlaW5nIG1vdW50ZWQsIGl0cyBwb3NzaWJsZSBmb3IgdGhpcyB0byBzdGlsbCB0aHJvdyBhbmQgZXJyb3JcbiAgICAgIC8vIHdoZW4gYXR0ZW1wdGluZyB0byBhY2Nlc3MgdGhlIHByaXZhdGUgZXh0ZXJuYWwgc3RvcmFnZS5cbiAgICAgIExvZ2dlci5pbnN0YW5jZS5wYXRocy5lcnJvcihMb2dnZXIuUEFUSFNfRkFJTEVEX0FDQ0VTU1NfRVhURVJOQUxfU1RPUkFHRSwgZXJyb3IpO1xuXG4gICAgICByZXR1cm4gYGA7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBzdGF0aWMgZ2V0UHJpdmF0ZUludGVybmFsU3RvcmFnZVBhdGgoKTogc3RyaW5nIHtcbiAgICB0cnkge1xuICAgICAgbGV0IG92ZXJyaWRlUGF0aDogc3RyaW5nID0gdW5kZWZpbmVkO1xuICAgICAgbGV0IGNvbnRleHQgPSBhcHAuYW5kcm9pZC5jb250ZXh0O1xuICAgICAgb3ZlcnJpZGVQYXRoID0gY29udGV4dC5nZXRGaWxlc0RpcigpLmdldEFic29sdXRlUGF0aCgpO1xuICAgICAgcmV0dXJuIG92ZXJyaWRlUGF0aDtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgLy8gRXZlbiB3aXRoIGV4dGVybmFsIHN0b3JhZ2UgYmVpbmcgbW91bnRlZCwgaXRzIHBvc3NpYmxlIGZvciB0aGlzIHRvIHN0aWxsIHRocm93IGFuZCBlcnJvclxuICAgICAgLy8gd2hlbiBhdHRlbXB0aW5nIHRvIGFjY2VzcyB0aGUgcHJpdmF0ZSBleHRlcm5hbCBzdG9yYWdlLlxuICAgICAgTG9nZ2VyLmluc3RhbmNlLnBhdGhzLmVycm9yKExvZ2dlci5QQVRIU19GQUlMRURfQUNDRVNTU19JTlRFUk5BTF9TVE9SQUdFLCBlcnJvcik7XG5cbiAgICAgIHJldHVybiBgYDtcbiAgICB9XG4gIH1cblxuICAvLyBhdmFpbGFibGUgYXQgc3RhcnR1cC5cbiAgcHJpdmF0ZSBzdGF0aWMgcHJpbnREZWJ1ZygpOiB2b2lkIHtcbiAgICBsZXQgZVNEID0gYW5kcm9pZC5vcy5FbnZpcm9ubWVudC5nZXRFeHRlcm5hbFN0b3JhZ2VEaXJlY3RvcnkoKTtcbiAgICBsZXQgZVNQRCA9IGFuZHJvaWQub3MuRW52aXJvbm1lbnQuZ2V0RXh0ZXJuYWxTdG9yYWdlUHVibGljRGlyZWN0b3J5KGFuZHJvaWQub3MuRW52aXJvbm1lbnQuRElSRUNUT1JZX0RPV05MT0FEUyk7XG4gICAgbGV0IGVTUyA9IGFuZHJvaWQub3MuRW52aXJvbm1lbnQuZ2V0RXh0ZXJuYWxTdG9yYWdlU3RhdGUoKTtcbiAgICBsZXQgaUVTRCA9IGFuZHJvaWQub3MuRW52aXJvbm1lbnQuaXNFeHRlcm5hbFN0b3JhZ2VFbXVsYXRlZCgpO1xuICAgIGxldCBpRVNSID0gYW5kcm9pZC5vcy5FbnZpcm9ubWVudC5pc0V4dGVybmFsU3RvcmFnZVJlbW92YWJsZSgpO1xuICAgIExvZ2dlci5pbnN0YW5jZS5wYXRocy5sb2coYGVTRDogJHtlU0R9IHwgZVNQRDogJHtlU1BEfSB8IGVTUzogJHtlU1N9IHwgaUVTRDogJHtpRVNEfSB8IGlFU1I6ICR7aUVTUn1gKTtcbiAgICBcbiAgICBsZXQgY29udGV4dCA9IGFwcC5hbmRyb2lkLmNvbnRleHQ7XG5cbiAgICBsZXQgcFBhdGggPSBjb250ZXh0LmdldEV4dGVybmFsRmlsZXNEaXIobnVsbCkuZ2V0QWJzb2x1dGVQYXRoKCk7XG4gICAgTG9nZ2VyLmluc3RhbmNlLnBhdGhzLmxvZyhgcHJpdmF0ZSBleHRlcm5hbCBzdG9yYWdlIHBhdGg6ICR7cFBhdGh9YCk7XG4gIH1cblxuICBwcml2YXRlIHN0YXRpYyBpc0V4dGVybmFsU3RvcmFnZU1vdW50ZWQoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIGFuZHJvaWQub3MuRW52aXJvbm1lbnQuZ2V0RXh0ZXJuYWxTdG9yYWdlU3RhdGUoKSA9PT0gYW5kcm9pZC5vcy5FbnZpcm9ubWVudC5NRURJQV9NT1VOVEVEO1xuICB9XG5cbiAgcHJpdmF0ZSBzdGF0aWMgaXNFeHRlcm5hbFN0b3JhZ2VNb3VudGVkUmVhZE9ubHkoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIGFuZHJvaWQub3MuRW52aXJvbm1lbnQuZ2V0RXh0ZXJuYWxTdG9yYWdlU3RhdGUoKSA9PT0gYW5kcm9pZC5vcy5FbnZpcm9ubWVudC5NRURJQV9NT1VOVEVEX1JFQURfT05MWTtcbiAgfVxufVxuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiQG5hdGl2ZXNjcmlwdC9jb3JlXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIkBuYXRpdmVzY3JpcHQvY29yZS9idW5kbGUtZW50cnktcG9pbnRzXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIkBuYXRpdmVzY3JpcHQvY29yZS91aS9mcmFtZVwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJAbmF0aXZlc2NyaXB0L2NvcmUvdWkvZnJhbWUvYWN0aXZpdHlcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiQG5hdGl2ZXNjcmlwdC9jb3JlL3VpL3N0eWxpbmcvc3R5bGUtc2NvcGVcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwibWRrLWNvcmUvQXBwbGljYXRpb25cIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwibWRrLWNvcmUvQ3VzdG9tRXZlbnRIYW5kbGVyXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIm1kay1jb3JlL0V2ZW50SGFuZGxlclwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJtZGstY29yZS9hY3Rpb25zL0FjdGlvbkZhY3RvcnlcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwibWRrLWNvcmUvYWN0aW9ucy9JQWN0aW9uRmFjdG9yeVwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJtZGstY29yZS9idWlsZGVycy9BcHBsaWNhdGlvbkRhdGFCdWlsZGVyXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIm1kay1jb3JlL2NvbW1vbi9NREtOYXZpZ2F0aW9uVHlwZVwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJtZGstY29yZS9jb250ZXh0L0NvbnRleHRcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwibWRrLWNvcmUvY29udGV4dC9JQ29udGV4dFwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJtZGstY29yZS9jb250cm9scy9Db250cm9sRmFjdG9yeVN5bmNcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwibWRrLWNvcmUvY29udHJvbHMvSUNvbnRyb2xGYWN0b3J5XCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIm1kay1jb3JlL2RhdGEvSURhdGFTZXJ2aWNlXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIm1kay1jb3JlL2RhdGEvSVJlc3RTZXJ2aWNlXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIm1kay1jb3JlL2RhdGEvT0RhdGFTZXJ2aWNlXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIm1kay1jb3JlL2RhdGEvUmVzdFNlcnZpY2VcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwibWRrLWNvcmUvZGVmaW5pdGlvbnMvRGVmaW5pdGlvblByb3ZpZGVyXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIm1kay1jb3JlL2RlZmluaXRpb25zL0RlbW9CdW5kbGVEZWZpbml0aW9uTG9hZGVyXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIm1kay1jb3JlL2RlZmluaXRpb25zL0lEZWZpbml0aW9uUHJvdmlkZXJcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwibWRrLWNvcmUvZGVmaW5pdGlvbnMvUGF0aFRvRXhwb3J0TmFtZVwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJtZGstY29yZS9lcnJvckhhbmRsaW5nL0Vycm9yTWVzc2FnZVwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJtZGstY29yZS9saWZlY3ljbGVNYW5hZ2VtZW50L0xpZmVjeWNsZU1hbmFnZXJcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwibWRrLWNvcmUvcGFnZXMvTURLUGFnZVwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJtZGstY29yZS9wYWdlcy9Nb2RhbEZyYW1lXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIm1kay1jb3JlL3BhZ2VzL1BhZ2VSZW5kZXJlclwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJtZGstY29yZS9wYWdlcy9UYWJGcmFtZVwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJtZGstY29yZS9wYWdlcy9XZWxjb21lUGFnZVwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJtZGstY29yZS9zdG9yYWdlL0NsaWVudFNldHRpbmdzXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIm1kay1jb3JlL3N0b3JhZ2UvUGF0aHNcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwibWRrLWNvcmUvc3RvcmFnZS9TZWN1cmVTdG9yZVwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJtZGstY29yZS9zdHlsaW5nL1NES1N0eWxpbmdNYW5hZ2VyXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIm1kay1jb3JlL3RhcmdldHBhdGgvc2VnbWVudHMvSVNlZ21lbnRGYWN0b3J5XCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIm1kay1jb3JlL3RhcmdldHBhdGgvc2VnbWVudHMvU2VnbWVudEZhY3RvcnlcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwibWRrLWNvcmUvdXRpbHMvQXBwU2V0dGluZ3NNYW5hZ2VyXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIm1kay1jb3JlL3V0aWxzL0NvbnNvbGVXcml0ZXJcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwibWRrLWNvcmUvdXRpbHMvSTE4bkhlbHBlclwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJtZGstY29yZS91dGlscy9JMThuTGFuZ3VhZ2VcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwibWRrLWNvcmUvdXRpbHMvSW1hZ2VIZWxwZXJcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwibWRrLWNvcmUvdXRpbHMvTG9nZ2VyXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIm1kay1jb3JlL3V0aWxzL1JlcXVpcmVVdGlsXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIm1kay1jb3JlL3V0aWxzL1R5cGVDb252ZXJ0ZXJcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwibWRrLXNhcFwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJuYXRpdmVzY3JpcHQtdWktc2lkZWRyYXdlclwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJ0bnMtY29yZS1tb2R1bGVzL2FwcGxpY2F0aW9uXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInRucy1jb3JlLW1vZHVsZXMvZGF0YS9vYnNlcnZhYmxlL29ic2VydmFibGVcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwidG5zLWNvcmUtbW9kdWxlcy9maWxlLXN5c3RlbVwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJ0bnMtY29yZS1tb2R1bGVzL2dsb2JhbHNcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwidG5zLWNvcmUtbW9kdWxlcy90aW1lclwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJ0bnMtY29yZS1tb2R1bGVzL3RyYWNlXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInRucy1jb3JlLW1vZHVsZXMvdWkvZGlhbG9nc1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJ0bnMtY29yZS1tb2R1bGVzL3VpL2ZyYW1lXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInRucy1jb3JlLW1vZHVsZXMveG1sXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInppcC1wbHVnaW5cIik7Il0sInNvdXJjZVJvb3QiOiIifQ==
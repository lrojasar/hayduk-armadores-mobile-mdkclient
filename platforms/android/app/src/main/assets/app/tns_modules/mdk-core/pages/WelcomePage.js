"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Application_1 = require("../Application");
var page_1 = require("tns-core-modules/ui/page");
var mdk_sap_1 = require("mdk-sap");
var ClientSettings_1 = require("../storage/ClientSettings");
var Context_1 = require("../context/Context");
var PageRenderer_1 = require("./PageRenderer");
var LifecycleManager_1 = require("../lifecycleManagement/LifecycleManager");
var Logger_1 = require("../utils/Logger");
var mdk_sap_2 = require("mdk-sap");
var app = require("tns-core-modules/application");
var CustomEventHandler_1 = require("../CustomEventHandler");
var ChangeUserPasscodeAction_1 = require("../actions/ChangeUserPasscodeAction");
var VerifyPasscodeAction_1 = require("../actions/VerifyPasscodeAction");
var ClientSettings_2 = require("../storage/ClientSettings");
var application = require("tns-core-modules/application");
var ModalFrame_1 = require("./ModalFrame");
var frame_1 = require("tns-core-modules/ui/frame");
var MDKPage_1 = require("./MDKPage");
var TabFrame_1 = require("./TabFrame");
var MDKNavigationType_1 = require("../common/MDKNavigationType");
var SDKStylingManager_1 = require("../styling/SDKStylingManager");
var WelcomePage = (function (_super) {
    __extends(WelcomePage, _super);
    function WelcomePage() {
        var _this = _super.call(this) || this;
        _this.actionBarHidden = true;
        _this.context = new Context_1.Context();
        WelcomePage.welcomeScreenBridge = mdk_sap_1.WelcomeScreenBridge.getInstance();
        var params = ClientSettings_1.ClientSettings.getOnboardingParams();
        var isDemoKey = 'IsDemoAvailable';
        params[isDemoKey] = ClientSettings_1.ClientSettings.isDemoApplicationAvailable();
        params = WelcomePage.getConnectionInfoToastMessage(params);
        params = WelcomePage.getCacheSettings(params);
        _this.aScreen = WelcomePage.welcomeScreenBridge.create(params, _this);
        return _this;
    }
    WelcomePage.changeUserPasscode = function () {
        LifecycleManager_1.LifecycleManager.getInstance().pause();
        return WelcomePage.welcomeScreenBridge.changeUserPasscode().then(function (result) {
            if (application.ios) {
                LifecycleManager_1.LifecycleManager.getInstance().unPause();
            }
            return result;
        }).catch(function (error) {
            LifecycleManager_1.LifecycleManager.getInstance().unPause();
            throw error;
        });
    };
    WelcomePage.verifyPasscode = function (params) {
        LifecycleManager_1.LifecycleManager.getInstance().pause();
        return WelcomePage.welcomeScreenBridge.verifyPasscode(params).then(function (result) {
            if (application.ios) {
                LifecycleManager_1.LifecycleManager.getInstance().unPause();
            }
            return result;
        }).catch(function (error) {
            LifecycleManager_1.LifecycleManager.getInstance().unPause();
            throw error;
        });
    };
    WelcomePage.restoreOnRelaunch = function (params) {
        return WelcomePage.welcomeScreenBridge.restoreOnRelaunch(params).then(function (result) {
            return result;
        }).catch(function (error) {
            return WelcomePage.resetClientHelper().then(function () {
                throw error;
            });
        });
    };
    WelcomePage.applicationWillEnterForeground = function () {
        return WelcomePage.welcomeScreenBridge.applicationWillEnterForeground().then(function (result) {
            return result;
        }).catch(function (error) {
            return WelcomePage.resetClientHelper().then(function () {
                throw error;
            });
        }).then(function () {
            if (app.ios) {
                WelcomePage.manageBlurScreen(ClientSettings_1.BlurScreenActions.Remove);
                return false;
            }
        });
    };
    WelcomePage.manageBlurScreen = function (action) {
        var params = { ManageBlurScreen: action, Modal: ModalFrame_1.ModalFrame.isModal(TabFrame_1.TabFrame.getCorrectTopmostFrame()) };
        WelcomePage.welcomeScreenBridge.manageBlurScreen(params);
    };
    WelcomePage.resetClientHelper = function () {
        var modalPage;
        if (ModalFrame_1.ModalFrame.isTopMostModal()) {
            modalPage = frame_1.Frame.topmost().currentPage;
        }
        else if (TabFrame_1.TabFrame.isTopMostTab()) {
            var topFrame = frame_1.Frame.topmost();
            if (topFrame && topFrame.currentPage && topFrame.currentPage.modal) {
                modalPage = topFrame.currentPage.modal;
            }
        }
        if (modalPage) {
            ModalFrame_1.ModalFrame.close(modalPage);
        }
        if (app.ios) {
            var rootVC = UIApplication.sharedApplication.keyWindow.rootViewController;
            if (rootVC !== null) {
                if (rootVC.presentedViewController !== null) {
                    rootVC.dismissViewControllerAnimatedCompletion(false, null);
                }
            }
        }
        return Application_1.Application.resetClient().catch(function (error) {
            var reason = "FATAL ERROR: RESET FAILED: UNABLE TO CLEAR OFFLINE STORE: '" + error + "'";
            Logger_1.Logger.instance.startup.error(reason);
            Application_1.Application.resetAppState();
        }).then(function () {
            MDKPage_1.MDKPage.setResetActionInProgress(true);
            Application_1.Application.reInitializeLogger();
            return PageRenderer_1.PageRenderer.pushNavigation(undefined, true, MDKNavigationType_1.MDKNavigationType.Root);
        }).then(function (result) {
            Application_1.Application.setMainPageRendered(false);
        });
    };
    WelcomePage.reInitializePage = function () {
        var params = ClientSettings_1.ClientSettings.getOnboardingParams();
        var isDemoKey = 'IsDemoAvailable';
        params[isDemoKey] = ClientSettings_1.ClientSettings.isDemoApplicationAvailable();
        params = WelcomePage.getConnectionInfoToastMessage(params);
        params = WelcomePage.getCacheSettings(params);
        WelcomePage.welcomeScreenBridge.reInitializePage(params);
    };
    WelcomePage.applicationWillEnterBackground = function () {
        WelcomePage.welcomeScreenBridge.applicationWillEnterBackground();
    };
    WelcomePage.getConnectionInfoToastMessage = function (params) {
        var isOnboardingKey = 'IsOnboarding';
        if (params[isOnboardingKey] === true) {
            var connectionInfoToastMessageKey = 'connectionInfoToastMessage';
            params[connectionInfoToastMessageKey] = ClientSettings_1.ClientSettings.getConnecionInfoToastMessage();
            ClientSettings_1.ClientSettings.setConnecionInfoToastMessage('');
        }
        return params;
    };
    WelcomePage.getCacheSettings = function (params) {
        var cacheSettings = ClientSettings_1.ClientSettings.getCacheSettings();
        if (cacheSettings) {
            var cacheSettingsKey = 'CacheSettings';
            params[cacheSettingsKey] = cacheSettings;
        }
        return params;
    };
    WelcomePage.fireChangeUserPasscodeSuccessOrFailureAction = function (status) {
        ChangeUserPasscodeAction_1.ChangeUserPasscodeAction.postExecute(status);
    };
    WelcomePage.fireVerifyPasscodeSuccessOrFailureAction = function (status) {
        VerifyPasscodeAction_1.VerifyPasscodeAction.postExecute(status);
    };
    WelcomePage.prototype.onLoaded = function () {
        _super.prototype.onLoaded.call(this);
        SDKStylingManager_1.SDKStylingManager.applyBrandingStyles();
        if (app.ios) {
            var platform = 'ios';
            this[platform].addChildViewController(this.aScreen);
            this[platform].view.addSubview(this.aScreen.view);
        }
        else {
            if (ClientSettings_1.ClientSettings.isOnboardingInProgress()) {
                WelcomePage.welcomeScreenBridge.onLoaded();
            }
        }
    };
    WelcomePage.prototype.finishedLoadingRegistrationInfo = function (data) {
        ClientSettings_1.ClientSettings.setUserInfo(data.get('UserId'));
        ClientSettings_1.ClientSettings.setDeviceId(data.get('DeviceId'));
    };
    WelcomePage.prototype.finishedOnboardingWithParams = function (newValue) {
        ClientSettings_1.ClientSettings.setConnectionSettings(newValue);
        ClientSettings_1.ClientSettings.latchBrandedSettings();
        ClientSettings_1.ClientSettings.storeAppLaunchSettings();
        return Application_1.Application.startApplication(newValue);
    };
    WelcomePage.prototype.qrCodeScanComplete = function (queryString) {
        var idx = queryString.indexOf('?');
        ClientSettings_1.ClientSettings.isInAppQRScanFlow = true;
        ClientSettings_1.ClientSettings.processConnectionSettingsFromLaunchURL(queryString.substr(idx + 1));
        this.fetchConnnectionSettings();
    };
    WelcomePage.prototype.setOnboardingStage = function (stage) {
        ClientSettings_1.ClientSettings.setApplicationStage(stage);
    };
    WelcomePage.prototype.finishedRestoringWithParams = function (newValue) {
        CustomEventHandler_1.CustomEventHandler.isPasscodeScreenDisplaying = false;
        CustomEventHandler_1.CustomEventHandler.displayPasscodeInputScreen = false;
        if (newValue.get('RestoreStatus') === 'Reset') {
            ClientSettings_1.ClientSettings.setApplicationStage('Welcome');
            Application_1.Application.setMainPageRendered(false);
            setTimeout(function () {
                return WelcomePage.resetClientHelper();
            }, 10);
        }
        else if (newValue.get('RestoreStatus') === 'Relaunched' || !Application_1.Application.isMainPageRendered()) {
            Application_1.Application.launchAppMainPage(true);
            Application_1.Application.setMainPageRendered(true);
            CustomEventHandler_1.CustomEventHandler.isReLaunchInProgress = false;
            ClientSettings_1.ClientSettings.setApplicationStage('InApplication');
            Application_1.Application.setOnboardingCompleted(true);
            var eventData = {
                android: {},
                eventName: 'relaunched',
                object: application,
            };
            Application_1.Application.onResume(eventData);
        }
        else if (newValue.get('RestoreStatus') === 'Restored' || newValue.get('RestoreStatus') === 'RestoreNotNeeded') {
            ClientSettings_1.ClientSettings.setApplicationStage('InApplication');
            Application_1.Application.setMainPageRendered(true);
            mdk_sap_2.ActivityIndicator.instance.unhide();
            Application_1.Application.setOnboardingCompleted(true);
            var eventData = {
                android: {},
                eventName: 'restored',
                object: application,
            };
            Application_1.Application.onResume(eventData);
        }
        else if (newValue.get('RestoreStatus') === 'PasscodeChanged') {
            ClientSettings_1.ClientSettings.setPasscodeSource(Number(newValue.get('PasscodeSource')));
            ClientSettings_1.ClientSettings.isUserChangingPasscode = false;
            Application_1.Application.setResumeEventDelayed(false);
            var resumeEventData = Application_1.Application.getPendingResumeEventData();
            if (resumeEventData) {
                Logger_1.Logger.instance.startup.info("Resuming application post password change,"
                    + ("as its resume was delayed! Event Name - " + resumeEventData.eventName));
                Application_1.Application.onResume(resumeEventData);
                Application_1.Application.setPendingResumeEventData(null);
            }
            else {
                Logger_1.Logger.instance.startup.info('Unpausing LCMS Post password change');
                LifecycleManager_1.LifecycleManager.getInstance().unPause();
            }
            mdk_sap_2.ActivityIndicator.instance.unhide();
            CustomEventHandler_1.CustomEventHandler.passcodeChangeActionComplete = 'Success';
        }
        else if (newValue.get('RestoreStatus') === 'PasscodeVerified' || newValue.get('RestoreStatus') === 'VerifyPasscodeRestoreNotNeeded') {
            ClientSettings_1.ClientSettings.isVerifyingPasscode = false;
            Application_1.Application.setResumeEventDelayed(false);
            var resumeEventData = Application_1.Application.getPendingResumeEventData();
            if (resumeEventData) {
                Logger_1.Logger.instance.startup.info("Resuming application post password verify,"
                    + ("as its resume was delayed! Event Name - " + resumeEventData.eventName));
                Application_1.Application.onResume(resumeEventData);
                Application_1.Application.setPendingResumeEventData(null);
            }
            else {
                Logger_1.Logger.instance.startup.info('Unpausing LCMS Post password verify');
                LifecycleManager_1.LifecycleManager.getInstance().unPause();
            }
            mdk_sap_2.ActivityIndicator.instance.unhide();
            CustomEventHandler_1.CustomEventHandler.passcodeVerifyActionComplete = 'Success';
        }
        else if (newValue.get('RestoreStatus') === 'PasscodeVerifyCanceled') {
            ClientSettings_1.ClientSettings.isVerifyingPasscode = false;
            Application_1.Application.setResumeEventDelayed(false);
            var resumeEventData = Application_1.Application.getPendingResumeEventData();
            if (resumeEventData) {
                Logger_1.Logger.instance.startup.info("Resuming application post password verify canceled,"
                    + ("as its resume was delayed! Event Name - " + resumeEventData.eventName));
                Application_1.Application.onResume(resumeEventData);
                Application_1.Application.setPendingResumeEventData(null);
            }
            else {
                Logger_1.Logger.instance.startup.info('Unpausing LCMS Post password verify canceled');
                LifecycleManager_1.LifecycleManager.getInstance().unPause();
            }
            mdk_sap_2.ActivityIndicator.instance.unhide();
            CustomEventHandler_1.CustomEventHandler.passcodeVerifyActionComplete = 'PasscodeVerifyCanceled';
        }
        else if (newValue.get('RestoreStatus') === 'UserSkippedPasscode') {
            CustomEventHandler_1.CustomEventHandler.passcodeChangeActionComplete = 'Success';
            ClientSettings_1.ClientSettings.isUserChangingPasscode = false;
            LifecycleManager_1.LifecycleManager.getInstance().unPause();
            mdk_sap_2.ActivityIndicator.instance.unhide();
            ClientSettings_1.ClientSettings.setPasscodeSource(ClientSettings_2.PasscodeSource.UserOnboardedWithoutPasscode);
        }
        else if (newValue.get('RestoreStatus') === 'PasscodeSourceChanged') {
            ClientSettings_1.ClientSettings.isUserChangingPasscode = false;
            LifecycleManager_1.LifecycleManager.getInstance().unPause();
            mdk_sap_2.ActivityIndicator.instance.unhide();
            ClientSettings_1.ClientSettings.setPasscodeSource(Number(newValue.get('PasscodeSource')));
        }
        else if (newValue.get('RestoreStatus').includes('PasscodeChangeFail')) {
            ClientSettings_1.ClientSettings.isUserChangingPasscode = false;
            mdk_sap_2.ActivityIndicator.instance.unhide();
            if (newValue.get('RestoreStatus').includes('Cancel')) {
                CustomEventHandler_1.CustomEventHandler.passcodeChangeActionComplete = 'PasscodeChangeCanceled';
            }
            else {
                CustomEventHandler_1.CustomEventHandler.passcodeChangeActionComplete = 'Failure';
            }
            var resumeEventData = Application_1.Application.getPendingResumeEventData();
            var shouldResetClient = newValue.get('RestoreStatus').includes('Reset');
            Application_1.Application.setResumeEventDelayed(false);
            if (resumeEventData && !shouldResetClient) {
                Logger_1.Logger.instance.startup.info("Resuming application post password change failure,"
                    + ("/cancel as its resume was delayed! Event Name - " + resumeEventData.eventName));
                Application_1.Application.onResume(resumeEventData);
                Application_1.Application.setPendingResumeEventData(null);
                return;
            }
            LifecycleManager_1.LifecycleManager.getInstance().unPause();
            if (shouldResetClient) {
                setTimeout(function () {
                    return WelcomePage.resetClientHelper();
                }, 10);
            }
        }
    };
    WelcomePage.prototype.fetchConnnectionSettings = function () {
        ClientSettings_1.ClientSettings.getAuthorizationEndpointURL();
        ClientSettings_1.ClientSettings.getAppId();
        ClientSettings_1.ClientSettings.getClientId();
        ClientSettings_1.ClientSettings.getCpmsUrl();
        ClientSettings_1.ClientSettings.getRedirectURL();
        ClientSettings_1.ClientSettings.getTokenEndpointURL();
        ClientSettings_1.ClientSettings.getServiceTimeZoneAbbreviation();
    };
    WelcomePage.welcomeScreenBridge = mdk_sap_1.WelcomeScreenBridge.getInstance();
    return WelcomePage;
}(page_1.Page));
exports.WelcomePage = WelcomePage;
;

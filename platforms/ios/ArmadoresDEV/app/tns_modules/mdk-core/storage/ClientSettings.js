"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AppSettingsManager_1 = require("../utils/AppSettingsManager");
var fs = require("tns-core-modules/file-system");
var LatchedSettings_1 = require("../settings/LatchedSettings");
var LocalOverrideSettings_1 = require("../settings/LocalOverrideSettings");
var BrandedSettings_1 = require("../settings/BrandedSettings");
var DefaultSettings_1 = require("../settings/DefaultSettings");
var SimpleSettings_1 = require("../settings/SimpleSettings");
var PersistentSettings_1 = require("../settings/PersistentSettings");
var rtlDetect = require("rtl-detect");
var DemoBundleDefinitionLoader_1 = require("../definitions/DemoBundleDefinitionLoader");
var Logger_1 = require("../utils/Logger");
var PropertyTypeChecker_1 = require("../utils/PropertyTypeChecker");
var I18nHelper_1 = require("../utils/I18nHelper");
var Paths_1 = require("./Paths");
var mdk_sap_1 = require("mdk-sap");
var app = require("tns-core-modules/application");
var BaseJSONDefinition_1 = require("../definitions/BaseJSONDefinition");
var url = require("url");
var OnboardingState;
(function (OnboardingState) {
    OnboardingState[OnboardingState["OnboardingInProgress"] = 0] = "OnboardingInProgress";
    OnboardingState[OnboardingState["Live"] = 1] = "Live";
    OnboardingState[OnboardingState["Demo"] = 2] = "Demo";
})(OnboardingState = exports.OnboardingState || (exports.OnboardingState = {}));
;
var BlurScreenActions;
(function (BlurScreenActions) {
    BlurScreenActions[BlurScreenActions["Add"] = 0] = "Add";
    BlurScreenActions[BlurScreenActions["Remove"] = 1] = "Remove";
})(BlurScreenActions = exports.BlurScreenActions || (exports.BlurScreenActions = {}));
;
var PasscodeSource;
(function (PasscodeSource) {
    PasscodeSource[PasscodeSource["UserOnboardedWithoutPasscode"] = 0] = "UserOnboardedWithoutPasscode";
    PasscodeSource[PasscodeSource["UserPasscodeOnly"] = 1] = "UserPasscodeOnly";
    PasscodeSource[PasscodeSource["BiometricsOnly"] = 2] = "BiometricsOnly";
    PasscodeSource[PasscodeSource["PasscodeWithBiometrics"] = 3] = "PasscodeWithBiometrics";
})(PasscodeSource = exports.PasscodeSource || (exports.PasscodeSource = {}));
;
var ActivityResultRequestCode;
(function (ActivityResultRequestCode) {
    ActivityResultRequestCode[ActivityResultRequestCode["AttachmentFormCell"] = 3241] = "AttachmentFormCell";
    ActivityResultRequestCode[ActivityResultRequestCode["OpenDocument"] = 9999] = "OpenDocument";
})(ActivityResultRequestCode = exports.ActivityResultRequestCode || (exports.ActivityResultRequestCode = {}));
var ClientSettings = (function () {
    function ClientSettings() {
    }
    ClientSettings.getPasscodeSource = function () {
        return AppSettingsManager_1.AppSettingsManager.instance().getNumber('passcodeSource', 0);
    };
    ClientSettings.setPasscodeSource = function (passcodeSource) {
        ClientSettings.setAppSetting('passcodeSource', passcodeSource);
    };
    ClientSettings.getCurrentApplicationVersion = function () {
        return AppSettingsManager_1.AppSettingsManager.instance().getNumber('applicationVersion', 0);
    };
    ClientSettings.setCurrentApplicationVersion = function (newVersion) {
        ClientSettings.setAppSetting('applicationVersion', newVersion);
    };
    ClientSettings.getStagedApplicationVersion = function () {
        return AppSettingsManager_1.AppSettingsManager.instance().getNumber('applicationVersionStaged', 0);
    };
    ClientSettings.setStagedApplicationVersion = function (newVersion) {
        ClientSettings.setAppSetting('applicationVersionStaged', newVersion);
    };
    ClientSettings.getApplicationServicePaths = function () {
        var path = AppSettingsManager_1.AppSettingsManager.instance().getString('OfflineODataServicePaths', undefined);
        return path ? path.split(',') : [];
    };
    ClientSettings.setApplicationServicePaths = function (list) {
        AppSettingsManager_1.AppSettingsManager.instance().setString('OfflineODataServicePaths', list.toString());
    };
    ClientSettings.setApplicationServicePath = function (path) {
        var paths = this.getApplicationServicePaths();
        if (paths.indexOf(path) === -1) {
            paths.push(path);
            this.setApplicationServicePaths(paths);
        }
    };
    ClientSettings.isOnboardingInProgress = function () {
        return ClientSettings.getOnboardingState() === OnboardingState.OnboardingInProgress;
    };
    ClientSettings.getOnboardingState = function () {
        var value = AppSettingsManager_1.AppSettingsManager.instance().getNumber('OnboardingState', OnboardingState.OnboardingInProgress);
        return value;
    };
    ClientSettings.setOnboardingState = function (newState) {
        ClientSettings.setAppSetting('OnboardingState', newState);
    };
    ClientSettings.isLiveMode = function () {
        return this.getOnboardingState() === OnboardingState.Live;
    };
    ClientSettings.isDemoMode = function () {
        return this.getOnboardingState() === OnboardingState.Demo;
    };
    ClientSettings.getUpdateCSSRuleSetFlag = function () {
        return AppSettingsManager_1.AppSettingsManager.instance().getBoolean('updateCSSRuleSet', false);
    };
    ClientSettings.setUpdateCSSRuleSetFlag = function (flag) {
        ClientSettings.setAppSetting('updateCSSRuleSet', flag);
    };
    ClientSettings.resetApplicationVersions = function () {
        AppSettingsManager_1.AppSettingsManager.instance().remove('applicationVersion');
        AppSettingsManager_1.AppSettingsManager.instance().remove('applicationVersionStaged');
    };
    ClientSettings.resetExtensionControlSourceMap = function () {
        AppSettingsManager_1.AppSettingsManager.instance().remove('ExtensionControlSourceMap');
    };
    ClientSettings.reset = function () {
        ClientSettings.resetApplicationVersions();
        ClientSettings.resetExtensionControlSourceMap();
        AppSettingsManager_1.AppSettingsManager.instance().remove('OfflineODataServicePath');
        AppSettingsManager_1.AppSettingsManager.instance().remove('OnboardingState');
        ClientSettings.setConnecionInfoToastMessage('');
        BaseJSONDefinition_1.BaseJSONDefinition.controlIdNumber = 0;
        this._resetI18nSettings();
        ClientSettings.resetlatchedConnectionSettings();
    };
    ClientSettings.getCpmsUrl = function () {
        return this.trimUrl(this.getConnectionSetting('ConnectionSettings.SapCloudPlatformEndpoint'));
    };
    ClientSettings.getAppId = function () {
        return this.getConnectionSetting('ConnectionSettings.AppId');
    };
    ClientSettings.getScreenSharing = function () {
        return this.getConnectionSetting('ConnectionSettings.EnableScreenSharing');
    };
    ClientSettings.getScreenSharingWithAndroidVersion = function () {
        var sharing = this.getScreenSharing();
        if (sharing === undefined) {
            if (android.os.Build.VERSION.SDK_INT >= 26) {
                sharing = true;
            }
            else {
                sharing = false;
            }
        }
        return sharing;
    };
    ClientSettings.getServiceTimeZoneAbbreviation = function () {
        return this.getConnectionSetting('ConnectionSettings.ServiceTimeZoneAbbreviation');
    };
    ClientSettings.getLcmsVersionCheckMinPeriod = function () {
        return 25 * 60 * 1000;
    };
    ClientSettings.getLcmsVersionCheckRandomMax = function () {
        return 10 * 60 * 1000;
    };
    ClientSettings.getLcmsAppDownloadRetryPeriod = function () {
        return 5 * 60 * 1000;
    };
    ClientSettings.getLcmsAppDownloadRetryCount = function () {
        return 3;
    };
    ClientSettings.getApplicationName = function () {
        var appDisplayName = this.getBrandingSetting('ApplicationDisplayName');
        if (PropertyTypeChecker_1.PropertyTypeChecker.isLocalizableString(appDisplayName)) {
            appDisplayName = I18nHelper_1.I18nHelper.parseLocalizableString(appDisplayName);
        }
        return appDisplayName;
    };
    ClientSettings.getDetailLabelViewTitle = function () {
        var detailTitle = this.getBrandingSetting('DetailLabelViewTitle');
        if (PropertyTypeChecker_1.PropertyTypeChecker.isLocalizableString(detailTitle)) {
            detailTitle = I18nHelper_1.I18nHelper.parseLocalizableString(detailTitle);
        }
        return detailTitle;
    };
    ClientSettings.getDetailLabelViewText = function () {
        var detailText = this.getBrandingSetting('DetailLabelViewText');
        if (PropertyTypeChecker_1.PropertyTypeChecker.isLocalizableString(detailText)) {
            detailText = I18nHelper_1.I18nHelper.parseLocalizableString(detailText);
        }
        return detailText;
    };
    ClientSettings.getAllowCerts = function () {
        return this.getConnectionSetting('ConnectionSettings.AllowCerts');
    };
    ClientSettings.getSignInButtonText = function () {
        var buttonText = this.getBrandingSetting('SigninButtonText');
        if (PropertyTypeChecker_1.PropertyTypeChecker.isLocalizableString(buttonText)) {
            buttonText = I18nHelper_1.I18nHelper.parseLocalizableString(buttonText);
        }
        return buttonText;
    };
    ClientSettings.getClientId = function () {
        return this.getConnectionSetting('ConnectionSettings.ClientId');
    };
    ClientSettings.getAuthorizationEndpointURL = function () {
        return this.getConnectionSetting('ConnectionSettings.AuthorizationEndpointUrl');
    };
    ClientSettings.getRedirectURL = function () {
        return this.getConnectionSetting('ConnectionSettings.RedirectUrl');
    };
    ClientSettings.getTokenEndpointURL = function () {
        return this.getConnectionSetting('ConnectionSettings.TokenUrl');
    };
    ClientSettings.isConnectionSettingsEnableOverrides = function () {
        var enableOverrides = this.getConnectionSetting('ConnectionSettings.EnableOverrides');
        return enableOverrides ? enableOverrides : false;
    };
    ClientSettings.getLogUploadingParams = function () {
        return {
            ApplicationID: ClientSettings.getAppId(),
            EndpointURL: ClientSettings.getCpmsUrl(),
        };
    };
    ClientSettings.getPasscodeTimeout = function () {
        var defaultTimeout = (app.android) ? 120 : 0;
        var timeout = this.getBrandingSetting('PasscodeTimeout');
        return typeof timeout === 'number' ? timeout : defaultTimeout;
    };
    ClientSettings.getOnboardingParams = function () {
        if (!ClientSettings.prioritiesInitialized) {
            ClientSettings.initializeSettings();
        }
        var onboardingParams = {
            AllowCerts: ClientSettings.getAllowCerts(),
            AppNameLabel: ClientSettings.getApplicationName(),
            ApplicationID: ClientSettings.getAppId(),
            AuthorizationEndpointURL: ClientSettings.getAuthorizationEndpointURL(),
            ClientID: ClientSettings.getClientId(),
            CpmsURL: ClientSettings.getCpmsUrl(),
            DefaultAppLanguage: ClientSettings.getDefaultAppLanguage(),
            EncryptDatabase: ClientSettings.getEncryptDatabaseFlag(),
            IsOnboarding: ClientSettings.isOnboardingInProgress(),
            RedirectURL: ClientSettings.getRedirectURL(),
            SkipEula: ClientSettings.skipEula(),
            TokenEndpointURL: ClientSettings.getTokenEndpointURL(),
            EnableOverrides: ClientSettings.isConnectionSettingsEnableOverrides()
        };
        var detailLabelViewText = ClientSettings.getDetailLabelViewText();
        if (detailLabelViewText) {
            var detailLabelViewTextParam = {
                DetailLabelViewText: detailLabelViewText,
            };
            onboardingParams = Object.assign(onboardingParams, detailLabelViewTextParam);
        }
        var detailLabelViewTitle = ClientSettings.getDetailLabelViewTitle();
        if (detailLabelViewTitle) {
            var detailLabelViewTitleParam = {
                DetailLabelViewTitle: detailLabelViewTitle,
            };
            onboardingParams = Object.assign(onboardingParams, detailLabelViewTitleParam);
        }
        var signInButtonText = ClientSettings.getSignInButtonText();
        if (signInButtonText) {
            var signInButtonTextParam = {
                SigninButtonText: signInButtonText,
            };
            onboardingParams = Object.assign(onboardingParams, signInButtonTextParam);
        }
        var urlWhitelist = ClientSettings.getURLWhitelist();
        if (urlWhitelist) {
            var urlWhitelistParam = {
                URLWhitelist: urlWhitelist,
            };
            onboardingParams = Object.assign(onboardingParams, urlWhitelistParam);
        }
        var appSchemeURLWhitelist = ClientSettings.getAppSchemeURLWhitelist();
        if (appSchemeURLWhitelist) {
            var appSchemeURLWhitelistParam = {
                AppSchemeURLWhitelist: appSchemeURLWhitelist,
            };
            onboardingParams = Object.assign(onboardingParams, appSchemeURLWhitelistParam);
        }
        return onboardingParams;
    };
    ClientSettings.skipEula = function () {
        return ClientSettings.getBrandingSetting('SkipEula') || false;
    };
    ClientSettings.getOnboardingCustomizations = function () {
        var onboardingCustomizations = this.getBrandingSetting('OnboardingCustomizations') || {};
        Object.keys(onboardingCustomizations).map(function (key, index) {
            var val = onboardingCustomizations[key];
            if (PropertyTypeChecker_1.PropertyTypeChecker.isLocalizableString(val)) {
                var valStr = val.toString();
                var localizedStr = I18nHelper_1.I18nHelper.parseLocalizableString(val);
                if (app.ios && key === "scanButtonString" && valStr.indexOf(localizedStr) !== -1) {
                    onboardingCustomizations[key] = "";
                }
                else {
                    onboardingCustomizations[key] = localizedStr;
                }
            }
        });
        return onboardingCustomizations;
    };
    ClientSettings.getCacheSettings = function () {
        return this.getBrandingSetting('CacheSettings');
    };
    ClientSettings.validateOnboardingConnectionParamsExist = function () {
        var connectionObj = ClientSettings.getOnboardingParams();
        var nonConnectionParams = ['AppNameLabel', 'DetailLabelViewText', 'EncryptDatabase',
            'PasscodePolicySettings', 'IsOnboarding', 'AllowCerts', 'SkipEula'];
        var allSettings = Object.keys(connectionObj);
        for (var _i = 0, allSettings_1 = allSettings; _i < allSettings_1.length; _i++) {
            var setting = allSettings_1[_i];
            if (nonConnectionParams.indexOf(setting) < 0) {
                if (!ClientSettings.isValid(connectionObj[setting])) {
                    Logger_1.Logger.instance.startup.error(Logger_1.Logger.STARTUP_SETTING_KEY_INCORRECT_VALUE, setting);
                    return false;
                }
            }
        }
        Logger_1.Logger.instance.startup.info(Logger_1.Logger.STARTUP_READY_FOR_ONBOARDING);
        return true;
    };
    ClientSettings.isDemoApplicationAvailable = function () {
        var demoBundlePath = ClientSettings.getDemoBundlePath();
        if (demoBundlePath && typeof demoBundlePath === 'string' &&
            fs.File.exists(fs.path.join(Paths_1.Paths.getOverridePath(), demoBundlePath))) {
            return true;
        }
        var defaultDemoExists = DemoBundleDefinitionLoader_1.DemoBundleDefinitionLoader.validLocationExists();
        if (!defaultDemoExists) {
            Logger_1.Logger.instance.clientSettings.error(Logger_1.Logger.CLIENTSETTINGS_MISSING_DEMO_APPLICATION);
        }
        return defaultDemoExists;
    };
    ;
    ClientSettings.getAppLanguage = function () {
        return AppSettingsManager_1.AppSettingsManager.instance().getString('AppLanguage', undefined);
    };
    ClientSettings.getAppLanguageSource = function () {
        return AppSettingsManager_1.AppSettingsManager.instance().getNumber('AppLanguageSource', undefined);
    };
    ClientSettings.getAppRegionSource = function () {
        return AppSettingsManager_1.AppSettingsManager.instance().getNumber('AppRegionSource', undefined);
    };
    ClientSettings.getAppLocale = function () {
        return AppSettingsManager_1.AppSettingsManager.instance().getString('AppLocale', undefined);
    };
    ClientSettings.getAppRegion = function () {
        return AppSettingsManager_1.AppSettingsManager.instance().getString('AppRegion', undefined);
    };
    ClientSettings.getAppFontScale = function () {
        return AppSettingsManager_1.AppSettingsManager.instance().getNumber('AppFontScale', undefined);
    };
    ClientSettings.getDefaultAppLanguage = function () {
        return ClientSettings.getBrandingSetting('DefaultAppLanguage');
    };
    ClientSettings.getEncryptDatabaseFlag = function () {
        return ClientSettings.getBrandingSetting('EncryptDatabase');
    };
    ClientSettings.getExtensionControlSourceMap = function () {
        var extControlSourceMap = AppSettingsManager_1.AppSettingsManager.instance().getString('ExtensionControlSourceMap', undefined);
        if (extControlSourceMap) {
            return JSON.parse(extControlSourceMap);
        }
        return undefined;
    };
    ClientSettings.getDebugODataProvider = function () {
        return ClientSettings.getBrandingSetting('DebugSettings.DebugODataProvider');
    };
    ClientSettings.getSupportedLanguages = function () {
        var languages = AppSettingsManager_1.AppSettingsManager.instance().getString('SupportedLanguages', undefined);
        if (languages) {
            return JSON.parse(languages);
        }
    };
    ClientSettings.getProfilingEnabled = function () {
        return (ClientSettings.getTracingEnabled() && ClientSettings.getTracingCategories().indexOf('mdk.trace.profiling') > -1);
    };
    ClientSettings.getODataServiceLanguageMap = function () {
        var serviceLanguages = AppSettingsManager_1.AppSettingsManager.instance().getString('ODataServiceLanguageMap', undefined);
        if (serviceLanguages) {
            return JSON.parse(serviceLanguages);
        }
    };
    ClientSettings.getTracingEnabled = function () {
        return ClientSettings.getBrandingSetting('DebugSettings.TracingEnabled');
    };
    ClientSettings.getTracingCategories = function () {
        return ClientSettings.getBrandingSetting('DebugSettings.Categories');
    };
    ClientSettings.getUserDefinedLanguage = function () {
        return AppSettingsManager_1.AppSettingsManager.instance().getString('UserDefinedLanguage', undefined);
    };
    ClientSettings.getUserDefinedRegion = function () {
        return AppSettingsManager_1.AppSettingsManager.instance().getString('UserDefinedRegion', undefined);
    };
    ClientSettings.hasLogSettings = function () {
        return !!ClientSettings.getBrandingSetting('LogSettings');
    };
    ClientSettings.getLogFileName = function () {
        return ClientSettings.getBrandingSetting('LogSettings.FileName');
    };
    ClientSettings.getLogFileSize = function () {
        return ClientSettings.getBrandingSetting('LogSettings.MaxFileSizeInMegaBytes');
    };
    ClientSettings.getLogLevel = function () {
        return ClientSettings.getBrandingSetting('LogSettings.LogLevel');
    };
    ClientSettings.getDemoBundlePath = function () {
        return ClientSettings.getDemoSetting('Demo.BundlePath');
    };
    ClientSettings.getDemoDbPath = function () {
        return ClientSettings.getDemoSetting('Demo.DBPath');
    };
    ClientSettings.getDemoAppLanguage = function () {
        var demoAppLanguage = ClientSettings.getDemoSetting('Demo.DemoAppLanguage');
        if (!demoAppLanguage) {
            demoAppLanguage = ClientSettings.getBrandingSetting('Demo.DemoAppLanguage');
        }
        return demoAppLanguage;
    };
    ClientSettings.setAppLanguage = function (language) {
        AppSettingsManager_1.AppSettingsManager.instance().setString('AppLanguage', language);
        this.setAppLanguageIsRTL(language);
    };
    ClientSettings.setAppLanguageIsRTL = function (language) {
        var isRTL = (language === 'iw' || rtlDetect.isRtlLang(language)) ? true : false;
        AppSettingsManager_1.AppSettingsManager.instance().setBoolean('IsRTL', isRTL);
    };
    ClientSettings.getAppLanguageIsRTL = function () {
        return AppSettingsManager_1.AppSettingsManager.instance().getBoolean('IsRTL', false);
    };
    ClientSettings.setAppLanguageSource = function (source) {
        AppSettingsManager_1.AppSettingsManager.instance().setNumber('AppLanguageSource', source);
    };
    ClientSettings.setAppRegionSource = function (source) {
        AppSettingsManager_1.AppSettingsManager.instance().setNumber('AppRegionSource', source);
    };
    ClientSettings.setAppFontScale = function (fontScale) {
        AppSettingsManager_1.AppSettingsManager.instance().setNumber('AppFontScale', fontScale);
    };
    ClientSettings.setApplicationStage = function (stage) {
        switch (stage) {
            case 'Welcome':
                ClientSettings.setOnboardingState(OnboardingState.OnboardingInProgress);
                Logger_1.Logger.instance.clientSettings.info('Transitioning to OnboardingInProgress');
                break;
            case 'InApplication':
                ClientSettings.setOnboardingState(OnboardingState.Live);
                Logger_1.Logger.instance.clientSettings.info('Transitioning to Live Mode');
                break;
            case 'InAppFromDemo':
                ClientSettings.setOnboardingState(OnboardingState.Demo);
                Logger_1.Logger.instance.clientSettings.info('Transitioning to Demo Mode');
                break;
            default:
                ClientSettings.setOnboardingState(OnboardingState.OnboardingInProgress);
                Logger_1.Logger.instance.clientSettings.info('Defaulting to OnboaringInProgress');
                break;
        }
    };
    ClientSettings.setAppLocale = function (locale) {
        AppSettingsManager_1.AppSettingsManager.instance().setString('AppLocale', locale);
    };
    ClientSettings.setAppRegion = function (region) {
        AppSettingsManager_1.AppSettingsManager.instance().setString('AppRegion', region);
    };
    ClientSettings.setExtensionControlSourceMap = function (extensionControlSourceMap) {
        AppSettingsManager_1.AppSettingsManager.instance().setString('ExtensionControlSourceMap', JSON.stringify(extensionControlSourceMap));
    };
    ClientSettings.setSupportedLanguages = function (languages) {
        AppSettingsManager_1.AppSettingsManager.instance().setString('SupportedLanguages', JSON.stringify(languages));
    };
    ClientSettings.setODataServiceLanguageMap = function (serviceLanguages) {
        AppSettingsManager_1.AppSettingsManager.instance().setString('ODataServiceLanguageMap', JSON.stringify(serviceLanguages));
    };
    ClientSettings.setUserDefinedLanguage = function (language) {
        AppSettingsManager_1.AppSettingsManager.instance().setString('UserDefinedLanguage', language);
    };
    ClientSettings.setUserDefinedRegion = function (region) {
        AppSettingsManager_1.AppSettingsManager.instance().setString('UserDefinedRegion', region);
    };
    ClientSettings.setHistoricalODataServicePath = function (set) {
        AppSettingsManager_1.AppSettingsManager.instance().setString('HistoricalODataServicePath', JSON.stringify(Array.from(set)));
    };
    ClientSettings.getHistoricalODataServicePath = function () {
        var map = AppSettingsManager_1.AppSettingsManager.instance().getString('HistoricalODataServicePath', undefined);
        if (map) {
            return JSON.parse(map);
        }
        else {
            return [];
        }
    };
    ClientSettings.latchBrandedSettings = function () {
        if (ClientSettings.isDemoMode()) {
            ClientSettings.latchDemoSettings();
        }
        else {
            ClientSettings.getServiceTimeZoneAbbreviation();
        }
        ClientSettings._clientLatchedSettings.latchSettings();
        ClientSettings.writeLatchedSettingsToDisk();
    };
    ClientSettings.resetlatchedConnectionSettings = function () {
        ClientSettings._clientLatchedSettings.clear();
    };
    ClientSettings.storeAppLaunchSettings = function () {
        if (ClientSettings._appLaunchSettings.hasSetting('ConnectionSettings')) {
            ClientSettings._savedAppLaunchSettings.setSettings(ClientSettings._appLaunchSettings.getSettings());
        }
    };
    ClientSettings.setUserInfo = function (userId) {
        ClientSettings.setAppSetting('userId', userId);
    };
    ClientSettings.getUserInfo = function () {
        if (ClientSettings.isDemoMode()) {
            return 'DemoUser';
        }
        return AppSettingsManager_1.AppSettingsManager.instance().getString('userId', 'DemoUser');
    };
    ClientSettings.setDeviceId = function (deviceId) {
        ClientSettings.setAppSetting('deviceId', deviceId);
    };
    ClientSettings.getDeviceId = function () {
        if (ClientSettings.isDemoMode()) {
            return 'DemoDevice';
        }
        return AppSettingsManager_1.AppSettingsManager.instance().getString('deviceId', 'DemoDevice');
    };
    ClientSettings.setSession = function (session) {
        this._session = JSON.stringify(session);
    };
    ClientSettings.getSession = function () {
        return this._session;
    };
    ClientSettings.getConnecionInfoToastMessage = function () {
        return this.connectionInfoToastMessage;
    };
    ClientSettings.setConnecionInfoToastMessage = function (queryStr) {
        if (queryStr === '') {
            this.connectionInfoToastMessage = '';
            return;
        }
        this.connectionInfoToastMessage = I18nHelper_1.I18nHelper.localizeMDKText('unable_to_load_new_connection_setttings');
    };
    ClientSettings.processConnectionSettingsFromLaunchURL = function (queryStr) {
        var success = false;
        if (queryStr !== null) {
            try {
                var jsonObj = JSON.parse(queryStr);
                var connParamStrings = this.parseJsonQRResult(jsonObj);
                success = this.isWhiteListedConnectionSettings(connParamStrings);
            }
            catch (error) {
                Logger_1.Logger.instance.logManager.log(Logger_1.Logger.INVALID_JSON_FORMAT, error);
                var connSettingStrings = queryStr.split('&');
                success = this.isWhiteListedConnectionSettings(connSettingStrings);
            }
        }
        if (success) {
            this.connectionInfoToastMessage = I18nHelper_1.I18nHelper.localizeMDKText('qr_code_message_success');
        }
        else {
            if (queryStr === null || queryStr === undefined) {
                this.connectionInfoToastMessage = '';
            }
            else {
                this.connectionInfoToastMessage = I18nHelper_1.I18nHelper.localizeMDKText('qr_code_message_fail');
            }
        }
    };
    ClientSettings.parseJsonQRResult = function (jsonObj) {
        var connectionParamsArr = new Array();
        if (jsonObj.appID) {
            var appdId = 'AppId' + '=' + jsonObj.appID;
            connectionParamsArr.push(appdId);
        }
        if (jsonObj.auth.length > 0) {
            if (jsonObj.auth[0] !== null) {
                var config = jsonObj.auth[0].config;
                if (config['oauth2.authorizationEndpoint']) {
                    var authStr = 'AuthorizationEndpointUrl' + '=' + config['oauth2.authorizationEndpoint'];
                    connectionParamsArr.push(authStr);
                }
                if (config['oauth2.tokenEndpoint']) {
                    var tokenStr = 'TokenUrl' + '=' + config['oauth2.tokenEndpoint'];
                    connectionParamsArr.push(tokenStr);
                }
                if (config['oauth2.endUserUI']) {
                    var cpmsStr = 'SapCloudPlatformEndpoint' + '=' + config['oauth2.endUserUI'];
                    connectionParamsArr.push(cpmsStr);
                }
                var clients = config['oauth2.clients'];
                if (clients.length > 0) {
                    if (clients[0] !== null) {
                        if (clients[0].clientID) {
                            var clientIdStr = 'ClientId' + '=' + clients[0].clientID;
                            connectionParamsArr.push(clientIdStr);
                        }
                        if (clients[0].redirectURL) {
                            var redirectUrlStr = 'RedirectUrl' + '=' + clients[0].redirectURL;
                            connectionParamsArr.push(redirectUrlStr);
                        }
                    }
                }
            }
        }
        return connectionParamsArr;
    };
    ClientSettings.isWhiteListedConnectionSettings = function (connSettingsStrings) {
        var success = false;
        for (var _i = 0, connSettingsStrings_1 = connSettingsStrings; _i < connSettingsStrings_1.length; _i++) {
            var setting = connSettingsStrings_1[_i];
            var keyValuePair = setting.split('=');
            var isConnSettAllowed = keyValuePair.length === 2;
            if (isConnSettAllowed) {
                var isWhitelistSetting = ClientSettings.WHITELIST_SETTINGS.includes(keyValuePair[0]);
                isConnSettAllowed = !isWhitelistSetting || (isWhitelistSetting && this.isWhitelistedConnectionSetting(keyValuePair[0], keyValuePair[1]));
            }
            if (isConnSettAllowed) {
                success = true;
                Logger_1.Logger.instance.startup.log(Logger_1.Logger.STARTUP_PROCESSING_KEYVALUEPAIR, keyValuePair[0], keyValuePair[1]);
                this._appLaunchSettings.setSetting("ConnectionSettings." + keyValuePair[0], keyValuePair[1]);
            }
            else {
                success = false;
                Logger_1.Logger.instance.startup.error(Logger_1.Logger.STARTUP_URL_KEY_INCORRECT_VALUE, keyValuePair[0]);
                break;
            }
        }
        return success;
    };
    ClientSettings.isConnectionSettingsValid = function () {
        var requiredConnectionSettings = [
            'ConnectionSettings.AppId',
            'ConnectionSettings.AuthorizationEndpointUrl',
            'ConnectionSettings.ClientId',
            'ConnectionSettings.RedirectUrl',
            'ConnectionSettings.SapCloudPlatformEndpoint',
            'ConnectionSettings.ServiceTimeZoneAbbreviation',
            'ConnectionSettings.TokenUrl',
        ];
        for (var _i = 0, requiredConnectionSettings_1 = requiredConnectionSettings; _i < requiredConnectionSettings_1.length; _i++) {
            var setting = requiredConnectionSettings_1[_i];
            if (!setting) {
                return false;
            }
        }
        return true;
    };
    ClientSettings.isValidDomain = function (urlHost, whitelist) {
        var urlSplit = urlHost.split('.');
        if (urlSplit.length >= 2) {
            var inputDomain = '.' + urlSplit[urlSplit.length - 1];
            for (var index_1 = urlSplit.length - 2; index_1 > 0; index_1--) {
                inputDomain = '.' + urlSplit[index_1] + inputDomain;
                if (whitelist.indexOf(inputDomain) > -1) {
                    return true;
                }
            }
        }
        return false;
    };
    ClientSettings.setConnectionSettings = function (setting) {
        var connectionObj = [];
        setting.forEach(function (value, key) {
            if (key.startsWith('ConnectionSettings.')) {
                connectionObj.push(key + '=' + value);
            }
        });
        this.setLatchedConnectionSettings(connectionObj);
    };
    ClientSettings.setLatchedConnectionSettings = function (connSettingsStrings) {
        for (var _i = 0, connSettingsStrings_2 = connSettingsStrings; _i < connSettingsStrings_2.length; _i++) {
            var setting = connSettingsStrings_2[_i];
            var keyValuePair = setting.split('=');
            var isConnSettAllowed = keyValuePair.length === 2;
            if (isConnSettAllowed) {
                var isWhitelistSetting = ClientSettings.WHITELIST_SETTINGS.includes(keyValuePair[0]);
                isConnSettAllowed = !isWhitelistSetting || (isWhitelistSetting && this.isWhitelistedConnectionSetting(keyValuePair[0], keyValuePair[1]));
            }
            if (isConnSettAllowed) {
                Logger_1.Logger.instance.startup.log(Logger_1.Logger.STARTUP_PROCESSING_KEYVALUEPAIR, keyValuePair[0], keyValuePair[1]);
                this._clientLatchedSettings.setSetting(keyValuePair[0], keyValuePair[1]);
            }
            else {
                Logger_1.Logger.instance.startup.error(Logger_1.Logger.STARTUP_URL_KEY_INCORRECT_VALUE, keyValuePair[0]);
                break;
            }
        }
    };
    ClientSettings.isWhitelistedConnectionSetting = function (key, value) {
        var host = url.parse(value).hostname;
        if (host && host !== '') {
            if (value.indexOf('https://') === 0) {
                var domains = ClientSettings.DEFAULT_WHITELIST_DOMAINS.concat(ClientSettings.getURLWhitelist());
                return this.isValidDomain(host, domains);
            }
            else {
                var domains = ClientSettings.DEFAULT_WHITELIST_DOMAINS.concat(ClientSettings.getAppSchemeURLWhitelist());
                if (key === 'RedirectUrl' && domains.includes(value)) {
                    return true;
                }
            }
        }
        return false;
    };
    ClientSettings.initializePersistentSettings = function () {
        if (!ClientSettings.isPersistInitialized) {
            ClientSettings.isPersistInitialized = true;
            ClientSettings._clientLatchedSettings = new LatchedSettings_1.LatchedSettings('LatchedSettings', 'Client Latched Settings');
            ClientSettings._savedAppLaunchSettings = new PersistentSettings_1.PersistentSettings('SavedAppLaunchSettings', 'Saved Application Launch Settings');
            ClientSettings._demoSettingDemoPriority[0] = ClientSettings._clientLatchedSettings;
            ClientSettings._connectionSettingsLivePriority[0] = ClientSettings._clientLatchedSettings;
            ClientSettings._connectionSettingsLivePriority[2] = ClientSettings._savedAppLaunchSettings;
            ClientSettings._connectionSettingDemoPriority[0] = ClientSettings._clientLatchedSettings;
        }
    };
    ClientSettings.initializeSettings = function () {
        ClientSettings._brandingSettingLivePriority = [
            BrandedSettings_1.BrandedSettings.getInstance(),
            ClientSettings._defaultSettings,
        ];
        ClientSettings._connectionSettingsLivePriority = [
            ClientSettings._clientLatchedSettings,
            ClientSettings._appLaunchSettings,
            LocalOverrideSettings_1.LocalOverrideSettings.getInstance(),
            ClientSettings._savedAppLaunchSettings,
            BrandedSettings_1.BrandedSettings.getInstance(),
            ClientSettings._defaultSettings,
        ];
        ClientSettings._brandingSettingDemoPriority = [
            BrandedSettings_1.BrandedSettings.getInstance(),
            ClientSettings._defaultSettings,
        ];
        ClientSettings._demoSettingDemoPriority = [
            ClientSettings._clientLatchedSettings,
            LocalOverrideSettings_1.LocalOverrideSettings.getInstance(),
            ClientSettings._defaultSettings,
        ];
        ClientSettings._connectionSettingDemoPriority = [
            ClientSettings._clientLatchedSettings,
            ClientSettings._demoOverrideSettings,
            ClientSettings._demoBrandedSettings,
            LocalOverrideSettings_1.LocalOverrideSettings.getInstance(),
            BrandedSettings_1.BrandedSettings.getInstance(),
            ClientSettings._defaultSettings,
        ];
        ClientSettings._brandingSettingPriorities = {
            demo: ClientSettings._brandingSettingDemoPriority,
            live: ClientSettings._brandingSettingLivePriority,
        };
        ClientSettings._demoSettingsPriorities = {
            demo: ClientSettings._demoSettingDemoPriority,
            live: ClientSettings._demoSettingDemoPriority,
        };
        ClientSettings._connectionSettingsPriorities = {
            demo: ClientSettings._connectionSettingDemoPriority,
            live: ClientSettings._connectionSettingsLivePriority,
        };
        ClientSettings.prioritiesInitialized = true;
    };
    ClientSettings.getSetting = function (key, demoPriorityList, livePriorityList, latchObj) {
        var value;
        if (ClientSettings.isDemoMode()) {
            value = ClientSettings.findSetting(key, demoPriorityList);
        }
        else {
            value = ClientSettings.findSetting(key, livePriorityList);
        }
        if (latchObj) {
            latchObj.setSetting(key, value);
        }
        return value;
    };
    ClientSettings.findSetting = function (key, priorityList) {
        for (var _i = 0, priorityList_1 = priorityList; _i < priorityList_1.length; _i++) {
            var settingsObj = priorityList_1[_i];
            if (settingsObj) {
                if (settingsObj.hasSetting(key)) {
                    if (app.ios && settingsObj.constructor.name === 'LocalOverrideSettings') {
                        this.connectionInfoToastMessage = I18nHelper_1.I18nHelper.localizeMDKText('override_configuration_settings');
                    }
                    var value = settingsObj.getSetting(key);
                    Logger_1.Logger.instance.clientSettings.info(Logger_1.Logger.CLIENTSETTINGS_LOG_FOUND_WITH_VALUE, settingsObj.getLogName(), key, value);
                    return value;
                }
            }
        }
        Logger_1.Logger.instance.clientSettings.info(Logger_1.Logger.CLIENTSETTINGS_NO_VALUE_FOUND_FOR_KEY, key);
        return undefined;
    };
    ClientSettings.getBrandingSetting = function (key) {
        return ClientSettings.getSetting(key, ClientSettings._brandingSettingPriorities.demo, ClientSettings._brandingSettingPriorities.live);
    };
    ClientSettings.getDemoSetting = function (key) {
        ClientSettings._demoOverrideSettings.setSettings(this.getOverrideDemoObject());
        return ClientSettings.getSetting(key, ClientSettings._demoSettingsPriorities.demo, ClientSettings._demoSettingsPriorities.live, ClientSettings._clientLatchedSettings);
    };
    ClientSettings.getConnectionSetting = function (key) {
        if (ClientSettings.isDemoMode()) {
            ClientSettings._demoOverrideSettings.setSettings(this.getOverrideDemoObject());
        }
        return ClientSettings.getSetting(key, ClientSettings._connectionSettingsPriorities.demo, ClientSettings._connectionSettingsPriorities.live, ClientSettings._clientLatchedSettings);
    };
    ClientSettings.latchDemoSettings = function () {
        ClientSettings._demoOverrideSettings.setSettings(this.getOverrideDemoObject());
        ClientSettings._connectionSettingsKeyList.forEach(function (key) {
            ClientSettings.getConnectionSetting("ConnectionSettings." + key);
        });
        ClientSettings._demoRootSettingsKeyList.forEach(function (key) {
            ClientSettings.getDemoSetting("Demo." + key);
        });
    };
    ClientSettings.getOverrideDemoObject = function () {
        var connectionSettings = {};
        var demoOverrides = {};
        ClientSettings._connectionSettingsKeyList.forEach(function (key) {
            if (LocalOverrideSettings_1.LocalOverrideSettings.getInstance().hasSetting("Demo.ConnectionSettings." + key)) {
                connectionSettings[key] = LocalOverrideSettings_1.LocalOverrideSettings.getInstance().getSetting("Demo.ConnectionSettings." + key);
            }
        });
        ClientSettings._demoRootSettingsKeyList.forEach(function (key) {
            if (LocalOverrideSettings_1.LocalOverrideSettings.getInstance().hasSetting("Demo." + key)) {
                demoOverrides[key] = LocalOverrideSettings_1.LocalOverrideSettings.getInstance().getSetting("Demo." + key);
            }
        });
        if (Object.keys(connectionSettings).length > 0) {
            demoOverrides.ConnectionSettings = connectionSettings;
        }
        return demoOverrides;
    };
    ClientSettings.getURLWhitelist = function () {
        var urlList = [];
        if (Array.isArray(ClientSettings.getBrandingSetting('URLWhitelist'))) {
            ClientSettings.getBrandingSetting('URLWhitelist').forEach(function (domain) {
                if (domain.lastIndexOf('.') > 0) {
                    domain = domain.charAt(0) === "." ? domain : "." + domain;
                    urlList.push(domain);
                }
            });
        }
        return urlList;
    };
    ClientSettings.getAppSchemeURLWhitelist = function () {
        var appSchemeURLList = [];
        if (Array.isArray(ClientSettings.getBrandingSetting('URLWhitelist'))) {
            ClientSettings.getBrandingSetting('URLWhitelist').forEach(function (domain) {
                if (domain.indexOf('://') > 0 && domain.lastIndexOf('.') === -1) {
                    appSchemeURLList.push(domain);
                }
            });
        }
        return appSchemeURLList;
    };
    ClientSettings.writeLatchedSettingsToDisk = function () {
        var outputPath = Paths_1.Paths.getSavedSettingsPath();
        var path = fs.path.join(outputPath, 'SavedSettings.json');
        var file = fs.File.fromPath(path);
        file.writeText(JSON.stringify(ClientSettings._clientLatchedSettings.getSettings()));
    };
    ClientSettings.isValid = function (param) {
        return param && typeof param !== 'undefined' && param !== 'safe.default.data';
    };
    ClientSettings.setAppSetting = function (key, value) {
        if (value !== null && value !== undefined) {
            switch (typeof value) {
                case 'number':
                    AppSettingsManager_1.AppSettingsManager.instance().setNumber(key, value);
                    break;
                case 'string':
                    AppSettingsManager_1.AppSettingsManager.instance().setString(key, value);
                    break;
                case 'boolean':
                    AppSettingsManager_1.AppSettingsManager.instance().setBoolean(key, value);
                    break;
                default:
                    AppSettingsManager_1.AppSettingsManager.instance().setString(key, JSON.stringify(value));
                    break;
            }
        }
        else {
            AppSettingsManager_1.AppSettingsManager.instance().remove(key);
        }
    };
    ClientSettings._resetI18nSettings = function () {
        var i18nRelatedAppSettingsKey = ['AppLanguage', 'AppLanguageSource', 'AppRegion', 'AppRegionSource',
            'AppLocale', 'UserDefinedLanguage', 'UserDefinedRegion', 'SupportedLanguages', 'ODataServiceLanguageMap', 'IsRTL'];
        i18nRelatedAppSettingsKey.forEach(function (key) {
            AppSettingsManager_1.AppSettingsManager.instance().remove(key);
        });
        mdk_sap_1.I18n.applyLanguage('');
    };
    ClientSettings.trimUrl = function (url) {
        return url.replace(/\/$/, '');
    };
    ClientSettings.isUserChangingPasscode = false;
    ClientSettings.isVerifyingPasscode = false;
    ClientSettings.connectionInfoToastMessage = '';
    ClientSettings.isInAppQRScanFlow = false;
    ClientSettings.DEFAULT_WHITELIST_DOMAINS = ['.hana.ondemand.com', '.hanatrial.ondemand.com', '.scp.sapns2.us', 'sapmobilesvcs://oauth2redirect', 'seamclient://oauth2redirect', 'mdkclient://oauth2redirect'];
    ClientSettings.WHITELIST_SETTINGS = ['SapCloudPlatformEndpoint', 'AuthorizationEndpointUrl', 'RedirectUrl', 'TokenUrl'];
    ClientSettings.userPasscode = '1234';
    ClientSettings.clientIsActive = false;
    ClientSettings.isPersistInitialized = false;
    ClientSettings._appLaunchSettings = new SimpleSettings_1.SimpleSettings('Application Launch Settings');
    ClientSettings._clientLatchedSettings = undefined;
    ClientSettings._savedAppLaunchSettings = undefined;
    ClientSettings._defaultSettings = new DefaultSettings_1.DefaultSettings();
    ClientSettings._demoBrandedSettings = new SimpleSettings_1.SimpleSettings('Demo Branded Settings', BrandedSettings_1.BrandedSettings.getInstance().getSetting('Demo'));
    ClientSettings._demoOverrideSettings = new SimpleSettings_1.SimpleSettings('Demo Override Settings');
    ClientSettings._brandingSettingLivePriority = [
        BrandedSettings_1.BrandedSettings.getInstance(),
        ClientSettings._defaultSettings,
    ];
    ClientSettings._connectionSettingsLivePriority = [
        ClientSettings._clientLatchedSettings,
        ClientSettings._appLaunchSettings,
        ClientSettings._savedAppLaunchSettings,
        BrandedSettings_1.BrandedSettings.getInstance(),
        ClientSettings._defaultSettings,
    ];
    ClientSettings._brandingSettingDemoPriority = [
        BrandedSettings_1.BrandedSettings.getInstance(),
        ClientSettings._defaultSettings,
    ];
    ClientSettings._demoSettingDemoPriority = [
        ClientSettings._clientLatchedSettings,
        ClientSettings._defaultSettings,
    ];
    ClientSettings._connectionSettingDemoPriority = [
        ClientSettings._clientLatchedSettings,
        ClientSettings._demoOverrideSettings,
        ClientSettings._demoBrandedSettings,
        BrandedSettings_1.BrandedSettings.getInstance(),
        ClientSettings._defaultSettings,
    ];
    ClientSettings._brandingSettingPriorities = {
        demo: ClientSettings._brandingSettingDemoPriority,
        live: ClientSettings._brandingSettingLivePriority,
    };
    ClientSettings._demoSettingsPriorities = {
        demo: ClientSettings._demoSettingDemoPriority,
        live: ClientSettings._demoSettingDemoPriority,
    };
    ClientSettings._connectionSettingsPriorities = {
        demo: ClientSettings._connectionSettingDemoPriority,
        live: ClientSettings._connectionSettingsLivePriority,
    };
    ClientSettings._connectionSettingsKeyList = [
        'SapCloudPlatformEndpoint',
        'AppId',
        'ClientId',
        'AuthorizationEndpointUrl',
        'RedirectUrl',
        'TokenUrl',
        'ServiceTimeZoneAbbreviation',
    ];
    ClientSettings._demoRootSettingsKeyList = [
        'DBPath',
        'BundlePath',
        'DemoAppLanguage',
    ];
    ClientSettings.prioritiesInitialized = false;
    return ClientSettings;
}());
exports.ClientSettings = ClientSettings;

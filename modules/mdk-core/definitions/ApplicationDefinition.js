"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var BaseJSONDefinition_1 = require("./BaseJSONDefinition");
var app = require("tns-core-modules/application");
var ApplicationDefinition = (function (_super) {
    __extends(ApplicationDefinition, _super);
    function ApplicationDefinition() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ApplicationDefinition.prototype.getMainPage = function () {
        return this.data.MainPage;
    };
    ApplicationDefinition.prototype.getOnLaunch = function () {
        return this.data.OnLaunch;
    };
    ApplicationDefinition.prototype.getOnUnCaughtError = function () {
        return this.data.OnUnCaughtError;
    };
    ApplicationDefinition.prototype.getOnExit = function () {
        return this.data.OnExit;
    };
    ApplicationDefinition.prototype.getStyles = function () {
        return this.data.Styles;
    };
    ApplicationDefinition.prototype.getSDKStyles = function () {
        if (this.data.SDKStyles instanceof Object) {
            var platform = 'ios';
            if (app.android) {
                platform = 'android';
            }
            return this.data.SDKStyles[platform];
        }
        return this.data.SDKStyles;
    };
    ApplicationDefinition.prototype.getLocalization = function () {
        return this.data.Localization;
    };
    ApplicationDefinition.prototype.getOnWillUpdate = function () {
        return this.data.OnWillUpdate;
    };
    ApplicationDefinition.prototype.getOnDidUpdate = function () {
        return this.data.OnDidUpdate;
    };
    ApplicationDefinition.prototype.getVersion = function () {
        return this.data.Version;
    };
    Object.defineProperty(ApplicationDefinition.prototype, "foregroundNotificationEventHandler", {
        get: function () {
            return this.data.OnReceiveForegroundNotification;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ApplicationDefinition.prototype, "contentAvailableEventHandler", {
        get: function () {
            return this.data.OnReceiveFetchCompletion;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ApplicationDefinition.prototype, "receiveNotificationResponseEventHandler", {
        get: function () {
            return this.data.OnReceiveNotificationResponse;
        },
        enumerable: true,
        configurable: true
    });
    ApplicationDefinition.prototype.getOnSuspend = function () {
        return this.data.OnSuspend;
    };
    ApplicationDefinition.prototype.getOnResume = function () {
        return this.data.OnResume;
    };
    return ApplicationDefinition;
}(BaseJSONDefinition_1.BaseJSONDefinition));
exports.ApplicationDefinition = ApplicationDefinition;
;

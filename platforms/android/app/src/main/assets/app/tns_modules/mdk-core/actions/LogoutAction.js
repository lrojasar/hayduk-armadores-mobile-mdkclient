"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Application_1 = require("../Application");
var BaseAction_1 = require("./BaseAction");
var LogoutActionDefinition_1 = require("../definitions/actions/LogoutActionDefinition");
var PageRenderer_1 = require("../pages/PageRenderer");
var ActionResultBuilder_1 = require("../builders/actions/ActionResultBuilder");
var ErrorMessage_1 = require("../errorHandling/ErrorMessage");
var MDKPage_1 = require("../pages/MDKPage");
var ModalFrame_1 = require("../pages/ModalFrame");
var frame_1 = require("tns-core-modules/ui/frame");
var TabFrame_1 = require("../pages/TabFrame");
var app = require("tns-core-modules/application");
var MDKNavigationType_1 = require("../common/MDKNavigationType");
var LogoutAction = (function (_super) {
    __extends(LogoutAction, _super);
    function LogoutAction(definition) {
        var _this = this;
        if (!(definition instanceof LogoutActionDefinition_1.LogoutActionDefinition)) {
            throw new Error(ErrorMessage_1.ErrorMessage.CANNOT_INIT_LOGOUTACTION_WITHOUT_DEFINITION);
        }
        _this = _super.call(this, definition) || this;
        return _this;
    }
    LogoutAction.prototype.execute = function () {
        var _this = this;
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
        var appID = '';
        if (!app.ios && !app.android) {
            appID = sessionStorage.getItem('MDKWCAppID');
            if (appID) {
                appID = '/' + appID;
            }
            else {
                appID = '';
            }
        }
        return Application_1.Application.resetClient().then(function (data) {
            MDKPage_1.MDKPage.setResetActionInProgress(true);
            Application_1.Application.reInitializeLogger();
            if (app.ios || app.android) {
                return PageRenderer_1.PageRenderer.pushNavigation(undefined, true, MDKNavigationType_1.MDKNavigationType.Root, _this.source).then(function (result) {
                    Application_1.Application.setMainPageRendered(false);
                    return new ActionResultBuilder_1.ActionResultBuilder().data(data).build();
                });
            }
            else {
                sessionStorage.clear();
                if (appID) {
                    window.location.replace(appID + '/do/logout');
                }
                return new ActionResultBuilder_1.ActionResultBuilder().data(data).build();
            }
        });
    };
    return LogoutAction;
}(BaseAction_1.BaseAction));
exports.LogoutAction = LogoutAction;
;

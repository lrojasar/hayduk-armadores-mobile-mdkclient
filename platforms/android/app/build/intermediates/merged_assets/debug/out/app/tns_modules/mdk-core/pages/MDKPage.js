"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var app = require("tns-core-modules/application");
var frameModule = require("tns-core-modules/ui/frame");
var color_1 = require("tns-core-modules/color");
var mdk_sap_1 = require("mdk-sap");
var mdk_sap_2 = require("mdk-sap");
var platform_1 = require("tns-core-modules/platform");
var toolbar_plugin_1 = require("toolbar-plugin");
var action_bar_1 = require("tns-core-modules/ui/action-bar");
var view_1 = require("tns-core-modules/ui/core/view");
var page_1 = require("tns-core-modules/ui/page");
var utils = require("tns-core-modules/utils/utils");
var ProgressBannerAction_1 = require("../actions/ProgressBannerAction");
var PressedItem_1 = require("../controls/PressedItem");
var ToolbarContainer_1 = require("../controls/ToolbarContainer");
var EvaluateTarget_1 = require("../data/EvaluateTarget");
var DataEventHandler_1 = require("../data/DataEventHandler");
var BaseControlDefinition_1 = require("../definitions/controls/BaseControlDefinition");
var PageDefinition_1 = require("../definitions/PageDefinition");
var BaseSectionDefinition_1 = require("../definitions/sections/BaseSectionDefinition");
var EventHandler_1 = require("../EventHandler");
var CssPropertyParser_1 = require("../utils/CssPropertyParser");
var Logger_1 = require("../utils/Logger");
var PropertyTypeChecker_1 = require("../utils/PropertyTypeChecker");
var ValueResolver_1 = require("../utils/ValueResolver");
var ClientSettings_1 = require("../storage/ClientSettings");
var ModalFrame_1 = require("./ModalFrame");
var PageRenderer_1 = require("./PageRenderer");
var Tracer_1 = require("../utils/Tracer");
var text_field_1 = require("tns-core-modules/ui/text-field");
var ErrorMessage_1 = require("../errorHandling/ErrorMessage");
var font_1 = require("tns-core-modules/ui/styling/font");
var CustomEventHandler_1 = require("../CustomEventHandler");
var ListPickerFragmentContainer_1 = require("../controls/ListPickerFragmentContainer");
var TabFrame_1 = require("./TabFrame");
var ExecuteSource_1 = require("../common/ExecuteSource");
var ImageHelper_1 = require("../utils/ImageHelper");
var MDKActionBar_1 = require("../controls/MDKActionBar");
var MDKActionBarItem_1 = require("../controls/MDKActionBarItem");
var Application_1 = require("../Application");
var CommonUtil_1 = require("../utils/CommonUtil");
var image_source_1 = require("tns-core-modules/image-source");
var FlexibleColumnFrame_1 = require("./FlexibleColumnFrame");
var FlexibleColumnLayout_1 = require("../controls/FlexibleColumnLayout");
var I18nFormatter_1 = require("../utils/I18nFormatter");
var StyleHelper_1 = require("../utils/StyleHelper");
var SCANNER_IMG = 'res://icscangray24px';
var BACK_ARROW_IMG = 'res://arrowbackgray24px';
var CLOSE_IMG = 'res://closegray24px';
var BACK_ARROW_RTL_IMG = 'res://arrowbackrtlgray24px';
var PNG_BASE64_PREFIX = 'data:image/png;base64;alwaystemplate,';
var NAVIGATION_BUTTON_IMG = 'res://outline_arrow_back_white_24';
var NAVIGATION_BUTTON_RTL_IMG = 'res://outline_arrow_back_rtl_white_24';
var IMAGE_HEIGHT = 21;
var IMAGE_WIDTH = 21;
var IMAGE_WIDTH_ANDROID = 120;
var IMAGE_HEIGHT_ANDROID = 120;
var ICON_TEXT_SCALE_FACTOR = 2;
var MDKPage = (function (_super) {
    __extends(MDKPage, _super);
    function MDKPage(pageDefinition, isPageShell) {
        if (isPageShell === void 0) { isPageShell = false; }
        var _this = _super.call(this) || this;
        _this.staleDataListeners = new Set();
        _this.isResuming = false;
        _this._isClearHistoryNavigation = false;
        _this._isTabFrameWithHeader = false;
        _this._childControls = [];
        _this._dataSubscriptions = [];
        _this._externalNavigating = false;
        _this._pageHasLoadedOnce = false;
        _this._pageOnLoadedEventExecuted = false;
        _this._pageOriginalOnLoadedEventExecuted = false;
        _this._modalCanceled = false;
        _this._modalDismissed = null;
        _this._modalFrame = null;
        _this._displayingWaitCursor = false;
        _this._isActionBarFirstSetupDone = false;
        _this._searchTextRemoveIcon = null;
        _this._searchStr = '';
        _this._isSearchActive = false;
        _this._barcodeScannerItem = null;
        _this._searchActionItem = null;
        _this._searchableSectionOnPage = [];
        _this._defaultColor = null;
        _this._defaultTitleColor = null;
        _this._defaultTitle = null;
        _this._defaultView = null;
        _this._defaultActionItems = [];
        _this._searchParams = null;
        _this._headerSection = false;
        _this._isModal = false;
        _this._isFullPage = false;
        _this._isPopover = false;
        _this._popOverData = null;
        _this._imageFontIconClassNameXSmall = 'sap-icons-actionbar-x-small';
        _this._imageFontIconClassNameSmall = 'sap-icons-actionbar-small';
        _this._imageFontIconClassNameMedium = 'sap-icons-actionbar-medium';
        _this._loadingIndicatorData = null;
        _this._cssClassNames = [];
        _this._isTabsTabPage = false;
        _this.finishedScanningWithResults = function (results) {
            _this._searchField.set('text', results);
        };
        _this.errorScanningWithMessage = function (message) {
            mdk_sap_2.Toaster.getInstance().display(message);
        };
        _this.actionBar = new MDKActionBar_1.MDKActionBar();
        _this.actionBarHidden = isPageShell;
        _this._definition = pageDefinition;
        _this.id = pageDefinition.getName();
        _this._toolbarDefinition = _this._definition.getToolbar();
        var topFrame = TabFrame_1.TabFrame.getCorrectTopmostFrame();
        if (topFrame && topFrame.currentPage) {
            _this.previousPage = topFrame.currentPage;
        }
        mdk_sap_1.NavigationBarBridge.applyFioriStyle();
        _this.on('navigatingFrom', _this._onNavigatingFrom, _this);
        _this.on('navigatedFrom', _this._onNavigatedFrom, _this);
        _this.on('navigatedTo', _this._onNavigatedTo, _this);
        _this.on('navigatingTo', _this._onNavigatingTo, _this);
        if (app.AndroidApplication) {
            _this.on(app.AndroidApplication.activityBackPressedEvent, _this._onActivityBackPressed, _this);
        }
        _this._id = MDKPage_1._nextPageId++;
        _this._actionBarIsFirstSetup = new Promise(function (resolve, reject) {
            _this._actionBarFirstSetupDone = resolve;
        });
        _this._firstLoadProfileId = Tracer_1.Tracer.startTrace();
        _this._loadingIndicatorData = null;
        return _this;
    }
    MDKPage_1 = MDKPage;
    MDKPage.resetNavigateFlags = function () {
        if (app.ios) {
            MDKPage_1._isExternalPage = MDKPage_1._navigatingFromPage && !MDKPage_1._navigatingToPage;
        }
        MDKPage_1._navigatingFromPage = undefined;
        MDKPage_1._navigatingToPage = undefined;
        MDKPage_1._isBackNavigation = undefined;
    };
    MDKPage.setResetActionInProgress = function (flag) {
        MDKPage_1._resetActionIsRunning = flag;
    };
    MDKPage.garbageCollect = function () {
        utils.GC();
    };
    MDKPage.setDisplayingExternalPage = function (display) {
        MDKPage_1._isExternalPage = display;
    };
    MDKPage.prototype.getAppLevelSideDrawer = function () {
        return PageRenderer_1.PageRenderer.appLevelSideDrawer;
    };
    Object.defineProperty(MDKPage.prototype, "PullDown", {
        get: function () {
            return this._definition.getPullDown();
        },
        enumerable: true,
        configurable: true
    });
    MDKPage.prototype.executeOnPulledDownActionOrRule = function () {
        var pullDown = this.PullDown;
        if (pullDown) {
            if (pullDown.OnPulledDown) {
                return new EventHandler_1.EventHandler().executeActionOrRule(pullDown.OnPulledDown, this.context);
            }
        }
        else {
            return Promise.reject('Failed to execute OnPulledDown action for page :- ' + this.definition.name);
        }
    };
    Object.defineProperty(MDKPage.prototype, "progressBar", {
        get: function () {
            return this._progressBar;
        },
        set: function (progressBar) {
            this._progressBar = progressBar;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MDKPage.prototype, "progressBarVisible", {
        get: function () {
            return this._progressBarVisible;
        },
        set: function (visible) {
            this._progressBarVisible = visible;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MDKPage.prototype, "isTabsTabPage", {
        get: function () {
            return this._isTabsTabPage;
        },
        set: function (tabPage) {
            this._isTabsTabPage = tabPage;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MDKPage.prototype, "popOverData", {
        get: function () {
            return this._popOverData;
        },
        set: function (data) {
            this._popOverData = data;
        },
        enumerable: true,
        configurable: true
    });
    MDKPage.prototype.addChildControl = function (control) {
        this.controls.push(control);
    };
    Object.defineProperty(MDKPage.prototype, "headerSection", {
        get: function () {
            return this._headerSection;
        },
        set: function (header) {
            this._headerSection = header;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MDKPage.prototype, "targetFrameId", {
        get: function () {
            return this._targetFrameId;
        },
        set: function (id) {
            this._targetFrameId = id;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MDKPage.prototype, "pageTag", {
        get: function () {
            return this._pageTag;
        },
        set: function (tag) {
            this._pageTag = tag;
        },
        enumerable: true,
        configurable: true
    });
    MDKPage.prototype.setLoadingIndicatorData = function (data) {
        this._loadingIndicatorData = data;
    };
    MDKPage.prototype.getLoadingIndicatorId = function () {
        return this._loadingIndicatorData === null ? -1 : this._loadingIndicatorData.indicatorId;
    };
    MDKPage.prototype.dismissModalPage = function (canceled, onModalComplete, onModalCancel) {
        var _this = this;
        this._modalCanceled = canceled;
        this._onModalComplete = onModalComplete;
        this._onModalCancel = onModalCancel;
        if (this._modalFrame) {
            var modalPage_1 = this._modalFrame.currentPage;
            if (this._dismissModalDone) {
                this._dismissModalDone();
                delete this._dismissModalDone;
            }
            this._modalFrame = null;
            if (!this._modalDismissed) {
                this._modalDismissed = true;
                this.triggerOnDismissingModal();
                return this._resolveModalPromise(modalPage_1).then(function () {
                    var isFilterModalPage = modalPage_1.filter ? true : false;
                    _this.handleModalDismissed(isFilterModalPage);
                });
            }
        }
    };
    MDKPage.prototype.onNavigatedTo = function (args) {
        if (!this._pageHasLoadedOnce) {
            return;
        }
        this._onNavigatedTo(args);
    };
    MDKPage.prototype.waitUntilModalDismissed = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (app.android) {
                resolve();
            }
            else {
                _this._dismissModalDone = resolve;
            }
        });
    };
    MDKPage.prototype.triggerOnDismissingModal = function () {
        for (var _i = 0, _a = this._childControls; _i < _a.length; _i++) {
            var control = _a[_i];
            control.onDismissingModal();
        }
    };
    MDKPage.prototype.handleModalDismissed = function (isFilterModalPage) {
        var args = {
            isBackNavigation: true,
        };
        this._handleNavigatingTo(args);
        this.redrawStaleDataListeners(false);
        if (!isFilterModalPage && this.pageTag !== FlexibleColumnLayout_1.FlexibleColumnLayout.LAYOUTTYPE_TAG) {
            if (this.frame instanceof FlexibleColumnFrame_1.FlexibleColumnFrame) {
                var targetFrame = this.frame.getTopMostFlexibleColumnFrame();
                if (targetFrame) {
                    ProgressBannerAction_1.ProgressBannerAction.updateAnchoredFrame(targetFrame);
                    mdk_sap_1.Banner.getInstance().relocateTo(targetFrame, TabFrame_1.TabFrame.getBannerAnchorLayout(this.frame));
                }
            }
            else {
                ProgressBannerAction_1.ProgressBannerAction.updateAnchoredFrame(this.frame);
                mdk_sap_1.Banner.getInstance().relocateTo(this.frame, TabFrame_1.TabFrame.getBannerAnchorLayout(this.frame));
            }
        }
    };
    MDKPage.prototype.dismissPopover = function () {
        if (this.frame !== TabFrame_1.TabFrame.getCorrectTopmostFrame()) {
            mdk_sap_1.Popover.getInstance().dismiss(this);
            this.popOverData = null;
        }
    };
    MDKPage.prototype.displayModalPage = function (modalPage, context, closeCallback, isPopover, isFullPage) {
        if (this._modalFrame) {
            this.modalFrame.navigate({
                create: function () {
                    return modalPage;
                },
            });
        }
        else {
            var isFullScreen = isFullPage || platform_1.device.deviceType === 'Phone';
            this.modalFrame = new ModalFrame_1.ModalFrame(this, isFullScreen, modalPage);
            this.modalFrame.navigate({
                create: function () {
                    return modalPage;
                },
            });
            var myCloseCallBack = function () {
                closeCallback();
            };
            if (context) {
                modalPage._filter = context.clientAPIProps.filter;
            }
            if (isPopover && !isFullScreen) {
                mdk_sap_1.Popover.getInstance().setPopoverAnchor(this.modalFrame, this, context.clientAPIProps.pressedItem);
            }
            for (var _i = 0, _a = this._childControls; _i < _a.length; _i++) {
                var control = _a[_i];
                control.onDisplayingModal(isFullScreen);
            }
            var modalPresentationStyle = {};
            if (app.ios && !isPopover && isFullScreen) {
                modalPresentationStyle = {
                    presentationStyle: 5
                };
            }
            this.showModal(this.modalFrame, {
                cancelable: modalPage.isPopover,
                closeCallback: myCloseCallBack,
                context: context,
                fullscreen: isFullScreen,
                ios: modalPresentationStyle,
            });
            this._modalDismissed = false;
        }
    };
    MDKPage.prototype.dismissPopoverForRestore = function () {
        if (this.popOverData) {
            mdk_sap_1.Popover.getInstance().dismiss(this);
        }
    };
    MDKPage.prototype.restorePopover = function () {
        if (this.popOverData) {
            mdk_sap_1.Popover.getInstance().show(this.popOverData);
        }
    };
    MDKPage.prototype.updateModalPopoverAnchor = function () {
        if (ModalFrame_1.ModalFrame.isPartialModal(this.frame) && this.isPopover) {
            var anchorItem = this.frame.popOverAnchorItem;
            var page = this.frame.parentPage;
            if (anchorItem && page) {
                mdk_sap_1.Popover.getInstance().setPopoverAnchor(this.frame, page, anchorItem);
            }
        }
    };
    Object.defineProperty(MDKPage.prototype, "controls", {
        get: function () {
            return this._childControls;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MDKPage.prototype, "debugString", {
        get: function () {
            return "Page: " + this._definition.getName() + " | ID: " + this._id;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MDKPage.prototype, "isMDKPage", {
        get: function () {
            return true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MDKPage.prototype, "isPopover", {
        get: function () {
            return this._isPopover;
        },
        set: function (flag) {
            this._isPopover = flag;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MDKPage.prototype, "definition", {
        get: function () {
            return this._definition;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MDKPage.prototype, "modalFrame", {
        get: function () {
            return this._modalFrame;
        },
        set: function (frame) {
            this._modalFrame = frame;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MDKPage.prototype, "caption", {
        set: function (caption) {
            var _this = this;
            setTimeout(function () {
                _this.actionBar.title = caption;
            }, 750);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MDKPage.prototype, "isNavigating", {
        get: function () {
            if (TabFrame_1.TabFrame.isSideDrawerTabFrame(this.frame)) {
                return false;
            }
            if (this.frame) {
                if (TabFrame_1.TabFrame.isTabsTabFrame(this.frame) || TabFrame_1.TabFrame.isChildTabs(this.frame)) {
                    return false;
                }
                else if (TabFrame_1.TabFrame.isChildBottomNavigation(this.frame)) {
                    var activeBNTabPageFrame = TabFrame_1.TabFrame.getTabTopmostFrameByFrame(this.frame);
                    if (TabFrame_1.TabFrame.isChildTabs(activeBNTabPageFrame)) {
                        return false;
                    }
                }
                else if (this.frame instanceof ModalFrame_1.ModalFrame &&
                    this.frame.parentPage && this.frame.parentPage.frame &&
                    (TabFrame_1.TabFrame.isTabsTabFrame(this.frame.parentPage.frame) ||
                        TabFrame_1.TabFrame.isChildTabs(this.frame.parentPage.frame))) {
                    return false;
                }
            }
            return !!(MDKPage_1._navigatingFromPage || MDKPage_1._navigatingToPage);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MDKPage.prototype, "isBackNavigation", {
        get: function () {
            return !!(this.isNavigating && MDKPage_1._isBackNavigation);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MDKPage.prototype, "isExternalNavigating", {
        get: function () {
            return this._externalNavigating;
        },
        set: function (navigating) {
            this._externalNavigating = navigating;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MDKPage.prototype, "filter", {
        get: function () {
            return this._filter;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MDKPage.prototype, "isPageOriginalOnLoadedEventExecuted", {
        get: function () {
            return this._pageOriginalOnLoadedEventExecuted;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MDKPage.prototype, "isPageHasLoadedOnce", {
        get: function () {
            return this._pageHasLoadedOnce;
        },
        enumerable: true,
        configurable: true
    });
    MDKPage.prototype.isFullScreen = function () {
        if (this.frame) {
            return !ModalFrame_1.ModalFrame.isPartialModal(this.frame);
        }
        else {
            return this._isFullPage || platform_1.device.deviceType === 'Phone';
        }
    };
    MDKPage.prototype.getToolbar = function () {
        var _this = this;
        if (this._definition.getToolbar() !== undefined) {
            if (this._toolbar === undefined) {
                var isFullScreen = this.isFullScreen();
                var topFrame = TabFrame_1.TabFrame.getCorrectTopmostFrame();
                if (topFrame instanceof ModalFrame_1.ModalFrame) {
                    isFullScreen = topFrame.isFullScreen;
                }
                if (FlexibleColumnFrame_1.FlexibleColumnFrame.isFlexibleColumnFrame(this.targetFrameId)) {
                    isFullScreen = false;
                }
                var toolbar_1 = new ToolbarContainer_1.ToolbarContainer(this, this._toolbarDefinition, this.context, isFullScreen);
                toolbar_1.setStyle();
                var toolbarItemDefs_1 = [];
                this._toolbarDefinition.getControls().forEach(function (item) {
                    toolbarItemDefs_1.push(item);
                });
                return toolbar_1.addToolbarItems(toolbarItemDefs_1).then(function () {
                    _this._toolbar = toolbar_1;
                    return _this._toolbar;
                });
            }
            return Promise.resolve(this._toolbar);
        }
        else {
            return Promise.resolve(undefined);
        }
    };
    MDKPage.prototype.getTabControl = function () {
        return TabFrame_1.TabFrame.getTabStrip(this);
    };
    MDKPage.prototype.updateProgressBar = function () {
        if (this.progressBar) {
            if (this.isModal()) {
                var parentPage = this.frame.parentPage;
                if (parentPage && parentPage.progressBarVisible) {
                    parentPage.updateProgressBar();
                    return;
                }
            }
            else if (this.frame instanceof FlexibleColumnFrame_1.FlexibleColumnFrame) {
                var targetFrame = this.frame.getTopMostFlexibleColumnFrame();
                if (!targetFrame || this.frame.id !== targetFrame.id) {
                    return;
                }
            }
            this.progressBarVisible = ProgressBannerAction_1.ProgressBannerAction.activeProgressBannerAction() ? true : false;
        }
    };
    MDKPage.prototype.onLoaded = function () {
        var _this = this;
        _super.prototype.onLoaded.call(this);
        if (this._loadingIndicatorData != null && this._loadingIndicatorData.enabled) {
            this._loadingIndicatorData.indicatorId = mdk_sap_1.ActivityIndicator.instance.show(this._loadingIndicatorData.text);
        }
        if (this.getAppLevelSideDrawer() !== undefined && !this.isModal()) {
            this.enableSwipeBackNavigation = false;
        }
        this.updateProgressBar();
        if (app.ios) {
            if (this.ios.popoverPresentationController) {
                if (this.style.anchorColor) {
                    this.ios.popoverPresentationController.backgroundColor = this.style.anchorColor.ios;
                }
            }
        }
        if (this._toolbar) {
            var toolbarView = this._toolbar.view();
            toolbarView.update();
        }
        for (var _i = 0, _a = this._childControls; _i < _a.length; _i++) {
            var control = _a[_i];
            control.onPageLoaded(!this._pageHasLoadedOnce);
        }
        this._pageOriginalOnLoadedEventExecuted = true;
        if (!this._pageHasLoadedOnce) {
            this._pageHasLoadedOnce = true;
            this._initializeActionBar().then(function () {
                _this._actionBarFirstSetupDone();
                _this._isActionBarFirstSetupDone = true;
                _this.notify({
                    eventName: 'ACTION_BAR_INITIALIZED',
                    object: _this
                });
                if (_this._definition.getControls().length > 0) {
                    var firstDefinitionControl = _this._definition.getControls()[0];
                    if (firstDefinitionControl.getType() !== BaseControlDefinition_1.BaseControlDefinition.type.SectionedTable &&
                        firstDefinitionControl.getType() !== BaseControlDefinition_1.BaseControlDefinition.type.FormCellContainer) {
                        _this._pageOnLoadedEventExecuted = true;
                        _this._runOnLoadedEvent();
                    }
                }
                else {
                    _this._pageOnLoadedEventExecuted = true;
                    _this._runOnLoadedEvent();
                }
            });
        }
        else {
            this._applyTitleStyle();
            if (this._displayingExternalPage) {
                var navigatingToEvent = this._definition.getOnReturningEvent();
                if (navigatingToEvent) {
                    var handler = new EventHandler_1.EventHandler();
                    handler.executeActionOrRule(navigatingToEvent, this.context).then(function () {
                        PageRenderer_1.PageRenderer.currentlyRenderedPage = undefined;
                    }).catch(function () {
                        PageRenderer_1.PageRenderer.currentlyRenderedPage = undefined;
                    });
                }
                else {
                    PageRenderer_1.PageRenderer.currentlyRenderedPage = undefined;
                }
                MDKPage_1.setDisplayingExternalPage(false);
            }
            else {
                PageRenderer_1.PageRenderer.currentlyRenderedPage = undefined;
            }
        }
    };
    MDKPage.prototype.findFormCellContainerOnPage = function () {
        var oFormCellContainer = undefined;
        for (var _i = 0, _a = this.controls; _i < _a.length; _i++) {
            var control = _a[_i];
            if (control.definition().getType() === BaseControlDefinition_1.BaseControlDefinition.type.FormCellContainer) {
                oFormCellContainer = control;
            }
        }
        return oFormCellContainer;
    };
    MDKPage.prototype.initialize = function (context, isModal, isPopover, isFullPage) {
        if (isPopover === void 0) { isPopover = true; }
        if (isFullPage === void 0) { isFullPage = true; }
        this.context = context;
        this._isModal = isModal;
        this._isFullPage = isFullPage;
        this._isPopover = isPopover;
        if (!isModal) {
            this.registerDataListeners();
        }
    };
    MDKPage.prototype.onDataChanged = function (action, result) {
        var _this = this;
        if (result && action) {
            if (action.type === 'Action.Type.ODataService.CallFunction' || action.type === 'Action.Type.RestService.SendRequest') {
                this.context.binding = result;
            }
            else if (CommonUtil_1.CommonUtil.isJSONString(result)) {
                var resultObj_1 = JSON.parse(result);
                if (action.type === 'Action.Type.ODataService.UpdateEntity' && this.context.binding) {
                    var resultKeys_1 = Object.keys(resultObj_1);
                    Object.keys(this.context.binding).forEach(function (sKey) {
                        if (resultKeys_1.indexOf(sKey) < 0) {
                            resultObj_1[sKey] = _this.context.binding[sKey];
                        }
                    });
                }
                if (this.context.readLink && this.context.readLink === EvaluateTarget_1.asReadLink(resultObj_1)) {
                    this.context.binding = resultObj_1;
                }
            }
        }
        for (var _i = 0, _a = this._childControls; _i < _a.length; _i++) {
            var control = _a[_i];
            control.observable().onDataChanged(action, result);
        }
        this.redraw();
    };
    MDKPage.prototype._redrawActionBar = function () {
        var _this = this;
        this._initializeActionBar().then(function () {
            _this.androidSearchbarUISetupHelper(true);
            _this._checkAndroidBackButton();
            _this.enableHamburgerActionBarItem();
        });
    };
    MDKPage.prototype._redrawToolbar = function () {
        if (this._definition.getToolbar() !== undefined) {
            this.getToolbar().then(function (toolbar) {
                toolbar.redraw();
            });
        }
    };
    MDKPage.prototype.redraw = function () {
        if (this._isSearchActive) {
            this._setActionbarTitle();
        }
        else {
            this._redrawActionBar();
        }
        this._redrawToolbar();
    };
    MDKPage.prototype.onUnloaded = function () {
        _super.prototype.onUnloaded.call(this);
        if (CustomEventHandler_1.CustomEventHandler.isPasscodeScreenDisplaying) {
            return;
        }
        mdk_sap_1.Banner.getInstance().dismiss();
        var pageExists = this.pageExists;
        if (!pageExists) {
            this.unregisterDataListeners();
        }
        for (var _i = 0, _a = this._childControls; _i < _a.length; _i++) {
            var control = _a[_i];
            control.onPageUnloaded(pageExists);
        }
        if (this.isModal() && this._isPopover) {
            var parentPage = this.frame.parentPage;
            if (this.isNavigating === false && parentPage != null && !this.isExternalNavigating) {
                var modalFrame = parentPage.modalFrame;
                if (modalFrame) {
                    modalFrame.closeModal();
                    modalFrame = null;
                }
                var canceled = parentPage.context.clientAPIProps.cancelPendingActions;
                parentPage.dismissModalPage(canceled, undefined, undefined);
            }
        }
        this.isExternalNavigating = false;
        if (((app.ios && MDKPage_1._navigatingFromPage === this)
            || (app.android && MDKPage_1._navigatingFromPage === undefined))
            && MDKPage_1._navigatingToPage === undefined) {
            var log_1 = 'MDK Client Core - finished a navigation to a page that is not managed by NativeScript.';
            Logger_1.Logger.instance.page.log(log_1);
            MDKPage_1.resetNavigateFlags();
        }
        if (app.ios && MDKPage_1._navigatingToPage === this && MDKPage_1._isBackNavigation) {
            var log_2 = 'iOS swipe back cancel';
            Logger_1.Logger.instance.page.log(log_2);
            MDKPage_1.resetNavigateFlags();
        }
        if (!this._definition.getOnUnLoadedEvent()) {
            return;
        }
        try {
            new EventHandler_1.EventHandler().executeActionOrRule(this._definition.getOnUnLoadedEvent(), this.context);
        }
        catch (e) {
            Logger_1.Logger.instance.page.error(e);
        }
    };
    MDKPage.prototype.unregisterDataListeners = function () {
        var _this = this;
        this._dataSubscriptions.forEach(function (dataSub) {
            DataEventHandler_1.DataEventHandler.getInstance().unsubscribe(dataSub, _this);
        });
        this._dataSubscriptions = [];
    };
    Object.defineProperty(MDKPage.prototype, "isCurrentPage", {
        get: function () {
            var topFrame = TabFrame_1.TabFrame.getCorrectTopmostFrame();
            if (topFrame instanceof FlexibleColumnFrame_1.FlexibleColumnFrame) {
                if (this.frame && this.frame instanceof FlexibleColumnFrame_1.FlexibleColumnFrame) {
                    return true;
                }
            }
            return this === topFrame.currentPage;
        },
        enumerable: true,
        configurable: true
    });
    MDKPage.prototype.redrawStaleDataListeners = function (allowIndicator) {
        if (allowIndicator === void 0) { allowIndicator = true; }
        if (this.staleDataListeners.size && allowIndicator) {
            mdk_sap_1.ActivityIndicator.instance.show('', this);
            this._displayingWaitCursor = true;
        }
        this.staleDataListeners.forEach(function (listener) {
            listener.redraw();
        });
        this.staleDataListeners.clear();
    };
    MDKPage.prototype.onLayout = function (left, top, right, bottom) {
        if (this.ios && !this.isFullScreen() && !TabFrame_1.TabFrame.isTabsTabFrame(this.frame) && !this._toolbar) {
            var navBar = this.actionBar.ios;
            if (navBar) {
                var frame = navBar.frame;
                var size = frame.size;
                var actionBarWidth = page_1.layout.toDevicePixels(size.width);
                var actionBarHeight = page_1.layout.toDevicePixels(size.height);
                view_1.View.layoutChild(this, this.actionBar, 0, 0, actionBarWidth, actionBarHeight);
            }
            if (top > 0) {
                bottom -= top;
                top = 0;
            }
            view_1.View.layoutChild(this, this.layoutView, left, top, right, bottom);
        }
        else {
            _super.prototype.onLayout.call(this, left, top, right, bottom);
        }
    };
    MDKPage.prototype.isModal = function () {
        return ModalFrame_1.ModalFrame.isModal(this.frame);
    };
    MDKPage.prototype.updateSearchIconVisibility = function () {
        var counter = 0;
        if (app.android) {
            for (var _i = 0, _a = this.controls; _i < _a.length; _i++) {
                var control = _a[_i];
                if (control.definition().getType() === BaseControlDefinition_1.BaseControlDefinition.type.SectionedTable) {
                    for (var _b = 0, _c = control.sections; _b < _c.length; _b++) {
                        var section_1 = _c[_b];
                        var sectionParamsData = section_1.definition.data._Type;
                        var sectionParamsSearchEnabled = section_1.definition.searchEnabled && section_1.visible;
                        if (section_1.value && section_1.value.type && section_1.value.Search) {
                            sectionParamsData = section_1.value.type;
                            sectionParamsSearchEnabled = section_1.value.Search.Enabled && section_1.value.visible;
                        }
                        var baseType = BaseSectionDefinition_1.BaseSectionDefinition.type;
                        if ((sectionParamsData === baseType.ObjectTable ||
                            sectionParamsData === baseType.ObjectCollection ||
                            sectionParamsData === baseType.ContactCell) &&
                            sectionParamsSearchEnabled) {
                            counter++;
                            if (!this._searchableSectionOnPage.includes(section_1)) {
                                this._searchableSectionOnPage.push(section_1);
                            }
                        }
                    }
                }
                if (counter === 0) {
                    this._searchableSectionOnPage = [];
                    this._initSearchActionBarItem('collapse');
                }
                if (counter > 0) {
                    this._initSearchActionBarItem('visible');
                }
            }
        }
    };
    MDKPage.prototype.runOnLoadedEvent = function () {
        var _this = this;
        this._relocateBanner();
        return this._actionBarIsFirstSetup.then(function () {
            if (!_this._pageOnLoadedEventExecuted) {
                _this._pageOnLoadedEventExecuted = true;
                _this.androidSearchbarUISetupHelper(true);
                if (app.android && _this.headerSection) {
                    mdk_sap_1.NavigationBarBridge.updateActionBarElevation(_this.page, false);
                }
                else {
                    mdk_sap_1.NavigationBarBridge.updateActionBarElevation(_this.page, true);
                }
                return _this._runOnLoadedEvent();
            }
        });
    };
    MDKPage.prototype.finishedCheckingWithErrors = function (newValue) {
        if (this.actionBar && this.actionBar.actionItems) {
            this.actionBar.actionItems.removeItem(this._barcodeScannerItem);
        }
        if (newValue) {
            mdk_sap_2.Toaster.getInstance().display(newValue);
        }
    };
    Object.defineProperty(MDKPage.prototype, "searchField", {
        get: function () {
            return this._searchField;
        },
        enumerable: true,
        configurable: true
    });
    MDKPage.prototype.finishedCheckingWithResults = function (result) {
        if (result) {
            this._executeBarcodeScan();
        }
        else {
            this.finishedCheckingWithErrors(null);
        }
    };
    MDKPage.prototype.androidSearchbarUISetupHelper = function (initialSetup) {
        if (app.android) {
            if (this.controls === undefined || this.controls.length === 0) {
                return;
            }
            if (this._isSearchActive) {
                var titleBackgroundColor = new color_1.Color(CssPropertyParser_1.CssPropertyParser.getPropertyFromSelector(CssPropertyParser_1.Selectors.TypeSelector, 'TitleStyleForSearch', 'background-color'));
                this._backgroundColor = titleBackgroundColor;
                this._titleColor = this._defaultSearchTextColor;
            }
            else if (initialSetup) {
                this._initSearchActionBarItem('collapse');
                this.updateSearchIconVisibility();
            }
        }
    };
    MDKPage.prototype.setSearchString = function (searchText) {
        var rtVal = false;
        if (app.ios) {
            return rtVal;
        }
        if (this._isSearchActive) {
            this._searchField.text = searchText;
            rtVal = true;
        }
        else if (this._searchActionItem.visibility === 'visible') {
            this._activateSearch();
            this._searchField.text = searchText;
            rtVal = true;
        }
        return rtVal;
    };
    MDKPage.prototype._activateSearch = function () {
        var _this = this;
        if (app.ios) {
            throw new Error(ErrorMessage_1.ErrorMessage.CANNOT_ACTIVATE_SEARCHVIEW_IN_IOS_PLATFORM);
        }
        this._defaultColor = this.actionBar.backgroundColor;
        this._defaultTitleColor = this.actionBar.color;
        this._isSearchActive = true;
        this._defaultActionItems = [];
        if (this.actionBar && this.actionBar.actionItems) {
            for (var _i = 0, _a = this.actionBar.actionItems.getItems(); _i < _a.length; _i++) {
                var item = _a[_i];
                this._defaultActionItems.push(item);
                this.actionBar.actionItems.removeItem(item);
            }
        }
        this._defaultTitle = this.actionBar.title;
        this._defaultView = this.actionBar.titleView;
        var actionBarBackgndColor = new color_1.Color(CssPropertyParser_1.CssPropertyParser.getPropertyFromSelector(CssPropertyParser_1.Selectors.TypeSelector, 'ActionBarForSearch', 'background-color'));
        var titleBackgroundColor = new color_1.Color(CssPropertyParser_1.CssPropertyParser.getPropertyFromSelector(CssPropertyParser_1.Selectors.TypeSelector, 'TitleStyleForSearch', 'background-color'));
        var titleColor = new color_1.Color(CssPropertyParser_1.CssPropertyParser.getPropertyFromSelector(CssPropertyParser_1.Selectors.TypeSelector, 'TitleStyleForSearch', 'color'));
        this.actionBar.backgroundColor = actionBarBackgndColor;
        var statusBarBackgroundColor = titleBackgroundColor;
        if (FlexibleColumnFrame_1.FlexibleColumnFrame.isFlexibleColumnFrame(this.page.frame.id)) {
            statusBarBackgroundColor = this._defaultColor;
        }
        mdk_sap_1.NavigationBarBridge.applyTitleStyle(this.page, statusBarBackgroundColor, titleColor, this._actionBarTitleFont);
        var searchableSection = this._searchableSectionOnPage[0];
        this._searchParams = searchableSection.definition.search;
        if (searchableSection.value && searchableSection.value.Search) {
            this._searchParams = searchableSection.value.Search;
        }
        this._initSearchField();
        this.actionBar.navigationButton.visibility = 'visible';
        this.actionBar.navigationButton.icon = ClientSettings_1.ClientSettings.getAppLanguageIsRTL() ?
            BACK_ARROW_RTL_IMG : BACK_ARROW_IMG;
        this.actionBar.navigationButton.on('tap', function (args) {
            if (_this._isSearchActive) {
                _this._onSearchBackPressed();
            }
        });
        this.actionBar.title = '';
        this.actionBar.titleView = this._searchField;
        this.actionBar.titleView.horizontalAlignment = 'left';
        if (app.android) {
            this._defaultContentInsetStartWithNavigation = this.actionBar.nativeView.getContentInsetStartWithNavigation();
            if (platform_1.device.deviceType === 'Phone') {
                this.actionBar.nativeView.setContentInsetStartWithNavigation(utils.layout.toDevicePixels(66));
            }
            else {
                this.actionBar.nativeView.setContentInsetStartWithNavigation(utils.layout.toDevicePixels(76));
            }
        }
        this._initScannerIcon();
        this._searchField.focus();
        this._initCloseIcon();
    };
    MDKPage.prototype._onSearchClear = function () {
        this._searchField.text = '';
    };
    MDKPage.prototype._initScannerIcon = function () {
        if (this._searchParams.BarcodeScanner) {
            this._barcodeScannerItem = new MDKActionBarItem_1.MDKActionItem();
            this._barcodeScannerItem.icon = SCANNER_IMG;
            this.actionBar.actionItems.addItem(this._barcodeScannerItem);
            this._barcodeScannerItem.on('tap', this._executeCapabilityCheck.bind(this));
        }
    };
    MDKPage.prototype._initCloseIcon = function () {
        this._searchTextRemoveIcon = new MDKActionBarItem_1.MDKActionItem();
        this._searchTextRemoveIcon.icon = CLOSE_IMG;
        this._searchTextRemoveIcon.visibility = 'hidden';
        this.actionBar.actionItems.addItem(this._searchTextRemoveIcon);
        this._searchTextRemoveIcon.on('tap', this._onSearchClear.bind(this));
    };
    MDKPage.prototype._initSearchField = function () {
        var _this = this;
        this._searchField = new text_field_1.TextField();
        this._searchField.borderBottomWidth = 1;
        this._searchField.borderColor = new color_1.Color(CssPropertyParser_1.CssPropertyParser.getPropertyFromSelector(CssPropertyParser_1.Selectors.TypeSelector, 'TitleStyleForSearch', 'color'));
        this._searchField.height = this.actionBar.getActualSize().height;
        this._searchField.hint = this._searchParams.Placeholder;
        this._searchField.on('returnPress', function (args) {
            var searchStr = args.object.get('text');
            if (_this._searchStr === searchStr) {
                return;
            }
            _this._searchStr = searchStr;
            for (var _i = 0, _a = _this._searchableSectionOnPage; _i < _a.length; _i++) {
                var searchableSection = _a[_i];
                searchableSection.searchUpdated(_this._searchStr);
            }
        });
        this._searchField.on('textChange', function (args) {
            _this._handleSearchTextChange(args);
        });
        this._defaultSearchTextColor = this._searchField.color;
    };
    MDKPage.prototype._handleSearchTextChange = function (args) {
        var _this = this;
        var minChars = this._searchParams.MinimumCharacterThreshold ?
            this._searchParams.MinimumCharacterThreshold : 0;
        var delay = this._searchParams.Delay ?
            this._searchParams.Delay : 0;
        var searchStr = args.object.get('text');
        if (searchStr === '') {
            this._searchTextRemoveIcon.visibility = 'hidden';
            if (this._barcodeScannerItem) {
                this._barcodeScannerItem.visibility = 'visible';
            }
        }
        else if (this._searchTextRemoveIcon.visibility === 'hidden') {
            if (this._barcodeScannerItem) {
                this._barcodeScannerItem.visibility = 'hidden';
            }
            this._searchTextRemoveIcon.visibility = 'visible';
        }
        if (this._searchStr === searchStr) {
            return;
        }
        if ((delay > 0) && (searchStr.length > this._searchStr.length)) {
            if (searchStr.length < minChars) {
                return;
            }
        }
        this._searchStr = searchStr;
        if (delay <= 0) {
            for (var _i = 0, _a = this._searchableSectionOnPage; _i < _a.length; _i++) {
                var searchableSection = _a[_i];
                searchableSection.searchUpdated(this._searchStr);
            }
        }
        else {
            setTimeout(function () {
                if (_this._searchableSectionOnPage) {
                    for (var _i = 0, _a = _this._searchableSectionOnPage; _i < _a.length; _i++) {
                        var searchableSection = _a[_i];
                        searchableSection.searchUpdated(_this._searchStr);
                    }
                }
            }, delay);
        }
    };
    MDKPage.prototype._onSearchBackPressed = function () {
        this._searchField.text = '';
        this._searchField.dismissSoftInput();
        for (var _i = 0, _a = this.actionBar.actionItems.getItems(); _i < _a.length; _i++) {
            var item = _a[_i];
            this.actionBar.actionItems.removeItem(item);
        }
        for (var _b = 0, _c = this._defaultActionItems; _b < _c.length; _b++) {
            var item = _c[_b];
            this.actionBar.actionItems.addItem(item);
        }
        this.actionBar.title = this._defaultTitle;
        this.actionBar.titleView = this._defaultView;
        this.actionBar.backgroundColor = this._defaultColor;
        if (app.android) {
            this.actionBar.nativeView.setContentInsetStartWithNavigation(this._defaultContentInsetStartWithNavigation);
        }
        this.actionBar.navigationButton.icon = ClientSettings_1.ClientSettings.getAppLanguageIsRTL() ?
            NAVIGATION_BUTTON_RTL_IMG : NAVIGATION_BUTTON_IMG;
        mdk_sap_1.NavigationBarBridge.applyTitleStyle(this.page, this._defaultColor, this._defaultTitleColor, this._actionBarTitleFont);
    };
    MDKPage.prototype._executeBarcodeScan = function () {
        new mdk_sap_2.BarcodeScannerBridge().open(null, this);
    };
    MDKPage.prototype._executeCapabilityCheck = function () {
        new mdk_sap_2.BarcodeScannerBridge().checkPrerequisite(null, this);
    };
    Object.defineProperty(MDKPage.prototype, "_displayingExternalPage", {
        get: function () {
            return MDKPage_1._isExternalPage;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MDKPage.prototype, "_actionBarTitleFont", {
        get: function () {
            return this.actionBar.style.fontInternal ? this.actionBar.style.fontInternal : font_1.Font.default;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MDKPage.prototype, "pageExists", {
        get: function () {
            var pageExists = false;
            var topFrame = TabFrame_1.TabFrame.getCorrectTopmostFrame();
            if (topFrame) {
                var backStack = topFrame.backStack;
                for (var _i = 0, backStack_1 = backStack; _i < backStack_1.length; _i++) {
                    var entry = backStack_1[_i];
                    if (entry.resolvedPage === this) {
                        pageExists = true;
                    }
                }
            }
            pageExists = pageExists || (!this.isBackNavigation && this === MDKPage_1._navigatingFromPage) || !this.isNavigating;
            return pageExists;
        },
        enumerable: true,
        configurable: true
    });
    MDKPage.prototype.registerDataListeners = function () {
        var _this = this;
        var promises = [];
        if (this.context.readLink) {
            this._dataSubscriptions.push(this.context.readLink);
        }
        var dataSubs = this._definition.dataSubscriptions;
        if (PropertyTypeChecker_1.PropertyTypeChecker.isRule(dataSubs)) {
            promises.push(ValueResolver_1.ValueResolver.resolveValue(dataSubs, this.context).then(function (result) {
                _this._dataSubscriptions = _this._dataSubscriptions.concat(result);
            }));
        }
        else {
            dataSubs.forEach(function (dataSub) {
                promises.push(ValueResolver_1.ValueResolver.resolveValue(dataSub, _this.context).then(function (result) {
                    _this._dataSubscriptions.push(result);
                }));
            });
        }
        return Promise.all(promises).then(function () {
            _this._dataSubscriptions.forEach(function (dataSub) {
                DataEventHandler_1.DataEventHandler.getInstance().subscribe(dataSub, _this);
            });
        });
    };
    MDKPage.prototype._resolveValue = function (values, context) {
        if (values) {
            var promiseArray = [];
            for (var _i = 0, values_1 = values; _i < values_1.length; _i++) {
                var value = values_1[_i];
                promiseArray.push(ValueResolver_1.ValueResolver.resolveValue(value, (context ? context : this.context)));
            }
            return Promise.all(promiseArray);
        }
        else {
            return Promise.resolve(undefined);
        }
    };
    MDKPage.prototype._onNavigatingFrom = function (args) {
        MDKPage_1._navigatingFromPage = args.object;
        MDKPage_1._isBackNavigation = args.isBackNavigation;
        if (!this._isTabsTabPage || !app.ios) {
            mdk_sap_1.Banner.getInstance().prepareToRelocate();
        }
        var pageExists = this.pageExists;
        for (var _i = 0, _a = this._childControls; _i < _a.length; _i++) {
            var control = _a[_i];
            control.onNavigatingFrom(pageExists);
        }
    };
    MDKPage.prototype._onNavigatedFrom = function (args) {
        mdk_sap_1.Banner.getInstance().dismiss();
        if (!args.isBackNavigation && !MDKPage_1._navigatingToPage) {
            var log_3 = 'MDK Client Core - detected a navigation to a view that is not managed by NativeScript.';
            Logger_1.Logger.instance.page.log(log_3);
        }
        var pageExists = this.pageExists;
        for (var _i = 0, _a = this._childControls; _i < _a.length; _i++) {
            var control = _a[_i];
            control.onNavigatedFrom(pageExists);
        }
        if (args.isBackNavigation) {
            if (app.android) {
                this._searchableSectionOnPage = [];
            }
            else {
                MDKPage_1.garbageCollect();
            }
        }
        MDKPage_1._navigatingFromPage = undefined;
        MDKPage_1._isBackNavigation = false;
    };
    MDKPage.prototype._relocateBanner = function () {
        var bannerRelocateNeeded = true;
        var targetFrame = this.frame;
        if (this.pageTag === FlexibleColumnLayout_1.FlexibleColumnLayout.LAYOUTTYPE_TAG) {
            bannerRelocateNeeded = false;
            var control = FlexibleColumnLayout_1.FlexibleColumnLayout.getFlexibleColumnLayoutControl(this);
            if (control) {
                targetFrame = control.getTopMostFlexibleColumnFrame();
                bannerRelocateNeeded = true;
            }
        }
        else if (this.frame instanceof FlexibleColumnFrame_1.FlexibleColumnFrame &&
            !this.frame.isTopMostFlexibleColumnFrame()) {
            bannerRelocateNeeded = false;
        }
        else if (this._definition.getControls().length > 0) {
            var firstDefinitionControl = this._definition.getControls()[0];
            if (firstDefinitionControl.getType() === BaseControlDefinition_1.BaseControlDefinition.type.FormCellContainer) {
                var sectionsDef = firstDefinitionControl.sections;
                for (var _i = 0, sectionsDef_1 = sectionsDef; _i < sectionsDef_1.length; _i++) {
                    var sectionDef = sectionsDef_1[_i];
                    for (var _a = 0, _b = sectionDef.Controls; _a < _b.length; _a++) {
                        var controlData = _b[_a];
                        if (controlData._Type === BaseControlDefinition_1.BaseControlDefinition.type.FormCellFilter) {
                            bannerRelocateNeeded = false;
                            break;
                        }
                    }
                    if (!bannerRelocateNeeded) {
                        break;
                    }
                }
            }
        }
        if (bannerRelocateNeeded && targetFrame) {
            ProgressBannerAction_1.ProgressBannerAction.updateAnchoredFrame(targetFrame);
            mdk_sap_1.Banner.getInstance().relocateTo(targetFrame, TabFrame_1.TabFrame.getBannerAnchorLayout(targetFrame));
        }
    };
    MDKPage.prototype._onNavigatedTo = function (args) {
        var _this = this;
        mdk_sap_1.Banner.getInstance().dismiss();
        var topFrame = TabFrame_1.TabFrame.getCorrectTopmostFrame();
        if (!ClientSettings_1.ClientSettings.isInAppQRScanFlow) {
            var toastMessage = ClientSettings_1.ClientSettings.getConnecionInfoToastMessage();
            if (toastMessage !== '') {
                var data = {
                    background: topFrame,
                    duration: 5,
                    maxNumberOfLines: 3,
                    message: toastMessage,
                };
                mdk_sap_2.Toaster.getInstance().display(data);
                ClientSettings_1.ClientSettings.setConnecionInfoToastMessage('');
            }
        }
        this._relocateBanner();
        if (!MDKPage_1._navigatingToPage) {
            if (topFrame && topFrame._backStack && topFrame._backStack.length > 0) {
                var currentBackStackPage = topFrame._backStack[topFrame._backStack.length - 1].resolvedPage;
                if (!args.isBackNavigation && currentBackStackPage === args.object) {
                    var pageName = currentBackStackPage.definition.name;
                    var prefix = 'MDK Client Core - detected an invalid backStack entry to';
                    var msg_1 = prefix + " '" + pageName + "', removing invalid entry.";
                    Logger_1.Logger.instance.page.log(msg_1);
                    topFrame._backStack.pop();
                    if (MDKPage_1._lastKnownBackStackCount === topFrame._backStack.length) {
                        prefix = 'MDK Client Core - backStack count in sync';
                        msg_1 = prefix + " " + topFrame._backStack.length + " entries.";
                        Logger_1.Logger.instance.page.log(msg_1);
                    }
                    else {
                        prefix = 'MDK Client Core - backStack count out of sync last known';
                        msg_1 = prefix + " " + MDKPage_1._lastKnownBackStackCount + " current " + topFrame._backStack.length + " entries.";
                        Logger_1.Logger.instance.page.log(msg_1);
                    }
                }
            }
        }
        MDKPage_1._lastKnownBackStackCount = topFrame.backStack.length;
        MDKPage_1._navigatingToPage = undefined;
        MDKPage_1._navigatingFromPage = undefined;
        MDKPage_1._isBackNavigation = false;
        this.redrawStaleDataListeners(true);
        if (args.isBackNavigation || this._displayingWaitCursor) {
            this._displayingWaitCursor = false;
            mdk_sap_1.ActivityIndicator.instance.dismiss(this);
        }
        this._checkAndroidBackButton();
        if (this._isActionBarFirstSetupDone) {
            this.enableHamburgerActionBarItem();
        }
        else {
            this.on('ACTION_BAR_INITIALIZED', function () {
                _this.enableHamburgerActionBarItem();
            }, this);
        }
        if (!this.actionBarHidden) {
            this._applyTitleStyle();
        }
        for (var _i = 0, _a = this._childControls; _i < _a.length; _i++) {
            var control = _a[_i];
            control.onNavigatedTo(!this._pageHasLoadedOnce);
        }
        if (this._firstLoadProfileId) {
            Tracer_1.Tracer.commitTrace(this._firstLoadProfileId, "Navigated to page " + this.debugString, 'Page');
            this._firstLoadProfileId = undefined;
        }
    };
    MDKPage.prototype.enableHamburgerActionBarItem = function () {
        if (app.ios) {
            if (this.getBackStackCount() === 0 && !this.isModal() && this.getAppLevelSideDrawer() !== undefined) {
                var firstActionItem = this.actionBar.actionItems.getItemAt(0);
                if (firstActionItem && firstActionItem.text === 'SIDE_DRAWER_MENU') {
                    firstActionItem.visibility = 'visible';
                }
            }
        }
    };
    MDKPage.prototype.getBackStackCount = function () {
        if (this.frame && this.frame.backStack && this.frame.backStack.length >= 0) {
            return this.frame.backStack.length;
        }
        return 0;
    };
    MDKPage.prototype._checkAndroidBackButton = function () {
        var _this = this;
        if (app.android) {
            if (this.frame && !this.isModal()) {
                if (this.actionBar.navigationButton) {
                    if (this.actionBar.navigationButton.text === 'Menu') {
                        this._setAndroidBackButton();
                    }
                    this.actionBar.navigationButton.visibility = 'visible';
                }
                var checkBackStackCount = this.getBackStackCount();
                if (checkBackStackCount === 0 && !this._isSearchActive) {
                    if (this.getAppLevelSideDrawer() === undefined) {
                        if (this.actionBar.navigationButton) {
                            this.actionBar.navigationButton.visibility = 'collapse';
                        }
                    }
                    else {
                        if (!this.actionBar.navigationButton) {
                            this.actionBar.navigationButton = new action_bar_1.NavigationButton();
                        }
                        this.actionBar.navigationButton.text = 'Menu';
                        this.actionBar.navigationButton.icon = 'res://menu';
                        this.actionBar.navigationButton.visibility = 'visible';
                        this.actionBar.navigationButton.on('tap', function (args) {
                            _this.getAppLevelSideDrawer().showDrawer();
                        });
                    }
                }
            }
            this._updateActionBarHidden();
        }
    };
    MDKPage.prototype._alignAppBar = function () {
        if (app.android) {
            this.actionBar.nativeView.setTitleMarginStart(utils.layout.toDevicePixels(16));
        }
    };
    MDKPage.prototype._onNavigatingTo = function (args) {
        MDKPage_1._navigatingToPage = args.object;
        MDKPage_1._isBackNavigation = args.isBackNavigation;
        if (app.ios && !MDKPage_1._navigatingFromPage && MDKPage_1._navigatingToPage &&
            MDKPage_1._navigatingToPage.previousPage && ModalFrame_1.ModalFrame.isModal(MDKPage_1._navigatingToPage.previousPage.frame)) {
            MDKPage_1._navigatingFromPage = MDKPage_1._navigatingToPage.previousPage;
        }
        for (var _i = 0, _a = this._childControls; _i < _a.length; _i++) {
            var control = _a[_i];
            control.onNavigatingTo(!this._pageHasLoadedOnce);
        }
        this._handleNavigatingTo(args);
    };
    MDKPage.prototype._onActivityBackPressed = function (args) {
        var _this = this;
        var backPressedEvent = this._definition.getOnActivityBackPressedEvent();
        if (backPressedEvent) {
            if (backPressedEvent instanceof ListPickerFragmentContainer_1.ToolBarCollapseActionViewEvent) {
                args.cancel = true;
                backPressedEvent.collapseToolBarActionView();
            }
            else {
                var clientAPIProps = this.context.clientAPIProps;
                clientAPIProps.appEventData = args;
                var handler = new EventHandler_1.EventHandler();
                handler.executeActionOrRuleSync(backPressedEvent, this.context).then(function () {
                    if (!args.cancel) {
                        _this._handleBackPressedEventHandler(args);
                    }
                });
            }
        }
        else {
            this._handleBackPressedEventHandler(args);
        }
    };
    MDKPage.prototype._handleBackPressedEventHandler = function (args) {
        if (this.frame instanceof FlexibleColumnFrame_1.FlexibleColumnFrame) {
            var parentFrame = this.frame.parentPage.frame;
            if (parentFrame.backStack.length > 0) {
                args.cancel = true;
                parentFrame.goBack();
            }
            else {
                Application_1.Application.activityBackPressedEventHandler(args);
            }
        }
        else {
            Application_1.Application.activityBackPressedEventHandler(args);
        }
    };
    MDKPage.prototype._handleNavigatingTo = function (args) {
        var _this = this;
        var navigatingToEvent = this._definition.getOnReturningEvent();
        var targetPage = args.object;
        if (args.isBackNavigation) {
            this.context.resetClientAPIProps();
            if (navigatingToEvent && !MDKPage_1._resetActionIsRunning) {
                setTimeout(function () {
                    var handler = new EventHandler_1.EventHandler();
                    handler.executeActionOrRule(navigatingToEvent, _this.context);
                }, 500);
            }
            MDKPage_1.setResetActionInProgress(false);
            ModalFrame_1.ModalFrame.setCurrentModalPage(targetPage);
        }
    };
    MDKPage.prototype._sortActionBarItemsByPosition = function () {
        var items = this._definition.getActionBarItems();
        if (this.getAppLevelSideDrawer() !== undefined) {
            var sideDrawerItem = {
                'Position': 'Left',
                'Text': 'SIDE_DRAWER_MENU',
                'OnPress': 'SIDE_DRAWER_CLICKED',
                'Visible': false,
                'Icon': 'res://menu',
                'positionResolved': 'Left',
                'orgIndex': 1
            };
            items = [sideDrawerItem].concat(items);
        }
        if (items.length === 0) {
            return Promise.resolve([items, null]);
        }
        var promises = [];
        var _loop_1 = function (item) {
            promises.push(ValueResolver_1.ValueResolver.resolveValue(item.Position, this_1.context).then(function (result) {
                item.positionResolved = result.toLowerCase();
            }));
            if (item.hasOwnProperty('Style') && item.Style) {
                promises.push(ValueResolver_1.ValueResolver.resolveValue(item.Style, this_1.context).then(function (result) {
                    item.styleResolved = result;
                }));
            }
        };
        var this_1 = this;
        for (var _i = 0, items_1 = items; _i < items_1.length; _i++) {
            var item = items_1[_i];
            _loop_1(item);
        }
        return Promise.all(promises).then(function () {
            var firstLeftItem = null;
            if (app.android) {
                var leftItems = [];
                var rightItems = [];
                items.forEach(function (item, index) {
                    item.orgIndex = index;
                });
                for (var _i = 0, items_2 = items; _i < items_2.length; _i++) {
                    var item = items_2[_i];
                    if (item.positionResolved === 'right') {
                        rightItems.push(item);
                    }
                    else {
                        if (!firstLeftItem) {
                            firstLeftItem = item;
                        }
                        leftItems.push(item);
                    }
                }
                items = leftItems.concat(rightItems);
            }
            return Promise.resolve([items, firstLeftItem]);
        });
    };
    MDKPage.prototype._actionBarItemOnTap = function (args, item) {
        this.dismissPopover();
        if (this.isNavigating) {
            return;
        }
        else {
            if (item.OnPress === 'SIDE_DRAWER_CLICKED') {
                this.getAppLevelSideDrawer().showDrawer();
                return;
            }
            if (ModalFrame_1.ModalFrame.isTopMostModal()) {
                var topFrame = TabFrame_1.TabFrame.getCorrectTopmostFrame();
                if (topFrame.currentPage === args.object.page) {
                    this._onPressAction(item.OnPress, args.object);
                }
            }
            else {
                this._onPressAction(item.OnPress, args.object);
            }
        }
    };
    MDKPage.prototype._createActionBarItems = function () {
        var _this = this;
        return this._buildItemsForActionBar().then(function (r) {
            return _this._androidSetActionBarNavigationButton(r[0], r[1]).then(function (actionItems) {
                _this.actionBar.actionItems.getItems().forEach(function (item) {
                    _this.actionBar.actionItems.removeItem(item);
                });
                if (app.android) {
                    _this._searchActionItem = null;
                    _this._initSearchActionBarItem('collapse');
                }
                if (!app.ios && !app.android) {
                    if (_this.frame.canGoBack()) {
                        var backButton = new action_bar_1.NavigationButton();
                        backButton.icon = 'nav-back';
                        _this.actionBar.navigationButton = backButton;
                    }
                    else if (_this.isModal()) {
                        if (_this.id === 'ListPickerFragment' &&
                            _this.definition.getControls().length === 1 &&
                            _this.definition.getControls()[0].type === BaseControlDefinition_1.BaseControlDefinition.type.ListPickerFragmentContainer) {
                            var closeButton = new action_bar_1.NavigationButton();
                            closeButton.icon = 'accept';
                            _this.actionBar.navigationButton = closeButton;
                        }
                    }
                    else {
                        _this.actionBar.navigationButton = null;
                    }
                }
                for (var _i = 0, actionItems_1 = actionItems; _i < actionItems_1.length; _i++) {
                    var actionItem = actionItems_1[_i];
                    try {
                        _this.actionBar.actionItems.addItem(actionItem);
                    }
                    catch (err) {
                        Logger_1.Logger.instance.page.error(err);
                        _this.actionBar.actionItems.removeItem(actionItem);
                    }
                }
                _this._checkAndroidBackButton();
            });
        });
    };
    MDKPage.prototype._buildItemTextForActionBar = function (item, actionItem) {
        if (item.Text) {
            return ValueResolver_1.ValueResolver.resolveValue(item.Text, this.context).then(function (result) {
                if (result) {
                    actionItem.text = result;
                }
            });
        }
        else {
            return Promise.resolve();
        }
    };
    MDKPage.prototype._buildItemIconForActionBar = function (item, actionItem) {
        var _this = this;
        if (item.Icon) {
            return ValueResolver_1.ValueResolver.resolveValue(item.Icon, this.context, true, [ValueResolver_1.ValueType.FontIcon]).then(function (resolvedIcon) {
                if (app.ios || app.android) {
                    var iconWidth = (app.android) ? IMAGE_WIDTH_ANDROID : IMAGE_WIDTH;
                    var iconHeight = (app.android) ? IMAGE_HEIGHT_ANDROID : IMAGE_HEIGHT;
                    return ImageHelper_1.ImageHelper.processIcon(resolvedIcon, iconWidth, iconHeight, item.IsIconCircular).then(function (resolvedItemIcon) {
                        if (!actionItem.icon) {
                            if (PropertyTypeChecker_1.PropertyTypeChecker.isResourcePath(resolvedItemIcon)) {
                                if (app.android || ImageHelper_1.ImageHelper.resExist(resolvedItemIcon)) {
                                    actionItem.icon = resolvedItemIcon;
                                }
                            }
                            else if (PropertyTypeChecker_1.PropertyTypeChecker.isFilePath(resolvedItemIcon)) {
                                if (ImageHelper_1.ImageHelper.fileExist(resolvedItemIcon)) {
                                    actionItem.icon = resolvedItemIcon;
                                }
                            }
                            else if (utils.isFontIconURI(resolvedItemIcon)) {
                                actionItem.icon = resolvedItemIcon;
                                var itemClassName = _this._getFontIconClassNameForActionBarItem();
                                if (item.styleResolved && item.styleResolved !== '') {
                                    var defaultFontIconStyleObj = StyleHelper_1.StyleHelper.getStyle(CssPropertyParser_1.Selectors.ClassSelector, itemClassName);
                                    var customFontIconStyleObj = StyleHelper_1.StyleHelper.getStyle(CssPropertyParser_1.Selectors.ClassSelector, item.styleResolved);
                                    if (customFontIconStyleObj && customFontIconStyleObj.fontSize) {
                                        if (I18nFormatter_1.I18nFormatter.validateNumber(customFontIconStyleObj.fontSize)) {
                                            customFontIconStyleObj.fontSize = (Number(customFontIconStyleObj.fontSize) + _this._getFontIconSizeAdjustment()).toString();
                                        }
                                    }
                                    var mergedStyleObj = __assign(__assign({}, defaultFontIconStyleObj), customFontIconStyleObj);
                                    itemClassName = item.styleResolved;
                                    if (mergedStyleObj !== customFontIconStyleObj) {
                                        itemClassName += ImageHelper_1.ImageHelper.imageFontIconInternalClassName;
                                        if (!_this._cssClassNames.includes(itemClassName)) {
                                            var cssString = StyleHelper_1.StyleHelper.convertStyleToCssString(mergedStyleObj, itemClassName);
                                            _this.addCss(cssString);
                                            _this._cssClassNames.push(itemClassName);
                                        }
                                    }
                                }
                                actionItem.className = itemClassName;
                            }
                        }
                        if (item.Icon === resolvedIcon) {
                            if (item.IconText && !item.Text) {
                                _this._buildIconText(item, actionItem);
                            }
                        }
                    }).catch(function (err) {
                        if (item.IconText && !item.Text) {
                            _this._buildIconText(item, actionItem);
                        }
                        else {
                            Logger_1.Logger.instance.page.error(ErrorMessage_1.ErrorMessage.format(ErrorMessage_1.ErrorMessage.ACTION_BAR_ICON_PARSE_FAILED, item.Icon));
                        }
                    });
                }
                else {
                    actionItem.icon = resolvedIcon;
                }
            });
        }
        else if (item.IconText && !item.Text) {
            this._buildIconText(item, actionItem);
        }
        else {
            return Promise.resolve();
        }
    };
    MDKPage.prototype._buildIconText = function (item, actionItem) {
        var stylesObject = {};
        var iconTextInitials = ImageHelper_1.ImageHelper.getIconTextInitials(item.IconText);
        var iconTextImage;
        if (item.styleResolved && item.styleResolved !== '') {
            var customFontIconStyleObj = StyleHelper_1.StyleHelper.getStyle(CssPropertyParser_1.Selectors.ClassSelector, item.styleResolved);
            if (customFontIconStyleObj.fontSize) {
                stylesObject.FontSize = parseInt(customFontIconStyleObj.fontSize);
            }
            if (customFontIconStyleObj.color) {
                stylesObject.FontColor = customFontIconStyleObj.color.hex;
            }
            if (customFontIconStyleObj.backgroundColor) {
                stylesObject.BackgroundColor = customFontIconStyleObj.backgroundColor.hex;
            }
        }
        iconTextImage = mdk_sap_1.NativeImages.getInstance().getIconTextImage(iconTextInitials, IMAGE_WIDTH, IMAGE_HEIGHT, JSON.stringify(stylesObject), ICON_TEXT_SCALE_FACTOR);
        var imgSource = image_source_1.fromNativeSource(iconTextImage);
        var imgbase64String = PNG_BASE64_PREFIX + imgSource.toBase64String('png');
        var iconWidth = (app.android) ? IMAGE_WIDTH_ANDROID : IMAGE_WIDTH;
        var iconHeight = (app.android) ? IMAGE_HEIGHT_ANDROID : IMAGE_HEIGHT;
        ImageHelper_1.ImageHelper.processIcon(imgbase64String, iconWidth, iconHeight, item.IsIconCircular).then(function (resolvedItemIcon) {
            if (PropertyTypeChecker_1.PropertyTypeChecker.isFilePath(resolvedItemIcon)) {
                if (ImageHelper_1.ImageHelper.fileExist(resolvedItemIcon)) {
                    actionItem.icon = resolvedItemIcon;
                }
            }
        });
    };
    MDKPage.prototype._getFontIconClassNameForActionBarItem = function () {
        var className = ImageHelper_1.ImageHelper.imageFontIconClassName;
        if (app.android) {
            var layoutDensity = page_1.layout.getDisplayDensity();
            if (layoutDensity >= 3) {
                className = this._imageFontIconClassNameXSmall;
            }
            else if (layoutDensity >= 2.5) {
                className = this._imageFontIconClassNameSmall;
            }
            else {
                className = this._imageFontIconClassNameMedium;
            }
        }
        return className;
    };
    MDKPage.prototype._getFontIconSizeAdjustment = function () {
        var adjustment = 0;
        if (app.android) {
            var layoutDensity = page_1.layout.getDisplayDensity();
            if (layoutDensity >= 3) {
                adjustment = 0;
            }
            else if (layoutDensity >= 2.5) {
                adjustment = 2;
            }
            else {
                adjustment = 4;
            }
        }
        return adjustment;
    };
    MDKPage.prototype._buildItemSystemItemForActionBar = function (item, actionItem) {
        if (item.SystemItem) {
            return ValueResolver_1.ValueResolver.resolveValue(item.SystemItem, this.context).then(function (result) {
                if (result) {
                    var systemIcon = toolbar_plugin_1.SystemItem.parse(result, undefined, ClientSettings_1.ClientSettings.getAppLanguageIsRTL());
                    if (systemIcon !== undefined) {
                        if (app.ios) {
                            actionItem.ios.systemIcon = systemIcon;
                        }
                        else if (app.android) {
                            if (systemIcon.indexOf('res://') > -1) {
                                actionItem.icon = systemIcon;
                            }
                            else if (systemIcon.indexOf('_') > -1) {
                                actionItem.android.systemIcon = systemIcon;
                            }
                            else {
                                actionItem.text = systemIcon;
                            }
                        }
                        else {
                            actionItem.systemItem = result;
                        }
                    }
                }
            });
        }
        else {
            return Promise.resolve();
        }
    };
    MDKPage.prototype._buildItemsForActionBar = function () {
        var _this = this;
        return this._sortActionBarItemsByPosition().then(function (r) {
            var outerPromises = [];
            var items = r[0];
            var firstLeftItem = r[1];
            var actionItems = [];
            var _loop_2 = function (item) {
                var actionItem = new MDKActionBarItem_1.MDKActionItem();
                var promises = [];
                var iconPromise = void 0;
                if (app.ios) {
                    actionItem.ios.position = item.positionResolved;
                }
                else if (app.android) {
                    actionItem.android.position = 'actionBarIfRoom';
                    actionItem['orgIndex'] = item.orgIndex;
                }
                else {
                    actionItem.position = item.positionResolved;
                }
                var textPromise = _this._buildItemTextForActionBar(item, actionItem);
                if (item.Icon && item.Icon.lastIndexOf('https', 0) === 0) {
                    _this._buildItemIconForActionBar(item, actionItem);
                }
                else {
                    iconPromise = _this._buildItemIconForActionBar(item, actionItem);
                }
                promises.push(Promise.all([textPromise, iconPromise]).then(function () {
                    return _this._buildItemSystemItemForActionBar(item, actionItem).then(function () {
                        if (!actionItem.icon && !actionItem.text) {
                            var useDefault = false;
                            if (app.ios) {
                                if (!actionItem.ios.systemIcon) {
                                    useDefault = true;
                                }
                            }
                            else if (app.android) {
                                if (!actionItem.android.systemIcon) {
                                    useDefault = true;
                                }
                            }
                            else {
                                useDefault = false;
                            }
                            if (useDefault) {
                                actionItem.text = ErrorMessage_1.ErrorMessage.ACTION_BAR_ITEM_MISSING_TEXT;
                                Logger_1.Logger.instance.page.error(ErrorMessage_1.ErrorMessage.format(ErrorMessage_1.ErrorMessage.ACTION_BAR_ITEM_TEXT_MISSING));
                            }
                        }
                    });
                }));
                if (item.hasOwnProperty('Visible')) {
                    promises.push(ValueResolver_1.ValueResolver.resolveValue(item.Visible, _this.context).then(function (resolvedVisible) {
                        actionItem.visibility = resolvedVisible ? 'visible' : 'collapse';
                    }));
                }
                actionItem.on('tap', function (args) {
                    _this._actionBarItemOnTap(args, item);
                });
                actionItems.push(actionItem);
                outerPromises.push(Promise.all(promises));
            };
            for (var _i = 0, items_3 = items; _i < items_3.length; _i++) {
                var item = items_3[_i];
                _loop_2(item);
            }
            return Promise.all(outerPromises).then(function () {
                return Promise.resolve([actionItems, firstLeftItem]);
            }).catch(function (err) {
                Logger_1.Logger.instance.page.error(err);
            });
        });
    };
    MDKPage.prototype._androidSetActionBarNavigationButton = function (actionItems, firstLeftItem) {
        var _this = this;
        if (app.android) {
            if (firstLeftItem && this.isModal() && !(this.previousPage && this.previousPage.isModal())) {
                if (!this.actionBar.navigationButton) {
                    this.actionBar.navigationButton = new action_bar_1.NavigationButton();
                }
                var firstLeftActionItem = actionItems[0];
                actionItems.shift();
                this.actionBar.navigationButton.text = firstLeftActionItem.text;
                this.actionBar.navigationButton.icon = firstLeftActionItem.icon;
                if (firstLeftActionItem.className) {
                    this.actionBar.navigationButton.className = firstLeftActionItem.className;
                }
                this.actionBar.navigationButton.android.systemIcon = firstLeftActionItem.android.systemIcon;
                this.actionBar.navigationButton.visibility = firstLeftActionItem.visibility;
                this.actionBar.navigationButton.on('tap', function (args) {
                    _this._actionBarItemOnTap(args, firstLeftItem);
                });
            }
            else if (!this.isModal() || (this.isModal() && this.previousPage && this.previousPage.isModal())) {
                this._setAndroidBackButton();
            }
        }
        return Promise.resolve(actionItems);
    };
    MDKPage.prototype._setAndroidBackButton = function () {
        this.actionBar.navigationButton = new action_bar_1.NavigationButton();
        this.actionBar.navigationButton.text = 'Back';
        this.actionBar.navigationButton.icon = ClientSettings_1.ClientSettings.getAppLanguageIsRTL() ? NAVIGATION_BUTTON_RTL_IMG : NAVIGATION_BUTTON_IMG;
        this.actionBar.navigationButton.on('tap', this._onBackButtonTap.bind(this));
    };
    MDKPage.prototype._initSearchActionBarItem = function (visibility) {
        var _this = this;
        if (this._searchActionItem === null) {
            this._searchActionItem = new MDKActionBarItem_1.MDKActionItem();
            this._searchActionItem.icon = 'res://outline_search_white_24';
            this._searchActionItem.on('tap', function (args) {
                _this._activateSearch();
            });
            this.actionBar.actionItems.addItem(this._searchActionItem);
        }
        this._searchActionItem.visibility = visibility;
    };
    MDKPage.prototype._initializeActionBar = function () {
        var _this = this;
        var actionBarPromise = Promise.resolve();
        if (this.actionBar && !this.actionBarHidden) {
            this.actionBar.flat = true;
            this._actionBarTitleStyle = this._getTitleStyleObject(CssPropertyParser_1.Selectors.TypeSelector, 'ActionBarTitle');
            if (this._actionBarTitleStyle.titleColor) {
                if (this.actionBar instanceof MDKActionBar_1.MDKActionBar) {
                    this.actionBar.setTitleColor(this._actionBarTitleStyle.titleColor);
                }
            }
            this.actionBar.on('classNameChange', function (args) {
                _this._applyTitleStyle();
                _this.actionBar.update();
            });
            actionBarPromise = this._setActionbarTitle()
                .then(function () {
                return _this._createActionBarItems();
            })
                .then(function () {
                _this._updateActionBarHidden();
                _this._alignAppBar();
            });
        }
        return actionBarPromise;
    };
    MDKPage.prototype._updateActionBarHidden = function (isActionBarHidden) {
        if (isActionBarHidden === undefined) {
            if (!this.actionBar.title && this._getActionBarItemsCount() === 0) {
                isActionBarHidden = true;
            }
            else {
                isActionBarHidden = false;
            }
        }
        if (this.frame && FlexibleColumnFrame_1.FlexibleColumnFrame.isFlexibleColumnFrame(this.frame.id)) {
            isActionBarHidden = false;
        }
        if (this.frame && this.pageTag === FlexibleColumnLayout_1.FlexibleColumnLayout.LAYOUTTYPE_TAG) {
            var backStackCount = this.getBackStackCount();
            if (backStackCount > 0 || (backStackCount === 0 && this.frame.currentPage)) {
                isActionBarHidden = false;
            }
        }
        if (!isActionBarHidden) {
            if (TabFrame_1.TabFrame.isTabsTabFrame(this.frame)) {
                isActionBarHidden = true;
            }
        }
        if (this.actionBarHidden !== isActionBarHidden) {
            this.actionBarHidden = isActionBarHidden;
            if (app.android && this.frame) {
                this.frame.actionBarVisibility = isActionBarHidden ? 'never' : 'auto';
            }
            this.actionBar.update();
        }
        else if (app.android && this.frame) {
            var actionBarVisibility = isActionBarHidden ? 'never' : 'auto';
            if (this.frame.actionBarVisibility !== actionBarVisibility) {
                this.frame.actionBarVisibility = isActionBarHidden ? 'never' : 'auto';
                this.actionBar.update();
            }
        }
    };
    MDKPage.prototype._getActionBarItemsCount = function () {
        var actionBarItemCount = this.actionBar.actionItems.getItems().length;
        if (app.android) {
            if (actionBarItemCount === 1) {
                if (this.actionBar.actionItems.getItems()[0].visibility === 'collapse') {
                    actionBarItemCount = 0;
                }
            }
        }
        return actionBarItemCount;
    };
    MDKPage.prototype._onPressAction = function (action, actionItem) {
        var clientAPIProps = this.context.clientAPIProps;
        clientAPIProps.pressedItem = PressedItem_1.PressedItem.WithActionItem(actionItem);
        var oEventHandler = new EventHandler_1.EventHandler();
        var executeSource = new ExecuteSource_1.ExecuteSource(this.frame.id);
        executeSource.sourceType = ExecuteSource_1.ExecuteSourceType.ParentPage;
        if (TabFrame_1.TabFrame.isTab(actionItem.page.frame)) {
            executeSource.sourceType = ExecuteSource_1.ExecuteSourceType.TabPage;
            if (TabFrame_1.TabFrame.isChildTabs(actionItem.page.frame)) {
                executeSource.sourceType = ExecuteSource_1.ExecuteSourceType.TabPageParent;
            }
            else {
                var parentFrame = TabFrame_1.TabFrame.getParentTopmostFrame(actionItem.page.frame);
                if (parentFrame && TabFrame_1.TabFrame.isTab(parentFrame)) {
                    executeSource.sourceType = ExecuteSource_1.ExecuteSourceType.TabPageChild;
                }
            }
        }
        else if (ModalFrame_1.ModalFrame.isModal(actionItem.page.frame)) {
            executeSource.sourceType = ExecuteSource_1.ExecuteSourceType.ModalPage;
        }
        oEventHandler.setEventSource(executeSource);
        this.context.clientAPIProps.eventSource = executeSource;
        return oEventHandler.executeActionOrRule(action, this.context);
    };
    MDKPage.prototype._resolveModalPromise = function (modalPage) {
        var _this = this;
        var promise = Promise.resolve();
        var context = undefined;
        if (modalPage && modalPage.context) {
            context = modalPage.context;
        }
        if (!this._modalCanceled) {
            var filterResult = this._filterResult || (modalPage ? modalPage.definition.getResult() : undefined);
            if (filterResult) {
                promise = this._resolveValue(filterResult, context);
            }
        }
        return promise.then(function (result) {
            if (_this._modalCanceled && _this._onModalCancel) {
                _this._onModalCancel('canceled');
                return 'canceled';
            }
            else if (_this._onModalComplete) {
                _this._onModalComplete(result);
                return result;
            }
        }).then(function (result) {
            delete _this._modalCanceled;
            delete _this._onModalCancel;
            delete _this._onModalComplete;
            return result;
        });
    };
    MDKPage.prototype._setActionbarTitle = function () {
        var _this = this;
        var caption = this._definition.getCaption();
        var promise = Promise.resolve();
        var setTitle = function (resolvedCaption) {
            var updateTitle = true;
            if (app.ios) {
                if (!(_this.frame && _this.frame.ios && _this.frame.ios.controller)) {
                    updateTitle = false;
                    Logger_1.Logger.instance.page.log('_setActionbarTitle: frame.ios.controller unavailable');
                }
            }
            if (updateTitle) {
                _this.actionBar.title = resolvedCaption;
                _this._applyTitleStyle();
            }
        };
        if (!ValueResolver_1.ValueResolver.canResolve(caption)) {
            setTitle(caption);
        }
        else {
            promise = ValueResolver_1.ValueResolver.resolveValue(this._definition.getCaption(), this.context).then(setTitle);
        }
        return promise;
    };
    MDKPage.prototype._applyTitleStyle = function () {
        if (!this || !this.parent || !this.actionBar.style || !this._actionBarTitleStyle) {
            return;
        }
        var titleFont = this._actionBarTitleFont;
        this._backgroundColor = this.actionBar.style.backgroundColor;
        var color = this._actionBarTitleStyle.titleColor || this.actionBar.style.color;
        var fontSize = this._actionBarTitleStyle.fontSize;
        var fontFamily = this._actionBarTitleStyle.fontFamily;
        var fontStyle = this._actionBarTitleStyle.fontStyle;
        var fontWeight = this._actionBarTitleStyle.fontWeight;
        if (color) {
            this._titleColor = (typeof color === 'string') ? CssPropertyParser_1.CssPropertyParser.createColor(color) : color;
        }
        if (fontSize) {
            fontSize = CssPropertyParser_1.CssPropertyParser.createFontSize(fontSize);
            titleFont = titleFont.withFontSize(fontSize);
        }
        if (fontFamily) {
            titleFont = titleFont.withFontFamily(fontFamily);
        }
        else if (app.android) {
            titleFont = titleFont.withFontFamily('f72_regular');
        }
        if (fontStyle) {
            titleFont = titleFont.withFontStyle(fontStyle);
        }
        if (fontWeight) {
            titleFont = titleFont.withFontWeight(fontWeight);
        }
        if (app.android) {
            this.androidSearchbarUISetupHelper(false);
        }
        mdk_sap_1.NavigationBarBridge.applyTitleStyle(this, this._backgroundColor, this._titleColor, titleFont);
    };
    MDKPage.prototype._getTitleStyleObject = function (selectorType, selectorName) {
        var titleColor = CssPropertyParser_1.CssPropertyParser.getPropertyFromSelector(selectorType, selectorName, 'color');
        var fontSize = CssPropertyParser_1.CssPropertyParser.getPropertyFromSelector(selectorType, selectorName, 'font-size');
        var fontFamily = CssPropertyParser_1.CssPropertyParser.getPropertyFromSelector(selectorType, selectorName, 'font-family');
        var fontWeight = CssPropertyParser_1.CssPropertyParser.getPropertyFromSelector(selectorType, selectorName, 'font-weight');
        var fontStyle = CssPropertyParser_1.CssPropertyParser.getPropertyFromSelector(selectorType, selectorName, 'font-style');
        return {
            titleColor: titleColor,
            fontSize: fontSize,
            fontFamily: fontFamily,
            fontWeight: fontWeight,
            fontStyle: fontStyle,
        };
    };
    MDKPage.prototype._onBackButtonTap = function (args) {
        this.dismissPopover();
        if (app.android) {
            try {
                var activity = app.android.foregroundActivity;
                var context = app.android.context;
                var inputManager = context.getSystemService(android.content.Context.INPUT_METHOD_SERVICE);
                var token = activity.getCurrentFocus().getWindowToken();
                inputManager.hideSoftInputFromWindow(token, android.view.inputmethod.InputMethodManager.HIDE_NOT_ALWAYS);
            }
            catch (error) {
                Logger_1.Logger.instance.page.log(error);
            }
            if (this._isSearchActive) {
                this._isSearchActive = false;
                this._checkAndroidBackButton();
                return;
            }
        }
        if (this.isNavigating) {
            return;
        }
        else {
            var topFrame = void 0;
            if (this.parent instanceof frameModule.Frame) {
                topFrame = this.parent;
            }
            else {
                var executeSource = new ExecuteSource_1.ExecuteSource(this.frame.id);
                executeSource.sourceType = ExecuteSource_1.ExecuteSourceType.ParentPage;
                if (TabFrame_1.TabFrame.isTab(this.parent)) {
                    executeSource.sourceType = ExecuteSource_1.ExecuteSourceType.TabPage;
                }
                else if (ModalFrame_1.ModalFrame.isModal(this.parent)) {
                    executeSource.sourceType = ExecuteSource_1.ExecuteSourceType.ModalPage;
                }
                topFrame = TabFrame_1.TabFrame.getCorrectTopmostFrame(executeSource);
            }
            topFrame.goBack();
        }
    };
    MDKPage.prototype._runOnLoadedEvent = function () {
        var onLoadedPromise = Promise.resolve();
        var onLoadedEvent = this._definition.getOnLoadedEvent();
        if (onLoadedEvent) {
            var handler = new EventHandler_1.EventHandler();
            onLoadedPromise = handler.executeActionOrRule(onLoadedEvent, this.context).then(function () {
                PageRenderer_1.PageRenderer.currentlyRenderedPage = undefined;
            }).catch(function () {
                PageRenderer_1.PageRenderer.currentlyRenderedPage = undefined;
            });
        }
        else {
            PageRenderer_1.PageRenderer.currentlyRenderedPage = undefined;
        }
        return onLoadedPromise;
    };
    MDKPage.prototype._debugPrintBackStack = function () {
        var topFrame = TabFrame_1.TabFrame.getCorrectTopmostFrame();
        if (!topFrame) {
            return;
        }
        var backStack = topFrame.backStack;
        for (var index_1 = 0; index_1 < backStack.length; index_1++) {
            var entry = backStack[index_1];
            var indent = '  '.repeat(index_1 + 1);
            if (entry.resolvedPage instanceof MDKPage_1) {
                Logger_1.Logger.instance.page.log(indent + " - " + index_1 + ": " + entry.resolvedPage.debugString);
            }
            else {
                Logger_1.Logger.instance.page.log(indent + " - " + index_1 + ": > Not an MDKPage <");
            }
        }
    };
    var MDKPage_1;
    MDKPage._navigatingFromPage = undefined;
    MDKPage._navigatingToPage = undefined;
    MDKPage._lastKnownBackStackCount = 0;
    MDKPage._isBackNavigation = undefined;
    MDKPage._nextPageId = 0;
    MDKPage._resetActionIsRunning = false;
    MDKPage._isExternalPage = false;
    MDKPage = MDKPage_1 = __decorate([
        view_1.CSSType('MDKPage'),
        __metadata("design:paramtypes", [PageDefinition_1.PageDefinition, Boolean])
    ], MDKPage);
    return MDKPage;
}(page_1.Page));
exports.MDKPage = MDKPage;
exports.anchorColorProperty = new view_1.CssProperty({
    name: 'anchorColor', cssName: 'anchorcolor', defaultValue: new color_1.Color('#ffffff'), valueConverter: function (v) {
        var aColor = new color_1.Color(v);
        return aColor;
    },
});
exports.anchorColorProperty.register(view_1.Style);

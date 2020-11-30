"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var BaseSection_1 = require("./BaseSection");
var PressedItem_1 = require("../controls/PressedItem");
var BaseTableSection = (function (_super) {
    __extends(BaseTableSection, _super);
    function BaseTableSection(props) {
        return _super.call(this, props) || this;
    }
    Object.defineProperty(BaseTableSection.prototype, "searchString", {
        get: function () {
            return this.observable().searchString;
        },
        enumerable: true,
        configurable: true
    });
    BaseTableSection.prototype.filterUpdated = function (filter) {
        return this.observable().filterUpdated(filter);
    };
    BaseTableSection.prototype.getOrderBy = function () {
        return this.observable().getOrderBy();
    };
    BaseTableSection.prototype.getBoundData = function (row) {
        return this.observable().getBoundData(row);
    };
    BaseTableSection.prototype.isDataBounded = function (row) {
        return this.observable().isDataBounded(row);
    };
    BaseTableSection.prototype.onPageUnloaded = function (pageExists) {
        this.observable().onPageUnloaded(pageExists);
    };
    BaseTableSection.prototype.loadMoreItems = function () {
        return this.observable().loadMoreItems();
    };
    BaseTableSection.prototype.onPress = function (cell, viewFacade) {
        this._onPress(cell, viewFacade, 'OnPress');
    };
    BaseTableSection.prototype.onAccessoryButtonPress = function (cell, viewFacade) {
        this._onPress(cell, viewFacade, 'OnAccessoryButtonPress');
    };
    BaseTableSection.prototype.setIndicatorState = function (newState, pressedItem) {
        var params = {
            pressedItem: pressedItem,
            row: this.observable().selectedItem.row,
            state: newState,
        };
        this._sectionBridge.setIndicatorState(params);
    };
    BaseTableSection.prototype.onPageLoaded = function (initialLoading) {
        if (!initialLoading && this._sectionBridge) {
            this._sectionBridge.refreshIndicators();
            this._sectionBridge.redrawLayout();
        }
    };
    BaseTableSection.prototype.searchUpdated = function (searchText) {
        return this.observable().searchUpdated(searchText);
    };
    BaseTableSection.prototype.viewDidAppear = function () {
        var currentBounds = this.page._getCurrentLayoutBounds();
        if (currentBounds.top === 0) {
            this.page.onLayout(currentBounds.left, currentBounds.top, currentBounds.right, currentBounds.bottom);
        }
    };
    BaseTableSection.prototype._onPress = function (cell, viewFacade, action) {
        this.page.context.clientAPIProps.pressedItem = PressedItem_1.PressedItem.WithControlView(viewFacade);
        if (this.page.searchField) {
            this.page.searchField.dismissSoftInput();
        }
        return this.observable().onPress(cell, action);
    };
    BaseTableSection.prototype.hideLazyLoadingIndicator = function () {
        this._sectionBridge.hideLazyLoadingIndicator();
    };
    return BaseTableSection;
}(BaseSection_1.BaseSection));
exports.BaseTableSection = BaseTableSection;
;

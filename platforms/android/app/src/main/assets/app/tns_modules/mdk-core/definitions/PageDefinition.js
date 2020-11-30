"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ContainerDefinition_1 = require("./ContainerDefinition");
var ToolbarDefinition_1 = require("./ToolbarDefinition");
var BaseControlDefinition_1 = require("./controls/BaseControlDefinition");
var SideDrawerDefinition_1 = require("./controls/SideDrawer/SideDrawerDefinition");
var PageDefinition = (function (_super) {
    __extends(PageDefinition, _super);
    function PageDefinition(path, data) {
        var _this = _super.call(this, path, data) || this;
        if (data.ToolBar && data.ToolBar.Controls) {
            _this.toolbar = new ToolbarDefinition_1.ToolbarDefinition(path, data.ToolBar);
        }
        return _this;
    }
    PageDefinition.prototype.getActionBarItems = function () {
        if (this.data.ActionBar && this.data.ActionBar.Items) {
            return this.data.ActionBar.Items;
        }
        else {
            return [];
        }
    };
    PageDefinition.prototype.getToolbar = function () {
        return this.toolbar;
    };
    PageDefinition.prototype.getBottomNavigation = function () {
        var bottomNavControlDef;
        var pageControls = this.getControls();
        for (var i = 0; i < pageControls.length; i++) {
            if (pageControls[i].getType() === BaseControlDefinition_1.BaseControlDefinition.type.BottomNavigation) {
                bottomNavControlDef = pageControls[i];
                break;
            }
        }
        return bottomNavControlDef;
    };
    PageDefinition.prototype.getFlexibleColumnLayout = function () {
        var flexColumnLayoutDef;
        var pageControls = this.getControls();
        for (var i = 0; i < pageControls.length; i++) {
            if (pageControls[i].getType() === BaseControlDefinition_1.BaseControlDefinition.type.FlexibleColumnLayout) {
                flexColumnLayoutDef = pageControls[i];
                break;
            }
        }
        return flexColumnLayoutDef;
    };
    PageDefinition.prototype.getSideDrawer = function () {
        var sideDrawerDefinition;
        var pageControls = this.data.Controls;
        if (pageControls) {
            for (var i = 0; i < pageControls.length; i++) {
                if (pageControls[i]._Type === BaseControlDefinition_1.BaseControlDefinition.type.SideDrawer) {
                    sideDrawerDefinition = new SideDrawerDefinition_1.SideDrawerDefinition('', pageControls[i], this);
                    break;
                }
            }
        }
        return sideDrawerDefinition;
    };
    PageDefinition.prototype.getOnLoadedEvent = function () {
        return this.data.OnLoaded;
    };
    PageDefinition.prototype.getOnReturningEvent = function () {
        return this.data.OnReturning;
    };
    PageDefinition.prototype.getOnResumeEvent = function () {
        return this.data.OnResume;
    };
    PageDefinition.prototype.getOnUnLoadedEvent = function () {
        return this.data.OnUnloaded;
    };
    PageDefinition.prototype.getOnActivityBackPressedEvent = function () {
        return this.data.OnActivityBackPressed;
    };
    PageDefinition.prototype.getResult = function () {
        return this.data.Result;
    };
    Object.defineProperty(PageDefinition.prototype, "dataSubscriptions", {
        get: function () {
            return this.data.DataSubscriptions || [];
        },
        enumerable: true,
        configurable: true
    });
    PageDefinition.prototype.getPullDown = function () {
        return this.data.PullDown;
    };
    return PageDefinition;
}(ContainerDefinition_1.ContainerDefinition));
exports.PageDefinition = PageDefinition;
;

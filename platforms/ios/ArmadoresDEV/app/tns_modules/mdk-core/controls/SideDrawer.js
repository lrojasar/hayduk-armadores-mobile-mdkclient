"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var scroll_view_1 = require("tns-core-modules/ui/scroll-view");
var nativescript_ui_sidedrawer_1 = require("nativescript-ui-sidedrawer");
var label_1 = require("tns-core-modules/ui/label");
var image_1 = require("tns-core-modules/ui/image");
var stack_layout_1 = require("tns-core-modules/ui/layouts/stack-layout");
var stack_layout_2 = require("@nativescript-rtl/ui/stack-layout");
var EventHandler_1 = require("./../EventHandler");
var ExecuteSource_1 = require("../common/ExecuteSource");
var Context_1 = require("../context/Context");
var PageRenderer_1 = require("../pages/PageRenderer");
var PageDefinition_1 = require("../definitions/PageDefinition");
var tab_strip_item_1 = require("tns-core-modules/ui/tab-navigation-base/tab-strip-item");
var BaseControl_1 = require("./BaseControl");
var gestures_1 = require("tns-core-modules/ui/gestures");
var SideDrawerDataBuilder_1 = require("../builders/ui/SideDrawer/SideDrawerDataBuilder");
var SideDrawerHeaderDataBuilder_1 = require("../builders/ui/SideDrawer/SideDrawerHeaderDataBuilder");
var SideDrawerSectionDataBuilder_1 = require("../builders/ui/SideDrawer/SideDrawerSectionDataBuilder");
var SideDrawerItemDataBuilder_1 = require("../builders/ui/SideDrawer/SideDrawerItemDataBuilder");
var ImageHelper_1 = require("../utils/ImageHelper");
var utils = require("tns-core-modules/utils/utils");
var enums_1 = require("tns-core-modules/ui/enums");
var ValueResolver_1 = require("../utils/ValueResolver");
var AppSettingsManager_1 = require("../utils/AppSettingsManager");
var app = require("tns-core-modules/application");
var MDKNavigationType_1 = require("../common/MDKNavigationType");
var SideDrawerObservable_1 = require("../observables/SideDrawerObservable");
var PropertyTypeChecker_1 = require("../utils/PropertyTypeChecker");
var EvaluateTarget_1 = require("../data/EvaluateTarget");
var DataHelper_1 = require("../utils/DataHelper");
var observable_array_1 = require("tns-core-modules/data/observable-array");
var Logger_1 = require("../utils/Logger");
var mdk_sap_1 = require("mdk-sap");
var image_source_1 = require("tns-core-modules/image-source");
var CssPropertyParser_1 = require("../utils/CssPropertyParser");
var IDefinitionProvider_1 = require("../definitions/IDefinitionProvider");
var TabFrame_1 = require("../pages/TabFrame");
var MDKFrame_1 = require("../pages/MDKFrame");
var trace_1 = require("tns-core-modules/trace");
var SideDrawer = (function (_super) {
    __extends(SideDrawer, _super);
    function SideDrawer() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._imageFontIconClassName = 'sap-icons';
        _this._selectedItem = [0, 0];
        _this.MENU_ITEM_IMAGE_WIDTH = 96;
        _this.MENU_ITEM_IMAGE_HEIGHT = 96;
        _this.HEADER_ICON_HEIGHT = 100;
        _this.HEADER_ICON_WIDTH = 100;
        _this.PNG_BASE64_PREFIX = 'data:image/png;base64;alwaystemplate,';
        return _this;
    }
    SideDrawer.prototype.initialize = function (controlData) {
        _super.prototype.initialize.call(this, controlData);
        this.observable();
        this._radSideDrawerView = new nativescript_ui_sidedrawer_1.RadSideDrawer();
        this._radSideDrawerView.on('onLoaded', this.onLoaded);
    };
    SideDrawer.prototype.bind = function () {
        if (app.ios || app.android) {
            return this.createDrawer(this.definition());
        }
        else {
            return Promise.resolve();
        }
    };
    SideDrawer.prototype.renderMainPage = function () {
        var _this = this;
        return this.bind().then(function () {
            if (_this._clearHistory) {
                return _this.navigateToSelectedItem(_this._selectedItem[0], _this._selectedItem[1]);
            }
            else {
                return _this.buildNavStackForMenus();
            }
        }).then(function (navigationEntry) {
            var firstMenuItemDef = _this.definition().sections[0].items[0];
            if (firstMenuItemDef.action !== undefined) {
                var timeout = _this._clearHistory ? 0 : 500;
                setTimeout(function () {
                    return _this.executeOnPressActionOrRule(firstMenuItemDef);
                }, timeout);
            }
            return navigationEntry;
        });
    };
    SideDrawer.prototype.view = function () {
        return this._radSideDrawerView;
    };
    SideDrawer.prototype.closeDrawer = function () {
        this._radSideDrawerView.closeDrawer();
    };
    SideDrawer.prototype.showDrawer = function () {
        this._radSideDrawerView.showDrawer();
    };
    SideDrawer.prototype.onLoaded = function () {
        this.view().onLoaded();
        this.view().allowEdgeSwipe = true;
    };
    SideDrawer.prototype.getItemWithIndexPath = function (sectionIdx, idx) {
        var sectionView = this.getSectionWithIndex(sectionIdx);
        var itemIndex = idx;
        if (sectionView.getChildAt(0).typeName === 'Label') {
            itemIndex++;
        }
        return sectionView.getChildAt(itemIndex);
    };
    SideDrawer.prototype.getSectionWithIndex = function (sectionIdx) {
        return this.getMenuView().getChildAt(sectionIdx);
    };
    SideDrawer.prototype.getMenuView = function () {
        var menuViewIndex = this.definition().header ? 1 : 0;
        return this._radSideDrawerView.drawerContent.getChildAt(menuViewIndex).content;
    };
    SideDrawer.prototype.getItemsCountPerSection = function () {
        var itemsCountPerSection = [];
        this.definition().sections.map(function (section) {
            itemsCountPerSection.push(section.items.length);
        });
        return itemsCountPerSection;
    };
    SideDrawer.prototype.getSelectedMenuItemIndexPath = function () {
        return this._selectedItem;
    };
    SideDrawer.prototype.getSelectedMenuItemName = function () {
        var selectedItemView = this.getItemWithIndexPath(this._selectedItem[0], this._selectedItem[1]);
        return selectedItemView.id;
    };
    SideDrawer.prototype.setSelectedMenuItemByName = function (menuItemName) {
        var _this = this;
        var itemsCountPerSection = this.getItemsCountPerSection();
        var indexPath = [0, 0];
        itemsCountPerSection.map(function (count, sectionIndex) {
            for (var itemIndex = 0; itemIndex < count; itemIndex++) {
                var item = _this.getItemWithIndexPath(sectionIndex, itemIndex);
                if (item.id === menuItemName) {
                    indexPath = [sectionIndex, itemIndex];
                    break;
                }
            }
        });
        this.setSelectedMenuItemByIndexPath(indexPath);
    };
    SideDrawer.prototype.setSelectedMenuItemByIndexPath = function (menuItemIndexPath) {
        if (menuItemIndexPath[0] > -1 && menuItemIndexPath[1] > -1) {
            if (this.getSelectedMenuItemIndexPath() !== menuItemIndexPath) {
                this.menuItemSelected(menuItemIndexPath[0], menuItemIndexPath[1]);
            }
        }
    };
    SideDrawer.prototype.getSectionCaptions = function () {
        var sectionCaptions = [];
        var sectionIndex = 0;
        while (this.getSectionWithIndex(sectionIndex)) {
            var section_1 = this.getSectionWithIndex(sectionIndex);
            sectionCaptions.push(section_1.getChildAt(0).text);
            sectionIndex++;
        }
        return sectionCaptions;
    };
    SideDrawer.prototype.setSectionVisibilityAtIndex = function (sectionIndex, visibility) {
        var section = this.getSectionWithIndex(sectionIndex);
        if (visibility) {
            section.visibility = 'visible';
        }
        else {
            section.visibility = 'collapse';
        }
    };
    SideDrawer.prototype.getMenuItemCaption = function (indexPath) {
        var itemView = this.getItemWithIndexPath(indexPath[0], indexPath[1]);
        return itemView.getChildAt(1).text;
    };
    SideDrawer.prototype.setMenuItemCaption = function (indexPath, caption) {
        var itemView = this.getItemWithIndexPath(indexPath[0], indexPath[1]);
        itemView.getChildAt(1).text = caption;
    };
    SideDrawer.prototype.setMenuItemVisibility = function (indexPath, visibility) {
        var itemView = this.getItemWithIndexPath(indexPath[0], indexPath[1]);
        if (visibility) {
            itemView.visibility = 'visible';
        }
        else {
            itemView.visibility = 'collapse';
        }
    };
    SideDrawer.prototype.redraw = function () {
        this.bind();
    };
    SideDrawer.prototype.createObservable = function () {
        return new SideDrawerObservable_1.SideDrawerObservable(this, this.definition(), undefined);
    };
    SideDrawer.prototype.getMenuItemIndexFromIndexPath = function (sectionIdx, itemIndex) {
        var totalNumOfItemsInPrevSections = 0;
        var idx = sectionIdx;
        while (idx !== 0) {
            totalNumOfItemsInPrevSections += this.definition().sections[idx - 1].items.length;
            idx--;
        }
        return totalNumOfItemsInPrevSections + itemIndex;
    };
    SideDrawer.prototype.createDrawer = function (drawerDef) {
        var _this = this;
        var drawerLocation = this.isRtl === true ? nativescript_ui_sidedrawer_1.SideDrawerLocation.Right : nativescript_ui_sidedrawer_1.SideDrawerLocation.Left;
        this._radSideDrawerView.drawerLocation = drawerLocation;
        var drawerContentView = new stack_layout_1.StackLayout();
        var drawerBuilder = new SideDrawerDataBuilder_1.SideDrawerDataBuilder(this.context);
        drawerBuilder.setName(drawerDef.name)
            .setClearHistory(drawerDef.clearHistory)
            .setStyles(drawerDef.styles);
        return drawerBuilder.build().then(function (drawerData) {
            drawerContentView.id = drawerData.name;
            _this._clearHistory = drawerData.clearHistory;
            _this._styles = drawerData.styles;
            var drawerContentPromises = [];
            if (drawerDef.header) {
                drawerContentPromises.push(_this.createHeader(drawerDef.header));
            }
            drawerContentPromises.push(_this.createSections(drawerDef.sections));
            return Promise.all(drawerContentPromises).then(function (drawerContentViews) {
                var sectionsView;
                if (drawerDef.header) {
                    var headerView = drawerContentViews[0];
                    drawerContentView.addChild(headerView);
                    sectionsView = drawerContentViews[1];
                }
                else {
                    sectionsView = drawerContentViews[0];
                }
                var drawerItemsContainer = new scroll_view_1.ScrollView();
                drawerItemsContainer.orientation = enums_1.Orientation.vertical;
                drawerItemsContainer.content = sectionsView;
                drawerItemsContainer.height = 'auto';
                drawerContentView.addChild(drawerItemsContainer);
                drawerContentView.className = 'drawerContent ' + (_this._styles ? _this._styles.DrawerBackground : '');
                _this._radSideDrawerView.drawerContent = drawerContentView;
                return Promise.resolve();
            });
        });
    };
    SideDrawer.prototype.createSections = function (sectionsDef) {
        var drawerItemsStack = new stack_layout_1.StackLayout();
        var sectionPromises = [];
        for (var sectionIdx = 0; sectionIdx < sectionsDef.length; sectionIdx++) {
            sectionPromises.push(this.createSection(sectionsDef[sectionIdx], sectionIdx));
        }
        return Promise.all(sectionPromises).then(function (sectionViews) {
            sectionViews.forEach(function (sectionView) {
                drawerItemsStack.addChild(sectionView);
            });
            return drawerItemsStack;
        });
    };
    SideDrawer.prototype.createHeader = function (headerDef) {
        var _this = this;
        return this.resolveData(headerDef).then(function (data) {
            var context = new Context_1.Context();
            context.binding = data;
            var headerBuilder = new SideDrawerHeaderDataBuilder_1.SideDrawerHeaderDataBuilder(context);
            headerBuilder.setIcon(headerDef.icon)
                .setIconIsCircular(headerDef.iconIsCircular)
                .setHeadline(headerDef.headline)
                .setSubHeadline(headerDef.subHeadline)
                .setAction(headerDef.action)
                .setDisableIconText(headerDef.disableIconText);
            var headerView = new stack_layout_1.StackLayout();
            headerView.className = 'sidedrawer-header';
            if (app.ios) {
                headerView.className = _this.getClassNameForRtl('sidedrawer-header');
            }
            headerView.className += ' ' + (_this._styles ? _this._styles.HeaderSeparator + ' ' + _this._styles.HeaderBackground : '');
            return headerBuilder.build().then(function (headerData) {
                if (headerData.action) {
                    headerView.on('tap', function () {
                        _this.executeOnPressActionOrRule(headerData);
                        _this.closeDrawer();
                    }, _this);
                }
                var headerIcon = new image_1.Image();
                headerIcon.className = _this.getClassNameForRtl('sidedrawer-header-icon');
                if (headerData.iconIsCircular) {
                    headerIcon.borderRadius = _this.HEADER_ICON_WIDTH / 2;
                }
                headerView.addChild(headerIcon);
                if (headerData.icon && headerData.icon !== '') {
                    ImageHelper_1.ImageHelper.processIcon(headerData.icon, _this.HEADER_ICON_WIDTH, _this.HEADER_ICON_HEIGHT).then(function (resolvedIcon) {
                        if (resolvedIcon !== null) {
                            headerIcon.src = resolvedIcon;
                            if (utils.isFontIconURI(resolvedIcon)) {
                                headerIcon.className += ' ' + _this._imageFontIconClassName;
                            }
                        }
                        else {
                            _this.setHeaderIconWithTextIcon(headerView, headerIcon, headerData);
                        }
                    }).catch(function (error) {
                        Logger_1.Logger.instance.ui.error(Logger_1.Logger.SIDEDRAWER_HEADER_ICON_PARSE_FAILED, error, error ? error.stack : '');
                        _this.setHeaderIconWithTextIcon(headerView, headerIcon, headerData);
                    });
                }
                else {
                    _this.setHeaderIconWithTextIcon(headerView, headerIcon, headerData);
                }
                var headerHeadline = new label_1.Label();
                headerHeadline.text = headerData.headline;
                headerHeadline.className = 'sidedrawer-header-headline ' + (_this._styles ? _this._styles.HeaderHeadline : '');
                headerView.addChild(headerHeadline);
                var headerSubHeadline = new label_1.Label();
                headerSubHeadline.text = headerData.subHeadline;
                headerSubHeadline.className = 'sidedrawer-header-subheadline ' + (_this._styles ? _this._styles.HeaderSubHeadline : '');
                headerView.addChild(headerSubHeadline);
                return headerView;
            });
        });
    };
    SideDrawer.prototype.getHeaderIconTextStyles = function () {
        var fontSizeProperty = 'font-size';
        var fontColorProperty = 'color';
        var backgroundColorProperty = 'background-color';
        var parsedStyles = {};
        if (this._styles && this._styles.HeaderIcon) {
            var iconTextStyles = this._styles.HeaderIcon;
            var fontSize = CssPropertyParser_1.CssPropertyParser.getPropertyFromSelector(CssPropertyParser_1.Selectors.ClassSelector, iconTextStyles, fontSizeProperty);
            if (fontSize) {
                parsedStyles.FontSize = Number(fontSize);
            }
            var fontColor = CssPropertyParser_1.CssPropertyParser.getPropertyFromSelector(CssPropertyParser_1.Selectors.ClassSelector, iconTextStyles, fontColorProperty);
            if (fontColor) {
                parsedStyles.FontColor = fontColor;
            }
            var backgroundColor = CssPropertyParser_1.CssPropertyParser.getPropertyFromSelector(CssPropertyParser_1.Selectors.ClassSelector, iconTextStyles, backgroundColorProperty);
            if (backgroundColor) {
                parsedStyles.BackgroundColor = backgroundColor;
            }
        }
        return parsedStyles;
    };
    SideDrawer.prototype.setHeaderIconWithTextIcon = function (headerView, headerIcon, headerData) {
        if (!headerData.disableIconText && headerData.headline && headerData.headline !== '') {
            var iconTextStyles = this.getHeaderIconTextStyles();
            var iconTextInitials = ImageHelper_1.ImageHelper.getIconTextInitials(headerData.headline);
            var iconTextImage = mdk_sap_1.NativeImages.getInstance().getIconTextImage(iconTextInitials, this.HEADER_ICON_WIDTH / 3, this.HEADER_ICON_HEIGHT / 3, JSON.stringify(iconTextStyles));
            var imgSource = image_source_1.fromNativeSource(iconTextImage);
            var imgbase64String = this.PNG_BASE64_PREFIX + imgSource.toBase64String('png');
            ImageHelper_1.ImageHelper.processIcon(imgbase64String, this.HEADER_ICON_WIDTH, this.HEADER_ICON_WIDTH, headerData.iconIsCircular).then(function (resolvedIcon) {
                if (PropertyTypeChecker_1.PropertyTypeChecker.isFilePath(resolvedIcon)) {
                    if (ImageHelper_1.ImageHelper.fileExist(resolvedIcon)) {
                        headerIcon.src = resolvedIcon;
                    }
                }
            });
        }
        else {
            headerView.removeChild(headerIcon);
        }
    };
    SideDrawer.prototype.createSection = function (sectionDef, sectionIdx) {
        var _this = this;
        var sectionBuilder = new SideDrawerSectionDataBuilder_1.SideDrawerSectionDataBuilder(this.context);
        sectionBuilder.setName(sectionDef.name)
            .setCaption(sectionDef.caption)
            .setVisible(sectionDef.visible)
            .setPreserveImageSpacing(sectionDef.preserveImageSpacing);
        var sectionView = new stack_layout_1.StackLayout();
        sectionView.className = 'sidedrawer-section';
        if (sectionIdx !== this.definition().sections.length - 1) {
            sectionView.className += ' sidedrawer-section-separator ' + (this._styles ? this._styles.SectionSeparator : '');
        }
        return sectionBuilder.build().then(function (sectionData) {
            sectionView.id = sectionData.name;
            if (sectionData.visible === false) {
                sectionView.visibility = 'collapse';
            }
            if (sectionData.caption && sectionData.caption !== '') {
                var captionView = new label_1.Label();
                captionView.text = sectionData.caption;
                captionView.className = _this.getClassNameForRtl('sidedrawer-section-caption') + ' ' + (_this._styles ? _this._styles.SectionCaption : '');
                sectionView.addChild(captionView);
            }
            var itemPromises = [];
            for (var idx = 0; idx < sectionDef.items.length; idx++) {
                itemPromises.push(_this.createMenuItem(sectionDef.items[idx], sectionIdx, idx, sectionData.preserveImageSpacing));
            }
            return Promise.all(itemPromises).then(function (itemViews) {
                itemViews.forEach(function (itemView) {
                    sectionView.addChild(itemView);
                });
                return sectionView;
            });
        });
    };
    SideDrawer.prototype.createMenuItem = function (itemDef, sectionIdx, idx, preserveImageSpacing) {
        var _this = this;
        var itemBuilder = new SideDrawerItemDataBuilder_1.SideDrawerItemDataBuilder(this.context);
        itemBuilder.setName(itemDef.name)
            .setImage(itemDef.image)
            .setTitle(itemDef.title)
            .setAction(itemDef.action)
            .setVisible(itemDef.visible)
            .setPageToOpen(itemDef.pageToOpen)
            .setResetIfPressedWhenActive(itemDef.resetIfPressedWhenActive);
        var itemView = new stack_layout_2.StackLayout();
        itemView.isRtl = this.isRtl;
        return itemBuilder.build().then(function (itemData) {
            itemView.orientation = enums_1.Orientation.horizontal;
            if (sectionIdx === _this._selectedItem[0] && idx === _this._selectedItem[1]) {
                itemView.className = 'sidedrawer-list-item-active ' + (_this._styles ? _this._styles.SectionItemActive : '');
            }
            else {
                itemView.className = 'sidedrawer-list-item ' + (_this._styles ? _this._styles.SectionItemInactive : '');
            }
            itemView.id = itemData.name;
            if (itemData.image !== undefined || preserveImageSpacing === true) {
                var itemImage_1 = new image_1.Image();
                itemImage_1.className = 'sidedrawer-list-item-icon';
                itemView.addChild(itemImage_1);
                if (itemData.image && itemData.image !== '') {
                    ImageHelper_1.ImageHelper.processIcon(itemData.image, _this.MENU_ITEM_IMAGE_WIDTH, _this.MENU_ITEM_IMAGE_HEIGHT).then(function (resolvedImage) {
                        if (resolvedImage !== null) {
                            itemImage_1.src = resolvedImage;
                            if (utils.isFontIconURI(resolvedImage)) {
                                itemImage_1.className += ' ' + _this._imageFontIconClassName;
                            }
                        }
                        else if (preserveImageSpacing !== true) {
                            itemView.removeChild(itemImage_1);
                        }
                    });
                }
            }
            var itemLabel = new label_1.Label();
            itemLabel.className = 'sidedrawer-list-item-title';
            if (app.ios) {
                itemLabel.className = _this.getClassNameForRtl('sidedrawer-list-item-title');
            }
            itemLabel.text = itemData.title;
            itemView.addChild(itemLabel);
            if (itemData.visible === false) {
                itemView.visibility = 'collapse';
            }
            var touchObserver = new gestures_1.GesturesObserver(itemView, function (args) {
                var action = args.action;
                if (action === 'down') {
                    _this.setMenuItemOnPressStyle(sectionIdx, idx);
                }
                else if (action === 'up') {
                    _this.clearMenuItemOnPressStyle(sectionIdx, idx);
                }
            }, _this);
            touchObserver.observe(gestures_1.GestureTypes.touch);
            itemView.on('tap', function () {
                _this.menuItemSelected(sectionIdx, idx);
                _this.closeDrawer();
            }, _this);
            var menuItemDefnForTab = {
                _Name: itemData.name,
                PageToOpen: itemData.pageToOpen,
                _Type: "Control.Type.TabItem",
                ResetIfPressedWhenActive: itemData.resetIfPressedWhenActive
            };
            if (!itemData.pageToOpen) {
                trace_1.write("PageToOpen is not defined for item " + itemData.name + ". OnPress should have a navigation action", 'mdk.trace.app', trace_1.messageType.warn);
            }
            if (_this._menuItemDefnsForTabs === undefined) {
                var lastSectionIndex = _this.definition().sections.length - 1;
                var lastItemIndex = _this.definition().sections[lastSectionIndex].items.length - 1;
                var totalNoOfItems = _this.getMenuItemIndexFromIndexPath(lastSectionIndex, lastItemIndex) + 1;
                _this._menuItemDefnsForTabs = new Array(totalNoOfItems);
            }
            var tabItemIndex = _this.getMenuItemIndexFromIndexPath(sectionIdx, idx);
            _this._menuItemDefnsForTabs[tabItemIndex] = menuItemDefnForTab;
            return itemView;
        });
    };
    SideDrawer.prototype.getClassNameForRtl = function (baseClass) {
        return baseClass + (this.isRtl ? ' rtl' : ' ltr');
    };
    Object.defineProperty(SideDrawer.prototype, "isRtl", {
        get: function () {
            return AppSettingsManager_1.AppSettingsManager.instance().getBoolean('IsRTL') === true ? true : false;
        },
        enumerable: true,
        configurable: true
    });
    SideDrawer.prototype.menuItemSelected = function (sectionIdx, index) {
        var _this = this;
        var itemSelectionPromise = Promise.resolve();
        var itemDef = this.definition().sections[sectionIdx].items[index];
        var itemIndexFromIndexPath = this.getMenuItemIndexFromIndexPath(sectionIdx, index);
        if (sectionIdx === this._selectedItem[0] && index === this._selectedItem[1]) {
            if (this._clearHistory) {
                var resetValue = this._menuItemDefnsForTabs[itemIndexFromIndexPath].ResetIfPressedWhenActive;
                if (resetValue === true) {
                    itemSelectionPromise = this.navigateToSelectedItem(sectionIdx, index);
                }
            }
            else {
                this.menuClickedTwice(itemIndexFromIndexPath);
            }
        }
        else {
            this.resetMenuItemSelectionState();
            this.setMenuItemAsActive(sectionIdx, index);
            if (this._clearHistory) {
                itemSelectionPromise = this.navigateToSelectedItem(sectionIdx, index);
            }
            else {
                this.navigateToFrame(itemIndexFromIndexPath);
            }
        }
        itemSelectionPromise.then(function () {
            _this.executeOnPressActionOrRule(itemDef);
        });
    };
    SideDrawer.prototype.navigateToSelectedItem = function (sectionIdx, index) {
        var _this = this;
        var itemIndexFromIndexPath = this.getMenuItemIndexFromIndexPath(sectionIdx, index);
        var pageReference = this._menuItemDefnsForTabs[itemIndexFromIndexPath].PageToOpen;
        var pageDefPromise;
        if (pageReference) {
            pageDefPromise = IDefinitionProvider_1.IDefinitionProvider.instance().getDefinition(pageReference);
        }
        else {
            var itemName = this.definition().sections[sectionIdx].items[index].name;
            pageDefPromise = Promise.resolve(new PageDefinition_1.PageDefinition('', { _Name: itemName }));
        }
        return pageDefPromise.then(function (pageDef) {
            return PageRenderer_1.PageRenderer.pushNavigationForPageDefinition(pageDef, true).then(function (navigationEntry) {
                _this._props.page = navigationEntry.create();
                return navigationEntry;
            });
        });
    };
    SideDrawer.prototype.navigateToFrame = function (frameIdx) {
        if (this.bottomNavControl !== undefined) {
            var bottomNav = this.bottomNavControl.view();
            if (frameIdx < bottomNav.items.length) {
                bottomNav.selectedIndex = frameIdx;
                return true;
            }
        }
        return false;
    };
    SideDrawer.prototype.menuClickedTwice = function (frameIdx) {
        if (this.bottomNavControl && this.bottomNavControl.hiddenTabStrip) {
            this.bottomNavControl.hiddenTabStrip.items[frameIdx].notify({
                eventName: tab_strip_item_1.TabStripItem.tapEvent,
                object: this.view()
            });
        }
    };
    Object.defineProperty(SideDrawer.prototype, "bottomNavControl", {
        get: function () {
            return this._props.page.controls[0];
        },
        enumerable: true,
        configurable: true
    });
    SideDrawer.prototype.resetMenuItemSelectionState = function () {
        this.getItemWithIndexPath(this._selectedItem[0], this._selectedItem[1]).className = 'sidedrawer-list-item ' + (this._styles ? this._styles.SectionItemInactive : '');
    };
    SideDrawer.prototype.setMenuItemOnPressStyle = function (sectionIdx, idx) {
        if (this._selectedItem[0] !== sectionIdx || this._selectedItem[1] !== idx) {
            this.getItemWithIndexPath(sectionIdx, idx).className = 'sidedrawer-list-item-onpress ' + (this._styles ? this._styles.SectionItemOnPress : '');
        }
    };
    SideDrawer.prototype.clearMenuItemOnPressStyle = function (sectionIdx, idx) {
        if (this._selectedItem[0] !== sectionIdx || this._selectedItem[1] !== idx) {
            this.getItemWithIndexPath(sectionIdx, idx).className = 'sidedrawer-list-item ' + (this._styles ? this._styles.SectionItemInactive : '');
        }
    };
    SideDrawer.prototype.setMenuItemAsActive = function (sectionIdx, idx) {
        this._selectedItem = [sectionIdx, idx];
        this.getItemWithIndexPath(sectionIdx, idx).className = 'sidedrawer-list-item-active ' + (this._styles ? this._styles.SectionItemActive : '');
    };
    SideDrawer.prototype.resolveData = function (headerDef) {
        if (headerDef.target) {
            var targetDefinition = headerDef.target;
            if (PropertyTypeChecker_1.PropertyTypeChecker.isTargetPath(targetDefinition) ||
                PropertyTypeChecker_1.PropertyTypeChecker.isBinding(targetDefinition) ||
                PropertyTypeChecker_1.PropertyTypeChecker.isRule(targetDefinition)) {
                return ValueResolver_1.ValueResolver.resolveValue(targetDefinition, this.context, false).then(function (data) {
                    return Promise.resolve(data || {});
                });
            }
            else {
                return EvaluateTarget_1.asService(headerDef.data, this.context).then(function (service) {
                    return DataHelper_1.DataHelper.readFromService(service).then(function (result) {
                        return result.length > 0 ? result.getItem(0) : {};
                    })
                        .catch(function (error) {
                        Logger_1.Logger.instance.ui.error(Logger_1.Logger.UNABLE_TO_FETCH_DATA_FROM_TARGET_SERVICE, error, error ? error.stack : '');
                    });
                });
            }
        }
        else {
            return Promise.resolve(new observable_array_1.ObservableArray());
        }
    };
    SideDrawer.prototype.executeOnPressActionOrRule = function (selectedItem) {
        var frameId = this.getFrameId();
        if (selectedItem.action && frameId) {
            var executeSource = new ExecuteSource_1.ExecuteSource(frameId);
            executeSource.sourceType = ExecuteSource_1.ExecuteSourceType.ParentPage;
            var eventHandler = new EventHandler_1.EventHandler();
            var context = this.context;
            context.binding = context.binding || {};
            context.clientAPIProps.eventSource = executeSource;
            context.clientAPIProps.actionBinding = selectedItem;
            eventHandler.setEventSource(executeSource);
            return eventHandler.executeActionOrRule(selectedItem.action, context);
        }
        return Promise.resolve();
    };
    SideDrawer.prototype.getFrameId = function () {
        if (this._clearHistory) {
            return MDKFrame_1.MDKFrame.getRootFrameId();
        }
        else {
            var selectedItemFrame = TabFrame_1.TabFrame.getSideDrawerSelectedTabFrame(this._props.page.content);
            if (selectedItemFrame) {
                return selectedItemFrame.id;
            }
            Logger_1.Logger.instance.ui.warn(Logger_1.Logger.UNABLE_TO_GET_SIDEDRAWER_SELECTED_FRAME);
        }
    };
    SideDrawer.prototype.page = function () {
        if (this._clearHistory) {
            return this._props.page;
        }
        else {
            var selectedItemFrame = TabFrame_1.TabFrame.getSideDrawerSelectedTabFrame(this._props.page.content);
            if (selectedItemFrame) {
                return selectedItemFrame.currentPage;
            }
            Logger_1.Logger.instance.ui.warn(Logger_1.Logger.UNABLE_TO_GET_SIDEDRAWER_SELECTED_FRAME);
        }
    };
    SideDrawer.prototype.buildNavStackForMenus = function () {
        var _this = this;
        var sideDrawerRootPageData = {
            Caption: "Side Drawer With Botnav",
            ActionBar: {
                Items: []
            },
            Controls: [
                {
                    Items: this._menuItemDefnsForTabs,
                    "Styles": {
                        "TabStrip": "TabStripStyle"
                    },
                    HideTabStrips: true,
                    "_Type": "Control.Type.BottomNavigation",
                    "_Name": "BottomNavigationStyleTest"
                }
            ],
            "_Type": "Page",
            "_Name": "SideDrawerShellPage"
        };
        var sideDrawerRootPageDef = new PageDefinition_1.PageDefinition('/pages/sidedrawerRootPage', sideDrawerRootPageData);
        return PageRenderer_1.PageRenderer
            .pushNavigationForPageDefinition(sideDrawerRootPageDef, true, MDKNavigationType_1.MDKNavigationType.Outer, null, null, true)
            .then(function (navigationEntry) {
            _this._props.page = navigationEntry.create();
            return navigationEntry;
        });
    };
    return SideDrawer;
}(BaseControl_1.BaseControl));
exports.SideDrawer = SideDrawer;

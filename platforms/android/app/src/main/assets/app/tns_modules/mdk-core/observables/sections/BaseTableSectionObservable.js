"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var BaseCollectionSectionObservable_1 = require("./BaseCollectionSectionObservable");
var Context_1 = require("../../context/Context");
var observable_array_1 = require("tns-core-modules/data/observable-array");
var PropertyTypeChecker_1 = require("../../utils/PropertyTypeChecker");
var EvaluateTarget_1 = require("../../data/EvaluateTarget");
var Tracer_1 = require("../../utils/Tracer");
var Logger_1 = require("../../utils/Logger");
var ServiceDataLoader_1 = require("../../data/ServiceDataLoader");
var bindings_1 = require("../common/bindings");
var ValueResolver_1 = require("../../utils/ValueResolver");
var DataQueryBuilder_1 = require("../../builders/odata/DataQueryBuilder");
var TabFrame_1 = require("../../pages/TabFrame");
var MDKPage_1 = require("../../pages/MDKPage");
var BaseTableSection_1 = require("../..//sections/BaseTableSection");
var FlexibleColumnFrame_1 = require("../../pages/FlexibleColumnFrame");
var platform_1 = require("tns-core-modules/platform");
var BaseControlDefinition_1 = require("../../definitions/controls/BaseControlDefinition");
var SearchMode;
(function (SearchMode) {
    SearchMode["Persistent"] = "Persistent";
    SearchMode["Expandable"] = "Expandable";
})(SearchMode || (SearchMode = {}));
var BaseTableSectionObservable = (function (_super) {
    __extends(BaseTableSectionObservable, _super);
    function BaseTableSectionObservable(section) {
        var _this = _super.call(this, section) || this;
        _this._data = new observable_array_1.ObservableArray();
        _this._dataReadPageSize = 50;
        _this._isDataFromITargetServiceSpecifier = true;
        _this._searchKeys = [];
        _this._usesExtensions = 'Uses_Extensions';
        _this._extensionRatio = 'Extension_Ratio';
        _this._extensionMaxWidth = 'Extension_MaxWidth';
        _this._extensionHeight = 'Extension_Height';
        _this._isAFullPageList = 'isFullPageList';
        _this._highlightSelectedItem = 'highlightSelectedItem';
        _this._isWithinFlexibleColumnLeadingPage = 'isWithinFlexibleColumnLeadingPage';
        _this._isFlexibleColumnLeadingPageActive = 'isFlexibleColumnLeadingPageActive';
        _this._dataPaging = 'dataPaging';
        _this._bindingContext = {};
        _this._searchString = '';
        _this._currentFilter = '';
        _this._currentOrderBy = '';
        _this._originalOrderBy = '';
        _this._boundItems = [];
        _this._selectedItem = {};
        _this._pendingRedraw = undefined;
        _this._loadMoreItemsFlag = false;
        if (_this.section.definition.data.DataReadPageSize) {
            _this._dataReadPageSize = _this.section.definition.data.DataReadPageSize;
        }
        _this._searchKeys = _this._getSearchKeys();
        return _this;
    }
    Object.defineProperty(BaseTableSectionObservable.prototype, "searchString", {
        get: function () {
            return this._searchString;
        },
        enumerable: true,
        configurable: true
    });
    BaseTableSectionObservable.prototype.bind = function () {
        var _this = this;
        this._resetData();
        var definition = this.section.definition;
        return this._resolveData(definition).then(function (resolvedData) {
            if (resolvedData && resolvedData.length !== 0 && _this._data.length === 0) {
                _this._data = resolvedData;
            }
        }).catch(function (error) {
            Logger_1.Logger.instance.ui.error(error + " " + error.stack);
        }).then(function () {
            return _super.prototype.bind.call(_this).then(function () {
                return _this.bindInitialItems();
            });
        });
    };
    Object.defineProperty(BaseTableSectionObservable.prototype, "binding", {
        get: function () {
            return (this._data && this._data.length) ? this._data : this.section.context.binding;
        },
        enumerable: true,
        configurable: true
    });
    BaseTableSectionObservable.prototype.bindInitialItems = function () {
        var _this = this;
        var definition = this.section.definition;
        this._setMaxItems();
        var initialRows = this._isDataFromITargetServiceSpecifier ? Math.min(this._maxItemCount, this._dataReadPageSize) : this._maxItemCount;
        var rowBindings = [];
        var tid = Tracer_1.Tracer.startTrace();
        this.sectionParameters[this._isAFullPageList] = this._isFullPageList() ? true : false;
        if (definition.usesExtensionViews) {
            this.sectionParameters[this._usesExtensions] = true;
            if (definition.data.Extension.DimensionRatio) {
                rowBindings.push(this._bindValue(this.binding, this._extensionRatio, definition.data.Extension.DimensionRatio)
                    .then(function (value) {
                    _this.sectionParameters[_this._extensionRatio] = value;
                }));
            }
            if (definition.data.Extension.MaxWidth) {
                rowBindings.push(this._bindValue(this.binding, this._extensionMaxWidth, definition.data.Extension.MaxWidth)
                    .then(function (value) {
                    _this.sectionParameters[_this._extensionMaxWidth] = value;
                }));
            }
            if (definition.data.Extension.Height) {
                rowBindings.push(this._bindValue(this.binding, this._extensionHeight, definition.data.Extension.Height)
                    .then(function (value) {
                    _this.sectionParameters[_this._extensionHeight] = value;
                }));
            }
        }
        else {
            for (var i = 0; i < initialRows; i++) {
                rowBindings.push(this._bindRow(i, this.getItem(i), this._definitionForRow(i)));
            }
        }
        if (definition.getDataPaging() != null) {
            rowBindings.push(this._bindValue(this.binding, this._dataPaging, definition.getDataPaging()).then(function (value) {
                _this.sectionParameters[_this._dataPaging] = value;
            }));
        }
        return Promise.all(rowBindings).then(function (items) {
            _this._boundItems = _this._filterCells(items);
            if (_this._staticCells) {
                _this._maxItemCount = _this._boundItems.length;
            }
            var searchContext = new Context_1.Context(_this.section.context, _this.section);
            return bindings_1.asSearch(definition, searchContext).then(function (searchObject) {
                _this._sectionParameters[bindings_1.SearchBindings.SEARCH_KEY] = searchObject;
                if (_this._sectionParameters.hasOwnProperty(bindings_1.SearchBindings.SEARCH_KEY)) {
                    if (_this._sectionParameters[bindings_1.SearchBindings.SEARCH_KEY]) {
                        _this._sectionParameters[bindings_1.SearchBindings.SEARCH_KEY][bindings_1.SearchBindings.MODE_KEY] = SearchMode.Expandable;
                        if (_this.section.page instanceof MDKPage_1.MDKPage && TabFrame_1.TabFrame.isTabsTabFrame(_this.section.page.frame)) {
                            _this._sectionParameters[bindings_1.SearchBindings.SEARCH_KEY][bindings_1.SearchBindings.MODE_KEY] = SearchMode.Persistent;
                        }
                    }
                }
                Tracer_1.Tracer.commitTrace(tid, "Bound " + initialRows + " initial rows", 'ObjectTable');
                return _this._sectionParameters;
            });
        });
    };
    BaseTableSectionObservable.prototype.getOrderBy = function () {
        return (this._currentOrderBy !== '') ? this._currentOrderBy : this._originalOrderBy;
    };
    BaseTableSectionObservable.prototype.filterUpdated = function (filterQuery) {
        if (filterQuery.filter !== this._currentFilter || filterQuery.sorter !== this._currentOrderBy) {
            this._currentFilter = filterQuery.filter;
            this._currentOrderBy = filterQuery.sorter;
            return this.section.redraw(undefined);
        }
        else {
            return Promise.resolve();
        }
    };
    BaseTableSectionObservable.prototype.getItem = function (index) {
        if (this._data && this._data !== undefined && index <= this._data.length) {
            return this._data.getItem(index);
        }
    };
    BaseTableSectionObservable.prototype.getBoundData = function (row) {
        if (!this._isItemBound(row)) {
            this._bindAdditionalCell(row);
        }
        return this._boundItems[row];
    };
    BaseTableSectionObservable.prototype.isDataBounded = function (row) {
        return this._isItemBound(row);
    };
    Object.defineProperty(BaseTableSectionObservable.prototype, "selectedItem", {
        get: function () {
            return this._selectedItem;
        },
        enumerable: true,
        configurable: true
    });
    BaseTableSectionObservable.prototype.loadMoreItems = function () {
        var _this = this;
        if (this._isFullPageList()) {
            if (this._dataLoader) {
                if (this._loadMoreItemsFlag) {
                    return Promise.resolve(this._loadMoreItemsFlag);
                }
                this._loadMoreItemsFlag = true;
                var bindBegin_1 = this._data.length;
                return this._dataLoader.loadMoreItems(this.section.context).then(function (loadedData) {
                    if (loadedData && loadedData.length) {
                        _this._data = _this._dataLoader.data;
                        var rowBindings = [];
                        for (; bindBegin_1 < _this._data.length; bindBegin_1++) {
                            rowBindings.push(_this._bindRow(bindBegin_1, _this.getItem(bindBegin_1), _this._definitionForRow(bindBegin_1)));
                        }
                        return Promise.all(rowBindings).then(function (boundItems) {
                            _this._boundItems = _this._boundItems.concat(boundItems);
                            _this.section.reloadData(_this._boundItems.length);
                            return _this._loadMoreItemsFlag = false;
                        });
                    }
                    else {
                        if (_this._dataLoader.isAllDataRead()) {
                            var dataPaging = _this.sectionParameters[_this._dataPaging];
                            if (dataPaging && dataPaging.ShowLoadingIndicator && _this.section instanceof BaseTableSection_1.BaseTableSection) {
                                _this.section.hideLazyLoadingIndicator();
                            }
                        }
                        return Promise.resolve(_this._loadMoreItemsFlag);
                    }
                }).catch(function (error) {
                    _this._loadMoreItemsFlag = false;
                    throw error;
                });
            }
        }
        return Promise.resolve();
    };
    BaseTableSectionObservable.prototype.redraw = function () {
        var _this = this;
        if (!this._pendingRedraw) {
            this._resetData();
            this._pendingRedraw = _super.prototype.redraw.call(this);
            return this._pendingRedraw.then(function (currSearchString) {
                _this._pendingRedraw = undefined;
                if (currSearchString !== _this._searchString) {
                    _this.section.redraw(undefined);
                }
            });
        }
        else {
            Logger_1.Logger.instance.ui.info('BaseTableSectionObservable - redraw pending');
        }
    };
    BaseTableSectionObservable.prototype.onPress = function (row, action) {
        var _this = this;
        if (this._pendingRedraw) {
            return this._pendingRedraw.then(function () {
                return _this._onPressFunc(row, action).then(function () {
                    _this._pendingRedraw = undefined;
                });
            });
        }
        else {
            return this._onPressFunc(row, action);
        }
    };
    BaseTableSectionObservable.prototype.searchUpdated = function (searchText) {
        if (searchText !== this._searchString) {
            this._searchString = searchText;
            return this.section.redraw(undefined);
        }
        else {
            return Promise.resolve();
        }
    };
    BaseTableSectionObservable.prototype._createStaticCellsData = function () {
        return Promise.resolve(new observable_array_1.ObservableArray());
    };
    BaseTableSectionObservable.prototype.isSectionEmpty = function () {
        return !this._data || this._data.length === 0;
    };
    BaseTableSectionObservable.prototype._definitionForRow = function (row) {
        if (this._staticCells) {
            return this._data.getItem(row);
        }
        else {
            return this.section.definition;
        }
    };
    BaseTableSectionObservable.prototype._bindValues = function (bindingObject, definition) {
        var _this = this;
        return _super.prototype._bindValues.call(this, bindingObject, definition).then(function (sectionParameters) {
            sectionParameters[_this._isWithinFlexibleColumnLeadingPage] = false;
            sectionParameters[_this._isFlexibleColumnLeadingPageActive] = false;
            if (platform_1.device.deviceType === 'Tablet' && _this.section.page.targetFrameId) {
                if (FlexibleColumnFrame_1.FlexibleColumnFrame.isFlexibleColumnFrame(_this.section.page.targetFrameId)) {
                    if (!FlexibleColumnFrame_1.FlexibleColumnFrame.isEndColumnWithinFlexibleColumnLayout(_this.section.page.targetFrameId)) {
                        sectionParameters[_this._isWithinFlexibleColumnLeadingPage] = true;
                    }
                    if (!FlexibleColumnFrame_1.FlexibleColumnFrame.isLastFrameWithinFlexibleColumnLayout(_this.section.page.targetFrameId)) {
                        sectionParameters[_this._isFlexibleColumnLeadingPageActive] = true;
                    }
                }
            }
            if (definition.highlightSelectedItem !== undefined) {
                return _this._bindValue(_this.binding, 'HighlightSelectedItem', definition.highlightSelectedItem)
                    .then(function (value) {
                    sectionParameters[_this._highlightSelectedItem] = value;
                    return sectionParameters;
                });
            }
            else {
                sectionParameters[_this._highlightSelectedItem] = false;
                if (_this.section && _this.section.page) {
                    var pageDef = _this.section.page.definition;
                    var sectionsCount = 0;
                    if (pageDef.getControls().length > 0) {
                        var firstDefinitionControl = pageDef.getControls()[0];
                        if (firstDefinitionControl.getType() === BaseControlDefinition_1.BaseControlDefinition.type.SectionedTable) {
                            sectionsCount = firstDefinitionControl.getSectionCount();
                        }
                    }
                    if (sectionParameters[_this._isWithinFlexibleColumnLeadingPage] && sectionsCount === 1) {
                        sectionParameters[_this._highlightSelectedItem] = true;
                    }
                }
                return sectionParameters;
            }
        });
    };
    BaseTableSectionObservable.prototype._resolveData = function (definition) {
        var _this = this;
        if (definition.data.Target) {
            var targetDefinition_1 = definition.data.Target;
            if (PropertyTypeChecker_1.PropertyTypeChecker.isTargetPath(targetDefinition_1) ||
                PropertyTypeChecker_1.PropertyTypeChecker.isBinding(targetDefinition_1) ||
                PropertyTypeChecker_1.PropertyTypeChecker.isRule(targetDefinition_1)) {
                return ValueResolver_1.ValueResolver.resolveValue(targetDefinition_1, this.section.context, false).then(function (data) {
                    var resolvedData = data instanceof observable_array_1.ObservableArray ? data : new observable_array_1.ObservableArray(data || []);
                    _this._isDataFromITargetServiceSpecifier = false;
                    return Promise.resolve(resolvedData);
                });
            }
            else {
                return this.originalService.then(function (service) {
                    _this.section.context.searchContext = {
                        filter: _this._currentFilter,
                        orderBy: _this._currentOrderBy,
                        searchKeys: _this._retrieveSearchKeys,
                        serviceName: targetDefinition_1.Service,
                        service: service,
                    };
                    return _this._newServiceWithSearchAndFilterQueryOptions(service).then(function (searchAndFilterService) {
                        _this._dataLoader = new ServiceDataLoader_1.ServiceDataLoader(searchAndFilterService, _this._dataReadPageSize);
                        return _this._dataLoader.loadMoreItems(_this.section.context).then(function (data) {
                            delete _this.section.context.searchContext;
                            return data;
                        });
                    });
                });
            }
        }
        else if (this._definitionUsesStaticCells()) {
            this._staticCells = true;
            return this._createStaticCellsData();
        }
        else {
            return Promise.resolve(new observable_array_1.ObservableArray());
        }
    };
    BaseTableSectionObservable.prototype._performRedraw = function () {
        var currSearchString = this._searchString;
        return _super.prototype._performRedraw.call(this).then(function () {
            return currSearchString;
        });
    };
    BaseTableSectionObservable.prototype._onPressFunc = function (row, action) {
        var handler = this.buildBaseSectionEventHandler();
        row = this.adjustForHiddenRows(row);
        this._selectedItem = {
            row: row,
            selectedItem: this.getItem(row),
        };
        this.section.page.context.clientAPIProps.actionBinding = this._selectedItem.selectedItem;
        var onPress = this._getRowOnPressAction(row, action, handler.getEventSource());
        if (onPress) {
            return handler.executeActionOrRule(onPress, this.section.context).catch(function (error) {
                Logger_1.Logger.instance.ui.error(error + " " + error.stack);
            });
        }
        else {
            return Promise.resolve();
        }
    };
    BaseTableSectionObservable.prototype._bindAdditionalCell = function (index) {
        var _this = this;
        if (this._definitionForRow(index) !== undefined && index < this._data.length) {
            this._bindRow(index, this.getItem(index), this._definitionForRow(index)).then(function (result) {
                _this._boundItems[index] = result;
                _this.reloadRow(index);
            });
        }
    };
    BaseTableSectionObservable.prototype._bindRow = function (row, bindingObject, definition) {
        bindingObject = this._getValidBindObject(bindingObject);
        return this._bindRowProperties(row, bindingObject, definition).then(function (item) {
            return item;
        });
    };
    Object.defineProperty(BaseTableSectionObservable.prototype, "_filtering", {
        get: function () {
            return (this._currentFilter !== '');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseTableSectionObservable.prototype, "_retrieveSearchKeys", {
        get: function () {
            if (this._searchKeys.length === 0) {
                this._searchKeys = this._getSearchKeys();
            }
            return this._searchKeys;
        },
        enumerable: true,
        configurable: true
    });
    BaseTableSectionObservable.prototype._isFullPageList = function () {
        var definition = this.section.definition;
        return !definition.usesExtensionViews && !this._staticCells && !definition.usePreviewMode;
    };
    BaseTableSectionObservable.prototype._isItemBound = function (index) {
        return this._boundItems[index] !== undefined;
    };
    BaseTableSectionObservable.prototype._resetData = function () {
        this._loadMoreItemsFlag = false;
        this._data = new observable_array_1.ObservableArray();
        this._dataLoader = null;
        this._originalService = null;
    };
    Object.defineProperty(BaseTableSectionObservable.prototype, "originalService", {
        get: function () {
            if (!this._originalService) {
                this._originalService = EvaluateTarget_1.asService(this.section.definition.data, this.section.context);
            }
            return this._originalService;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseTableSectionObservable.prototype, "_searching", {
        get: function () {
            return (this._searchString !== '');
        },
        enumerable: true,
        configurable: true
    });
    BaseTableSectionObservable.prototype._setMaxItems = function () {
        var definition = this.section.definition;
        if (definition.usePreviewMode) {
            this._maxItemCount = Math.min(this.sectionParameters[this._maxItemCountParamKey], this._data ? this._data.length : 0);
        }
        else {
            this._maxItemCount = this._data ? this._data.length : 0;
        }
    };
    BaseTableSectionObservable.prototype._newServiceWithSearchAndFilterQueryOptions = function (service) {
        var searchAndFilterService = Object.assign({}, service);
        var queryBuilder;
        if (!searchAndFilterService.queryBuilder) {
            queryBuilder = new DataQueryBuilder_1.DataQueryBuilder(this.section.context, searchAndFilterService.queryOptions);
            if (queryBuilder.hasOrderBy) {
                this._originalOrderBy = queryBuilder.orderByOption.join(',');
            }
            var filterTerm = undefined;
            if (this._filtering) {
                filterTerm = queryBuilder.filter(this._currentFilter);
            }
            if (this._sorting) {
                this._sorterMethod(queryBuilder);
            }
            if (this._searching) {
                filterTerm = filterTerm || queryBuilder.filterOption;
                if (!filterTerm) {
                    filterTerm = queryBuilder.filter(queryBuilder.mdkSearch(this._searchString));
                }
                else {
                    filterTerm.and(queryBuilder.mdkSearch(this._searchString));
                }
            }
        }
        else {
            queryBuilder = searchAndFilterService.queryBuilder;
            if (this._filtering && queryBuilder.hasFilter) {
                queryBuilder.filter().and(this._currentFilter);
            }
            else if (this._filtering) {
                queryBuilder.filter(this._currentFilter);
            }
            if (this._sorting) {
                this._sorterMethod(queryBuilder);
            }
        }
        return queryBuilder.build().then(function (builtQuery) {
            searchAndFilterService.queryOptions = builtQuery;
            return searchAndFilterService;
        });
    };
    Object.defineProperty(BaseTableSectionObservable.prototype, "_sorting", {
        get: function () {
            return (this._currentOrderBy !== '');
        },
        enumerable: true,
        configurable: true
    });
    BaseTableSectionObservable.prototype._sorterMethod = function (queryBuilder) {
        var sorterQueriesArr = this._currentOrderBy.split(',');
        for (var i = 0; i < sorterQueriesArr.length; i++) {
            sorterQueriesArr[i] = encodeURI(sorterQueriesArr[i].trim());
        }
        queryBuilder.orderBy.apply(queryBuilder, sorterQueriesArr);
    };
    return BaseTableSectionObservable;
}(BaseCollectionSectionObservable_1.BaseCollectionSectionObservable));
exports.BaseTableSectionObservable = BaseTableSectionObservable;

import { BaseSection } from '../../sections/BaseSection';
import { BaseCollectionSectionObservable } from './BaseCollectionSectionObservable';
import { ObservableArray } from 'tns-core-modules/data/observable-array';
import { FilterActionResult } from '../../controls/IFilterable';
import { ExecuteSource } from '../../common/ExecuteSource';
export declare abstract class BaseTableSectionObservable extends BaseCollectionSectionObservable {
    private _data;
    private _dataLoader;
    private _dataReadPageSize;
    private _isDataFromITargetServiceSpecifier;
    private _searchKeys;
    private _usesExtensions;
    private _extensionRatio;
    private _extensionMaxWidth;
    private _extensionHeight;
    private _isAFullPageList;
    private _highlightSelectedItem;
    private _isWithinFlexibleColumnLeadingPage;
    private _isFlexibleColumnLeadingPageActive;
    protected _dataPaging: string;
    private _bindingContext;
    private _searchString;
    private _currentFilter;
    private _currentOrderBy;
    private _originalOrderBy;
    private _boundItems;
    private _originalService;
    private _selectedItem;
    private _pendingRedraw;
    private _loadMoreItemsFlag;
    readonly searchString: string;
    constructor(section: BaseSection);
    bind(): Promise<any>;
    readonly binding: any;
    bindInitialItems(): Promise<any>;
    getOrderBy(): string;
    filterUpdated(filterQuery: FilterActionResult): Promise<any>;
    getItem(index: number): any;
    getBoundData(row: number): any;
    isDataBounded(row: number): boolean;
    readonly selectedItem: any;
    loadMoreItems(): Promise<any>;
    redraw(): Promise<any>;
    onPress(row: any, action: string): Promise<any>;
    searchUpdated(searchText: string): Promise<any>;
    protected abstract _bindRowProperties(row: number, bindingObject: any, definition: any): Promise<any>;
    protected abstract _definitionUsesStaticCells(): boolean;
    protected abstract _getRowOnPressAction(row: number, action: string, source: ExecuteSource): string;
    protected abstract _getSearchKeys(): string[];
    protected _createStaticCellsData(): Promise<ObservableArray<any>>;
    protected isSectionEmpty(): boolean;
    protected _definitionForRow(row: number): any;
    protected _bindValues(bindingObject: any, definition: any): Promise<any>;
    protected _resolveData(definition: any): Promise<ObservableArray<any>>;
    protected _performRedraw(): Promise<any>;
    private _onPressFunc;
    private _bindAdditionalCell;
    private _bindRow;
    private readonly _filtering;
    private readonly _retrieveSearchKeys;
    private _isFullPageList;
    private _isItemBound;
    private _resetData;
    private readonly originalService;
    private readonly _searching;
    private _setMaxItems;
    private _newServiceWithSearchAndFilterQueryOptions;
    private readonly _sorting;
    private _sorterMethod;
}

import { ODataAction } from '../actions/ODataAction';
import { SectionedTableObservable } from '../observables/SectionedTableObservable';
import { BaseSection } from '../sections/BaseSection';
import { BaseContainer } from './BaseContainer';
import { IControlData } from './IControlData';
import { FilterActionResult, FilterCriteria, IFilterable } from './IFilterable';
export declare class SectionedTable extends BaseContainer implements IFilterable {
    private _sections;
    private _filterCriteria;
    private _filterResult;
    bind(): Promise<any>;
    initialize(controlData: IControlData): void;
    onDataChanged(action: ODataAction, result: any): void;
    redraw(): Promise<any>;
    redrawView(): void;
    readonly sections: BaseSection[];
    setStyle(): void;
    viewIsNative(): boolean;
    getFilterCriteria(name: string, values: Array<object>, isArrayFilterProperty?: boolean): FilterCriteria;
    getSorterCriteria(name: string): FilterCriteria;
    parseFilterActionResult(filter: Array<FilterCriteria>): FilterActionResult;
    setFilterResult(result: Array<FilterCriteria>): FilterActionResult;
    getSelectedValues(): Array<FilterCriteria>;
    onDisplayingModal(isFullPage: boolean): void;
    onDismissingModal(): void;
    onNavigatedTo(initialLoading: boolean): void;
    onNavigatingTo(initialLoading: boolean): void;
    onNavigatingFrom(pageExists: boolean): void;
    onPageUnloaded(pageExists: boolean): void;
    onPageLoaded(initialLoading: boolean): void;
    onLoaded(): void;
    setSearchText(search: string): boolean;
    isHeaderOnly(): boolean;
    protected createObservable(): SectionedTableObservable;
    private _createSection;
    private _createSectionProps;
    private updateItemsForFilterCriteria;
}

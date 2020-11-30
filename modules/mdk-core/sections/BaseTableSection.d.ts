import { BaseSection } from './BaseSection';
import { BaseTableSectionObservable } from '../observables/sections/BaseTableSectionObservable';
import { IMDKViewFacade } from '../IMDKViewFacade';
import { PressedItem } from '../controls/PressedItem';
export declare abstract class BaseTableSection extends BaseSection {
    readonly searchString: string;
    constructor(props: any);
    filterUpdated(filter: any): Promise<any>;
    getOrderBy(): string;
    getBoundData(row: any): any;
    isDataBounded(row: any): boolean;
    onPageUnloaded(pageExists: boolean): void;
    loadMoreItems(): BaseTableSectionObservable;
    onPress(cell: any, viewFacade: IMDKViewFacade): void;
    onAccessoryButtonPress(cell: any, viewFacade: IMDKViewFacade): void;
    setIndicatorState(newState: string, pressedItem: PressedItem): void;
    onPageLoaded(initialLoading: boolean): void;
    searchUpdated(searchText: any): Promise<any>;
    viewDidAppear(): void;
    private _onPress;
    hideLazyLoadingIndicator(): void;
}

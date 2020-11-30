import { BaseTableSection } from './BaseTableSection';
export declare class ObjectTableSection extends BaseTableSection {
    private _inNavgiation;
    onNavigatedFrom(pageExists: boolean): void;
    onNavigatedTo(initialLoading: boolean): void;
    onNavigatingFrom(pageExists: boolean): void;
    onNavigatingTo(initialLoading: boolean): void;
    isInNavigation(): boolean;
    protected _createObservable(): any;
}

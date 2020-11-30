import { IControlData } from './IControlData';
import { BaseControl } from './BaseControl';
import { TabItem } from './TabItem';
import { Tabs } from 'tns-core-modules/ui/tabs';
export declare class TabsContainer extends BaseControl {
    private static _pageName;
    private _tabsView;
    private _tabPages;
    private _tabContentItems;
    private _stackLayoutFactory;
    private _tabsItemsDefs;
    private _tabItems;
    initialize(controlData: IControlData): void;
    bind(): Promise<any>;
    redraw(): Promise<any>;
    onDismissingModal(): void;
    view(): Tabs;
    readonly items: TabItem[];
    setStyle(style?: string, target?: string): any;
    setItemCaption(tabItemName: string, newCaption: string): void;
    setSelectedTabItemByName(tabItemName: string): void;
    setSelectedTabItemByIndex(tabItemIndex: number): void;
    getItemCaption(tabItemName: string): string;
    getSelectedTabItemName(): string;
    getSelectedTabItemIndex(): number;
    resetSelectedTabContentItem(): void;
    getTabsPostion(): "top" | "bottom";
    private _createTabItems;
    private _createTabItemView;
    private _createTabItem;
}

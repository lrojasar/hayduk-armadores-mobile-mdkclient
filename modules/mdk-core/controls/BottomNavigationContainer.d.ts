import { IControlData } from './IControlData';
import { BaseControl } from './BaseControl';
import { TabItem } from './TabItem';
import { TabNavigationBase } from 'tns-core-modules/ui/tab-navigation-base/tab-navigation-base';
import { TabStrip } from 'tns-core-modules/ui/tab-navigation-base/tab-strip';
export declare class BottomNavigationContainer extends BaseControl {
    private static _pageName;
    private _bottomNavigationView;
    private _tabPages;
    private _stackLayoutFactory;
    private _bottomNavigationItemsDefs;
    private _tabItems;
    private _bottomNavigationDefs;
    hiddenTabStrip: TabStrip;
    initialize(controlData: IControlData): void;
    bind(): Promise<any>;
    redraw(): Promise<any>;
    view(): TabNavigationBase;
    readonly items: TabItem[];
    setStyle(style?: string, target?: string): any;
    setItemCaption(tabItemName: string, newCaption: string): void;
    setSelectedTabItemByName(tabItemName: string): void;
    setSelectedTabItemByIndex(tabItemIndex: number): void;
    getItemCaption(tabItemName: string): string;
    getSelectedTabItemName(): string;
    getSelectedTabItemIndex(): number;
    resetSelectedTabContentItem(): void;
    private _createTabItems;
    private _createTabItemView;
    private _createTabItem;
}

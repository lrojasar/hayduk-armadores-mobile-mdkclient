import { BaseControlDefinition } from './BaseControlDefinition';
import { TabItemDefinition } from './TabItemDefinition';
export declare class BottomNavigationDefinition extends BaseControlDefinition {
    private items;
    private _styles;
    private _hideTabStrips;
    constructor(path: any, data: any, parent: any);
    getItemsCount(): number;
    getItems(): TabItemDefinition[];
    readonly styles: any;
    readonly hideTabStrips: boolean;
}

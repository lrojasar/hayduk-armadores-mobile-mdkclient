import { BaseJSONDefinition } from "../../BaseJSONDefinition";
import { SideDrawerItemDefinition } from "./SideDrawerItemDefinition";
export declare class SideDrawerSectionDefinition extends BaseJSONDefinition {
    private _caption;
    private _visible;
    private _items;
    private _preserveImageSpacing;
    constructor(path: any, data: any);
    readonly caption: string;
    readonly items: SideDrawerItemDefinition[];
    readonly visible: any;
    readonly preserveImageSpacing: any;
    private _loadItems;
}

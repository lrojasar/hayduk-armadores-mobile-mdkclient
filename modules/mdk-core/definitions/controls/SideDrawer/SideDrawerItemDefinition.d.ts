import { BaseJSONDefinition } from "../../BaseJSONDefinition";
export declare class SideDrawerItemDefinition extends BaseJSONDefinition {
    private _title;
    private _image;
    private _action;
    private _pageToOpen;
    private _resetIfPressedWhenActive;
    private _visible;
    constructor(path: any, data: any);
    readonly title: string;
    readonly image: string;
    readonly action: string;
    readonly pageToOpen: string;
    readonly resetIfPressedWhenActive: any;
    readonly visible: any;
}

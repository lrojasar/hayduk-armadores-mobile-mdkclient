import { SideDrawerSectionDefinition } from "./SideDrawerSectionDefinition";
import { SideDrawerHeaderDefinition } from "./SideDrawerHeaderDefinition";
import { BaseControlDefinition } from "../BaseControlDefinition";
export declare class SideDrawerDefinition extends BaseControlDefinition {
    private _clearHistory;
    private _sections;
    private _header;
    private _styles;
    constructor(path: any, data: any, parent: any);
    readonly clearHistory: any;
    readonly header: SideDrawerHeaderDefinition;
    readonly sections: SideDrawerSectionDefinition[];
    readonly styles: any;
    private _loadHeader;
    private _loadSections;
}

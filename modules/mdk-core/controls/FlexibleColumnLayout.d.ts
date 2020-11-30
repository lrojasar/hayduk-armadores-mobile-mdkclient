import { BaseControl } from './BaseControl';
import { FlexibleColumnFrame } from '../pages/FlexibleColumnFrame';
import { GridLayout } from 'tns-core-modules/ui/layouts/grid-layout';
import { IControlData } from './IControlData';
import { MDKPage } from '../pages/MDKPage';
export declare class FlexibleColumnLayout extends BaseControl {
    private _layoutView;
    private _controlData;
    private _flexColumnLayoutDefinition;
    private _marginTop;
    private _columnFrames;
    private _columnItems;
    private _columnItemSpecs;
    private _columnSpecRatios;
    static LAYOUTTYPE_TAG: string;
    static MAXIMUM_COLUMN: number;
    initialize(controlData: IControlData): void;
    buildLayout(): Promise<any>;
    extendFlexibleColumnFrame(): FlexibleColumnFrame;
    closeFlexibleColumnFrame(index: number): void;
    getNextFlexibileColumnFrame(frame: FlexibleColumnFrame): FlexibleColumnFrame;
    getTopMostFlexibleColumnFrame(): FlexibleColumnFrame;
    isTopMostFlexibleColumnFrame(frame: FlexibleColumnFrame): boolean;
    isEndFlexibleColumnFrame(frame: FlexibleColumnFrame): boolean;
    getNeighborColumnDefinition(frame: FlexibleColumnFrame): string;
    isLayoutExpanded(): boolean;
    static getFlexibleColumnLayoutControl(page: MDKPage): FlexibleColumnLayout;
    redraw(): Promise<any>;
    view(): GridLayout;
    setStyle(style?: string, target?: string): any;
    private configureFrameMargin;
    private getGridLayoutColumnPosition;
    private buildColumn;
    private addColumnInLayout;
    private resetLayoutView;
    private getFlexibileColumnIndex;
}

import { BaseCollectionSectionPagingDefinition } from './BaseCollectionSectionPagingDefinition';
export declare class ObjectTableSectionDefinition extends BaseCollectionSectionPagingDefinition {
    readonly accessoryType: string;
    readonly defaultAccessoryType: string;
    readonly descriptionText: string;
    readonly detailImage: string;
    readonly detailImageText: string;
    readonly footnote: string;
    readonly icons: [string];
    readonly objectCell: any;
    readonly objectCells: [Object];
    readonly onPress: string;
    readonly onAccessoryButtonPress: string;
    readonly progressIndicator: string;
    readonly search: any;
    readonly statusImage: string;
    readonly statusText: string;
    readonly subHeadlineText: string;
    readonly subStatusImage: string;
    readonly subStatusText: string;
    readonly title: string;
    readonly usePreviewMode: boolean;
    readonly searchEnabled: boolean;
    readonly searchPlaceholder: string;
    readonly searchBarcodeScanEnabled: any;
    readonly usesExtensionViews: boolean;
}

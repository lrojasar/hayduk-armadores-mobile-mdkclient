import { NavigationEntry } from 'tns-core-modules/ui/frame';
import { MDKPage } from './MDKPage';
import { PageDefinition } from '../definitions/PageDefinition';
import { SideDrawer } from '../controls/SideDrawer';
import { ExecuteSource } from '../common/ExecuteSource';
import { MDKNavigationType } from '../common/MDKNavigationType';
export declare class PageRenderer {
    static currentlyRenderedPage: any;
    static appLevelSideDrawer: SideDrawer;
    static instance(): PageRenderer;
    private static initializeAppLevelSideDrawer;
    private static getCurrentlyActiveFrameForNavigation;
    static pushNavigation(pageReference: string, clearNavStack?: boolean, navigationType?: MDKNavigationType, executeSource?: ExecuteSource, transition?: any, targetFrame?: any): Promise<NavigationEntry>;
    static pushNavigationForPageDefinition(pageDefinition: PageDefinition, clearNavStack?: boolean, navigationType?: MDKNavigationType, executeSource?: ExecuteSource, transition?: any, isPageShell?: boolean, targetFrame?: any): Promise<NavigationEntry>;
    static showPage(params: any): Promise<any>;
    static showModalPage(pageReference: string, isPopover: boolean, isFullScreen?: boolean, executeSource?: ExecuteSource): Promise<any>;
    static showModalPageByDefinition(oPageDefinition: any, isFullScreen?: boolean): Promise<any>;
    static showPageByDefinition(oPageDefinition: any): Promise<any>;
    static showPasscodePage(): Promise<NavigationEntry>;
    static showWelcomePage(): Promise<NavigationEntry>;
    static startupNavigation(pageReference: string, initialLaunch: boolean): Promise<NavigationEntry>;
    static fullPageModalTransition(): {
        curve: string;
        duration: number;
        name: string;
    };
    static createInitialPage(definition: PageDefinition, isModal?: boolean, isPopover?: boolean, isFullPage?: boolean): MDKPage;
    private static _instance;
    private static defaultTransitionCurve;
    private static defaultFullPageModalDuration;
    private static defaultFullPageModalTransitionName;
    private static createNavigationEntry;
    private static createNavigationEntryForPageDefinition;
    private constructor();
    private renderWelcome;
    private renderRestore;
    private createAndInitializePage;
    private renderPageAsync;
    private createInitialPage;
    private renderPageContentAsync;
    private renderPageSync;
}

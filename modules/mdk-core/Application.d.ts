import { ApplicationEventData } from 'tns-core-modules/application';
export declare class Application {
    static setApplication(app: any): void;
    static setResumeEventDelayed(delayed: boolean): void;
    static getPendingResumeEventData(): ApplicationEventData;
    static onResume(appEventData: ApplicationEventData, runWithoutUpdate?: boolean): void;
    static setPendingResumeEventData(eventData: ApplicationEventData): void;
    static resetClient(): Promise<any>;
    static reInitializeLogger(): void;
    static activityBackPressedEventHandler(args: any): void;
    static isMainPageRendered(): any;
    static setMainPageRendered(mainPageRendered: boolean): void;
    static getContext(): any;
    static resetAppState(): void;
    static startApplication(secretKeys: any): any;
    static launchAppMainPage(didLaunchApp: boolean): Promise<any>;
    static setOnboardingCompleted(completed: boolean): void;
    static setNonNSActivityDone(nonNSActivityDone: boolean): void;
    static getApplicationParams(): any;
    private static _app;
}

export declare class WelcomeScreen {
    static getInstance(): WelcomeScreen;
    create(params: any, callback: any): void;
    onLoaded(): void;
    reInitializePage(params: any): void;
    manageBlurScreen(params: any): void;
    applicationWillEnterForeground(): Promise<any>;
    changeUserPasscode(): Promise<any>;
    verifyPasscode(params: any): Promise<any>;
    restoreOnRelaunch(params: any): Promise<any>;
    applicationWillEnterBackground(): void;
}

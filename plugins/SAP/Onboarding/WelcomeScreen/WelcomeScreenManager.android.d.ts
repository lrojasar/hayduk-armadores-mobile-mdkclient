export declare class WelcomeScreen {
    static getInstance(): WelcomeScreen;
    private static _instance;
    private welcomeScreenBridge;
    createCallback(callback: any): any;
    create(params: any, callback: any): any;
    onLoaded(): any;
    applicationWillEnterBackground(): void;
    applicationWillEnterForeground(): Promise<any>;
    restoreOnRelaunch(params: any): Promise<any>;
    changeUserPasscode(): Promise<any>;
    verifyPasscode(params: any): Promise<any>;
}

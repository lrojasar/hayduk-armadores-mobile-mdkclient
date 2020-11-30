import { Page } from 'tns-core-modules/ui/page';
import { WelcomeScreenBridge } from 'mdk-sap';
import { BlurScreenActions } from '../storage/ClientSettings';
export declare class WelcomePage extends Page {
    static welcomeScreenBridge: WelcomeScreenBridge;
    static changeUserPasscode(): Promise<boolean>;
    static verifyPasscode(params: any): Promise<any>;
    static restoreOnRelaunch(params: any): Promise<boolean>;
    static applicationWillEnterForeground(): Promise<boolean>;
    static manageBlurScreen(action: BlurScreenActions): void;
    static resetClientHelper(): Promise<any>;
    static reInitializePage(): void;
    static applicationWillEnterBackground(): void;
    static getConnectionInfoToastMessage(params: any): any;
    static getCacheSettings(params: any): any;
    static fireChangeUserPasscodeSuccessOrFailureAction(status: string): void;
    static fireVerifyPasscodeSuccessOrFailureAction(status: string): void;
    private context;
    private aScreen;
    constructor();
    onLoaded(): void;
    finishedLoadingRegistrationInfo(data: any): void;
    finishedOnboardingWithParams(newValue: any): any;
    qrCodeScanComplete(queryString: string): void;
    setOnboardingStage(stage: string): void;
    finishedRestoringWithParams(newValue: any): void;
    private fetchConnnectionSettings;
}

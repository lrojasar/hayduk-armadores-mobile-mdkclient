import { DataConverter } from '../../Common/DataConverter';
import * as application from 'tns-core-modules/application';

declare var com: any;

export class WelcomeScreen {
  public static getInstance(): WelcomeScreen {
    if (!WelcomeScreen._instance) {
      WelcomeScreen._instance = new WelcomeScreen();
    }
    return WelcomeScreen._instance;
  }
  private static _instance;
  private welcomeScreenBridge: any;
  
  public createCallback(callback: any) {
    return new com.sap.mdk.client.ui.onboarding.IWelcomeScreenCallback ({
      finishedLoadingRegistrationInfo: (data) => {
        let aMap = DataConverter.toJavaScriptMap(data);
        callback.finishedLoadingRegistrationInfo(aMap);
      },
      finishedOnboardingWithParams: (data) => {
        let aMap = DataConverter.toJavaScriptMap(data);
        callback.finishedOnboardingWithParams(aMap);
      },
      finishedRestoringWithParams: (data) => {
        let aMap = DataConverter.toJavaScriptMap(data);
        callback.finishedRestoringWithParams(aMap);
      },
      qrCodeScanComplete: (data) => {
        callback.qrCodeScanComplete(data); 
      },
      setOnboardingStage: (stage) => {
        callback.setOnboardingStage(stage);
      },
    });
  }

  public create(params: any, callback: any) {
    let onboardingParams = DataConverter.toJavaObject(params);
    this.welcomeScreenBridge = new com.sap.mdk.client.ui.onboarding.WelcomeScreenBridge(application.android.context);
    this.welcomeScreenBridge.create(onboardingParams, this.createCallback(callback));
    return this.welcomeScreenBridge;
  }

  public onLoaded() {
    let context = application.android.foregroundActivity ? application.android.foregroundActivity : 
    application.android.context;
    this.welcomeScreenBridge.onLoaded(context);
    return this.welcomeScreenBridge;
  }

  public applicationWillEnterBackground() {
    this.welcomeScreenBridge.lockScreen();
  }

  public applicationWillEnterForeground(): Promise<any> {
    try {
      return Promise.resolve(this.welcomeScreenBridge.unlockScreen());
    } catch (error) {
      //
    }
  }

  public restoreOnRelaunch(params: any): Promise<any> {
    try {
      let newParams = DataConverter.toJavaObject(params);
      return Promise.resolve(this.welcomeScreenBridge.restoreOnRelaunch(newParams));
    } catch (error) {
      //
    }
  }

  public changeUserPasscode(): Promise<any> {
    try {
      return Promise.resolve(this.welcomeScreenBridge.changeUserPasscode());
    } catch (error) {
      //
    }
  }

  public verifyPasscode(params: any): Promise<any> {
    try {
      let newParams = DataConverter.toJavaObject(params);
      return Promise.resolve(this.welcomeScreenBridge.verifyPasscode(newParams));
    } catch (error) {
      //
    }
  }

  // public update(params: any) {
    // var javaParams = DataConverter.toJavaObject(params);
    // this.welcomeScreenBridge = new com.sap.seam.sapmdc.fioriui.WelcomeScreenBridge(application.android.context);
    // return this.welcomeScreenBridge.update(params);
  // }
};

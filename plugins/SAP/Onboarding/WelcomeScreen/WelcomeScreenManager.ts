export class WelcomeScreen {
  public static getInstance(): WelcomeScreen {
    return null;
  }
  public create(params: any, callback: any) {
      //
  }
  public onLoaded() {
    //
  }
  public reInitializePage(params: any) {
    //
  }
  public manageBlurScreen(params: any) {
    //
  }
  public applicationWillEnterForeground(): Promise<any> {
    return new Promise((resolve, reject) => resolve(''));
  }
  public changeUserPasscode(): Promise<any> {
    return new Promise((resolve, reject) => resolve(''));
  }
  public verifyPasscode(params: any): Promise<any> {
    return new Promise((resolve, reject) => resolve(''));
  }
  public restoreOnRelaunch(params: any): Promise<any> {
    return new Promise((resolve, reject) => resolve(''));
  }
  public applicationWillEnterBackground() { 
    // 
  }
};

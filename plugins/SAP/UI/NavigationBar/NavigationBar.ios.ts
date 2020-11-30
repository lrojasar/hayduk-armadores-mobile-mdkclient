import { Page } from 'tns-core-modules/ui/page';
import { Color } from 'tns-core-modules/color';
import { Font, FontWeight, FontStyle } from 'tns-core-modules/ui/styling/font';
import * as PlatformModule from 'tns-core-modules/platform';
declare var NavigationBarBridge: any;

export class NavigationBar {
  public static applyFioriStyle() {
    NavigationBarBridge.applyFioriStyle();
  }

  public static applyTitleStyle(page: Page, backgroundColor: Color, titleColor: Color, titleFont: Font) {
    if (page.frame) {
      let navController = page.frame.ios.controller;
      let navigationBar = navController ? navController.navigationBar : null;
      if (navigationBar) {
        // Disabling setting translucent to false is a temp workaround as 
        // from NS4.x upgrade, when the translucent is to false will have a shift down issue on our native container
        // navigationBar.translucent = false;
        let defaultUIFont = UIFont.systemFontOfSize(UIFont.labelFontSize);
        if (PlatformModule.device.sdkVersion.toString().indexOf('13') >= 0) {
          let navBarAppearance = navigationBar.standardAppearance ? 
            navigationBar.standardAppearance : UINavigationBarAppearance.new();
          navBarAppearance.titleTextAttributes = <any> {
            [NSForegroundColorAttributeName]: titleColor.ios,
            [NSFontAttributeName]: titleFont.getUIFont(defaultUIFont),  
            };
          UINavigationBar.appearanceWhenContainedInInstancesOfClasses([UINavigationController.class()])
            .standardAppearance = navBarAppearance;
        } else {
          navigationBar.titleTextAttributes = <any> {
            [NSForegroundColorAttributeName]: titleColor.ios,
            [NSFontAttributeName]: titleFont.getUIFont(defaultUIFont),
          };
        }
      }
    }
  }

  public static updateActionBarElevation(page: Page, on: Boolean) {
    //
  }
}

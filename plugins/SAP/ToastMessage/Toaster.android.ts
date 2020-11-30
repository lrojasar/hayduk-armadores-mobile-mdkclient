import * as app from 'tns-core-modules/application';
import { ErrorMessage } from '../ErrorHandling/ErrorMessage';
import * as utils from 'tns-core-modules/utils/utils';
import { IBannerData, BannerType } from '../BannerMessage/IBannerData';
import { device } from 'tns-core-modules/platform';
import { DeviceType } from 'tns-core-modules/ui/enums';

declare var android;
declare var com;

export class Toaster {
  public static getInstance(): Toaster {
    return Toaster._instance;
  }

  private static _instance: Toaster = new Toaster();
  private static _phoneMargin = utils.layout.toDevicePixels(8);
  private static _tabletMargin = utils.layout.toDevicePixels(24);
  private static _minWidth = utils.layout.toDevicePixels(288);
  private static _maxWidth = utils.layout.toDevicePixels(568);

  private _toastBridge = new com.sap.mdk.client.ui.fiori.toast.Toast();

  private constructor() {
    if (Toaster._instance) {
      throw new Error(ErrorMessage.TOASTER_INSTANTIATION_FAILED);
    }
    Toaster._instance = this;
  }

  public dismiss(data?: IBannerData) {
    this._toastBridge.dismiss();
  }

  public display(data: any) {
    if (!data.message || data.message === '') {
      throw new Error(ErrorMessage.TOASTER_NO_MESSAGE);
    }

    if (this._toastBridge) {
      let foregroundAct = app.android.foregroundActivity;
      let topFrame = data.background;
      // MDK-4737 add checking to prevent app get crashed when MDK onExiting
      if (foregroundAct === undefined || topFrame.currentPage.android === null) {
        return undefined;
      }
      
     // BCP-2080190190 when user trigged ChangeUserPasscodeAction.ts and cancelled it and shown the toast, then still MDKAndroidActivity (view)
     // is not loaded so toast is not shown so we need to attach to ForegroundActivity window content.
     // BCP-1980279878, attach toast to ForegroundActivity window when app is not in foreground and still MDKAndroidActivity (view) 
     // is not loaded.

      let frame = topFrame.currentPage.android;
      if (foregroundAct && foregroundAct.getClass().getSimpleName()
        && (foregroundAct.getClass().getSimpleName() !== 'MDKAndroidActivity' || !frame.isAttachedToWindow())) {
        // The foreground is a non-nativescript activity.
        // E.g.: User changed passcode and had a toast/banner as success action.
        // The top activity at this time is the biometrics screen, so we need its view to display the message.
        frame = foregroundAct.getWindow().getDecorView().findViewById(android.R.id.content);
      }

      // Do final Check if the view is attached or not
      if (!frame.isAttachedToWindow()) {
        return undefined;
      }

      const params: org.json.JSONObject = new org.json.JSONObject();
      params.put('Duration', data.duration);
      params.put('Message', data.message);
      params.put('CloseButtonCaption', data.CloseButtonCaption);
      params.put('BottomOffset', data.bottomOffset);
      params.put('MaxLines', data.maxLines);
      params.put('Animated', data.animated);
      if (device.deviceType === DeviceType.Phone) {
        params.put('Margin', Toaster._phoneMargin);
      } else {
        params.put('Margin', Toaster._tabletMargin);
        params.put('MinWidth', Toaster._minWidth);
        params.put('MaxWidth', Toaster._maxWidth);
      }
      this._toastBridge.show(params, foregroundAct, frame);
    }
  }
};

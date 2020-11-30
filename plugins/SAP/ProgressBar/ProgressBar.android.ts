import { View } from 'tns-core-modules/ui/core/view';

declare var android;

export class ProgressBar extends View {
  public nativeView: any;

  public createNativeView(): Object {
    let res = this._context.getResources().getIdentifier('FioriProgressbar.Horizontal', 'style', 
              this._context.getPackageName());

    // In case we fail, better to default than crash
    if (!res) {
      res = android.R.attr.progressBarStyleHorizontal;
    }
    
    let progressIndicator = new android.widget.ProgressBar(this._context, null, 
                            android.R.attr.progressBarStyleHorizontal, res);
    progressIndicator.setIndeterminate(true);

    let lp = new android.view.ViewGroup.MarginLayoutParams(
      android.view.ViewGroup.LayoutParams.MATCH_PARENT, android.view.ViewGroup.LayoutParams.WRAP_CONTENT);
    let topMargin = -6 * this._context.getResources().getDisplayMetrics().density;
    lp.setMargins(0, topMargin, 0, topMargin);
    progressIndicator.setLayoutParams(lp);
    progressIndicator.setVisibility(android.view.ViewGroup.GONE);

    return progressIndicator;
  }

  public initNativeView(): void {
    (<any> this.nativeView).owner = this;
    super.initNativeView();
  }

  public disposeNativeView(): void {
    // Remove reference from native view to this instance.
    if (this.nativeView) {
      (<any> this.nativeView).owner = null;
    }
    super.disposeNativeView();
  }

  public show(): void {
    if (this.nativeView) {
      this.nativeView.setVisibility(android.view.ViewGroup.VISIBLE);
    }
  }

  public hide(): void {
    if (this.nativeView) {
      this.nativeView.setVisibility(android.view.ViewGroup.GONE);
    }
  }
}

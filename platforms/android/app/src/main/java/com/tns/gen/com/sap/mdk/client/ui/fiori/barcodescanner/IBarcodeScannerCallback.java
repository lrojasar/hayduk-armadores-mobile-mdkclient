/* AUTO-GENERATED FILE. DO NOT MODIFY.
 * This class was automatically generated by the
 * static binding generator from the resources it found.
 * Please do not modify by hand.
 */
package com.tns.gen.com.sap.mdk.client.ui.fiori.barcodescanner;

public class IBarcodeScannerCallback extends java.lang.Object
    implements com.tns.NativeScriptHashCodeProvider,
        com.sap.mdk.client.ui.fiori.barcodescanner.IBarcodeScannerCallback {
  public IBarcodeScannerCallback() {
    super();
    com.tns.Runtime.initInstance(this);
  }

  public void finishedScanningWithResults(java.lang.String param_0) {
    java.lang.Object[] args = new java.lang.Object[1];
    args[0] = param_0;
    com.tns.Runtime.callJSMethod(this, "finishedScanningWithResults", void.class, args);
  }

  public void finishedScanningWithErrors(java.lang.String param_0) {
    java.lang.Object[] args = new java.lang.Object[1];
    args[0] = param_0;
    com.tns.Runtime.callJSMethod(this, "finishedScanningWithErrors", void.class, args);
  }

  public void finishedCheckingWithResults(java.lang.Boolean param_0) {
    java.lang.Object[] args = new java.lang.Object[1];
    args[0] = param_0;
    com.tns.Runtime.callJSMethod(this, "finishedCheckingWithResults", void.class, args);
  }

  public void finishedCheckingWithErrors(java.lang.String param_0) {
    java.lang.Object[] args = new java.lang.Object[1];
    args[0] = param_0;
    com.tns.Runtime.callJSMethod(this, "finishedCheckingWithErrors", void.class, args);
  }

  public int hashCode__super() {
    return super.hashCode();
  }

  public boolean equals__super(java.lang.Object other) {
    return super.equals(other);
  }
}

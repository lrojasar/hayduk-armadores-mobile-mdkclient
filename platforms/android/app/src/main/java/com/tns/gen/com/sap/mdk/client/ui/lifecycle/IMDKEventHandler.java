/* AUTO-GENERATED FILE. DO NOT MODIFY.
 * This class was automatically generated by the
 * static binding generator from the resources it found.
 * Please do not modify by hand.
 */
package com.tns.gen.com.sap.mdk.client.ui.lifecycle;

public class IMDKEventHandler extends java.lang.Object
    implements com.tns.NativeScriptHashCodeProvider,
        com.sap.mdk.client.ui.lifecycle.IMDKEventHandler {
  public IMDKEventHandler() {
    super();
    com.tns.Runtime.initInstance(this);
  }

  public void onAppResumed() {
    java.lang.Object[] args = new java.lang.Object[0];
    com.tns.Runtime.callJSMethod(this, "onAppResumed", void.class, args);
  }

  public void onAppSuspended() {
    java.lang.Object[] args = new java.lang.Object[0];
    com.tns.Runtime.callJSMethod(this, "onAppSuspended", void.class, args);
  }

  public int hashCode__super() {
    return super.hashCode();
  }

  public boolean equals__super(java.lang.Object other) {
    return super.equals(other);
  }
}

/* AUTO-GENERATED FILE. DO NOT MODIFY.
 * This class was automatically generated by the
 * static binding generator from the resources it found.
 * Please do not modify by hand.
 */
package com.tns;

@com.tns.JavaScriptImplementation(
    javaScriptFile = "./tns_modules/@nativescript/core/ui/frame/fragment.js")
public class FragmentClass extends org.nativescript.widgets.FragmentBase
    implements com.tns.NativeScriptHashCodeProvider {
  public FragmentClass() {
    super();
    com.tns.Runtime.initInstance(this);
  }

  public java.lang.String toString() {
    java.lang.Object[] args = new java.lang.Object[0];
    return (java.lang.String)
        com.tns.Runtime.callJSMethod(this, "toString", java.lang.String.class, args);
  }

  public void onHiddenChanged(boolean param_0) {
    java.lang.Object[] args = new java.lang.Object[1];
    args[0] = param_0;
    com.tns.Runtime.callJSMethod(this, "onHiddenChanged", void.class, args);
  }

  public android.animation.Animator onCreateAnimator(int param_0, boolean param_1, int param_2) {
    java.lang.Object[] args = new java.lang.Object[3];
    args[0] = param_0;
    args[1] = param_1;
    args[2] = param_2;
    return (android.animation.Animator)
        com.tns.Runtime.callJSMethod(
            this, "onCreateAnimator", android.animation.Animator.class, args);
  }

  public void onCreate(android.os.Bundle param_0) {
    java.lang.Object[] args = new java.lang.Object[1];
    args[0] = param_0;
    com.tns.Runtime.callJSMethod(this, "onCreate", void.class, args);
  }

  public android.view.View onCreateView(
      android.view.LayoutInflater param_0,
      android.view.ViewGroup param_1,
      android.os.Bundle param_2) {
    java.lang.Object[] args = new java.lang.Object[3];
    args[0] = param_0;
    args[1] = param_1;
    args[2] = param_2;
    return (android.view.View)
        com.tns.Runtime.callJSMethod(this, "onCreateView", android.view.View.class, args);
  }

  public void onSaveInstanceState(android.os.Bundle param_0) {
    java.lang.Object[] args = new java.lang.Object[1];
    args[0] = param_0;
    com.tns.Runtime.callJSMethod(this, "onSaveInstanceState", void.class, args);
  }

  public void onPause() {
    java.lang.Object[] args = new java.lang.Object[0];
    com.tns.Runtime.callJSMethod(this, "onPause", void.class, args);
  }

  public void onStop() {
    java.lang.Object[] args = new java.lang.Object[0];
    com.tns.Runtime.callJSMethod(this, "onStop", void.class, args);
  }

  public void onDestroyView() {
    java.lang.Object[] args = new java.lang.Object[0];
    com.tns.Runtime.callJSMethod(this, "onDestroyView", void.class, args);
  }

  public void onDestroy() {
    java.lang.Object[] args = new java.lang.Object[0];
    com.tns.Runtime.callJSMethod(this, "onDestroy", void.class, args);
  }

  public int hashCode__super() {
    return super.hashCode();
  }

  public boolean equals__super(java.lang.Object other) {
    return super.equals(other);
  }
}
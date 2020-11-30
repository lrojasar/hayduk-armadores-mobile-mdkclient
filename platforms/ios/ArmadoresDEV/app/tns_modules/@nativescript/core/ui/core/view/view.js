function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
var view_common_1 = require("./view-common");
var view_helper_1 = require("./view-helper");
exports.ios = view_helper_1.ios;
var background_1 = require("../../styling/background");
var utils_1 = require("../../../utils/utils");
var native_helper_1 = require("../../../utils/native-helper");
var style_properties_1 = require("../../styling/style-properties");
var profiling_1 = require("../../../profiling");
__export(require("./view-common"));
var PFLAG_FORCE_LAYOUT = 1;
var PFLAG_MEASURED_DIMENSION_SET = 1 << 1;
var PFLAG_LAYOUT_REQUIRED = 1 << 2;
var majorVersion = utils_1.ios.MajorVersion;
var View = (function (_super) {
    __extends(View, _super);
    function View() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._isLaidOut = false;
        _this._hasTransfrom = false;
        _this._privateFlags = PFLAG_LAYOUT_REQUIRED | PFLAG_FORCE_LAYOUT;
        _this._suspendCATransaction = false;
        return _this;
    }
    Object.defineProperty(View.prototype, "isLayoutRequired", {
        get: function () {
            return (this._privateFlags & PFLAG_LAYOUT_REQUIRED) === PFLAG_LAYOUT_REQUIRED;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(View.prototype, "isLayoutRequested", {
        get: function () {
            return (this._privateFlags & PFLAG_FORCE_LAYOUT) === PFLAG_FORCE_LAYOUT;
        },
        enumerable: true,
        configurable: true
    });
    View.prototype.requestLayout = function () {
        _super.prototype.requestLayout.call(this);
        this._privateFlags |= PFLAG_FORCE_LAYOUT;
        var nativeView = this.nativeViewProtected;
        if (nativeView && nativeView.setNeedsLayout) {
            nativeView.setNeedsLayout();
        }
        if (this.viewController && this.viewController.view !== nativeView) {
            this.viewController.view.setNeedsLayout();
        }
    };
    View.prototype.measure = function (widthMeasureSpec, heightMeasureSpec) {
        var measureSpecsChanged = this._setCurrentMeasureSpecs(widthMeasureSpec, heightMeasureSpec);
        var forceLayout = (this._privateFlags & PFLAG_FORCE_LAYOUT) === PFLAG_FORCE_LAYOUT;
        if (forceLayout || measureSpecsChanged) {
            this._privateFlags &= ~PFLAG_MEASURED_DIMENSION_SET;
            this.onMeasure(widthMeasureSpec, heightMeasureSpec);
            this._privateFlags |= PFLAG_LAYOUT_REQUIRED;
            if ((this._privateFlags & PFLAG_MEASURED_DIMENSION_SET) !== PFLAG_MEASURED_DIMENSION_SET) {
                throw new Error("onMeasure() did not set the measured dimension by calling setMeasuredDimension() " + this);
            }
        }
    };
    View.prototype.layout = function (left, top, right, bottom, setFrame) {
        if (setFrame === void 0) { setFrame = true; }
        var _a = this._setCurrentLayoutBounds(left, top, right, bottom), boundsChanged = _a.boundsChanged, sizeChanged = _a.sizeChanged;
        if (setFrame) {
            this.layoutNativeView(left, top, right, bottom);
        }
        if (boundsChanged || (this._privateFlags & PFLAG_LAYOUT_REQUIRED) === PFLAG_LAYOUT_REQUIRED) {
            var position = { left: left, top: top, right: right, bottom: bottom };
            if (this.nativeViewProtected && majorVersion > 10) {
                var frame = this.nativeViewProtected.frame;
                position = view_helper_1.ios.getPositionFromFrame(frame);
            }
            this.onLayout(position.left, position.top, position.right, position.bottom);
            this._privateFlags &= ~PFLAG_LAYOUT_REQUIRED;
        }
        this.updateBackground(sizeChanged);
        this._privateFlags &= ~PFLAG_FORCE_LAYOUT;
    };
    View.prototype.updateBackground = function (sizeChanged) {
        if (sizeChanged) {
            this._onSizeChanged();
        }
        else if (this._nativeBackgroundState === "invalid") {
            var background = this.style.backgroundInternal;
            this._redrawNativeBackground(background);
        }
    };
    View.prototype.setMeasuredDimension = function (measuredWidth, measuredHeight) {
        _super.prototype.setMeasuredDimension.call(this, measuredWidth, measuredHeight);
        this._privateFlags |= PFLAG_MEASURED_DIMENSION_SET;
    };
    View.prototype.onMeasure = function (widthMeasureSpec, heightMeasureSpec) {
        var view = this.nativeViewProtected;
        var width = view_common_1.layout.getMeasureSpecSize(widthMeasureSpec);
        var widthMode = view_common_1.layout.getMeasureSpecMode(widthMeasureSpec);
        var height = view_common_1.layout.getMeasureSpecSize(heightMeasureSpec);
        var heightMode = view_common_1.layout.getMeasureSpecMode(heightMeasureSpec);
        var nativeWidth = 0;
        var nativeHeight = 0;
        if (view) {
            var nativeSize = view_common_1.layout.measureNativeView(view, width, widthMode, height, heightMode);
            nativeWidth = nativeSize.width;
            nativeHeight = nativeSize.height;
        }
        var measureWidth = Math.max(nativeWidth, this.effectiveMinWidth);
        var measureHeight = Math.max(nativeHeight, this.effectiveMinHeight);
        var widthAndState = View.resolveSizeAndState(measureWidth, width, widthMode, 0);
        var heightAndState = View.resolveSizeAndState(measureHeight, height, heightMode, 0);
        this.setMeasuredDimension(widthAndState, heightAndState);
    };
    View.prototype.onLayout = function (left, top, right, bottom) {
    };
    View.prototype._setNativeViewFrame = function (nativeView, frame) {
        var oldFrame = this._cachedFrame || nativeView.frame;
        if (!CGRectEqualToRect(oldFrame, frame)) {
            if (view_common_1.traceEnabled()) {
                view_common_1.traceWrite(this + " :_setNativeViewFrame: " + JSON.stringify(view_helper_1.ios.getPositionFromFrame(frame)), view_common_1.traceCategories.Layout);
            }
            this._cachedFrame = frame;
            var adjustedFrame = null;
            var transform = null;
            if (this._hasTransfrom) {
                transform = nativeView.layer.transform;
                nativeView.layer.transform = CATransform3DIdentity;
                nativeView.frame = frame;
            }
            else {
                nativeView.frame = frame;
            }
            adjustedFrame = this.applySafeAreaInsets(frame);
            if (adjustedFrame) {
                nativeView.frame = adjustedFrame;
            }
            if (this._hasTransfrom) {
                nativeView.layer.transform = transform;
            }
            var boundsOrigin = nativeView.bounds.origin;
            var boundsFrame = adjustedFrame || frame;
            nativeView.bounds = CGRectMake(boundsOrigin.x, boundsOrigin.y, boundsFrame.size.width, boundsFrame.size.height);
            this._raiseLayoutChangedEvent();
            this._isLaidOut = true;
        }
        else if (!this._isLaidOut) {
            this._raiseLayoutChangedEvent();
            this._isLaidOut = true;
        }
    };
    Object.defineProperty(View.prototype, "isLayoutValid", {
        get: function () {
            if (this.nativeViewProtected) {
                return this._isLayoutValid;
            }
            return false;
        },
        enumerable: true,
        configurable: true
    });
    View.prototype.layoutNativeView = function (left, top, right, bottom) {
        if (!this.nativeViewProtected) {
            return;
        }
        var nativeView = this.nativeViewProtected;
        var frame = view_helper_1.ios.getFrameFromPosition({ left: left, top: top, right: right, bottom: bottom });
        this._setNativeViewFrame(nativeView, frame);
    };
    View.prototype._layoutParent = function () {
        if (this.nativeViewProtected) {
            var frame = this.nativeViewProtected.frame;
            var origin_1 = frame.origin;
            var size = frame.size;
            var left = view_common_1.layout.toDevicePixels(origin_1.x);
            var top_1 = view_common_1.layout.toDevicePixels(origin_1.y);
            var width = view_common_1.layout.toDevicePixels(size.width);
            var height = view_common_1.layout.toDevicePixels(size.height);
            this._setLayoutFlags(left, top_1, width + left, height + top_1);
        }
        _super.prototype._layoutParent.call(this);
    };
    View.prototype._setLayoutFlags = function (left, top, right, bottom) {
        var width = right - left;
        var height = bottom - top;
        var widthSpec = view_common_1.layout.makeMeasureSpec(width, view_common_1.layout.EXACTLY);
        var heightSpec = view_common_1.layout.makeMeasureSpec(height, view_common_1.layout.EXACTLY);
        this._setCurrentMeasureSpecs(widthSpec, heightSpec);
        this._privateFlags &= ~PFLAG_FORCE_LAYOUT;
        this.setMeasuredDimension(width, height);
        var sizeChanged = this._setCurrentLayoutBounds(left, top, right, bottom).sizeChanged;
        this.updateBackground(sizeChanged);
        this._privateFlags &= ~PFLAG_LAYOUT_REQUIRED;
    };
    View.prototype.focus = function () {
        if (this.ios) {
            return this.ios.becomeFirstResponder();
        }
        return false;
    };
    View.prototype.applySafeAreaInsets = function (frame) {
        if (majorVersion <= 10) {
            return null;
        }
        if (!this.iosOverflowSafeArea || !this.iosOverflowSafeAreaEnabled) {
            return view_helper_1.ios.shrinkToSafeArea(this, frame);
        }
        else if (this.nativeViewProtected && this.nativeViewProtected.window) {
            return view_helper_1.ios.expandBeyondSafeArea(this, frame);
        }
        return null;
    };
    View.prototype.getSafeAreaInsets = function () {
        var safeAreaInsets = this.nativeViewProtected && this.nativeViewProtected.safeAreaInsets;
        var insets = { left: 0, top: 0, right: 0, bottom: 0 };
        if (safeAreaInsets) {
            insets.left = view_common_1.layout.round(view_common_1.layout.toDevicePixels(safeAreaInsets.left));
            insets.top = view_common_1.layout.round(view_common_1.layout.toDevicePixels(safeAreaInsets.top));
            insets.right = view_common_1.layout.round(view_common_1.layout.toDevicePixels(safeAreaInsets.right));
            insets.bottom = view_common_1.layout.round(view_common_1.layout.toDevicePixels(safeAreaInsets.bottom));
        }
        return insets;
    };
    View.prototype.getLocationInWindow = function () {
        if (!this.nativeViewProtected || !this.nativeViewProtected.window) {
            return undefined;
        }
        var pointInWindow = this.nativeViewProtected.convertPointToView(this.nativeViewProtected.bounds.origin, null);
        return {
            x: pointInWindow.x,
            y: pointInWindow.y
        };
    };
    View.prototype.getLocationOnScreen = function () {
        if (!this.nativeViewProtected || !this.nativeViewProtected.window) {
            return undefined;
        }
        var pointInWindow = this.nativeViewProtected.convertPointToView(this.nativeViewProtected.bounds.origin, null);
        var pointOnScreen = this.nativeViewProtected.window.convertPointToWindow(pointInWindow, null);
        return {
            x: pointOnScreen.x,
            y: pointOnScreen.y
        };
    };
    View.prototype.getLocationRelativeTo = function (otherView) {
        if (!this.nativeViewProtected || !this.nativeViewProtected.window ||
            !otherView.nativeViewProtected || !otherView.nativeViewProtected.window ||
            this.nativeViewProtected.window !== otherView.nativeViewProtected.window) {
            return undefined;
        }
        var myPointInWindow = this.nativeViewProtected.convertPointToView(this.nativeViewProtected.bounds.origin, null);
        var otherPointInWindow = otherView.nativeViewProtected.convertPointToView(otherView.nativeViewProtected.bounds.origin, null);
        return {
            x: myPointInWindow.x - otherPointInWindow.x,
            y: myPointInWindow.y - otherPointInWindow.y
        };
    };
    View.prototype._onSizeChanged = function () {
        var nativeView = this.nativeViewProtected;
        if (!nativeView) {
            return;
        }
        var background = this.style.backgroundInternal;
        var backgroundDependsOnSize = background.image
            || !background.hasUniformBorder()
            || background.hasBorderRadius();
        if (this._nativeBackgroundState === "invalid" || (this._nativeBackgroundState === "drawn" && backgroundDependsOnSize)) {
            this._redrawNativeBackground(background);
        }
        var clipPath = this.style.clipPath;
        if (clipPath !== "" && this[style_properties_1.clipPathProperty.setNative]) {
            this[style_properties_1.clipPathProperty.setNative](clipPath);
        }
    };
    View.prototype.updateNativeTransform = function () {
        var scaleX = this.scaleX || 1e-6;
        var scaleY = this.scaleY || 1e-6;
        var perspective = this.perspective || 300;
        var transform = new CATransform3D(CATransform3DIdentity);
        if (this.rotateX || this.rotateY) {
            transform.m34 = -1 / perspective;
        }
        transform = CATransform3DTranslate(transform, this.translateX, this.translateY, 0);
        transform = native_helper_1.ios.applyRotateTransform(transform, this.rotateX, this.rotateY, this.rotate);
        transform = CATransform3DScale(transform, scaleX, scaleY, 1);
        if (!CATransform3DEqualToTransform(this.nativeViewProtected.layer.transform, transform)) {
            var updateSuspended = this._isPresentationLayerUpdateSuspeneded();
            if (!updateSuspended) {
                CATransaction.begin();
            }
            this.nativeViewProtected.layer.transform = transform;
            this._hasTransfrom = this.nativeViewProtected && !CATransform3DEqualToTransform(this.nativeViewProtected.transform3D, CATransform3DIdentity);
            if (!updateSuspended) {
                CATransaction.commit();
            }
        }
    };
    View.prototype.updateOriginPoint = function (originX, originY) {
        var newPoint = CGPointMake(originX, originY);
        this.nativeViewProtected.layer.anchorPoint = newPoint;
        if (this._cachedFrame) {
            this._setNativeViewFrame(this.nativeViewProtected, this._cachedFrame);
        }
    };
    View.prototype._suspendPresentationLayerUpdates = function () {
        this._suspendCATransaction = true;
    };
    View.prototype._resumePresentationLayerUpdates = function () {
        this._suspendCATransaction = false;
    };
    View.prototype._isPresentationLayerUpdateSuspeneded = function () {
        return this._suspendCATransaction || this._suspendNativeUpdatesCount;
    };
    View.prototype._showNativeModalView = function (parent, options) {
        var _this = this;
        var parentWithController = view_helper_1.ios.getParentWithViewController(parent);
        if (!parentWithController) {
            view_common_1.traceWrite("Could not find parent with viewController for " + parent + " while showing modal view.", view_common_1.traceCategories.ViewHierarchy, view_common_1.traceMessageType.error);
            return;
        }
        var parentController = parentWithController.viewController;
        if (parentController.presentedViewController) {
            view_common_1.traceWrite("Parent is already presenting view controller. Close the current modal page before showing another one!", view_common_1.traceCategories.ViewHierarchy, view_common_1.traceMessageType.error);
            return;
        }
        if (!parentController.view || !parentController.view.window) {
            view_common_1.traceWrite("Parent page is not part of the window hierarchy.", view_common_1.traceCategories.ViewHierarchy, view_common_1.traceMessageType.error);
            return;
        }
        this._setupAsRootView({});
        _super.prototype._showNativeModalView.call(this, parentWithController, options);
        var controller = this.viewController;
        if (!controller) {
            var nativeView = this.ios || this.nativeViewProtected;
            controller = view_helper_1.ios.UILayoutViewController.initWithOwner(new WeakRef(this));
            if (nativeView instanceof UIView) {
                controller.view.addSubview(nativeView);
            }
            this.viewController = controller;
        }
        if (options.fullscreen) {
            controller.modalPresentationStyle = 0;
        }
        else {
            controller.modalPresentationStyle = 2;
            if (options.ios && options.ios.width > 0 && options.ios.height > 0) {
                controller.preferredContentSize = CGSizeMake(options.ios.width, options.ios.height);
            }
            else {
                var handler_1 = function () {
                    var w = (_this.width || _this.style.width);
                    var h = (_this.height || _this.style.height);
                    if (w > 0 && h > 0) {
                        controller.preferredContentSize = CGSizeMake(w, h);
                    }
                    _this.off(View.loadedEvent, handler_1);
                };
                this.on(View.loadedEvent, handler_1);
            }
        }
        if (options.ios && options.ios.presentationStyle) {
            var presentationStyle = options.ios.presentationStyle;
            controller.modalPresentationStyle = presentationStyle;
            if (presentationStyle === 7) {
                this._setupPopoverControllerDelegate(controller, parent);
            }
        }
        var cancelable = options.cancelable !== undefined ? !!options.cancelable : true;
        if (majorVersion >= 13) {
            if (cancelable) {
                this._setupAdaptiveControllerDelegate(controller);
            }
            else {
                controller.modalInPresentation = true;
            }
        }
        this.horizontalAlignment = "stretch";
        this.verticalAlignment = "stretch";
        this._raiseShowingModallyEvent();
        var animated = options.animated === undefined ? true : !!options.animated;
        controller.animated = animated;
        parentController.presentViewControllerAnimatedCompletion(controller, animated, null);
        var transitionCoordinator = parentController.transitionCoordinator;
        if (transitionCoordinator) {
            transitionCoordinator.animateAlongsideTransitionCompletion(null, function () { return _this._raiseShownModallyEvent(); });
        }
        else {
            this._raiseShownModallyEvent();
        }
    };
    View.prototype._hideNativeModalView = function (parent, whenClosedCallback) {
        if (!parent || !parent.viewController) {
            view_common_1.traceError("Trying to hide modal view but no parent with viewController specified.");
            return;
        }
        if (!parent.viewController.presentedViewController) {
            whenClosedCallback();
            return;
        }
        var parentController = parent.viewController;
        var animated = this.viewController.animated;
        parentController.dismissViewControllerAnimatedCompletion(animated, whenClosedCallback);
    };
    View.prototype[view_common_1.isEnabledProperty.getDefault] = function () {
        var nativeView = this.nativeViewProtected;
        return nativeView instanceof UIControl ? nativeView.enabled : true;
    };
    View.prototype[view_common_1.isEnabledProperty.setNative] = function (value) {
        var nativeView = this.nativeViewProtected;
        if (nativeView instanceof UIControl) {
            nativeView.enabled = value;
        }
    };
    View.prototype[view_common_1.originXProperty.getDefault] = function () {
        return this.nativeViewProtected.layer.anchorPoint.x;
    };
    View.prototype[view_common_1.originXProperty.setNative] = function (value) {
        this.updateOriginPoint(value, this.originY);
    };
    View.prototype[view_common_1.originYProperty.getDefault] = function () {
        return this.nativeViewProtected.layer.anchorPoint.y;
    };
    View.prototype[view_common_1.originYProperty.setNative] = function (value) {
        this.updateOriginPoint(this.originX, value);
    };
    View.prototype[view_common_1.automationTextProperty.getDefault] = function () {
        return this.nativeViewProtected.accessibilityLabel;
    };
    View.prototype[view_common_1.automationTextProperty.setNative] = function (value) {
        this.nativeViewProtected.accessibilityIdentifier = value;
        this.nativeViewProtected.accessibilityLabel = value;
    };
    View.prototype[view_common_1.isUserInteractionEnabledProperty.getDefault] = function () {
        return this.nativeViewProtected.userInteractionEnabled;
    };
    View.prototype[view_common_1.isUserInteractionEnabledProperty.setNative] = function (value) {
        this.nativeViewProtected.userInteractionEnabled = value;
    };
    View.prototype[style_properties_1.visibilityProperty.getDefault] = function () {
        return this.nativeViewProtected.hidden ? style_properties_1.Visibility.COLLAPSE : style_properties_1.Visibility.VISIBLE;
    };
    View.prototype[style_properties_1.visibilityProperty.setNative] = function (value) {
        switch (value) {
            case style_properties_1.Visibility.VISIBLE:
                this.nativeViewProtected.hidden = false;
                break;
            case style_properties_1.Visibility.HIDDEN:
            case style_properties_1.Visibility.COLLAPSE:
                this.nativeViewProtected.hidden = true;
                break;
            default:
                throw new Error("Invalid visibility value: " + value + ". Valid values are: \"" + style_properties_1.Visibility.VISIBLE + "\", \"" + style_properties_1.Visibility.HIDDEN + "\", \"" + style_properties_1.Visibility.COLLAPSE + "\".");
        }
    };
    View.prototype[style_properties_1.opacityProperty.getDefault] = function () {
        return this.nativeViewProtected.alpha;
    };
    View.prototype[style_properties_1.opacityProperty.setNative] = function (value) {
        var nativeView = this.nativeViewProtected;
        var updateSuspended = this._isPresentationLayerUpdateSuspeneded();
        if (!updateSuspended) {
            CATransaction.begin();
        }
        nativeView.alpha = value;
        if (!updateSuspended) {
            CATransaction.commit();
        }
    };
    View.prototype[style_properties_1.rotateProperty.getDefault] = function () {
        return 0;
    };
    View.prototype[style_properties_1.rotateProperty.setNative] = function (value) {
        this.updateNativeTransform();
    };
    View.prototype[style_properties_1.rotateXProperty.getDefault] = function () {
        return 0;
    };
    View.prototype[style_properties_1.rotateXProperty.setNative] = function (value) {
        this.updateNativeTransform();
    };
    View.prototype[style_properties_1.rotateYProperty.getDefault] = function () {
        return 0;
    };
    View.prototype[style_properties_1.rotateYProperty.setNative] = function (value) {
        this.updateNativeTransform();
    };
    View.prototype[style_properties_1.perspectiveProperty.getDefault] = function () {
        return 300;
    };
    View.prototype[style_properties_1.perspectiveProperty.setNative] = function (value) {
        this.updateNativeTransform();
    };
    View.prototype[style_properties_1.scaleXProperty.getDefault] = function () {
        return 1;
    };
    View.prototype[style_properties_1.scaleXProperty.setNative] = function (value) {
        this.updateNativeTransform();
    };
    View.prototype[style_properties_1.scaleYProperty.getDefault] = function () {
        return 1;
    };
    View.prototype[style_properties_1.scaleYProperty.setNative] = function (value) {
        this.updateNativeTransform();
    };
    View.prototype[style_properties_1.translateXProperty.getDefault] = function () {
        return 0;
    };
    View.prototype[style_properties_1.translateXProperty.setNative] = function (value) {
        this.updateNativeTransform();
    };
    View.prototype[style_properties_1.translateYProperty.getDefault] = function () {
        return 0;
    };
    View.prototype[style_properties_1.translateYProperty.setNative] = function (value) {
        this.updateNativeTransform();
    };
    View.prototype[style_properties_1.zIndexProperty.getDefault] = function () {
        return 0;
    };
    View.prototype[style_properties_1.zIndexProperty.setNative] = function (value) {
        this.nativeViewProtected.layer.zPosition = value;
    };
    View.prototype[style_properties_1.backgroundInternalProperty.getDefault] = function () {
        return this.nativeViewProtected.backgroundColor;
    };
    View.prototype[style_properties_1.backgroundInternalProperty.setNative] = function (value) {
        this._nativeBackgroundState = "invalid";
        if (this.isLayoutValid) {
            this._redrawNativeBackground(value);
        }
    };
    View.prototype._getCurrentLayoutBounds = function () {
        var nativeView = this.nativeViewProtected;
        if (nativeView && !this.isCollapsed) {
            var frame = nativeView.frame;
            var origin_2 = frame.origin;
            var size = frame.size;
            return {
                left: Math.round(view_common_1.layout.toDevicePixels(origin_2.x)),
                top: Math.round(view_common_1.layout.toDevicePixels(origin_2.y)),
                right: Math.round(view_common_1.layout.toDevicePixels(origin_2.x + size.width)),
                bottom: Math.round(view_common_1.layout.toDevicePixels(origin_2.y + size.height))
            };
        }
        else {
            return { left: 0, top: 0, right: 0, bottom: 0 };
        }
    };
    View.prototype._redrawNativeBackground = function (value) {
        var _this = this;
        var updateSuspended = this._isPresentationLayerUpdateSuspeneded();
        if (!updateSuspended) {
            CATransaction.begin();
        }
        if (value instanceof UIColor) {
            this.nativeViewProtected.backgroundColor = value;
        }
        else {
            background_1.ios.createBackgroundUIColor(this, function (color) {
                _this.nativeViewProtected.backgroundColor = color;
            });
            this._setNativeClipToBounds();
        }
        if (!updateSuspended) {
            CATransaction.commit();
        }
        this._nativeBackgroundState = "drawn";
    };
    View.prototype._setNativeClipToBounds = function () {
        var backgroundInternal = this.style.backgroundInternal;
        this.nativeViewProtected.clipsToBounds =
            this.nativeViewProtected instanceof UIScrollView ||
                backgroundInternal.hasBorderWidth() ||
                backgroundInternal.hasBorderRadius();
    };
    View.prototype._setupPopoverControllerDelegate = function (controller, parent) {
        var popoverPresentationController = controller.popoverPresentationController;
        this._popoverPresentationDelegate = view_helper_1.ios.UIPopoverPresentationControllerDelegateImp.initWithOwnerAndCallback(new WeakRef(this), this._closeModalCallback);
        popoverPresentationController.delegate = this._popoverPresentationDelegate;
        var view = parent.nativeViewProtected;
        popoverPresentationController.sourceView = view;
        popoverPresentationController.sourceRect = CGRectMake(0, 0, view.frame.size.width, view.frame.size.height);
    };
    View.prototype._setupAdaptiveControllerDelegate = function (controller) {
        this._adaptivePresentationDelegate = view_helper_1.ios.UIAdaptivePresentationControllerDelegateImp.initWithOwnerAndCallback(new WeakRef(this), this._closeModalCallback);
        controller.presentationController.delegate = this._adaptivePresentationDelegate;
    };
    __decorate([
        profiling_1.profile
    ], View.prototype, "layout", null);
    __decorate([
        profiling_1.profile
    ], View.prototype, "onMeasure", null);
    return View;
}(view_common_1.ViewCommon));
exports.View = View;
View.prototype._nativeBackgroundState = "unset";
var ContainerView = (function (_super) {
    __extends(ContainerView, _super);
    function ContainerView() {
        var _this = _super.call(this) || this;
        _this.iosOverflowSafeArea = true;
        return _this;
    }
    return ContainerView;
}(View));
exports.ContainerView = ContainerView;
var CustomLayoutView = (function (_super) {
    __extends(CustomLayoutView, _super);
    function CustomLayoutView() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CustomLayoutView.prototype.createNativeView = function () {
        return UIView.alloc().initWithFrame(UIScreen.mainScreen.bounds);
    };
    Object.defineProperty(CustomLayoutView.prototype, "ios", {
        get: function () {
            return this.nativeViewProtected;
        },
        enumerable: true,
        configurable: true
    });
    CustomLayoutView.prototype.onMeasure = function (widthMeasureSpec, heightMeasureSpec) {
    };
    CustomLayoutView.prototype._addViewToNativeVisualTree = function (child, atIndex) {
        _super.prototype._addViewToNativeVisualTree.call(this, child, atIndex);
        var parentNativeView = this.nativeViewProtected;
        var childNativeView = child.nativeViewProtected;
        if (parentNativeView && childNativeView) {
            if (typeof atIndex !== "number" || atIndex >= parentNativeView.subviews.count) {
                parentNativeView.addSubview(childNativeView);
            }
            else {
                parentNativeView.insertSubviewAtIndex(childNativeView, atIndex);
            }
            return true;
        }
        return false;
    };
    CustomLayoutView.prototype._removeViewFromNativeVisualTree = function (child) {
        _super.prototype._removeViewFromNativeVisualTree.call(this, child);
        if (child.nativeViewProtected) {
            child.nativeViewProtected.removeFromSuperview();
        }
    };
    return CustomLayoutView;
}(ContainerView));
exports.CustomLayoutView = CustomLayoutView;
//# sourceMappingURL=view.ios.js.map
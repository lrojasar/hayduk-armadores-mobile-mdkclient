Object.defineProperty(exports, "__esModule", { value: true });
var trace_1 = require("../trace");
var radToDeg = Math.PI / 180;
function isOrientationLandscape(orientation) {
    return orientation === 3 ||
        orientation === 4;
}
function openFileAtRootModule(filePath) {
    try {
        var appPath = ios.getCurrentAppPath();
        var path = ios.isRealDevice() ? filePath.replace("~", appPath) : filePath;
        var controller = UIDocumentInteractionController.interactionControllerWithURL(NSURL.fileURLWithPath(path));
        controller.delegate = new ios.UIDocumentInteractionControllerDelegateImpl();
        return controller.presentPreviewAnimated(true);
    }
    catch (e) {
        trace_1.write("Error in openFile", trace_1.categories.Error, trace_1.messageType.error);
    }
    return false;
}
var ios;
(function (ios) {
    function getter(_this, property) {
        console.log("utils.ios.getter() is deprecated; use the respective native property instead");
        if (typeof property === "function") {
            return property.call(_this);
        }
        else {
            return property;
        }
    }
    ios.getter = getter;
    var collections;
    (function (collections) {
        function jsArrayToNSArray(str) {
            return NSArray.arrayWithArray(str);
        }
        collections.jsArrayToNSArray = jsArrayToNSArray;
        function nsArrayToJSArray(a) {
            var arr = [];
            if (a !== undefined) {
                var count = a.count;
                for (var i = 0; i < count; i++) {
                    arr.push(a.objectAtIndex(i));
                }
            }
            return arr;
        }
        collections.nsArrayToJSArray = nsArrayToJSArray;
    })(collections = ios.collections || (ios.collections = {}));
    function isLandscape() {
        console.log("utils.ios.isLandscape() is deprecated; use application.orientation instead");
        var deviceOrientation = UIDevice.currentDevice.orientation;
        var statusBarOrientation = UIApplication.sharedApplication.statusBarOrientation;
        var isDeviceOrientationLandscape = isOrientationLandscape(deviceOrientation);
        var isStatusBarOrientationLandscape = isOrientationLandscape(statusBarOrientation);
        return isDeviceOrientationLandscape || isStatusBarOrientationLandscape;
    }
    ios.isLandscape = isLandscape;
    ios.MajorVersion = NSString.stringWithString(UIDevice.currentDevice.systemVersion).intValue;
    function openFile(filePath) {
        console.log("utils.ios.openFile() is deprecated; use utils.openFile() instead");
        return openFileAtRootModule(filePath);
    }
    ios.openFile = openFile;
    function getCurrentAppPath() {
        var currentDir = __dirname;
        var tnsModulesIndex = currentDir.indexOf("/tns_modules");
        var appPath = currentDir;
        if (tnsModulesIndex !== -1) {
            appPath = currentDir.substring(0, tnsModulesIndex);
        }
        return appPath;
    }
    ios.getCurrentAppPath = getCurrentAppPath;
    function joinPaths() {
        var paths = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            paths[_i] = arguments[_i];
        }
        if (!paths || paths.length === 0) {
            return "";
        }
        return NSString.stringWithString(NSString.pathWithComponents(paths)).stringByStandardizingPath;
    }
    ios.joinPaths = joinPaths;
    function getVisibleViewController(rootViewController) {
        if (rootViewController.presentedViewController) {
            return getVisibleViewController(rootViewController.presentedViewController);
        }
        if (rootViewController.isKindOfClass(UINavigationController.class())) {
            return getVisibleViewController(rootViewController.visibleViewController);
        }
        if (rootViewController.isKindOfClass(UITabBarController.class())) {
            return getVisibleViewController(rootViewController);
        }
        return rootViewController;
    }
    ios.getVisibleViewController = getVisibleViewController;
    function applyRotateTransform(transform, x, y, z) {
        if (x) {
            transform = CATransform3DRotate(transform, x * radToDeg, 1, 0, 0);
        }
        if (y) {
            transform = CATransform3DRotate(transform, y * radToDeg, 0, 1, 0);
        }
        if (z) {
            transform = CATransform3DRotate(transform, z * radToDeg, 0, 0, 1);
        }
        return transform;
    }
    ios.applyRotateTransform = applyRotateTransform;
    var UIDocumentInteractionControllerDelegateImpl = (function (_super) {
        __extends(UIDocumentInteractionControllerDelegateImpl, _super);
        function UIDocumentInteractionControllerDelegateImpl() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        UIDocumentInteractionControllerDelegateImpl.prototype.getViewController = function () {
            var app = UIApplication.sharedApplication;
            return app.keyWindow.rootViewController;
        };
        UIDocumentInteractionControllerDelegateImpl.prototype.documentInteractionControllerViewControllerForPreview = function (controller) {
            return this.getViewController();
        };
        UIDocumentInteractionControllerDelegateImpl.prototype.documentInteractionControllerViewForPreview = function (controller) {
            return this.getViewController().view;
        };
        UIDocumentInteractionControllerDelegateImpl.prototype.documentInteractionControllerRectForPreview = function (controller) {
            return this.getViewController().view.frame;
        };
        UIDocumentInteractionControllerDelegateImpl.ObjCProtocols = [UIDocumentInteractionControllerDelegate];
        return UIDocumentInteractionControllerDelegateImpl;
    }(NSObject));
    ios.UIDocumentInteractionControllerDelegateImpl = UIDocumentInteractionControllerDelegateImpl;
    function isRealDevice() {
        try {
            var sourceType = UIImagePickerControllerSourceType.UIImagePickerControllerSourceTypeCamera;
            var mediaTypes = UIImagePickerController.availableMediaTypesForSourceType(sourceType);
            return mediaTypes;
        }
        catch (e) {
            return true;
        }
    }
    ios.isRealDevice = isRealDevice;
})(ios = exports.ios || (exports.ios = {}));
//# sourceMappingURL=native-helper.ios.js.map
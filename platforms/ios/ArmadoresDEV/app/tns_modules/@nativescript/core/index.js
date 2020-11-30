function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
var application_1 = require("./application");
exports.iOSApplication = application_1.iOSApplication;
exports.AndroidApplication = application_1.AndroidApplication;
var application_2 = require("./application");
exports.Application = {
    launchEvent: application_2.launchEvent, displayedEvent: application_2.displayedEvent, uncaughtErrorEvent: application_2.uncaughtErrorEvent, discardedErrorEvent: application_2.discardedErrorEvent,
    suspendEvent: application_2.suspendEvent, resumeEvent: application_2.resumeEvent, exitEvent: application_2.exitEvent, lowMemoryEvent: application_2.lowMemoryEvent, orientationChangedEvent: application_2.orientationChangedEvent,
    getMainEntry: application_2.getMainEntry, getRootView: application_2.getRootView, setResources: application_2.setResources, setCssFileName: application_2.setCssFileName, getCssFileName: application_2.getCssFileName, loadAppCss: application_2.loadAppCss, addCss: application_2.addCss,
    on: application_2.on, off: application_2.off, run: application_2.run, orientation: application_2.orientation, getNativeApplication: application_2.getNativeApplication, hasLaunched: application_2.hasLaunched,
    android: application_2.android, ios: application_2.ios,
};
var application_settings_1 = require("./application-settings");
exports.ApplicationSettings = { clear: application_settings_1.clear, flush: application_settings_1.flush, hasKey: application_settings_1.hasKey, remove: application_settings_1.remove, setString: application_settings_1.setString, getString: application_settings_1.getString, getAllKeys: application_settings_1.getAllKeys, getBoolean: application_settings_1.getBoolean, setBoolean: application_settings_1.setBoolean, getNumber: application_settings_1.getNumber, setNumber: application_settings_1.setNumber };
var color_1 = require("./color");
exports.Color = color_1.Color;
var connectivity_1 = require("./connectivity");
exports.Connectivity = { connectionType: connectivity_1.connectionType, getConnectionType: connectivity_1.getConnectionType, startMonitoring: connectivity_1.startMonitoring, stopMonitoring: connectivity_1.stopMonitoring };
var observable_array_1 = require("./data/observable-array");
exports.ObservableArray = observable_array_1.ObservableArray;
exports.ChangeType = observable_array_1.ChangeType;
var observable_1 = require("./data/observable");
exports.Observable = observable_1.Observable;
var file_system_1 = require("./file-system");
exports.File = file_system_1.File;
exports.FileSystemEntity = file_system_1.FileSystemEntity;
exports.Folder = file_system_1.Folder;
exports.knownFolders = file_system_1.knownFolders;
exports.path = file_system_1.path;
var http_1 = require("./http");
exports.HttpResponseEncoding = http_1.HttpResponseEncoding;
var http_2 = require("./http");
exports.Http = { getFile: http_2.getFile, getImage: http_2.getImage, getJSON: http_2.getJSON, getString: http_2.getString, request: http_2.request };
var image_asset_1 = require("./image-asset");
exports.ImageAsset = image_asset_1.ImageAsset;
var image_source_1 = require("./image-source");
exports.ImageSource = image_source_1.ImageSource;
var platform_1 = require("./platform");
exports.isAndroid = platform_1.isAndroid;
exports.isIOS = platform_1.isIOS;
exports.Screen = platform_1.screen;
exports.Device = platform_1.device;
var profiling_1 = require("./profiling");
exports.Profiling = {
    enable: profiling_1.enable,
    disable: profiling_1.disable,
    time: profiling_1.time, uptime: profiling_1.uptime,
    start: profiling_1.start, stop: profiling_1.stop, isRunning: profiling_1.isRunning,
    dumpProfiles: profiling_1.dumpProfiles, resetProfiles: profiling_1.resetProfiles,
    profile: profiling_1.profile, startCPUProfile: profiling_1.startCPUProfile, stopCPUProfile: profiling_1.stopCPUProfile,
};
var text_1 = require("./text");
exports.encoding = text_1.encoding;
var trace_1 = require("./trace");
exports.DefaultErrorHandler = trace_1.DefaultErrorHandler;
var trace_2 = require("./trace");
exports.Trace = {
    messageType: trace_2.messageType, categories: trace_2.categories, setCategories: trace_2.setCategories, addCategories: trace_2.addCategories,
    addWriter: trace_2.addWriter, removeWriter: trace_2.removeWriter, clearWriters: trace_2.clearWriters,
    setErrorHandler: trace_2.setErrorHandler,
    write: trace_2.write, error: trace_2.error, enable: trace_2.enable, disable: trace_2.disable, isEnabled: trace_2.isEnabled
};
__export(require("./ui"));
var utils_1 = require("./utils/utils");
exports.Utils = {
    GC: utils_1.GC, isFontIconURI: utils_1.isFontIconURI, isDataURI: utils_1.isDataURI, isFileOrResourcePath: utils_1.isFileOrResourcePath,
    executeOnMainThread: utils_1.executeOnMainThread, mainThreadify: utils_1.mainThreadify, isMainThread: utils_1.isMainThread, dispatchToMainThread: utils_1.dispatchToMainThread, releaseNativeObject: utils_1.releaseNativeObject,
    getModuleName: utils_1.getModuleName,
    openFile: utils_1.openFile, openUrl: utils_1.openUrl, isRealDevice: utils_1.isRealDevice,
    layout: utils_1.layout, android: utils_1.ad, ios: utils_1.ios
};
var xml_1 = require("./xml");
exports.XmlParser = xml_1.XmlParser;
exports.ParserEventType = xml_1.ParserEventType;
//# sourceMappingURL=index.js.map
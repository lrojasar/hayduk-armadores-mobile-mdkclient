/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "../node_modules/@nativescript/webpack/hmr/hot-loader.js!../node_modules/ts-loader/index.js?!./lifecycleManagement/AppExtractWorker.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "../node_modules/@nativescript/webpack/hmr/hot-loader.js!../node_modules/ts-loader/index.js?!./lifecycleManagement/AppExtractWorker.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {
Object.defineProperty(exports, "__esModule", { value: true });
__webpack_require__("tns-core-modules/globals");
var AppExtractHelper_1 = __webpack_require__("./lifecycleManagement/AppExtractHelper.ts");
var context = self;
context.onmessage = function (msg) {
    setTimeout(function () {
        var error = AppExtractHelper_1.AppExtractHelper.getInstance().extract(msg);
        global.postMessage({ err: error });
        AppExtractHelper_1.AppExtractHelper.getInstance().removeFolder();
        AppExtractHelper_1.AppExtractHelper.getInstance().removeDownloadedZipFile();
    }, 500);
};
; 
if (false ) {} 
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("../node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "../node_modules/webpack/buildin/global.js":
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ "./lifecycleManagement/AppExtractHelper.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var zip_plugin_1 = __webpack_require__("zip-plugin");
var fs = __webpack_require__("tns-core-modules/file-system");
var Logger_1 = __webpack_require__("mdk-core/utils/Logger");
var RequireUtil_1 = __webpack_require__("mdk-core/utils/RequireUtil");
var AppExtractHelper = (function () {
    function AppExtractHelper() {
    }
    AppExtractHelper.getInstance = function () {
        return AppExtractHelper._instance;
    };
    AppExtractHelper.prototype.extract = function (msg) {
        var error;
        this.zipSource = msg.data.zipSource;
        this.zipDest = msg.data.zipDestPath;
        var bundleDest = msg.data.bundleDest;
        Logger_1.Logger.instance.core.info('Unzip started: from ' + this.zipSource + ' to ' + this.zipDest);
        zip_plugin_1.Zip.unzip(this.zipSource, this.zipDest);
        var bundleSourcePath = fs.path.join(this.zipDest, 'bundle.js');
        error = this._moveBundleFile(bundleSourcePath, bundleDest, function (sContents) {
            return RequireUtil_1.RequireUtil.replaceMdkRequire(sContents);
        });
        if (!error) {
            this._moveBundleFile(fs.path.join(this.zipDest, 'bundle.js.map'), bundleDest + '.map');
        }
        return error;
    };
    AppExtractHelper.prototype.removeFolder = function () {
        var extractedZipFolder = fs.Folder.fromPath(this.zipDest);
        extractedZipFolder.removeSync(function (e) {
            Logger_1.Logger.instance.core.error("Failed to remove extracted zip folder: " + e);
        });
    };
    AppExtractHelper.prototype.removeDownloadedZipFile = function () {
        var zipSourceFile = fs.File.fromPath(this.zipSource);
        zipSourceFile.removeSync(function (e) {
            Logger_1.Logger.instance.core.error("Failed to remove temp download zip: " + e);
        });
    };
    AppExtractHelper.prototype._moveBundleFile = function (bundleSourcePath, bundleDest, cb) {
        var error;
        var bundleExists = fs.File.exists(bundleSourcePath);
        var bundleSourceFile;
        var bundleSourceData;
        if (bundleExists) {
            bundleSourceFile = fs.File.fromPath(bundleSourcePath);
        }
        else {
            error = bundleSourcePath + ' does not exist';
        }
        if (!error) {
            bundleSourceData = bundleSourceFile.readTextSync(function (e) {
                error = e;
                Logger_1.Logger.instance.core.error("App download file read failed: " + error);
            });
        }
        if (!error) {
            if (cb) {
                bundleSourceData = cb(bundleSourceData);
            }
            var bundleDesthFile = fs.File.fromPath(bundleDest);
            bundleDesthFile.writeTextSync(bundleSourceData, function (e) {
                error = e;
                Logger_1.Logger.instance.core.error("App download file write failed: " + error);
            });
        }
        return error;
    };
    AppExtractHelper._instance = new AppExtractHelper();
    return AppExtractHelper;
}());
exports.AppExtractHelper = AppExtractHelper;
; 
if (false ) {} 

/***/ }),

/***/ "mdk-core/utils/Logger":
/***/ (function(module, exports) {

module.exports = require("mdk-core/utils/Logger");

/***/ }),

/***/ "mdk-core/utils/RequireUtil":
/***/ (function(module, exports) {

module.exports = require("mdk-core/utils/RequireUtil");

/***/ }),

/***/ "tns-core-modules/file-system":
/***/ (function(module, exports) {

module.exports = require("tns-core-modules/file-system");

/***/ }),

/***/ "tns-core-modules/globals":
/***/ (function(module, exports) {

module.exports = require("tns-core-modules/globals");

/***/ }),

/***/ "zip-plugin":
/***/ (function(module, exports) {

module.exports = require("zip-plugin");

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vbGlmZWN5Y2xlTWFuYWdlbWVudC9BcHBFeHRyYWN0V29ya2VyLnRzIiwid2VicGFjazovLy8uLi9ub2RlX21vZHVsZXMvd2VicGFjay9idWlsZGluL2dsb2JhbC5qcyIsIndlYnBhY2s6Ly8vLi9saWZlY3ljbGVNYW5hZ2VtZW50L0FwcEV4dHJhY3RIZWxwZXIudHMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwibWRrLWNvcmUvdXRpbHMvTG9nZ2VyXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwibWRrLWNvcmUvdXRpbHMvUmVxdWlyZVV0aWxcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJ0bnMtY29yZS1tb2R1bGVzL2ZpbGUtc3lzdGVtXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwidG5zLWNvcmUtbW9kdWxlcy9nbG9iYWxzXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiemlwLXBsdWdpblwiIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7UUFBQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7O1FBR0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDBDQUEwQyxnQ0FBZ0M7UUFDMUU7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSx3REFBd0Qsa0JBQWtCO1FBQzFFO1FBQ0EsaURBQWlELGNBQWM7UUFDL0Q7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLHlDQUF5QyxpQ0FBaUM7UUFDMUUsZ0hBQWdILG1CQUFtQixFQUFFO1FBQ3JJO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMkJBQTJCLDBCQUEwQixFQUFFO1FBQ3ZELGlDQUFpQyxlQUFl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QUFDO2dCQUNWLGVBQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxxQ0FBbUMsS0FBTyxDQUFDLENBQUM7WUFDekUsQ0FBQyxDQUFDLENBQUM7U0FDTjtRQUVELE9BQU8sS0FBSyxDQUFDO0lBQ2YsQ0FBQztJQXhFYywwQkFBUyxHQUFxQixJQUFJLGdCQUFnQixFQUFFLENBQUM7SUEwRXRFLHVCQUFDO0NBQUE7QUFoRlksNENBQWdCOzs7Ozs7Ozs7QUNMN0Isa0Q7Ozs7Ozs7QUNBQSx1RDs7Ozs7OztBQ0FBLHlEOzs7Ozs7O0FDQUEscUQ7Ozs7Ozs7QUNBQSx1QyIsImZpbGUiOiIzMjQyNjZiNTgyNmRkMTY4ZjYyMC53b3JrZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuLi9ub2RlX21vZHVsZXMvQG5hdGl2ZXNjcmlwdC93ZWJwYWNrL2htci9ob3QtbG9hZGVyLmpzIS4uL25vZGVfbW9kdWxlcy90cy1sb2FkZXIvaW5kZXguanM/IS4vbGlmZWN5Y2xlTWFuYWdlbWVudC9BcHBFeHRyYWN0V29ya2VyLnRzXCIpO1xuIiwiaW1wb3J0ICd0bnMtY29yZS1tb2R1bGVzL2dsb2JhbHMnO1xuaW1wb3J0IHsgQXBwRXh0cmFjdEhlbHBlciB9IGZyb20gJy4vQXBwRXh0cmFjdEhlbHBlcic7XG5cbmNvbnN0IGNvbnRleHQ6IFdvcmtlciA9IHNlbGYgYXMgYW55O1xuLy8gTk9URTogQ0FOTk9UIERFQlVHIFdPUktFUlNcbi8vIFJlY29tbWVuZGVkIHRvIGFkZCB0aGlzIGNvZGUgaW4gYSBmdW5jdGlvbiBpbiB0aGUgaW52b2tpbmcgY29kZSB0byBkZWJ1Z1xuY29udGV4dC5vbm1lc3NhZ2UgPSBtc2cgPT4ge1xuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICBsZXQgZXJyb3IgPSBBcHBFeHRyYWN0SGVscGVyLmdldEluc3RhbmNlKCkuZXh0cmFjdChtc2cpO1xuICAgICAgICAoPGFueT4gZ2xvYmFsKS5wb3N0TWVzc2FnZSh7ZXJyOiBlcnJvcn0pO1xuICAgICAgICBBcHBFeHRyYWN0SGVscGVyLmdldEluc3RhbmNlKCkucmVtb3ZlRm9sZGVyKCk7XG4gICAgICAgIEFwcEV4dHJhY3RIZWxwZXIuZ2V0SW5zdGFuY2UoKS5yZW1vdmVEb3dubG9hZGVkWmlwRmlsZSgpO1xuICAgIH0sIDUwMCk7XG59O1xuXG4vLyBvbmVycm9yIGludGVudGlvbmFsbHkgbGVmdCBvdXQsIHRoZXJlIGlzIG5vIHNwZWNpYWwgaGFuZGxpbmcgdG8gYmUgZG9uZSBpbiB0aGUgd29ya2VyXG4vLyBwYXNzIGVycm9yIGJhY2sgdG8gY2FsbGVyXG4iLCJ2YXIgZztcblxuLy8gVGhpcyB3b3JrcyBpbiBub24tc3RyaWN0IG1vZGVcbmcgPSAoZnVuY3Rpb24oKSB7XG5cdHJldHVybiB0aGlzO1xufSkoKTtcblxudHJ5IHtcblx0Ly8gVGhpcyB3b3JrcyBpZiBldmFsIGlzIGFsbG93ZWQgKHNlZSBDU1ApXG5cdGcgPSBnIHx8IG5ldyBGdW5jdGlvbihcInJldHVybiB0aGlzXCIpKCk7XG59IGNhdGNoIChlKSB7XG5cdC8vIFRoaXMgd29ya3MgaWYgdGhlIHdpbmRvdyByZWZlcmVuY2UgaXMgYXZhaWxhYmxlXG5cdGlmICh0eXBlb2Ygd2luZG93ID09PSBcIm9iamVjdFwiKSBnID0gd2luZG93O1xufVxuXG4vLyBnIGNhbiBzdGlsbCBiZSB1bmRlZmluZWQsIGJ1dCBub3RoaW5nIHRvIGRvIGFib3V0IGl0Li4uXG4vLyBXZSByZXR1cm4gdW5kZWZpbmVkLCBpbnN0ZWFkIG9mIG5vdGhpbmcgaGVyZSwgc28gaXQnc1xuLy8gZWFzaWVyIHRvIGhhbmRsZSB0aGlzIGNhc2UuIGlmKCFnbG9iYWwpIHsgLi4ufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGc7XG4iLCJpbXBvcnQgeyBaaXAgfSBmcm9tICd6aXAtcGx1Z2luJztcbmltcG9ydCAqIGFzIGZzIGZyb20gJ3Rucy1jb3JlLW1vZHVsZXMvZmlsZS1zeXN0ZW0nO1xuaW1wb3J0IHsgTG9nZ2VyIH0gZnJvbSAnbWRrLWNvcmUvdXRpbHMvTG9nZ2VyJztcbmltcG9ydCB7IFJlcXVpcmVVdGlsIH0gZnJvbSAnbWRrLWNvcmUvdXRpbHMvUmVxdWlyZVV0aWwnO1xuXG5leHBvcnQgY2xhc3MgQXBwRXh0cmFjdEhlbHBlciB7XG5cbiAgcHVibGljIHN0YXRpYyBnZXRJbnN0YW5jZSgpOiBBcHBFeHRyYWN0SGVscGVyIHtcbiAgICByZXR1cm4gQXBwRXh0cmFjdEhlbHBlci5faW5zdGFuY2U7XG4gIH1cblxuICBwcml2YXRlIHN0YXRpYyBfaW5zdGFuY2U6IEFwcEV4dHJhY3RIZWxwZXIgPSBuZXcgQXBwRXh0cmFjdEhlbHBlcigpO1xuICBwcml2YXRlIHppcERlc3Q6IHN0cmluZztcbiAgcHJpdmF0ZSB6aXBTb3VyY2U6IHN0cmluZztcblxuICBwdWJsaWMgZXh0cmFjdChtc2c6IGFueSkge1xuICAgIGxldCBlcnJvcjtcbiAgICB0aGlzLnppcFNvdXJjZSA9IG1zZy5kYXRhLnppcFNvdXJjZTtcbiAgICB0aGlzLnppcERlc3QgPSBtc2cuZGF0YS56aXBEZXN0UGF0aDtcbiAgICBjb25zdCBidW5kbGVEZXN0OiBzdHJpbmcgPSBtc2cuZGF0YS5idW5kbGVEZXN0O1xuICAgIExvZ2dlci5pbnN0YW5jZS5jb3JlLmluZm8oJ1VuemlwIHN0YXJ0ZWQ6IGZyb20gJyArIHRoaXMuemlwU291cmNlICsgJyB0byAnICsgdGhpcy56aXBEZXN0KTtcbiAgICBaaXAudW56aXAodGhpcy56aXBTb3VyY2UsIHRoaXMuemlwRGVzdCk7XG5cbiAgICAgICAgLy8gTW92ZSB0aGUgYnVuZGxlIHRvIHNwZWNpZmllZCB6aXBEZXN0UGF0XG4gICAgbGV0IGJ1bmRsZVNvdXJjZVBhdGggPSBmcy5wYXRoLmpvaW4odGhpcy56aXBEZXN0LCAnYnVuZGxlLmpzJyk7XG4gICAgZXJyb3IgPSB0aGlzLl9tb3ZlQnVuZGxlRmlsZShidW5kbGVTb3VyY2VQYXRoLCBidW5kbGVEZXN0LCAoc0NvbnRlbnRzKSA9PiB7XG4gICAgICByZXR1cm4gUmVxdWlyZVV0aWwucmVwbGFjZU1ka1JlcXVpcmUoc0NvbnRlbnRzKTtcbiAgICB9KTtcblxuICAgIGlmICghZXJyb3IpIHtcbiAgICAgICAgdGhpcy5fbW92ZUJ1bmRsZUZpbGUoZnMucGF0aC5qb2luKHRoaXMuemlwRGVzdCwgJ2J1bmRsZS5qcy5tYXAnKSwgYnVuZGxlRGVzdCArICcubWFwJyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGVycm9yO1xuICB9XG5cbiAgcHVibGljIHJlbW92ZUZvbGRlcigpIHtcbiAgICAvLyBSZW1vdmUgZXh0cmFjdGVkIGZvbGRlclxuICAgIGxldCBleHRyYWN0ZWRaaXBGb2xkZXIgPSBmcy5Gb2xkZXIuZnJvbVBhdGgodGhpcy56aXBEZXN0KTtcbiAgICBleHRyYWN0ZWRaaXBGb2xkZXIucmVtb3ZlU3luYyhlID0+IHtcbiAgICAgIExvZ2dlci5pbnN0YW5jZS5jb3JlLmVycm9yKGBGYWlsZWQgdG8gcmVtb3ZlIGV4dHJhY3RlZCB6aXAgZm9sZGVyOiAke2V9YCk7XG4gICAgfSk7XG4gIH1cblxuICBwdWJsaWMgcmVtb3ZlRG93bmxvYWRlZFppcEZpbGUoKSB7XG4gICAgbGV0IHppcFNvdXJjZUZpbGUgPSBmcy5GaWxlLmZyb21QYXRoKHRoaXMuemlwU291cmNlKTtcbiAgICB6aXBTb3VyY2VGaWxlLnJlbW92ZVN5bmMoZSA9PiB7XG4gICAgICBMb2dnZXIuaW5zdGFuY2UuY29yZS5lcnJvcihgRmFpbGVkIHRvIHJlbW92ZSB0ZW1wIGRvd25sb2FkIHppcDogJHtlfWApO1xuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBfbW92ZUJ1bmRsZUZpbGUoYnVuZGxlU291cmNlUGF0aCwgYnVuZGxlRGVzdCwgY2I/KSB7XG4gICAgbGV0IGVycm9yO1xuICAgIGNvbnN0IGJ1bmRsZUV4aXN0cyA9IGZzLkZpbGUuZXhpc3RzKGJ1bmRsZVNvdXJjZVBhdGgpO1xuICAgIGxldCBidW5kbGVTb3VyY2VGaWxlO1xuICAgIGxldCBidW5kbGVTb3VyY2VEYXRhOiBzdHJpbmc7XG5cbiAgICBpZiAoYnVuZGxlRXhpc3RzKSB7XG4gICAgICAgIGJ1bmRsZVNvdXJjZUZpbGUgPSBmcy5GaWxlLmZyb21QYXRoKGJ1bmRsZVNvdXJjZVBhdGgpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGVycm9yID0gYnVuZGxlU291cmNlUGF0aCArICcgZG9lcyBub3QgZXhpc3QnO1xuICAgIH1cblxuICAgIGlmICghZXJyb3IpIHtcbiAgICAgICAgYnVuZGxlU291cmNlRGF0YSA9IGJ1bmRsZVNvdXJjZUZpbGUucmVhZFRleHRTeW5jKGUgPT4ge1xuICAgICAgICAgIGVycm9yID0gZTtcbiAgICAgICAgICBMb2dnZXIuaW5zdGFuY2UuY29yZS5lcnJvcihgQXBwIGRvd25sb2FkIGZpbGUgcmVhZCBmYWlsZWQ6ICR7ZXJyb3J9YCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGlmICghZXJyb3IpIHtcbiAgICAgICAgaWYgKGNiKSB7XG4gICAgICAgICAgICBidW5kbGVTb3VyY2VEYXRhID0gY2IoYnVuZGxlU291cmNlRGF0YSk7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgYnVuZGxlRGVzdGhGaWxlID0gZnMuRmlsZS5mcm9tUGF0aChidW5kbGVEZXN0KTtcbiAgICAgICAgYnVuZGxlRGVzdGhGaWxlLndyaXRlVGV4dFN5bmMoYnVuZGxlU291cmNlRGF0YSwgZSA9PiB7XG4gICAgICAgICAgZXJyb3IgPSBlO1xuICAgICAgICAgIExvZ2dlci5pbnN0YW5jZS5jb3JlLmVycm9yKGBBcHAgZG93bmxvYWQgZmlsZSB3cml0ZSBmYWlsZWQ6ICR7ZXJyb3J9YCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHJldHVybiBlcnJvcjtcbiAgfVxuXG59XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJtZGstY29yZS91dGlscy9Mb2dnZXJcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwibWRrLWNvcmUvdXRpbHMvUmVxdWlyZVV0aWxcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwidG5zLWNvcmUtbW9kdWxlcy9maWxlLXN5c3RlbVwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJ0bnMtY29yZS1tb2R1bGVzL2dsb2JhbHNcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiemlwLXBsdWdpblwiKTsiXSwic291cmNlUm9vdCI6IiJ9
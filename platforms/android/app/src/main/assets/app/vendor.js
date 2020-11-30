(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["vendor"],{

/***/ "../node_modules/@nativescript/webpack/helpers/hot.js":
/***/ (function(module, exports, __webpack_require__) {

const hmrPrefix = 'HMR:';
const log = {
    info: (message) => console.info(`${hmrPrefix} ${message}`),
    warn: (message) => console.warn(`${hmrPrefix} ${message}`),
    error: (message) => console.error(`${hmrPrefix} ${message}`),
};
const refresh = 'Application needs to be restarted in order to apply the changes.';
const hotOptions = {
    ignoreUnaccepted: false,
    ignoreDeclined: false,
    ignoreErrored: false,
    onUnaccepted(data) {
        const chain = [].concat(data.chain);
        const last = chain[chain.length - 1];

        if (last === 0) {
            chain.pop();
        }

        log.warn(`Ignored an update to unaccepted module: `);
        chain.forEach(mod => log.warn(`         ➭ ${mod}`));
    },
    onDeclined(data) {
        log.warn(`Ignored an update to declined module:`);
        data.chain.forEach(mod => log.warn(`         ➭ ${mod}`));
    },
    onErrored(data) {
        log.warn(
            `Ignored an error while updating module ${data.moduleId} <${data.type}>`
        );
        log.warn(data.error);
    },
};

let nextHash;
let currentHash;

function upToDate() {
    return nextHash.indexOf(__webpack_require__.h()) >= 0;
}

function result(modules, appliedModules) {
    const unaccepted = modules.filter(
        (moduleId) => appliedModules && appliedModules.indexOf(moduleId) < 0
    );

    if (unaccepted.length > 0) {
        log.warn('The following modules could not be updated:');

        for (const moduleId of unaccepted) {
            log.warn(`          ⦻ ${moduleId}`);
        }
    }

    if (!(appliedModules || []).length) {
        log.info('No Modules Updated.');
    } else {
        log.info('The following modules were updated:');

        for (const moduleId of appliedModules) {
            log.info(`         ↻ ${moduleId}`);
        }

        const numberIds = appliedModules.every(
            (moduleId) => typeof moduleId === 'number'
        );
        if (numberIds) {
            log.info(
                'Please consider using the NamedModulesPlugin for module names.'
            );
        }
    }
}

function check(options) {
    return module.hot
        .check()
        .then((modules) => {
            if (!modules) {
                log.warn(
                    `Cannot find update. ${refresh}`
                );
                return null;
            }

            return module.hot
                .apply(hotOptions)
                .then((appliedModules) => {
                    let nextCheck;
                    if (!upToDate()) {
                        nextCheck = check(options);
                    }

                    result(modules, appliedModules);

                    if (upToDate()) {
                        // Do not modify message - CLI depends on this exact content to determine hmr operation status.
                        log.info(`Successfully applied update with hmr hash ${currentHash}. App is up to date.`);
                    }

                    return nextCheck || null;
                })
                .catch((err) => {
                    const status = module.hot.status();
                    if (['abort', 'fail'].indexOf(status) >= 0) {
                        // Do not modify message - CLI depends on this exact content to determine hmr operation status.
                        log.error(`Cannot apply update with hmr hash ${currentHash}.`);
                        log.error(err.message || err.stack);
                    } else {
                        log.error(`Update failed: ${err.message || err.stack}`);
                    }
                });
        })
        .catch((err) => {
            const status = module.hot.status();
            if (['abort', 'fail'].indexOf(status) >= 0) {
                log.error(`Cannot check for update. ${refresh}`);
                log.error(err.message || err.stack);
            } else {
                log.error(`Update check failed: ${err.message || err.stack}`);
            }
        });
}

if (true) {
    log.info('Hot Module Replacement Enabled. Waiting for signal.');
} else {}

function update(latestHash, options) {
    nextHash = latestHash;
    if (!upToDate()) {
        const status = module.hot.status();

        if (status === 'idle') {
            //Do not modify message - CLI depends on this exact content to determine hmr operation status.
            log.info(`Checking for updates to the bundle with hmr hash ${currentHash}.`);
            return check(options);
        } else if (['abort', 'fail'].indexOf(status) >= 0) {
            log.warn(
                `Cannot apply update. A previous update ${status}ed. ${refresh}`
            );
        }
    }
};

function getNextHash(hash, getFileContent) {
    const file = getFileContent(`${hash}.hot-update.json`);
    if (!file) {
        return Promise.resolve(hash);
    }

    return file.readText().then(hotUpdateContent => {
        if (hotUpdateContent) {
            const manifest = JSON.parse(hotUpdateContent);
            const newHash = manifest.h;
            return getNextHash(newHash, getFileContent);
        } else {
            return Promise.resolve(hash);
        }
    }).catch(error => Promise.reject(error));
}

module.exports = function checkState(initialHash, getFileContent) {
    currentHash = initialHash;
    return getNextHash(initialHash, getFileContent).then(nextHash => {
        if (nextHash != initialHash) {
            return update(nextHash, {});
        }
    })
}


/***/ }),

/***/ "../node_modules/@nativescript/webpack/helpers/load-application-css-regular.js":
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {const loadCss = __webpack_require__("../node_modules/@nativescript/webpack/helpers/load-application-css.js");

module.exports = function() {
    loadCss(function() {
        const appCssContext = __webpack_require__("./ sync ^\\.\\/app\\.(css|scss|less|sass)$");
        global.registerWebpackModules(appCssContext);
    });
}

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("../node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "../node_modules/@nativescript/webpack/helpers/load-application-css.js":
/***/ (function(module, exports, __webpack_require__) {

module.exports = function (loadModuleFn) {
    const nsCore = __webpack_require__("@nativescript/core");
    __webpack_require__("@nativescript/core/ui/styling/style-scope");

    loadModuleFn();

    nsCore.Application.loadAppCss();
}


/***/ }),

/***/ "../node_modules/@nativescript/webpack/hmr/hmr-update.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.hmrUpdate = void 0;
const hot = __webpack_require__("../node_modules/@nativescript/webpack/helpers/hot.js");
function hmrUpdate() {
    const coreFile = __webpack_require__("@nativescript/core");
    const currentAppFolder = coreFile.knownFolders.currentApp();
    const latestHash = __webpack_require__['h']();
    return hot(latestHash, (filename) => {
        const fullFilePath = coreFile.path.join(currentAppFolder.path, filename);
        return coreFile.File.exists(fullFilePath) ? currentAppFolder.getFile(filename) : null;
    });
}
exports.hmrUpdate = hmrUpdate;
//# sourceMappingURL=hmr-update.js.map

/***/ }),

/***/ "../node_modules/@nativescript/webpack/hmr/index.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var hmr_update_1 = __webpack_require__("../node_modules/@nativescript/webpack/hmr/hmr-update.js");
Object.defineProperty(exports, "hmrUpdate", { enumerable: true, get: function () { return hmr_update_1.hmrUpdate; } });
//# sourceMappingURL=index.js.map

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

/***/ "./MDKAndroidActivity.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {
Object.defineProperty(exports, "__esModule", { value: true });
var frame_1 = __webpack_require__("tns-core-modules/ui/frame");
var mdk_sap_1 = __webpack_require__("mdk-sap");
var appModule = __webpack_require__("tns-core-modules/application");
var frameModule = __webpack_require__("tns-core-modules/ui/frame");
var mdk_sap_2 = __webpack_require__("mdk-sap");
var Activity = (function (_super) {
    __extends(Activity, _super);
    function Activity() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._skipExit = false;
        return _this;
    }
    Object.defineProperty(Activity.prototype, "isNativeScriptActivity", {
        get: function () {
            return true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Activity.prototype, "skipExit", {
        get: function () {
            return this._skipExit;
        },
        set: function (skip) {
            this._skipExit = skip;
        },
        enumerable: true,
        configurable: true
    });
    Activity.prototype.onActivityResult = function (requestCode, resultCode, data) {
        if (this._callbacks) {
            this._callbacks.onActivityResult(this, requestCode, resultCode, data, _super.prototype.onActivityResult);
        }
        mdk_sap_1.ActivityHandler.onActivityResult(requestCode, resultCode, data, this);
    };
    Activity.prototype.onBackPressed = function () {
        this._callbacks.onBackPressed(this, _super.prototype.onBackPressed);
    };
    Activity.prototype.onCreate = function (savedInstanceState) {
        if (!this.isTaskRoot() && !this.intentDataStringExists()) {
            _super.prototype.onCreate.call(this, savedInstanceState);
            if (frameModule.Frame.topmost()) {
                this.finish();
            }
            else {
                this.finishAffinity();
            }
            return;
        }
        appModule.android.init(this.getApplication());
        if (!this._callbacks) {
            frame_1.setActivityCallbacks(this);
        }
        this._callbacks.onCreate(this, savedInstanceState, this.getIntent(), _super.prototype.onCreate);
        mdk_sap_1.ActivityHandler.onCreate(savedInstanceState, this);
        mdk_sap_2.PushNotification.onNewIntent(this.getIntent());
    };
    Activity.prototype.onNewIntent = function (intent) {
        if (this._callbacks) {
            this._callbacks.onNewIntent(this, intent, _super.prototype.setIntent, _super.prototype.onNewIntent);
        }
        else {
            _super.prototype.onNewIntent.call(this, intent);
        }
        mdk_sap_2.PushNotification.onNewIntent(intent);
    };
    Activity.prototype.onDestroy = function () {
        if (this._callbacks) {
            this._callbacks.onDestroy(this, _super.prototype.onDestroy);
        }
        else {
            _super.prototype.onDestroy.call(this);
        }
    };
    Activity.prototype.onRequestPermissionsResult = function (requestCode, permissions, grantResults) {
        if (this._callbacks) {
            this._callbacks.onRequestPermissionsResult(this, requestCode, permissions, grantResults, undefined);
        }
        mdk_sap_1.ActivityHandler.onRequestPermissionsResult(requestCode, permissions, grantResults, this);
    };
    Activity.prototype.onSaveInstanceState = function (outState) {
        if (this._callbacks) {
            this._callbacks.onSaveInstanceState(this, outState, _super.prototype.onSaveInstanceState);
        }
        else {
            _super.prototype.onSaveInstanceState.call(this, outState);
        }
    };
    Activity.prototype.onStart = function () {
        if (this._callbacks) {
            this._callbacks.onStart(this, _super.prototype.onStart);
        }
        else {
            _super.prototype.onStart.call(this);
        }
    };
    Activity.prototype.onStop = function () {
        if (this._callbacks) {
            this._callbacks.onStop(this, _super.prototype.onStop);
        }
        else {
            _super.prototype.onStop.call(this);
        }
    };
    Activity.prototype.intentDataStringExists = function () {
        return this.getIntent() && this.getIntent().getData() && this.getIntent().getData().toString() !== '';
    };
    Activity = __decorate([
        JavaProxy('sap.mdkclient.MDKAndroidActivity')
    ], Activity);
    return Activity;
}(androidx.fragment.app.FragmentActivity));
; 
if ( true && global._isModuleLoadedForUI && global._isModuleLoadedForUI("./MDKAndroidActivity.ts") ) {
    
    module.hot.accept();
    module.hot.dispose(() => {
        global.hmrRefresh({ type: "script", path: "./MDKAndroidActivity.ts" });
    });
} 
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("../node_modules/webpack/buildin/global.js")))

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi4vbm9kZV9tb2R1bGVzL0BuYXRpdmVzY3JpcHQvd2VicGFjay9oZWxwZXJzL2hvdC5qcyIsIndlYnBhY2s6Ly8vLi4vbm9kZV9tb2R1bGVzL0BuYXRpdmVzY3JpcHQvd2VicGFjay9oZWxwZXJzL2xvYWQtYXBwbGljYXRpb24tY3NzLXJlZ3VsYXIuanMiLCJ3ZWJwYWNrOi8vLy4uL25vZGVfbW9kdWxlcy9AbmF0aXZlc2NyaXB0L3dlYnBhY2svaGVscGVycy9sb2FkLWFwcGxpY2F0aW9uLWNzcy5qcyIsIndlYnBhY2s6Ly8vLi4vbm9kZV9tb2R1bGVzL0BuYXRpdmVzY3JpcHQvd2VicGFjay9obXIvaG1yLXVwZGF0ZS5qcyIsIndlYnBhY2s6Ly8vLi4vbm9kZV9tb2R1bGVzL0BuYXRpdmVzY3JpcHQvd2VicGFjay9obXIvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4uL25vZGVfbW9kdWxlcy93ZWJwYWNrL2J1aWxkaW4vZ2xvYmFsLmpzIiwid2VicGFjazovLy8uL01ES0FuZHJvaWRBY3Rpdml0eS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBO0FBQ0E7QUFDQSx1Q0FBdUMsVUFBVSxHQUFHLFFBQVE7QUFDNUQsdUNBQXVDLFVBQVUsR0FBRyxRQUFRO0FBQzVELHlDQUF5QyxVQUFVLEdBQUcsUUFBUTtBQUM5RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0Esb0RBQW9ELElBQUk7QUFDeEQsS0FBSztBQUNMO0FBQ0E7QUFDQSx5REFBeUQsSUFBSTtBQUM3RCxLQUFLO0FBQ0w7QUFDQTtBQUNBLHNEQUFzRCxjQUFjLElBQUksVUFBVTtBQUNsRjtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSw0QkFBNEIsdUJBQWdCO0FBQzVDOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxvQ0FBb0Ms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LENBQUM7SUFFTSwwQkFBTyxHQUFkO1FBQ0UsSUFBSSxJQUFJLENBQUMsVUFBVSxFQUFFO1lBQ25CLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxpQkFBTSxPQUFPLENBQUMsQ0FBQztTQUM5QzthQUFNO1lBQ0wsaUJBQU0sT0FBTyxXQUFFLENBQUM7U0FDakI7SUFDSCxDQUFDO0lBRU0seUJBQU0sR0FBYjtRQUNFLElBQUksSUFBSSxDQUFDLFVBQVUsRUFBRTtZQUNuQixJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsaUJBQU0sTUFBTSxDQUFDLENBQUM7U0FDNUM7YUFBTTtZQUNMLGlCQUFNLE1BQU0sV0FBRSxDQUFDO1NBQ2hCO0lBQ0gsQ0FBQztJQUVPLHlDQUFzQixHQUE5QjtRQUNFLE9BQU8sSUFBSSxDQUFDLFNBQVMsRUFBRSxJQUFJLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQyxPQUFPLEVBQUUsSUFBSSxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUMsT0FBTyxFQUFFLENBQUMsUUFBUSxFQUFFLEtBQUssRUFBRSxDQUFDO0lBQ3hHLENBQUM7SUEzR0csUUFBUTtRQURiLFNBQVMsQ0FBQyxrQ0FBa0MsQ0FBQztPQUN4QyxRQUFRLENBNEdiO0lBQUQsZUFBQztDQUFBLENBNUdzQixRQUFRLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsR0E0RzVEIiwiZmlsZSI6InZlbmRvci5qcyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IGhtclByZWZpeCA9ICdITVI6JztcbmNvbnN0IGxvZyA9IHtcbiAgICBpbmZvOiAobWVzc2FnZSkgPT4gY29uc29sZS5pbmZvKGAke2htclByZWZpeH0gJHttZXNzYWdlfWApLFxuICAgIHdhcm46IChtZXNzYWdlKSA9PiBjb25zb2xlLndhcm4oYCR7aG1yUHJlZml4fSAke21lc3NhZ2V9YCksXG4gICAgZXJyb3I6IChtZXNzYWdlKSA9PiBjb25zb2xlLmVycm9yKGAke2htclByZWZpeH0gJHttZXNzYWdlfWApLFxufTtcbmNvbnN0IHJlZnJlc2ggPSAnQXBwbGljYXRpb24gbmVlZHMgdG8gYmUgcmVzdGFydGVkIGluIG9yZGVyIHRvIGFwcGx5IHRoZSBjaGFuZ2VzLic7XG5jb25zdCBob3RPcHRpb25zID0ge1xuICAgIGlnbm9yZVVuYWNjZXB0ZWQ6IGZhbHNlLFxuICAgIGlnbm9yZURlY2xpbmVkOiBmYWxzZSxcbiAgICBpZ25vcmVFcnJvcmVkOiBmYWxzZSxcbiAgICBvblVuYWNjZXB0ZWQoZGF0YSkge1xuICAgICAgICBjb25zdCBjaGFpbiA9IFtdLmNvbmNhdChkYXRhLmNoYWluKTtcbiAgICAgICAgY29uc3QgbGFzdCA9IGNoYWluW2NoYWluLmxlbmd0aCAtIDFdO1xuXG4gICAgICAgIGlmIChsYXN0ID09PSAwKSB7XG4gICAgICAgICAgICBjaGFpbi5wb3AoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxvZy53YXJuKGBJZ25vcmVkIGFuIHVwZGF0ZSB0byB1bmFjY2VwdGVkIG1vZHVsZTogYCk7XG4gICAgICAgIGNoYWluLmZvckVhY2gobW9kID0+IGxvZy53YXJuKGAgICAgICAgICDinq0gJHttb2R9YCkpO1xuICAgIH0sXG4gICAgb25EZWNsaW5lZChkYXRhKSB7XG4gICAgICAgIGxvZy53YXJuKGBJZ25vcmVkIGFuIHVwZGF0ZSB0byBkZWNsaW5lZCBtb2R1bGU6YCk7XG4gICAgICAgIGRhdGEuY2hhaW4uZm9yRWFjaChtb2QgPT4gbG9nLndhcm4oYCAgICAgICAgIOKerSAke21vZH1gKSk7XG4gICAgfSxcbiAgICBvbkVycm9yZWQoZGF0YSkge1xuICAgICAgICBsb2cud2FybihcbiAgICAgICAgICAgIGBJZ25vcmVkIGFuIGVycm9yIHdoaWxlIHVwZGF0aW5nIG1vZHVsZSAke2RhdGEubW9kdWxlSWR9IDwke2RhdGEudHlwZX0+YFxuICAgICAgICApO1xuICAgICAgICBsb2cud2FybihkYXRhLmVycm9yKTtcbiAgICB9LFxufTtcblxubGV0IG5leHRIYXNoO1xubGV0IGN1cnJlbnRIYXNoO1xuXG5mdW5jdGlvbiB1cFRvRGF0ZSgpIHtcbiAgICByZXR1cm4gbmV4dEhhc2guaW5kZXhPZihfX3dlYnBhY2tfaGFzaF9fKSA+PSAwO1xufVxuXG5mdW5jdGlvbiByZXN1bHQobW9kdWxlcywgYXBwbGllZE1vZHVsZXMpIHtcbiAgICBjb25zdCB1bmFjY2VwdGVkID0gbW9kdWxlcy5maWx0ZXIoXG4gICAgICAgIChtb2R1bGVJZCkgPT4gYXBwbGllZE1vZHVsZXMgJiYgYXBwbGllZE1vZHVsZXMuaW5kZXhPZihtb2R1bGVJZCkgPCAwXG4gICAgKTtcblxuICAgIGlmICh1bmFjY2VwdGVkLmxlbmd0aCA+IDApIHtcbiAgICAgICAgbG9nLndhcm4oJ1RoZSBmb2xsb3dpbmcgbW9kdWxlcyBjb3VsZCBub3QgYmUgdXBkYXRlZDonKTtcblxuICAgICAgICBmb3IgKGNvbnN0IG1vZHVsZUlkIG9mIHVuYWNjZXB0ZWQpIHtcbiAgICAgICAgICAgIGxvZy53YXJuKGAgICAgICAgICAg4qa7ICR7bW9kdWxlSWR9YCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoIShhcHBsaWVkTW9kdWxlcyB8fCBbXSkubGVuZ3RoKSB7XG4gICAgICAgIGxvZy5pbmZvKCdObyBNb2R1bGVzIFVwZGF0ZWQuJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgbG9nLmluZm8oJ1RoZSBmb2xsb3dpbmcgbW9kdWxlcyB3ZXJlIHVwZGF0ZWQ6Jyk7XG5cbiAgICAgICAgZm9yIChjb25zdCBtb2R1bGVJZCBvZiBhcHBsaWVkTW9kdWxlcykge1xuICAgICAgICAgICAgbG9nLmluZm8oYCAgICAgICAgIOKGuyAke21vZHVsZUlkfWApO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgbnVtYmVySWRzID0gYXBwbGllZE1vZHVsZXMuZXZlcnkoXG4gICAgICAgICAgICAobW9kdWxlSWQpID0+IHR5cGVvZiBtb2R1bGVJZCA9PT0gJ251bWJlcidcbiAgICAgICAgKTtcbiAgICAgICAgaWYgKG51bWJlcklkcykge1xuICAgICAgICAgICAgbG9nLmluZm8oXG4gICAgICAgICAgICAgICAgJ1BsZWFzZSBjb25zaWRlciB1c2luZyB0aGUgTmFtZWRNb2R1bGVzUGx1Z2luIGZvciBtb2R1bGUgbmFtZXMuJ1xuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuZnVuY3Rpb24gY2hlY2sob3B0aW9ucykge1xuICAgIHJldHVybiBtb2R1bGUuaG90XG4gICAgICAgIC5jaGVjaygpXG4gICAgICAgIC50aGVuKChtb2R1bGVzKSA9PiB7XG4gICAgICAgICAgICBpZiAoIW1vZHVsZXMpIHtcbiAgICAgICAgICAgICAgICBsb2cud2FybihcbiAgICAgICAgICAgICAgICAgICAgYENhbm5vdCBmaW5kIHVwZGF0ZS4gJHtyZWZyZXNofWBcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gbW9kdWxlLmhvdFxuICAgICAgICAgICAgICAgIC5hcHBseShob3RPcHRpb25zKVxuICAgICAgICAgICAgICAgIC50aGVuKChhcHBsaWVkTW9kdWxlcykgPT4ge1xuICAgICAgICAgICAgICAgICAgICBsZXQgbmV4dENoZWNrO1xuICAgICAgICAgICAgICAgICAgICBpZiAoIXVwVG9EYXRlKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5leHRDaGVjayA9IGNoZWNrKG9wdGlvbnMpO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0KG1vZHVsZXMsIGFwcGxpZWRNb2R1bGVzKTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAodXBUb0RhdGUoKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gRG8gbm90IG1vZGlmeSBtZXNzYWdlIC0gQ0xJIGRlcGVuZHMgb24gdGhpcyBleGFjdCBjb250ZW50IHRvIGRldGVybWluZSBobXIgb3BlcmF0aW9uIHN0YXR1cy5cbiAgICAgICAgICAgICAgICAgICAgICAgIGxvZy5pbmZvKGBTdWNjZXNzZnVsbHkgYXBwbGllZCB1cGRhdGUgd2l0aCBobXIgaGFzaCAke2N1cnJlbnRIYXNofS4gQXBwIGlzIHVwIHRvIGRhdGUuYCk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbmV4dENoZWNrIHx8IG51bGw7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAuY2F0Y2goKGVycikgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBzdGF0dXMgPSBtb2R1bGUuaG90LnN0YXR1cygpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoWydhYm9ydCcsICdmYWlsJ10uaW5kZXhPZihzdGF0dXMpID49IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIERvIG5vdCBtb2RpZnkgbWVzc2FnZSAtIENMSSBkZXBlbmRzIG9uIHRoaXMgZXhhY3QgY29udGVudCB0byBkZXRlcm1pbmUgaG1yIG9wZXJhdGlvbiBzdGF0dXMuXG4gICAgICAgICAgICAgICAgICAgICAgICBsb2cuZXJyb3IoYENhbm5vdCBhcHBseSB1cGRhdGUgd2l0aCBobXIgaGFzaCAke2N1cnJlbnRIYXNofS5gKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxvZy5lcnJvcihlcnIubWVzc2FnZSB8fCBlcnIuc3RhY2spO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgbG9nLmVycm9yKGBVcGRhdGUgZmFpbGVkOiAke2Vyci5tZXNzYWdlIHx8IGVyci5zdGFja31gKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goKGVycikgPT4ge1xuICAgICAgICAgICAgY29uc3Qgc3RhdHVzID0gbW9kdWxlLmhvdC5zdGF0dXMoKTtcbiAgICAgICAgICAgIGlmIChbJ2Fib3J0JywgJ2ZhaWwnXS5pbmRleE9mKHN0YXR1cykgPj0gMCkge1xuICAgICAgICAgICAgICAgIGxvZy5lcnJvcihgQ2Fubm90IGNoZWNrIGZvciB1cGRhdGUuICR7cmVmcmVzaH1gKTtcbiAgICAgICAgICAgICAgICBsb2cuZXJyb3IoZXJyLm1lc3NhZ2UgfHwgZXJyLnN0YWNrKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgbG9nLmVycm9yKGBVcGRhdGUgY2hlY2sgZmFpbGVkOiAke2Vyci5tZXNzYWdlIHx8IGVyci5zdGFja31gKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG59XG5cbmlmIChtb2R1bGUuaG90KSB7XG4gICAgbG9nLmluZm8oJ0hvdCBNb2R1bGUgUmVwbGFjZW1lbnQgRW5hYmxlZC4gV2FpdGluZyBmb3Igc2lnbmFsLicpO1xufSBlbHNlIHtcbiAgICBsb2cuZXJyb3IoJ0hvdCBNb2R1bGUgUmVwbGFjZW1lbnQgaXMgZGlzYWJsZWQuJyk7XG59XG5cbmZ1bmN0aW9uIHVwZGF0ZShsYXRlc3RIYXNoLCBvcHRpb25zKSB7XG4gICAgbmV4dEhhc2ggPSBsYXRlc3RIYXNoO1xuICAgIGlmICghdXBUb0RhdGUoKSkge1xuICAgICAgICBjb25zdCBzdGF0dXMgPSBtb2R1bGUuaG90LnN0YXR1cygpO1xuXG4gICAgICAgIGlmIChzdGF0dXMgPT09ICdpZGxlJykge1xuICAgICAgICAgICAgLy9EbyBub3QgbW9kaWZ5IG1lc3NhZ2UgLSBDTEkgZGVwZW5kcyBvbiB0aGlzIGV4YWN0IGNvbnRlbnQgdG8gZGV0ZXJtaW5lIGhtciBvcGVyYXRpb24gc3RhdHVzLlxuICAgICAgICAgICAgbG9nLmluZm8oYENoZWNraW5nIGZvciB1cGRhdGVzIHRvIHRoZSBidW5kbGUgd2l0aCBobXIgaGFzaCAke2N1cnJlbnRIYXNofS5gKTtcbiAgICAgICAgICAgIHJldHVybiBjaGVjayhvcHRpb25zKTtcbiAgICAgICAgfSBlbHNlIGlmIChbJ2Fib3J0JywgJ2ZhaWwnXS5pbmRleE9mKHN0YXR1cykgPj0gMCkge1xuICAgICAgICAgICAgbG9nLndhcm4oXG4gICAgICAgICAgICAgICAgYENhbm5vdCBhcHBseSB1cGRhdGUuIEEgcHJldmlvdXMgdXBkYXRlICR7c3RhdHVzfWVkLiAke3JlZnJlc2h9YFxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgIH1cbn07XG5cbmZ1bmN0aW9uIGdldE5leHRIYXNoKGhhc2gsIGdldEZpbGVDb250ZW50KSB7XG4gICAgY29uc3QgZmlsZSA9IGdldEZpbGVDb250ZW50KGAke2hhc2h9LmhvdC11cGRhdGUuanNvbmApO1xuICAgIGlmICghZmlsZSkge1xuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKGhhc2gpO1xuICAgIH1cblxuICAgIHJldHVybiBmaWxlLnJlYWRUZXh0KCkudGhlbihob3RVcGRhdGVDb250ZW50ID0+IHtcbiAgICAgICAgaWYgKGhvdFVwZGF0ZUNvbnRlbnQpIHtcbiAgICAgICAgICAgIGNvbnN0IG1hbmlmZXN0ID0gSlNPTi5wYXJzZShob3RVcGRhdGVDb250ZW50KTtcbiAgICAgICAgICAgIGNvbnN0IG5ld0hhc2ggPSBtYW5pZmVzdC5oO1xuICAgICAgICAgICAgcmV0dXJuIGdldE5leHRIYXNoKG5ld0hhc2gsIGdldEZpbGVDb250ZW50KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoaGFzaCk7XG4gICAgICAgIH1cbiAgICB9KS5jYXRjaChlcnJvciA9PiBQcm9taXNlLnJlamVjdChlcnJvcikpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGNoZWNrU3RhdGUoaW5pdGlhbEhhc2gsIGdldEZpbGVDb250ZW50KSB7XG4gICAgY3VycmVudEhhc2ggPSBpbml0aWFsSGFzaDtcbiAgICByZXR1cm4gZ2V0TmV4dEhhc2goaW5pdGlhbEhhc2gsIGdldEZpbGVDb250ZW50KS50aGVuKG5leHRIYXNoID0+IHtcbiAgICAgICAgaWYgKG5leHRIYXNoICE9IGluaXRpYWxIYXNoKSB7XG4gICAgICAgICAgICByZXR1cm4gdXBkYXRlKG5leHRIYXNoLCB7fSk7XG4gICAgICAgIH1cbiAgICB9KVxufVxuIiwiY29uc3QgbG9hZENzcyA9IHJlcXVpcmUoXCIuL2xvYWQtYXBwbGljYXRpb24tY3NzXCIpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKCkge1xuICAgIGxvYWRDc3MoZnVuY3Rpb24oKSB7XG4gICAgICAgIGNvbnN0IGFwcENzc0NvbnRleHQgPSByZXF1aXJlLmNvbnRleHQoXCJ+L1wiLCBmYWxzZSwgL15cXC5cXC9hcHBcXC4oY3NzfHNjc3N8bGVzc3xzYXNzKSQvKTtcbiAgICAgICAgZ2xvYmFsLnJlZ2lzdGVyV2VicGFja01vZHVsZXMoYXBwQ3NzQ29udGV4dCk7XG4gICAgfSk7XG59XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChsb2FkTW9kdWxlRm4pIHtcbiAgICBjb25zdCBuc0NvcmUgPSByZXF1aXJlKFwiQG5hdGl2ZXNjcmlwdC9jb3JlXCIpO1xuICAgIHJlcXVpcmUoXCJAbmF0aXZlc2NyaXB0L2NvcmUvdWkvc3R5bGluZy9zdHlsZS1zY29wZVwiKTtcblxuICAgIGxvYWRNb2R1bGVGbigpO1xuXG4gICAgbnNDb3JlLkFwcGxpY2F0aW9uLmxvYWRBcHBDc3MoKTtcbn1cbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5obXJVcGRhdGUgPSB2b2lkIDA7XG5jb25zdCBob3QgPSByZXF1aXJlKFwiLi4vaGVscGVycy9ob3RcIik7XG5mdW5jdGlvbiBobXJVcGRhdGUoKSB7XG4gICAgY29uc3QgY29yZUZpbGUgPSByZXF1aXJlKCdAbmF0aXZlc2NyaXB0L2NvcmUnKTtcbiAgICBjb25zdCBjdXJyZW50QXBwRm9sZGVyID0gY29yZUZpbGUua25vd25Gb2xkZXJzLmN1cnJlbnRBcHAoKTtcbiAgICBjb25zdCBsYXRlc3RIYXNoID0gX193ZWJwYWNrX3JlcXVpcmVfX1snaCddKCk7XG4gICAgcmV0dXJuIGhvdChsYXRlc3RIYXNoLCAoZmlsZW5hbWUpID0+IHtcbiAgICAgICAgY29uc3QgZnVsbEZpbGVQYXRoID0gY29yZUZpbGUucGF0aC5qb2luKGN1cnJlbnRBcHBGb2xkZXIucGF0aCwgZmlsZW5hbWUpO1xuICAgICAgICByZXR1cm4gY29yZUZpbGUuRmlsZS5leGlzdHMoZnVsbEZpbGVQYXRoKSA/IGN1cnJlbnRBcHBGb2xkZXIuZ2V0RmlsZShmaWxlbmFtZSkgOiBudWxsO1xuICAgIH0pO1xufVxuZXhwb3J0cy5obXJVcGRhdGUgPSBobXJVcGRhdGU7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1obXItdXBkYXRlLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIGhtcl91cGRhdGVfMSA9IHJlcXVpcmUoXCIuL2htci11cGRhdGVcIik7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJobXJVcGRhdGVcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIGhtcl91cGRhdGVfMS5obXJVcGRhdGU7IH0gfSk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pbmRleC5qcy5tYXAiLCJ2YXIgZztcblxuLy8gVGhpcyB3b3JrcyBpbiBub24tc3RyaWN0IG1vZGVcbmcgPSAoZnVuY3Rpb24oKSB7XG5cdHJldHVybiB0aGlzO1xufSkoKTtcblxudHJ5IHtcblx0Ly8gVGhpcyB3b3JrcyBpZiBldmFsIGlzIGFsbG93ZWQgKHNlZSBDU1ApXG5cdGcgPSBnIHx8IG5ldyBGdW5jdGlvbihcInJldHVybiB0aGlzXCIpKCk7XG59IGNhdGNoIChlKSB7XG5cdC8vIFRoaXMgd29ya3MgaWYgdGhlIHdpbmRvdyByZWZlcmVuY2UgaXMgYXZhaWxhYmxlXG5cdGlmICh0eXBlb2Ygd2luZG93ID09PSBcIm9iamVjdFwiKSBnID0gd2luZG93O1xufVxuXG4vLyBnIGNhbiBzdGlsbCBiZSB1bmRlZmluZWQsIGJ1dCBub3RoaW5nIHRvIGRvIGFib3V0IGl0Li4uXG4vLyBXZSByZXR1cm4gdW5kZWZpbmVkLCBpbnN0ZWFkIG9mIG5vdGhpbmcgaGVyZSwgc28gaXQnc1xuLy8gZWFzaWVyIHRvIGhhbmRsZSB0aGlzIGNhc2UuIGlmKCFnbG9iYWwpIHsgLi4ufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGc7XG4iLCJpbXBvcnQgeyBzZXRBY3Rpdml0eUNhbGxiYWNrcywgQW5kcm9pZEFjdGl2aXR5Q2FsbGJhY2tzIH0gZnJvbSAndG5zLWNvcmUtbW9kdWxlcy91aS9mcmFtZSc7XG5pbXBvcnQgeyBBY3Rpdml0eUhhbmRsZXIgfSBmcm9tICdtZGstc2FwJztcbmltcG9ydCAqIGFzIGFwcE1vZHVsZSBmcm9tICd0bnMtY29yZS1tb2R1bGVzL2FwcGxpY2F0aW9uJztcbmltcG9ydCAqIGFzIGZyYW1lTW9kdWxlIGZyb20gJ3Rucy1jb3JlLW1vZHVsZXMvdWkvZnJhbWUnO1xuaW1wb3J0IHsgUHVzaE5vdGlmaWNhdGlvbiB9IGZyb20gJ21kay1zYXAnO1xuXG5kZWNsYXJlIHZhciBjb206IGFueTtcblxuQEphdmFQcm94eSgnc2FwLm1ka2NsaWVudC5NREtBbmRyb2lkQWN0aXZpdHknKVxuY2xhc3MgQWN0aXZpdHkgZXh0ZW5kcyBhbmRyb2lkeC5mcmFnbWVudC5hcHAuRnJhZ21lbnRBY3Rpdml0eSB7XG4gIHByaXZhdGUgX2NhbGxiYWNrczogQW5kcm9pZEFjdGl2aXR5Q2FsbGJhY2tzO1xuICBwcml2YXRlIF9za2lwRXhpdDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIGdldCBpc05hdGl2ZVNjcmlwdEFjdGl2aXR5KCkge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG4gIFxuICBnZXQgc2tpcEV4aXQoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX3NraXBFeGl0O1xuICB9XG5cbiAgc2V0IHNraXBFeGl0KHNraXA6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9za2lwRXhpdCA9IHNraXA7XG4gIH1cblxuICBwdWJsaWMgb25BY3Rpdml0eVJlc3VsdChyZXF1ZXN0Q29kZTogbnVtYmVyLCByZXN1bHRDb2RlOiBudW1iZXIsIGRhdGE6IGFuZHJvaWQuY29udGVudC5JbnRlbnQpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5fY2FsbGJhY2tzKSB7XG4gICAgICB0aGlzLl9jYWxsYmFja3Mub25BY3Rpdml0eVJlc3VsdCh0aGlzLCByZXF1ZXN0Q29kZSwgcmVzdWx0Q29kZSwgZGF0YSwgc3VwZXIub25BY3Rpdml0eVJlc3VsdCk7XG4gICAgfVxuICAgIEFjdGl2aXR5SGFuZGxlci5vbkFjdGl2aXR5UmVzdWx0KHJlcXVlc3RDb2RlLCByZXN1bHRDb2RlLCBkYXRhLCB0aGlzKTtcbiAgfVxuXG4gIHB1YmxpYyBvbkJhY2tQcmVzc2VkKCk6IHZvaWQge1xuICAgIHRoaXMuX2NhbGxiYWNrcy5vbkJhY2tQcmVzc2VkKHRoaXMsIHN1cGVyLm9uQmFja1ByZXNzZWQpO1xuICB9XG5cbiAgcHVibGljIG9uQ3JlYXRlKHNhdmVkSW5zdGFuY2VTdGF0ZTogYW5kcm9pZC5vcy5CdW5kbGUpOiB2b2lkIHtcbiAgICAvLyBUbyBoYW5kbGUgZm9yIE1ESyBhcHAgbGF1bmNoZWQgZnJvbSBleHRlcm5hbCAodGVybWluYWwgb3IgYW5kcm9pZCBpbnN0YWxsZXIpXG4gICAgLy8gRG9lcyBub3QgYXBwbHkgZm9yIFFSQ29kZSBPbmJvYXJkaW5nXG4gICAgLy8gVE8tRE86IHRvIGhhbmRsZSBkZWVwbGluaywgdXNlIHRoaXMuZ2V0SW50ZW50KCkuZ2V0RGF0YSgpLlxuICAgIGlmICghdGhpcy5pc1Rhc2tSb290KCkgJiYgIXRoaXMuaW50ZW50RGF0YVN0cmluZ0V4aXN0cygpKSB7XG4gICAgICBzdXBlci5vbkNyZWF0ZShzYXZlZEluc3RhbmNlU3RhdGUpO1xuXG4gICAgICBpZiAoZnJhbWVNb2R1bGUuRnJhbWUudG9wbW9zdCgpKSB7XG4gICAgICAgIHRoaXMuZmluaXNoKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmZpbmlzaEFmZmluaXR5KCk7XG4gICAgICB9XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgYXBwTW9kdWxlLmFuZHJvaWQuaW5pdCh0aGlzLmdldEFwcGxpY2F0aW9uKCkpO1xuICAgIGlmICghdGhpcy5fY2FsbGJhY2tzKSB7XG4gICAgICBzZXRBY3Rpdml0eUNhbGxiYWNrcyh0aGlzKTtcbiAgICB9XG5cbiAgICB0aGlzLl9jYWxsYmFja3Mub25DcmVhdGUodGhpcywgc2F2ZWRJbnN0YW5jZVN0YXRlLCB0aGlzLmdldEludGVudCgpLCBzdXBlci5vbkNyZWF0ZSk7XG5cbiAgICBBY3Rpdml0eUhhbmRsZXIub25DcmVhdGUoc2F2ZWRJbnN0YW5jZVN0YXRlLCB0aGlzKTtcbiAgICBQdXNoTm90aWZpY2F0aW9uLm9uTmV3SW50ZW50KHRoaXMuZ2V0SW50ZW50KCkpO1xuICB9XG5cbiAgLy8gW01ESy00NjczXSBPblJlY2VpdmVOb3RpZmljYXRpb25SZXNwb25zZSBldmVudCBpcyBub3QgZmlyZWQgaW4gQW5kcm9pZCBDbGllbnRcbiAgLy8gY29weSBmcm9tIGNvbS50bnMuTmF0aXZlU2NyaXB0QWN0aXZpdHlcbiAgLy8gaHR0cHM6Ly9naXRodWIuY29tL05hdGl2ZVNjcmlwdC9OYXRpdmVTY3JpcHQvcHVsbC81MzM3XG4gIHB1YmxpYyBvbk5ld0ludGVudChpbnRlbnQ6IGFuZHJvaWQuY29udGVudC5JbnRlbnQpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5fY2FsbGJhY2tzKSB7XG4gICAgICB0aGlzLl9jYWxsYmFja3Mub25OZXdJbnRlbnQodGhpcywgaW50ZW50LCBzdXBlci5zZXRJbnRlbnQsIHN1cGVyLm9uTmV3SW50ZW50KTtcbiAgICB9IGVsc2Uge1xuICAgICAgc3VwZXIub25OZXdJbnRlbnQoaW50ZW50KTtcbiAgICB9XG4gICAgUHVzaE5vdGlmaWNhdGlvbi5vbk5ld0ludGVudChpbnRlbnQpO1xuICB9XG4gIFxuICBwdWJsaWMgb25EZXN0cm95KCk6IHZvaWQge1xuICAgIGlmICh0aGlzLl9jYWxsYmFja3MpIHtcbiAgICAgIHRoaXMuX2NhbGxiYWNrcy5vbkRlc3Ryb3kodGhpcywgc3VwZXIub25EZXN0cm95KTtcbiAgICB9IGVsc2Uge1xuICAgICAgc3VwZXIub25EZXN0cm95KCk7XG4gICAgfVxuICB9XG5cbiAgLy8gdHNsaW50OmRpc2FibGU6bWF4LWxpbmUtbGVuZ3RoXG4gIHB1YmxpYyBvblJlcXVlc3RQZXJtaXNzaW9uc1Jlc3VsdChyZXF1ZXN0Q29kZTogbnVtYmVyLCBwZXJtaXNzaW9ucywgZ3JhbnRSZXN1bHRzKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuX2NhbGxiYWNrcykge1xuICAgICAgdGhpcy5fY2FsbGJhY2tzLm9uUmVxdWVzdFBlcm1pc3Npb25zUmVzdWx0KHRoaXMsIHJlcXVlc3RDb2RlLCBwZXJtaXNzaW9ucywgZ3JhbnRSZXN1bHRzLCB1bmRlZmluZWQpO1xuICAgIH1cbiAgICBBY3Rpdml0eUhhbmRsZXIub25SZXF1ZXN0UGVybWlzc2lvbnNSZXN1bHQocmVxdWVzdENvZGUsIHBlcm1pc3Npb25zLCBncmFudFJlc3VsdHMsIHRoaXMpO1xuICB9XG5cbiAgcHVibGljIG9uU2F2ZUluc3RhbmNlU3RhdGUob3V0U3RhdGU6IGFuZHJvaWQub3MuQnVuZGxlKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuX2NhbGxiYWNrcykge1xuICAgICAgdGhpcy5fY2FsbGJhY2tzLm9uU2F2ZUluc3RhbmNlU3RhdGUodGhpcywgb3V0U3RhdGUsIHN1cGVyLm9uU2F2ZUluc3RhbmNlU3RhdGUpO1xuICAgIH0gZWxzZSB7XG4gICAgICBzdXBlci5vblNhdmVJbnN0YW5jZVN0YXRlKG91dFN0YXRlKTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgb25TdGFydCgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5fY2FsbGJhY2tzKSB7XG4gICAgICB0aGlzLl9jYWxsYmFja3Mub25TdGFydCh0aGlzLCBzdXBlci5vblN0YXJ0KTtcbiAgICB9IGVsc2Uge1xuICAgICAgc3VwZXIub25TdGFydCgpO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBvblN0b3AoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuX2NhbGxiYWNrcykge1xuICAgICAgdGhpcy5fY2FsbGJhY2tzLm9uU3RvcCh0aGlzLCBzdXBlci5vblN0b3ApO1xuICAgIH0gZWxzZSB7XG4gICAgICBzdXBlci5vblN0b3AoKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGludGVudERhdGFTdHJpbmdFeGlzdHMoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0SW50ZW50KCkgJiYgdGhpcy5nZXRJbnRlbnQoKS5nZXREYXRhKCkgJiYgdGhpcy5nZXRJbnRlbnQoKS5nZXREYXRhKCkudG9TdHJpbmcoKSAhPT0gJyc7XG4gIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiIn0=
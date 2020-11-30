require("./runtime.js");require("./vendor.js");module.exports =
(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["application"],{

/***/ "./MDKAndroidApplication.android.ts":
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {var Application = (function (_super) {
    __extends(Application, _super);
    function Application() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Application.prototype.onCreate = function () {
        _super.prototype.onCreate.call(this);
        var handler = com['sap'].cloud.mobile.foundation.authentication.AppLifecycleCallbackHandler.getInstance();
        this.registerActivityLifecycleCallbacks(handler);
    };
    Application.prototype.onConfigurationChanged = function (newConfig) {
        _super.prototype.onConfigurationChanged.call(this, newConfig);
        com['sap'].mdk.client.ui.common.LocaleManager.setLocale(this);
    };
    Application.prototype.attachBaseContext = function (baseContext) {
        _super.prototype.attachBaseContext.call(this, com['sap'].mdk.client.ui.common.LocaleManager.setLocale(baseContext));
    };
    Application = __decorate([
        JavaProxy('sap.mdkclient.MDKAndroidApplication')
    ], Application);
    return Application;
}(android.app.Application));
; 
if ( true && global._isModuleLoadedForUI && global._isModuleLoadedForUI("./MDKAndroidApplication.android.ts") ) {
    
    module.hot.accept();
    module.hot.dispose(() => {
        global.hmrRefresh({ type: "script", path: "./MDKAndroidApplication.android.ts" });
    });
} 
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("../node_modules/webpack/buildin/global.js")))

/***/ })

},[["./MDKAndroidApplication.android.ts","runtime","vendor"]]]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9NREtBbmRyb2lkQXBwbGljYXRpb24uYW5kcm9pZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFFQTtJQUEwQiwrQkFBdUI7SUFBakQ7O0lBa0JBLENBQUM7SUFqQlUsOEJBQVEsR0FBZjtRQUNJLGlCQUFNLFFBQVEsV0FBRSxDQUFDO1FBRWpCLElBQUksT0FBTyxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxjQUFjLENBQUMsMkJBQTJCLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDMUcsSUFBSSxDQUFDLGtDQUFrQyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ3JELENBQUM7SUFDTSw0Q0FBc0IsR0FBN0IsVUFBOEIsU0FBNEM7UUFDdEUsaUJBQU0sc0JBQXNCLFlBQUMsU0FBUyxDQUFDLENBQUM7UUFFeEMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2xFLENBQUM7SUFDTSx1Q0FBaUIsR0FBeEIsVUFBeUIsV0FBb0M7UUFFekQsaUJBQU0saUJBQWlCLFlBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7SUFHbEcsQ0FBQztJQWpCQyxXQUFXO1FBRGhCLFNBQVMsQ0FBQyxxQ0FBcUMsQ0FBQztPQUMzQyxXQUFXLENBa0JoQjtJQUFELGtCQUFDO0NBQUEsQ0FsQnlCLE9BQU8sQ0FBQyxHQUFHLENBQUMsV0FBVyxHQWtCaEQiLCJmaWxlIjoiYXBwbGljYXRpb24uanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyB0aGUgYEphdmFQcm94eWAgZGVjb3JhdG9yIHNwZWNpZmllcyB0aGUgcGFja2FnZSBhbmQgdGhlIG5hbWUgZm9yIHRoZSBuYXRpdmUgKi5KQVZBIGZpbGUgZ2VuZXJhdGVkLiBcbkBKYXZhUHJveHkoJ3NhcC5tZGtjbGllbnQuTURLQW5kcm9pZEFwcGxpY2F0aW9uJylcbmNsYXNzIEFwcGxpY2F0aW9uIGV4dGVuZHMgYW5kcm9pZC5hcHAuQXBwbGljYXRpb24ge1xuICAgIHB1YmxpYyBvbkNyZWF0ZSgpOiB2b2lkIHtcbiAgICAgICAgc3VwZXIub25DcmVhdGUoKTtcbiAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLXN0cmluZy1saXRlcmFsXG4gICAgICAgIGxldCBoYW5kbGVyID0gY29tWydzYXAnXS5jbG91ZC5tb2JpbGUuZm91bmRhdGlvbi5hdXRoZW50aWNhdGlvbi5BcHBMaWZlY3ljbGVDYWxsYmFja0hhbmRsZXIuZ2V0SW5zdGFuY2UoKTtcbiAgICAgICAgdGhpcy5yZWdpc3RlckFjdGl2aXR5TGlmZWN5Y2xlQ2FsbGJhY2tzKGhhbmRsZXIpO1xuICAgIH1cbiAgICBwdWJsaWMgb25Db25maWd1cmF0aW9uQ2hhbmdlZChuZXdDb25maWc6IGFuZHJvaWQuY29udGVudC5yZXMuQ29uZmlndXJhdGlvbikge1xuICAgICAgICBzdXBlci5vbkNvbmZpZ3VyYXRpb25DaGFuZ2VkKG5ld0NvbmZpZyk7XG4gICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1zdHJpbmctbGl0ZXJhbFxuICAgICAgICBjb21bJ3NhcCddLm1kay5jbGllbnQudWkuY29tbW9uLkxvY2FsZU1hbmFnZXIuc2V0TG9jYWxlKHRoaXMpO1xuICAgIH1cbiAgICBwdWJsaWMgYXR0YWNoQmFzZUNvbnRleHQoYmFzZUNvbnRleHQ6IGFuZHJvaWQuY29udGVudC5Db250ZXh0KSB7XG4gICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1zdHJpbmctbGl0ZXJhbFxuICAgICAgICBzdXBlci5hdHRhY2hCYXNlQ29udGV4dChjb21bJ3NhcCddLm1kay5jbGllbnQudWkuY29tbW9uLkxvY2FsZU1hbmFnZXIuc2V0TG9jYWxlKGJhc2VDb250ZXh0KSk7XG4gICAgICAgIC8vIFRoaXMgY29kZSBlbmFibGVzIE11bHRpRGV4IHN1cHBvcnQgZm9yIHRoZSBhcHBsaWNhdGlvbiAoaWYgbmVlZGVkKVxuICAgICAgICAvLyBhbmRyb2lkLnN1cHBvcnQubXVsdGlkZXguTXVsdGlEZXguaW5zdGFsbCh0aGlzKTtcbiAgICB9XG59XG4iXSwic291cmNlUm9vdCI6IiJ9
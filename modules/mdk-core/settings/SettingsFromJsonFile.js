"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SimpleSettings_1 = require("./SimpleSettings");
var SettingsFromJsonFile = (function (_super) {
    __extends(SettingsFromJsonFile, _super);
    function SettingsFromJsonFile(filePath, loggingName) {
        var _this = _super.call(this, loggingName) || this;
        _this._filePath = filePath;
        return _this;
    }
    SettingsFromJsonFile.prototype.setSettings = function (obj) {
    };
    SettingsFromJsonFile.prototype.setSetting = function (key, value) {
    };
    SettingsFromJsonFile.prototype.clear = function () {
    };
    SettingsFromJsonFile.prototype.setValue = function (obj, key, value) {
    };
    SettingsFromJsonFile.prototype.loadJSONData = function () {
        return global.require(this._filePath);
    };
    return SettingsFromJsonFile;
}(SimpleSettings_1.SimpleSettings));
exports.SettingsFromJsonFile = SettingsFromJsonFile;

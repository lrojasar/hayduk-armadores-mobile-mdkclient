"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DataAction_1 = require("./DataAction");
var IDefinitionProvider_1 = require("../definitions/IDefinitionProvider");
var ClientSettings_1 = require("../storage/ClientSettings");
var I18nLanguage_1 = require("../utils/I18nLanguage");
var ODataAction = (function (_super) {
    __extends(ODataAction, _super);
    function ODataAction(definition) {
        var _this = _super.call(this, definition) || this;
        _this._sapLanguageParamIdentifier = 'sap-language';
        return _this;
    }
    ODataAction.prototype.getEntitySet = function () {
        var definition = this.definition;
        return definition.getEntitySet();
    };
    ODataAction.prototype.getResolvedEntitySet = function () {
        return this._resolvedEntitySet;
    };
    ODataAction.prototype.getLanguageUrlParam = function () {
        var definition = this.definition;
        var serviceName = definition.getService();
        var serviceDefinition = IDefinitionProvider_1.IDefinitionProvider.instance().getDefinition(serviceName);
        return serviceDefinition.languageUrlParam;
    };
    ODataAction.prototype.getServiceUrlSuffix = function (serviceUrl) {
        var serviceUrlSuffix = '';
        var languageUrlSuffixIndicator = this.getLanguageUrlParam();
        var languageCode;
        var updateServiceLanguagesMap = false;
        var serviceLanguagesMap = ClientSettings_1.ClientSettings.getODataServiceLanguageMap();
        if (serviceLanguagesMap) {
            if (serviceLanguagesMap.hasOwnProperty(serviceUrl)) {
                languageCode = serviceLanguagesMap[serviceUrl];
            }
        }
        else {
            serviceLanguagesMap = {};
        }
        if (!languageCode) {
            languageCode = this._getLanguageForServiceURLSuffix();
            updateServiceLanguagesMap = true;
        }
        if (languageUrlSuffixIndicator && languageCode) {
            serviceUrlSuffix = '?' + languageUrlSuffixIndicator + '=' + languageCode;
            if (updateServiceLanguagesMap) {
                serviceLanguagesMap[serviceUrl] = languageCode;
                ClientSettings_1.ClientSettings.setODataServiceLanguageMap(serviceLanguagesMap);
            }
        }
        return serviceUrlSuffix;
    };
    ODataAction.prototype.setEmptyProperties = function (service) {
        if (service.properties && Array.isArray(service.properties) && service.properties.length === 0) {
            service.properties = {};
        }
    };
    ODataAction.prototype.formatServiceHeaders = function (headers) {
        var formattedHeaders = {};
        if (!headers || Object.keys(headers).length === 0) {
            return headers;
        }
        for (var key in headers) {
            if (key) {
                if (typeof headers[key] === 'object') {
                    formattedHeaders[key] = this._formatHeaderValue(headers[key]);
                }
                else {
                    formattedHeaders[key] = String(headers[key]);
                }
            }
        }
        return formattedHeaders;
    };
    ODataAction.prototype._formatHeaderValue = function (valObject) {
        var bFirst = true;
        var stringVal = '';
        for (var key in valObject) {
            if (key) {
                if (!bFirst) {
                    stringVal += ',';
                }
                if (typeof valObject[key] === 'object') {
                    stringVal += key + '=\'' + this._formatHeaderValue(valObject[key]) + '\'';
                }
                else {
                    stringVal += key + '=\'' + valObject[key] + '\'';
                }
                if (bFirst) {
                    bFirst = false;
                }
            }
        }
        return stringVal;
    };
    ODataAction.prototype._getLanguageForServiceURLSuffix = function () {
        var languageCode = '';
        if (ClientSettings_1.ClientSettings.isDemoMode()) {
            languageCode = ClientSettings_1.ClientSettings.getDemoAppLanguage();
        }
        else {
            languageCode = ClientSettings_1.ClientSettings.getAppLanguage();
            if (languageCode) {
                if (languageCode === I18nLanguage_1.I18nLanguage.defaultI18n) {
                    languageCode = I18nLanguage_1.I18nLanguage.hardcodedLanguageCode;
                }
                var languageUrlParam = this.getLanguageUrlParam();
                if (languageUrlParam && languageUrlParam.endsWith(this._sapLanguageParamIdentifier)) {
                    var languageCodeLowerCase = languageCode.toLowerCase();
                    if (languageCodeLowerCase.startsWith('zh')) {
                        if (languageCodeLowerCase.indexOf('hant') > 2 ||
                            languageCodeLowerCase.indexOf('hk') > 2 ||
                            languageCodeLowerCase.indexOf('tw') > 2) {
                            languageCode = 'zf';
                        }
                    }
                    else if (languageCodeLowerCase.startsWith('sr')) {
                        if (languageCodeLowerCase.indexOf('latn') > 2 ||
                            languageCodeLowerCase.indexOf('rs') > 2) {
                            languageCode = 'sh';
                        }
                    }
                }
                languageCode = languageCode.length >= 2 ? languageCode.substr(0, 2) : '';
            }
        }
        return languageCode;
    };
    return ODataAction;
}(DataAction_1.DataAction));
exports.ODataAction = ODataAction;
;

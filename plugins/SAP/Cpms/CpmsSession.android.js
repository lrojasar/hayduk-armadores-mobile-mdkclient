"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ErrorMessage_1 = require("../ErrorHandling/ErrorMessage");
var trace_1 = require("tns-core-modules/trace");
var DataConverter_1 = require("../Common/DataConverter");
var RestServiceUtil_1 = require("../RestService/RestServiceUtil");
var foundationPkg = com.sap.mdk.client.foundation;
var CpmsSession = (function () {
    function CpmsSession() {
        this._bridge = foundationPkg.CPmsSession.getInstance();
    }
    CpmsSession.createIPromiseCallback = function (args) {
        return new foundationPkg.IPromiseCallback(args);
    };
    CpmsSession.getInstance = function () {
        if (!CpmsSession._instance) {
            CpmsSession._instance = new CpmsSession();
        }
        return CpmsSession._instance;
    };
    CpmsSession.prototype.initialize = function (params) {
    };
    CpmsSession.prototype.updateConnectionParams = function (params) {
    };
    CpmsSession.prototype.sendRequest = function (url, params) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var urlKey = 'url';
            var methodKey = 'method';
            var bodyKey = 'body';
            var headerKey = 'header';
            var reqParams = new org.json.JSONObject();
            reqParams.put(urlKey, url);
            var header = {};
            var isFormData = false;
            if (params) {
                if (params.hasOwnProperty(methodKey)) {
                    reqParams.put(methodKey, params[methodKey]);
                }
                if (params.hasOwnProperty(headerKey)) {
                    for (var key in params[headerKey]) {
                        if (key.toLowerCase() === 'content-type' && params[headerKey][key] === 'multipart/form-data') {
                            isFormData = true;
                        }
                        else {
                            header[key] = params[headerKey][key];
                        }
                    }
                }
                if (params.hasOwnProperty(bodyKey)) {
                    var body = params[bodyKey];
                    if (Array.isArray(body) && isFormData) {
                        body = RestServiceUtil_1.RestServiceUtil.getAndroidFormData(body);
                    }
                    else if (body && (Array.isArray(body) || body.constructor === Object)) {
                        header['Content-Type'] = 'application/json';
                        body = JSON.stringify(body);
                    }
                    reqParams.put(bodyKey, body);
                }
                if (Object.keys(header).length > 0) {
                    var headerParams_1 = new org.json.JSONObject();
                    Object.keys(header).forEach(function (key) {
                        headerParams_1.put(key, header[key]);
                    });
                    reqParams.put(headerKey, headerParams_1);
                }
            }
            var successHandler = CpmsSession.createIPromiseCallback({
                onResolve: function (responseAndData) {
                    var code = parseInt(responseAndData.get('statusCode'), 10);
                    var data = responseAndData.get('data');
                    var headersObj = DataConverter_1.DataConverter.toJavaScriptObject(responseAndData.get('headers'));
                    var httpResponse = {
                        content: {
                            toFile: function (destinationFilePath) {
                                var fs = require('tns-core-modules/file-system');
                                var fileName = url;
                                if (!destinationFilePath) {
                                    destinationFilePath = fs.path.join(fs.knownFolders.documents().path, fileName.substring(fileName.lastIndexOf('/') + 1));
                                }
                                var file = fs.File.fromPath(destinationFilePath);
                                try {
                                    file.writeSync(data, function (err) {
                                        trace_1.write(err, 'mdk.trace.core', trace_1.messageType.error);
                                        reject(new Error(ErrorMessage_1.ErrorMessage.format(ErrorMessage_1.ErrorMessage.FILE_SAVE_FAILED, destinationFilePath)));
                                    });
                                }
                                catch (err) {
                                    reject(new Error(ErrorMessage_1.ErrorMessage.format(ErrorMessage_1.ErrorMessage.FILE_SAVE_FAILED, destinationFilePath)));
                                }
                                return file;
                            },
                            toImage: function () {
                                var imageBitmap = android.graphics.BitmapFactory.decodeByteArray(data, 0, data.length);
                                return imageBitmap;
                            },
                            toString: function () { return data; },
                            getData: function () {
                                return data;
                            },
                        },
                        headers: headersObj,
                        mimeType: responseAndData.get('contentType'),
                        statusCode: code,
                    };
                    resolve(httpResponse);
                }
            });
            var failureHandler = CpmsSession.createIPromiseCallback({
                onRejected: function (code, message, error) {
                    reject(error);
                }
            });
            return _this._bridge.sendRequest(reqParams, successHandler, failureHandler);
        });
    };
    return CpmsSession;
}());
exports.CpmsSession = CpmsSession;
;

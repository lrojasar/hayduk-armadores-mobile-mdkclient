"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ErrorMessage_1 = require("../ErrorHandling/ErrorMessage");
var CpmsSession_1 = require("../Cpms/CpmsSession");
var RestServiceUtil_1 = require("./RestServiceUtil");
var RestServiceManager = (function () {
    function RestServiceManager() {
    }
    RestServiceManager.prototype.sendRequest = function (params) {
        if (!params) {
            throw new Error(ErrorMessage_1.ErrorMessage.RESTSERVICE_SEND_REQUEST_HAS_NULL_PARAMS);
        }
        return new Promise(function (resolve, reject) {
            var url = params.serviceUrl + params.path;
            var requestProperties = params.requestProperties;
            var method = requestProperties.Method;
            var apiHeaders = requestProperties.Headers;
            var body = requestProperties.Body;
            var serviceHeaders = params.headers;
            var header = {};
            if (apiHeaders) {
                Object.assign(header, apiHeaders);
            }
            if (serviceHeaders) {
                Object.assign(header, serviceHeaders);
            }
            return CpmsSession_1.CpmsSession.getInstance().sendRequest(url, { method: method, header: header, body: body }).then(function (response) {
                if (response.statusCode >= 300) {
                    var error = new Error(response.content.toString());
                    error['responseCode'] = response.statusCode;
                    error['responseBody'] = error.message;
                    return reject(error);
                }
                else {
                    if (RestServiceUtil_1.RestServiceUtil.isTextContent(response.mimeType)) {
                        return resolve(response.content.toString());
                    }
                    else {
                        return resolve(response.content.getData());
                    }
                }
            }).catch(function (error) {
                return reject(error);
            });
        });
    };
    return RestServiceManager;
}());
exports.RestServiceManager = RestServiceManager;
;

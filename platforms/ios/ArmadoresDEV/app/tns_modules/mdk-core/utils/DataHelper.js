"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var IDataService_1 = require("../data/IDataService");
var IRestService_1 = require("../data/IRestService");
var DataHelper = (function () {
    function DataHelper() {
    }
    DataHelper.readFromService = function (service) {
        if (service.function && service.function.Name) {
            return IDataService_1.IDataService.instance().callFunction(service, service.headers);
        }
        else if (service.path && service.requestProperties) {
            if (service.queryOptions && service.queryOptions.indexOf("$skip") === 0) {
                return Promise.resolve(null);
            }
            return IRestService_1.IRestService.instance().sendRequest(service);
        }
        else {
            return IDataService_1.IDataService.instance().read(service);
        }
    };
    DataHelper.readWithPageSize = function (service, pageSize) {
        if (service.function && service.function.Name || service.path && service.requestProperties) {
            var result = {
                Value: null,
                nextLink: null,
            };
            return Promise.resolve(result);
        }
        else {
            return IDataService_1.IDataService.instance().readWithPageSize(service, pageSize);
        }
    };
    DataHelper.getPropertyType = function (serviceName, entitySet, propertyName) {
        if (serviceName && entitySet && propertyName) {
            return IDataService_1.IDataService.instance().getPropertyType(serviceName, entitySet, propertyName);
        }
        else {
            return '';
        }
    };
    return DataHelper;
}());
exports.DataHelper = DataHelper;

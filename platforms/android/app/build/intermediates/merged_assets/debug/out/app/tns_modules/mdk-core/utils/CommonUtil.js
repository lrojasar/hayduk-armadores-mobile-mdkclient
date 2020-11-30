"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CommonUtil = (function () {
    function CommonUtil() {
    }
    CommonUtil.format = function (str) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        if (str == null) {
            return '';
        }
        else if (args && args.length > 0) {
            return str.replace(/{(\d+)}/g, function (match, i) {
                if (i < args.length && args[i]) {
                    if (typeof args[i] === 'object') {
                        return args[i].toString();
                    }
                    else {
                        return args[i].toString();
                    }
                }
                else {
                    return args[i];
                }
            });
        }
        else {
            return str;
        }
    };
    CommonUtil.inspectIndicatorValues = function (values) {
        var inspectedValues = [];
        var combinedValue = '';
        var checkValue = '';
        for (var i = 0; i < values.length; i++) {
            checkValue = values[i].trim();
            if (checkValue.indexOf('\'') === 0) {
                combinedValue = values[i];
                if (checkValue.lastIndexOf('\'') !== checkValue.length - 1) {
                    for (var j = i + 1; j < values.length; j++) {
                        checkValue = values[j].trim();
                        combinedValue += ',' + values[j];
                        if (checkValue.lastIndexOf('\'') === checkValue.length - 1) {
                            i = j;
                            break;
                        }
                    }
                }
                combinedValue = combinedValue.trim();
                combinedValue = combinedValue.substr(1, combinedValue.length - 2);
            }
            else {
                combinedValue = values[i];
            }
            inspectedValues.push(combinedValue);
        }
        return inspectedValues.map(function (item) { return item.trim(); });
    };
    CommonUtil.isJSONString = function (str) {
        try {
            JSON.parse(str);
        }
        catch (e) {
            return false;
        }
        return true;
    };
    CommonUtil.refineFilterQueryString = function (queryString) {
        var refinedString = queryString.replace(/\\'/g, "'");
        return refinedString;
    };
    CommonUtil.getValidHexCode = function (hexColorCode) {
        if (hexColorCode !== undefined) {
            if (!hexColorCode.startsWith('#')) {
                hexColorCode = '#' + hexColorCode;
            }
            if (/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/i.test(hexColorCode)) {
                return hexColorCode;
            }
        }
    };
    return CommonUtil;
}());
exports.CommonUtil = CommonUtil;
;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CssPropertyParser_1 = require("./CssPropertyParser");
var StyleHelper = (function () {
    function StyleHelper() {
    }
    StyleHelper.getStyle = function (selector, cssClassName) {
        var style = {};
        var color = CssPropertyParser_1.CssPropertyParser.getPropertyFromSelector(selector, cssClassName, this._colorProperty);
        if (color) {
            style.colorString = (typeof color === 'string') ? color : '';
            style.color = (typeof color === 'string') ? CssPropertyParser_1.CssPropertyParser.createColor(color) : color;
        }
        var fontSize = CssPropertyParser_1.CssPropertyParser
            .getPropertyFromSelector(selector, cssClassName, this._fontSizeProperty);
        if (fontSize) {
            style.fontSize = fontSize;
        }
        var fontFamily = CssPropertyParser_1.CssPropertyParser
            .getPropertyFromSelector(selector, cssClassName, this._fontFamilyProperty);
        if (fontFamily) {
            style.fontFamily = CssPropertyParser_1.CssPropertyParser.createFontFamily(fontFamily);
        }
        var backgroundColor = CssPropertyParser_1.CssPropertyParser.getPropertyFromSelector(selector, cssClassName, this._backgroundColorProperty);
        if (backgroundColor) {
            style.backgroundColorString = (typeof backgroundColor === 'string') ? backgroundColor : '';
            style.backgroundColor = (typeof backgroundColor === 'string') ? CssPropertyParser_1.CssPropertyParser.createColor(backgroundColor) : backgroundColor;
        }
        return style;
    };
    StyleHelper.convertStyleToCssString = function (styleObj, className) {
        var cssString = '';
        if (styleObj) {
            cssString = '.' + className + ' { ';
            if (styleObj.colorString && styleObj.colorString !== '') {
                cssString += this._colorProperty + ': ' + styleObj.colorString + '; ';
            }
            if (styleObj.fontSize && styleObj.fontSize !== '') {
                cssString += this._fontSizeProperty + ': ' + styleObj.fontSize + '; ';
            }
            if (styleObj.fontFamily && styleObj.fontFamily !== '') {
                cssString += this._fontFamilyProperty + ': ' + styleObj.fontFamily + '; ';
            }
            cssString += '}';
        }
        return cssString;
    };
    StyleHelper._colorProperty = 'color';
    StyleHelper._fontFamilyProperty = 'font-family';
    StyleHelper._fontSizeProperty = 'font-size';
    StyleHelper._backgroundColorProperty = 'background-color';
    return StyleHelper;
}());
exports.StyleHelper = StyleHelper;

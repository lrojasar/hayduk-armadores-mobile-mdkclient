Object.defineProperty(exports, "__esModule", { value: true });
var font_1 = require("../ui/styling/font");
var file_system_1 = require("../file-system");
var utils_1 = require("../utils/utils");
exports.isFileOrResourcePath = utils_1.isFileOrResourcePath;
var image_source_common_1 = require("./image-source-common");
var http;
function ensureHttp() {
    if (!http) {
        http = require("../http");
    }
}
var ImageSource = (function () {
    function ImageSource(nativeSource) {
        if (nativeSource) {
            this.setNativeSource(nativeSource);
        }
    }
    Object.defineProperty(ImageSource.prototype, "height", {
        get: function () {
            if (this.ios) {
                return this.ios.size.height;
            }
            return NaN;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ImageSource.prototype, "width", {
        get: function () {
            if (this.ios) {
                return this.ios.size.width;
            }
            return NaN;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ImageSource.prototype, "rotationAngle", {
        get: function () {
            return NaN;
        },
        set: function (_value) {
        },
        enumerable: true,
        configurable: true
    });
    ImageSource.fromAsset = function (asset) {
        return new Promise(function (resolve, reject) {
            asset.getImageAsync(function (image, err) {
                if (image) {
                    resolve(new ImageSource(image));
                }
                else {
                    reject(err);
                }
            });
        });
    };
    ImageSource.fromUrl = function (url) {
        ensureHttp();
        return http.getImage(url);
    };
    ImageSource.fromResourceSync = function (name) {
        var nativeSource = UIImage.tns_safeImageNamed(name) || UIImage.tns_safeImageNamed(name + ".jpg");
        return nativeSource ? new ImageSource(nativeSource) : null;
    };
    ImageSource.fromResource = function (name) {
        return new Promise(function (resolve, reject) {
            try {
                UIImage.tns_safeDecodeImageNamedCompletion(name, function (image) {
                    if (image) {
                        resolve(new ImageSource(image));
                    }
                    else {
                        UIImage.tns_safeDecodeImageNamedCompletion(name + ".jpg", function (image) {
                            resolve(new ImageSource(image));
                        });
                    }
                });
            }
            catch (ex) {
                reject(ex);
            }
        });
    };
    ImageSource.fromFileSync = function (path) {
        var uiImage = UIImage.imageWithContentsOfFile(getFileName(path));
        return uiImage ? new ImageSource(uiImage) : null;
    };
    ImageSource.fromFile = function (path) {
        return new Promise(function (resolve, reject) {
            try {
                UIImage.tns_decodeImageWidthContentsOfFileCompletion(getFileName(path), function (uiImage) {
                    resolve(new ImageSource(uiImage));
                });
            }
            catch (ex) {
                reject(ex);
            }
        });
    };
    ImageSource.fromFileOrResourceSync = function (path) {
        if (!utils_1.isFileOrResourcePath(path)) {
            throw new Error("Path \"" + "\" is not a valid file or resource.");
        }
        if (path.indexOf(utils_1.RESOURCE_PREFIX) === 0) {
            return ImageSource.fromResourceSync(path.substr(utils_1.RESOURCE_PREFIX.length));
        }
        return ImageSource.fromFileSync(path);
    };
    ImageSource.fromDataSync = function (data) {
        var uiImage = UIImage.imageWithData(data);
        return uiImage ? new ImageSource(uiImage) : null;
    };
    ImageSource.fromData = function (data) {
        return new Promise(function (resolve, reject) {
            try {
                UIImage.tns_decodeImageWithDataCompletion(data, function (uiImage) {
                    resolve(new ImageSource(uiImage));
                });
            }
            catch (ex) {
                reject(ex);
            }
        });
    };
    ImageSource.fromBase64Sync = function (source) {
        var uiImage;
        if (typeof source === "string") {
            var data = NSData.alloc().initWithBase64EncodedStringOptions(source, 1);
            uiImage = UIImage.imageWithData(data);
        }
        return uiImage ? new ImageSource(uiImage) : null;
    };
    ImageSource.fromBase64 = function (source) {
        return new Promise(function (resolve, reject) {
            try {
                var data = NSData.alloc().initWithBase64EncodedStringOptions(source, 1);
                UIImage.imageWithData["async"](UIImage, [data]).then(function (uiImage) {
                    resolve(new ImageSource(uiImage));
                });
            }
            catch (ex) {
                reject(ex);
            }
        });
    };
    ImageSource.fromFontIconCodeSync = function (source, font, color) {
        var _a;
        font = font || font_1.Font.default;
        var fontSize = utils_1.layout.toDevicePixels(font.fontSize);
        if (!fontSize) {
            fontSize = UIFont.labelFontSize;
        }
        var density = utils_1.layout.getDisplayDensity();
        var scaledFontSize = fontSize * density;
        var attributes = (_a = {},
            _a[NSFontAttributeName] = font.getUIFont(UIFont.systemFontOfSize(scaledFontSize)),
            _a);
        if (color) {
            attributes[NSForegroundColorAttributeName] = color.ios;
        }
        var attributedString = NSAttributedString.alloc().initWithStringAttributes(source, attributes);
        UIGraphicsBeginImageContextWithOptions(attributedString.size(), false, 0.0);
        attributedString.drawAtPoint(CGPointMake(0, 0));
        var iconImage = UIGraphicsGetImageFromCurrentImageContext();
        UIGraphicsEndImageContext();
        return iconImage ? new ImageSource(iconImage) : null;
    };
    ImageSource.prototype.fromAsset = function (asset) {
        var _this = this;
        console.log("fromAsset() is deprecated. Use ImageSource.fromAsset() instead.");
        return ImageSource.fromAsset(asset)
            .then(function (imgSource) {
            _this.setNativeSource(imgSource.ios);
            return _this;
        });
    };
    ImageSource.prototype.loadFromResource = function (name) {
        console.log("loadFromResource() is deprecated. Use ImageSource.fromResourceSync() instead.");
        var imgSource = ImageSource.fromResourceSync(name);
        this.ios = imgSource ? imgSource.ios : null;
        return !!this.ios;
    };
    ImageSource.prototype.fromResource = function (name) {
        var _this = this;
        console.log("fromResource() is deprecated. Use ImageSource.fromResource() instead.");
        return ImageSource.fromResource(name)
            .then(function (imgSource) {
            _this.ios = imgSource.ios;
            return !!_this.ios;
        });
    };
    ImageSource.prototype.loadFromFile = function (path) {
        console.log("loadFromFile() is deprecated. Use ImageSource.fromFileSync() instead.");
        var imgSource = ImageSource.fromFileSync(path);
        this.ios = imgSource ? imgSource.ios : null;
        return !!this.ios;
    };
    ImageSource.prototype.fromFile = function (path) {
        var _this = this;
        console.log("fromFile() is deprecated. Use ImageSource.fromFile() instead.");
        return ImageSource.fromFile(path)
            .then(function (imgSource) {
            _this.ios = imgSource.ios;
            return !!_this.ios;
        });
    };
    ImageSource.prototype.loadFromData = function (data) {
        console.log("loadFromData() is deprecated. Use ImageSource.fromDataSync() instead.");
        var imgSource = ImageSource.fromDataSync(data);
        this.ios = imgSource ? imgSource.ios : null;
        return !!this.ios;
    };
    ImageSource.prototype.fromData = function (data) {
        var _this = this;
        console.log("fromData() is deprecated. Use ImageSource.fromData() instead.");
        return ImageSource.fromData(data)
            .then(function (imgSource) {
            _this.ios = imgSource.ios;
            return !!_this.ios;
        });
    };
    ImageSource.prototype.loadFromBase64 = function (source) {
        console.log("loadFromBase64() is deprecated. Use ImageSource.fromBase64Sync() instead.");
        var imgSource = ImageSource.fromBase64Sync(source);
        this.ios = imgSource ? imgSource.ios : null;
        return !!this.ios;
    };
    ImageSource.prototype.fromBase64 = function (source) {
        var _this = this;
        console.log("fromBase64() is deprecated. Use ImageSource.fromBase64() instead.");
        return ImageSource.fromBase64(source)
            .then(function (imgSource) {
            _this.ios = imgSource.ios;
            return !!_this.ios;
        });
    };
    ImageSource.prototype.loadFromFontIconCode = function (source, font, color) {
        console.log("loadFromFontIconCode() is deprecated. Use ImageSource.fromFontIconCodeSync() instead.");
        var imgSource = ImageSource.fromFontIconCodeSync(source, font, color);
        this.ios = imgSource ? imgSource.ios : null;
        return !!this.ios;
    };
    ImageSource.prototype.setNativeSource = function (source) {
        if (source && !(source instanceof UIImage)) {
            throw new Error("The method setNativeSource() expects UIImage instance.");
        }
        this.ios = source;
    };
    ImageSource.prototype.saveToFile = function (path, format, quality) {
        if (!this.ios) {
            return false;
        }
        if (quality) {
            quality = (quality - 0) / (100 - 0);
        }
        var data = getImageData(this.ios, format, quality);
        if (data) {
            return NSFileManager.defaultManager.createFileAtPathContentsAttributes(path, data, null);
        }
        return false;
    };
    ImageSource.prototype.toBase64String = function (format, quality) {
        var res = null;
        if (!this.ios) {
            return res;
        }
        if (quality) {
            quality = (quality - 0) / (100 - 0);
        }
        var data = getImageData(this.ios, format, quality);
        if (data) {
            res = data.base64Encoding();
        }
        return res;
    };
    ImageSource.prototype.resize = function (maxSize, options) {
        var size = this.ios.size;
        var dim = image_source_common_1.getScaledDimensions(size.width, size.height, maxSize);
        var newSize = CGSizeMake(dim.width, dim.height);
        UIGraphicsBeginImageContextWithOptions(newSize, true, this.ios.scale);
        this.ios.drawInRect(CGRectMake(0, 0, newSize.width, newSize.height));
        var resizedImage = UIGraphicsGetImageFromCurrentImageContext();
        UIGraphicsEndImageContext();
        return new ImageSource(resizedImage);
    };
    return ImageSource;
}());
exports.ImageSource = ImageSource;
function getFileName(path) {
    var fileName = typeof path === "string" ? path.trim() : "";
    if (fileName.indexOf("~/") === 0) {
        fileName = file_system_1.path.join(file_system_1.knownFolders.currentApp().path, fileName.replace("~/", ""));
    }
    return fileName;
}
function getImageData(instance, format, quality) {
    if (quality === void 0) { quality = 0.9; }
    var data = null;
    switch (format) {
        case "png":
            data = UIImagePNGRepresentation(instance);
            break;
        case "jpeg":
        case "jpg":
            data = UIImageJPEGRepresentation(instance, quality);
            break;
    }
    return data;
}
function fromAsset(asset) {
    console.log("fromAsset() is deprecated. Use ImageSource.fromAsset() instead.");
    return ImageSource.fromAsset(asset);
}
exports.fromAsset = fromAsset;
function fromResource(name) {
    console.log("fromResource() is deprecated. Use ImageSource.fromResourceSync() instead.");
    return ImageSource.fromResourceSync(name);
}
exports.fromResource = fromResource;
function fromFile(path) {
    console.log("fromFile() is deprecated. Use ImageSource.fromFileSync() instead.");
    return ImageSource.fromFileSync(path);
}
exports.fromFile = fromFile;
function fromData(data) {
    console.log("fromData() is deprecated. Use ImageSource.fromDataSync() instead.");
    return ImageSource.fromDataSync(data);
}
exports.fromData = fromData;
function fromFontIconCode(source, font, color) {
    console.log("fromFontIconCode() is deprecated. Use ImageSource.fromFontIconCodeSync() instead.");
    return ImageSource.fromFontIconCodeSync(source, font, color);
}
exports.fromFontIconCode = fromFontIconCode;
function fromBase64(source) {
    console.log("fromBase64() is deprecated. Use ImageSource.fromBase64Sync() instead.");
    return ImageSource.fromBase64Sync(source);
}
exports.fromBase64 = fromBase64;
function fromNativeSource(nativeSource) {
    console.log("fromNativeSource() is deprecated. Use ImageSource constructor instead.");
    return new ImageSource(nativeSource);
}
exports.fromNativeSource = fromNativeSource;
function fromUrl(url) {
    console.log("fromUrl() is deprecated. Use ImageSource.fromUrl() instead.");
    return ImageSource.fromUrl(url);
}
exports.fromUrl = fromUrl;
function fromFileOrResource(path) {
    console.log("fromFileOrResource() is deprecated. Use ImageSource.fromFileOrResourceSync() instead.");
    return ImageSource.fromFileOrResourceSync(path);
}
exports.fromFileOrResource = fromFileOrResource;
//# sourceMappingURL=image-source.ios.js.map
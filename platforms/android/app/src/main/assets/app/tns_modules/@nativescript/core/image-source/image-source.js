Object.defineProperty(exports, "__esModule", { value: true });
var file_system_1 = require("../file-system");
var utils_1 = require("../utils/utils");
exports.isFileOrResourcePath = utils_1.isFileOrResourcePath;
var application_1 = require("../application");
var font_1 = require("../ui/styling/font");
var image_source_common_1 = require("./image-source-common");
var http;
function ensureHttp() {
    if (!http) {
        http = require("../http");
    }
}
var application;
var resources;
function getApplication() {
    if (!application) {
        application = application_1.getNativeApplication();
    }
    return application;
}
function getResources() {
    if (!resources) {
        resources = getApplication().getResources();
    }
    return resources;
}
var ImageSource = (function () {
    function ImageSource(nativeSource) {
        if (nativeSource) {
            this.setNativeSource(nativeSource);
        }
    }
    Object.defineProperty(ImageSource.prototype, "height", {
        get: function () {
            if (this.android) {
                return this.android.getHeight();
            }
            return NaN;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ImageSource.prototype, "width", {
        get: function () {
            if (this.android) {
                return this.android.getWidth();
            }
            return NaN;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ImageSource.prototype, "rotationAngle", {
        get: function () {
            return this._rotationAngle;
        },
        set: function (value) {
            this._rotationAngle = value;
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
        var res = getResources();
        if (res) {
            var identifier = res.getIdentifier(name, "drawable", getApplication().getPackageName());
            if (0 < identifier) {
                var bitmapDrawable = res.getDrawable(identifier);
                if (bitmapDrawable && bitmapDrawable.getBitmap) {
                    return new ImageSource(bitmapDrawable.getBitmap());
                }
            }
        }
        return null;
    };
    ImageSource.fromResource = function (name) {
        return new Promise(function (resolve, reject) {
            resolve(ImageSource.fromResourceSync(name));
        });
    };
    ImageSource.fromFileSync = function (path) {
        var fileName = typeof path === "string" ? path.trim() : "";
        if (fileName.indexOf("~/") === 0) {
            fileName = file_system_1.path.join(file_system_1.knownFolders.currentApp().path, fileName.replace("~/", ""));
        }
        var bitmap = android.graphics.BitmapFactory.decodeFile(fileName, null);
        if (bitmap) {
            var result = new ImageSource(bitmap);
            result.rotationAngle = getRotationAngleFromFile(fileName);
            return result;
        }
        else {
            return null;
        }
    };
    ImageSource.fromFile = function (path) {
        return new Promise(function (resolve, reject) {
            resolve(ImageSource.fromFileSync(path));
        });
    };
    ImageSource.fromFileOrResourceSync = function (path) {
        if (!utils_1.isFileOrResourcePath(path)) {
            throw new Error(path + " is not a valid file or resource.");
        }
        if (path.indexOf(utils_1.RESOURCE_PREFIX) === 0) {
            return ImageSource.fromResourceSync(path.substr(utils_1.RESOURCE_PREFIX.length));
        }
        return ImageSource.fromFileSync(path);
    };
    ImageSource.fromDataSync = function (data) {
        var bitmap = android.graphics.BitmapFactory.decodeStream(data);
        return bitmap ? new ImageSource(bitmap) : null;
    };
    ImageSource.fromData = function (data) {
        return new Promise(function (resolve, reject) {
            resolve(ImageSource.fromDataSync(data));
        });
    };
    ImageSource.fromBase64Sync = function (source) {
        var bitmap;
        if (typeof source === "string") {
            var bytes = android.util.Base64.decode(source, android.util.Base64.DEFAULT);
            bitmap = android.graphics.BitmapFactory.decodeByteArray(bytes, 0, bytes.length);
        }
        return bitmap ? new ImageSource(bitmap) : null;
    };
    ImageSource.fromBase64 = function (source) {
        return new Promise(function (resolve, reject) {
            resolve(ImageSource.fromBase64Sync(source));
        });
    };
    ImageSource.fromFontIconCodeSync = function (source, font, color) {
        font = font || font_1.Font.default;
        var paint = new android.graphics.Paint();
        paint.setTypeface(font.getAndroidTypeface());
        paint.setAntiAlias(true);
        if (color) {
            paint.setColor(color.android);
        }
        var fontSize = utils_1.layout.toDevicePixels(font.fontSize);
        if (!fontSize) {
            fontSize = paint.getTextSize();
        }
        var density = utils_1.layout.getDisplayDensity();
        var scaledFontSize = fontSize * density;
        paint.setTextSize(scaledFontSize);
        var textBounds = new android.graphics.Rect();
        paint.getTextBounds(source, 0, source.length, textBounds);
        var textWidth = textBounds.width();
        var textHeight = textBounds.height();
        if (textWidth > 0 && textHeight > 0) {
            var bitmap = android.graphics.Bitmap
                .createBitmap(textWidth, textHeight, android.graphics.Bitmap.Config.ARGB_8888);
            var canvas = new android.graphics.Canvas(bitmap);
            canvas.drawText(source, -textBounds.left, -textBounds.top, paint);
            return new ImageSource(bitmap);
        }
        return null;
    };
    ImageSource.prototype.fromAsset = function (asset) {
        var _this = this;
        console.log("fromAsset() is deprecated. Use ImageSource.fromAsset() instead.");
        return ImageSource.fromAsset(asset)
            .then(function (imgSource) {
            _this.setNativeSource(imgSource.android);
            return _this;
        });
    };
    ImageSource.prototype.loadFromResource = function (name) {
        console.log("fromResource() and loadFromResource() are deprecated. Use ImageSource.fromResource[Sync]() instead.");
        var imgSource = ImageSource.fromResourceSync(name);
        this.android = imgSource ? imgSource.android : null;
        return !!this.android;
    };
    ImageSource.prototype.fromResource = function (name) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            resolve(_this.loadFromResource(name));
        });
    };
    ImageSource.prototype.loadFromFile = function (path) {
        console.log("fromFile() and loadFromFile() are deprecated. Use ImageSource.fromFile[Sync]() instead.");
        var imgSource = ImageSource.fromFileSync(path);
        this.android = imgSource ? imgSource.android : null;
        return !!this.android;
    };
    ImageSource.prototype.fromFile = function (path) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            resolve(_this.loadFromFile(path));
        });
    };
    ImageSource.prototype.loadFromData = function (data) {
        console.log("fromData() and loadFromData() are deprecated. Use ImageSource.fromData[Sync]() instead.");
        var imgSource = ImageSource.fromDataSync(data);
        this.android = imgSource ? imgSource.android : null;
        return !!this.android;
    };
    ImageSource.prototype.fromData = function (data) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            resolve(_this.loadFromData(data));
        });
    };
    ImageSource.prototype.loadFromBase64 = function (source) {
        console.log("fromBase64() and loadFromBase64() are deprecated. Use ImageSource.fromBase64[Sync]() instead.");
        var imgSource = ImageSource.fromBase64Sync(source);
        this.android = imgSource ? imgSource.android : null;
        return !!this.android;
    };
    ImageSource.prototype.fromBase64 = function (data) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            resolve(_this.loadFromBase64(data));
        });
    };
    ImageSource.prototype.loadFromFontIconCode = function (source, font, color) {
        console.log("loadFromFontIconCode() is deprecated. Use ImageSource.fromFontIconCodeSync() instead.");
        var imgSource = ImageSource.fromFontIconCodeSync(source, font, color);
        this.android = imgSource ? imgSource.android : null;
        return !!this.android;
    };
    ImageSource.prototype.setNativeSource = function (source) {
        if (source && !(source instanceof android.graphics.Bitmap)) {
            throw new Error("The method setNativeSource() expects android.graphics.Bitmap instance.");
        }
        this.android = source;
    };
    ImageSource.prototype.saveToFile = function (path, format, quality) {
        if (quality === void 0) { quality = 100; }
        if (!this.android) {
            return false;
        }
        var targetFormat = getTargetFormat(format);
        var outputStream = new java.io.BufferedOutputStream(new java.io.FileOutputStream(path));
        var res = this.android.compress(targetFormat, quality, outputStream);
        outputStream.close();
        return res;
    };
    ImageSource.prototype.toBase64String = function (format, quality) {
        if (quality === void 0) { quality = 100; }
        if (!this.android) {
            return null;
        }
        var targetFormat = getTargetFormat(format);
        var outputStream = new java.io.ByteArrayOutputStream();
        var base64Stream = new android.util.Base64OutputStream(outputStream, android.util.Base64.NO_WRAP);
        this.android.compress(targetFormat, quality, base64Stream);
        base64Stream.close();
        outputStream.close();
        return outputStream.toString();
    };
    ImageSource.prototype.resize = function (maxSize, options) {
        var dim = image_source_common_1.getScaledDimensions(this.android.getWidth(), this.android.getHeight(), maxSize);
        var bm = android.graphics.Bitmap.createScaledBitmap(this.android, dim.width, dim.height, options && options.filter);
        return new ImageSource(bm);
    };
    return ImageSource;
}());
exports.ImageSource = ImageSource;
function getTargetFormat(format) {
    switch (format) {
        case "jpeg":
        case "jpg":
            return android.graphics.Bitmap.CompressFormat.JPEG;
        default:
            return android.graphics.Bitmap.CompressFormat.PNG;
    }
}
function getRotationAngleFromFile(filename) {
    var result = 0;
    var ei = new android.media.ExifInterface(filename);
    var orientation = ei.getAttributeInt(android.media.ExifInterface.TAG_ORIENTATION, android.media.ExifInterface.ORIENTATION_NORMAL);
    switch (orientation) {
        case android.media.ExifInterface.ORIENTATION_ROTATE_90:
            result = 90;
            break;
        case android.media.ExifInterface.ORIENTATION_ROTATE_180:
            result = 180;
            break;
        case android.media.ExifInterface.ORIENTATION_ROTATE_270:
            result = 270;
            break;
    }
    return result;
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
//# sourceMappingURL=image-source.android.js.map
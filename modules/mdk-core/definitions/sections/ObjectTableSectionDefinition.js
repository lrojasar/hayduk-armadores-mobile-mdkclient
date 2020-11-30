"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var BaseCollectionSectionPagingDefinition_1 = require("./BaseCollectionSectionPagingDefinition");
var ObjectTableSectionDefinition = (function (_super) {
    __extends(ObjectTableSectionDefinition, _super);
    function ObjectTableSectionDefinition() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(ObjectTableSectionDefinition.prototype, "accessoryType", {
        get: function () {
            return this.data.ObjectCell.AccessoryType || this.defaultAccessoryType;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ObjectTableSectionDefinition.prototype, "defaultAccessoryType", {
        get: function () {
            return 'none';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ObjectTableSectionDefinition.prototype, "descriptionText", {
        get: function () {
            return this.data.ObjectCell.Description;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ObjectTableSectionDefinition.prototype, "detailImage", {
        get: function () {
            return this.data.ObjectCell.DetailImage;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ObjectTableSectionDefinition.prototype, "detailImageText", {
        get: function () {
            return this.data.ObjectCell.DetailImageText;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ObjectTableSectionDefinition.prototype, "footnote", {
        get: function () {
            return this.data.ObjectCell.Footnote;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ObjectTableSectionDefinition.prototype, "icons", {
        get: function () {
            return this.data.ObjectCell.Icons || [];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ObjectTableSectionDefinition.prototype, "objectCell", {
        get: function () {
            return this.data.ObjectCell;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ObjectTableSectionDefinition.prototype, "objectCells", {
        get: function () {
            return this.data.ObjectCells || [];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ObjectTableSectionDefinition.prototype, "onPress", {
        get: function () {
            return this.data.ObjectCell.OnPress;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ObjectTableSectionDefinition.prototype, "onAccessoryButtonPress", {
        get: function () {
            return this.data.ObjectCell.OnAccessoryButtonPress;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ObjectTableSectionDefinition.prototype, "progressIndicator", {
        get: function () {
            return this.data.ObjectCell.ProgressIndicator;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ObjectTableSectionDefinition.prototype, "search", {
        get: function () {
            return this.data.Search || {};
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ObjectTableSectionDefinition.prototype, "statusImage", {
        get: function () {
            return this.data.ObjectCell.StatusImage;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ObjectTableSectionDefinition.prototype, "statusText", {
        get: function () {
            return this.data.ObjectCell.StatusText;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ObjectTableSectionDefinition.prototype, "subHeadlineText", {
        get: function () {
            return this.data.ObjectCell.Subhead;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ObjectTableSectionDefinition.prototype, "subStatusImage", {
        get: function () {
            return this.data.ObjectCell.SubstatusImage;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ObjectTableSectionDefinition.prototype, "subStatusText", {
        get: function () {
            return this.data.ObjectCell.SubstatusText;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ObjectTableSectionDefinition.prototype, "title", {
        get: function () {
            return this.data.ObjectCell.Title;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ObjectTableSectionDefinition.prototype, "usePreviewMode", {
        get: function () {
            return this.data.MaxItemCount !== undefined;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ObjectTableSectionDefinition.prototype, "searchEnabled", {
        get: function () {
            if (this.data.Search !== undefined) {
                return this.data.Search.Enabled;
            }
            return false;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ObjectTableSectionDefinition.prototype, "searchPlaceholder", {
        get: function () {
            if (this.data.Search !== undefined) {
                return this.data.Search.Placeholder;
            }
            return undefined;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ObjectTableSectionDefinition.prototype, "searchBarcodeScanEnabled", {
        get: function () {
            if (this.data.Search !== undefined) {
                return this.data.Search.BarcodeScanner;
            }
            return false;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ObjectTableSectionDefinition.prototype, "usesExtensionViews", {
        get: function () {
            return false;
        },
        enumerable: true,
        configurable: true
    });
    return ObjectTableSectionDefinition;
}(BaseCollectionSectionPagingDefinition_1.BaseCollectionSectionPagingDefinition));
exports.ObjectTableSectionDefinition = ObjectTableSectionDefinition;
;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var IDataService_1 = require("../data/IDataService");
var UpdateODataEntityActionDefinition_1 = require("../definitions/actions/UpdateODataEntityActionDefinition");
var ODataAction_1 = require("./ODataAction");
var EvaluateTarget_1 = require("../data/EvaluateTarget");
var ActionResultBuilder_1 = require("../builders/actions/ActionResultBuilder");
var ErrorMessage_1 = require("../errorHandling/ErrorMessage");
var UpdateODataEntityAction = (function (_super) {
    __extends(UpdateODataEntityAction, _super);
    function UpdateODataEntityAction(definition) {
        var _this = this;
        if (!(definition instanceof UpdateODataEntityActionDefinition_1.UpdateODataEntityActionDefinition)) {
            throw new Error(ErrorMessage_1.ErrorMessage.CANNOT_INIT_UPDATEODATAENTITYACTION_WITHOUT_DEFINITION);
        }
        _this = _super.call(this, definition) || this;
        return _this;
    }
    UpdateODataEntityAction.prototype.execute = function () {
        var _this = this;
        return Promise.all([
            EvaluateTarget_1.asService(this.definition.data, this.context()),
            EvaluateTarget_1.asLinks(this.definition.data.CreateLinks, this.context()),
            EvaluateTarget_1.asLinks(this.definition.data.UpdateLinks, this.context()),
            EvaluateTarget_1.asLinks(this.definition.data.DeleteLinks, this.context())
        ]).then(function (result) {
            _this.service = result[0];
            _this.setEmptyProperties(_this.service);
            _this._resolvedEntitySet = _this.service.entitySet;
            var createLinks = result[1];
            var updateLinks = result[2];
            var deleteLinks = result[3];
            return IDataService_1.IDataService.instance().update(_this.service, createLinks, updateLinks, deleteLinks, _this.service.headers)
                .then(function (data) {
                if (data) {
                    var json = JSON.parse(data);
                    _this.readLink = json['@odata.readLink'];
                }
                return new ActionResultBuilder_1.ActionResultBuilder().data(data).build();
            });
        });
    };
    UpdateODataEntityAction.prototype.publishAfterSuccess = function () {
        var _this = this;
        var properties = this.service.properties;
        var contextBinding = this.context().binding;
        var actionBinding = this.context().clientAPIProps.actionBinding;
        if (contextBinding && contextBinding['@odata.readLink'] === this.readLink) {
            Object.keys(properties).forEach(function (sKey) {
                contextBinding[sKey] = _this.service.properties[sKey];
            });
        }
        if (actionBinding && actionBinding['@odata.readLink'] === this.readLink) {
            Object.keys(properties).forEach(function (sKey) {
                actionBinding[sKey] = _this.service.properties[sKey];
            });
        }
        return Promise.resolve(true);
    };
    return UpdateODataEntityAction;
}(ODataAction_1.ODataAction));
exports.UpdateODataEntityAction = UpdateODataEntityAction;
;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ODataAction_1 = require("./ODataAction");
var IDataService_1 = require("../data/IDataService");
var OpenODataServiceActionDefinition_1 = require("../definitions/actions/OpenODataServiceActionDefinition");
var ActionResultBuilder_1 = require("../builders/actions/ActionResultBuilder");
var ErrorMessage_1 = require("../errorHandling/ErrorMessage");
var ODataActionBuilder_1 = require("../builders/odata/ODataActionBuilder");
var ODataServiceBuilder_1 = require("../builders/odata/service/ODataServiceBuilder");
var OpenODataServiceAction = (function (_super) {
    __extends(OpenODataServiceAction, _super);
    function OpenODataServiceAction(definition) {
        var _this = this;
        if (!(definition instanceof OpenODataServiceActionDefinition_1.OpenODataServiceActionDefinition)) {
            throw new Error(ErrorMessage_1.ErrorMessage.CANNOT_INIT_OPENODATASERVICEACTION_WITHOUT_DEFINITION);
        }
        _this = _super.call(this, definition) || this;
        return _this;
    }
    OpenODataServiceAction.prototype.execute = function () {
        var _this = this;
        var definition = this.definition;
        var builder = new ODataActionBuilder_1.ODataActionBuilder(this.context());
        builder.setService(this.getService());
        return builder.build().then(function (params) {
            var serviceHeaders = IDataService_1.IDataService.instance().getServiceHeaders(params.service);
            var sbuilder = new ODataServiceBuilder_1.ODataServiceBuilder(_this.context());
            sbuilder.setHeaders(serviceHeaders);
            return sbuilder.build().then(function (sparams) {
                var oDataServiceHeaders = sparams.headers;
                var serviceUrl = IDataService_1.IDataService.instance().urlForServiceName(params.service);
                return IDataService_1.IDataService.instance().openService({ serviceUrl: serviceUrl, oDataServiceHeaders: oDataServiceHeaders }).then(function (data) {
                    return new ActionResultBuilder_1.ActionResultBuilder().data(data).build();
                });
            });
        });
    };
    OpenODataServiceAction.prototype.publishAfterSuccess = function () {
        return Promise.resolve(true);
    };
    return OpenODataServiceAction;
}(ODataAction_1.ODataAction));
exports.OpenODataServiceAction = OpenODataServiceAction;
;

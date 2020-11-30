"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var IDataService_1 = require("../data/IDataService");
var IDefinitionProvider_1 = require("../definitions/IDefinitionProvider");
var ODataAction_1 = require("./ODataAction");
var CreateODataServiceActionDefinition_1 = require("../definitions/actions/CreateODataServiceActionDefinition");
var ActionResultBuilder_1 = require("../builders/actions/ActionResultBuilder");
var ErrorMessage_1 = require("../errorHandling/ErrorMessage");
var ClientSettings_1 = require("../storage/ClientSettings");
var ODataActionBuilder_1 = require("../builders/odata/ODataActionBuilder");
var ODataServiceBuilder_1 = require("../builders/odata/service/ODataServiceBuilder");
var TypeConverter_1 = require("../utils/TypeConverter");
var CreateODataServiceAction = (function (_super) {
    __extends(CreateODataServiceAction, _super);
    function CreateODataServiceAction(definition) {
        var _this = this;
        if (!(definition instanceof CreateODataServiceActionDefinition_1.CreateODataServiceActionDefinition)) {
            throw new Error(ErrorMessage_1.ErrorMessage.CANNOT_INIT_CREATEODATASERVICEACTION_WITHOUT_DEFINITION);
        }
        _this = _super.call(this, definition) || this;
        return _this;
    }
    CreateODataServiceAction.prototype.execute = function () {
        var _this = this;
        if (ClientSettings_1.ClientSettings.isDemoMode()) {
            throw new Error(ErrorMessage_1.ErrorMessage.NOT_SUPPORTED_IN_DEMOMODE);
        }
        var builder = new ODataActionBuilder_1.ODataActionBuilder(this.context());
        builder.setService(this.getService());
        return builder.build().then(function (params) {
            var serviceName = params.service;
            var serviceUrl = IDataService_1.IDataService.instance().urlForServiceName(serviceName);
            var serviceDefinition = IDefinitionProvider_1.IDefinitionProvider.instance().getDefinition(serviceName);
            var sbuilder = new ODataServiceBuilder_1.ODataServiceBuilder(_this.context());
            sbuilder.setIsOnline(serviceDefinition.isOnline)
                .setCsdlOptions(serviceDefinition.csdlOptions)
                .setServiceOptions(serviceDefinition.serviceOptions);
            return sbuilder.build().then(function (sparams) {
                sparams.offlineEnabled = false;
                IDataService_1.IDataService.instance().saveResolvedServiceInfo(serviceName, sparams);
                var isOnline = TypeConverter_1.TypeConverter.toBoolean(sparams.isOnline);
                return IDataService_1.IDataService.instance().createService(serviceUrl, isOnline, sparams.csdlOptions, sparams.serviceOptions).then(function (data) {
                    return new ActionResultBuilder_1.ActionResultBuilder().data(data).build();
                });
            });
        });
    };
    return CreateODataServiceAction;
}(ODataAction_1.ODataAction));
exports.CreateODataServiceAction = CreateODataServiceAction;
;

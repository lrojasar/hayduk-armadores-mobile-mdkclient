"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var BaseActionDefinition_1 = require("./BaseActionDefinition");
var LogoutActionDefinition = (function (_super) {
    __extends(LogoutActionDefinition, _super);
    function LogoutActionDefinition(path, data) {
        return _super.call(this, path, data) || this;
    }
    return LogoutActionDefinition;
}(BaseActionDefinition_1.BaseActionDefinition));
exports.LogoutActionDefinition = LogoutActionDefinition;
;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ErrorMessage = (function () {
    function ErrorMessage() {
    }
    ErrorMessage.format = function (str) {
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
    ErrorMessage.WARN_LOG_FILE_NOT_CREATED = 'Logger is already initialized. Failed to another create Log file: {0}';
    ErrorMessage.ACTIVITY_INDICATOR_INSTANTIATION_FAILED = 'Error: ActivityIndicator instantiation failed. Use instance getter instead of new.';
    ErrorMessage.BANNER_INSTANTIATION_FAILED = 'Error: Banner instantiation failed. Use getInstance() instead of new.';
    ErrorMessage.ERROR_ACCESSING_SECURE_STOIRE = 'Error accessing the SecureStore: {0}';
    ErrorMessage.ERROR_CREATING_LOCAL_FILE = 'Error happened while creating local log file handler with the given name.';
    ErrorMessage.ERROR_WHILE_CREATING_LOG_UPLOAD = 'Error happened while creating log upload file handler';
    ErrorMessage.FORMCELL_CONTAINER_MANAGER_ADD_FORM_CELL_FAILED = 'FormCellContainerManager.ios.addFormCell() invalid parameters';
    ErrorMessage.FORMCELL_CONTAINER_MANAGER_POPULATE_INVALID_PARAMS = 'FormCellContainerManager.ios.populate() invalid parameters';
    ErrorMessage.FORMCELL_CONTAINER_MANAGER_UPDATE_CELLS_INVALID_PARAMS = 'FormCellContainerManager.ios.update() invalid parameters';
    ErrorMessage.LOGGER_MANAGER_NOT_INITIALIZED_YET = 'LoggerManager has not been initialized yet!';
    ErrorMessage.LOGGER_FAILED_TO_DELETE_LOG_FILE = 'Failed to delete log file';
    ErrorMessage.ODATA_BEGIN_CHANGESET_HAS_NULL_PARAMS = 'ODataManager.beginChangeSet() has null parameters';
    ErrorMessage.ODATA_CANCEL_CHANGESET_HAS_NULL_PARAMS = 'ODataManager.cancelChangeSet() has null parameters';
    ErrorMessage.ODATA_CLEAR_OFFLINE_HAS_NULL_PARAMS = 'ODataManager.clearOfflineStore() has null parameters';
    ErrorMessage.ODATA_CLOSE_OFFLINE_STORE_HAS_NULL_PARAMS = 'ODataManager.closeOfflineStore() has null parameters';
    ErrorMessage.ODATA_COMMIT_CHANGESET_HAS_NULL_PARAMS = 'ODataManager.commitChangeSet() has null parameters';
    ErrorMessage.ODATA_COUNT_HAS_NULL_PARAMS = 'ODataManager.count() has null parameters';
    ErrorMessage.ODATA_CREATE_HAS_NULL_PARAMS = 'ODataManager.create() has null parameters';
    ErrorMessage.ODATA_CREATE_RELATED_HAS_NULL_PARAMS = 'ODataManager.createRelated() has null parameters';
    ErrorMessage.ODATA_CREATE_SERVICE_HAS_NULL_PARAMS = 'ODataManager.createService() has null parameters';
    ErrorMessage.ODATA_CREATE_MEDIA_HAS_NULL_PARAMS = 'ODataManager.createMedia() has null parameters';
    ErrorMessage.ODATA_CREATE_RELATED_MEDIA_HAS_NULL_PARAMS = 'ODataManager.createRelatedMedia() has null parameters';
    ErrorMessage.ODATA_DELETE_HAS_NULL_PARAMS = 'ODataManager.delete() has null parameters';
    ErrorMessage.ODATA_DELETE_MEDIA_HAS_NULL_PARAMS = 'ODataManager.deleteMedia() has null parameters';
    ErrorMessage.ODATA_DOWNLOAD_MEDIA_HAS_NULL_PARAMS = 'ODataManager.downloadMedia() has null parameters';
    ErrorMessage.ODATA_DOWNLOAD_OFFLINE_ODATA_HAS_NULL_PARAMS = 'ODataManager.downloadOfflineOData() has null parameters';
    ErrorMessage.ODATA_INITIALIZE_OFFLINE_STORE_HAS_NULL_PARAMS = 'ODataManager.initializeOfflineStore() has null parameters';
    ErrorMessage.ODATA_IS_MEDIA_LOCAL_HAS_NULL_PARAMS = 'ODataManager.isMediaLocal() has null parameters';
    ErrorMessage.ODATA_OPEN_SERVICE_HAS_NULL_PARAMS = 'ODataManager.openService() has null parameters';
    ErrorMessage.ODATA_READ_HAS_NULL_PARAMS = 'ODataManager.read() has null parameters';
    ErrorMessage.ODATA_UPDATE_HAS_NULL_PARAMS = 'ODataManager.update() has null parameters';
    ErrorMessage.ODATA_UPLOAD_OFFLINE_ODATA_HAS_NULL_PARAMS = 'ODataManager.uploadOfflineOData() has null parameters';
    ErrorMessage.ODATA_INVOKE_FUNCTION_HAS_NULL_PARAMS = 'ODataManager.callFunction() has null parameters';
    ErrorMessage.ODATA_GET_PROPERTY_TYPE_HAS_NULL_PARAMS = 'ODataManager.getPropertyType() has null parameters';
    ErrorMessage.ODATA_GET_VERSION_HAS_NULL_PARAMS = 'ODataManager.getVersion() has null parameters';
    ErrorMessage.ODATA_GET_OFFLINESTORE_STATUS_TYPE_HAS_NULL_PARAMS = 'ODataManager.getOfflineStoreStatus() has null parameters';
    ErrorMessage.ODATA_BASE64STRING_TO_BINARY_HAS_NULL_PARAMS = 'ODataManager.base64StringToBinary() has null parameters';
    ErrorMessage.RESTSERVICE_SEND_REQUEST_HAS_NULL_PARAMS = 'RestServiceManager.sendRequest() has null parameters';
    ErrorMessage.ODATA_UNDOPENDINGCHANGES_HAS_NULL_PARAMS = 'ODataManager.undoPendingChanges() has null parameters';
    ErrorMessage.ODATA_SERVICE_URL_MISSING = 'ServiceUrl missing from definition';
    ErrorMessage.ODATA_SERVICE_NAME_MISSING = 'ServiceName missing from serviceUrl';
    ErrorMessage.ODATA_SERVICE_URL_NOT_A_STRING = 'ServiceUrl must be a string';
    ErrorMessage.ODATA_INIT_OFFLINE_DATA_PROVIDER_FAILED = 'OfflineODataProvider failed to be initialized';
    ErrorMessage.ODATA_UDB_FILE_NOT_FOUND = '{0} not found in bundle directory: {1}';
    ErrorMessage.ODATA_ENTITY_PROP_NOT_FOUND = 'Could not find entity set or properties';
    ErrorMessage.ODATA_SERVICE_PROVIDER_NOT_FOUND = 'Could not find service provider';
    ErrorMessage.ODATA_SERVICE_PROVIDER_NOT_INITIALIZED = 'Could not find service provider, ensure it is initialized';
    ErrorMessage.ODATA_INVALID_OP_TYPE = 'OnlineDataProvider used to do Offline OData {0}';
    ErrorMessage.ODATA_SERVICE_OP_PENDING_UPLOADS = 'Service {0} failed, pending uploads exist.';
    ErrorMessage.ODATA_SERVICE_OP_NOT_INITIALIZED = 'Offline OData Initialize needs to be called before {0}';
    ErrorMessage.ODATA_MALFORMED_PARAMS = '{0} {1}';
    ErrorMessage.ODATA_CREATE_RELATED_ENTITY_NOT_ALLOWED = 'Two links forced the usage of createRelatedEntity, which is not possible';
    ErrorMessage.ODATA_MALFORMED_PARAM_FOUND = '{0} could not find {1} value in linking instructions';
    ErrorMessage.ODATA_ZERO_TARGET_RETURNED = 'A query for link targets returned zero targets';
    ErrorMessage.ODATA_LINKING_2_PENDING_ENTITIES_NOT_ALLOWED = 'Cannot link between two pending entities, i.e. two entities that have not yet been added to the offline store.';
    ErrorMessage.ODATA_DELETE_REQUIRED_PROPERTY_NOT_ALLOWED = 'Cannot delete a required property';
    ErrorMessage.ODATA_CRUD_INIT_CHANGESETMANAGER_NOT_FOUND = 'Wrong parameter in BaseODataCruder.initialize. Expected ChangeSetManager';
    ErrorMessage.ODATA_UPDATE_MANDATORY_PARENT_NOT_ALLOWED = 'There cannot be a mandatory parent in the context of an update';
    ErrorMessage.ODATA_ENTITY_NAME_NOT_FOUND = '{0} could not find {1} value in linking instructions';
    ErrorMessage.ODATA_ENTITY_READLINK_NOT_FOUND = 'Entity with readLink {0} was not found in changeSetManager';
    ErrorMessage.ODATA_MORE_THAN_1_ENTITY_RETURNED = 'The query should have returned only one entity. It returned {0}';
    ErrorMessage.ODATA_CHANGESET_ALREADY_EXISTS = 'ChangeSet set already exists';
    ErrorMessage.ODATA_COMMIT_EMPTY_CHANGESET_NOT_ALLOWED = 'Cannot commit empty changeSet';
    ErrorMessage.ODATA_DOWNLOADMEDIA_FAILED = 'Download media failed';
    ErrorMessage.ODATA_DOWNLOADSTREAM_FAILED = 'Download stream data failed';
    ErrorMessage.ODATA_UPLOADSTREAM_FAILED = 'Upload stream data failed';
    ErrorMessage.ODATA_DELETE_MEDIA_LOADENTITY_FAILURE = 'Delete Media failed to load entity';
    ErrorMessage.ODATA_UNDO_PENDING_CHANGES_LOADENTITY_FAILURE = 'Undo pending changes failed to load entity';
    ErrorMessage.ODATA_CREATE_OPERATION_EMPTY_PROPERTY_NOT_ALLOWED = '{0}. Properties cannot be empty for operation create.';
    ErrorMessage.ODATA_CREATE_MEDIA_ENTITY_FAILED = 'Create Media Entity failed: invalid params';
    ErrorMessage.ODATA_CREATE_RELATED_MEDIA_ENTITY_FAILED = 'Create Related Media Entity failed: invalid params';
    ErrorMessage.ODATA_CREATE_MEDIA_INVALID_MEDIA_CONTENT = 'Create Media Entity failed, media contents not valid';
    ErrorMessage.ODATA_UPLOAD_STREAM_INVALID_STREAM_DATA = 'UploadStream failed, stream data is not valid';
    ErrorMessage.ODATA_CREATE_MEDIA_ERROR = '{0} of {1} Create Media Entity failed. Reasons {2}';
    ErrorMessage.ODATA_READLINK_MISSING = '{0} parameters require readLink. it is nil';
    ErrorMessage.ODATA_CONVERSION_NOT_IMPLEMENTED = 'Conversion of format {0} not implemented';
    ErrorMessage.ODATA_CONVERT_TO_STRING_FAILED = 'Could not convert to StringValue';
    ErrorMessage.ODATA_CONVERT_TO_INTEGER_FAILED = 'Could not convert to IntegerValue';
    ErrorMessage.ODATA_CONVERT_TO_BYTE_FAILED = 'Could not convert to Byte';
    ErrorMessage.ODATA_CONVERT_TO_BOOLEAN_FAILED = 'Could not convert to BooleanValue';
    ErrorMessage.ODATA_CONVERT_TO_CHAR_FAILED = 'Could not convert to CharValue';
    ErrorMessage.ODATA_CONVERT_TO_DECIMAL_FAILED = 'Could not convert to DecimalValue';
    ErrorMessage.ODATA_CONVERT_TO_DOUBLE_FAILED = 'Could not convert to DoubleValue';
    ErrorMessage.ODATA_CONVERT_TO_FLOAT_FAILED = 'Could not convert to FloatValue';
    ErrorMessage.ODATA_CONVERT_TO_INT_FAILED = 'Could not convert to IntValue';
    ErrorMessage.ODATA_CONVERT_TO_SHORT_FAILED = 'Could not convert to ShortValue';
    ErrorMessage.ODATA_CONVERT_TO_LONG_FAILED = 'Could not convert to LongValue';
    ErrorMessage.ODATA_CONVERT_TO_UNSIGNEDBYTE_FAILED = 'Could not convert to UnsignedByte';
    ErrorMessage.ODATA_NUMBER_TO_BYTE_OVERFLOW = 'Number does not fit into a Byte';
    ErrorMessage.ODATA_NEGATIVE_VALUES_NOT_ALLOWED = 'No negative values allowed in an Unsigned Byte';
    ErrorMessage.ODATA_CONVERT_STRING_TO_LOCALDATETIME_FAILED = 'This string could not be parsed to LocalDateTime: {0}. Wrong format.';
    ErrorMessage.ODATA_CONVERT_TO_LOCALDATETIME_FAILED = 'LocalDateTime conversion error';
    ErrorMessage.ODATA_CONVERT_STRING_TO_GLOBALDATETIME_FAILED = 'This string could not be parsed to GlobalDateTime: {0}. Wrong format.';
    ErrorMessage.ODATA_CONVERT_TO_GLOBALDATETIME_FAILED = 'GlobalDateTime conversion error';
    ErrorMessage.ODATA_CONVERT_STRING_TO_LOCALDATE_FAILED = 'This string could not be parsed to LocalDate: {0}. Wrong format.';
    ErrorMessage.ODATA_CONVERT_TO_LOCALDATE_FAILED = 'LocalDate conversion error';
    ErrorMessage.ODATA_CONVERT_STRING_TO_LOCALTIME_FAILED = 'This string could not be parsed to LocalTime: {0}. Wrong format.';
    ErrorMessage.ODATA_CONVERT_TO_LOCALTIME_FAILED = 'LocalTime conversion error';
    ErrorMessage.ODATA_CONVERT_TO_GUID_FAILED = 'Could not convert to GUID';
    ErrorMessage.ODATA_CONVERT_TO_DAYTIMEDURATION_FAILED = 'Could not convert to DayTimeDuration';
    ErrorMessage.ODATA_CONVERT_TO_COMPLEXVALUE_FAILED = 'Could not convert to ComplexValue';
    ErrorMessage.ODATA_CONVERT_TO_COMPLEXVALUELIST_FAILED = 'Could not convert to ComplexValueList';
    ErrorMessage.ODATA_CONVERT_TO_DATAVALUELIST_FAILED = 'Could not convert to DataValueList';
    ErrorMessage.ODATA_CONVERT_TO_ENTITYVALUE_FAILED = 'Could not convert to EntityValue';
    ErrorMessage.ODATA_CONVERT_TO_ENTITYVALUELIST_FAILED = 'Could not convert to EntityValueList';
    ErrorMessage.ODATA_CONVERT_TO_ENUMVALUE_FAILED = 'Could not convert to EnumValue';
    ErrorMessage.ODATA_CONVERT_STRING_TO_ENUMVALUE_FAILED = 'This string could not be parsed to Enum: {0}';
    ErrorMessage.ODATA_CONVERT_TO_BINARY_FAILED = 'Could not convert to Binary';
    ErrorMessage.ODATA_NUMBER_TO_SIGNED_BYTE_OVERFLOWED = 'Number does not fit into a signed Byte';
    ErrorMessage.ODATA_UNKNOWN_DATASERVICE_TYPE = 'Unknown dataService type was not online of offline service';
    ErrorMessage.ODATA_DOWNLOAD_NOT_INITIALIZED = 'Offline OData Initialize needs to be called before download';
    ErrorMessage.ODATA_UPLOAD_NOT_INITIALIZED = 'Offline OData Initialize needs to be called before upload';
    ErrorMessage.ODATA_INVALID_SERVICE_NAME = 'Service name is invalid';
    ErrorMessage.ODATA_CREATE_SERVICE_INCORRECT_PARAMETERS = 'ODataManager.createService() has incorrect parameters';
    ErrorMessage.ODATA_MISSING_FUNCTION_NAME_FOR_FUNCTION_IMPORT = 'Missing function name for Function Import';
    ErrorMessage.POPOVER_INSTANTIATION_FAILED = 'Error: Popover instantiation failed. Use getInstance() instead of new.';
    ErrorMessage.TOASTER_INSTANTIATION_FAILED = 'Error: Toaster instantiation failed. Use getInstance() instead of new.';
    ErrorMessage.TOASTER_NO_MESSAGE = 'Error: Toaster require message.';
    ErrorMessage.FORM_CELL_FACTORY_INSTANTIATION_FAILED = 'Error: Form Cell Factory instantiation failed. Use getInstance() instead of new.';
    ErrorMessage.FILE_SAVE_FAILED = 'Cannot save file with path: {0}';
    ErrorMessage.OPEN_SERVICE_NOT_INITIALIZED = 'Service open failed, DataService does not exist. Did you call create()?';
    ErrorMessage.MESSAGEDIALIOG_INSTANTIATION_FAILED = 'Error: MessageDialog instantiation failed. Use getInstance() instead of new.';
    ErrorMessage.ODATA_INVALID_DATAPROVIDER = 'Require online DataProvider.';
    ErrorMessage.ODATA_INVALID_STREAM_PARAMS = 'Invalid stream function parameters.';
    ErrorMessage.ODATA_BELOW_ARE_CSDL_OPTIONS = 'Below are the CSDL options:';
    ErrorMessage.ODATA_CSDL_OPTIONS_VALUE_AFTER_SET = 'CSDL options value after set: ';
    ErrorMessage.ODATA_UNSUPPORTED_CSDL_OPTIONS = 'Unsupported CSDL option, ';
    ErrorMessage.ODATA_INVALID_CHARS_IN_HTTP_HEADERS = 'Invalid character in HTTP header value';
    ErrorMessage.ODATA_UNSUPPORTED_SERVICE_OPTIONS = 'Unsupported service option {0}';
    ErrorMessage.ODATA_SET_SERVICE_OPTIONS = 'Set service option {0}';
    ErrorMessage.ODATA_STORENAME_NOT_DEFINED = 'Store name must be defined if path suffix is defined';
    ErrorMessage.PROPERTY_VALUE_REQUIRED = 'Cannot set non-nullable property {0} of type {1}, because the value is unexpectedly null';
    ErrorMessage.INVALID_GLOBAL_DATETIME_FORMAT = 'Invalid global datetime format';
    return ErrorMessage;
}());
exports.ErrorMessage = ErrorMessage;

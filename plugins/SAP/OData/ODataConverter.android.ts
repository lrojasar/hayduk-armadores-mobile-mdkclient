import { ErrorMessage } from '../ErrorHandling/ErrorMessage';
import { ODataServiceUtils } from './ODataServiceUtils';

declare var com;
const oDataPkg = com.sap.cloud.mobile.odata;

export class ODataConverter {
  private dataService: any;

  public constructor(dataService: any) {
    this.dataService = dataService;
  }

  public convert(value: any, type: number, typeName: String): any {
    switch (type) {
      case oDataPkg.DataType.COMPLEX_VALUE:
        return this.convertComplexValue(value, typeName);
      case oDataPkg.DataType.COMPLEX_VALUE_LIST:
        return this.convertComplexValueList(value, typeName);
      case oDataPkg.DataType.DATA_VALUE_LIST:
        return this.convertDataValueList(value, typeName);
      case oDataPkg.DataType.ENTITY_VALUE:
        return this.convertEntityValue(value, typeName);
      case oDataPkg.DataType.ENTITY_VALUE_LIST:
        return this.convertEntityValueList(value, typeName);
      case oDataPkg.DataType.ENUM_VALUE:
        return this.convertEnumValue(value, typeName);
      case oDataPkg.DataType.BINARY:
        return this.convertBinaryValue(value);
      default:
        return ODataServiceUtils.convert(value, type);
    }
  }

  private convertComplexValue(value: any, typeName: String): any {
    if (value instanceof oDataPkg.ComplexValue) {
      return value;
    }

    if (value == null) {
      return null;
    }

    let complexType = this.getComplexType(typeName);
    if (complexType && typeof value === 'object') {
      let returnValue = oDataPkg.ComplexValue.ofType(complexType);
      for (let key in value) {
        if (key != null) {
          let property = complexType.getProperty(key);
          if (property != null) {
            let dataValue = this.convert(value[key], property.getType().getCode(), property.getType().getName());
            returnValue.setDataValue(property, dataValue);
          }
        }
      }
      return returnValue;
    } else {
      throw new Error(ErrorMessage.ODATA_CONVERT_TO_COMPLEXVALUE_FAILED);
    }
  }

  private convertComplexValueList(value: any, typeName: String): any {
    if (value instanceof oDataPkg.ComplexValueList) {
      return value;
    }

    if (value == null) {
      return null;
    }

    let dataService = this.getOnlineService();
    if (dataService != null && Array.isArray(value)) {
      let complexTypeName = typeName.substring(0, typeName.length - 1);
      let complexType = dataService.getMetadata().getComplexType(complexTypeName);
      let returnValue = new oDataPkg.ComplexValueList();
      returnValue = returnValue.withType(oDataPkg.DataType.listOf(complexType));

      for (let complexVal of value) {
        if (complexVal != null) {
          let dataValue = this.convert(complexVal, oDataPkg.DataType.COMPLEX_VALUE, complexTypeName);
          returnValue.add(dataValue);
        }
      }

      return returnValue;
    } else {
      throw new Error(ErrorMessage.ODATA_CONVERT_TO_COMPLEXVALUELIST_FAILED);
    }
  }

  private convertDataValueList(value: any, typeName: String): any {
    if (value instanceof oDataPkg.DataValueList) {
      return value;
    }

    if (value == null) {
      return null;
    }

    let dataService = this.getOnlineService();
    if (dataService != null && Array.isArray(value)) {
      let simpleTypeName = typeName.substring(0, typeName.length - 1);
      let dataType;
      if (simpleTypeName.indexOf('.') !== -1) {
        dataType = dataService.getMetadata().getEnumType(simpleTypeName);
      } else {
        dataType = oDataPkg.DataType.forName(simpleTypeName);
      }
      let returnValue = new oDataPkg.DataValueList();
      returnValue = returnValue.withType(oDataPkg.DataType.listOf(dataType));

      for (let simpleValue of value) {
        if (simpleValue != null) {
          let dataValue = this.convert(simpleValue, dataType.getCode(), dataType.getName());
          returnValue.add(dataValue);
        }
      }

      return returnValue;
    } else {
      throw new Error(ErrorMessage.ODATA_CONVERT_TO_DATAVALUELIST_FAILED);
    }
  }

  private convertEntityValue(value: any, typeName: String): any {
    if (value instanceof oDataPkg.EntityValue) {
      return value;
    }

    if (value == null) {
      return null;
    }

    let entityType = this.getEntityType(typeName);
    if (entityType && typeof value === 'object') {
      let returnValue = oDataPkg.EntityValue.ofType(entityType);
      for (let key in value) {
        if (key != null) {
          let property = entityType.getProperty(key);
          if (property != null) {
            let dataValue = this.convert(value[key], property.getType().getCode(), property.getType().getName());
            returnValue.setDataValue(property, dataValue);
          }
        }
      }
      return returnValue;
    } else {
      throw new Error(ErrorMessage.ODATA_CONVERT_TO_ENTITYVALUE_FAILED);
    }
  }

  private convertEntityValueList(value: any, typeName: String): any {
    if (value instanceof oDataPkg.EntityValueList) {
      return value;
    }

    if (value == null) {
      return null;
    }

    if (Array.isArray(value)) {
      let entityTypeName = typeName.substring(0, typeName.length - 1);
      let entityType = this.getEntityType(entityTypeName);
      let returnValue = new oDataPkg.EntityValueList();
      returnValue = returnValue.withType(oDataPkg.DataType.listOf(entityType));

      for (let complexVal of value) {
        if (complexVal != null) {
          let dataValue = this.convert(complexVal, oDataPkg.DataType.ENTITY_VALUE, entityTypeName);
          returnValue.add(dataValue);
        }
      }

      return returnValue;
    } else {
      throw new Error(ErrorMessage.ODATA_CONVERT_TO_ENTITYVALUELIST_FAILED);
    }
  }

  private convertEnumValue(value: any, typeName: String): any {
    if (value instanceof oDataPkg.EnumValue) {
      return value;
    }

    if (value == null) {
      return null;
    }

    let dataService = this.getOnlineService();
    if (dataService != null && typeof value === 'string') {
      let enumType = dataService.getMetadata().getEnumType(typeName);
      if (enumType.findMember(value)) {
        return enumType.getMember(value);
      } else {
        throw new Error(ErrorMessage.format(ErrorMessage.ODATA_CONVERT_STRING_TO_ENUMVALUE_FAILED, value));
      }
    } else {
      throw new Error(ErrorMessage.ODATA_CONVERT_TO_ENUMVALUE_FAILED);
    }
  }

  private getOnlineService(): any {
    if (this.dataService != null && this.dataService.getProvider() instanceof oDataPkg.OnlineODataProvider) {
      return this.dataService;
    } else { 
      return null;
    }
  }

  private getComplexType(typeName: String): any {
    if (this.dataService != null) {
      return this.dataService.getMetadata().getComplexType(typeName);
    } else {
      return null;
    }
  }

  private getEntityType(typeName: String): any {
    if (this.dataService != null) {
      return this.dataService.getMetadata().getEntityType(typeName);
    } else {
      return null;
    }
  }

  private convertBinaryValue(value: any): any {
    if (value == null) {
      return null;
    }
    if (value instanceof oDataPkg.BinaryValue) {
      return value;
    }

    let content;
    if (value instanceof Array) {
      // from attachment control
      if (value.length === 0) {
        return null;
      }
      // use the first item
      content = value[0].content;
    } else if (typeof value === 'string') {
      // support base64 string
      content = ODataServiceUtils.base64StringToBinary(value);
    } else if (value && value.content) {
      // attachment media object
      content = value.content;
    } else if (value && value.length > 0) {
      // binary data
      content = value;
    } else {
      throw new Error(ErrorMessage.ODATA_CONVERT_TO_BINARY_FAILED);
    }
    return oDataPkg.BinaryValue.of(content);
  }
}

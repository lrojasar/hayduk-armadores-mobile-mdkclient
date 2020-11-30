declare var CpmsSessionSwift: any;
declare var okhttp3: any;

export class RestServiceUtil {
  public static getAndroidFormData(body: object[]) {
    let builder = new okhttp3.MultipartBody.Builder();
    builder.setType(okhttp3.MultipartBody.FORM);

    for (let i = 0; i < body.length; i++) {
      let part = body[i];

      if (typeof part['Value'] === 'object') {
        let attachment = part['Value'];
        if (attachment && attachment.urlString && attachment.content) {
          let fileName = attachment.urlString.substring(attachment.urlString.lastIndexOf('/') + 1);
          let mediaType = okhttp3.MediaType.parse(attachment.contentType);
          let partBody = okhttp3.MultipartBody.create(mediaType, attachment.content);

          builder.addFormDataPart(part['Key'], fileName, partBody);
        }
      } else {
        builder.addFormDataPart(part['Key'], part['Value']);
      }
    }

    return builder.build();
  }
  

  public static getIOSFormData(boundry: string, body: object[]) {
    // Convert Array to Object
    let params = Object.assign({}, body);
    return CpmsSessionSwift.sharedInstance.getFormDataWithBoundaryParams(boundry, params);
  }

  public static isTextContent(contentType: string) {
    return !contentType || 
      contentType.indexOf('text/') === 0 ||
      contentType === 'application/json' || 
      contentType.match('^application/(.*)xml');
  }
}
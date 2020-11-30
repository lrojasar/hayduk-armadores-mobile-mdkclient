export declare class DataConverter {
    static toJavaObject(params: any): any;
    static toJavaArray(params: any): any;
    static toJavaScriptObject(javaObj: any): void;
    static toJavaScriptMap(javaObj: any): void;
    static fromNSDictToMap(nsDict: any): Map<String, any>;
    static toViewFacade(view: any): any;
    static toUTCDate(dateString: string, serviceTimeZoneAbbreviation: string): string;
    static toJavaScriptValue(value: any): string;
    static fromNSDictToJavascriptObject(nsDict: any): void;
}

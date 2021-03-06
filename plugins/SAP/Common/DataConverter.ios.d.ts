export declare class DataConverter {
    static fromNSDictToMap(nsDict: NSDictionary<NSString, any>): Map<String, any>;
    static fromNSDictToJavascriptObject(nsDict: NSDictionary<NSString, any>): {};
    static toViewFacade(view: any): {
        android: any;
        ios: any;
    };
    static toUTCDate(dateString: string, serviceTimeZoneAbbreviation: string): any;
    private static DATE_TIME_FULL_REGEX;
    private static UTC_DATE_TIME_FULL_REGEX;
}

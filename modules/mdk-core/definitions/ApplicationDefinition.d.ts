import { BaseJSONDefinition } from './BaseJSONDefinition';
export declare class ApplicationDefinition extends BaseJSONDefinition {
    getMainPage(): any;
    getOnLaunch(): any;
    getOnUnCaughtError(): any;
    getOnExit(): any;
    getStyles(): any;
    getSDKStyles(): any;
    getLocalization(): any;
    getOnWillUpdate(): any;
    getOnDidUpdate(): any;
    getVersion(): any;
    readonly foregroundNotificationEventHandler: any;
    readonly contentAvailableEventHandler: any;
    readonly receiveNotificationResponseEventHandler: any;
    getOnSuspend(): any;
    getOnResume(): any;
}

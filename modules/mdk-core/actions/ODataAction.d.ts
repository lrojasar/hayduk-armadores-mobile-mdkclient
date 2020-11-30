import { DataAction } from './DataAction';
import { BaseActionDefinition } from '../definitions/actions/BaseActionDefinition';
export declare abstract class ODataAction extends DataAction {
    protected _resolvedEntitySet: string;
    private _sapLanguageParamIdentifier;
    constructor(definition: BaseActionDefinition);
    getEntitySet(): string;
    getResolvedEntitySet(): string;
    protected getLanguageUrlParam(): string;
    protected getServiceUrlSuffix(serviceUrl: string): string;
    protected setEmptyProperties(service: any): void;
    protected formatServiceHeaders(headers: any): any;
    private _formatHeaderValue;
    private _getLanguageForServiceURLSuffix;
}

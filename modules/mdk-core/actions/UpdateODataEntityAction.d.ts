import { ODataAction } from './ODataAction';
import { IActionResult } from '../context/IClientAPI';
export declare class UpdateODataEntityAction extends ODataAction {
    private service;
    private readLink;
    constructor(definition: any);
    execute(): Promise<IActionResult>;
    protected publishAfterSuccess(): Promise<boolean>;
}

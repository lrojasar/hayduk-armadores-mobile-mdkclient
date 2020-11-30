import { BaseAction } from './BaseAction';
import { IActionResult } from '../context/IClientAPI';
export declare class MessageAction extends BaseAction {
    constructor(definition: any);
    execute(): Promise<IActionResult>;
}

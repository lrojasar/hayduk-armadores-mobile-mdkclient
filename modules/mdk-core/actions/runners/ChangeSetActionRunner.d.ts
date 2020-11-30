import { ActionRunner } from './ActionRunner';
import { IAction } from '../IAction';
import { IActionResult } from '../../context/IClientAPI';
export declare class ChangeSetActionRunner extends ActionRunner {
    private _servicePromise;
    run(action: IAction): Promise<IActionResult>;
    protected _processChangeSets(changeSets: string[]): Promise<IActionResult>;
    protected _processChangeSet(action: string): Promise<IActionResult>;
    private _beginChangeSet;
    private _cancelChangeSet;
    private _commitChangeSet;
}

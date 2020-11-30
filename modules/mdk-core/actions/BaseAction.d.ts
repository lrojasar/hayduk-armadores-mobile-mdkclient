import { IAction } from './IAction';
import { IContext } from '../context/IContext';
import { IActionResult } from '../context/IClientAPI';
import { BaseActionDefinition } from '../definitions/actions/BaseActionDefinition';
import { ExecuteSource } from '../common/ExecuteSource';
export declare class BaseAction implements IAction {
    definition: BaseActionDefinition;
    protected _debug: boolean;
    protected _defaultIndicatorText: string;
    protected _source: ExecuteSource;
    protected _alwaysParentIfChildIsTabs: boolean;
    constructor(definition: BaseActionDefinition);
    readonly enabled: Promise<IActionResult>;
    readonly name: string;
    readonly type: string;
    readonly valid: Promise<IActionResult>;
    readonly defaultIndicatorText: string;
    setDefaultIndicatorText(defaultIndicatorText: string): void;
    source: ExecuteSource;
    readonly sourceFrameId: string;
    alwaysParentIfChildIsTabs: boolean;
    execute(): Promise<IActionResult>;
    onCompletion(result: IActionResult): Promise<IActionResult>;
    onFailure(result: IActionResult): Promise<any>;
    onInvalid(result: IActionResult): Promise<IActionResult>;
    onSuccess(result: IActionResult): Promise<IActionResult>;
    context(): IContext;
    protected _debugLog(message: string, ...args: any[]): void;
    protected _executeActionOrRule(handler: string): Promise<any>;
    protected _logAction(message: any, level: any): Promise<any>;
    protected _resolveValue(value: any): Promise<any>;
    private _nativeLog;
    private _saveActionResult;
    private _deleteAllActionResults;
    private _handleActionStepComplete;
}

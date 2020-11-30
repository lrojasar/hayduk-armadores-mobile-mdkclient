import { ISegment } from './ISegment';
import { IContext } from '../../context/IContext';
export declare class SelectedRowSegment extends ISegment {
    resolve(): IContext;
    protected isSpecifierRequired(): boolean;
}

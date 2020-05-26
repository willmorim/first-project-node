import constructor from "../types/constructor";
import { DelayedConstructor } from "../lazy-helpers";
declare type InjectionToken<T = any> = constructor<T> | string | symbol | DelayedConstructor<T>;
export declare function isNormalToken(token?: InjectionToken<any>): token is string | symbol;
export declare function isTokenDescriptor(descriptor: any): descriptor is TokenDescriptor;
export declare function isConstructorToken(token?: InjectionToken<any>): token is constructor<any> | DelayedConstructor<any>;
export interface TokenDescriptor {
    token: InjectionToken<any>;
    multiple: boolean;
}
export default InjectionToken;

import { Middleware, AnyAction } from 'redux';

export const timestampMiddleware: Middleware = ((store: any) => (next: Function) => (action: AnyAction) => {
    action['timestamp'] = Date.now();
    return next(action);
}) as any as Middleware;

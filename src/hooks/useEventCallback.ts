import { useEffect, useRef, useCallback, DependencyList } from 'react';

/**
 * @description 优先使用 useRedux distpatch + useContext，其次考虑使用 useEventCallback
 */
export function useEventCallback(fn: any, dependencies: DependencyList) {
    const ref = useRef(() => {
        throw new Error('Cannot call an event handler while rendering.');
    });

    useEffect(() => {
        ref.current = fn;
    }, [fn, ...dependencies]);

    return useCallback(() => {
        const fn = ref.current;
        return fn();
    }, [ref]);
}

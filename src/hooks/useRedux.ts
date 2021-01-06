import { useContext, useState, useEffect, useCallback } from 'react';
import { ReactReduxContext } from 'react-redux';
import { bindActionCreators, ActionCreator } from 'redux';

// TODO: https://gist.github.com/cmrigney/de7f485866c8cf140e4a046ee3305676
export function useRedux() {
    const { store } = useContext(ReactReduxContext);
    const { getState, dispatch, subscribe } = store;
    const reduxState = getState();

    const [state, setState] = useState(reduxState);
    const updateState = () => {
        setState(getState());
    };
    useEffect(() => subscribe(updateState), [state]);
    return [state, dispatch];
}

export function useSelector<T extends (state: any) => any>(selector: T): ReturnType<T> {
    const { store } = useContext(ReactReduxContext);
    const { getState, subscribe } = store;

    const [value, setValue] = useState(() => selector(getState()));

    const updateState = () => {
        const newValue = selector(getState());
        if (newValue !== value) {
            setValue(newValue);
        }
    };
    useEffect(() => subscribe(updateState), [value]);

    return value;
}

export function useActionCreator<A, T extends ActionCreator<A>>(actionCreator: T): T {
    const { store } = useContext(ReactReduxContext);
    const { dispatch } = store;
    return useCallback(bindActionCreators(actionCreator, dispatch), [actionCreator]);
}
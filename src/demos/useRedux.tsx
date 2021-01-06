import React, { Reducer } from "react";
import { useReducer } from "react";

// TS: https://fettblog.eu/typescript-react/hooks/#usereducer
type StateType = {
    count: number;
}
type ActionType = {
    type: 'decrement' | 'increment' | 'reset';
    payload?: number;
}

function neverReached(_never: never) { }
function reducer(state: StateType, action: ActionType) {
    switch (action.type) {
        case 'increment':
            return { count: state.count + 1 };
        case 'decrement':
            return { count: state.count - 1 };
        case 'reset':
            return { count: action.payload };
        default:
            neverReached(action.type);
            return state;
    }
}
function getInit(initialCount: number) {
    return { count: initialCount + 100 };
}

function DemoUseRedux({ initialCount = 0 }) {
    const [state, dispatch] = useReducer(reducer, initialCount, getInit);
    return (
        <>
            Count: {state.count}
            <br />
            <button
                onClick={() => dispatch({ type: 'reset', payload: initialCount })}
            >
                Reset
            </button>
            <button onClick={() => dispatch({ type: 'decrement' })}>-</button>
            <button onClick={() => dispatch({ type: 'increment' })}>+</button>
        </>
    );
}

export default DemoUseRedux;
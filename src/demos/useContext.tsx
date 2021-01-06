import React, { useContext, useReducer } from "react";

const TodosDispatch = React.createContext(null);

type StateType = {
    count: number;
}
type ActionType = {
    type: 'add';
}

function neverReached(_never: never) { }
function todosReducer(state: StateType, action: ActionType) {
    switch (action.type) {
        case 'add':
            return { count: state.count + 1 };
        default:
            neverReached(action.type);
            return state;
    }
}

function DemoUseContext() {
    // 提示：`dispatch` 不会在重新渲染之间变化
    const [state, dispatch] = useReducer(todosReducer, { count: 0 });

    return (
        <TodosDispatch.Provider value={dispatch}>
            <DeepTree count={state.count} />
        </TodosDispatch.Provider>
    );
}


function DeepTree({ count }: { count: number }) {
    // 如果我们想要执行一个 action，我们可以从 context 中获取 dispatch。
    const dispatch = useContext(TodosDispatch);

    function handleClick() {
        dispatch({ type: 'add' });
    }

    return (
        <>
            { count}
            <button onClick={handleClick}>Add</button>
        </>
    );
}

export default DemoUseContext;
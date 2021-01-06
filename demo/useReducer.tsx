/**
 * @fileoverview 
 * @author liuduan
 * @Date 2021-01-06 16:26:10
 * @LastEditTime 2021-01-06 17:49:17
 */
function useReducer(reducer, initialState) {
    const [state, setState] = useState(initialState);

    function dispatch(action) {
        const nextState = reducer(state, action);
        setState(nextState);
    }

    return [state, dispatch];
}
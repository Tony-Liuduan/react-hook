import React, { FC, useReducer, useState } from 'react';

let a: any[] = [];
let b: any[] = [];

const reducer = () => { };
const getInitState = () => {
    // 只执行一次
    console.log('getInitState');
    return 0
}
const DemoUseState: FC = props => {
    const [count1, setCount1] = useState(0);
    const [count2, setCount2] = useState(getInitState);
    const [store, dispatch] = useReducer(reducer, null);

    a.push(setCount1);
    b.push(dispatch);

    console.log(a[0] === a[1], a[1]); // true
    console.log(b[0] === b[1], b[1]); // true 

    return <>
        count1: {count1}
        <br/>
        count2: {count2}
        <br />
        <button onClick={() => setCount1(count1 + 1)}>增加 count1</button>
        <button onClick={() => setCount2(count2 + 1)}>增加 count2</button>
    </>
}

export default DemoUseState;
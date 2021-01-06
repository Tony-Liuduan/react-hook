import React, { useState } from "react";
import { useMemo } from "react";

function Parent({ a, b, switchMemo }: any) {
    // Only re-rendered if `a` changes:
    const child1 = useMemo(() => {
        console.log('useMemo-a', a);
        return <Child1 a={a} />
    }, [a]);
    // Only re-rendered if `b` changes:
    const child2 = useMemo(() => {
        console.log('useMemo-b', b);
        return <Child2 b={b} />
    }, [b]);

    return switchMemo ?
        <>
            { child1}
            { child2}
        </>
        :
        <>
            <Child1 a={a} />
            <Child2 b={b} />
        </>

}

function Child1({ a }: any) {
    console.log('render child1', a);
    return <div>child1, {a}</div>;
}

function Child2({ b }: any) {
    console.log('render child2', b);
    return <div>child2, {b}</div>;
}


function DemoUseMemo() {
    const [a, setA] = useState(0);
    const [b, setB] = useState(0);
    const [switchMemo, setSwitchMemo] = useState(false);
    return <>
        <Parent a={a} b={b} switchMemo={switchMemo}></Parent>
        <button onClick={() => setA(a + 1)}>改A</button>
        <button onClick={() => setB(b + 1)}>改B</button>
        <hr/>
        <button onClick={() => setSwitchMemo(!switchMemo)}>
            {switchMemo ? '开启' : '关闭'}
            useMemo
        </button >
    </>;
}

export default DemoUseMemo;
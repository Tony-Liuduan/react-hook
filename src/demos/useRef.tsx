import React from 'react';
import { useEffect, useRef, useState } from 'react';

function DemoUseRef() {
    const [count, setCount] = useState(0);

    const prevCountRef = useRef<number>();
    useEffect(() => {
        prevCountRef.current = count;
    });
    const prevCount = prevCountRef.current;

    return <>
        <h1>Now: {count}, before: {prevCount}</h1>
        <button onClick={() => setCount(count + 1)}>+</button>
    </>;
}

export default DemoUseRef;
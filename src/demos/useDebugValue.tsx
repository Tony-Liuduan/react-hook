import React from 'react';
import { useEffect, useState } from 'react';

function useDelayedMessage(msg: string, delay: number) {
    const [message, setMessage] = useState('');
    useEffect(() => {
        setTimeout(() => {
            setMessage(msg);
        }, delay);
    });
    React.useDebugValue(message, (value: string) => {
        console.log(value);
        return '这是改造后的' + value;
    });
    return message;
}

function DemoUseDebugValue() {
    const delayedMessage = useDelayedMessage('foo', 1500);
    return <div>{delayedMessage}</div>;
}

export default DemoUseDebugValue;

import React, { useState } from 'react';
import { useEventCallback } from '../hooks';

const callbackCheckLiset: any[] = [];
function DemoUseEventCallback() {
    const [text, updateText] = useState('');

    const handleSubmit = useEventCallback(() => {
        alert(text);
    }, [text]);

    // 测试 handleSubmit 是否被缓存
    callbackCheckLiset.push(handleSubmit);
    console.log(callbackCheckLiset[0] === callbackCheckLiset[1]); // ref-true, text-false

    return (
        <>
            <input value={text} onChange={e => updateText(e.target.value)} />
            <ExpensiveTree onSubmit={handleSubmit} />
        </>
    );
}

const ExpensiveTree = React.memo(({ onSubmit }: any) => {
    console.log('render ExpensiveTree')
    return <button onClick={onSubmit}>提交</button>
});

export default DemoUseEventCallback;
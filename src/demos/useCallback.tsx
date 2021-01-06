import React, { useCallback, useEffect, useRef, useState } from 'react';

const callbackCheckLiset: any[] = [];
function DemoUseCallback() {
    const [text, updateText] = useState('');

    const textRef = useRef<string>();
    useEffect(() => {
        textRef.current = text; // 把它写入 ref
    });
    const handleSubmit = useCallback(() => {
        const currentText = textRef.current; // 从 ref 读取它
        alert(currentText);
    }, [textRef]); // 不要像 [text] 那样重新创建 handleSubmit

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

export default DemoUseCallback;
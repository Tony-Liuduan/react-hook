/**
 * @fileoverview 
 * @author liuduan
 * @Date 2021-01-06 16:41:11
 * @LastEditTime 2021-01-06 17:05:33
 */
function Form() {
    const [text, updateText] = useState('');
    const textRef = useRef();

    useEffect(() => {
        textRef.current = text; // 把它写入 ref
    });

    const handleSubmit = useCallback(() => {
        const currentText = textRef.current; // 从 ref 读取它 // TODO: 这里用 ref? 
        alert(currentText);
    }, [textRef]); // 不要像 [text] 那样重新创建 handleSubmit

    return (
        <>
            <input value={text} onChange={e => updateText(e.target.value)} />
            <ExpensiveTree onSubmit={handleSubmit} />
        </>
    );
}

// 代替 redux dispatch 优先推荐 dispatch
function Form() {
    const [text, updateText] = useState('');
    // 即便 `text` 变了也会被记住:
    const handleSubmit = useEventCallback(() => {
        alert(text);
    }, [text]);

    return (
        <>
            <input value={text} onChange={e => updateText(e.target.value)} />
            <ExpensiveTree onSubmit={handleSubmit} />
        </>
    );
}

function useEventCallback(fn, dependencies) {
    const ref = useRef(() => {
        throw new Error('Cannot call an event handler while rendering.');
    });

    useEffect(() => {
        ref.current = fn;
    }, [fn, ...dependencies]);

    return useCallback(() => {
        const fn = ref.current;
        return fn();
    }, [ref]);
}
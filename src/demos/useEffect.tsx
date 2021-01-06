import React, {
    useState,
    useEffect,
    FC,
    useLayoutEffect,
} from 'react';

let couter = 1;
let renderCounter = 1;

const DemoUseEffect: FC = () => {
    const [count1, setCount1] = useState(0);
    const [count2, setCount2] = useState(0);
    const [count3, setCount3] = useState(0);
    const [count4, setCount4] = useState(0);

    useEffect(() => {
        // 这里的 state 都是最新的
        console.log(couter++, 'didMout ~ count value is:', [count1, count2, count3, count4]);
        return () => {
            // 类似 unMount, 整个组件卸载时执行，比如路由跳转
            // 这里的数据拿到的上一轮的触发此 useEffect 的state, 
            // 原因：因为当 effect 执行时，我们会创建一个闭包，并将 count 的值被保存在该闭包当中，所以一直是上一次实行effect时的state
            console.log(couter++, 'unMount ~ count value is:', [count1, count2, count3, count4]);
        }
    }, []);

    useEffect(() => {
        // 这里的 state 都是最新的
        console.log(couter++, 'didMout/didUpdate with dependencies ~ count value is:', [count1, count2, count3, count4]);
        return () => {
            // 类似 unMount, 整个组件卸载时执行，比如路由跳转
            // 类似 willUpdate, 但是区别是这里是在render后执行 (render 后 didUpdate 前执行)
            // 这里的数据拿到的上一轮的触发此 useEffect 的state
            console.log(couter++, 'unMount || (after render && befor didUpdate) with dependencies ~ count value is:', [count1, count2, count3, count4]);
        }
    }, [count1]);

    useEffect(() => {
        // 这里的 state 都是最新的
        console.log(couter++, 'didMout/didUpdate no dependencies ~ count1 value is:', [count1, count2, count3, count4]);
        console.log(`\n~~~~~~~~~~~~~~~~~本轮渲染结束 - ${renderCounter++}~~~~~~~~~~~~~~~~~\n`);
        couter = 1;
        return () => {
            // 类似 unMount, 整个组件卸载时执行，比如路由跳转
            // 类似 willUpdate, 但是区别是这里是在render后执行 (render 后 didUpdate 前执行)
            // 这里的数据拿到的上一轮的触发此 useEffect 的state
            // 每次渲染都会执行清除阶段回调设计原因：避免之前的订阅依赖props，而props更新需要重新触发订阅，减少了在didUpdate中逻辑处理 <https://zh-hans.reactjs.org/docs/hooks-effect.html>
            console.log(couter++, 'unMount || (after render && befor didUpdate) no dependencies ~ count1 value is:', [count1, count2, count3, count4]);
        }
    });

    useLayoutEffect(() => {
        // 执行时机：render之后，unMount 之前
        // 同步执行
        // 这里的state是最新的
        // 不推荐使用，优先使用 useEffect
        //  useLayoutEffect 与 componentDidMount、componentDidUpdate 的调用阶段是一样的
        console.log(couter++, 'useLayoutEffect ~ count value is:', [count1, count2, count3, count4]);
        return () => {
            console.log(couter++, 'useLayoutEffect callback ~ count value is:', [count1, count2, count3, count4]);
        }
    });

    // 🔴 Bug 演示
    useEffect(() => {
        const timer = setInterval(() => {
            // setCount4(count4 + 1); // ❎ 这个 effect 依赖于 `count` state
            // setCount4(c => c + 1); // ✅ 这是解决方案1， 方案2，添加依赖 coute4l, 这里推荐方案1，减少setInterval重置
        }, 1000);
        return () => clearInterval(timer);
    }, []); // 🔴 Bug: `count` 没有被指定为依赖

    function addAll() {
        // 批处理演示
        console.log(couter++, 'before add-count-all ~ count value is:', [count1, count2, count3, count4]);
        setCount1(count1 + 1);
        setCount2(count2 + 1);
        setTimeout(() => {
            setCount3(count3 + 1);
        }, 0);
        setTimeout(() => {
            setCount4(count4 + 1);
        }, 0);
        console.log(couter++, 'after add-count-all ~ count value is:', [count1, count2, count3, count4]);
    }

    function addCount1() {
        console.log(couter++, 'before addCount1 ~ count value is:', [count1, count2, count3, count4]);
        setCount1(count1 + 1);
        console.log(couter++, 'after addCount1 ~ count value is:', [count1, count2, count3, count4]);
    }

    function addCount2() {
        setTimeout(() => {
            // 这里 setCount2 会变为同步操作，内部会将 state 放入到闭包中
            console.log(couter++, 'before addCount2 ~ count value is:', [count1, count2, count3, count4]);
            setCount2(c => c + 1);
            console.log(couter++, 'after addCount2 ~ count value is:', [count1, count2, count3, count4]);
        }, 0);
    }

    console.log(`\n_________________本轮渲染开始 - ${renderCounter}_________________\n`)
    // 这里的 state 都是最新的
    console.log(couter++, 'render ~ count value is:', [count1, count2, count3, count4]);

    return (
        <>
            <h1>React.useEffect</h1>
            <button onClick={addAll}>add-count-all</button>
            <br />
            <br />
            <button onClick={addCount1}>add-count-1</button>
            <br />
            <br />
            <button onClick={addCount2}>add-count-2</button>
            <br />
            <br />
            <p>count1: {count1}</p>
            <p>count2: {count2}</p>
            <p>count3: {count3}</p>
            <p>count4: {count4}</p>
        </>
    )
}


export default DemoUseEffect;
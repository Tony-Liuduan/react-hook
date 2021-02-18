# react-hook

> https://juejin.cn/post/6844904165500518414

## 1.hook & class 差异
* 更新一个 state 变量，我们会 替换 它的值。这和 class 中的 this.setState 不一样，后者会把更新后的字段 合并 入对象中

## 2.hook 优点
* 没有 this 实例，不用再 bind 了
* 能覆盖大部分常用 class 组件生命周期哦
* 复用，逻辑方便复用，自定义 hook， 解决在组件之间复用状态逻辑很难问题
* 生命周期，可以放在一起了，不用拆分写

## 3.hook 缺点
* 无 getSnapshotBeforeUpdate，getDerivedStateFromError 和 componentDidCatch 生命周期的 Hook 等价写法
* 生态没有 class 完善
* 学习成本

## 4. 生态
- React Redux 从 v7.1.0 开始支持 Hook API 并暴露了 useDispatch 和 useSelector 等 hook （TODO: 需要继续调研）
- React Router 从 v5.1 开始支持 hook。
- 提供了一个 ESLint 插件 来强制 Hook 规范 以避免 Bug


## 5.class迁移到hook
constructor：useState
componentDidMount, componentDidUpdate, componentWillUnmount：useEffect
render：函数组件体本身
shouldComponentUpdate：memo

## 6.API
* useState
    - 官方推荐把 state 切分成多个 state 变量，每个变量包含的不同值会在同时发生变化，理由：useState是替换非合并
    - 拆分 state 这使得后期把一些相关的逻辑抽取到一个自定义 Hook 变得容易
    - 在 effect 中，如果没有依赖，又要改变state
        ```jsx
        useEffect(() => {
            const id = setInterval(() => {
                // setCount(count + 1);// ❎ 这个 effect 依赖于 `count` state
                setCount(c => c + 1);  // ✅ 在这不依赖于外部的 `count` 变量
            }, 1000);
            intervalRef.current = id;
            return () => clearInterval(id);
        }, []);
        ```
    - 只在首次渲染调用函数
        ```jsx
        // ❎ createRows() 每次渲染都会被调用
        // const [rows, setRows] = useState(createRows(props.count));
        
        // ✅ createRows() 只会在首次渲染时调用这个函数
        const [rows, setRows] = useState(() => createRows(props.count));
        ```
* useEffect
    - 把函数移动到useEffect内部，方便监控依赖
* useContext
    - 搭配 createContext 服用
    ```jsx
    const TodosDispatch = React.createContext(null);

    function TodosApp() {
      // 提示：`dispatch` 不会在重新渲染之间变化
      const [todos, dispatch] = useReducer(todosReducer);

      return (
        <TodosDispatch.Provider value={dispatch}>
          <DeepTree todos={todos} />
        </TodosDispatch.Provider>
      );
    }

    function DeepChild(props) {
      // 如果我们想要执行一个 action，我们可以从 context 中获取 dispatch。
      const dispatch = useContext(TodosDispatch);

      function handleClick() {
        dispatch({ type: 'add', text: 'hello' });
      }

      return (
        <button onClick={handleClick}>Add todo</button>
      );
    }
    ```
* useReducer
    - 简化版本 by useState
    ```jsx
    function useReducer(reducer, initialState) {
      const [state, setState] = useState(initialState);

      function dispatch(action) {
        const nextState = reducer(state, action);
        setState(nextState);
      }

      return [state, dispatch];
    }
    ```
* useCallback
  - 依赖尽量不使用 state，可以考虑使用ref，见useEventCallback
    ```jsx
    function ProductPage({ productId }) {
        // ✅ 用 useCallback 包裹以避免随渲染发生改变
        const fetchProduct = useCallback(() => {
            // ... Does something with productId ...
        }, [productId]); // ✅ useCallback 的所有依赖都被指定了
        return <ProductDetails fetchProduct={fetchProduct} />;
    }

    function ProductDetails({ fetchProduct }) {
      useEffect(() => {
            fetchProduct();
      }, [fetchProduct]); // ✅ useEffect 的所有依赖都被指定了
      // ...
    }
    ```
* useMemo
    - 传给 useMemo 的函数是在渲染期间运行的。不要在其中做任何你通常不会在渲染期间做的事
    - 不要用 useMemo 来处理副作用，那是 useEffect 的工作
    - useMemo 允许你 记住一次昂贵的计算
        ```jsx
        function Parent({ a, b }) {
          // Only re-rendered if `a` changes:
          const child1 = useMemo(() => <Child1 a={a} />, [a]);
          // Only re-rendered if `b` changes:
          const child2 = useMemo(() => <Child2 b={b} />, [b]);
          return (
            <>
              {child1}
              {child2}
            </>
          )
        }
        ```
* useRef 
    - 最佳实践: 空依赖时异步回调中使用
    - 衍生 usePrevious 能通过 ref.current 获取上一轮的 props 或 state
        ```jsx
        function Counter() {
          const [count, setCount] = useState(0);
          const prevCount = usePrevious(count);
          return <h1>Now: {count}, before: {prevCount}</h1>;
        }

        function usePrevious(value) {
          const ref = useRef();
          useEffect(() => {
            ref.current = value;
          });
          return ref.current;
        }
        ```
    - 用于缓存数据，类似class 的实例变量 this
        ```jsx
        const intervalRef = useRef();
        useEffect(() => {
            const id = setInterval(() => {
                // setCount(count + 1);// ❎ 这个 effect 依赖于 `count` state
                setCount(c => c + 1);  // ✅ 在这不依赖于外部的 `count` 变量
            }, 1000);
            intervalRef.current = id;
            return () => clearInterval(id);
        }, []);
        // 在一个事件处理器中清除这个循环定时器
        function handleCancelClick() {
            clearInterval(intervalRef.current);
        }
        ```
    - 用于 DOM refs
        ```jsx
          const inputEl = useRef(null);
          const onButtonClick = () => {
            // `current` 指向已挂载到 DOM 上的文本输入元素
            inputEl.current.focus();
          };
          return (
            <>
              <input ref={inputEl} type="text" />
              <button onClick={onButtonClick}>Focus the input</button>
            </>
          );
        ```
    - 用于测量 DOM 节点
        ref 是有 callback 的，每当 ref 被附加到一个另一个节点，React 就会调用 callback
        当 ref 是一个对象时它并不会把当前 ref 的值的 变化 通知到我们。
        使用 callback ref 可以确保 即便子组件延迟显示被测量的节点 (比如为了响应一次点击)，我们依然能够在父组件接收到相关的信息，以便更新测量结果
        
        ```jsx
        // 在此示例中，当且仅当组件挂载和卸载时，callback ref 才会被调用
        function MeasureExample() {
          const [rect, ref] = useClientRect();
          return (
            <>
              <h1 ref={ref}>Hello, world</h1>
              {rect !== null &&
                <h2>The above header is {Math.round(rect.height)}px tall</h2>
              }
            </>
          );
        }

        function useClientRect() {
          const [rect, setRect] = useState(null);
          const ref = useCallback(node => {
            if (node !== null) {
              setRect(node.getBoundingClientRect());
            }
          }, []);
          return [rect, ref];
        }
        ```
* useImperativeHandle
    - 暴露一些命令式的方法给父组件 ref 调用
    搭配 React.forwardRef 服用
    ```jsx
    // 子组件
    function FancyInput(props, ref) {
      const inputRef = useRef();
      useImperativeHandle(ref, () => ({
        focus: () => {
          inputRef.current.focus();
        }
      }));
      return <input ref={inputRef} ... />;
    }
    FancyInput = React.forwardRef(FancyInput);

    // 父组件
    const ref = React.createRef()
    <FancyInput ref={inputRef} />
    // 父组件调用focus方法
    ref.current.focus()
    // 也可以直接把父组件ref定义到子组件dom的ref属性上，这样父组件 ref.current 将直接指向子组件 DOM 元素实例
    ```
* useLayoutEffect
* useForceUpdate
    ```jsx
    const [ignored, forceUpdate] = useReducer(x => x + 1, 0);
    function handleClick() {
        forceUpdate();
    }
    ```


## 7.需要关注依赖的 hook
> 依赖变量应该在 state / prop / ref 上
* useEffect
* useMemo
* useCallback
* useImperativeHandle
* useLayoutEffect

## 8. 性能
### 8.1 React.memo VS PureComponent
- React.memo  用于实现 PureComponent

```jsx
const Button = React.memo((props) => {
  // 你的组件
});
```

* React.memo 只比较 props， React.memo 不比较 state，而 PureComponent 还有 state
* React.memo 可以指定第二个参数（比较函数），比较函数来比较新旧 props。如果函数返回 true，就会跳过更新

### 8.2 useMemo VS useCallback
- useCallback(fn, deps) 相当于 useMemo(() => fn, deps)
- useMemo 用于缓存 prop 上传递的对象、变量等，或者缓存渲染用组件，渲染组件A只依赖a属性，渲染组件B只依赖b属性
- useCallback 用于缓存 prop 上传递的 callback

### 8.3 useState 惰性创建
```jsx
// ❎ createRows() 每次渲染都会被调用
// const [rows, setRows] = useState(createRows(props.count));

// ✅ createRows() 只会在首次渲染时调用这个函数
const [rows, setRows] = useState(() => createRows(props.count));
```

### 8.4 避免向下传递回调函数
- 在大型的组件树中，我们推荐的替代方案是通过 context 用 useReducer 往下传一个 `dispatch` 函数
- `dispatch` 不会在重新渲染之间变化，dispatch context 永远不会变，因此组件通过读取它就不需要重新渲染了
- 如果要通过context传递 state，建议和 dispatch context 区分开，使用2个context  TODO: 没懂 ？？

```jsx
const TodosDispatch = React.createContext(null);

function TodosApp() {
  // 提示：`dispatch` 不会在重新渲染之间变化
  const [todos, dispatch] = useReducer(todosReducer);

  return (
    <TodosDispatch.Provider value={dispatch}>
      <DeepTree todos={todos} />
    </TodosDispatch.Provider>
  );
}
```

## 9.常见小坑

1. 死循环
    - 依赖处理
2. 变量获取错误
    - ref
    - setState callback


import { useForceUpdate, usePrevious } from '../hooks';
import React, {
    FC,
    useState,
} from 'react';

let renderCounter = 0

const DemoUseForceUpdate: FC = () => {
    const [count, setCount] = useState(0);
    const forceUpdate = useForceUpdate();

    return <>
        <h1>render counter: {renderCounter++}</h1>
        <h1>count: {count}</h1>
        <button onClick={() => setCount(count + 1)}>add count</button>
        <button onClick={() => forceUpdate()}>force render</button>
    </>;
}

export default DemoUseForceUpdate;

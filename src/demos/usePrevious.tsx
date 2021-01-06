import { usePrevious } from '../hooks';
import React, {
    FC,
    useState,
} from 'react';

const DemoUsePrevious: FC = () => {
    const [count, setCount] = useState(0);
    const prevCount = usePrevious(count);

    return <>
        <h1>Now: {count}, before: {prevCount}</h1>
        <button onClick={() => setCount(count + 1)}>add count</button>
    </>;
}

export default DemoUsePrevious;

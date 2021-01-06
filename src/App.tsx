
import React, { FC } from 'react';
import {
    Redirect,
    Route,
    Switch
} from 'react-router-dom';
import Layout from './components/Layout';
import DemoUseCallback from './demos/useCallback';
import DemoUseContext from './demos/useContext';
import DemoUseEffect from './demos/useEffect';
import DemoUseEventCallback from './demos/useEventCallback';
import DemoUseForceUpdate from './demos/useForceUpdate';
import DemoUseMemo from './demos/useMemo';
import DemoUsePrevious from './demos/usePrevious';
import DemoUseRedux from './demos/useRedux';
import DemoUseRef from './demos/useRef';
import DemoUseState from './demos/useState';
import DemoUseClientRect from './demos/useClientRect';
import DemoUseImperativeHandle from './demos/useImperativeHandle';
import DemoUseDebugValue from './demos/useDebugValue';

const App: FC = props => {
    return <Layout>
        <Switch>
            <Route path='/demo/use/state' component={DemoUseState} />
            <Route path='/demo/use/effect' component={DemoUseEffect} />
            <Route path='/demo/use/ref' component={DemoUseRef} />
            <Route path='/demo/use/previous' component={DemoUsePrevious} />
            <Route path='/demo/use/force-update' component={DemoUseForceUpdate} />
            <Route path='/demo/use/redux' component={DemoUseRedux} />
            <Route path='/demo/use/context' component={DemoUseContext} />
            <Route path='/demo/use/memo' component={DemoUseMemo} />
            <Route path='/demo/use/callback' component={DemoUseCallback} />
            <Route path='/demo/use/event-callback' component={DemoUseEventCallback} />
            <Route path='/demo/use/client-rect' component={DemoUseClientRect} />
            <Route path='/demo/use/imperative-handle' component={DemoUseImperativeHandle} />
            <Route path='/demo/use/debug-value' component={DemoUseDebugValue} />
            <Redirect to={{ pathname: '/demo/use/state' }} />
        </Switch>
    </Layout>
};

export default App;

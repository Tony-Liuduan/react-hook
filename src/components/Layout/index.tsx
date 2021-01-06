import React, { FC } from 'react';
import {
    Link,
    useLocation
} from 'react-router-dom';
import { Layout, Menu } from 'antd';

const { Content, Footer, Sider } = Layout;

const LayoutComponent: FC = props => {
    const location = useLocation();
    return <Layout style={{ height: '100vh' }}>
        <Sider>
            <Menu theme="dark" mode="inline" defaultSelectedKeys={[location.pathname || '/demo/use/state']}>
                <Menu.Item key="/demo/use/state">
                    <Link to='/demo/use/state'>demo/useState</Link>
                </Menu.Item>
                <Menu.Item key="/demo/use/effect">
                    <Link to='/demo/use/effect'>demo/useEffect</Link>
                </Menu.Item>
                <Menu.Item key="/demo/use/ref">
                    <Link to='/demo/use/ref'>demo/useRef</Link>
                </Menu.Item>
                <Menu.Item key="/demo/use/previous">
                    <Link to='/demo/use/previous'>demo/usePrevious</Link>
                </Menu.Item>
                <Menu.Item key="/demo/use/force-update">
                    <Link to='/demo/use/force-update'>demo/useForceUpdate</Link>
                </Menu.Item>
                <Menu.Item key="/demo/use/redux">
                    <Link to='/demo/use/redux'>demo/useRedux</Link>
                </Menu.Item>
                <Menu.Item key="/demo/use/context">
                    <Link to='/demo/use/context'>demo/useContext</Link>
                </Menu.Item>
                <Menu.Item key="/demo/use/memo">
                    <Link to='/demo/use/memo'>demo/useMemo</Link>
                </Menu.Item>
                <Menu.Item key="/demo/use/callback">
                    <Link to='/demo/use/callback'>demo/useCallback</Link>
                </Menu.Item>
                <Menu.Item key="/demo/use/event-callback">
                    <Link to='/demo/use/event-callback'>demo/useEventCallback</Link>
                </Menu.Item>
                <Menu.Item key="/demo/use/client-rect">
                    <Link to='/demo/use/client-rect'>demo/useClienRect</Link>
                </Menu.Item>
                <Menu.Item key="/demo/use/imperative-handle">
                    <Link to='/demo/use/imperative-handle'>demo/useImperativeHandle</Link>
                </Menu.Item>
                <Menu.Item key="/demo/use/debug-value">
                    <Link to='/demo/use/debug-value'>demo/useDebugValue</Link>
                </Menu.Item>
            </Menu>
        </Sider>
        <Layout>
            <Content style={{ padding: '24px 50px', backgroundColor: '#fff' }}>
                {props.children}
            </Content>
            <Footer style={{ textAlign: 'center' }}>探索 react-hook</Footer>
        </Layout>
    </Layout >
}

export default LayoutComponent;
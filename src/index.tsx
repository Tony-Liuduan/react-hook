import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/lib/locale/zh_CN';
import App from './App';
import 'antd/dist/antd.css';

ReactDOM.render(
    <ConfigProvider locale={zhCN}>
        <BrowserRouter basename='/'>
            <Switch>
                <Route component={App} />
            </Switch>
        </BrowserRouter>
    </ConfigProvider>,
    document.getElementById('root'),
);

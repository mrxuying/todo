import React from 'react';
import ReactDOM from 'react-dom/client';
import {ConfigProvider} from 'antd'
import zhCN from 'antd/locale/zh_CN'
import {Provider} from 'react-redux'

import Task from './views/Task'
import './index.less'
import store from './store'

//在入口通过Provider将redux对象通过props提供给子组件使用
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ConfigProvider locale={zhCN}>
    <Provider store={store}>
      <Task />
    </Provider>
  </ConfigProvider>
);

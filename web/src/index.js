import React from 'react';
import ReactDOM from 'react-dom';
//
import Root from 'pages/Root';
import store from './store';
import * as axiosClient from './utils/api/axiosClient';
import './styles/app.scss';
import 'antd/dist/antd.css';

const { NODE_ENV, API_URL, API_VERSION } = process.env || {};
const MOUNT_NODE = document.getElementById('root');

if (NODE_ENV !== 'production') {
  if (module.hot) {
    module.hot.accept();
  }
}

axiosClient.init({ store, API_URL, API_VERSION });
ReactDOM.render(<Root store={store} />, MOUNT_NODE);

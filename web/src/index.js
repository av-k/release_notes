import React from 'react';
import ReactDOM from 'react-dom';
//
import Root from 'pages/Root';
import store from './store';
import * as axiosClient from './utils/api/axiosClient';
import ENV from '@environment';
import './styles/app.scss';
import 'antd/dist/antd.css';
import 'react-toastify/dist/ReactToastify.css';

const { NODE_ENV, API_HOST, API_PORT, API_VERSION } = ENV;
const MOUNT_NODE = document.getElementById('root');

if (NODE_ENV !== 'production') {
  if (module.hot) {
    module.hot.accept();
  }
}

axiosClient.init({ store, API_HOST, API_PORT, API_VERSION });
ReactDOM.render(<Root store={store} />, MOUNT_NODE);

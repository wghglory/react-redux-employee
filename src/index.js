/*eslint-disable import/default */
import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import configureStore from './store/configureStore';
// 项目入口文件

import { Provider } from 'react-redux';
import RouteWrapper from './routes';
import { loadEmployees } from './actions/employeeActions';
import { loadDepartments } from './actions/departmentActions';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/toastr/build/toastr.min.css';
import './styles/styles.scss';

const store = configureStore();
store.dispatch(loadEmployees());
store.dispatch(loadDepartments());

render(
  <Provider store={store}>
    <RouteWrapper />
  </Provider>,
  document.getElementById('app')
);

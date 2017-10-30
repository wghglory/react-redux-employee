// 项目路由文件
import React from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './components/home/HomePage';
import AboutPage from './components/about/AboutPage';
import EmployeesPage from './containers/employee/EmployeesPage';
import ManageEmployeePage from './containers/employee/ManageEmployeePage'; //eslint-disable-line import/no-named-as-default

// 使用 BrowserRouter url 比 hashRouter 好，SEO 也好
const RouteWrapper = () => (
  <BrowserRouter>
    <Layout>
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/employees" component={EmployeesPage} />
        <Route path="/employee" exact component={ManageEmployeePage} />
        <Route path="/employee/:id" component={ManageEmployeePage} />
        <Route path="/about" component={AboutPage} />
      </Switch>
    </Layout>
  </BrowserRouter>
);

export default RouteWrapper;

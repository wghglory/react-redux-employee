import React from 'react';
import { PropTypes } from 'prop-types';
import { NavLink } from 'react-router-dom';
import LoadingDots from './LoadingDots';

const Header = ({ loading }) => {
  return (
    <nav>
      <NavLink to="/" exact activeClassName="active">
        首页
      </NavLink>
      {' | '}
      <NavLink to="/employees" activeClassName="active">
        员工
      </NavLink>
      {' | '}
      <NavLink to="/about" activeClassName="active">
        关于
      </NavLink>
      {loading && <LoadingDots interval={100} dots={20} />}
    </nav>
  );
};

Header.propTypes = {
  loading: PropTypes.bool.isRequired
};

export default Header;

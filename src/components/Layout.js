// 布局模板
import React from 'react';
import { PropTypes } from 'prop-types';
import Header from './common/Header';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

class Layout extends React.Component {
  render() {
    return (
      <div className="container-fluid">
        <Header
          loading={this.props.loading}
          path={this.props.children.props.path /*this props force re-render of header on each route change*/}
        />
        {this.props.children}
      </div>
    );
  }
}

Layout.propTypes = {
  children: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired
};

function mapStateToProps(state) {
  return {
    loading: state.ajaxCallsInProgress > 0
  };
}

export default withRouter(connect(mapStateToProps)(Layout));

import React from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as employeeActions from '../../actions/employeeActions';
import EmployeeList from '../../components/employee/EmployeeList';

class EmployeesPage extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.redirectToAddEmployeePage = this.redirectToAddEmployeePage.bind(this);
  }

  employeeRow(employee, index) {
    return <div key={index}>{employee.title}</div>;
  }

  redirectToAddEmployeePage() {
    this.props.history.push('/employee');
  }

  render() {
    const { employees } = this.props;

    return (
      <div>
        <h1>员工列表</h1>
        <input type="submit" value="添加员工" className="btn btn-primary" onClick={this.redirectToAddEmployeePage} />
        <EmployeeList employees={employees} />
      </div>
    );
  }
}

EmployeesPage.propTypes = {
  employees: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
  history: PropTypes.object
};

function mapStateToProps(state) {
  return {
    employees: state.employees
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(employeeActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(EmployeesPage);

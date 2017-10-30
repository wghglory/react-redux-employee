import React from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as employeeActions from '../../actions/employeeActions';
import EmployeeForm from '../../components/employee/EmployeeForm';
import { departmentsFormattedForDropdown } from '../../selectors/selectors';
import toastr from 'toastr';

export class ManageEmployeePage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      employee: Object.assign({}, props.employee),
      errors: {},
      saving: false
    };

    this.updateEmployeeState = this.updateEmployeeState.bind(this);
    this.saveEmployee = this.saveEmployee.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.employee.id != nextProps.employee.id) {
      this.setState({ employee: Object.assign({}, nextProps.employee) });
    }
  }

  updateEmployeeState(event) {
    const field = event.target.name;
    let employee = Object.assign({}, this.state.employee);
    employee[field] = event.target.value;
    return this.setState({ employee: employee });
  }

  employeeFormIsValid() {
    let formIsValid = true;
    let errors = {};

    if (this.state.employee.title.length < 4) {
      errors.title = 'Title 必须超过 4 个文字';
      formIsValid = false;
    }

    this.setState({ errors: errors });
    return formIsValid;
  }

  saveEmployee(event) {
    event.preventDefault();

    if (!this.employeeFormIsValid()) {
      return;
    }

    this.setState({ saving: true });

    this.props.actions.saveEmployee(this.state.employee).then(() => this.redirect()).catch((error) => {
      toastr.error(error);
      this.setState({ saving: false });
    });
  }

  redirect() {
    this.setState({ saving: false });
    toastr.success('Employee saved');
    this.props.history.push('/employees');
  }

  render() {
    return (
      <EmployeeForm
        allDepartments={this.props.departments}
        onChange={this.updateEmployeeState}
        onSave={this.saveEmployee}
        employee={this.state.employee}
        errors={this.state.errors}
        saving={this.state.saving}
      />
    );
  }
}

ManageEmployeePage.propTypes = {
  employee: PropTypes.object.isRequired,
  departments: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
  history: PropTypes.object
};

//Pull in the React Router context so router is available on this.context.router.
ManageEmployeePage.contextTypes = {
  router: PropTypes.object
};

function getEmployeeById(employees, id) {
  const employee = employees.filter((employee) => employee.id == id);
  if (employee) return employee[0];
  return null;
}

function mapStateToProps(state, ownProps) {
  const employeeId = ownProps.match.params.id; // from the path `/employee/:id`

  let employee = { id: '', name: '', title: '', departmentId: '' };

  if (employeeId && state.employees.length > 0) {
    employee = getEmployeeById(state.employees, employeeId);
  }

  return {
    employee: employee,
    departments: departmentsFormattedForDropdown(state.departments)
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(employeeActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageEmployeePage);

import React from 'react';
import { PropTypes } from 'prop-types';
import { Link } from 'react-router-dom';

const EmployeeListRow = ({ employee }) => {
  return (
    <tr>
      <td>
        <Link to={'/employee/' + employee.id}>{employee.name}</Link>
      </td>
      <td>{employee.title}</td>
      <td>{employee.departmentId}</td>
    </tr>
  );
};

EmployeeListRow.propTypes = {
  employee: PropTypes.object.isRequired
};

export default EmployeeListRow;

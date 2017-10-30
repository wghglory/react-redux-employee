import React from 'react';
import { PropTypes } from 'prop-types';
import EmployeeListRow from './EmployeeListRow';

const EmployeeList = ({ employees }) => {
  return (
    <table className="table">
      <thead>
        <tr>
          <th>名字</th>
          <th>职位</th>
          <th>部门ID</th>
        </tr>
      </thead>
      <tbody>{employees.map((employee) => <EmployeeListRow key={employee.id} employee={employee} />)}</tbody>
    </table>
  );
};

EmployeeList.propTypes = {
  employees: PropTypes.array.isRequired
};

export default EmployeeList;

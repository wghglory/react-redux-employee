import React from 'react';
import { PropTypes } from 'prop-types';
import TextInput from '../common/TextInput';
import SelectInput from '../common/SelectInput';

const EmployeeForm = ({ employee, allDepartments, onSave, onChange, saving, errors }) => {
  return (
    <form>
      <h1>员工管理</h1>
      <TextInput name="name" label="姓名" value={employee.name} onChange={onChange} error={errors.name} />

      <TextInput name="title" label="职位" value={employee.title} onChange={onChange} error={errors.title} />

      <SelectInput
        name="departmentId"
        label="部门"
        value={employee.departmentId}
        defaultOption="选择部门"
        options={allDepartments}
        onChange={onChange}
        error={errors.departmentId}
      />

      <input
        type="submit"
        disabled={saving}
        value={saving ? 'Saving...' : 'Save'}
        className="btn btn-primary"
        onClick={onSave}
      />
    </form>
  );
};

EmployeeForm.propTypes = {
  employee: PropTypes.object.isRequired,
  allDepartments: PropTypes.array,
  onSave: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  saving: PropTypes.bool,
  errors: PropTypes.object
};

export default EmployeeForm;

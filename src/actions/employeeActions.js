/**
 * actions 文件夹包含各种 actionCreator，返回 object。当然也可能需要配合 thunk 去增强 store 返回 function
 */

import * as types from '../constants/actionTypes';
import employeeApi from '../api/mockEmployeeApi';
import { beginAjaxCall, ajaxCallError } from './ajaxStatusActions';

export function loadEmployeesSuccess(employees) {
  return { type: types.LOAD_EMPLOYEES_SUCCESS, employees };
}

export function createEmployeeSuccess(employee) {
  return { type: types.CREATE_EMPLOYEE_SUCCESS, employee };
}

export function updateEmployeeSuccess(employee) {
  return { type: types.UPDATE_EMPLOYEE_SUCCESS, employee };
}

export function loadEmployees() {
  return function(dispatch) {
    dispatch(beginAjaxCall());
    return employeeApi
      .getAllEmployees()
      .then((employees) => {
        dispatch(loadEmployeesSuccess(employees));
      })
      .catch((error) => {
        throw error;
      });
  };
}

export function saveEmployee(employee) {
  return function(dispatch) {
    dispatch(beginAjaxCall());
    return employeeApi
      .saveEmployee(employee)
      .then((employee) => {
        employee.id ? dispatch(updateEmployeeSuccess(employee)) : dispatch(createEmployeeSuccess(employee));
      })
      .catch((error) => {
        dispatch(ajaxCallError(error));
        throw error;
      });
  };
}

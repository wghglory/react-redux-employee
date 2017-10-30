import * as types from '../constants/actionTypes';
import initialState from './initialState';

export default function employeeReducer(state = initialState.employees, action) {
  switch (action.type) {
    case types.LOAD_EMPLOYEES_SUCCESS:
      return action.employees;

    case types.CREATE_EMPLOYEE_SUCCESS:
      return [...state, Object.assign({}, action.employee)];

    case types.UPDATE_EMPLOYEE_SUCCESS:
      return [...state.filter((employee) => employee.id !== action.employee.id), Object.assign({}, action.employee)];

    default:
      return state;
  }
}

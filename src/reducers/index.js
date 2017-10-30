// root reducer, 合并其他 reducers
import { combineReducers } from 'redux';
import employees from './employeeReducer';
import departments from './departmentReducer';
import ajaxCallsInProgress from './ajaxStatusReducer';

const rootReducer = combineReducers({
  employees,
  departments,
  ajaxCallsInProgress
});

export default rootReducer;

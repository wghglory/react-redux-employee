/**
 * actions 文件夹包含各种 actionCreator，返回 object。当然也可能需要配合 thunk 去增强 store 返回 function
 */

import DepartmentApi from '../api/mockDepartmentApi';
import * as types from '../constants/actionTypes';
import { beginAjaxCall } from './ajaxStatusActions';

export function loadDepartmentsSuccess(departments) {
  return { type: types.LOAD_DEPARTMENTS_SUCCESS, departments };
}

export function loadDepartments() {
  return (dispatch) => {
    dispatch(beginAjaxCall());
    return DepartmentApi.getAllDepartments()
      .then((departments) => {
        dispatch(loadDepartmentsSuccess(departments));
      })
      .catch((error) => {
        throw error;
      });
  };
}

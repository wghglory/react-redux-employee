/**
 * actions 文件夹包含各种 actionCreator，返回 object。当然也可能需要配合 thunk 去增强 store 返回 function
 */

import * as types from '../constants/actionTypes';

export function beginAjaxCall() {
  return { type: types.BEGIN_AJAX_CALL };
}

export function ajaxCallError() {
  return { type: types.AJAX_CALL_ERROR };
}

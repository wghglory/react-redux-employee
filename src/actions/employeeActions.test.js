import expect from 'expect';
import * as employeeActions from './employeeActions';
import * as types from '../constants/actionTypes';

import thunk from 'redux-thunk';
import nock from 'nock';
import configureMockStore from 'redux-mock-store';

// 同步测试
describe('员工 Actions', () => {
  describe('createEmployeeSuccess', () => {
    it('创建新员工 CREATE_EMPLOYEE_SUCCESS ', () => {
      //arrange
      const employee = { id: 5, title: 'hello' };
      const expectedAction = {
        type: types.CREATE_EMPLOYEE_SUCCESS,
        employee: employee
      };

      //act
      const action = employeeActions.createEmployeeSuccess(employee);

      //assert
      expect(action).toEqual(expectedAction);
    });
  });
});

const middleware = [thunk];
const mockStore = configureMockStore(middleware);

describe('Async Actions', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('加载员工  BEGIN_AJAX_CALL 和 LOAD_EMPLOYEES_SUCCESS ', (done) => {
    const expectedActions = [
      { type: types.BEGIN_AJAX_CALL },
      { type: types.LOAD_EMPLOYEES_SUCCESS, body: { employees: [{ id: 2, title: 'xxx' }] } }
    ];

    const store = mockStore({ employees: [] }, expectedActions, done);
    store.dispatch(employeeActions.loadEmployees()).then(() => {
      const actions = store.getActions();
      expect(actions[0].type).toEqual(types.BEGIN_AJAX_CALL);
      expect(actions[1].type).toEqual(types.LOAD_EMPLOYEES_SUCCESS);
      done();
    });
  });
});

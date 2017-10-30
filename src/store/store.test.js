import expect from 'expect';
import { createStore } from 'redux';
import rootReducer from '../reducers';
import initialState from '../reducers/initialState';
import * as employeeActions from '../actions/employeeActions';

describe('Store', function() {
  it('测试新增员工', function() {
    // arrange
    const store = createStore(rootReducer, initialState);
    const employee = {
      title: 'xx'
    };

    // act
    const action = employeeActions.createEmployeeSuccess(employee);
    store.dispatch(action);

    // assert
    const actual = store.getState().employees[0];
    const expected = {
      title: 'xx'
    };

    expect(actual).toEqual(expected);
  });
});

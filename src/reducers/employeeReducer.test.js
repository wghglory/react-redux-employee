import expect from 'expect';
import employeeReducer from './employeeReducer';
import * as actions from '../actions/employeeActions';

describe('Employee Reducer', () => {
  it('dispatch CREATE_EMPLOYEE_SUCCESS 新增员工', () => {
    // arrange
    const initialState = [{ title: 'A' }, { title: 'B' }];

    const newEmployee = { title: 'C' };

    const action = actions.createEmployeeSuccess(newEmployee);

    //act
    const newState = employeeReducer(initialState, action);

    //assert
    expect(newState.length).toEqual(3);
    expect(newState[0].title).toEqual('A');
    expect(newState[1].title).toEqual('B');
    expect(newState[2].title).toEqual('C');
  });

  it('更新员工 UPDATE_EMPLOYEE_SUCCESS', () => {
    // arrange
    const initialState = [{ id: 'A', title: 'A' }, { id: 'B', title: 'B' }, { id: 'C', title: 'C' }];

    const employee = { id: 'B', title: 'New Title' };
    const action = actions.updateEmployeeSuccess(employee);

    // act
    const newState = employeeReducer(initialState, action);
    const updatedEmployee = newState.find((a) => a.id == employee.id);
    const untouchedEmployee = newState.find((a) => a.id == 'A');

    // assert
    expect(updatedEmployee.title).toEqual('New Title');
    expect(untouchedEmployee.title).toEqual('A');
    expect(newState.length).toEqual(3);
  });
});

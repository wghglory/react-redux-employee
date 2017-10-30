import expect from 'expect';
import React from 'react';
import { shallow } from 'enzyme';
// import ReactTestUtils from 'react-dom/test-utils';
import EmployeeForm from './EmployeeForm';

function setup(saving) {
  const props = {
    employee: {},
    saving: saving,
    errors: {},
    onSave: () => {},
    onChange: () => {}
  };

  return shallow(<EmployeeForm {...props} />);
}

describe('EmployeeForm 使用 Enzyme', () => {
  it('renders form and h1', () => {
    const wrapper = setup(false);
    expect(wrapper.find('form').length).toBe(1);
    expect(wrapper.find('h1').text()).toEqual('员工管理');
  });

  it('保存按钮 is Save when not saving', () => {
    const wrapper = setup(false);
    expect(wrapper.find('input').props().value).toBe('Save');
  });

  it('保存按钮 is Saving... when saving', () => {
    const wrapper = setup(true);
    expect(wrapper.find('input').props().value).toBe('Saving...');
  });
});

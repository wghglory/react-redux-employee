import React from 'react';
import expect from 'expect';
import { mount } from 'enzyme';
import { ManageEmployeePage } from './ManageEmployeePage';

describe('员工管理', () => {
  it('保存空 title 报错', () => {
    const props = {
      departments: [],
      actions: {
        saveEmployee: () => {
          return Promise.resolve();
        }
      },
      employee: { id: '', name: '', title: '', departmentId: '' }
    };

    const wrapper = mount(<ManageEmployeePage {...props} />);
    const saveButton = wrapper.find('input').last();
    expect(saveButton.prop('type')).toBe('submit');
    saveButton.simulate('click');
    expect(wrapper.state().errors.title).toBe('Title 必须超过 4 个文字');
  });
});

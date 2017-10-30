import expect from 'expect';
import React from 'react';
// import ReactTestUtils from 'react-dom/test-utils';
import ShallowRenderer from 'react-test-renderer/shallow'; // https://reactjs.org/docs/shallow-renderer.html
import EmployeeForm from './EmployeeForm';

function setup(saving) {
  let props = {
    employee: {},
    saving: saving,
    errors: {},
    onSave: () => {},
    onChange: () => {}
  };

  let renderer = new ShallowRenderer();
  renderer.render(<EmployeeForm {...props} />);
  let output = renderer.getRenderOutput();

  return {
    props,
    output,
    renderer
  };
}

describe('EmployeeForm 使用 React Test Utils', () => {
  it('renders form and h1', () => {
    const { output } = setup();
    expect(output.type).toBe('form');
    let [h1] = output.props.children;
    expect(h1.type).toBe('h1');
  });

  it('保存按钮 is Save when not saving', () => {
    const { output } = setup(false);
    const submitButton = output.props.children[4];
    expect(submitButton.props.value).toBe('Save');
  });

  it('保存按钮 is Saving... when saving', () => {
    const { output } = setup(true);
    const submitButton = output.props.children[4];
    expect(submitButton.props.value).toBe('Saving...');
  });
});

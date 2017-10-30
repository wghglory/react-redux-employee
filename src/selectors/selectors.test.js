import expect from 'expect';
import { departmentsFormattedForDropdown } from './selectors';

describe('Department Selectors', () => {
  describe('departmentsFormattedForDropdown', () => {
    it('下拉列表输出文字格式化', () => {
      const departments = [{ id: 1, name: 'Wang' }, { id: 2, name: 'Peter' }];

      const expected = [{ value: 1, text: 'Wang' }, { value: 2, text: 'Peter' }];

      expect(departmentsFormattedForDropdown(departments)).toEqual(expected);
    });
  });
});

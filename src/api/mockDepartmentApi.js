import delay from './delay';

// 用 setTimeout 模拟异步请求的延迟
// 返回 promise
const departments = [
  {
    id: 1,
    name: '事业部'
  },
  {
    id: 2,
    name: '运营部'
  },
  {
    id: 3,
    name: '销售部'
  }
];

const generateId = (department) => {
  return department.name.toLowerCase();
};

class DepartmentApi {
  static getAllDepartments() {
    /* eslint-disable no-unused-vars */
    return new Promise((resolve, reject) => {
      //
      setTimeout(() => {
        resolve(Object.assign([], departments));
      }, delay);
    });
  }

  static saveDepartment(department) {
    department = Object.assign({}, department); // 不可变性
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // 模拟 server-side validation
        const minDepartmentNameLength = 3;
        if (department.name.length < minDepartmentNameLength) {
          reject(`部门名称至少 ${minDepartmentNameLength} 个文字.`);
        }

        if (department.id) {
          const existingDepartmentIndex = departments.findIndex((a) => a.id == department.id);
          departments.splice(existingDepartmentIndex, 1, department);
        } else {
          // 模拟创建新的部门
          department.id = generateId(department);
          departments.push(department);
        }

        resolve(department);
      }, delay);
    });
  }

  static deleteDepartment(departmentId) {
    /* eslint-disable no-unused-vars */
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const indexOfDepartmentToDelete = departments.findIndex((department) => {
          return department.departmentId == departmentId;
        });
        departments.splice(indexOfDepartmentToDelete, 1);
        resolve();
      }, delay);
    });
  }
}

export default DepartmentApi;

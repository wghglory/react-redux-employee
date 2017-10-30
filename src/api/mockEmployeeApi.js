import delay from './delay';

const employees = [
  {
    id: 1,
    title: 'HR',
    departmentId: 1,
    name: 'Guanghui Wang'
  },
  {
    id: 2,
    title: 'boss',
    departmentId: 2,
    name: 'Peter'
  },
  {
    id: 3,
    title: 'lead',
    departmentId: 3,
    name: 'Jordan'
  },
  {
    id: 4,
    title: '大哥',
    departmentId: 3,
    name: '乔峰'
  },
  {
    id: 5,
    title: '凤凰',
    departmentId: 2,
    name: '陈小春'
  }
];

function replaceAll(str, find, replace) {
  return str.replace(new RegExp(find, 'g'), replace);
}

// 假设 id 根据 name 做，实际项目不可能这样。这里也可以用 uid 处理
const generateId = (employee) => {
  return replaceAll(employee.name, ' ', '-');
};

class EmployeeApi {
  static getAllEmployees() {
    /* eslint-disable no-unused-vars */
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(Object.assign([], employees));
      }, delay);
    });
  }

  static saveEmployee(employee) {
    employee = Object.assign({}, employee);
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // 模拟 server-side validation
        const minEmployeeTitleLength = 4;
        if (employee.title.length < minEmployeeTitleLength) {
          reject(`Title 至少 ${minEmployeeTitleLength} 个文字.`);
        }

        if (employee.id) {
          const existingEmployeeIndex = employees.findIndex((a) => a.id == employee.id);
          employees.splice(existingEmployeeIndex, 1, employee);
        } else {
          employee.id = generateId(employee);
          employees.push(employee);
        }

        resolve(employee);
      }, delay);
    });
  }

  static deleteEmployee(employeeId) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const indexOfEmployeeToDelete = employees.findIndex((employee) => {
          return employee.employeeId == employeeId;
        });
        employees.splice(indexOfEmployeeToDelete, 1);
        resolve();
      }, delay);
    });
  }
}

export default EmployeeApi;

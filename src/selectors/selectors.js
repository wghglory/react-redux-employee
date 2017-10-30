/**
 * mapStateToProps, mapDispatchToProps 中的负责计算放到这儿。也可以使用库 reselect。
 */
export function departmentsFormattedForDropdown(departments) {
  return departments.map((department) => {
    return {
      value: department.id,
      text: department.name
    };
  });
}

/**
 * 解析模板字符串
 * @author 欧怼怼
 * @param template {string}
 * @param data {object}
 * @return {*}
 */
function render(template, data) {
  const reg = /\$\{(\w+)\}/; // 模板字符串占位符正则

  // 判断字符串里是否存在占位符
  if (reg.test(template)) {
    // 获取第一个占位符包含的变量名
    const expression = reg.exec(template)[1];
    // 替换为data里的数据
    // 如果对应数据为复杂类型，replace函数会执行 toString 操作
    template = template.replace(reg, data[expression]);
    // 递归调用，继续查找下一个占位符
    return render(template, data);
  }

  // 返回结果
  return template;
}

module.exports = render;

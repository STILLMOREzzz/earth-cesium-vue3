/**
 * @Author: STILLMOREzzz
 * @Date: 2022-12-06
 * @Description: components配置
 * @LastEditors: STILLMOREzzz
 * @LastEditTime: 2022-12-06
 * @FilePath: ztm-earth-vue3/src/components/index.js
 */
export function setupGlobalCom(app) {
  // Dynamic injection modules
  const modulesGlob = import.meta.globEager("./*/index.*");
  Object.keys(modulesGlob).map((key) => {
    // 使用文件夹名称作为comp key
    const compKey = key.split("/")[1];
    app.component(compKey, modulesGlob[key].default);
  });
  /**
   * 对Array对象添加扩展方法；
   *  n:所要删除数组元素的下标值；
   * 通过slice方法截取n之前和n之后的元素，在通过concat方法组成个新数组返回；
   */
  Array.prototype.arrDel = function (n) {
    if (n < 0) {
      return this;
    } else {
      return this.slice(0, n).concat(this.slice(n + 1, this.length));
    }
  };
}

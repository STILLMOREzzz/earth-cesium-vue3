/**
 * @Author: STILLMOREzzz
 * @Date: 2022-12-06
 * @Description: 指令配置
 * @LastEditors: STILLMOREzzz
 * @LastEditTime: 2022-12-31 18:55
 * @FilePath: ztm-earth-vue3/src/utils/directive/index.js
 */
import directObj from "./directiveConf";

export function setupDirective(app) {
  app.directive("cust-drag-dialog", {
    mounted(el, bindings, vnode, preVnode) {
      const domDragContainer = el.firstElementChild.firstElementChild;
      directObj.bind(domDragContainer);
      directObj.update(domDragContainer, bindings);
    }
  });
  /**
   * 增加指令来使窗口可拖拽，
   * DragButton 参数是窗口内头部标题 鼠标左键安装头部标题可拖动 填写类名
   * DragVindow 参数是窗口主体类名
   * custom:true 在自定义窗口时 默认居中显示
   * <div v-dragMove="{DragButton:'.window-header',DragVindow:'.window', custom:true}">
   *     <div class="window">
   *       <div class="window-header" >
   *         按住拖拽 标题
   *       </div>
   *     </div>
   *   </div>
   */
  app.directive("dragMove", (el, binding) => {
    // body当前宽度
    const screenWidth = document.body.clientWidth;
    // body高度
    const screenHeight = document.documentElement.clientHeight;
    // 拖拽按钮
    const DragButton = el.querySelector(binding.value.DragButton);
    DragButton.style.cssText += ";cursor:move;";
    // 拖拽窗口 DragVindow
    const DragVindow = el.querySelector(binding.value.DragVindow);
    // 如果是自定义组件 设置窗口默认居中
    if (binding.value.custom) {
      const [left, top] = [
        screenWidth - DragVindow.offsetWidth,
        screenHeight - DragVindow.offsetHeight
      ];
      DragVindow.style.cssText += `;left:${left / 2}px;top:${top / 2}px;`;
    }
    const sty = (function () {
      if (window.document.currentStyle) {
        return (dom, attr) => dom.currentStyle[attr];
      } else {
        return (dom, attr) => getComputedStyle(dom, false)[attr];
      }
    })();

    // 按下鼠标处理事件
    DragButton.onmousedown = (e) => {
      // 鼠标按下，计算当前元素距离可视区的距离
      const disX = e.clientX - DragButton.offsetLeft;
      const disY = e.clientY - DragButton.offsetTop;

      const dragDomWidth = DragVindow.offsetWidth; // 对话框宽度
      const dragDomheight = DragVindow.offsetHeight; // 对话框高度

      const minDragDomLeft = DragVindow.offsetLeft;
      const maxDragDomLeft = screenWidth - DragVindow.offsetLeft - dragDomWidth;

      const minDragDomTop = DragVindow.offsetTop;
      const maxDragDomTop = screenHeight - DragVindow.offsetTop - dragDomheight;

      let styL = sty(DragVindow, "left");
      let styT = sty(DragVindow, "top");
      if (styL.includes("%")) {
        styL = +document.body.clientWidth * (+styL.replace(/%/g, "") / 100);
        styT = +document.body.clientHeight * (+styT.replace(/%/g, "") / 100);
      } else {
        styL = +styL.replace(/px/g, "");
        styT = +styT.replace(/px/g, "");
      }
      document.onmousemove = (e) => {
        // 通过事件委托，计算移动的距离
        let left = e.clientX - disX;
        let top = e.clientY - disY;

        // 边界处理
        if (-left > minDragDomLeft) {
          left = -minDragDomLeft;
        } else if (left > maxDragDomLeft) {
          left = maxDragDomLeft;
        }

        if (-top > minDragDomTop) {
          top = -minDragDomTop;
        } else if (top > maxDragDomTop) {
          top = maxDragDomTop;
        }
        // 设置当前元素
        DragVindow.style.cssText += `;left:${left + styL}px;top:${top + styT}px;`;
      };
      document.onmouseup = () => {
        document.onmousemove = null;
        document.onmouseup = null;
      };
    };
  });
}

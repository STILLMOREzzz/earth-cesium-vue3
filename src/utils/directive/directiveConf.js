/**
 * @Author: STILLMOREzzz
 * @Date: 2022-12-08
 * @Description: 在标签上添加指令,可使标签可移动
 * @LastEditors: STILLMOREzzz
 * @LastEditTime: 2022-12-08
 * @FilePath: ztm-earth-vue3/src/hooks/useMousePosition.js
 */
export default {
  bind(el) {
    // 弹窗的容器
    let dialogHeaderEl = el.querySelector(".el-dialog__header");
    const dragDom = el;
    dialogHeaderEl.style.cssText += ";cursor:move;";
    const getStyle = (function () {
      if (window.document.currentStyle) {
        return (dom, attr) => dom.currentStyle[attr];
      } else {
        return (dom, attr) => getComputedStyle(dom, null)[attr];
      }
    })();

    dialogHeaderEl.onmousedown = (e) => {
      // 鼠标按下，计算当前元素距离可视区的距离
      const disX = e.clientX - dialogHeaderEl.offsetLeft;
      const disY = e.clientY - dialogHeaderEl.offsetTop;

      const dragDomWidth = dragDom.offsetWidth;
      const dragDomHeight = dragDom.offsetHeight;

      const screenWidth = document.body.clientWidth;
      const screenHeight = document.body.clientHeight;

      const minDragDomLeft = dragDom.offsetLeft;
      const maxDragDomLeft = screenWidth - dragDom.offsetLeft - dragDomWidth;

      const minDragDomTop = dragDom.offsetTop;
      const maxDragDomTop = screenHeight - dragDom.offsetTop - dragDomHeight;

      // 获取到的值带px 正则匹配替换
      let styL = getStyle(dragDom, "left");
      let styT = getStyle(dragDom, "top");

      if (styL.includes("%")) {
        styL = +document.body.clientWidth * (+styL.replace(/\%/g, "") / 100);
        styT = +document.body.clientHeight * (+styT.replace(/\%/g, "") / 100);
      } else {
        styL = +styL.replace(/\px/g, "");
        styT = +styT.replace(/\px/g, "");
      }

      document.onmousemove = function (e) {
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

        // 移动当前元素
        const cText = `;left:${left + styL}px;top:${top + styT}px;`;
        dragDom.style.cssText += cText;
        dragDom.setAttribute("data-pos", cText);
        // emit onDrag event
        // vnode.child.$emit('dragDialog');
      };

      document.onmouseup = function (e) {
        document.onmousemove = null;
        document.onmouseup = null;
      };
    };
  },
  update(el, binding) {
    if (!binding.value) {
      const pos = el.getAttribute("data-pos");
      if (pos) el.style.cssText += pos;
    } else {
      el.style.cssText += `;left:0px;top:0px;`;
    }
  }
};

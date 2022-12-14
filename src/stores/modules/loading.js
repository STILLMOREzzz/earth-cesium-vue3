/**
 * @Author: STILLMOREzzz
 * @Date: 2022-12-07
 * @Description: 缓冲存储
 * @LastEditors: STILLMOREzzz
 * @LastEditTime: 2022-12-10 18:09
 * @FilePath: ztm-earth-vue3/src/stores/modules/loading.js
 */
import { defineStore } from "pinia";
import { store } from "@/stores";

export const useLoadingStore = defineStore({
  id: "app",
  state: () => ({
    pageLoading: true
  }),
  getters: {
    getPageLoading() {
      return this.pageLoading;
    }
  },
  actions: {
    setPageLoading(loading) {
      this.pageLoading = loading;
    }
  }
});

// 可以在setup外使用
export function useLoadingStoreWithOut() {
  return useLoadingStore(store);
}

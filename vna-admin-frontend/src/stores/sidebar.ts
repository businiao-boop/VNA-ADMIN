// components/TabsView/useTabsStore.ts
import { defineStore } from 'pinia';
import type { RouteLocationNormalized } from 'vue-router';
import type { TabType } from '@/types/router';


export const useTabsStore = defineStore('tabs', {
  state: () => ({
    tabs: [
      {
        path: "/",
        fullPath: "/",
        name: "/",
        meta: {
          menuName: "首页"
        },
      }
    ] as TabType[],
  }),
  actions: {

    addTab(route: RouteLocationNormalized) {
      const tab: TabType = {
        meta: route.meta,
        path: route.path,
        fullPath: route.fullPath,
        name: route.name,
      };

      if (!this.tabs.find(t => t.fullPath === tab.fullPath)) {
        this.tabs.push(tab);
      }
    },

    removeTab(fullPath: string) {

      const idx = this.tabs.findIndex(tab => tab.fullPath === fullPath);

      if (idx !== -1) {
        this.tabs.splice(idx, 1);
      }
      // const tab = this.tabs[idx - 1] || this.tabs[idx + 1];
      // return tab;
    },


    clearTabs() {
      this.tabs = [];
    },
  },
});


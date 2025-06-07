<script setup lang="ts">
defineOptions({
  name: "Header",
});
import Menu from "../menu/index.vue";

import { useUserStore } from "@/stores/user";
import ThemeDrawer from "@/layout/themeDrawer/index.vue"

const userStore = useUserStore();
const checked = ref(false);
const open = ref(false);
const onSettings = () => {
  open.value = true
};
console.log(userStore.routes,"routes");

</script>
<template>
  <div class="header">
    <Menu :menus="userStore.routes" />
    <div class="header-right">
      <y-switch v-model="checked"></y-switch>
      <y-icon icon="icon-31shezhi" @click="onSettings"></y-icon>
      <ThemeDrawer v-model="open"></ThemeDrawer>
    </div>
  </div>
</template>

<style scoped lang="scss">
.header{
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .header-right{
        line-height: normal;
        display: flex;
        .icon-31shezhi{
          margin-left: 10px;
          transition: transform 1s;
          &:hover{
              transform: rotate(90deg);
            }
        }
      }
    }
</style>

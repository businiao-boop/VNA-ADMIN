<script setup lang="ts">
import Dialog from "@/views/core/menu/editModal.vue"
import {useFormModal} from "@/hooks/modal";
const form = {a:1,b:2}
const openModal = () => {
  const showModal = useFormModal({title:"提示",width:1500})
  showModal(Dialog,{modalValue:form}).then(data=>{
    console.log(data,"data");
  })
}
import { applyTheme } from "@/utils/theme";

const theme = reactive({
  primary: "#ff6f91",
  background: "#f9f871",
  text: "#2e2e2e",
});

  applyTheme(theme);
</script>
<template>
  <div class="home">
    <a-button @click="openModal">tishi</a-button>
  </div>
</template>

<style scoped lang="scss">
.home{
  width: 100px;
  height: 100px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  background-color: var(--color-primary);
}
</style>

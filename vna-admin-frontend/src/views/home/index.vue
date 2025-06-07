<script setup lang="ts">
import Dialog from "@/views/core/menu/editModal.vue"
import {useFormModal} from "@/hooks/modal";
const form = {a:1,b:2}
import { applyTheme } from "@/utils/theme";

const theme = reactive({
  primary: "red",
  background: "#f9f871",
  text: "#2e2e2e",
});
const openModal = () => {
  const showModal = useFormModal({title:"提示",width:1500})
  showModal(Dialog,{modalValue:form}).then(data=>{
    console.log(data,"data");
  })
}

  
</script>
<template>
  <div class="home">
    <div class="btn-wrapper">
      <a-button @click="openModal">tishi</a-button>
    </div>

  </div>
</template>

<style scoped lang="scss">
.home{
  height:100%;
.btn-wrapper{
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
}
}
</style>

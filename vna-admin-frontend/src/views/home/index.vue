<script setup lang="tsx">
import Dialog from "@/views/core/menu/editModal.vue"
import {useFormModal} from "@/hooks/modal";
const form = {a:1,b:2}
const openModal = () => {
  const showModal = useFormModal()
  showModal(Dialog,{modalValue:form}).then(data=>{
    console.log(data,"data");
  })
}
</script>
<template>
  <div class="home">
    <a-button @click="openModal">tishi</a-button>
  </div>
</template>

<style scoped lang="scss">
.home{
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%)
}
</style>

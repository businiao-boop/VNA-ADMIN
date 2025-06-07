<script setup lang="ts">

defineOptions({
  name: "EditModal",
});
const props = defineProps({
  modalValue: { type: Object, default: ()=>{} },
  menus:{type: Array, default: ()=>[]}
});
const emit = defineEmits([ "ok"]);
const rules = {
  name: [{ required: true, message: "请输入角色名称", trigger: "blur" }],

}

const title = computed(() => (props.modalValue.id ? "修改角色" : "添加角色"));
const formRef = ref();
function ok(){
  formRef.value.validate().then(()=>{
    emit("ok");
  })
}
</script>

<template>
  <y-modal :open="true" @ok="ok" :title="title" class="edit-modal-wrapper">
    <a-form ref="formRef" :model="modalValue" layout="vertical" :rules="rules">
      <a-form-item label="角色名称" name="name">
        <a-input v-model:value="modalValue.name" placeholder="请输入角色名称" />
      </a-form-item>
      <a-form-item label="状态" name="status">
        <y-switch v-model="modalValue.status"></y-switch>
      </a-form-item>
      <a-form-item label="角色描述" name="remark">
        <a-input v-model:value="modalValue.remark" />
      </a-form-item>

    </a-form>
  </y-modal>
</template>

<style scoped lang="scss">
.edit-modal-wrapper {
  
}
</style>
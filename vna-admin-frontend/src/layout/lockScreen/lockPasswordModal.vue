<script setup lang="ts">
defineOptions({
  name: "LockPassword",
});
const emit = defineEmits(["ok","close"]);
defineProps({
  modalValue: {
    type: Object,
    default: ()=>({}),
  },
})

const formData = reactive({
  lockPassword: "",
});

const close = () => {
  emit("close");
}
const ok = () => {
  emit("ok",formData);
}

</script>

<template>
  <y-modal :open="true" title="锁屏密码" width="300px" :center="true">
    <template #title>
      <div class="title">请输入锁屏密码</div>
    </template>
    <a-form :model="formData">
      <a-form-item name="lockPassword">
        <a-input v-model:value="formData.lockPassword"></a-input>
      </a-form-item>
    </a-form>
    <template #footer>
      <a-button @click="close">取消</a-button>
      <a-button type="primary" @click="ok">确定</a-button>
    </template>
  </y-modal>
</template>

<style scoped lang="scss">
.compoent-wrapper {
  
}
</style>
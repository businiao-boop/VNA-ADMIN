<script setup lang="ts">
defineOptions({
  name: "EditModal",
});
import { computed, reactive, toRefs, watch } from "vue";
import { RoleType } from "@/types/modules/role.type";
import type {UserType} from "@/types/modules/user.type";
const props = withDefaults(defineProps<{
  modalValue: UserType
  roleList:RoleType[]
}>(), {
  roleList:()=>([])
});
const emit = defineEmits([ "ok"]);
const  formRef = ref();
const title = computed(() => (props.modalValue.id ? "修改信息" : "创建用户"));
const rules = {
  username: [{ required: true, message: "请输入名称", trigger: "blur" }],
}
function ok(){
  formRef.value.validate().then(()=>{
    emit("ok");
  })
}
</script>

<template>
  <y-modal :title="title" @ok="ok">
    <a-form ref="formRef" :model="modalValue" layout="vertical" :rules="rules">
      <a-form-item label="名称" name="username">
        <a-input v-model:value="modalValue.username" placeholder="请输入角色名称" />
      </a-form-item>
      <a-form-item label="昵称" name="nickname">
        <a-input v-model:value="modalValue.nickname" placeholder="请输入角色名称" />
      </a-form-item>
      <a-form-item label="密码" name="password">
        <a-input-password
            v-model:value="modalValue.password"
            placeholder="请输入密码"
          />
      </a-form-item>
      <a-form-item label="角色" name="roleIds">
        <y-select v-model="modalValue.roleIds" mode="multiple">
          <a-select-option v-for="item in roleList" :value="item.id">{{ item.name }}</a-select-option>
        </y-select>
      </a-form-item>
    </a-form>
  </y-modal>
</template>

<style scoped lang="scss">
</style>
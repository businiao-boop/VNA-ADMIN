<script setup lang="ts">
defineOptions({
  name: "YSwitch",
});

// 只处理 v-model 绑定的值
const props = defineProps<{
  modelValue: boolean;
}>();

const emit = defineEmits(["update:modelValue"]);

// 建立双向绑定
const value = computed({
  get: () => props.modelValue,
  set: (val) => emit("update:modelValue", val),
});
</script>

<template>
  <div class="y-switcher-wrapper">
    <a-switch v-model:checked="value" v-bind="$attrs" />
  </div>
</template>

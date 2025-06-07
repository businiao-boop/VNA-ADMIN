<script setup lang="ts">
defineOptions({
  name: "YSelectEnum",
});
import enums, { EnumsType } from "@/constants/enums"
const props = withDefaults(defineProps<{
  modelValue: string | string[] | number | number[],
  enum: EnumsType
}>(), {
  modelValue: "",
  enum: "layoutEnum"
});
const emit = defineEmits(["update:modelValue", "change"]);
const options = enums[props.enum];
const value = computed({
  get() {
    return props.modelValue
  },
  set(val) {
    emit("update:modelValue", val)
  }
})

function onChange(val: any) {
  const item = options.find(item => item.value === val);
  emit("change", { row: item, value: val, label: item?.label })
}

</script>

<template>
  <div class="y-enum-select-wrapper">
    <a-select ref="select" v-model:value="value" @change="onChange">
      <a-select-option v-for="item in options" :key="item.value" :value="item.value">{{ item.label }}</a-select-option>
    </a-select>
  </div>
</template>

<style scoped lang="scss">
.y-enum-select-wrapper {}
</style>
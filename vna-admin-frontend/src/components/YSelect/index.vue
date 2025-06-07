<script setup lang="ts">
defineOptions({
  name: "YSelect",
});
const props = withDefaults(defineProps<{
  modelValue: string | string[] | number | number[],
}>(), {
  modelValue: "",
});
const emit = defineEmits(["update:modelValue", "change"]);
const value = computed({
  get() {
    return props.modelValue
  },
  set(val) {
    emit("update:modelValue", val)
  }
})

function onChange(val: any) {
  emit("change")
}

</script>

<template>
  <div class="y-select-wrapper">
    <a-select v-model:value="value" @change="onChange" v-bind="$attrs">
      <slot>
      </slot>
    </a-select>
  </div>
</template>

<style scoped lang="scss">
.y-select-wrapper {}
</style>
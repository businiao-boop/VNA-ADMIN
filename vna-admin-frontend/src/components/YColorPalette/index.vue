<script setup lang="ts">
defineOptions({
  name: "YColorPalette",
});
import { Sketch ,Chrome} from '@ckpack/vue-color'
import type { Payload } from '@ckpack/vue-color'
const props = defineProps<{
  modelValue: string
}>()
const emit = defineEmits(['update:modelValue',"change"])
const color = computed({
  get() {
    return props.modelValue || '#fff';
  },
  set(value:Payload) {
    emit('update:modelValue', value.hex8);
    emit('change', value);
  }
})
</script>

<template>
  <div class="y-color-palette-wrapper">
    <Chrome v-model="color" />
  </div>
</template>

<style scoped lang="scss">
.y-color-palette-wrapper {
  
}
</style>
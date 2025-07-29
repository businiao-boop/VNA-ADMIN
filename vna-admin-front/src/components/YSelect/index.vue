<template>
  <a-select v-model:value="selectedValue" :placeholder="placeholder" :options="actualOptions" :disabled="disabled"
    :loading="loading" :allow-clear="allowClear" :show-search="showSearch" :filter-option="filterOption" :mode="mode"
    @change="handleChange">
    <template v-if="$slots.option" #option="option">
      <slot name="option" :option="option"></slot>
    </template>
  </a-select>
</template>

<script setup>
import { computed } from 'vue';
import OPTIONS from '@/constants/options';

const props = defineProps({
  modelValue: {
    type: [String, Number, Boolean, Array],
    default: undefined
  },
  /**
   * 选项数组或选项key
   * 可以是数组：[{ label: '选项1', value: 'value1' }]
   * 也可以是字符串：'MENU_TYPE'（从OPTIONS对象中获取）
   */
  options: {
    type: [Array, String],
    default: () => []
  },
  placeholder: {
    type: String,
    default: '请选择'
  },
  disabled: {
    type: Boolean,
    default: false
  },
  loading: {
    type: Boolean,
    default: false
  },
  allowClear: {
    type: Boolean,
    default: true
  },
  showSearch: {
    type: Boolean,
    default: false
  },
  filterOption: {
    type: [Boolean, Function],
    default: true
  },
  mode: {
    type: String,
    default: undefined
  }
});

const emit = defineEmits(['update:modelValue', 'change']);

// 计算实际的选项数组
const actualOptions = computed(() => {
  if (typeof props.options === 'string') {
    return OPTIONS[props.options] || [];
  }
  return props.options;
});

const selectedValue = computed({
  get: () => props.modelValue,
  set: (value) => {
    emit('update:modelValue', value);
  }
});

const handleChange = (value, option) => {
  emit('change', value, option);
};
</script>

<style scoped>
:deep(.ant-select) {
  width: 100%;
}
</style>
<!-- FormWrapper.vue -->
<script setup lang="ts">
import { useSlots, defineProps } from "vue";
import type { Component } from "vue";
interface FormWrapperProps {
  component: Component;
  modalValue: any;
  [key: string]: any;
}
const props = defineProps<FormWrapperProps>();

const slots = useSlots();
console.log(slots, "slots");
</script>

<template>
  <component
    :is="props.component"
    v-bind="props"
    :modalValue="props.modalValue"
  >
    <template slot="footer">
      <slot name="footer">
        <a-space>
          <a-button>取消</a-button>
          <a-button type="primary">确定</a-button>
        </a-space>
      </slot>
    </template>
    <!-- 透传所有插槽 -->
    <!-- <template v-for="(slotFn, name) in slots" #[name]="slotProps">
      <slot :name="name" v-bind="slotProps" />
    </template> -->
  </component>
</template>

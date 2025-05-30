<template>
  <component :is="IconComponent" v-if="IconComponent" />
</template>

<script setup lang="ts">
import * as Icons from "@ant-design/icons-vue";

defineOptions({
  name: "YIcon",
});

const props = defineProps<{
  icon?: string;
}>();

const IconComponent = props.icon
  ? (Icons as Record<string, any>)[props.icon]
  : null;
</script>

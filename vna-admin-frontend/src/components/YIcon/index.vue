<template>
  <i v-if="isIconFont" class="iconfont" :class="component" />
  <component v-else :is="component" />
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import * as Icons from "@ant-design/icons-vue";
import { QuestionCircleOutlined } from "@ant-design/icons-vue";

defineOptions({ name: "YIcon" });

const props = defineProps<{ icon: string }>();

const component = ref<any>(QuestionCircleOutlined); // fallback icon
const isIconFont = ref(true);

const resolveIcon = () => {
  if (props.icon?.includes("icon")) {
    component.value = props.icon;
    isIconFont.value = true;
  } else {
    const found = (Icons as Record<string, any>)[props.icon];
    component.value = found || QuestionCircleOutlined;
    isIconFont.value = false;
  }
};

onMounted(resolveIcon);
watch(() => props.icon, resolveIcon, { immediate: true });
</script>

<style scoped lang="scss">
.iconfont{
  display: inline-block;
  font-size: 24px;
  cursor: pointer;
  
}
</style>

<template>
  <div class="breadcrumb">
    <a-breadcrumb>
      <a-breadcrumb-item v-for="item in routes" :key="item.path">
        <router-link v-if="item.path && !isLast(item)" :to="item.path">
          {{ item.title }}
        </router-link>
        <span v-else>{{ item.title }}</span>
      </a-breadcrumb-item>
    </a-breadcrumb>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router';

const props = defineProps({
  routes: {
    type: Array,
    required: true,
    default: () => []
  }
});

const isLast = (item) => {
  return item.path === props.routes[props.routes.length - 1]?.path;
};
</script>

<style scoped lang="scss">
.breadcrumb {
  :deep(.ant-breadcrumb) {
    font-size: 14px;

    .ant-breadcrumb-link {
      a {
        color: #1890ff;

        &:hover {
          color: #40a9ff;
        }
      }

      span {
        color: #666;
      }
    }

    .ant-breadcrumb-separator {
      color: #999;
    }
  }
}
</style>
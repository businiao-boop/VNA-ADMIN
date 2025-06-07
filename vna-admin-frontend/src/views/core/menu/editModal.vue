<template>
  <div>
    <a-form
      ref="formRef"
      :model="modalValue"
      layout="vertical"
      class="menu-form"
    >
      <!-- 🥇 高优先级：name、path -->
      <a-row :gutter="16">
        <a-col :span="12">
          <a-form-item label="菜单名称" name="name" required>
            <a-input
              v-model:value="modalValue.name"
              placeholder="请输入菜单名称"
            />
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="路径" name="path" required>
            <a-input
              v-model:value="modalValue.path"
              placeholder="请输入路由路径"
            />
          </a-form-item>
        </a-col>
      </a-row>

      <!-- 🥈 中优先级：component、type、parentId -->
      <a-row :gutter="16">
        <a-col :span="12">
          <a-form-item label="菜单类型" name="type" required>
            <!-- <a-select v-model:value="modalValue.type" placeholder="请选择类型">
              <a-select-option value="0">目录</a-select-option>
              <a-select-option value="1">菜单</a-select-option>
              <a-select-option value="2">按钮</a-select-option>
            </a-select> -->
            <y-select-enum v-model="modalValue.type" enum="menuTypeEnum"></y-select-enum>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="父级菜单 ID" name="parentId">
            <a-input-number
              v-model:value="modalValue.parentId"
              placeholder="0 为顶级菜单"
              style="width: 100%"
            />
          </a-form-item>
        </a-col>
      </a-row>

      <!-- 🥈 中优先级：component（仅菜单类型时显示） -->
      <a-form-item v-if="isMenuType" label="组件路径" name="component" required>
        <a-input
          v-model:value="modalValue.component"
          placeholder="views/xxx/index.vue"
        />
      </a-form-item>

      <!-- 🥉 中优先级：sort、icon、layout -->
      <a-row :gutter="16">
        <a-col :span="12">
          <a-form-item label="图标" name="icon">
            <a-input
              v-model:value="modalValue.icon"
              placeholder="Ant Icon 名称"
            />
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="排序" name="sort">
            <a-input-number
              v-model:value="modalValue.sort"
              placeholder="越小越靠前"
              style="width: 100%"
            />
          </a-form-item>
        </a-col>
      </a-row>

      <a-row :gutter="16">
        <a-col :span="12">
          <a-form-item label="布局类型" name="layout">
            <y-select-enum v-model="modalValue.layout" enum="layoutEnum"></y-select-enum>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="权限标识" name="permission">
            <a-input
              v-model:value="modalValue.permission"
              placeholder="system:user:add"
            />
          </a-form-item>
        </a-col>
      </a-row>

      <!-- ⭐ 次优先级：show、keepAlive、isExternal -->
      <a-row :gutter="16">
        <a-col :span="8">
          <a-form-item label="是否显示" name="show">
            <a-switch v-model:checked="modalValue.show" />
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item label="是否缓存" name="keepAlive">
            <a-switch v-model:checked="modalValue.keepAlive" />
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item label="外链菜单" name="isExternal">
            <a-switch v-model:checked="modalValue.isExternal" />
          </a-form-item>
        </a-col>
      </a-row>

      <!-- ❓ 可选字段：externalLink、permission -->
      <a-form-item
        v-if="modalValue.isExternal"
        label="外链地址"
        name="externalLink"
      >
        <a-input
          v-model:value="modalValue.externalLink"
          placeholder="https://example.com"
        />
      </a-form-item>
    </a-form>
  </div>
</template>
<script setup lang="ts">
const props = defineProps({
  modalValue: { type: Object, default: {} },
});

// 判断菜单类型为“菜单”（value === "1"）
const isMenuType = computed(() => props.modalValue.type === "1");
</script>
<style scoped lang="scss"></style>

<script setup lang="ts">
defineOptions({
  name: "YPageLayout",
});
withDefaults(defineProps<{
  mode?: "horizontal" | "vertical";
}>(), {
  mode: "horizontal",
});
</script>

<template>
  <div class="page-layout-wrapper" :class="mode">
    <div class="page-layout-left">
      <div class="page-layout-left-content">
        <slot name="left"></slot>
      </div>
    </div>
    <div class="page-layout-right">
      <div class="page-layout-right-toolbar">
        <div class="page-layout-right-toolbar-content">
          <slot name="toolbar"></slot>
        </div>
      </div>
      <div class="page-layout-right-content">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.page-layout-wrapper {
  display: flex;
  height: 100%;
  @mixin layout-theme(){
    border: 1px solid var(--color-secondary);
    border-radius: 12px;
    background-color: #fff;
  }
  .page-layout-left{
    display: none;
  }
  &.horizontal{
    .page-layout-left{
      display: block;
      width: 20%;
      padding-right: 30px;
      &-content{
        @include layout-theme();
        height: 100%;
        padding: 20px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
      }
    }
    .page-layout-right{
      @include layout-theme();
      display: flex;
      flex-direction: column;
      width: 80%;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
      &-toolbar{
        text-align: right;
        padding: 12px 20px;
        border-bottom: 1px solid #eee;
        // background-color: red;
        border-top-left-radius: 12px;
        border-top-right-radius: 12px;
      }
      &-content{
        padding:  20px;
        flex: 1;
        overflow: hidden;
        overflow-y: auto;
      }
    }
  }
}
</style>
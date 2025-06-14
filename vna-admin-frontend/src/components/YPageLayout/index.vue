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
      <slot></slot>
    </div>
  </div>
</template>

<style scoped lang="scss">
.page-layout-wrapper {
  display: flex;
  height: 100%;
  @mixin layout-theme(){
    border: 1px solid var(--color-secondary);
    border-radius: 10px;
    padding: 20px;
    background-color: #fff;
  }
  .page-layout-left{
    display: none;
  }
  .page-layout-right{
    width: 100%;
    @include layout-theme;
  }
  &.horizontal{
    .page-layout-left{
      display: block;
      width: 20%;
      padding-right: 30px;
      &-content{
        @include layout-theme();
        height: 100%;
      }
    }
    .page-layout-right{
      @include layout-theme();
      width: 80%;
    }
  }
  // .page-layout-left{
  //   max-width: 20%;
  //   padding-right: 30px;
  //   &-content{
  //     height: 100%;
  //     @include  layout-theme;

  //   }
  // }
  // .page-layout-right{
  //   @include  layout-theme;
  //   width: 80%;
  // }
}
</style>
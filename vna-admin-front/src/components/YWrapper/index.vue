<script setup lang="ts">
defineOptions({
  name: "YWrapper",
});

</script>

<template>
  <div class="y-wrapper">
    <!-- <div class="y-wrapper-left">
      <div class="left-content">
        <slot name="left">
          <span class="placeholder"></span>
        </slot>
      </div>
    </div>
    <div class="y-wrapper-right">
      <slot></slot>
    </div> -->
    <a-row>
      <a-col :span="8"></a-col>
      <a-col :span="16"></a-col>
    </a-row>
  </div>
</template>

<style scoped lang="scss">
// .y-wrapper {
//   display: flex;
//   height: 100%;
//   padding: 20px;
//   background-color: #fff;
//   &-left {
//     position: relative;
//     width: 25%;
//     padding-right: 30px;
//     .left-content{
//       // border: 1px solid #ff9671;
//       border-radius: 10px;
//       height: 100%;
//     }
//   }
//   &-left:has(span.placeholder){
//     display: none;
//   }
//   &-right {
//     position: relative;
//     flex: 1;
//     // border: 1px solid #ff9671;
//     border-radius: 10px;
//     overflow: hidden;
//     overflow-y: auto;
//   }
// }
</style>
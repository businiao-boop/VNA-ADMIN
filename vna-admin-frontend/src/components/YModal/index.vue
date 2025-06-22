<script setup lang="ts">
defineOptions({
  name: "YModal",
});
import { ref } from "vue";
const props = defineProps({
  open: {
    type: Boolean,
    default:true
  },
  center:{
    type:Boolean,
    default:false
  },
  width:{
    type:[String , Number],
    default:800
  }
});
const visible = ref(props.open);
import { inject } from 'vue'

const confirm = inject('confirm') as () => void;
const close = inject('close') as () => void;

const ok = () => {
  confirm()
};
const cancel = () => {
  close();
};
</script>
<template>
  <!-- :width="width" -->
  <a-modal :class="center ? 'y-modal-center' : ''" :style="{'--width':width}" :width="width" :open="visible"  v-bind="$attrs"  :maskClosable="false" @cancel="cancel">
    <slot />
    <template #footer>
      <slot name="footer">
        <a-button @click="cancel">取消</a-button>
        <a-button @click="ok">确定</a-button>
      </slot>
    </template>
  </a-modal>
</template>

<style lang="scss">
.y-modal-center{
  height: 100%;
  width: 100% !important;
  margin: 0;
  top: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  >div{
    width: var(--width);
  }
}
</style>

<script setup>
defineOptions({
  name: "UseModal",
});
import { useModal } from '@/hooks/modal/useModal';
import modalView from './modalView.vue';
const { showModal } = useModal()
function handleOpenModal() {
  showModal(modalView)
}
</script>

<template>
  <YWrapper class="use-modal">
    <div class="btn-containe">
      <a-space>
        <a-button @click="handleOpenModal">Open Modal</a-button>
      </a-space>
    </div>
  </YWrapper>
</template>

<style scoped lang="scss">
.use-modal {
  .btn-container {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>
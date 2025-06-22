// composables/useFullscreen.ts
import { ref, onMounted, onUnmounted } from 'vue';

export function useFullscreen() {
  const isFullscreen = ref(false);

  const enter = () => {
    const el = document.documentElement;
    el.requestFullscreen?.();
    (el as any).webkitRequestFullScreen?.();
    (el as any).mozRequestFullScreen?.();
    (el as any).msRequestFullscreen?.();
  };

  const exit = () => {
    document.exitFullscreen?.();
    (document as any).webkitExitFullscreen?.();
    (document as any).mozCancelFullScreen?.();
    (document as any).msExitFullscreen?.();
  };

  const toggle = () => {
    isFullscreen.value ? exit() : enter();
  };

  const handler = () => {
    isFullscreen.value = !!document.fullscreenElement;
  };

  onMounted(() => {
    document.addEventListener('fullscreenchange', handler);
  });

  onUnmounted(() => {
    document.removeEventListener('fullscreenchange', handler);
  });

  return { isFullscreen, enter, exit, toggle };
}

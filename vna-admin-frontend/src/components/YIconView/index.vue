<script setup lang="ts">
defineOptions({
  name: "YIconView",
});
import iconfontJson from "@/assets/iconfont/iconfont.json";

const props = defineProps({
  filterText:{
    type: String,
    default: ''
  },
  showFilter:{
    type: Boolean,
    default: false
  }
})
const emit = defineEmits(["click"])

const icons:any[] = iconfontJson.glyphs || [];
const keywords = ref("");

const filteredIcons = computed(() =>{
  if (!props.filterText && !keywords.value) return icons;
  const keyword = props.filterText || keywords.value
  return icons.filter(i => (i.name.includes(keyword)));
}
  
)

const onClickIcon=(fontClass:string)=>{
  emit("click",'icon-'+fontClass)
}

</script>

<template>
  <div class="y-icon-view">
      <a-input style="margin-bottom: 10px;" v-if="showFilter" v-model:value="keywords" placeholder="搜索图标名称"></a-input>
    <ul class="icon-list">
      <li v-for="icon in filteredIcons"
        :key="icon.font_class"
        :span="4"
        class="text-center mb-4"
        @click="onClickIcon(icon.font_class)">
        <i :class="['iconfont', 'icon-' + icon.font_class]" style="font-size: 24px;" />
        <div class="mt-1 text-sm text-gray-500">{{ icon.name }}
        </div>
      </li>
    </ul>
  </div>
</template>

<style scoped lang="scss">
.y-icon-view {
  padding: 16px;

  ul {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
    gap: 16px;
    padding: 0;
    margin: 0;
    list-style: none;
    &.icon-list { 
      overflow: hidden;
      overflow-y: auto;
    }
  }

  li {
    background: #fff;
    border: 1px solid #f0f0f0;
    border-radius: 8px;
    padding: 12px 8px;
    text-align: center;
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
      border-color: #1890ff;
      box-shadow: 0 2px 8px rgba(24, 144, 255, 0.2);
      transform: translateY(-2px);
    }

    i {
      display: block;
      font-size: 28px;
      color: #555;
      transition: color 0.3s;

      &:hover {
        color: #1890ff;
      }
    }

    .text-sm {
      font-size: 12px;
      color: #999;
      margin-top: 6px;
      word-break: break-all;
    }
  }
}
</style>
<script setup lang="ts">
defineOptions({
  name: "YSelect",
});
const props = withDefaults(defineProps<{
  modelValue: string | string[] | number | number[],
  api?:string,
  requestParams?: Record<string, any>,
  labelField?: string,
  valueField?: string,
}>(), {
  modelValue: "",
  labelField:"name",
  valueField:"id",
});
const emit = defineEmits(["update:modelValue", "change"]);
type OptionType = {
  [key: string]: any;
}
const options = ref<OptionType[]>([]);
const loading = ref(false);
const value = computed({
  get() {
    return props.modelValue
  },
  set(val) {
    emit("update:modelValue", val)
  }
})

function onChange(val: any) {
  emit("change")
}
import axios from "@/utils/request";

async function getData() {
  if(loading.value)return;
  if(!props.api)return
  try {
    loading.value = true;
    const data = await axios({
      url: props.api,
      data:props.requestParams,
    })
    // loading.value = false;
    
    if(data){
      options.value = (data || []) as OptionType[];
    }
  } catch (error) {
    
  }finally{
    loading.value = false;
  }
}

watch(()=>([props.api,props.requestParams]),(n,o)=>{
  getData()
},{
  immediate:true
})

</script>

<template>
  <div class="y-select-wrapper" :class="{'api-select':!!api}">
    <span class="refresh">
      <y-icon @click="getData" :icon="loading ? 'LoadingOutlined' : 'icon-shuaxin'"></y-icon>
    </span>
    <a-select v-model:value="value" @change="onChange" v-bind="$attrs">
      <template v-if="api">
        <slot :scope="{options}">
          <a-select-option v-for="item in options" :key="item[props.valueField]">{{ item[props.labelField] }}</a-select-option>
        </slot>
      </template>
      <template v-else>
        <slot></slot>
      </template>
    </a-select>
  </div>
</template>

<style scoped lang="scss">
.y-select-wrapper{
  .refresh{
    display: none;
  }
  &.api-select {
    position: relative;
    display: flex;
    align-items: center;
    .refresh{
      display: block;
      cursor: pointer;
      position: absolute;
      left: 3px;
      z-index: 1;
      .iconfont{
        font-size: 16px;
        color: var(--color-primary);
      }
    }
    :deep(.ant-select-selector){
      padding-left: 25px;
    }

  }
}
</style>
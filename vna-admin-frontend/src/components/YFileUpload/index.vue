<script setup lang="ts">
defineOptions({
  name: "YFileUpload",
});
import { UploadProps,UploadChangeParam,UploadFile } from "ant-design-vue";
import { UploadRequestOption } from "ant-design-vue/es/vc-upload/interface";
import { message } from "ant-design-vue";
import { uploadSingle } from "@/api/upload";
const props = withDefaults(defineProps<{
  fileSize?: number;// 文件大小限制，单位MB
  fileType?: string[];// 文件类型限制
}>(), {
  fileSize: 10,
  fileType: ()=>["xlsx"]
});
const fileList= ref<UploadFile[]>([]);
const onCustomRequest = (options:UploadRequestOption) => {
  const {file, onSuccess,onProgress, onError} = options;
  uploadSingle(file,(progressEvent) => {
    if(progressEvent){
      const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total!);
      onProgress && onProgress({ percent });
    }
    }).then((res) => {
    onSuccess && onSuccess(res);
  },err=>{
    onError && onError(err);
  });
};
const handleBeforeUpload = (file: any) => {
  if(!file)return false;
  return true;
};
const onChange = (info:UploadChangeParam)=>{
  fileList.value = info.fileList;
}
</script>

<template>
  <div class="y-file-upload">
    <a-upload-dragger
      :multiple="true"
      :beforeUpload="handleBeforeUpload"
      :customRequest="onCustomRequest"
      @change="onChange"
      :fileList="fileList"
    >
    </a-upload-dragger>
  </div>
</template>

<style scoped lang="scss">
.y-file-upload {
  // :deep(.ant-upload-list-item-progress){
  //   .ant-progress-inner{
  //     .ant-progress-bg{
  //       background-image: linear-gradient(to right, rgb(16, 142, 233) 0%, rgb(16, 142, 233) 100%) !important;
  //     }
  //   }
  // }
  // :deep(.ant-upload-list-item-progress:has(.ant-progress-status-success)){
  //   display: block !important;
  // }
  // :deep(.ant-progress-status-success){
  //   .ant-progress-inner{
  //     .ant-progress-bg{
  //       background-image: linear-gradient(to right, rgb(135, 208, 104) 0%, rgb(135, 208, 104) 100%) !important;
  //     }
  //   }
  // }
}
</style>
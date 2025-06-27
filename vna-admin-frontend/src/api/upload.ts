import axios from "@/utils/request";
import { AxiosProgressEvent } from "axios";
export function uploadSingle(file: File | Blob | string, onUploadProgress: (progressEvent: AxiosProgressEvent) => void) {
  const formData = new FormData();
  formData.append("file", file);
  return axios({
    url: "/upload/single",
    method: "POST",
    headers: {
      "Content-Type": "multipart/form-data"
    },
    data: formData,
    onUploadProgress
  })
}
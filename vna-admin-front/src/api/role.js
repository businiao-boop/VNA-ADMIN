import service from "@/utils/request"

export function listRole(data) {
  return service({
    url: "/role/list",
    method: "POST",
    data
  })
}
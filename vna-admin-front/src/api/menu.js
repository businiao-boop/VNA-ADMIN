import service from "@/utils/request"

export function listMenu(data) {
  return service({
    url: "/menu/list",
    method: "POST",
    data
  })
}
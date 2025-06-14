export const columns = [
  {
    title: "名称",
    field: "username",
    visible: true
  },
  {
    title: "昵称",
    field: "nickname",
    visible: true
  },
  {
    title: '操作',
    field: "action",
    visible: true,
    slot: true
  }
]

export const presetFields = {
  id: null,
  username: "",
  password: "",
  roleIds: [],
  nickname: ""
}
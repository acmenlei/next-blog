import moment from "moment"

export const formatTime = (time: string) => {
  return moment(time).format("YYYY-MM-DD HH:mm:ss")
}

// 从当前时间开始计算 天数
export const formatTimeFromNow = (time: string) => {
  return moment(time).fromNow()
}

export const formatCategory = (category: string) => {
  switch (category) {
    case "share":
      return "技术分享"
    case 'live':
      return "生活碎碎念"
    case 'study':
      return "学习笔记"
    default:
      return category;
  }
}
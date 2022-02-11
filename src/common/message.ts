import { message } from "antd"

// 成功信息
export function successMessage(content: string) {
  message.success(content)
}

// 错误信息
export function errorMessage(content: string) {
  message.error(content)
}

// 警告信息
export function warningMessage(content: string) {
  message.warn(content)
}
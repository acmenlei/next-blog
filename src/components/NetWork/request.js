import { requestConfig, PublishMessage,PageConfig } from './requestConfig'
export function getnotedetail(path) {
    return requestConfig(path)
}
export function PostMessage(path,data) {
    return PublishMessage(path,data)
}
export function PageSizeChange(path,parmas) {
    return PageConfig(path,parmas)
}
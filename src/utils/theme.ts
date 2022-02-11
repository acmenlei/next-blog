// 获取当前导航主题颜色
export function getCurrentTheme(color: string) {
  return color === 'light' ? '#456' : '#222';
}

// 获取当前主题字体颜色
export function getCurrentFontColor(color: string) {
  return color === 'light' ? '#2c3e50' : '#ccc'
}

// 获取当前主题的文章卡片背景色
export function getCurrentCardBackground(color: string) {
  return color === 'light' ? 'rgba(255, 255, 255, .8)' : 'rgba(50, 50, 50, .9)'
}

// 改变对应的主题颜色
export function getReflectTheme(color: string) {
  return color === 'light' ? 'dark' : 'light';
}

// 修改留言版的nickname
export function getCurrentNickNameColor(color: string) {
  return color === 'light' ? '#567' : '#999';
}

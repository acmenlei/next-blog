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

export function createLinearColors() {
  (function () {
    function e(e: any, t: any, n: any) {
      return Number(e.getAttribute(t)) || n
    }
    function t() {
      for (
        (r as any).clearRect(0, 0, h, s),
        a = [
          { x: 0, y: 0.7 * s + f },
          { x: 0, y: 0.7 * s - f }
        ];
        a[1].x < h + f;

      )
        n(a[0], a[1])
    }
    function n(e: any, t: any) {
      (r as any).beginPath(), (r as any).moveTo(e.x, e.y), (r as any).lineTo(t.x, t.y)
      var n = t.x + (2 * p() - 0.25) * f,
        o = i(t.y);
      (r as any).lineTo(n, o),
        (r as any).closePath(),
        (m -= x / -50),
        ((r as any).fillStyle =
          '#' +
          (
            ((127 * y(m) + 128) << 16) |
            ((127 * y(m + x / 3) + 128) << 8) |
            (127 * y(m + (x / 3) * 2) + 128)
          ).toString(16)),
        (r as any).fill(),
        (a[0] = a[1]),
        (a[1] = { x: n, y: o })
    }
    function i(e: any): any {
      return (l = e + (2 * p() - 1.1) * f), l > s || l < 0 ? i(e) : l
    }
    var o = document.getElementsByTagName('script'),
      c = o[o.length - 1],
      config = {
        z: e(c, 'zIndex', -98),
        a: e(c, 'alpha', 0.65),
        s: e(c, 'size', 90)
      }
    var a: any,
      l,
      d = document.createElement('canvas'),
      r = d.getContext('2d'),
      g = window.devicePixelRatio || 1,
      h = window.innerWidth,
      s = window.innerHeight,
      f = config.s,
      u = Math,
      m = 0,
      x = 2 * u.PI,
      y = u.cos,
      p = u.random
      ; (d.width = h * g),
        (d.height = s * g),
        (r as any).scale(g, g),
        ((r as any).globalAlpha = config.a),
        (d.style.cssText =
          'opacity: ' +
          config.a +
          ';position:fixed;top:0;left:0;z-index: ' +
          config.z +
          ';width:100%;height:100%;pointer-events:none;'),
        document.getElementsByTagName('body')[0].appendChild(d),
        (document.onclick = t),
        (document.ontouchstart = t),
        t()
  })()
}
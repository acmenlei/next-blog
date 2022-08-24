import { useEffect } from 'react';

export function useKeyBoradEventHook(keyborads: Array<string> | string, handler: Function) {
  // 组合键
  useEffect(() => {
    // console.log("页面挂载...")
    const keyBoradEventHandler = (event: KeyboardEvent) => {
      const _isCompose = Array.isArray(keyborads);
      // 判断是Ctrl 还是 Alt
      const _isAlt = _isCompose && keyborads.includes("Alt");
      const _isControl = _isCompose && keyborads.includes("Control");

      if (_isAlt) {
        // 是否符合条件 (mac结合Alt事件会有问题)
        event.altKey && keyborads.includes(event.key) && handler();
        return;
      }
      if (_isControl) {
        event.ctrlKey && keyborads.includes(event.key) && handler();
        return;
      }
      // 正常情况 只有一个键盘事件的清情况
      keyborads === event.key && handler();
    }

    window.addEventListener("keyup", keyBoradEventHandler)

    return () => {
      // console.log("页面销毁...")
      window.removeEventListener("keyup", keyBoradEventHandler);
    }
  }, [keyborads, handler])

}
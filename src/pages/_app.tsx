import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import { BackTop, Tooltip } from 'antd'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { Provider } from "react-redux"
import nProgress from "nprogress"
import "nprogress/nprogress.css"

import "antd/dist/antd.css"
import 'moment/locale/zh-cn'

import "@/assets/css/reset.css"
import "@/assets/font/iconfont.css"

import { ThemeContext } from '@/common/context'
import { getReflectTheme } from '@/utils/theme'
import store from "@/store"
import { isLoginStatus } from '@/services/modules/login'
import { userLoginAction } from '@/store/modules/login/actionCreators'
import AppHeader from '@/components/app-header'
import AppBackGround from '@/components/app-background'
import AppLoading from '@/components/app-loading'
import AppFooter from '@/components/app-footer'
import { useKeyBoradEventHook } from '@/utils/hook'

function App({ Component, pageProps }: AppProps) {
  // other hook
  const [theme, setTheme] = useState('light')
  // other logic
  const changeTheme = useCallback(() => {
    setTheme(getReflectTheme(theme))
  }, [theme])

  useKeyBoradEventHook(useMemo(() => ["Control", "r"], []), changeTheme)

  const router = useRouter()

  useEffect(() => {
    const state: any = store.getState()
    const userInfo = state.getIn(["login", "userInfo"])
    if (!userInfo) {
      isLoginStatus().then(({ data }: any) => {
        store.dispatch(userLoginAction(data))
      })
    }
    // 路由控制权限控制
    router.beforePopState(({ url }) => {
      if (url === '/login') {
        // 判断是已登录
        if (userInfo) return false
      }
      return true
    })
    // 路由跳转进度
    const Events = router.events
    function start() {
      nProgress.start()
    }
    function done() {
      nProgress.done()
    }
    Events.on("routeChangeStart", start)
    Events.on("routeChangeComplete", done)

    return () => {
      Events.off("routeChangeStart", start)
      Events.off("routeChangeComplete", done)
    }
  }, [router])

  return (
    <ThemeContext.Provider value={theme}>
      <Provider store={store}>
        <AppHeader changeTheme={changeTheme} />
        <div className='container-wrap mt-20 pb-20'>
          <Component {...pageProps} />
        </div>
        {(!['/', '/login'].includes(router.pathname)) && <AppFooter />}
        <AppBackGround />
        <AppLoading />
      </Provider>
      <Tooltip title="返回顶部"><BackTop /></Tooltip>
    </ThemeContext.Provider>
  )
}

export default App

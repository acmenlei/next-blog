import Document, { Html, Head, Main, NextScript } from 'next/document'

// 重写文档
class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <meta name='description' content="coderlei's blog个人博客，个人博客网页制作，个人博客网站模板，个人博客开发，React开发，使用nextjs框架开发的服务端渲染博客，个人博客，记录美好生活，专注于前端开发，分享最新前端技术以及一些学习笔记" />
        </Head>
        <title>coderlei blog_个人博客_前端技术分享</title>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
MyDocument.getInitialProps = async (ctx) => {
  const initialProps = await Document.getInitialProps(ctx)
  return { ...initialProps }
}
export default MyDocument
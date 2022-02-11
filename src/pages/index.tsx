import type { NextPage } from 'next'
import { memo } from 'react';
import { IndexWrapper } from '@/styles/home'
// local

const Home: NextPage = memo(function myHome(){
  return (
    <IndexWrapper>
      <div className="message">
        你好 欢迎来到这里 希望这里的文章对你有所帮助 祝你一切顺利～
      </div>
      <div className="usagi">
        <div className="head">
          <div className="wrap">
            <div className="flush"></div>
            <div className="face"></div>
            <div className="mouth"></div>
            <div className="nose"></div>
          </div>
        </div>
      </div>
      <div className="piske">
        <div className="head">
          <div className="eyes"></div>
          <div className="flush"></div>
          <div className="mouth"></div>
        </div>
      </div>
    </IndexWrapper>
  );
})

export default Home

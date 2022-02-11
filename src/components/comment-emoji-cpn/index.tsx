// 解决第三方库使用document或者window的问题
import dynamic from 'next/dynamic';
const Picker = dynamic(() => import("emoji-picker-react"), { ssr: false })
const { SKIN_TONE_MEDIUM_DARK }: any = dynamic(() => import("emoji-picker-react"), { ssr: false })

import React, { memo, useCallback, useState } from 'react';
import { SmileOutlined } from '@ant-design/icons';

import CommentEmojiModuleCSS from "./style.module.css"

export default memo(function CommentEmojiCpn({ onEmojiClick }: any) {
  const [pickerStatus, setPickerStatus] = useState(false)
  // 切换emoji的选择
  const triggerPicker = useCallback(() => {
    setPickerStatus(!pickerStatus)
  }, [pickerStatus])
  // 选择emoji
  const selectEmoji = useCallback((e, data) => {
    triggerPicker()
    onEmojiClick(e, data)
  }, [triggerPicker, onEmojiClick])

  return (
    <>
      <SmileOutlined className={CommentEmojiModuleCSS.emojiIcon} onClick={triggerPicker} />
        <div style={{ display: pickerStatus ? 'block' : 'none' }}>
          <Picker onEmojiClick={selectEmoji}
                                disableAutoFocus={true}
                                skinTone={SKIN_TONE_MEDIUM_DARK}
                                groupNames={{ smileys_people: 'PEOPLE' }}
                                native />
        </div>
    </>
  )
});

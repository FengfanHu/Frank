import { useState } from 'react';
import {Button, Switch} from 'antd';
import View from "../../Common/View";
import './index.scss';
import MarkDown from "../../MarkDown";

function Manage(props) {
  const [preview, setPreview] = useState(false);
  const [markdownContent, setMarkdownContent] = useState('');

  const onSwitchPreview = (checked) => {
    setPreview(checked);
  }

  return (
    <View className={'markdownEditorWrapper'}>
      <View className={'markdownEditorToolBar'}>
        <View className={'markdownEditorToolBarPreview'}>
          <label style={{ marginRight: '10px' }}>开启预览</label>
          <Switch style={{ marginRight: '10px' }} checked={preview} onChange={onSwitchPreview} checkedChildren={'预览'} />
          <Button type={'primary'} >发布</Button>
        </View>
      </View>
      <View className={'markdownEditorContent'}>
        {/* 文本编辑区域 */}
        <textarea
          className={'markdownEditor'}
          value={markdownContent}
          placeholder={'Please input your markdown text'}
          onChange={(event) => setMarkdownContent(event.target.value)}
         />
        {/* 预览区域 */}
        <View show={preview} className={'markdownEditorPreviewBlock'}>
          <MarkDown style={{ width: '100%' }} content={markdownContent} />
        </View>
      </View>
    </View>
  )
}

export default Manage;

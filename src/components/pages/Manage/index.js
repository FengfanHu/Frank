import { useState } from 'react';
import View from "../../Common/View";
import './index.scss';
import MarkDown from "../../MarkDown";

function Manage(props) {
  const [markdownContent, setMarkdownContent] = useState('');

  return (
    <View className={'markdownEditorWrapper'}>
      <View style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
        <textarea
          className={'markdownEditor'}
          value={markdownContent}
          placeholder={'Please input your markdown text'}
          onChange={(event) => setMarkdownContent(event.target.value)}
         />
        <View style={{ display: 'flex', flex: 1 }}>
          <MarkDown content={markdownContent} />
        </View>
      </View>
    </View>
  )
}

export default Manage;

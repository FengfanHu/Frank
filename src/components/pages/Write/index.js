import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import {Button, Switch, Upload, Progress, Select, Divider, Input, message} from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import View from "../../Common/View";
import './index.scss';
import MarkDown from "../../MarkDown";
import { getToken, getCategories, addCategory, addArticle } from '../../../utils/api';
import * as qiniu from 'qiniu-js';
import copy from 'copy-to-clipboard';
import { QiniuConfig } from '../../../utils/secret';
import {CODE} from "../../../utils";

const { Option } = Select;

function Write(props) {
  const history = useHistory();
  const [token, setToken] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState('');
  const [newCategory, setNewCategory] = useState('');
  const [preview, setPreview] = useState(false);
  const [uploadPercent, setUploadPercent] = useState(0);
  const [uploadStatus, setUploadStatus] = useState('normal');
  const [markdownContent, setMarkdownContent] = useState('');

  const onSwitchPreview = (checked) => {
    setPreview(checked);
  }

  const getUploadToken = async() => {
    const response = await getToken();
    const result = await response.json();
    setToken(result.data.token);
  }

  const customRequest = (e) => {
    const file = e.file;
    const uniqueName = `${category.name}-${title}-${file.name}`;
    const observable = qiniu.upload(file, uniqueName, token);
    const subscription = observable.subscribe({
      next(res) {
        setUploadPercent(res.total.percent);
        if (res.total.percent !== 100) setUploadStatus('normal');
      },
      error(err) {
        console.log(err);
        setUploadStatus('exception');
      },
      complete(res) {
        console.log(res, '上传成功');
        setUploadStatus('success');
        copy(`${QiniuConfig.domain}/${uniqueName}`)
        subscription.unsubscribe();
      }
    })
  }

  const addItem = async(value) => {
    const response = await addCategory(value);
    const result = await response.json();
    if (result.code === CODE.SUCCESS) {
      message.success('新增成功');
    } else {
      message.error('操作失败');
    }
  }

  const submit = async() => {
    if (!title || !category.id || !description || !markdownContent) {
      message.error('内容不完整，请再次核对');
      return;
    }
    const response = await addArticle({
      title: title,
      description: description,
      content: markdownContent,
      categoryId: category.id
    })
    const result = await response.json();
    if (result.code === 200) {
      message.success('新增成功');
      history.push('/');
    } else {
      message.error('操作失败');
    }

  }

  useEffect(() => {
    async function requestCategorise() {
      const response = await getCategories();
      const result = await response.json();
      setCategories(result.data);
    }
    requestCategorise();
  }, [])

  return (
    <View className={'markdownEditorWrapper'}>
      <View className={'markdownEditorToolBar'}>
        <Input style={{ flex: 1, fontWeight: 'bold', fontSize: '32px' }} placeholder={'请输入标题'} bordered={false} values={title} onChange={(e) => setTitle(e.target.value)} />
        <Select
          style={{ marginRight: '10px', width: '200px' }}
          placeholder={'所属分类'}
          maxTagCount={'responsive'}
          onSelect={(index) => setCategory(categories[index])}
          dropdownRender={menu => (
           <View>
             { menu }
             <Divider style={{ margin: '4px 0' }} />
             <div style={{ display: 'flex', flexWrap: 'nowrap', padding: 8 }}>
              <Input style={{ flex: 'auto' }} value={newCategory} onChange={(e) => setNewCategory(e.target.value)} />
              <View style={{ flex: 'none', padding: '8px', display: 'block', cursor: 'pointer', color: '#1890FF' }} onClick={() => addItem(newCategory)} >
                <PlusOutlined /> 新增分类
              </View>
            </div>
           </View>
          )}
        >
          {
            categories.map((category, index) => {
              return (<Option key={index}>{category.name}</Option>)
            })
          }
        </Select>
        <Upload
          name={'image'}
          fileList={[]}
          disabled={!title || !category}
          customRequest={customRequest}
          beforeUpload={getUploadToken}
          action={'http://upload.qiniup.com'}
        >
          <Button style={{ marginRight: '10px' }} disabled={!title || !category}>上传图片并复制链接</Button>
          {
            uploadPercent
              ? <Progress style={{ marginRight: '10px' }} type={"circle"} width={20} percent={uploadPercent} status={uploadStatus} />
              : null
          }
        </Upload>
        <View className={'markdownEditorToolBarPreview'}>
          <label style={{ marginRight: '10px' }}>开启预览</label>
          <Switch style={{ marginRight: '10px' }} checked={preview} onChange={onSwitchPreview} checkedChildren={'预览'} />
          <Button type={'primary'} onClick={() => submit()} >发布</Button>
        </View>
      </View>
      <View className={'markdownEditorDescription'}>
        <Input placeholder={'请输入文章概要'} bordered={false} value={description} onChange={(e) => setDescription(e.target.value)} />
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

export default Write;

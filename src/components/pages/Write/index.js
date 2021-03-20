import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import {Button, Switch, Upload, Select, Divider, Input, message} from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import View from "../../Common/View";
import './index.scss';
import MarkDown from "../../MarkDown";
import { getCategories, addCategory, addArticle, getArticleById } from '../../../utils/api';
import OSS from 'ali-oss';
import { AliOSSConfig } from '../../../utils/secret';
import {CODE} from "../../../utils";
import { withRouter } from 'react-router-dom';
import copy from 'clipboard-copy'

const { Option } = Select;

let client = new OSS(AliOSSConfig);

function Write(props) {
  const history = useHistory();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState('');
  const [newCategory, setNewCategory] = useState('');
  const [preview, setPreview] = useState(false);
  const [markdownContent, setMarkdownContent] = useState('');
  const [posterUrl, setPosterUrl] = useState('');
  const articleId = props.location.state && props.location.state.id;

  const onSwitchPreview = (checked) => {
    setPreview(checked);
  }

  const customRequest = (e) => {
    const file = e.file;
    const uniqueName = `${category.name}-${title}-${file.name}`;
    client.put(uniqueName, file)
      .then(result => {
          if (result.res.status === 200) {
            message.success('图片上传成功');
            copy(result.url);
          } else {
            message.error('图片上传失败');
            console.warn(result);
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
      categoryId: category.id,
      posterUrl: posterUrl
    })
    const result = await response.json();
    if (result.code === 200) {
      message.success('新增成功');
      history.push('/');
    } else {
      message.error('操作失败');
    }
  }

  async function requestCategorise() {
    const response = await getCategories();
    const result = await response.json();
    setCategories(result.data);
  }

  async function requestArticle(id) {
    const response = await getArticleById(id);
    const result = await response.json();
    setTitle(result.title);
    setCategory(result.category);
    setDescription(result.description);
    setMarkdownContent(result.content);
  }

  useEffect(() => {
    requestCategorise();
  }, [])

  useEffect(() => {
    articleId && requestArticle(articleId);
  }, [articleId])

  return (
    <div className={'content'}>
      <View className={'markdownEditorWrapper'}>
      <Input style={{ flex: 1, fontWeight: 'bold', fontSize: '32px' }} placeholder={'请输入标题'} bordered={false} value={title} onChange={(e) => setTitle(e.target.value)} />  
        <Input placeholder={'封面Url'} bordered={false} value={posterUrl} onChange={(e) => setPosterUrl(e.target.value)} />
        <img src={posterUrl} alt={'Poster'} />
        <View className={'markdownEditorToolBar'}>
          <Select
            value={category.name}
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
          >
            <Button style={{ marginRight: '10px' }} disabled={!title || !category}>上传图片并复制链接</Button>
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
          {
            !preview
              ? (
              <textarea
                className={'markdownEditor'}
                value={markdownContent}
                placeholder={'Please input your markdown text'}
                onChange={(event) => setMarkdownContent(event.target.value)}
              />
              )
              : null
          }
          {/* 预览区域 */}
          <View show={preview} className={'markdownEditorPreviewBlock'}>
            <MarkDown content={markdownContent} />
          </View>
        </View>
      </View>
    </div>
  )
}

export default withRouter(Write);

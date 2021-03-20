import { useState, useEffect } from 'react';
import View from "../../Common/View";
import {Tabs, List, message, Collapse, Popconfirm, Button, Card} from 'antd';
import {getCategories, deleteCategory, getArticles, deleteArticle} from "../../../utils/api";
import { CODE } from '../../../utils';
import { MenuOutlined, EditOutlined } from '@ant-design/icons';
import PanelHeader from './header';
import { useHistory } from 'react-router-dom';

const { TabPane } = Tabs;

function Manage() {
  const history = useHistory();
  const [tabInfo, setTabInfo] = useState([]);
  const [articleList, setArticleList] = useState([]);
  const [refresh, setRefresh] = useState(false);

  async function requestCategorise() {
    const response = await getCategories();
    const result = await response.json();
    setTabInfo(result.data);
    setRefresh(false);
  }

  async function requestArticles() {
    const resposne = await getArticles('All-Categories');
    const result = await resposne.json();
    setArticleList(result);
    setRefresh(false);
  }

  useEffect(() => {
    requestCategorise();
    requestArticles();
  }, [])

  useEffect(() => {
    if (refresh) {
      requestCategorise();
      requestArticles();
    }
  }, [refresh])

  /**
   * 删除分类
   * @param {} id 
   */
  const confirmDeleteCate = async (id) => {
    try {
      const response = await deleteCategory(id);
      const result = await response.json();

      result && result.code === CODE.SUCCESS
        ? message.success('删除成功')
        : message.error('操作失败')

      setRefresh(true);
    } catch (e) {
      message.error('操作失败')
    }
  }

  /**
   * 删除文章
   * @param {}} id 
   */
  const confirmDeleteArticle = async (id) => {
    try {
      const response = await deleteArticle(id);
      const result = await response.json();

      result && result.code === CODE.SUCCESS
        ? message.success('删除成功')
        : message.error('操作失败')

      setRefresh(true);
    } catch (e) {
      message.error('操作失败')
    }
  }

  const gridStyle = {
    width: '25%',
    fontSize: '20px',
    fontWeight: 'bold',
    backgroundColor: '#1890ff',
    color: '#fff',
    textAlign: 'center',
  };

  return (<View style={{ padding: '20px 50px' }}>
    {/* 分类管理 */}
    <Tabs>
      <TabPane key={'0'} tab={<span><MenuOutlined />分类管理</span>}>
        <Collapse
          style={{ alignItems: 'center' }}
          accordion>
          {
            tabInfo.map((item, key) => {
              const { name, created_at, updated_at, id } = item;
              return (
                <Collapse.Panel 
                  key={key}
                  header={<PanelHeader
                    id={id}
                    name={name}
                    created_at={created_at}
                    updated_at={updated_at}
                    handleClick={confirmDeleteCate}
                    />}>
                      <List
                        itemLayout="horizontal"
                        dataSource={(articleList[key] && articleList[key].articles) || []}
                        renderItem={item => (
                          <List.Item
                            style={{
                              display: 'flex', flexDirection: 'row', textAlign: 'start', justifyContent: 'start', alignItems: 'center'
                            }}
                            actions={[
                              <Button 
                                type={'primary'}
                                size={'small'}
                                onClick={() => history.push({
                                  pathname: '/manage/write',
                                  state: item
                                })}
                                >编辑</Button>,
                              <Popconfirm
                                title="您确定要删除该分类?"
                                placement={'left'}
                                onConfirm={() => confirmDeleteArticle(item.id)}
                                okText="删除"
                                cancelText="取消"
                                okButtonProps={{
                                  danger: true
                                }}
                                style={{ flex: 1 }}
                              >
                                <Button type={'danger'} size={'small'}>删除</Button>
                              </Popconfirm>
                            ]}
                          >
                            <List.Item.Meta style={{ flex: 1 }} title={item.title} />
                            <List.Item.Meta style={{ flex: 2 }} title={`创建时间：${item.created_at}`} />
                            <List.Item.Meta style={{ flex: 2 }} title={`更新时间：${item.updated_at}`} />
                          </List.Item>)}
                      />
                </Collapse.Panel>
              )
            })
          }
        </Collapse>
      
      </TabPane>
    </Tabs>
    {/* 更多功能 */}
    <Card title="更多功能">
      <Card.Grid style={gridStyle} onClick={() => history.push('/manage/write')}>
        <EditOutlined style={{ marginRight: '10px' }} />写作
      </Card.Grid>
      <Card.Grid style={gridStyle} hoverable={false} >敬请期待</Card.Grid>
    </Card>
  </View>);
}

export default Manage;

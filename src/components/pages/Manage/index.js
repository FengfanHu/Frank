import { useState, useEffect } from 'react';
import View from "../../Common/View";
import {Tabs, List, message, Popconfirm, Input} from 'antd';
import {getCategories, deleteCategory, updateCategory} from "../../../utils/api";
import { CODE } from '../../../utils';

const { TabPane } = Tabs;

function Manage() {
  const [tabInfo, setTabInfo] = useState([]);

  useEffect(() => {
    async function requestCategorise() {
      const response = await getCategories();
      const result = await response.json();
      setTabInfo(result.data);
    }
    requestCategorise();
  }, [])

  const confirmUpdate = async (item) => {
    try {
      const response = await updateCategory({
        id: item.id,
        name: item.name
      });
      const result = await response.json();

      result && result.code === CODE.SUCCESS
        ? message.success('删除成功')
        : message.error('操作失败')
    } catch (e) {
      message.error('操作失败')
    }
  }

  const confirmDelete = async (id) => {
    try {
      const response = await deleteCategory(id);
      const result = await response.json();

      result && result.code === CODE.SUCCESS
        ? message.success('删除成功')
        : message.error('操作失败')
    } catch (e) {
      message.error('操作失败')
    }
  }

  const cancel = () => {
    message.info('操作已取消');
  }

  return (<View style={{ padding: '20px 50px' }}>
    <Tabs>
      <TabPane key={'1'} tab={'分类管理'}>
        <List
          itemLayout="horizontal"
          dataSource={tabInfo}
          renderItem={item => (
            <List.Item
              actions={[
                <Popconfirm
                  title="您确定要修改该分类?"
                  placement={'left'}
                  onConfirm={() => confirmUpdate(item)}
                  onCancel={cancel}
                  okText="修改"
                  cancelText="取消"
                  okButtonProps={{
                    danger: true
                  }}
                >
                  <div style={{ color: 'blue' }}>修改</div>
                </Popconfirm>,
                <Popconfirm
                  title="您确定要删除该分类?"
                  placement={'left'}
                  onConfirm={() => confirmDelete(item.id)}
                  onCancel={cancel}
                  okText="删除"
                  cancelText="取消"
                  okButtonProps={{
                    danger: true
                  }}
                >
                  <div style={{ color: 'red' }}>删除</div>
                </Popconfirm>
              ]}
            >
              <List.Item.Meta title={
                <Input style={{ textAlign: 'start' }}
                     value={item.name}
                     bordered={false}
                />
              } />
              <List.Item.Meta title={`创建时间：${item.created_at}`} />
              <List.Item.Meta title={`更新时间：${item.updated_at}`} />
            </List.Item>)}
        />
      </TabPane>
    </Tabs>
  </View>);
}

export default Manage;

import View from '../../Common/View';
import { Popconfirm, Button, message } from 'antd';

function PanelHeader(props) {
    const { name, created_at, updated_at, handleClick, id } = props;

    const cancel = () => {
        message.info('操作已取消');
      }

    return (
        <View style={{ display: 'flex', flexDirection: 'row', textAlign: 'start', justifyContent: 'start', alignItems: 'center' }}>
            <View style={{ flex: 1 }}>{name}</View>
            <View style={{ flex: 2 }}>创建时间：{created_at}</View>
            <View style={{ flex: 2 }}>修改时间：{updated_at}</View>
            <Popconfirm
                  title="您确定要删除该分类?"
                  placement={'left'}
                  onConfirm={() => handleClick(id)}
                  onCancel={cancel}
                  okText="删除"
                  cancelText="取消"
                  okButtonProps={{
                    danger: true
                  }}
                  style={{ flex: 1 }}
                >
                  <Button danger size={'small'}>删除</Button>
                </Popconfirm>
        </View>
    )
}

export default PanelHeader;
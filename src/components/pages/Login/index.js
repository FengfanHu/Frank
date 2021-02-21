import { Form, Input, Button, message } from 'antd';
import { useHistory } from 'react-router-dom';
import View from "../../Common/View";
import './index.scss';
import { login } from '../../../utils/api';

function Manager(props) {
  const history = useHistory();

  const onSubmit = async (values) => {
    try {
      const response = await login(values);
      const result = await response.json();
      if (result.code !== 200) return message.warning('验证失败');
      localStorage.setItem('token', result.data.token);
      message.success('登录成功');
      history.push('/manage');
    } catch (err) {
      message.error('Server Error');
      console.log(err);
    }
  }

  return (
    <View className={'managerFormWrapper'}>
      <View className={'managerForm'}>
        <Form
          onFinish={onSubmit}
          name={'login'}
        >
          <View className={'managerForm-title'}>Management Plaform</View>
          <Form.Item
            style={{ marginBottom: '20px' }}
            label={'Manager'}
            name={'name'}
            rules={[{ required: true, message: '请输入管理员用户名' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            style={{ marginBottom: '20px' }}
            label={'Password'}
            name={'password'}
            rules={[{ required: true, message: '请输入密钥' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type={'primary'} htmlType={'submit'}>
              Login
            </Button>
          </Form.Item>
        </Form>
      </View>
    </View>
  )
}

export default Manager;

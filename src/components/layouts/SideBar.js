import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import {Layout, Avatar} from 'antd';
import './index.scss';
import Menu from "../Menu";
import Item from "../Menu/Item";
import { staticUrl } from '../../utils';
import mockData from './mock.json';
import Links from "../Links";
import View from "../Common/View";

const { Sider } = Layout;
const { menu } = mockData;

function SideBar(props) {

  const [currentIndex, setCurrentIndex] = useState(0);
  const [collapsed, setCollapsed] = useState(false);

  const history = useHistory();

  const handleCollapse = (collapsed) => {
    setCollapsed(collapsed);
  }

  const handleClickMenu = (index) => {
    setCurrentIndex(index);
    history.push(`/categories/${menu[index].title.split(' ').join('-')}`)
  }

  return (
    <Sider
      theme={'light'}
      breakpoint={'md'}
      className={'sideBar'}
      width={'300'}
      collapsedWidth={'50'}
      collapsed={collapsed}
      onCollapse={handleCollapse}
    >
      <View className={'sideBar-button'} onClick={() => {
        setCollapsed(!collapsed);
      }}>
        { collapsed ? '展开' : '收起' }
      </View>
      <View show={!collapsed} className={'sideBar-avatar'} >
        <View style={{ padding: '20px 0' }}>
          <Avatar size={100} alt={'Frank'} src={staticUrl.avatar} shape={'square'} />
          <View style={{ marginTop: '5px', fontSize: '20px', cursor: 'pointer' }} onClick={() => history.push('/')}>Frank's Blog</View>
          <View style={{ fontSize: '12px', color: '#595959' }}>Appreciation, Modesty, Consistence</View>
        </View>
      </View>
      <Links show={!collapsed} />
      <Menu collapsed={collapsed}>
        <View className={'moveBar'} style={{ transform: `translateY(${currentIndex*50}px)` }} />
        {
          menu.map((item, index) => {
            return (<Item
              key={index}
              id={item.id}
              title={item.title}
              collapsed={collapsed}
              onClick={() => handleClickMenu(index)}
              selected={index === currentIndex}
            />)
          })
        }
      </Menu>
    </Sider>
  )
}

export default SideBar;

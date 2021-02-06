import { useState, useEffect } from 'react';
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

  const handleCollapse = (collapsed) => {
    setCollapsed(collapsed);
  }

  useEffect(() => {
    console.log('SideBar render');
  }, [])

  return (
    <Sider
      theme={'light'}
      breakpoint={'md'}
      className={'sideBar'}
      width={'300'}
      collapsedWidth={'50'}
      onCollapse={handleCollapse}
    >
      <View show={!collapsed} className={'sideBar-avatar'} >
        <Avatar size={100} alt={'Frank'} src={staticUrl.avatar} />
        <View style={{ marginTop: '5px', fontSize: '20px' }}>Frank's Blog</View>
        <View style={{ fontSize: '12px', color: '#595959' }}>Appreciation, Modesty, Consistence</View>
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
              onClick={() => setCurrentIndex(index)}
              selected={index === currentIndex}
            />)
          })
        }
      </Menu>
    </Sider>
  )
}

export default SideBar;
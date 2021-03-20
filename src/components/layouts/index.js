import { useRef, useState } from 'react';
import { Layout } from 'antd';
import SideBar from "./SideBar";
import { Button } from 'antd';
import { UpOutlined } from "@ant-design/icons";
import { Switch, Route } from "react-router-dom";
import Article from "../pages/Article";
import ArticleList from "../pages/ArticleList";
import Login from "../pages/Login";
import Write from "../pages/Write";
import "./index.scss";
import Manage from "../pages/Manage";

function Wrapper() {
  const scrollView = useRef();
  const [showButton, setShowButton] = useState(false);

  const onHandleScroll = (e) => {
    e.target.scrollTop >= 200
      ? setShowButton(true)
      : setShowButton(false);
  }

  /**
   * 返回最上层
   * @param {int} duration 毫秒 
   */
  const onScrollTop = (duration) => {
    const scrollTop = scrollView.current.scrollTop;
    const times = duration % 13;
    const onceHeight = scrollTop/times;
    let count = 0;
    const scroll = setInterval(() => {
      if (count >= times) clearInterval(scroll);
      scrollView.current.scrollTop -= onceHeight;
      count += 1;
    }, 13)
  }

  return (
    <Layout style={{ height: '100%' }}>
      <SideBar />
      <Layout className={"layout"} >
        <div 
          style={{ display: 'flex', height: '100%', overflow: 'scroll', flexDirection: 'column' }}
          ref={scrollView}
          onScroll={onHandleScroll}>
          <Switch>
            <Route path={"/manage/login"}>
              <Login />
            </Route>
            <Route path={"/manage/write"}>
              <Write />
            </Route>
            <Route path={"/manage"}>
              <Manage />
            </Route>
            <Route path={'/categories/:categoryName'}>
              <ArticleList />
            </Route>
            <Route path={"/articles/:categoryName/:articleName"}>
              <Article />
            </Route>
          </Switch>
          {
            showButton
              ? (<Button
                  onClick={() => onScrollTop(1000)}
                  style={{ position: 'fixed', bottom: '50px', right: '50px' }}
                  type={'primary'}
                  shape={'circle'}
                  size={'large'} 
                  icon={<UpOutlined />}
              /> )
              : null
          }
        </div>
      </Layout>
    </Layout>
  )
}

export default Wrapper;

import { Layout } from 'antd';
import SideBar from "./SideBar";
import { BackTop } from "antd";
import { Switch, Route } from "react-router-dom";
import Article from "../pages/Article";
import ArticleList from "../pages/ArticleList";
import Login from "../pages/Login";
import Manage from "../pages/Manage";

function Wrapper() {


  return (
    <Layout>
      <SideBar />
      <Layout style={{ backgroundColor: '#fefefe' }}>
        <Switch>
          <Route path={"/manage/login"}>
            <Login />
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
        <BackTop />
      </Layout>
    </Layout>
  )
}

export default Wrapper;

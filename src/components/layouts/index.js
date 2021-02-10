import { Layout } from 'antd';
import SideBar from "./SideBar";
import { Switch, Route } from "react-router-dom";
import Article from "../pages/Article";
import ArticleList from "../pages/ArticleList";
import Login from "../pages/Login";
import Manage from "../pages/Manage";

function Wrapper() {


  return (
    <Layout>
      <SideBar />
      <div className={'contentWrapper'} >
        <Switch>
          <Route path={"/manage/login"}>
            <Login />
          </Route>
          <Route path={"/manage"}>
            <Manage />
          </Route>
          <Route path={"/test"}>
            <Article />
          </Route>
          <Route path={'/'}>
            <ArticleList />
          </Route>
        </Switch>
      </div>
    </Layout>
  )
}

export default Wrapper;

import { Layout, List } from 'antd';
import SideBar from "./SideBar";
import { Switch, Route } from "react-router-dom";
import Article from "../pages/Article";
import ArticleList from "../pages/ArticleList";

function Wrapper() {


  return (
    <Layout>
      <SideBar />
      <div className={'contentWrapper'} >
        <Switch>
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

import {useEffect, useRef, useState} from 'react';
import MarkDown from "../../MarkDown";
import './index.scss';
import {Empty} from "antd";
import View from "../../Common/View";
import { getArticle } from "../../../utils/api";
import { useParams } from "react-router-dom";
import { Spin } from "antd";

function Article(props) {
  const { articleName } = useParams();
  const [article, setArticle] = useState({ content: ''});
  const [loading, setLoading] = useState(true);
  const [hrefs, setHrefs] = useState([]);
  const links = useRef({});

  useEffect(() => {
    async function requestArticle() {
      const resposne = await getArticle(articleName.split('-').join(' '));
      const result = await resposne.json();
      setArticle(result);
      setLoading(false);
    }
    requestArticle();
  }, [articleName])

  useEffect(() => {
    setHrefs(links.current.list);
  }, [article.content])

  return (
    <div className={'content'}>
      <View>
        <View className='article-title'>{article.title}</View>
        <View className='article-description'>
          <View style={{ marginRight: 10 }}>创建时间：{ new Date(article.created_at).toDateString() }</View>
          <View>最近更新：{ new Date(article.updated_at).toDateString() }</View>
        </View>
        <Spin size={'large'} spinning={loading} >
            <MarkDown content={article.content} links={links} />
            {
              !article.content
                ? <Empty description={'暂无内容'} style={{ marginTop: '50%' }} />
                : null
            }
        </Spin>
      </View>
      {
        hrefs ?
          <div
            className={'article-hrefWrapper'}
          >
            {
              hrefs.map((href, index) => {
                return (
                  <div key={index} className={'article-href'}>
                    <a href={`#${href}`}>{href}</a>
                  </div>
                );
              })
            }
          </div>
        : null
      }
    </div>
  );
}

export default Article;

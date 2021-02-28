import {useEffect, useRef, useState} from 'react';
import MarkDown from "../../MarkDown";
import './index.scss';
import View from "../../Common/View";
import { getArticle } from "../../../utils/api";
import { useParams } from "react-router-dom";

function Article(props) {
  const { categoryName, articleName } = useParams();
  const [article, setArticle] = useState({ content: ''});
  const [hrefs, setHrefs] = useState([]);
  const links = useRef({});

  useEffect(() => {
    async function requestArticle() {
      const resposne = await getArticle(articleName);
      const result = await resposne.json();
      setArticle(result);
      console.log(result);
    }
    requestArticle();
  }, [articleName])

  useEffect(() => {
    setHrefs(links.current.list);
  }, [article.content])

  return (
    <div className={'content'}>
      <View style={{ width: '100%' }} >
        <View className='article-title'>{article.title}</View>
        <View className='article-description'>
          <View style={{ marginRight: 10 }}>创建时间：{ new Date(article.created_at).toDateString() }</View>
          <View>最近更新：{ new Date(article.updated_at).toDateString() }</View>
        </View>
        <MarkDown content={article.content} links={links} /> 
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

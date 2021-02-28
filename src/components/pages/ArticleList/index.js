import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import List from '../../List';
import {getArticles} from '../../../utils/api';

function ArticleList(props) {
  const [articles, setArticles] = useState([]);
  const { categoryName } = useParams();

  useEffect(() => {
    async function requestArticles() {
      const response = await getArticles(categoryName);
      const result = await response.json();
      
      if (categoryName === 'All-Categories') {
        let articleList = [];
        result.forEach(category => {
          articleList = [...articleList, ...category.articles];
        });
        setArticles(articleList);
      } else {
        setArticles(result.articles);
      }      
    }
    requestArticles();
  }, [categoryName])


  return (
    <List data={articles} categoryName={categoryName} />
    );
}

export default ArticleList;

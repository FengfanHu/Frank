import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import List from '../../List';
import {getArticles} from '../../../utils/api';

function ArticleList(props) {
  const [articles, setArticles] = useState([]);
  const { categoryName } = useParams();

  const handleTitle = (articles) => {
    articles.forEach(article => {
      article.title = article.title.split(' ').join('-');
    });
  }

  useEffect(() => {
    async function requestArticles() {
      const response = await getArticles(categoryName);
      const result = await response.json();

      if (categoryName === 'All-Categories') {
        let articleList = [];
        result.forEach(category => {
          articleList = [...articleList, ...category.articles];
        });
        handleTitle(articleList);
        setArticles(articleList);
      } else {
        handleTitle(result.articles);
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

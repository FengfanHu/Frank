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
      setArticles(result.articles)
    }
    requestArticles();
  }, [categoryName])

  return (
    <List data={articles} />
    );
}

export default ArticleList;

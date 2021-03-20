import { useState } from "react";
import View from "../Common/View";
import "./index.scss";
import { icon } from '../../utils/index'
import { useHistory } from "react-router-dom";
import { Button } from "antd";

function List(props) {
  const { data, categoryName, count } = props;
  const history = useHistory();

  const [pageNo, setPageNo] = useState(1);
  const totalPageNo = (data.length % count === 0) ? parseInt(data.length/count) : parseInt(data.length/count) + 1;

  const handleClick = (title) => {
    history.push(`/articles/${categoryName}/${title}`);
  }

  const nextPage = () => {
    setPageNo(pageNo+1);
  }

  const previousPage = () => {
    setPageNo(pageNo-1);
  }

  return (
    <View className={'listWrapper'}>
      <View className={'listContent'} >
        {
          data.slice((pageNo-1)*count, pageNo*count).map((item, index) => {
            const createdAt = new Date(item.created_at).toDateString();
            return (
              <View key={index} onClick={() => handleClick(item.title)}>
                <View style={{ display: 'flex', flexDirection: 'row', cursor: 'pointer' }}>
                  <img className={'listPoster'} src={item.posterUrl || icon.poster} alt="poster" />
                  <View className={'listItem'}>
                    <h2 className={'listItem-title'}>{item.title.split('-').join(' ')}</h2>
                    <View className={'listItem-date'}>{`创建时间：${createdAt}`}</View>
                    <View className={'listItem-description'}>{item.description}</View>
                  </View>
                </View>
                <View style={{ width: '100%', height: '2px', backgroundColor: '#eef2f8', marginBottom: '10px' }} />
              </View>
            )
          })
        }
        <View style={{ display: 'flex', flexDirection: 'row' }}>
          {
            pageNo === 1
              ? null
              : <Button style={{ marginRight: 5 }} onClick={previousPage}>上一页</Button>
          }
          <Button
            onClick={nextPage}
            disabled={pageNo >= totalPageNo}>下一页</Button>
          <View style={{ marginLeft: 'auto', color: '#595959' }}>
            当前第 {pageNo} 页，共 {totalPageNo} 页
          </View>
        </View>
      </View>
    </View>
  )
}

export default List;

import View from "../Common/View";
import "./index.scss";
import { icon } from '../../utils/index'
import { useHistory } from "react-router-dom";

function List(props) {
  const { data, categoryName } = props;
  const history = useHistory();

  const handleClick = (title) => {
    history.push(`/articles/${categoryName}/${title}`);
  }

  return (
    <View className={'listWrapper'}>
      <View className={'listContent'} >
        {
          data.map((item, index) => {
            const createdAt = new Date(item.created_at).toDateString();
            return (
              <View key={index} onClick={() => handleClick(item.title)}>
                <View style={{ display: 'flex', flexDirection: 'row' }}>
                  <img className={'listPoster'} src={icon.poster} alt="poster" />
                  <View className={'listItem'}>
                    <h2 className={'listItem-title'}>{item.title}</h2>
                    <View className={'listItem-date'}>{`创建时间：${createdAt}`}</View>
                    <View className={'listItem-description'}>{item.description}</View>
                  </View>
                </View>
                <View style={{ width: '100%', height: '2px', backgroundColor: '#eef2f8', marginBottom: '10px' }} />
              </View>
            )
          })
        }
      </View>
    </View>
  )
}

export default List;

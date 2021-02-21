import View from "../Common/View";
import "./index.scss";
import { icon } from '../../utils/index'

function List(props) {
  const { data } = props;

  return (
    <View className={'listContent'}>
      <View className={'listWrapper'} >
        {
          data.map((item, index) => {
            return (
              <View key={index}>
                <View style={{ display: 'flex', flexDirection: 'row' }}>
                  <img className={'listPoster'} src={icon.poster} alt="poster" />
                  <View className={'listItem'}>
                    <h2 className={'listItem-title'}>{item.title}</h2>
                    <View className={'listItem-description'}>{item.description}</View>
                  </View>
                </View>
                <View style={{ width: '100%', height: '2px', backgroundColor: '#eef2f8' }} />
              </View>
            )
          })
        }
      </View>
    </View>
  )
}

export default List;

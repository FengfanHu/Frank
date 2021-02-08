import View from "../Common/View";
import "./index.scss";

function List(props) {
  const { data } = props;

  return (
    <View className={'content'}>
      <View className={'listWrapper'} >
        {
          data.map((item, index) => {
            return (
              <View className={'listItem'} key={index}>
                <View className={'listItem-title'}>{item.title}</View>
                <View className={'listItem-description'}>{item.description}</View>
                <View>{item.content}</View>
              </View>
            )
          })
        }
      </View>
    </View>
  )
}

export default List;

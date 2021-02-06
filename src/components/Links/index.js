import './index.scss'
import icon from '../../utils/icons';
import View from "../Common/View";

function Links(props) {
  const { show } = props;
  const { zhihu, github, linkedin } = icon;

  return (
    <View show={show} className={'linksWrapper'} >
      <View className={'links-wrapper'}>
        <a className={'links-item'} href={'https://www.zhihu.com/people/hu-feng-fan-52-54'} target={'_blank'} rel={'noreferrer'}>
          <img src={zhihu} alt={'zhihu'} className={'links-img'} />
        </a>
        <a className={'links-item'} href={'https://github.com/FengfanHu'} target={'_blank'} rel={'noreferrer'}>
          <img src={github} alt={'github'} className={'links-img'} />
        </a>
        <a className={'links-item'} href={'https://www.linkedin.com/in/%E9%A3%8E%E5%B8%86-%E8%83%A1-569753185/'} target={'_blank'} rel={'noreferrer'}>
          <img src={linkedin} alt={'linkedin'} className={'links-img'} />
        </a>
      </View>
    </View>
  )
}

export default Links;

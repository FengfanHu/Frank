import icon from './icons/index';

const staticUrl = {
  avatar: 'https://pic2.zhimg.com/v2-cd72a8760855cb5697700f8f44bd7288_xl.jpg',
}

const iconMap = (id) => {
  let iconUrl;
  switch (id) {
    case 1:
      iconUrl = icon.category;
      break;
    case 2:
      iconUrl = icon.js;
      break;
    case 3:
      iconUrl = icon.brain;
      break;
    case 4:
      iconUrl = icon.idea;
      break;
    default:
      iconUrl = icon.others;
  }
  return iconUrl;
}

export {
  icon,
  iconMap,
  staticUrl
}

import category from '../icons/category_48.png'
import js from '../icons/js_48.png';
import brain from '../icons/brain_48.png';
import idea from '../icons/idea_48.png';
import others from '../icons/others_48.png';
import zhihu from '../icons/zhihu_64.png';
import github from '../icons/github_64.png';
import linkedin from '../icons/linkedin_64.png';
import poster from '../icons/poster.jpg';

const icon = {
  category,
  js,
  brain,
  idea,
  others,
  zhihu,
  github,
  linkedin,
  poster
}

const staticUrl = {
  avatar: 'https://pic2.zhimg.com/v2-cd72a8760855cb5697700f8f44bd7288_xl.jpg',
  avatarPoster: 'https://pic1.zhimg.com/80/v2-29bc1ce7fd1f08197c7c29d143f21651_1440w.png'
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

const CODE = {
  SUCCESS: 200,
  BAD_REQUEST: 400,
  UNAUTH: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  SERVER_ERROR: 500
}

export {
  icon,
  CODE,
  iconMap,
  staticUrl
}

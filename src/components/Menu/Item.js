import './index.scss';
import { iconMap } from '../../utils';
import React from "react";
import View from "../Common/View";

function Item(props) {
  const { id, title, selected = false, collapsed, onClick } = props;

  return (
    <div
      onClick={onClick}
      className={`menuItem ${ selected ? 'menuItem-active' : ''}`}
    >
      <img src={iconMap(id)} alt={'Icon'} className={'menuItem-img'} />
      <View show={!collapsed} className={'menuItem-title'} >{title}</View>
    </div>
  )
}

export default Item;

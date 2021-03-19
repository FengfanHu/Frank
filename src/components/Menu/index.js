import './index.scss';

function Menu(props) {
  const { collapsed } = props;

  return (
    <div className={'menuWrapper'}>
      <div className={'menu'} style={{ padding: collapsed ? '10px' : '10px 30px' }}>
        {
          props.children
        }
      </div>
    </div>
  )
}

export default Menu;

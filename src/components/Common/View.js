import { Fragment } from 'react';

function View(props) {
  const { show = true, children, ...others } = props;

  return (<Fragment>
    {
      Boolean(show)
        ? (<div {...others} >{ props.children }</div>)
        : null
    }
    </Fragment>)
}

export default View;

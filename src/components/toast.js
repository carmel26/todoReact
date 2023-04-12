import { useState, useEffect } from 'react'; 
import ReactDOM from 'react-dom';

const Toast = props => {
  const [node] = useState(document.createElement('div'));

  const removeNode = () => {
    if (document.querySelector('#toast').children.length) {
      document.querySelector('#toast').childNodes[0].remove();
    }
  };

  useEffect(() => {
    if (props.show) {
      document
        .querySelector('#toast')
        .appendChild(node)
        .classList.add('toast');

      setTimeout(() => {
        removeNode();
        props.hideToast();
      }, 3000);
    } else {
      removeNode();
    }

    return () => removeNode();
  }, [node, props]);

  return ReactDOM.createPortal(props.children, node);
};

export default Toast;
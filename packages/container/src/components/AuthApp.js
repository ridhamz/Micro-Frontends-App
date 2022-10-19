import { mount } from 'auth/AuthApp';
import React, { useRef, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

export default function AuthApp({ onSignIn }) {
  const ref = useRef(null);
  const history = useHistory();

  useEffect(() => {
    const { onParentNavigate } = mount(ref.current, {
      initialPath: history.location.pathname,
      onNavigate: ({ pathname: nextPathName }) => {
        if (history.location.pathname !== nextPathName) {
          history.push(nextPathName);
        }
        console.log('the container noticed navigation in Marketing...');
      },

      onSignIn: () => {
        onSignIn();
        console.log('user sign in');
      },
    });

    history.listen(onParentNavigate);
  }, []);

  return <div ref={ref} />;
}

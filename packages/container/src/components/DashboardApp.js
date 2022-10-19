import { mount } from 'dashboard/DashboardApp';
import React, { useRef, useEffect } from 'react';

export default function AuthApp({ onSignIn }) {
  const ref = useRef(null);

  useEffect(() => {
    mount(ref.current);
  }, []);

  return <div ref={ref} />;
}

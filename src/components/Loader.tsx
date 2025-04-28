import React, { useEffect, useState } from 'react';
import './Loader.css';

const Loader = ({ onFinish }: { onFinish?: () => void }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    document.body.style.touchAction = 'none';

    const timeout = setTimeout(() => {
      setVisible(false);
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
      onFinish?.(); // Instantly call it here
    }, 5000); // Set your desired duration

    return () => {
      clearTimeout(timeout);
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
    };
  }, [onFinish]);

  if (!visible) return null;

  return (
    <div className="loader-wrapper">
      <div className="logo-text">Bravyn Studios</div>
      <div className="loading-spinner" />
    </div>
  );
};

export default Loader;

import React, { useEffect, useState } from 'react';
import './Loader.css';

const statusMessages = [
  'Establishing secure uplink...',
  'Authenticating realm credentials...',
  'Fetching encrypted assets...',
  'Decrypting shaders & modules...',
  'Calibrating spatial render pipeline...',
  'Link established. Finalizing...',
];

const Loader = ({ onFinish }: { onFinish?: () => void }) => {
  const [statusIndex, setStatusIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    document.body.style.touchAction = 'none';

    const interval = setInterval(() => {
      setStatusIndex((prev) => {
        const next = prev + 1;
        if (next === statusMessages.length) {
          clearInterval(interval);
          setTimeout(() => {
            setHidden(true);
            onFinish?.();
            document.body.style.overflow = '';
            document.body.style.touchAction = '';
          }, 1000);
        }
        return next;
      });

      setProgress((prev) => Math.min(prev + 100 / statusMessages.length, 100));
    }, 1500);

    return () => {
      clearInterval(interval);
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
    };
  }, [onFinish]);

  return (
    <div className={`loader-wrapper ${hidden ? 'fade-out' : ''}`}>
      <div className="grid-overlay" />
      <div className="loader-panel">
        <div className="neon-circle" />
        <div className="loader-status">
          <h2>Initializing Realm Interface</h2>
          <p>{statusMessages[statusIndex]}</p>
        </div>
        <div className="progress-track">
          <div className="progress-fill" style={{ width: `${progress}%` }} />
        </div>
      </div>
    </div>
  );
};

export default Loader;

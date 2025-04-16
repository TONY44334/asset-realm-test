import React from 'react';

const LoadingScreen = () => {
  return (
    <div className="loading-screen">
      <div className="spinner">
        {/* You can add your own spinner or use a CSS spinner */}
        <div className="circle"></div>
      </div>
      <style>{`
        .loading-screen {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.7);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 9999;
        }
        .spinner {
          border: 4px solid transparent;
          border-top: 4px solid #fff;
          border-radius: 50%;
          width: 50px;
          height: 50px;
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
};

export default LoadingScreen;

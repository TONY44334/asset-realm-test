import React, { useState } from 'react';

interface LazyImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
}

const LazyImage: React.FC<LazyImageProps> = ({ src, alt, className = '', ...rest }) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {!loaded && (
        <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-gray-700 via-gray-800 to-gray-700 rounded-lg" />
      )}
      <img
        src={src}
        alt={alt}
        className={`transition-opacity duration-500 ease-in-out w-full h-full object-cover rounded-lg ${
          loaded ? 'opacity-100' : 'opacity-0'
        }`}
        onLoad={() => setLoaded(true)}
        {...rest}
      />
    </div>
  );
};

export default LazyImage;

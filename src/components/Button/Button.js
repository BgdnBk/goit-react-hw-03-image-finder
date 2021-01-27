import React from 'react';

export default function Button({ onClick, children }) {
  return (
    <div>
      <button className="Button" onClick={onClick}>
        {children}
      </button>
      {/* window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
      }); */}
    </div>
  );
}

import { useState, useEffect } from 'react';

export const DelayedMessage = () => {
  const [message, setMessage] = useState('Loading...');

  useEffect(() => {
    const timer = setTimeout(() => setMessage('Hello, World!'), 300);
    return () => clearTimeout(timer);
  }, []);
  return <p>{message}</p>;
};

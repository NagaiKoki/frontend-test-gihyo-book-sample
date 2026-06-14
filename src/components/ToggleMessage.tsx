import { useState } from 'react';

export const ToggleMessage = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <button type="button" onClick={() => setIsOpen(true)}>
        表示
      </button>
      {isOpen && <p>こんにちは！</p>}
    </div>
  );
};

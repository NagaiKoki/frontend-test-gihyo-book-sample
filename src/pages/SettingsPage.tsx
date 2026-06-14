import { useState } from 'react';

export const SettingsPage = () => {
  const [notify, setNotify] = useState(false);

  return (
    <main>
      <h1>設定</h1>
      <div>
        <label htmlFor="notify">通知を受け取る</label>
        <input
          id="notify"
          type="checkbox"
          checked={notify}
          onChange={(e) => setNotify(e.target.checked)}
        />
      </div>
    </main>
  );
};

import { render } from '@testing-library/react';
import { Message } from './Message';

test('Messageコンポーネントがクラッシュせずレンダリングできる', () => {
  render(<Message />);
});

import { act, render, screen } from '@testing-library/react';
import { DelayedMessage } from './DelayedMessage';

describe('DelayedMessage', () => {
  beforeEach(() => {
    vi.useFakeTimers(); // 疑似タイマーを有効化
  });

  afterEach(() => {
    vi.clearAllTimers(); // タイマーをリセット
    vi.useRealTimers(); // 元に戻す（他テストへの影響を防ぐ）
  });

  test('非同期処理の結果、正しいメッセージが表示される', () => {
    render(<DelayedMessage />);

    // 初期表示の検証
    expect(screen.getByText('Loading...')).toBeInTheDocument();
    // 300ms 進めてタイマー発火（state 更新を確実に流すため act で囲む）
    act(() => {
      vi.advanceTimersByTime(300);
    });
    // 同期的に state が更新されているので getByText で検証
    expect(screen.getByText('Hello, World!')).toBeInTheDocument();
  });
});

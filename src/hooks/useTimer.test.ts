import { renderHook, act } from '@testing-library/react';
import { useTimer } from './useTimer';

describe('useTimer', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('初期状態では停止している', () => {
    const { result } = renderHook(() => useTimer(5, 500));

    expect(result.current.count).toBe(5);
    expect(result.current.isRunning).toBe(false);
  });

  it('startで開始し、指定間隔でカウントが増加する', () => {
    const { result } = renderHook(() => useTimer(0, 500));

    act(() => {
      result.current.start();
    });

    expect(result.current.isRunning).toBe(true);

    // 1.5秒進める（500ms間隔なので3回実行される）
    act(() => {
      vi.advanceTimersByTime(1500);
    });

    expect(result.current.count).toBe(3);
  });

  it('stopでカウントが停止する', () => {
    const { result } = renderHook(() => useTimer(0, 500));

    act(() => {
      result.current.start();
    });

    act(() => {
      vi.advanceTimersByTime(1000);
    });

    expect(result.current.count).toBe(2);

    act(() => {
      result.current.stop();
    });

    // さらに時間を進めてもカウントは変わらない
    act(() => {
      vi.advanceTimersByTime(1000);
    });

    expect(result.current.count).toBe(2);
  });

  it('resetで初期値に戻り停止する', () => {
    const { result } = renderHook(() => useTimer(0, 500));

    act(() => {
      result.current.start();
    });

    act(() => {
      vi.advanceTimersByTime(1500);
    });

    expect(result.current.count).toBe(3);

    act(() => {
      result.current.reset();
    });

    expect(result.current.count).toBe(0);
    expect(result.current.isRunning).toBe(false);
  });
});

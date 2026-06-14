import { sum } from './sum';

describe('sum 関数のテスト', () => {
  it('空の配列を渡した場合、結果は 0 になる', () => {
    // Arrange
    const numbers: number[] = [];
    // Act
    const result = sum(numbers);
    // Assert
    expect(result).toBe(0);
  });

  it('複数の正の数値を渡した場合、正しく合計を返す', () => {
    const numbers = [1, 2, 3];
    const result = sum(numbers);
    expect(result).toBe(6);
  });

  it('負の数値を含む配列でも正しく合計を返す', () => {
    const numbers = [-1, 5, -3];
    const result = sum(numbers);
    expect(result).toBe(1);
  });

  it('要素が1つだけの配列はその値をそのまま返す', () => {
    const numbers = [42];
    const result = sum(numbers);
    expect(result).toBe(42);
  });
});

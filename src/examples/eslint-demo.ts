// ESLint デモ用: コード品質の問題を含むコード。
// `npx eslint "src/**/*.{ts,tsx}"` で検出、`--fix` で自動修正できるものを確認してみてください。
const unusedValue = 42;

export function greet(name: string) {
  console.log('hello ' + name);
}

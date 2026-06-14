// ESLint デモ用: コード品質の問題を含むコード。
// `npx eslint "examples/**/*.ts"` で検出、`--fix` で自動修正できるものを確認してみてください。
const unusedValue = 42;

export function greet(name: string) {
  console.log('hello ' + name);
}

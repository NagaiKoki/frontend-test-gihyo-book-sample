// 本書 コード3.6「テスト対象のサンプルコード」。
// `npx eslint "src/**/*.{ts,tsx}"` でコード品質の問題を確認できます
// （unit は const にすべき / items の any / == は === にすべき など）。
let unit = "円";
function totalPrice(items: any) {
  let total = 0;
  for (let i = 0; i < items.length; i++) {
    if (items[i].price == null) continue;
    total += items[i].price;
  }
  return `${total}${unit}`;
}

// 本書 コード3.17「テスト対象のコード」。
// `npx @biomejs/biome check src/examples` でフォーマットとリントの問題を一度に確認できます
// （react の重複 import をまとめるべき / console.log / テンプレートリテラルへの置き換え など）。
import { useState } from "react";
import { useEffect } from "react";

const greeting = (name: string) => {
  console.log("hello " + name);
};

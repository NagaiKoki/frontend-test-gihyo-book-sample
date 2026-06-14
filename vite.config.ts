import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";

// 開発サーバ専用の簡易モック API。
// 本書のサンプルアプリ（/users・/products・/articles・/contact など）を
// `npm run dev` で実際に動かすためのもので、本番ビルドには含まれない。
// 実運用に近い API モックは MSW（9 章）で導入する。
const mockApiPlugin = (): Plugin => ({
  name: "mock-api",
  configureServer(server) {
    server.middlewares.use((req, res, next) => {
      const url = req.url?.split("?")[0] ?? "";
      const method = req.method ?? "GET";

      const json = (status: number, body: unknown) => {
        res.statusCode = status;
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify(body));
      };

      if (url === "/api/users" && method === "GET") {
        json(200, {
          users: [
            { id: 1, name: "山田太郎", email: "yamada@example.com" },
            { id: 2, name: "鈴木花子", email: "suzuki@example.com" },
            { id: 3, name: "佐藤次郎", email: "sato@example.com" },
          ],
        });
        return;
      }

      const userIdMatch = url.match(/^\/api\/users\/(\d+)$/);
      if (userIdMatch && method === "GET") {
        const id = Number(userIdMatch[1]);
        json(200, { id, name: `ユーザー${id}` });
        return;
      }

      if (url === "/api/products" && method === "GET") {
        json(200, {
          products: [
            { id: 1, name: "商品A", price: 1000 },
            { id: 2, name: "商品B", price: 2000 },
          ],
        });
        return;
      }

      if (url === "/api/articles" && method === "GET") {
        json(200, {
          articles: [
            { id: 1, title: "記事タイトル1", author: "著者A" },
            { id: 2, title: "記事タイトル2", author: "著者B" },
          ],
        });
        return;
      }

      if (url === "/api/contact" && method === "POST") {
        // 送信中スピナーを E2E で確認できるよう、少し遅延させてから返す
        setTimeout(() => json(200, { ok: true }), 500);
        return;
      }

      next();
    });
  },
});

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), mockApiPlugin()],
});

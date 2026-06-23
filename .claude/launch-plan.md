# 上架計畫

紀錄日期：2026-06-23

## 現況盤點

- 路由共 5 頁（`src/router/index.js`），views 已依功能分子目錄（`views/home/`、`views/blog/`、`views/projects/`、`views/resume/`）。
- `views/blog/PostView.vue` 內容整篇硬編在模板裡，沒有依路由參數從 `src/data/posts.js` 取對應文章，路由也只有 `/post`、沒有 `:id`。目前點任何一篇文章都會看到同一篇內容。
- `src/stores/counter.js` 是 `create-vue` scaffold 殘留檔，沒有任何元件引用，CLAUDE.md 已標記為技術債。
- `.gitignore` 已包含 `.env` 系列規則，安全面 OK。
- 專案無 CI/CD、無部署設定檔（無 `vercel.json` / `netlify.toml` / GitHub Actions）。
- 純靜態資料、無後端，無需擔心機密金鑰外洩問題。

## Stage 1 — 補完功能缺口（上架前必修）

- [x] 把 `PostView.vue` 改成依路由參數（建議 `/post/:id` 或 `:slug`）動態讀 `src/data/posts.js` 對應文章。
- [x] 在 `router/index.js` 加上對應的動態路由參數。
- [x] 確認 `BlogView.vue` 文章列表連到 `/post/:id` 時帶對正確的 id/slug。
- [x] 刪除 `src/stores/counter.js`（確認無引用後直接刪，不要保留範例）。
- [ ] 檢查並 commit 目前 working tree 上未進版控的修改。

## Stage 2 — 品質把關

- [ ] `npm run lint` 全過。
- [ ] `npm run test:unit` 全過。
- [ ] `npm run build && npm run test:e2e` 全過。
- [ ] `npm run preview` 手動走一遍五個頁面（首頁、文章列表、文章詳情、作品集、履歷）+ 換頁行為。

## Stage 3 — 上線前基本配置

- [ ] 補 SEO 基本盤：`index.html` 的 `<title>`、`<meta name="description">`、favicon（確認非 Vite 預設圖示）。
- [ ] 確認 `vite.config.js` 的 `base` 設定符合目標部署平台（GitHub Pages 需子路徑，Vercel/Netlify/Cloudflare Pages 通常不需要）。

## Stage 4 — 選定部署平台並設定

- [ ] 決定部署平台（Vercel / Netlify / Cloudflare Pages / GitHub Pages 任一）；此專案純靜態，build 指令 `npm run build`、輸出目錄 `dist`，四者皆可直接吃。
- [ ] 視平台補對應設定檔或 GitHub Actions workflow（目前無 CI，可選擇是否補上 PR 階段自動跑 lint/test/build）。

## Stage 5 — 上線後檢查

- [ ] 正式網址走一遍五個頁面 + 換頁行為。
- [ ] 跑一次 Lighthouse，檢查效能/SEO/無障礙分數。
- [ ] 若有自訂網域，確認 DNS、HTTPS 正常生效。

## 建議起手點

優先處理 Stage 1 第 1～2 點（PostView 動態化），這是目前唯一會被使用者直接發現的功能性 bug。

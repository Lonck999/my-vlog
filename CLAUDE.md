# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

個人部落格 / 作品集網站（"暖光 warmlight"），Vue 3 + Vite，目前以靜態假資料（`src/data/`）驅動內容，尚未接後端 API。

## Requirements

- **Node 版本**：`^20.19.0 || >=22.12.0`（見 `package.json` 的 `engines` 欄位）。本機 Node 版本不在此範圍時，Vite 8 / Vitest 4 可能出現未預期的行為，請先用 `nvm`/`fnm` 等工具切換後再執行任何指令。

## Commands

```sh
npm run dev                              # 開發伺服器 (Vite, port 5173)
npm run build                            # production 建置
npm run preview                          # 預覽 production 建置

npm run test:unit                        # Vitest 單元測試
npm run test:unit -- path/to.spec.js     # 執行單一測試檔
npx playwright install                   # 第一次跑 e2e 前需安裝瀏覽器
npm run build && npm run test:e2e        # Playwright e2e（CI 模式需先 build，用 preview server）
npm run test:e2e -- --project=chromium   # 只在單一瀏覽器跑
npm run test:e2e -- e2e/example.spec.js  # 執行單一 e2e 檔
npm run test:e2e -- --debug

npm run lint                             # oxlint --fix + eslint --fix（依序）
npm run format                           # oxfmt src/
```

## Architecture

- **路由**：`src/router/index.js` 集中定義所有路由，元件皆 lazy import（`() => import('@/views/...')`）。新增頁面時要同步在這裡掛路由。
- **別名**：`@` 指向 `src/`（在 `vite.config.js` 設定，`vitest.config.js` 透過 `mergeConfig` 沿用同一份 vite 設定）。
- **資料層**：目前沒有 API，頁面內容（文章列表、分類、作品集）以靜態陣列形式放在 `src/data/*.js`（如 `posts.js`、`projects.js`），views 直接 import 使用。未來若要接後端，這層是替換點，請參考 `.claude/rules/04-error-handling.md` 預先規劃載入中/空值/錯誤狀態的處理方式。
- **狀態管理（Pinia）**：`src/stores/` 用 setup-store 寫法（`defineStore(name, () => {...})`，回傳 ref/computed/function），不是 options 寫法。
  - ⚠️ **已知技術債**：`src/stores/counter.js` 是 `create-vue` 專案模板的範例殘留檔（scaffold boilerplate），目前**沒有任何元件實際引用**它。新增 store 時請勿模仿它的命名或當作真實業務範例參考；確認專案不再需要時應直接刪除，而不是繼續保留或擴充它。
- **樣式（SCSS 7-1 Pattern）**：`src/styles/` 依 7-1 分層：
  - `abstracts/`：不輸出 CSS，純編譯期工具（斷點 map、`bp()`/`rem()` function、`respond-to`/`card-surface`/`hover-lift`/`focus-ring` 等 mixin）。透過 `vite.config.js` 的 `css.preprocessorOptions.scss.additionalData` 自動在每個 `.vue` 的 `<style lang="scss">` 注入 `@use "@/styles/abstracts" as *;`，因此元件內可直接用 mixin 不必手動 `@use`。
  - `base/`：`_root.scss` 把設計 token 輸出成 CSS custom properties（`--color-*` 等），是顏色/字級/間距的**唯一真實來源**，執行期可切換（如未來 dark mode）；`abstracts/_variables.scss` 只給 SCSS 編譯期（media query 條件）用，兩者不重複維護同一份值。
  - `components/`、`pages/`：對應設計系統元件與頁面級版型；新元件若樣式單純，優先寫在 `.vue` 的 `<style scoped>` 而不是塞進全域 `components/`、`pages/`（README 在 `src/styles/README.md` 有寫這個取捨）。
  - 一律用 `@use`/`@forward`，不要用已棄用的 `@import`。
  - 全域樣式只在 `main.js` 載入一次（`import './styles/main.scss'`）。
- **Lint**：用 oxlint（快速、跑 correctness 規則）+ eslint（`eslint-plugin-vue` flat/essential、針對 `e2e/**` 套 playwright 規則、針對 `src/**/__tests__/*` 套 vitest 規則）雙工具並行，`npm run lint` 會依序執行兩者並各自 `--fix`。

## 詳細規範索引（`.claude/rules/`）

以下檔案拆分了更細的工程規範，遇到對應情境時請務必查閱：

| 檔案 | 內容 |
| --- | --- |
| [`.claude/rules/01-security.md`](.claude/rules/01-security.md) | 安全紅線：機密資訊管理、前後端驗證責任界線 |
| [`.claude/rules/02-commit.md`](.claude/rules/02-commit.md) | Commit 訊息規範（Conventional Commits） |
| [`.claude/rules/03-testing.md`](.claude/rules/03-testing.md) | 單元測試（Vitest）與 e2e 測試（Playwright）撰寫慣例 |
| [`.claude/rules/04-error-handling.md`](.claude/rules/04-error-handling.md) | 資料載入中 / 空值 / 錯誤狀態的防呆慣例 |

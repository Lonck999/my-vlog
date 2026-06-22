# 進度紀錄：HomeView 系列優化（sr 助教引導）

> 最後更新：2026-06-22

## 目前任務

由 `sr` agent（資深工程師助教）以蘇格拉底式引導，針對首頁／Blog／Resume／Projects 進行 code review 優化。第一輪（HomeView 5 項）已結案，第二輪（全站 SVG icon 抽取）已完成並通過驗證，目前進入第三輪討論：BlogView 的版頭靜態文案（kicker/標題/說明）該抽到哪個資料模組。

## 已完成步驟

### 第一輪：HomeView 優化（5 項，已結案）

1. **Lint / 格式細節清理**：`HomeView.vue` import 補空格、avatar `src` 改靜態綁定。
2. **`posts.js` 補 `id` 欄位**：每篇文章已有 `id: 1`~`id: 12`；`HomeView.vue`/`BlogView.vue` 的 `v-for` 已改用 `:key="post.id"`。
3. **空狀態樣式抽取**：新增 `src/styles/components/_empty-state.scss`（`.empty-state` 通用 class），`_index.scss` 已 `@forward`；`HomeView.vue`/`BlogView.vue` 都已套用；`_blog.scss` 改用巢狀寫法加 `grid-column: 1 / -1`。
4. **`personalInfo.js` 命名重整**：拆成 `profileInfo`/`sidebarMenuConfig`/`feedLabels`/`welcomeLabels` 四個語意分組匯出（camelCase），`HomeView.vue` 同步改名。
5. **PostCard 抽取**：使用者決定**暫緩**，見下方「還沒做完的事」。

### 第二輪：全站 SVG icon 抽取（已完成）

- 盤點發現全專案 6 個檔案（`AppHeader.vue`、`AppFooter.vue`、`HomeView.vue`、`BlogView.vue`、`ResumeView.vue`、`ProjectsView.vue`）共用 8 種重複內嵌 SVG。
- 新增 `src/components/icons/`：`IconBase.vue`（共同屬性 + `size` prop，預設 18，補上 `aria-hidden`/`focusable="false"`）+ 8 個圖示元件（`IconSparkle`/`IconMail`/`IconGithub`/`IconFile`/`IconArrowRight`/`IconSwap`/`IconFolder`/`IconShield`）。
- 上述 6 個檔案的內嵌 `<svg>` 全部替換為對應 `<IconXxx :size="原尺寸" />`，**刻意保留每處原本的視覺尺寸**（不同檔案同一圖示尺寸本來就不一致，這次不順便統一，列為後續可選項）。
- 驗證：`npm run lint` 通過（0 警告 0 錯誤）；`npm run test:unit` 有 1 個既有失敗（`App.spec.js`，與 avatar 路徑解析有關），已用 `git stash` 確認**改動前 main 分支就會失敗**，與本次無關。

## 還沒做完的事

### A. PostCard.vue 抽取（暫緩，等接後端時再做）

- 使用者明確表示：「先維持這樣，等之後上線完開始寫後端時再來改善」。
- 牽連技術債（一起延後）：`<RouterLink to="/post">` 寫死固定路徑、`src/router/index.js` 沒有 `/post/:id` 動態路由、`PostView.vue` 完全是靜態內容沒有用 `route.params.id` 載入文章。
- PostCard props 介面（`categoryLabel` 字串 vs 整個 `categories` 查找表）尚未決定，不需要現在逼使用者選。

### B. 全站「版頭靜態文案」該放哪——進行中，尚未動手

使用者問到 `BlogView.vue` 的 `page-head__kicker`/`<h1>`/`<p>` 這段版頭文案是否適合寫進 `posts.js`。已引導使用者理解：`posts.js` 是文章資料陣列，跟「頁面版頭文案」是不同關注點，不該混在一起；應該照 `personalInfo.js`（`profileInfo`/`welcomeLabels`...）的先例，抽到獨立的資料模組。

**尚未決定、待使用者回覆**：
- 新模組要怎麼命名/歸類？（例如 `src/data/blogPageContent.js` 單頁一個檔案，還是建一個通用的 `pageHeaders.js` 把 Blog/Projects/Resume 的版頭文案都集中管理）
- 是否要先盤點 `ProjectsView.vue`、`ResumeView.vue` 是否也有類似的版頭文案結構（kicker + title + lead），再一次性決定存放方式，而不是先處理 Blog 再回頭重做。

下次接續時直接從這題問起，不要重新解釋「`posts.js` 不適合放版頭文案」這個已經達成共識的結論。

## 對話中收集到但尚未寫入程式碼的資訊（避免重複詢問）

- 空狀態樣式決定放 `src/styles/components/`（全域共用 class，非元件化），不放 `base/`（`base/` 只放設計 token）。
- PostCard.vue 抽取、`/post/:id` 動態路由、`PostView.vue` 依 id 載入內容：全部延後到接後端時一起處理，目前不要主動提起或動手。
- **命名慣例已澄清（純知識性問答，不需要寫入程式碼）**：靜態資料（物件/陣列，如 `posts`、`profileInfo`、未來的版頭文案模組）一律維持 camelCase，不要因為「內容不變」就改成全大寫 `SCREAMING_SNAKE_CASE`——全大寫只留給單一基本型別的真常數（如 `MAX_RETRY`、enum 值）。
- 已知但尚未修的技術債：`npm run format`（oxfmt）會把 `.vue` 的 `<script>` 改成雙引號 + 加分號，跟專案既有單引號/無分號慣例不一致，使用者尚未決定是否要補設定鎖定風格。
- 後續可選項（不急）：8 種 icon 在不同檔案的視覺尺寸不一致（14~19px），統一與否是另一個設計決策，這次刻意保留原尺寸沒動。

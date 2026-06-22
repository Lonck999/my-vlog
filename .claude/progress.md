# 進度紀錄：HomeView 優化（sr 助教引導）

> 最後更新：2026-06-22

## 目前任務

由 `sr` agent（資深工程師助教）以蘇格拉底式引導，針對 `src/views/home/HomeView.vue` 進行 code review 優化，依「變動大小由小到大」排序處理 5 個項目。

## 已完成步驟

1. **Lint / 格式細節清理**（已完成）
   - `HomeView.vue` import 補空格、`:src="'/images/avatar.jpg'"` 改為靜態 `src` 綁定
   - 跑過 `npm run format`，發現 oxfmt 會把 `<script>` 改成雙引號 + 加分號（跟專案既有單引號/無分號慣例不一致，**尚未處理，見下方待辦**）
   - 額外發現並解釋了 Vue template 的「whitespace-sensitive 格式化」現象（`<a><svg>` 之間的 `>` 換行黏字問題）

2. **`posts.js` 補 `id` 欄位**（已完成）
   - `src/data/posts.js` 每筆文章已有 `id: 1` ~ `id: 12`
   - `HomeView.vue` 第 98 行、`BlogView.vue` 第 69 行的 `v-for` 都已改成 `:key="post.id"`（原本是 `:key="post.title"`）

3. **HomeView 補空狀態分支 + 抽出共用樣式**（已完成）
   - 新增 `src/styles/components/_empty-state.scss`，定義通用 `.empty-state` class（`text-align: center` / `color: var(--text-muted)` / `padding: var(--space-16) 0` / `font-size: var(--text-md)`，**不含** `grid-column: 1 / -1`）
   - `src/styles/components/_index.scss` 已 `@forward 'empty-state';`
   - `HomeView.vue` 第 111 行：`<p v-if="latestPosts.length === 0" class="empty-state">目前還沒有文章。</p>`
   - `BlogView.vue` 第 81 行：`<p v-if="filteredPosts.length === 0" class="empty-state">這個分類還沒有文章。</p>`
   - `src/styles/pages/_blog.scss` 原本的 `.blog__empty` 規則已刪除，改為巢狀寫法 `.blog-grid .empty-state { grid-column: 1 / -1; }`（因為只有 BlogView 的 grid 容器需要這個版面屬性，HomeView 是 flex 不需要）

4. **`personalInfo.js` 命名重新檢視**（已完成）
   - 舊版：`homeViewAsideBase`（混雜個人資訊 + 選單標題 + 按鈕文案）、`homeViewSectionBase`
   - 新版拆成 4 個依語意分組的匯出：
     - `profileInfo`：`name` / `role` / `bio` / `techs`
     - `sidebarMenuConfig`：`title`（'分類導覽'）
     - `feedLabels`：`morePostsTitle`（'查看所有文章'，順手修掉了原本 `'看所有文章更多文章'` 的文案重複 typo）
     - `welcomeLabels`：`welcomeTitle` / `welcomeSubtitle` / `latestPostLabel`（camelCase，已修正中途一度出現的 `welcome_labels` snake_case 與 `config: '分類導覽'` 語意不清的問題）
   - `HomeView.vue` 第 3 行 import 與模板內所有引用都已同步改名

## 還沒做完的事

5. **抽取 `PostCard.vue` 共用元件**（待辦，是最大的改動，尚未開始）
   - 對象：`HomeView.vue` 第 97-112 行（`.postlist` 內的 `RouterLink v-for="post in latestPosts"`）與 `BlogView.vue` 對應的 `.blog-grid` 內 `RouterLink v-for="post in filteredPosts"`，兩處結構幾乎一致（meta 日期/分類/閱讀時間 + title + excerpt）
   - 已在對話中引導使用者思考的設計問題，**還沒有使用者的答案**：
     - `PostCard` 該吃哪些 props（候選：`post.date`、`post.category`（或已轉換好的 `label`）、`post.readTime`、`post.title`、`post.excerpt`；`categories` 查找表是否該整個傳入還是由外部先轉換好 `categoryLabel` 再傳入）
     - `<RouterLink ... to="/post">` 目前是**寫死的固定路徑**，不管哪篇文章都連到 `/post`（已知技術債，尚未討論要不要趁這次抽取順便改成 `/post/${post.id}` 之類的動態路徑——但目前專案路由 `src/router/index.js` 是否已有對應的動態路由尚未確認）
     - 整個卡片要連到哪個網址這件事，該由 `PostCard` 內部決定還是由父層傳入——尚未定案
   - 連帶提醒但尚未處理：SVG icon（GitHub / Mail / 履歷 / 箭頭，共 4 處內嵌 SVG）尚未抽成獨立 icon 元件，建議跟 `PostCard` 一起或之後處理

## 對話中收集到但尚未寫入程式碼的資訊（避免重複詢問）

- 使用者已確認 `BlogView.vue` 原本的空狀態 class 叫 `blog__empty`（已處理，僅留存於此作為歷史脈絡）
- 使用者已決定空狀態樣式要做成**全域共用 class**（非元件化），並選擇放在 `src/styles/components/` 而非 `base/`（理由：`base/` 只放設計 token，不放具體 UI 樣式）——此決策邏輯未來若有類似「樣式該放哪一層」的疑問可參考
- 使用者尚未回答：`PostCard.vue` 的 props 介面設計（見上方待辦）
- 已知但尚未修的技術債：`npm run format`（oxfmt）會把 `.vue` 的 `<script>` 區塊改成雙引號 + 加分號，跟專案既有的單引號、無分號慣例不一致，可能需要補一份 oxfmt/prettier 設定鎖定既有風格——使用者尚未決定是否處理

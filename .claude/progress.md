# 進度紀錄：HomeView 系列優化（sr 助教引導）

> 最後更新：2026-06-22

## 目前任務

由 `sr` agent（資深工程師助教）以蘇格拉底式引導，針對首頁／Blog／Resume／Projects 進行 code review 優化。第一輪（HomeView 5 項）、第二輪（全站 SVG icon 抽取）、第三輪（靜態頁面文案抽取）皆已完成。目前沒有進行中的子任務，下次可從「還沒做完的事」挑一項繼續，或請使用者提出新檔案要 review。

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

### 第三輪：靜態頁面文案抽取（已完成）

- 討論起點：BlogView 版頭文案（kicker/標題/說明）是否該放進 `posts.js`——已建立共識：不該放，`posts.js` 是文章資料，跟頁面文案是不同關注點。
- 接著討論 `AppHeader.vue` 的 `navLinks` 是否也該抽出去，即使只有一處使用——使用者決定：**要抽，統一放 `data/` 管理**，不以「使用次數」為抽取門檻。
- 歸類方式：使用者選擇**集中成一個 `pageContent.js`**（而非每頁各自一個檔案），依語意分組匯出。
- 新增 `src/data/pageContent.js`，匯出 `navLinks`、`blogPageHead`（`kickerLabel`/`title`/`lead`）、`projectsPageHead`（同上）。
- `AppHeader.vue`、`BlogView.vue`、`ProjectsView.vue` 已改用對應匯出，圖示（`IconSwap`/`IconFolder`）仍留在 template 裡（圖示是元件不是文字資料）。
- `npm run lint` 通過。
- **`ResumeView.vue` 當時刻意排除在範圍外**，遺留問題已在第四輪處理完畢。

### 第四輪：ResumeView 的 `cv-head` 文案抽取（已完成）

- 確認 `profileInfo.role`/`bio` 跟 `cv-head` 的職稱/tagline 內容不同，是**刻意**用不同語氣呈現（首頁輕鬆、履歷正式），使用者決定：**不合併，分開存放**。
- 歸類位置：使用者選擇放進 `personalInfo.js`（跟 `profileInfo` 同檔案，因為都是「關於這個人」的資料，只是用途不同），而不是塞進 `pageContent.js`（那邊是 kicker/title/lead 形狀的頁面文案，跟 profile 形狀不同）。
- `personalInfo.js` 新增 `resumeProfile`：`name`/`role`/`tagline`/`contacts`（`email`/`github`/`location`）。
- `ResumeView.vue` 的 `cv-head` 區塊（姓名、職稱、tagline、三個聯絡資訊）已改用 `resumeProfile.*`，`href="#"` 維持原樣（這些連結本來就是佔位符，不是這次範圍）。

### 第五輪：icon 尺寸不統一（已完成）

- 按「使用情境角色」重新分組盤點（而非單純照圖示種類比較），發現原本以為的 8 種尺寸落差，實際上只有 3 組是真的不一致：
  - Logo 標誌（`AppHeader`/`AppFooter` 的 `nav__mark` Sparkle）：18 vs 16 → 統一成 **18**
  - 獨立社群圖示按鈕（`AppFooter` 社群、`HomeView` 個人卡社群、`ProjectsView` 原始碼連結）：19/18/18 → 統一成 **18**
  - 向右箭頭 CTA（`HomeView`「查看所有文章」、`ProjectsView`「查看成品」）：16 vs 15 → 統一成 **16**
- 版頭 kicker（14）、Resume 區塊標題徽章（18）、聯絡資訊小圖示（15）這三組原本就一致，沒有動。
- 已修改 `AppFooter.vue`（Sparkle/Github/Mail 改 18）、`ProjectsView.vue`（ArrowRight 改 16）。

所有改動均已跑過 `npm run lint`（0 警告 0 錯誤）。

### 第六輪：重新檢視 PostCard.vue 抽取——結論翻轉，不該抽（已完成）

- 使用者要求優先處理 PostCard 抽取。動手前先確認路由技術債現況，發現使用者在這個對話之外已經自己把 `/post/:id` 動態路由、`PostView.vue` 依 `route.params.id` 動態載入文章、上一篇/下一篇導覽都做完了（git log：`f0717ae`/`f9aa447`/`8862b4e`），`HomeView.vue`/`BlogView.vue` 的 `RouterLink` 也已改用 `:to="{ name: 'post', params: { id: post.id } }"`。
- 接著去讀 `HomeView.vue`(`.postitem`) 跟 `BlogView.vue`(`.post-card`) 對應的 SCSS（`_home.scss`/`_cards.scss`），發現**這不是真正的重複**：兩者是刻意設計的不同視覺呈現（清單式 vs 卡片式，class 命名也不同），之前判斷「該抽成共用元件」是錯的——只看了資料欄位（date/category/title/excerpt）相似就誤判，沒有先查證 CSS。
- **結論（已修正）**：`PostCard.vue` **不該抽**，兩處 markup 維持現狀。真正重複、且該抽的只有 `categories.find((c) => c.key === post.category)?.label` 這段查找邏輯（兩處逐字相同），但**這部分使用者尚未要求動手**，目前還是兩處各自寫一次。
- 使用者要求把這個誤判的教訓寫進 sr 助教的設定，避免之後再犯：已修改 `.claude/agent/sr.md`（專案版）與 `C:\Users\user\.claude\agents\sr.md`（全域版），新增「7.1 抽取建議前的驗證義務」一節，要求之後建議抽元件前必須先讀 CSS/SCSS 查證，並區分「資料邏輯重複」（抽函式）vs「UI 結構重複」（才抽元件）。

## 還沒做完的事

### A. `categories.find()` 查找邏輯抽成 helper（可選，尚未做）

- 第六輪確認這是 `HomeView.vue`/`BlogView.vue`/`PostView.vue` 中唯一真正逐字重複的邏輯（`categories.find((c) => c.key === post.category)?.label`），但**使用者還沒要求動手**，純粹記錄這是未來如果要消除重複時該做的方向，不是 PostCard 那種 UI 元件抽取。

### B. `href="#"` 佔位連結（尚未處理，使用者上次選擇先跳過）

- `ResumeView.vue`/`HomeView.vue`/`AppFooter.vue`/`ProjectsView.vue` 裡的 GitHub、Mail、原始碼連結目前都是 `href="#"` 假連結，需要設成真實網址，或明確標註為待補。

### C. oxfmt 雙引號/分號風格不一致——已釐清，非設定問題（已解決）

- 實際排查發現 `.oxfmtrc.json` 早就設定正確（`"semi": false`、`"singleQuote": true`），不是設定缺漏。
- 真正原因是 `HomeView.vue` 在某次手動編輯後沒有重新跑過 `npm run format`，殘留了雙引號＋分號。
- 已執行 `npm run format`（對整個 `src/` 跑 oxfmt），修正了 10 個檔案的引號/分號風格（純格式，無邏輯異動，已用 `git diff` 逐一確認），`npm run lint` 通過。
- **後續建議**（未強制要求）：之後手動編輯 `.vue`/`.scss` 後，養成順手跑一次 `npm run format` 的習慣，避免風格再次漂移。

## 對話中收集到但尚未寫入程式碼的資訊（避免重複詢問）

- 空狀態樣式決定放 `src/styles/components/`（全域共用 class，非元件化），不放 `base/`（`base/` 只放設計 token）。
- **PostCard.vue 共用元件抽取**：仍延後（使用者原話「等之後上線完開始寫後端時再來改善」），但牽連的路由技術債使用者已自行解決，見上方 A 項最新狀態——下次討論時不要再假設路由還沒做。
- **命名慣例已澄清（純知識性問答，不需要寫入程式碼）**：靜態資料（物件/陣列，如 `posts`、`profileInfo`、版頭文案模組）一律維持 camelCase，不要因為「內容不變」就改成全大寫 `SCREAMING_SNAKE_CASE`——全大寫只留給單一基本型別的真常數（如 `MAX_RETRY`、enum 值）。
- 下次接續時，直接從「還沒做完的事」A（PostCard 本體是否還要延後）、B（`href="#"` 佔位連結）挑一個問使用者，C 已解決不用再提。

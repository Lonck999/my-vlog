# Commit 規範

本專案採用 [Conventional Commits](https://www.conventionalcommits.org/) 風格，這也是目前 git log 中已經在使用的慣例（例如 `feat: 初始化專案架構與基礎頁面`、`docs: 改寫專案 README 為中文說明文件`）。請延續這個風格，保持歷史紀錄一致、可被工具（如自動產生 changelog）解析。

## 1. 訊息格式

```
<type>: <subject>

[optional body]

[optional footer]
```

- `<type>`：說明這次變更的性質（見下方分類表）。
- `<subject>`：簡短描述「做了什麼」，建議使用中文（與既有歷史一致），祈使句、不要句尾加標點。
- `body`（選填）：說明「為什麼」要這樣改，而不是重複描述 diff 內容本身。
- `footer`（選填）：用於標記 Breaking Change、關聯 issue 等。

## 2. Type 分類

| Type | 用途 | 範例 |
| --- | --- | --- |
| `feat` | 新增功能 | `feat: 新增文章詳情頁面` |
| `fix` | 修補 bug | `fix: 修正分類篩選未重置頁碼的問題` |
| `docs` | 純文件變更（README、CLAUDE.md、註解） | `docs: 改寫專案 README 為中文說明文件` |
| `style` | 不影響邏輯的格式調整（排版、空白、命名大小寫） | `style: 統一元件命名為 PascalCase` |
| `refactor` | 重構（不新增功能、不修 bug，純結構調整） | `refactor: 抽取共用的卡片元件` |
| `perf` | 效能優化 | `perf: 改用虛擬清單渲染長列表` |
| `test` | 新增或修改測試 | `test: 補上 PostCard 元件的單元測試` |
| `build` | 建置工具、依賴套件相關 | `build: 升級 vite 至 v8` |
| `ci` | CI 設定相關 | `ci: 新增 e2e 測試的 GitHub Actions workflow` |
| `chore` | 雜項（不屬於以上分類） | `chore: 更新 .gitignore` |

## 3. 撰寫慣例

- ✅ 一個 commit 只做一件事，方便日後 `git revert`、`git bisect` 定位問題。

  ```
  feat: 新增作品集篩選功能
  fix: 修正導覽列在行動裝置上的層疊問題
  ```

- ❌ 避免把不相關的變更塞進同一個 commit。

  ```
  feat: 新增作品集篩選功能、順手修了一個樣式 bug、調整了 README
  ```

- ✅ subject 描述「結果」而非「過程」。

  ```
  fix: 修正卡片在 Safari 上的陰影渲染問題
  ```

- ❌ 過於模糊、無法從訊息得知實際變更內容。

  ```
  fix: 修 bug
  update: 一些調整
  ```

- 涉及多檔案的大型變更，可在 body 簡述影響範圍，方便 code review 與未來回溯：

  ```
  refactor: 將文章列表的篩選邏輯抽取為 composable

  - 新增 src/composables/usePostFilter.js
  - PostList.vue、ArchiveView.vue 改用此 composable
  - 移除兩處重複的篩選邏輯
  ```

## 4. 不要做的事

- 不使用 `--no-verify` 跳過 commit hook（除非使用者明確要求）。
- 不在同一個 commit 訊息中混用中英文 type 描述風格不一致（例如忽然冒出 `Update: xxx` 大寫開頭）。
- 不直接 `git commit --amend` 修改已經存在的歷史 commit，除非使用者明確要求；預設一律建立新 commit。

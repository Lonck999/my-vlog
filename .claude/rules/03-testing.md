# 測試撰寫慣例

本專案使用 **Vitest** 做單元測試、**Playwright** 做 e2e 測試。這份文件定義命名、放置位置與撰寫慣例。

## 1. 單元測試（Vitest）

### 放置位置與命名

- 測試檔放在對應原始檔同層的 `__tests__/` 子目錄下，命名為 `<元件或模組名>.spec.js`。

  ```
  src/
    components/
      PostCard.vue
      __tests__/
        PostCard.spec.js
    composables/
      usePostFilter.js
      __tests__/
        usePostFilter.spec.js
  ```

- ✅ 測試檔名與被測檔名一致（去掉副檔名差異），方便一眼看出對應關係。
- ❌ 避免把所有測試集中放在一個與 `src/` 平行的頂層 `tests/` 目錄裡，導致定位困難。

### 撰寫慣例

- 使用 `@vue/test-utils` 的 `mount`/`shallowMount` 測元件；單純邏輯（composable、工具函式）直接呼叫測試，不必經過元件渲染。
- 測試描述使用 `describe`/`it`，標題以「行為」而非「實作細節」命名：

  ```js
  // ✅ 描述行為
  describe('PostCard', () => {
    it('當文章已發布時顯示發布日期', () => {})
    it('當 cover 圖片網址為空時，顯示預設佔位圖', () => {})
  })
  ```

  ```js
  // ❌ 描述實作（容易隨著重構失效卻沒測到真正行為）
  describe('PostCard', () => {
    it('呼叫了 formatDate 函式', () => {})
  })
  ```

- 涉及 Pinia store 的元件測試，使用 `createTestingPinia`（`@pinia/testing`，若尚未安裝需先新增依賴）建立隔離的 store 實例，不要讓測試之間共享全域 store 狀態。
- 涉及非同步資料（未來接 API 後）的測試，務必涵蓋三種狀態：載入中、成功有資料、成功但空陣列、失敗。詳見 [`04-error-handling.md`](./04-error-handling.md)。

### 是否要求新功能附測試

- **新增的 composable、工具函式（純邏輯）**：原則上要求附單元測試，因為這類程式碼最容易被靜默破壞、且測試成本低。
- **新增的展示型元件（單純呈現靜態資料，無互動邏輯）**：可以不強制要求測試，但若元件中含有條件渲染（v-if 分支）、計算屬性，建議至少覆蓋分支。
- **修 bug 時**：建議先補一個會重現 bug 的測試（驗證它在修復前會失敗），再修正程式碼讓測試通過，避免日後回歸（regression）。

## 2. e2e 測試（Playwright）

### 放置位置與命名

- 放在專案根目錄 `e2e/` 資料夾，命名為 `<功能或頁面>.spec.js`，例如 `e2e/home.spec.js`、`e2e/post-detail.spec.js`。

### 撰寫慣例

- e2e 測試聚焦在「使用者真實會做的操作流程」，例如：「使用者從首頁點進某篇文章，能看到完整內容」，而不是重複單元測試已經涵蓋的元件內部邏輯。
- 優先使用語意化的選擇器（`getByRole`、`getByText`），避免依賴容易變動的 CSS class 或 DOM 結構作為選擇依據：

  ```js
  // ✅ 語意化選擇器，對 DOM 結構/樣式調整有更高的容忍度
  await page.getByRole('link', { name: '閱讀更多' }).click()
  ```

  ```js
  // ❌ 依賴實作細節，CSS 重構就會測試失效
  await page.locator('.post-card__link--primary').click()
  ```

- 每個 e2e 案例之間應該互相獨立，不要依賴前一個測試殘留的瀏覽器狀態（如 localStorage、cookie）；需要的前置狀態請在測試內用 `beforeEach`/fixture 明確建立。
- CI 模式下 e2e 測試是跑在 `npm run build` 後的 preview server 上（見 `CLAUDE.md` 的指令說明），因此 e2e 測試不應該依賴 dev server 特有的行為（如 HMR）。

### 是否要求新功能附測試

- **新增頁面或新增關鍵使用者流程（如表單送出、導覽切換）**：建議至少補一個 e2e 測試覆蓋主要路徑（happy path）。
- **純樣式調整、文案修改**：不需要新增 e2e 測試，但若調整影響到既有測試使用的選擇器，需要同步檢查既有測試是否仍會通過。

## 3. 共通原則

- 測試應該是「會說話的文件」：看測試標題與內容，就能大致理解這個模組/頁面該有的行為，不需要回頭看實作。
- 發現某個測試案例的設置（setup）邏輯在多個測試檔中重複出現 3 次以上時，考慮抽取為共用的測試 fixture 或 helper 函式（呼應 `CLAUDE.md` 第7節的三次法則）。

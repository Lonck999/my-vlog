# 資料載入中 / 空值 / 錯誤狀態防呆慣例

本專案目前所有內容都來自 `src/data/*.js` 的靜態陣列，**沒有非同步請求**，因此目前不會遇到「載入中」或「請求失敗」的狀態。但本文件先把規範定下來，確保未來把任何 `src/data/*.js` 換成真實 API（無論是 Nuxt 的 `useFetch`/`useAsyncData`，還是純 Vue 專案改用 `fetch`/`axios`）時，每一個資料消費的畫面都「預設」要處理四種狀態，而不是事後補。

## 1. 四種必須處理的狀態

任何一個非同步資料的畫面，都應該明確區分以下四種狀態，缺一不可：

1. **載入中（loading）**：請求尚未完成。
2. **成功且有資料（success + data）**：正常顯示內容。
3. **成功但空值（success + empty）**：請求成功，但資料是空陣列/空物件/null。**這跟「失敗」是完全不同的狀態，UI 表現也應該不同。**
4. **失敗（error）**：請求本身發生錯誤（網路錯誤、伺服器回傳非 2xx、資料格式不符預期）。

## 2. 為什麼「空值」與「錯誤」要分開處理

這是最容易被忽略、卻最常造成「使用者體驗很怪」的地方：

- ❌ 錯誤做法：把空陣列和錯誤都當成同一種「顯示不出來」的狀態，統一丟出一句「載入失敗，請稍後再試」。

  ```vue
  <template>
    <div v-if="!posts.length">載入失敗，請稍後再試</div>
    <PostCard v-for="p in posts" :key="p.id" :post="p" />
  </template>
  ```

  上面這段程式碼有一個邏輯陷阱：當文章列表「本來就還沒有任何文章」（合理的空狀態）時，使用者會被誤導以為系統壞了；反之若請求真的失敗但 `posts` 因為前一次成功請求殘留了舊資料，使用者反而看不到任何錯誤提示。

- ✅ 正確做法：用獨立的狀態變數分別追蹤，畫面語意才會準確。

  ```vue
  <template>
    <p v-if="isLoading">載入中…</p>
    <p v-else-if="error">資料載入失敗，請稍後再試</p>
    <p v-else-if="posts.length === 0">目前還沒有任何文章</p>
    <PostCard v-else v-for="p in posts" :key="p.id" :post="p" />
  </template>
  ```

## 3. Composable 層的慣例（未來接 API 時）

建議把「載入中/資料/錯誤」三個狀態封裝在 composable 中回傳，而不是讓每個元件各自手刻一套：

```js
// ✅ 概念示意（非本專案真實程式碼，僅說明結構）
// composables/useAsyncResource.js
export function useAsyncResource(fetcher) {
  const data = ref(null)
  const isLoading = ref(false)
  const error = ref(null)

  async function load() {
    isLoading.value = true
    error.value = null
    try {
      data.value = await fetcher()
    } catch (e) {
      error.value = e
    } finally {
      isLoading.value = false
    }
  }

  return { data, isLoading, error, load }
}
```

- 若專案後續改用 Nuxt，優先使用 `useFetch`/`useAsyncData` 內建的 `pending`/`status`/`error` 回傳值，不要重新發明一套狀態管理邏輯。
- 若同樣的「載入中/空值/錯誤」UI 區塊（例如 spinner、空狀態插圖、錯誤訊息卡片）在三個以上的頁面重複出現，依 `CLAUDE.md` 第7節的三次法則，應抽取為共用元件（例如 `LoadingState.vue`、`EmptyState.vue`、`ErrorState.vue`），而不是每個 view 各寫一份。

## 4. 錯誤訊息的前後端責任界線

- **前端**：負責把錯誤「翻譯」成使用者看得懂的語言（例如把 HTTP 500 轉成「伺服器忙線中，請稍後再試」），並決定 UI 上要不要提供重試按鈕。前端不應該直接把後端回傳的原始錯誤堆疊（stack trace）或內部錯誤訊息原封不動顯示給使用者。
- **後端**（未來若以 Go/Rust 實作 API）：負責回傳結構化、語意明確的錯誤（例如統一的錯誤碼/錯誤訊息格式），並確保 4xx（用戶端問題，如資料格式錯誤、未授權）與 5xx（伺服器端問題）語意正確區分，前端才能依此分流處理（4xx 通常提示使用者修正輸入；5xx 才適合顯示「稍後再試」並提供重試）。

## 5. 目前階段的檢查清單

雖然現在沒有非同步請求，但在 review 任何「即將要把 `src/data/*.js` 替換成 API 呼叫」的 PR 時，請對照確認：

- [ ] 是否明確區分 loading / success-with-data / success-but-empty / error 四種狀態？
- [ ] 空狀態與錯誤狀態的文案、UI 是否不同，不會讓使用者混淆？
- [ ] 是否把錯誤處理邏輯封裝在 composable 中，而不是分散在多個元件裡重複手刻？
- [ ] 是否避免把後端原始錯誤訊息直接顯示給使用者？

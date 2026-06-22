# 暖光 warmlight — SCSS 架構（7-1 Pattern）

把現有 CSS 依 **Sass 7-1 Pattern** 拆成可維護的來源樹，可直接搬進 Vue 3 + Vite 專案。

```
scss/
├── abstracts/        # 不輸出 CSS：編譯期工具
│   ├── _variables.scss   # 斷點 map、layout 寬度、z-index
│   ├── _functions.scss   # bp() 取斷點、rem()
│   ├── _mixins.scss      # respond-to / card-surface / hover-lift / focus-ring / mono-label / line-clamp
│   └── _index.scss       # @forward 上面三個
├── base/
│   ├── _fonts.scss       # Google Fonts CDN（文楷 / Noto Sans TC / JetBrains Mono）
│   ├── _root.scss        # :root 設計 token → CSS custom properties（真實來源）
│   ├── _reset.scss       # 輕量歸零
│   ├── _typography.scss  # body/h1.. 預設 + 長文 .prose
│   └── _index.scss
├── components/       # 對應設計系統的元件
│   ├── _button.scss      # <Button>
│   ├── _tag.scss         # <Tag> + <TechChip>
│   ├── _cards.scss       # <PostCard> <CategoryCard> <Breadcrumb> <Avatar>
│   ├── _code-block.scss  # 文章頁暖炭黑程式碼區塊
│   └── _index.scss
├── pages/            # 各頁專屬版型
│   ├── _home.scss        # profile 側欄 + 文章列表
│   ├── _blog.scss        # 篩選列 + grid
│   ├── _post.scss        # 閱讀排版周邊
│   ├── _projects.scss    # 作品卡
│   ├── _resume.scss      # timeline + 技能樹 + 學歷 + 列印
│   └── _index.scss
└── main.scss         # 入口：依序 @use 各層
```

> `themes/`（深色模式）與 `vendors/`（第三方）目前用不到，先省略；要 dark mode 時新增 `themes/_dark.scss`。

## 兩層 token 設計（重要）

- **執行期**：`base/_root.scss` 把所有色彩/字級/間距輸出成 **CSS custom properties**（`--color-primary` 等）。這是真實來源 —— 設計系統的元件與所有樣式都吃 `var(--*)`，因此能在執行期切換（如未來深色模式）。
- **編譯期**：`abstracts/_variables.scss` 只放 **SCSS 在編譯時需要的值**（斷點、layout 寬度），給 `@media`、mixin 用 —— 因為 CSS 變數無法用在 media query 條件裡。

兩者並存，不重複維護顏色。

## 搭 Vue 3 + Vite

`vite.config.ts` 讓每個 `.vue` 的 `<style lang="scss">` 自動取得 abstracts：

```ts
export default defineConfig({
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "@/styles/abstracts" as *;`,
      },
    },
  },
})
```

全域樣式在進入點載入一次：

```ts
// main.ts
import './styles/main.scss'
```

接著元件內可直接用 mixin / 斷點：

```vue
<style lang="scss" scoped>
.card {
  @include card-surface;
  @include hover-lift;
  @include respond-to('md') {
    /* ... */
  }
}
</style>
```

## 建議

- `components/` 與 `pages/` 的樣式，實務上可改成各 `.vue` 元件的 `<style scoped>` 自帶，更貼近 Vue 元件化；`pages/` 只留真正跨元件的頁面級樣式。本架構提供的版本是「全域樣式」起點，方便先整包搬入。
- 一律 `@use` / `@forward`，不要 `@import`（已棄用）。

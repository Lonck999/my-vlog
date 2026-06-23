export const categories = [
  { key: 'lang', label: '語言筆記' },
  { key: 'frame', label: '框架筆記' },
  { key: 'work', label: '工作經驗' },
  { key: 'project', label: '開發專案' },
]

export const posts = [
  {
    id: 1,
    date: '2026.06.20',
    category: 'frame',
    title: '叫我做Vitest??\n不是console.log就好的嗎??',
    excerpt:
      '一開始前輩跟我說要寫單元測試的時候，我心裡想說：『單元測試？這什麼？』，阿不是console.log看一下是不是正確的就好了嗎?',
  },
  {
    id: 2,
    date: '2026.05.09',
    category: 'lang',
    title: 'TypeScript 的 infer 到底在 infer 什麼？',
    excerpt:
      '看了無數次官方文件還是霧煞煞，直到我自己手刻了一個 ReturnType，才終於把它想通。原來關鍵在於它出現的位置。',
  },
  {
    id: 3,
    date: '2026.04.27',
    category: 'frame',
    title: 'Pinia 不只是 Vuex 的替代品',
    excerpt: '從 Vuex 搬家到 Pinia 之後，我重新理解了「狀態」這件事到底該放在哪、又該由誰負責。',
    tags: ['Vue', 'Pinia', '狀態管理', '重構'],
    content: `
      <p>從 Vuex 搬到 Pinia 的那個下午，我以為只是換個 API。把 <code>mutations</code> 拿掉、<code>state</code> 變成 <code>ref</code>、語法清爽很多 — 一開始我對它的理解就停在這裡。</p>
      <p>直到專案越長越大，我才發現真正改變的不是寫法，而是我<strong>怎麼思考「狀態該放在哪裡」</strong>這件事。這篇就把那段重新理解的過程記下來。</p>

      <h2>先看一個最小的 store</h2>
      <p>Pinia 的 setup store 寫起來，幾乎就像在寫一個普通的 composable。<code>ref</code> 是 state、<code>computed</code> 是 getter、一般函式就是 action：</p>

      <div class="codeblock">
        <div class="codeblock__bar">
          <span class="codeblock__dot" style="background: #e66a5a"></span>
          <span class="codeblock__dot" style="background: #e6b86a"></span>
          <span class="codeblock__dot" style="background: #7fb87c"></span>
          <span class="codeblock__file">stores/cart.ts</span>
        </div>
        <pre><code><span class="tok-key">import</span> { defineStore } <span class="tok-key">from</span> <span class="tok-str">'pinia'</span>
<span class="tok-key">import</span> { ref, computed } <span class="tok-key">from</span> <span class="tok-str">'vue'</span>

<span class="tok-key">export const</span> <span class="tok-fn">useCartStore</span> = <span class="tok-fn">defineStore</span><span class="tok-punc">(</span><span class="tok-str">'cart'</span><span class="tok-punc">,</span> () =&gt; {
  <span class="tok-key">const</span> items = <span class="tok-fn">ref</span><span class="tok-punc">(</span><span class="tok-punc">[]</span><span class="tok-punc">)</span>

  <span class="tok-com">// 衍生狀態：總價，會自動跟著 items 變</span>
  <span class="tok-key">const</span> total = <span class="tok-fn">computed</span><span class="tok-punc">(</span>() =&gt;
    items.value.<span class="tok-fn">reduce</span><span class="tok-punc">(</span>(sum, it) =&gt; sum + it.price, <span class="tok-num">0</span><span class="tok-punc">)</span>
  <span class="tok-punc">)</span>

  <span class="tok-key">function</span> <span class="tok-fn">add</span><span class="tok-punc">(</span>product<span class="tok-punc">)</span> {
    items.value.<span class="tok-fn">push</span><span class="tok-punc">(</span>product<span class="tok-punc">)</span>
  }

  <span class="tok-key">return</span> { items, total, add }
})</code></pre>
      </div>

      <p>沒有 <code>mutations</code> 這層了。一開始我很不安 — 少了那層約束，狀態不就到處都能改？但寫久了反而發現，<strong>約束從來不是靠框架，而是靠你把邏輯收在哪</strong>。</p>

      <h2>真正的轉變：store 是「邊界」，不是「倉庫」</h2>
      <p>以前我把 Vuex 當成一個大倉庫，什麼都往裡塞。換到 Pinia 之後，我開始把每個 store 看成一個<strong>有清楚邊界的小模組</strong> — 它負責一件事，對外只暴露該暴露的。</p>

      <blockquote>
        <p>「狀態管理難的從來不是工具，是你願不願意替每一塊資料想清楚：它屬於誰、誰能改它。」</p>
      </blockquote>

      <h3>我現在分 store 的三個問題</h3>
      <ul>
        <li>這塊資料<strong>跨幾個頁面</strong>用？只有一個頁面用到，可能根本不該進 store。</li>
        <li>它的<strong>生命週期</strong>多長？跟著使用者登入登出，還是只活在一次操作裡？</li>
        <li>誰<strong>有資格改它</strong>？把改的入口收斂成幾個 action，比到處 <code>state.x = y</code> 安全太多。</li>
      </ul>

      <figure>
        <div class="figure-ph">[ 截圖：Vue DevTools 裡的 Pinia 面板 ]</div>
        <figcaption>把 store 拆小之後，DevTools 的時間旅行也跟著好讀很多。</figcaption>
      </figure>

      <h2>小結</h2>
      <p>Pinia 給我的不是更短的程式碼，而是一個重新思考的機會。如果你也正準備搬家，別急著一比一翻譯舊的 Vuex module — 趁這次，好好替每塊狀態重新想一次邊界。</p>
    `,
  },
  {
    id: 4,
    date: '2026.04.15',
    category: 'frame',
    title: '那些 Vue 文件不會寫的 reactive 坑',
    excerpt:
      '解構 reactive 物件為什麼會失去響應？這個坑我踩了三次才記住，這次認真把前因後果寫下來。',
  },
  {
    id: 5,
    date: '2026.03.30',
    category: 'frame',
    title: '為什麼我從 Options API 換到 Composition API',
    excerpt: '一開始很抗拒，覺得多此一舉。真正讓我改觀的，是某次重構一個八百行的元件。',
  },
  {
    id: 6,
    date: '2026.03.21',
    category: 'lang',
    title: 'SCSS 的 @use 與 @import，我終於搞懂了',
    excerpt:
      '@import 要被淘汰了，但 @use 的命名空間一開始真的讓我很困惑。整理一份自己看得懂的筆記。',
  },
  {
    id: 7,
    date: '2026.03.08',
    category: 'project',
    title: '做了一個記帳 App，才知道狀態管理有多難',
    excerpt: '原本想說一個週末就能做完，結果光是「一筆交易要怎麼存」就改了五版設計。',
  },
  {
    id: 8,
    date: '2026.02.24',
    category: 'lang',
    title: 'JavaScript 的 this，我用三個情境一次講清楚',
    excerpt:
      '面試最常被問、自己也最常搞錯的 this。這次用一般函式、箭頭函式、call/apply 三組對照來記。',
  },
  {
    id: 9,
    date: '2026.02.10',
    category: 'work',
    title: '第一次 code review 被退十次，我學到的事',
    excerpt: '新人時期那段被退 PR 退到懷疑人生的日子，現在回頭看，每一條 comment 都是禮物。',
  },
  {
    id: 10,
    date: '2026.01.29',
    category: 'frame',
    title: 'Vite 的 HMR 為什麼這麼快？我去翻了原始碼',
    excerpt: '用了很久卻沒想過原理。趁著一個下午，把 dev server 那條路徑追了一遍。',
  },
  {
    id: 11,
    date: '2026.01.12',
    category: 'project',
    title: '把部落格從 Nuxt 搬到純 Vite 的取捨',
    excerpt: 'SSR 對個人部落格真的需要嗎？記錄一次「做減法」的決定，以及搬完之後的真實感受。',
  },
  {
    id: 12,
    date: '2025.12.30',
    category: 'lang',
    title: 'CSS Grid 的 minmax 與 auto-fit，終於不再背公式',
    excerpt: 'responsive grid 一直是抄來抄去。這次把 auto-fit / auto-fill 的差別徹底想通了。',
  },
]

export const categoryCounts = {
  lang: 14,
  frame: 21,
  work: 9,
  project: 6,
}

export const emptyBlog = '目前還沒有文章。'



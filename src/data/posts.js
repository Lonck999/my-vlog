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
    tags: ['Vue', 'Vitest', '單元測試'],
  },
  {
    id: 2,
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
]

export const categoryCounts = {
  lang: 14,
  frame: 21,
  work: 9,
  project: 6,
}

export const emptyBlog = '目前還沒有文章。'



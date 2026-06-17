<template>
  <main>
    <div class="container container--narrow">
      <article class="article">
        <nav class="breadcrumb article__breadcrumb" aria-label="breadcrumb">
          <RouterLink to="/">首頁</RouterLink><span class="breadcrumb__sep">/</span>
          <RouterLink to="/blog">文章</RouterLink><span class="breadcrumb__sep">/</span>
          <RouterLink :to="{ path: '/blog', query: { category: 'frame' } }">框架筆記</RouterLink><span class="breadcrumb__sep">/</span>
          <span class="breadcrumb__current">Pinia 不只是 Vuex 的替代品</span>
        </nav>

        <header class="article__head">
          <div class="article__meta-top"><span class="tag tag--frame tag--sm">框架筆記</span></div>
          <h1 class="article__title">Pinia 不只是 Vuex 的替代品 — 我重新理解了狀態管理</h1>
          <div class="article__byline">
            <span class="avatar avatar--sm">R</span>
            <span class="article__author-name">Ray</span>
            <span class="article__byline-dot"></span><span>2026.04.27</span>
            <span class="article__byline-dot"></span><span>9 分鐘閱讀</span>
          </div>
        </header>

        <div class="prose">
          <p>從 Vuex 搬到 Pinia 的那個下午，我以為只是換個 API。把 <code>mutations</code> 拿掉、<code>state</code> 變成 <code>ref</code>、語法清爽很多 — 一開始我對它的理解就停在這裡。</p>
          <p>直到專案越長越大，我才發現真正改變的不是寫法，而是我<strong>怎麼思考「狀態該放在哪裡」</strong>這件事。這篇就把那段重新理解的過程記下來。</p>

          <h2>先看一個最小的 store</h2>
          <p>Pinia 的 setup store 寫起來，幾乎就像在寫一個普通的 composable。<code>ref</code> 是 state、<code>computed</code> 是 getter、一般函式就是 action：</p>

          <div class="codeblock">
            <div class="codeblock__bar">
              <span class="codeblock__dot" style="background:#E66A5A"></span>
              <span class="codeblock__dot" style="background:#E6B86A"></span>
              <span class="codeblock__dot" style="background:#7FB87C"></span>
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

          <blockquote><p>「狀態管理難的從來不是工具，是你願不願意替每一塊資料想清楚：它屬於誰、誰能改它。」</p></blockquote>

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
          <p>下一篇我想寫 <RouterLink :to="{ path: '/blog', query: { category: 'frame' } }">store 之間怎麼互相依賴又不打結</RouterLink>，那又是另一個我踩過的坑了。</p>
        </div>

        <div class="post-tags">
          <span class="post-tags__label">標籤</span>
          <span class="tag tag--neutral tag--sm">Vue</span>
          <span class="tag tag--neutral tag--sm">Pinia</span>
          <span class="tag tag--neutral tag--sm">狀態管理</span>
          <span class="tag tag--neutral tag--sm">重構</span>
        </div>

        <nav class="post-nav">
          <RouterLink to="/post">
            <span class="post-nav__dir">← 上一篇</span>
            <span class="post-nav__title">那些 Vue 文件不會寫的 reactive 坑</span>
          </RouterLink>
          <RouterLink to="/post" class="is-next">
            <span class="post-nav__dir">下一篇 →</span>
            <span class="post-nav__title">TypeScript 的 infer 到底在 infer 什麼？</span>
          </RouterLink>
        </nav>
      </article>
    </div>
  </main>
</template>

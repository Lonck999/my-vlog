<script setup>
import { posts, categories, categoryCounts } from '@/data/posts'

const latestPosts = posts.slice(0, 6)
</script>

<template>
  <main>
    <div class="container">
      <div class="home">
        <aside class="profile">
          <div class="profile__card">
            <div class="profile__photo-wrap">
              <img class="profile__photo" :src="'/images/avatar.jpg'" alt="Ray 的照片" />
            </div>
            <h1 class="profile__name">地瓜球工程師</h1>
            <p class="profile__role">FRONTEND ENGINEER</p>
            <p class="profile__bio">前端工程師，也是一個還在學的人。用 Vue 與 TypeScript 過日子，把學到的東西、踩過的坑都記在這裡。</p>
            <div class="profile__chips">
              <span class="techchip"><span class="techchip__dot" style="background:#42B883"></span>Vue 3</span>
              <span class="techchip"><span class="techchip__dot" style="background:#3178C6"></span>TypeScript</span>
              <span class="techchip"><span class="techchip__dot" style="background:#00DC82"></span>Nuxt.js</span>
              <span class="techchip"><span class="techchip__dot" style="background:#F0751F"></span>Pinia</span>
              <span class="techchip"><span class="techchip__dot" style="background:#38bdf8ff"></span>TailwindCSS</span>
              <span class="techchip"><span class="techchip__dot" style="background:#CD6799"></span>SCSS</span>
            </div>
            <div class="profile__social">
              <a href="#" aria-label="GitHub"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg></a>
              <a href="#" aria-label="Mail"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 5L2 7"/></svg></a>
              <RouterLink to="/resume" aria-label="履歷"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg></RouterLink>
            </div>
            <nav class="profile__cats">
              <div class="cats-title">分類導覽</div>
              <RouterLink class="cat-link" :to="{ path: '/blog', query: { category: 'lang' } }">
                <span class="cat-link__dot" style="background:var(--cat-lang-fg)"></span>
                <span class="cat-link__name">語言筆記</span>
                <span class="cat-link__count">{{ categoryCounts.lang }}</span>
              </RouterLink>
              <RouterLink class="cat-link" :to="{ path: '/blog', query: { category: 'frame' } }">
                <span class="cat-link__dot" style="background:var(--cat-frame-fg)"></span>
                <span class="cat-link__name">框架筆記</span>
                <span class="cat-link__count">{{ categoryCounts.frame }}</span>
              </RouterLink>
              <RouterLink class="cat-link" :to="{ path: '/blog', query: { category: 'work' } }">
                <span class="cat-link__dot" style="background:var(--cat-work-fg)"></span>
                <span class="cat-link__name">工作經驗</span>
                <span class="cat-link__count">{{ categoryCounts.work }}</span>
              </RouterLink>
              <RouterLink class="cat-link" to="/projects">
                <span class="cat-link__dot" style="background:var(--cat-project-fg)"></span>
                <span class="cat-link__name">開發專案</span>
                <span class="cat-link__count">{{ categoryCounts.project }}</span>
              </RouterLink>
            </nav>
          </div>
        </aside>

        <section class="feed">
          <h2 class="feed__hello">嗨，我是 地瓜球工程師 <em>👋</em></h2>
          <p class="feed__sub">歡迎來到我的角落。這裡沒有什麼高深的大道理，只有一個工程師慢慢寫下來的學習筆記與真實經驗。</p>

          <div class="feed__label">最新文章</div>
          <div class="postlist">
            <RouterLink v-for="post in latestPosts" :key="post.title" class="postitem" to="/post">
              <div class="postitem__meta">
                <span>{{ post.date }}</span>
                <span class="dot"></span>
                <span class="tag tag--sm" :class="`tag--${post.category}`">
                  {{ categories.find((c) => c.key === post.category)?.label }}
                </span>
                <span class="dot"></span>
                <span>{{ post.readTime }}閱讀</span>
              </div>
              <h3 class="postitem__title">{{ post.title }}</h3>
              <p class="postitem__excerpt">{{ post.excerpt }}</p>
            </RouterLink>
          </div>
          <div class="feed__more">
            <RouterLink class="btn btn--secondary btn--md" to="/blog">
              看所有文章
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </RouterLink>
          </div>
        </section>
      </div>
    </div>
  </main>
</template>

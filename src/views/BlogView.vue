<script setup>
import { computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { posts, categories } from '@/data/posts'

const route = useRoute()
const selectedCategory = ref(route.query.category ?? 'all')

watch(
  () => route.query.category,
  (category) => {
    selectedCategory.value = category ?? 'all'
  },
)

const filteredPosts = computed(() =>
  selectedCategory.value === 'all'
    ? posts
    : posts.filter((post) => post.category === selectedCategory.value),
)
</script>

<template>
  <main>
    <div class="container">
      <header class="page-head">
        <span class="page-head__kicker">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m16 18 6-6-6-6M8 6l-6 6 6 6"/></svg>
          BLOG · 文章
        </span>
        <h1 class="page-head__title">寫下來，才算真的學會</h1>
        <p class="page-head__lead">語言的底層、框架的細節、工作裡真實踩過的坑 — 都記在這。挑個主題慢慢逛。</p>
      </header>

      <div class="filterbar">
        <span class="filterbar__label">分類</span>
        <span
          class="tag tag--outline tag--md"
          :class="{ 'is-active': selectedCategory === 'all' }"
          @click="selectedCategory = 'all'"
        >全部</span>
        <span
          v-for="category in categories"
          :key="category.key"
          class="tag tag--outline tag--md"
          :class="{ 'is-active': selectedCategory === category.key }"
          @click="selectedCategory = category.key"
        >{{ category.label }}</span>
        <span class="blog-count">{{ filteredPosts.length }} 篇文章</span>
      </div>

      <section class="block" style="padding-top:0">
        <div class="blog-grid">
          <RouterLink v-for="post in filteredPosts" :key="post.title" class="post-card" to="/post">
            <div class="post-card__meta">
              <span>{{ post.date }}</span>
              <span class="tag tag--sm" :class="`tag--${post.category}`">
                {{ categories.find((c) => c.key === post.category)?.label }}
              </span>
              <span>{{ post.readTime }}</span>
            </div>
            <h3 class="post-card__title">{{ post.title }}</h3>
            <p class="post-card__excerpt">{{ post.excerpt }}</p>
          </RouterLink>

          <p v-if="filteredPosts.length === 0" class="blog-empty">這個分類還沒有文章。</p>
        </div>
      </section>
    </div>
  </main>
</template>

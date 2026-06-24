<script setup>
import { computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { posts, categories, emptyBlog } from '@/data/posts'
import { blogPageHead } from '@/data/pageContent'
import IconSwap from '@/components/icons/IconSwap.vue'

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
          <IconSwap :size="14" />
          {{ blogPageHead.kickerLabel }}
        </span>
        <h1 class="page-head__title">{{ blogPageHead.title }}</h1>
        <p class="page-head__lead">{{ blogPageHead.lead }}</p>
      </header>

      <div class="filterbar">
        <span class="filterbar__label">分類</span>
        <span
          class="tag tag--outline tag--md"
          :class="{ 'is-active': selectedCategory === 'all' }"
          @click="selectedCategory = 'all'"
          >全部</span
        >
        <span
          v-for="category in categories"
          :key="category.key"
          class="tag tag--outline tag--md"
          :class="{ 'is-active': selectedCategory === category.key }"
          @click="selectedCategory = category.key"
          >{{ category.label }}</span
        >
        <span class="blog-count">{{ filteredPosts.length }} 篇文章</span>
      </div>

      <section class="block" style="padding-top: 0">
        <div class="blog-grid">
          <RouterLink
            v-for="post in filteredPosts"
            :key="post.id"
            class="post-card"
            :to="{ name: 'post', params: { id: post.id } }"
          >
            <div class="post-card__meta">
              <span>{{ post.date }}</span>
              <span class="tag tag--sm" :class="`tag--${post.category}`">
                {{ categories.find((c) => c.key === post.category)?.label }}
              </span>
            </div>
            <h3 class="post-card__title">{{ post.title }}</h3>
            <p class="post-card__excerpt">{{ post.excerpt }}</p>
          </RouterLink>

          <p v-if="filteredPosts.length === 0" class="empty-state">{{ emptyBlog }}</p>
        </div>
      </section>
    </div>
  </main>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { posts, categories } from '@/data/posts'
import { profileInfo } from '@/data/personalInfo'

const route = useRoute()

const postIndex = computed(() => posts.findIndex((p) => String(p.id) === route.params.id))
const post = computed(() => posts[postIndex.value])

const categoryLabel = computed(
  () => categories.find((c) => c.key === post.value?.category)?.label,
)

const bodyHtml = computed(() => post.value?.content ?? `<p>${post.value?.excerpt ?? ''}</p>`)

const prevPost = computed(() => (postIndex.value > 0 ? posts[postIndex.value - 1] : null))
const nextPost = computed(() =>
  postIndex.value >= 0 && postIndex.value < posts.length - 1 ? posts[postIndex.value + 1] : null,
)
</script>

<template>
  <main>
    <div class="container container--narrow">
      <article v-if="post" class="article">
        <nav class="breadcrumb article__breadcrumb" aria-label="breadcrumb">
          <RouterLink to="/">首頁</RouterLink><span class="breadcrumb__sep">/</span>
          <RouterLink to="/blog">文章</RouterLink><span class="breadcrumb__sep">/</span>
          <RouterLink :to="{ path: '/blog', query: { category: post.category } }">{{
            categoryLabel
          }}</RouterLink
          ><span class="breadcrumb__sep">/</span>
          <span class="breadcrumb__current">{{ post.title }}</span>
        </nav>

        <header class="article__head">
          <div class="article__meta-top">
            <span class="tag tag--sm" :class="`tag--${post.category}`">{{ categoryLabel }}</span>
          </div>
          <h1 class="article__title">{{ post.title }}</h1>
          <div class="article__byline">
            <span class="avatar avatar--sm">{{ profileInfo.name.charAt(0) }}</span>
            <span class="article__author-name">{{ profileInfo.name }}</span>
            <span class="article__byline-dot"></span><span>{{ post.date }}</span>
          </div>
        </header>

        <div class="prose" v-html="bodyHtml"></div>

        <div v-if="post.tags?.length" class="post-tags">
          <span class="post-tags__label">標籤</span>
          <span v-for="tag in post.tags" :key="tag" class="tag tag--neutral tag--sm">{{
            tag
          }}</span>
        </div>

        <nav class="post-nav">
          <RouterLink v-if="prevPost" :to="{ name: 'post', params: { id: prevPost.id } }">
            <span class="post-nav__dir">← 上一篇</span>
            <span class="post-nav__title">{{ prevPost.title }}</span>
          </RouterLink>
          <RouterLink
            v-if="nextPost"
            :to="{ name: 'post', params: { id: nextPost.id } }"
            class="is-next"
          >
            <span class="post-nav__dir">下一篇 →</span>
            <span class="post-nav__title">{{ nextPost.title }}</span>
          </RouterLink>
        </nav>
      </article>

      <p v-else class="empty-state">
        找不到這篇文章。<RouterLink to="/blog">回文章列表</RouterLink>
      </p>
    </div>
  </main>
</template>

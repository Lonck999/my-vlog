<script setup>
import { posts, categories, categoryCounts, emptyBlog } from '@/data/posts'
import { profileInfo, sidebarMenuConfig, feedLabels, welcomeLabels } from '@/data/personalInfo'
import IconGithub from '@/components/icons/IconGithub.vue'
import IconMail from '@/components/icons/IconMail.vue'
import IconFile from '@/components/icons/IconFile.vue'
import IconArrowRight from '@/components/icons/IconArrowRight.vue'

const latestPosts = posts.slice(0, 6)
</script>

<template>
  <main>
    <div class="container">
      <div class="home">
        <aside class="profile">
          <div class="profile__card">
            <div class="profile__photo-wrap">
              <img class="profile__photo" :src="'/images/avatar.jpg'" alt="地瓜球的照片" />
            </div>
            <h1 class="profile__name">{{ profileInfo.name }}</h1>
            <p class="profile__role">{{ profileInfo.role }}</p>
            <p class="profile__bio">{{ profileInfo.bio }}</p>
            <div class="profile__chips">
              <span class="techchip" v-for="tech in profileInfo.techs" :key="tech.name">
                <span class="techchip__dot" :style="{ background: tech.color }"></span>
                {{ tech.name }}
              </span>
            </div>
            <div class="profile__social">
              <a href="#" aria-label="GitHub">
                <IconGithub :size="18" />
              </a>
              <a href="#" aria-label="Mail">
                <IconMail :size="18" />
              </a>
              <RouterLink to="/resume" aria-label="履歷">
                <IconFile :size="18" />
              </RouterLink>
            </div>
            <nav class="profile__cats">
              <div class="cats-title">{{ sidebarMenuConfig.title }}</div>
              <RouterLink
                v-for="category in categories"
                :key="category.key"
                class="cat-link"
                :to="{ path: '/blog', query: { category: category.key } }"
              >
                <span
                  class="cat-link__dot"
                  :style="{ background: `var(--cat-${category.key}-fg)` }"
                ></span>
                <span class="cat-link__name">{{ category.label }}</span>
                <span class="cat-link__count">{{ categoryCounts[category.key] }}</span>
              </RouterLink>
            </nav>
          </div>
        </aside>

        <section class="feed">
          <h2 class="feed__hello">{{ welcomeLabels.welcomeTitle }}</h2>
          <p class="feed__sub">{{ welcomeLabels.welcomeSubtitle }}</p>
          <div class="feed__label">{{ welcomeLabels.latestPostLabel }}</div>
          <div class="postlist">
            <RouterLink
              v-for="post in latestPosts"
              :key="post.id"
              class="postitem"
              :to="{ name: 'post', params: { id: post.id } }"
            >
              <div class="postitem__meta">
                <span>{{ post.date }}</span>
                <span class="dot"></span>
                <span class="tag tag--sm" :class="`tag--${post.category}`">
                  {{ categories.find((c) => c.key === post.category)?.label }}
                </span>
              </div>
              <h3 class="postitem__title">{{ post.title }}</h3>
              <p class="postitem__excerpt">{{ post.excerpt }}</p>
            </RouterLink>
            <p v-if="latestPosts.length === 0" class="empty-state">{{ emptyBlog }}</p>
          </div>
          <div class="feed__more">
            <RouterLink class="btn btn--secondary btn--md" to="/blog">
              {{ feedLabels.morePostsTitle }}
              <IconArrowRight :size="16" />
            </RouterLink>
          </div>
        </section>
      </div>
    </div>
  </main>
</template>

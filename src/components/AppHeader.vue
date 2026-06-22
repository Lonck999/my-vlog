<script setup>
import IconSparkle from './icons/IconSparkle.vue'
import IconMail from './icons/IconMail.vue'

const navLinks = [
  { to: '/', label: '首頁' },
  { to: '/blog', label: '文章' },
  { to: '/projects', label: '專案' },
  { to: '/resume', label: '履歷' },
]
</script>

<template>
  <header class="nav">
    <div class="nav__inner">
      <RouterLink class="nav__brand" to="/">
        <span class="nav__mark">
          <IconSparkle :size="18" />
        </span>
        <span class="nav__name">暖光<i>warmlight</i></span>
      </RouterLink>
      <nav class="nav__links">
        <RouterLink
          v-for="link in navLinks"
          :key="link.to"
          class="nav__link"
          :to="link.to"
          active-class="is-active"
          exact-active-class="is-active"
        >
          {{ link.label }}
        </RouterLink>
      </nav>
      <a class="btn btn--secondary btn--sm" href="#subscribe">
        <IconMail :size="15" />
        訂閱
      </a>
    </div>
  </header>
</template>

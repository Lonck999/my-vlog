<script setup>
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
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path
              d="M12 3l1.9 5.8a2 2 0 0 0 1.3 1.3L21 12l-5.8 1.9a2 2 0 0 0-1.3 1.3L12 21l-1.9-5.8a2 2 0 0 0-1.3-1.3L3 12l5.8-1.9a2 2 0 0 0 1.3-1.3z"
            />
          </svg>
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
        <svg
          width="15"
          height="15"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <rect x="2" y="4" width="20" height="16" rx="2" />
          <path d="m22 7-10 5L2 7" />
        </svg>
        訂閱
      </a>
    </div>
  </header>
</template>

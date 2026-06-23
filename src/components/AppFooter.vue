<script setup>
import IconSparkle from './icons/IconSparkle.vue'
import IconGithub from './icons/IconGithub.vue'
import IconMail from './icons/IconMail.vue'
</script>

<template>
  <footer class="foot">
    <div class="container foot__inner">
      <div class="foot__brand">
        <span class="nav__mark"><IconSparkle :size="18" /></span>
        暖光 warmlight
      </div>
      <p class="foot__note">慢慢寫，把每個坑記下來。© 2026 Ray</p>
      <div class="foot__social">
        <a href="#" aria-label="GitHub"><IconGithub :size="18" /></a>
        <a href="#" aria-label="Mail"><IconMail :size="18" /></a>
      </div>
    </div>
  </footer>
</template>

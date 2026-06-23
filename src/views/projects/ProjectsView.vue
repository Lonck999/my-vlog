<script setup>
import { projects } from '@/data/projects'
import { projectsPageHead } from '@/data/pageContent'
import IconFolder from '@/components/icons/IconFolder.vue'
import IconArrowRight from '@/components/icons/IconArrowRight.vue'
import IconGithub from '@/components/icons/IconGithub.vue'
</script>

<template>
  <main>
    <div class="container">
      <header class="page-head">
        <span class="page-head__kicker">
          <IconFolder :size="14" />
          {{ projectsPageHead.kickerLabel }}
        </span>
        <h1 class="page-head__title">{{ projectsPageHead.title }}</h1>
        <p class="page-head__lead">{{ projectsPageHead.lead }}</p>
      </header>

      <section class="block" style="padding-top: 0">
        <div class="proj-grid">
          <article v-for="project in projects" :key="project.title" class="proj">
            <img
              class="proj__shot"
              :src="`/images/${project.image}`"
              :alt="`${project.title} 截圖`"
            />
            <div class="proj__body">
              <div class="proj__head">
                <h3 class="proj__title">{{ project.title }}</h3>
                <span class="proj__year">{{ project.year }}</span>
              </div>
              <p class="proj__desc">{{ project.desc }}</p>
              <div class="proj__chips">
                <span v-for="chip in project.chips" :key="chip.label" class="techchip">
                  <span class="techchip__dot" :style="{ background: chip.color }"></span
                  >{{ chip.label }}
                </span>
              </div>
              <div class="proj__foot">
                <a class="proj__link" href="#">
                  查看成品
                  <IconArrowRight :size="16" />
                </a>
                <a class="proj__icon-link" href="#" aria-label="原始碼">
                  <IconGithub :size="18" />
                </a>
              </div>
            </div>
          </article>
        </div>
      </section>
    </div>
  </main>
</template>

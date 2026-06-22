<script setup>
import { projects } from '@/data/projects'
</script>

<template>
  <main>
    <div class="container">
      <header class="page-head">
        <span class="page-head__kicker">
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path
              d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"
            />
          </svg>
          PROJECTS · 開發專案
        </span>
        <h1 class="page-head__title">親手做出來的東西</h1>
        <p class="page-head__lead">
          從一個想法到真的能用，中間總有很多沒寫進文章的細節。這裡放我做完、也還在維護的小東西。
        </p>
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
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </a>
                <a class="proj__icon-link" href="#" aria-label="原始碼">
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
                      d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </article>
        </div>
      </section>
    </div>
  </main>
</template>

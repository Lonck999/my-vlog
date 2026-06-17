<template>
  <main>
    <div class="container">
      <header class="cv-head">
        <img class="cv-photo" :src="'/images/avatar.jpg'" alt="Ray 的照片" />
        <div>
          <h1 class="cv-name">地瓜球工程師</h1>
          <p class="cv-role">前端工程師 · Vue 生態圈</p>
          <p class="cv-tagline">寫程式第 3 年，喜歡把複雜的東西拆乾淨，也喜歡把學到的東西寫下來。如果遇到難題來這找找，希望可以找到能幫你解決的答案。</p>
          <div class="cv-contacts">
            <a class="cv-contact" href="#">
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
              </svg> hello@warmlight.dev
            </a>
            <a class="cv-contact" href="#">
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
                <path
                  d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"
                />
              </svg> github.com/ray
            </a>
            <span class="cv-contact">
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
                <path
                  d="M12 3l1.9 5.8a2 2 0 0 0 1.3 1.3L21 12l-5.8 1.9a2 2 0 0 0-1.3 1.3L12 21l-1.9-5.8a2 2 0 0 0-1.3-1.3L3 12l5.8-1.9a2 2 0 0 0 1.3-1.3z"
                />
              </svg> 台灣 · Taiwan
            </span>
          </div>
        </div>
        <div class="cv-head__actions">
          <button class="btn btn--primary btn--sm" type="button" @click="window.print()">下載 PDF</button>
          <RouterLink class="btn btn--ghost btn--sm" to="/">回首頁</RouterLink>
        </div>
      </header>

      <div class="cv-grid">
        <div>
          <section class="cv-section">
            <h2 class="cv-section__title">
              <span class="mark">
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
                  <rect x="2" y="7" width="20" height="14" rx="2" />
                  <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                </svg>
              </span>
              工作經歷
            </h2>
            <div class="timeline">
              <div class="tl-item">
                <div class="tl-date">2023.06 — 至今</div>
                <div class="tl-role">資深前端工程師</div>
                <div class="tl-company">某 SaaS 新創</div>
                <ul class="tl-bullets">
                  <li>主導前端架構從 Options API 遷移到 Composition API + Pinia，元件複用率明顯提升。</li>
                  <li>建立團隊共用的設計系統與元件庫，讓新功能開發從「重畫」變成「組裝」。</li>
                  <li>把 CI/CD 流程重寫一遍，部署時間從 12 分鐘壓到 3 分鐘以內。</li>
                </ul>
              </div>

              <div class="tl-item">
                <div class="tl-date">2021.03 — 2023.05</div>
                <div class="tl-role">前端工程師</div>
                <div class="tl-company">電商平台</div>
                <ul class="tl-bullets">
                  <li>負責結帳流程改版，配合 A/B 測試把轉換率往上推了一個檔次。</li>
                  <li>導入 TypeScript，replace 掉一票難以維護的 any，線上型別錯誤大幅下降。</li>
                </ul>
              </div>

              <div class="tl-item">
                <div class="tl-date">2020.02 — 2021.02</div>
                <div class="tl-role">網頁工程師（接案）</div>
                <div class="tl-company">自由接案</div>
                <ul class="tl-bullets">
                  <li>替中小型品牌做形象網站與後台，從溝通、設計到上線一手包辦。</li>
                  <li>就是這段時間養成了「把每個坑寫下來」的習慣，也是這個部落格的起點。</li>
                </ul>
              </div>
            </div>
          </section>
        </div>

        <div>
          <section class="cv-section">
            <h2 class="cv-section__title">
              <span class="mark">
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
                  <path d="m16 18 6-6-6-6M8 6l-6 6 6 6" />
                </svg>
              </span>
              技能樹
            </h2>
            <div class="panel">
              <div class="skill-group">
                <div class="skill-group__label">核心</div>
                <div class="skill-row">
                  <span class="skill-row__name">JavaScript</span>
                  <span class="bar">
                    <span class="bar__fill" style="width:92%"></span>
                  </span>
                </div>
                <div class="skill-row">
                  <span class="skill-row__name">TypeScript</span>
                  <span class="bar">
                    <span class="bar__fill" style="width:85%"></span>
                  </span>
                </div>
                <div class="skill-row">
                  <span class="skill-row__name">HTML / CSS</span>
                  <span class="bar">
                    <span class="bar__fill" style="width:90%"></span>
                  </span>
                </div>
                <div class="skill-row">
                  <span class="skill-row__name">Vue 3</span>
                  <span class="bar">
                    <span class="bar__fill" style="width:93%"></span>
                  </span>
                </div>
              </div>
              <div class="skill-group">
                <div class="skill-group__label">框架與生態</div>
                <div class="skill-row">
                  <span class="skill-row__name">Pinia</span>
                  <span class="bar">
                    <span class="bar__fill" style="width:88%"></span>
                  </span>
                </div>
                <div class="skill-row">
                  <span class="skill-row__name">Vite</span>
                  <span class="bar">
                    <span class="bar__fill" style="width:82%"></span>
                  </span>
                </div>
                <div class="skill-row">
                  <span class="skill-row__name">Nuxt</span>
                  <span class="bar">
                    <span class="bar__fill" style="width:72%"></span>
                  </span>
                </div>
                <div class="skill-row">
                  <span class="skill-row__name">SCSS</span>
                  <span class="bar">
                    <span class="bar__fill" style="width:86%"></span>
                  </span>
                </div>
              </div>
              <div class="skill-group">
                <div class="skill-group__label">工具 & 其他</div>
                <div class="chip-row">
                  <span class="techchip">
                    <span class="techchip__dot" style="background:var(--orange-500)"></span>Git
                  </span>
                  <span class="techchip">
                    <span class="techchip__dot" style="background:var(--orange-500)"></span>CI / CD
                  </span>
                  <span class="techchip">
                    <span class="techchip__dot" style="background:var(--orange-500)"></span>Figma
                  </span>
                  <span class="techchip">
                    <span class="techchip__dot" style="background:var(--orange-500)"></span>Vitest
                  </span>
                  <span class="techchip">
                    <span class="techchip__dot" style="background:var(--orange-500)"></span>RWD
                  </span>
                  <span class="techchip">
                    <span class="techchip__dot" style="background:var(--orange-500)"></span>Web Performance
                  </span>
                  <span class="techchip">
                    <span class="techchip__dot" style="background:var(--orange-500)"></span>REST / API
                  </span>
                </div>
              </div>
            </div>
          </section>

          <section class="cv-section">
            <h2 class="cv-section__title">
              <span class="mark">
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
                    d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"
                  />
                </svg>
              </span>
              學歷
            </h2>
            <div class="panel">
              <div class="edu-item">
                <div class="edu-date">2016 — 2020</div>
                <div class="edu-degree">資訊管理學系 學士</div>
                <div class="edu-school">國立某某大學</div>
              </div>
              <div class="edu-item">
                <div class="edu-date">2019 — 至今</div>
                <div class="edu-degree">前端自學之路</div>
                <div class="edu-school">文件、原始碼，與無數個踩坑的夜晚</div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  </main>
</template>

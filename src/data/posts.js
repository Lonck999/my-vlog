export const categories = [
  { key: 'lang', label: '語言筆記' },
  { key: 'frame', label: '框架筆記' },
  { key: 'work', label: '工作經驗' },
  { key: 'project', label: '開發專案' },
]

export const posts = [
  {
    id: 1,
    date: '2026.06.20',
    category: 'frame',
    title: '叫我做Vitest??\n不是console.log就好的嗎??',
    excerpt:
      '一開始前輩跟我說要寫單元測試的時候，我心裡想說：『單元測試？這什麼？』，阿不是console.log看一下是不是正確的就好了嗎?',
  },
  {
    id: 2,
    date: '2026.05.09',
    category: 'lang',
    title: 'TypeScript 的 infer 到底在 infer 什麼？',
    excerpt:
      '看了無數次官方文件還是霧煞煞，直到我自己手刻了一個 ReturnType，才終於把它想通。原來關鍵在於它出現的位置。',
  },
  {
    id: 3,
    date: '2026.04.27',
    category: 'frame',
    title: 'Pinia 不只是 Vuex 的替代品',
    excerpt: '從 Vuex 搬家到 Pinia 之後，我重新理解了「狀態」這件事到底該放在哪、又該由誰負責。',
    isFeatured: true,
  },
  {
    id: 4,
    date: '2026.04.15',
    category: 'frame',
    title: '那些 Vue 文件不會寫的 reactive 坑',
    excerpt:
      '解構 reactive 物件為什麼會失去響應？這個坑我踩了三次才記住，這次認真把前因後果寫下來。',
  },
  {
    id: 5,
    date: '2026.03.30',
    category: 'frame',
    title: '為什麼我從 Options API 換到 Composition API',
    excerpt: '一開始很抗拒，覺得多此一舉。真正讓我改觀的，是某次重構一個八百行的元件。',
  },
  {
    id: 6,
    date: '2026.03.21',
    category: 'lang',
    title: 'SCSS 的 @use 與 @import，我終於搞懂了',
    excerpt:
      '@import 要被淘汰了，但 @use 的命名空間一開始真的讓我很困惑。整理一份自己看得懂的筆記。',
  },
  {
    id: 7,
    date: '2026.03.08',
    category: 'project',
    title: '做了一個記帳 App，才知道狀態管理有多難',
    excerpt: '原本想說一個週末就能做完，結果光是「一筆交易要怎麼存」就改了五版設計。',
  },
  {
    id: 8,
    date: '2026.02.24',
    category: 'lang',
    title: 'JavaScript 的 this，我用三個情境一次講清楚',
    excerpt:
      '面試最常被問、自己也最常搞錯的 this。這次用一般函式、箭頭函式、call/apply 三組對照來記。',
  },
  {
    id: 9,
    date: '2026.02.10',
    category: 'work',
    title: '第一次 code review 被退十次，我學到的事',
    excerpt: '新人時期那段被退 PR 退到懷疑人生的日子，現在回頭看，每一條 comment 都是禮物。',
  },
  {
    id: 10,
    date: '2026.01.29',
    category: 'frame',
    title: 'Vite 的 HMR 為什麼這麼快？我去翻了原始碼',
    excerpt: '用了很久卻沒想過原理。趁著一個下午，把 dev server 那條路徑追了一遍。',
  },
  {
    id: 11,
    date: '2026.01.12',
    category: 'project',
    title: '把部落格從 Nuxt 搬到純 Vite 的取捨',
    excerpt: 'SSR 對個人部落格真的需要嗎？記錄一次「做減法」的決定，以及搬完之後的真實感受。',
  },
  {
    id: 12,
    date: '2025.12.30',
    category: 'lang',
    title: 'CSS Grid 的 minmax 與 auto-fit，終於不再背公式',
    excerpt: 'responsive grid 一直是抄來抄去。這次把 auto-fit / auto-fill 的差別徹底想通了。',
  },
]

export const categoryCounts = {
  lang: 14,
  frame: 21,
  work: 9,
  project: 6,
}

import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import { createRouter, createWebHistory } from 'vue-router'
import App from '../App.vue'
import router from '../router'

describe('App', () => {
  it('mounts renders properly', async () => {
    const testRouter = createRouter({
      history: createWebHistory(),
      routes: router.options.routes,
    })
    testRouter.push('/')
    await testRouter.isReady()

    const wrapper = mount(App, {
      global: {
        plugins: [testRouter],
      },
    })
    expect(wrapper.text()).toContain('暖光')
  })
})

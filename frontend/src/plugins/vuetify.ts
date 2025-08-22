// src/plugins/vuetify.ts
import 'vuetify/styles' // 全局样式
import { createVuetify } from 'vuetify'
import { aliases, mdi } from 'vuetify/iconsets/mdi' // 图标库

export const vuetify = createVuetify({
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: { mdi },
  },
  theme: {
    defaultTheme: 'light', // 默认主题，可选 'dark'
  },
})

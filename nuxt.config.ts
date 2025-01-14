export default defineNuxtConfig({
    compatibilityDate: '2024-11-01',

    typescript: {
        typeCheck: true,
        strict: true
    },

    devtools: {enabled: false},
    css: [],

    postcss: {
        plugins: {},
    },

    modules: ['@pinia/nuxt', '@nuxtjs/tailwindcss'],
})

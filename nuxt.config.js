// import path from 'path'
// import fs from 'fs'

export default {
  /*
  ** Nuxt rendering mode
  ** See https://nuxtjs.org/api/configuration-mode
  */
  mode: 'universal',
  /*
  ** Nuxt target
  ** See https://nuxtjs.org/api/configuration-target
  */
  target: 'server',
  /*
  ** Nuxt server
   */
  server: {
    host: process.env.APP_URL,
    port: process.env.APP_PORT
    // https: {
    //   key: fs.readFileSync(path.resolve(__dirname, 'server.key')),
    //   cert: fs.readFileSync(path.resolve(__dirname, 'server.crt'))
    // }
  },
  /*
  ** Headers of the page
  ** See https://nuxtjs.org/api/configuration-head
  */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      // { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ],
    script: [
      { src: 'https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@1.0.0/dist/tf.min.js' },
      { src: 'https://cdn.jsdelivr.net/npm/@tensorflow-models/coco-ssd' }
    ]
  },
  /*
  ** Global CSS
  */
  css: [
    { type: 'scss', src: '@/assets/scss/main.scss' },
    '@fortawesome/fontawesome-svg-core/styles.css'
  ],
  /*
  ** Plugins to load before mounting the App
  ** https://nuxtjs.org/guide/plugins
  */
  plugins: [
    '@/plugins/bootstrap.js',
    '@/plugins/components.js',
    '@/plugins/highcharts.js',
    '@/plugins/fontawesome.js',
    { ssr: false, src: '@/plugins/vue-apexchart.js' }
  ],
  /*
  ** Auto import components
  ** See https://nuxtjs.org/api/configuration-components
  */
  components: true,
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module'
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://http.nuxtjs.org
    '@nuxt/http',
    // Doc: https://bootstrap-vue.js.org
    'bootstrap-vue/nuxt',
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    'nuxt-socket-io'
  ],
  /*
  ** io options
  */
  io: {
    sockets: [
      {
        name: 'main',
        url: 'https://yudi.staging-dev.site'
      }
    ]
  },
  /*
  ** Server Middleware
  */
  serverMiddleware: {
    '/api': '~/api'
  },
  /*
  /*
  ** Nuxt.js pwa modules
  */
  pwa: {
    manifest: {
      name: 'Gemastik 13',
      lang: 'en',
      useWebmanifestExtension: false
    }
  },
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {},
  /*
  ** Build configuration
  ** See https://nuxtjs.org/api/configuration-build/
  */
  build: {
    /*
     ** You can extend webpack config here
     */
    vendor: ['vue-apexchart'],
    transpile: ['countup.js', 'vue-countup-v2'],
    extend(_config, _ctx) {}
  }
}

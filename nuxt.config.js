require( 'dotenv' ).config();
const { URL } = process.env;
const { API_KEY } = process.env;
import axios from 'axios'

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
  target: 'static',
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
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Global CSS
  */
  css: [
  ],
  /*
  ** Plugins to load before mounting the App
  ** https://nuxtjs.org/guide/plugins
  */
  plugins: [
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
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
  ],
  /*
  ** Build configuration
  ** See https://nuxtjs.org/api/configuration-build/
  */
  build: {
    // thread-loaderを有効化
    parallel: true,
    // ビルドキャッシュを保存
    hardSource: true,
  },

  /*
  ** ページング用のルーティング
  ** https://microcms.io/blog/nuxt-jamstack-paging
  */
  router: {
    extendRoutes ( routes, resolve )
    {
      routes.push( {
        path: '/page/:p',
        component: resolve( __dirname, 'pages/index.vue' ),
        name: 'page',
      } )
    },
  },

  /*
  ** ページング用のジェネレート
  ** https://microcms.io/blog/nuxt-jamstack-paging
  */
  generate: {
    async routes ()
    {
      const limit = 1

      // 一覧のページング
      const pages = await axios
        .get( `${URL}?limit=0`, {
          headers: { 'X-API-KEY': API_KEY },
        } )
        .then( ( res ) =>
        {
          let start = 1;
          let end = Math.ceil( res.data.totalCount / limit );
          let range = [ ...Array( start, end ) ].map( ( _, i ) => start + i );
          let result = range.map( ( p ) =>
          {
            return { route: `/page/${p}` }
          } );
          return result;
        } )
      return pages
    },
  },

  /*
  ** APIキーの隠蔽
  ** https://microcms.io/blog/nuxt-secure-api-key
  ** `npm run dev`を実施するなら、envに直すこと
  */
  privateRuntimeConfig: {
    url: URL,
    apiKey: API_KEY
  },
}

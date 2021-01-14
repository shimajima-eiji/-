require( "dotenv" ).config()

module.exports = {
  siteMetadata: {
    title: `インターネット老人おぢさん`,
    description: `元CEOののむらやごろうがフロントエンドを触らなさすぎて若手にバカにされないために頑張るおっさんの独学プログラミング奮闘記`,
    author: `のむらやごろう`,
    url: `https://speedtest-netlify.netlify.app`,
    twitterUsername: `elder_uncle`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
    {
      resolve: "gatsby-source-microcms", // FYI: https://qiita.com/akifumiyoshimu/items/ecb07219185c43cecfec
      options: {
        apiKey: process.env.GATSBY_API_KEY, // dotenv
        serviceId: process.env.GATSBY_SERVICE_ID, // dotenv
        apis: [ {
          endpoint: "main",
          query: {
            limit: 100,
          },
        } ],
      },
    },
    {
      resolve: '@mako-tos/gatsby-transformer-for-microcms',  // FYI: https://qiita.com/mako-tos/items/aa2cf761fc082d32ac71
      options: {
        mediaType: 'MicrocmsMain', // 必須 string 型
        field: 'body', // 必須 string 型
        useHljs: true, // 任意 boolean 型
        image: {
          sizes: '80vw', // 任意 string 型
          loading: 'auto', // 任意 string 型
        },
      },
    },
    {
      resolve: `gatsby-plugin-alias-imports`,  // FYI: https://webcraftlog.net/best-gatsbyjs-plugins/
      options: {
        alias: {
          "@src": "src",
          "@components": "src/components",
          "@layouts": "src/layouts",
          "@pages": "src/pages",
          "@images": "src/images",
          "@templates": "src/templates",
          "@posts": "content/posts",
        },
        extensions: [ "js", "jsx", "ts", "tsx" ],
      }
    },
    `gatsby-plugin-image`, // FYI: https://ebisu.com/note/new-gatsby-image/
  ],
}

const fetch = require('isomorphic-fetch')
const {createHttpLink} =require("apollo-link-http")

require('dotenv').config({
  path: `.env`,
})


module.exports = {
  /* Your site config here */
  plugins: [
    `gatsby-theme-apollo`,
    `gatsby-plugin-styled-components`,
    {resolve: "gatsby-source-graphql",
      options: {
        typeName: "hasura",
        fieldName: "test",
        createLink: pluginOptions => {
          return createHttpLink({
            uri: "https://fresh-jackal-96.hasura.app/v1/graphql",
            headers:{
              "x-hasura-admin-secret": "TzFXJm86RxahHsg"
            }, fetch,
          })
        }
      },
    },
  ]
}


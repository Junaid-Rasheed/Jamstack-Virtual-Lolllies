const { ApolloServer, gql } = require("apollo-server-lambda")

const shortid = require("shortid")
const faunadb = require("faunadb")
const q = faunadb.query

const typeDefs = gql`
  type Query {
    hello: String
  }
  type Lolly {
    resepientName: String
    message: String
    senderName: String
    flavorTop: String
    flavorMiddle: String
    flavorBottom: String
    lollyPath: String
  }
  type Mutation {
    createLolly(
      resepientName: String
      message: String
      senderName: String
      flavorTop: String
      flavorMiddle: String
      flavorBottom: String
      lollyPath : String
    ): Lolly
  }
`

const resolvers = {
  Query: {
    hello: () => "Hello, cc!",
  },
  Mutation: {
    createLolly: async(_, args) => {
     // console.log('args data',args)
      const client = new faunadb.Client({
        secret: "fnAENe0u0KACQHo3sEsX7hc-_Opg1enAhM2g3428",
      })
      const id = shortid.generate()
      args.lollyPath = id
      const result = await client.query(
        q.Create(q.Collection('lollies'),{
          data : args
        })
      )
      
      // console.log("result:", result)
      // console.log("result:", result.data)
      return result.data
    },
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

const handler = server.createHandler()

module.exports = { handler }

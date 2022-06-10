const { createServer } = require('@graphql-yoga/node')

// Provide your schema
const server = createServer({
  schema: {
    typeDefs: `
      type Query {
        pokemon: Pokemon!
      }

      type Pokemon {
          name: String!
          type: String!
      }

      type Mutation {
        addPokemon(name: String!, type: String!): ID!
      }
    `,
    resolvers: {
      Query: {
        pokemon: () => ({
          name: 'Bulbasaur',
          type: 'Fire',
        }),
      },
      Mutation: {
        addPokemon: (_, { name, type }) => `ID: ${name}:${type}`,
      },
    },
  },
})

// Start the server and explore http://localhost:4000/graphql
server.start()

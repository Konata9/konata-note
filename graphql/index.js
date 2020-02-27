const { ApolloServer, gql } = require('apollo-server')
// 定义 Schema
const typeDefs = gql`
  type Book{
    title: String
    author: String
  }

  type Query {
    books: [Book]
    isBook: Boolean
  }

  type Mutation{
    addBook: [Book]
  }
`
// 定义 Resolver
const resolvers = {
  Query: {
    books: () => books,
    isBook: () => true
  },
  Mutation: {
    addBook: () => {
      books = [...books, { title: 'New book', author: 'New author' }]
      return books
    }
  }
};
// Mock 数据
let books = [
  {
    title: 'Harry Potter and the Chamber of Secrets',
    author: 'J.K. Rowling',
  },
  {
    title: 'Jurassic Park',
    author: 'Michael Crichton',
  },
];

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
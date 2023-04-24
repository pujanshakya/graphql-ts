// book.js
export const typeDef = `
  type Book {
    title: String
    author: String
  }
  type User {
    id: Int!
    username: String
    email: String!
  }
  type AuthPayload {
    token: String
    user: User!
  }
  type Query {
    books: [Book],
    book(title:String): Book
  }
  type Mutation {
    login (email: String!, password: String!): AuthPayload!
  }
`;

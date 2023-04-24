// schema.js
import { makeExecutableSchema } from "@graphql-tools/schema";
import { typeDef as Book } from "./modules/books/book.schema";
import { resolvers as bookResolvers } from "./modules/books/book.resolver";
import { merge } from "lodash";

const Query = `
  type Query {
    _empty: String
  }
`;

const graphQlSchema = makeExecutableSchema({
  typeDefs: [Query, Book],
  resolvers: merge(bookResolvers),
});

export default graphQlSchema;

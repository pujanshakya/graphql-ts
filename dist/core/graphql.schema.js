"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// schema.js
const schema_1 = require("@graphql-tools/schema");
const book_schema_1 = require("./modules/books/book.schema");
const book_resolver_1 = require("./modules/books/book.resolver");
const lodash_1 = require("lodash");
const Query = `
  type Query {
    _empty: String
  }
`;
const graphQlSchema = (0, schema_1.makeExecutableSchema)({
    typeDefs: [Query, book_schema_1.typeDef],
    resolvers: (0, lodash_1.merge)(book_resolver_1.resolvers),
});
exports.default = graphQlSchema;

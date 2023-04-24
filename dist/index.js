"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("@apollo/server");
const standalone_1 = require("@apollo/server/standalone");
const graphql_schema_1 = __importDefault(require("./core/graphql.schema"));
const mongoose_1 = __importDefault(require("mongoose"));
const initDatabase = async () => {
    // Mongoose connection
    mongoose_1.default.connect("mongodb+srv://pujanshakya18:graphQL%4017@graphql.sj2whi3.mongodb.net/?retryWrites=true&w=majority");
    mongoose_1.default.connection.once("open", () => {
        console.info("connected to database");
    });
};
const init = async () => {
    await initDatabase();
    // A schema is a collection of type definitions (hence "typeDefs")
    // that together define the "shape" of queries that are executed against
    // your data.
    // const typeDefs = `#graphql
    //   # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.
    //   # This "Book" type defines the queryable fields for every book in our data source.
    //   type Book {
    //     title: String
    //     author: String
    //   }
    //   # The "Query" type is special: it lists all of the available queries that
    //   # clients can execute, along with the return type for each. In this
    //   # case, the "books" query returns an array of zero or more Books (defined above).
    //   type Query {
    //     books: [Book],
    //     book(title:String): Book
    //   }
    // `;
    // const books = [
    //   {
    //     title: "The Awakening",
    //     author: "Kate Chopin",
    //   },
    //   {
    //     title: "City of Glass",
    //     author: "Paul Auster",
    //   },
    // ];
    // Resolvers define how to fetch the types defined in your schema.
    // This resolver retrieves books from the "books" array above.
    // const resolvers = {
    //   Query: {
    //     books: () => books,
    //     book: (_, { title }) => books.find((book) => book.title === title),
    //   },
    // };
    // The ApolloServer constructor requires two parameters: your schema
    // definition and your set of resolvers.
    const server = new server_1.ApolloServer({ schema: graphql_schema_1.default });
    // Passing an ApolloServer instance to the `startStandaloneServer` function:
    //  1. creates an Express app
    //  2. installs your ApolloServer instance as middleware
    //  3. prepares your app to handle incoming requests
    (0, standalone_1.startStandaloneServer)(server, {
        listen: { port: 4000 },
    }).then((res) => {
        console.log(`🚀  Server ready at: ${res.url}`);
    });
};
init().then(() => {
    console.log("============================================================================================");
    console.log("                                     App Started                                            ");
    console.log("============================================================================================");
});

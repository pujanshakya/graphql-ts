import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import graphQlSchema from "./core/graphql.schema";
import mongoose from "mongoose";

const initDatabase = async () => {
  // Mongoose connection
  mongoose.connect(
    "mongodb+srv://pujanshakya18:graphQL%4017@graphql.sj2whi3.mongodb.net/?retryWrites=true&w=majority"
  );

  mongoose.connection.once("open", () => {
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
  const server = new ApolloServer({ schema: graphQlSchema });

  // Passing an ApolloServer instance to the `startStandaloneServer` function:
  //  1. creates an Express app
  //  2. installs your ApolloServer instance as middleware
  //  3. prepares your app to handle incoming requests
  startStandaloneServer(server, {
    listen: { port: 4000 },
  }).then((res) => {
    console.log(`🚀  Server ready at: ${res.url}`);
  });
};

init().then(() => {
  console.log(
    "============================================================================================"
  );
  console.log(
    "                                     App Started                                            "
  );
  console.log(
    "============================================================================================"
  );
});

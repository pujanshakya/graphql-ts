"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvers = void 0;
const books = [
    {
        title: "The Awakening",
        author: "Kate Chopin",
    },
    {
        title: "City of Glass",
        author: "Paul Auster",
    },
];
exports.resolvers = {
    Query: {
        books: () => books,
        book: (_, { title }) => books.find((book) => book.title === title),
    },
    Mutation: {
        async login(_, { email, password }) {
            try {
                console.log("Email", email);
                console.log("Password", password);
                return true;
                // const user = await models.User.findOne({ where: { email }})
                // if (!user) {
                //   throw new Error('No user with that email')
                // }
                // const isValid = await bcrypt.compare(password, user.password)
                // if (!isValid) {
                //   throw new Error('Incorrect password')
                // }
                // // return jwt
                // const token = jsonwebtoken.sign(
                //   { id: user.id, email: user.email},
                //   process.env.JWT_SECRET,
                //   { expiresIn: '1d'}
                // )
                // return {
                //  token, user
                // }
            }
            catch (error) {
                throw new Error(error.message);
            }
        },
    },
};

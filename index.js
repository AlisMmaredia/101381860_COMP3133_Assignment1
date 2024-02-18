// ALIS MAREDIA - 101381860

const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const mongoose = require('mongoose');
const typeDefs = require('./schema/schema');
const userResolvers = require('./resolvers/userResolver');
const employeeResolvers = require('./resolvers/employeeResolver');

const app = express();

// Set up MongoDB connection
mongoose.connect('mongodb+srv://101381860:Alis1520.@cluster1.nymporx.mongodb.net/assignment1?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => console.log('Connected to MongoDB'));

// Set up Apollo Server with GraphQL schema and resolvers
const server = new ApolloServer({
  typeDefs,
  resolvers: [userResolvers, employeeResolvers],
});


async function startApolloServer() {
  await server.start();
  server.applyMiddleware({ app });
}

startApolloServer().then(() => {
  const PORT = process.env.PORT || 3000;

  // Start the server
  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
    console.log(`GraphQL endpoint: http://localhost:${PORT}${server.graphqlPath}`);
  });
}).catch(error => {
  console.error('Error starting server:', error);
});
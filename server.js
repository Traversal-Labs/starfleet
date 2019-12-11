const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const fs = require('fs');
const { ApolloServer } = require('apollo-server');
const typeDefs = `${fs.readFileSync(__dirname.concat('/graphqlsrc/models/tourModel.graphql'), 'utf8')}` // this path is for testing purpose and should be dynamic on fix.
const resolvers = require('./resolvers')
const dotenv = require('dotenv');

dotenv.config({
  path: './config.env'
});

// db connection 
const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose.connect(DB, { useNewUrlParser: true, useUnifiedTopology:	true, dbName: 'natours' })
  .then(() => console.log('MongoDB successfully connected'))
  .catch( err => console.log('Error connecting to db: ', err));

const server = new ApolloServer({ typeDefs, resolvers });

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});

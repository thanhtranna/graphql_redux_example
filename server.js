require('babel-core/register');
import express from 'express';
import graphql from 'graphql';
import graphqlHTTP from 'express-graphql';
import schema from './server/graphql';
import { host, database } from './config';
import http from 'http';
import fs from 'fs';
import webpack from 'webpack';
import cors from 'cors';
import mongoose from 'mongoose';

global.__DEVELOPMENT__ = process.env.NODE_ENV !== 'production';

const app = express();
if (__DEVELOPMENT__) {
  const config = require('./webpack.config');
  const compiler = webpack(config);
  app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath
  }));
  app.use(require('webpack-hot-middleware')(compiler));
} else {
  const config = require('./webpack.prod.config');
  const compiler = webpack(config);
}

// Connect to DB.

mongoose.connect(database.url, {useMongoClient: true});
const db = mongoose.connection
db.on('error', () => console.log('Failed to connect to DB.'))
  .once('open', () => console.log('Connected to DB successfully... '))


//------------------------------
// Set up client

const client = new http.Server(app);

const index = fs.readFileSync('./index.html', {
  encoding: 'utf-8'
});
const str = index;

app.get('*', (req, res) => {
  res.status(200).send(str);
});

app.get('*', (req, res) => {
  res.status(404).send('Server.js > 404 - Page Not Found');
});

app.use((err, req, res, next) => {
  console.error("Error on request %s %s", req.method, req.url);
  console.error(err.stack);
  res.status(500).send("Server error");
});

process.on('uncaughtException', evt => {
  console.log('uncaughtException ', evt);
});


client.listen(host.port, (err) => {
  if (err) {
    console.error(err);
  }
  console.info('==> 💻  Open http://%s:%s in a browser to view the app.', `${host.hostName}`, `${host.port}`);
});


// --------------------------------------------
// Set up GraphQL Server

const server = express();
const corsOptions = {
  origin: `http://${host.hostName}:${host.port}`
}

server.use(cors(corsOptions));

server.use('/', graphqlHTTP({
  schema,
  graphiql: true,
  pretty: true
}));

server.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true,
  pretty: true
}));

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`GraphQL started on port: ${PORT}`);
});

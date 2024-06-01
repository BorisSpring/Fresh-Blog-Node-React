const app = require('./app');
const mongoose = require('mongoose');

mongoose
  .connect(process.env.DATABASE)
  .then(() => {
    console.log('Suscessfully connected to database');
  })
  .catch((err) => {
    console.log(`Error name: ${err.name}`);
    console.log(`Problem with database connection: ${err.message}`);
    process.exit(1);
  });

const port = process.env.PORT || 3000;

const server = app.listen(port, 'localhost', () => {
  console.log(`Server listening on port ${port}`);
});

server.on('uncaughtException', (err) => {
  console.log(`Server uncaught exception`);
  console.log(err.stack);
  console.log('Application is shutting down');
  server.close(() => process.exit(1));
});

server.on('unhandledRejection', (err) => {
  console.log(`Error name: ${err.name}`);
  console.log(`Stack: ${err.stack}`);
  console.log('Application is shutting down');
  server.close(() => process.exit(1));
});

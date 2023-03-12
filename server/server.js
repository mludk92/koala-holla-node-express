const express = require('express');
const app = express();
const PORT = process.env.PORT || 5001;
const koalaRouter = require('./routes/koala.router');

app.use(express.json());
// ROUTES
app.use('/koalas', koalaRouter);
app.use(express.static('server/public'));

// Start listening for requests on a specific port
app.listen(PORT, () => {
  console.log('listening on port', PORT);
});


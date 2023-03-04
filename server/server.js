const express = require('express');
const app = express();
const PORT = process.env.PORT || 5001;
const koalaRouter = require('./routes/koala.router');

app.use(express.json());
app.use(express.static('server/public'));

// ROUTES
app.use('/koalas', koalaRouter);

let koalaTable = 
[{id:1,
name:'name',
gender:'gender',
age:1,
readyToTransfer:'rtt',
notes:'notes',
},]

// POST request save user input
get.post('/koalas',(req,res) => {
  console.log('Post request made for /quotes')
  //any data we send from the client is available 
  //as a property of req.body
  console.log(req.body)
  let koalaToAdd = req.body
  koalaTable.push(koalaToAdd)
  res.sendStatus(201)//success
})







// Start listening for requests on a specific port
app.listen(PORT, () => {
  console.log('listening on port', PORT);
});

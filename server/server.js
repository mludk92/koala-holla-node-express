const express = require('express');
const app = express();
const PORT = process.env.PORT || 5001;
const koalaRouter = require('./routes/koala.router');

app.use(express.json());
app.use(express.static('server/public'));

// ROUTES
app.use('/koalas', koalaRouter);
let i = 0
let koalaTable = []

// POST request save user input
app.post('/koalas',(req,res) => {
  console.log('Post request made for /quotes')
  //any data we send from the client is available 
  //as a property of req.body
  //console.log(req.body)
  let koalaToAdd = req.body
  //console.log(koalaToAdd[0].name,'test for name ')
  koalaTable.push({
    id:Number(i)+1,
    name:koalaToAdd[0].name,
    gender:koalaToAdd[0].gender,
    age:koalaToAdd[0].age,
    readyToTransfer:koalaToAdd[0].readyToTransfer,
    notes:koalaToAdd[0].notes,
    })
  i++
//   for(let j in koalaTable){
//     koalaTable[j].id++
// }

  console.log(koalaTable, 'the table is this')
  res.sendStatus(201)//success
})

app.get('/koalas',(req,res) => {
  console.log('GET request made for /quotes')
  //to send back the list of quotes
  console.log(koalaTable, 'the get is here ')
  res.send(koalaTable)
})


app.delete('/koalas/:id',(req,res)=>{
  //What are we deleting ???
  console.log(req.params.id)
  const deleteIndex = Number(req.params.id)  //Similar to req.body but subset of info included
  koalaTable = koalaTable.filter((koala, index)=>index !== deleteIndex )
  // Always send back a response
  res.sendStatus(200)
})

// Start listening for requests on a specific port
app.listen(PORT, () => {
  console.log('listening on port', PORT);
});


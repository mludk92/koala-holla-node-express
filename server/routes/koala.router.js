const express = require('express');
const router = express.Router();

// DB CONNECTION


// GET
//gets response of input fields submitted by user
router.get('/',(req,res) => {
    console.log('GET request made for /quotes')
    //to send back the list of quotes
    console.log(koalaTable, 'the get is here ')
    res.send(koalaTable)
  })
  

// POST
//creates unique id for koalas and sends back all informaiton in koalaTable

let i = 1 //starting indexing at 1 
let koalaTable = []
router.post('/',(req,res) => {
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

    console.log(koalaTable, 'the table is this')
    res.sendStatus(201)//success
  })

// PUT
// this api end-point update an existing item object
// for that we get `id` and `title` from api end-point of item to update


// DELETE
//removes entry from koalatable where the index of the entry is referenced on click. 
router.delete('/:id',(req,res)=>{
    //What are we deleting ???
    console.log(req.params.id)
    const deleteIndex = Number(req.params.id)  //Similar to req.body but subset of info included
    koalaTable = koalaTable.filter((koala, index)=>index !== deleteIndex )
    // Always send back a response
    res.sendStatus(200)
  })

module.exports = router;
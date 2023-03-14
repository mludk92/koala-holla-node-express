const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// DB CONNECTION


// GET
//gets response of input fields submitted by user
router.get('/',(req,res) => {
    let queryText =  `select * from koala`
    console.log('GET request made for /quotes')
    //to send back the list of quotes
    pool.query(queryText).then((result)=>{
      res.send(result.rows)
    }).catch((error)=>{
      console.log(`error in get ${error}`)
      res.sendStatus(500)
    })
})


// POST
//creates unique id for koalas and sends back all informaiton in koalaTable

// let i = 1 //starting indexing at 1 
// let koalaTable = []
router.post('/',(req,res) => {
    console.log('Post request made for /quotes')
    //any data we send from the client is available 
    //as a property of req.body
    console.log(req.body,'reqbody')
    let koalaToAdd = req.body
    console.log([koalaToAdd[0], Number(koalaToAdd[2]), koalaToAdd[1],koalaToAdd[3],koalaToAdd[4]],'val for query')
    let queryText = `insert into koala ("name", "age", "gender", "ready_to_transfer", "notes") 
                      values($1, $2, $3, $4, $5)`
    pool.query(queryText,[koalaToAdd[0], Number(koalaToAdd[2]), koalaToAdd[1],koalaToAdd[3],koalaToAdd[4]]).then((result)=>{
      res.sendStatus(201)
    }).catch((error)=>{
      res.sendStatus(500)
  })
})

// PUT -- can get the request body to populate with DOM values. ????
// this api end-point update an existing item object
// for that we get `id` and `title` from api end-point of item to update
// PUT request update information
// router.put('/:id',(req, res)=>{
//   console.log('In PUT request')
//   const updateIndex = Number(req.params.id);
  
//   let koalaToEdit = req.params
//   console.log(koalaToEdit)
//   let queryText = `update koala 
//   set "name" = $1,
//   "age" = $2,
//   "gender" = $3,
//   "ready_to_transfer" = $4,
//   "notes" = $5
//   where id = $6;`
  
//   pool.query(queryText,[koalaToEdit[0], koalaToEdit[2], koalaToEdit[1], koalaToEdit[3],koalaToEdit[4], updateIndex]).then((result)=>{
//       res.sendStatus(200)
//   }).catch((error)=>{
//       console.log(`Error in PUT ${error}`)
//       res.sendStatus(500)
//   })
// })

// DELETE
//removes entry from koalatable where the index of the entry is referenced on click. 
router.delete('/:id', (req, res) => {
 
  console.log(req.params.id); // Similar to req.body
  const deleteIndex = Number(req.params.id);
  let queryText = `delete from koala where id = $1`
  //deleteIndex is the id of the item we want to delete
  //                        $1
  pool.query(queryText,[deleteIndex]).then((result)=>{
      res.sendStatus(200)
  }).catch((error)=>{
      console.log(`Error in DELETE ${error} `)
      res.sendStatus(500)})
});

router.put('/:id',(req, res)=>{
  console.log('In PUT request')
  const updateIndex = Number(req.params.id);
  
  let koalaToEdit = req.params
  console.log(koalaToEdit)
  let queryText = `update koala 
  set "transfered" = true
  where id = $1;`
  
  pool.query(queryText,[updateIndex]).then((result)=>{
      res.sendStatus(200)
  }).catch((error)=>{
      console.log(`Error in PUT ${error}`)
      res.sendStatus(500)
  })
})
module.exports = router;
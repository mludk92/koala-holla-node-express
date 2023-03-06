console.log( 'js' );

let nameIn = document.querySelector('#nameIn').value
let ageIn = Number(document.querySelector('#ageIn').value)
let genderIn = document.querySelector('#genderIn').value
let rFFIn = document.querySelector('#readyForTransferIn').value
let notesIn = document.querySelector('#notesIn').value


function submitKoala(event){
  console.log(nameIn,ageIn,genderIn,rFFIn,notesIn, 'input fields')
  console.log(document.querySelector('#nameIn').value,
  document.querySelector('#genderIn').value,
  Number(document.querySelector('#ageIn').value),
  document.querySelector('#readyForTransferIn').value,
  document.querySelector('#notesIn').value)

  //writeTable()
  let koalasForServer = [{
    name:document.querySelector('#nameIn').value,
    gender:document.querySelector('#genderIn').value,
    age:Number(document.querySelector('#ageIn').value),
    readyToTransfer:document.querySelector('#readyForTransferIn').value,
    notes:document.querySelector('#notesIn').value,
    },]
    axios.post('/koalas',koalasForServer).then((response) => {
    console.log(response)
    getKoalas()
}).catch((error) => {
    console.log('error')
    alert('Something went wrong')
})
document.querySelector('#nameIn').value = ''
document.querySelector('#ageIn').value = ''
document.querySelector('#genderIn').value = ''
document.querySelector('#readyForTransferIn').value = ''
notesIn = document.querySelector('#notesIn').value = ''
}



//testing how to write the table for later
// function writeTable(){document.querySelector('#viewKoalas').innerHTML += 
// `<tr>
//   <td>${nameIn}</td>
//   <td>${ageIn}</td>
//   <td>${genderIn}</td>
//   <td>${rFFIn}</td>
//   <td>${notesIn}</td>
// </tr>`}



function getKoalas(){
  console.log( 'in getKoalas' );
  axios.get('/koalas').then((response)=> {
    //code that will run on a successful response 
    //from the server 
    console.log(response)
  
    let koalasFromServer = response.data
    console.log(koalasFromServer.name,'response')
    let contentDiv = document.querySelector('#viewKoalas') 
    contentDiv.innerHTML = ''
    let i = 0
    console.log(i,'i current')
    for(let k in koalasFromServer){
      if(koalasFromServer[k].readyToTransfer==='Y'){
        {document.querySelector('#viewKoalas').innerHTML += 
        `<tr>
          
          <td>${koalasFromServer[k].name}</td>
          <td>${koalasFromServer[k].age}</td>
          <td>${koalasFromServer[k].gender}</td>
          <td id="ready">${koalasFromServer[k].readyToTransfer}</td>
          <td>${koalasFromServer[k].notes}</td><span>
          <td id="buttonForTransfer"><button>Ready to Transfer</button></td> 
          <td> <button> Delete</td>          
        </tr>`}
        
          //<td>${koalasFromServer[i].id} id not needed, ready if it is. 
        
      }
      else{
        {document.querySelector('#viewKoalas').innerHTML += 
        `<tr>
          <td>${koalasFromServer[i].name}</td>
          <td>${koalasFromServer[i].age}</td>
          <td>${koalasFromServer[i].gender}</td>
          <td id="ready">${koalasFromServer[i].readyToTransfer}</td>
          <td>${koalasFromServer[i].notes}</td><span>
          <td> </td>
          <td> <button> Delete</td>          
        </tr>`}
         
      }
       
  }


}) //ALWAYS add .catch

}
getKoalas()

// let koalaTable = 
// [{id:13,
// name:'name',
// gender:'gender',
// age:1,
// readyToTransfer:'rtt',
// notes:'notes',
// },]


// console.log(document.querySelector('#viewKoalas'))

// function createButtonTransfer(){
//   let readyIsYes = document.querySelector('#ready')
//   if(readyIsYes.innerHTML === 'Y'){
//     readyIsYes.parentElement = `<button type="button" id="addButton" onclick="submitKoala(event)">Add Koala</button>`
//   }
// }
// createButtonTransfer()
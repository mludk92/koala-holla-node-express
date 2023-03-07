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
          
          <td contenteditable="true">${koalasFromServer[k].name}</td>
          <td contenteditable="true">${koalasFromServer[k].age}</td>
          <td contenteditable="true">${koalasFromServer[k].gender}</td>
          <td> <input type="text" id="ready" list="mylist" maxlength ="1" onClick="clearValue(event)" value="${koalasFromServer[k].readyToTransfer}" required></td>
          <td contenteditable="true">${koalasFromServer[k].notes}</td><span>
          <td id="buttonForTransfer"><button>Ready to Transfer</button></td> 
          <td> <button onClick="deleteKoala(${i})"> Delete</button></td>
          <td> <button onClick="updateEdits(${i})" > Update Edits</button></td>        
        </tr>`}
        //going to need alter statment for db to update edits. 
        // if rft is changed to yes rerun the the rtt funciton on update edits
          //<td>${koalasFromServer[i].id} id not needed, ready if it is. 
        
      }
      else{
        {document.querySelector('#viewKoalas').innerHTML += 
        `<tr>
          <td>${koalasFromServer[k].name}</td>
          <td>${koalasFromServer[k].age}</td>
          <td>${koalasFromServer[k].gender}</td>
          <td> <input type="text" id="ready" list="mylist" maxlength ="1" onClick="clearValue(event)" value="${koalasFromServer[k].readyToTransfer}" required></td>
          <td>${koalasFromServer[k].notes}</td><span>
          <td> </td>
          <td> <button onClick="deleteKoala(${i})"> Delete</td>
          <td> <button onClick="updateEdits(${i})" > Update Edits</button></td>          
        </tr>`}
         
      }
      i++   
  }


}) //ALWAYS add .catch

}
getKoalas()

function deleteKoala(index){
  console.log(`Deleting Koala ${index}`)
  axios.delete(`/koalas/${index}`).then((response)=>{
      console.log(response)
      getKoalas()
  }).catch((error)=>{
      console.log(error)
      AudioListener('Something went wrong')
  })
}

function clearValue(event){
 event.target.value = ''
}
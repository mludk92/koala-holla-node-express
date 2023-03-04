console.log( 'js' );

let nameIn = document.querySelector('#nameIn').value
let ageIn = document.querySelector('#ageIn').value
let genderIn = document.querySelector('#genderIn').value
let rFFIn = document.querySelector('#readyForTransferIn').value
let notesIn = document.querySelector('#notesIn').value


function submitKoala(event){
  console.log(nameIn,ageIn,genderIn,rFFIn,notesIn, 'input fields')
  //writeTable()
  let koalasForServer = 
  [{
    name:nameIn,
    gender:genderIn,
    age:ageIn,
    readyToTransfer:rFFIn,
    notes:notesIn,
    },]
  axios.post('/koalas',koalasForServer).then((response) => {
    console.log(response)
    getKoalas()
}).catch((error) => {
    console.log('error')
    alert('Something went wrong')
})

}





function writeTable(){document.querySelector('#viewKoalas').innerHTML += 
`<tr>
  <td>${nameIn}</td>
  <td>${ageIn}</td>
  <td>${genderIn}</td>
  <td>${rFFIn}</td>
  <td>${notesIn}</td>
</tr>`}



function getKoalas(){
  console.log( 'in getKoalas' );
  axios.get('/koalas').then((response)=> {
    //code that will run on a successful response 
    //from the server 
    console.log(response)
    //quotes from server will be an array of quotes
    let koalasFromServer = response.data
    let contentDiv = document.querySelector('#content') 
    contentDiv.innerHTML = ''
    let i = 0
    for(let quote of koalasFromServer){
      {document.querySelector('#viewKoalas').innerHTML += 
      `<tr>
        <td>${nameIn}</td>
        <td>${ageIn}</td>
        <td>${genderIn}</td>
        <td>${rFFIn}</td>
        <td>${notesIn}</td>
      </tr>`}
        
      i++
    }
}) //ALWAYS add .catch
}

let koalaTable = 
[{id:13,
name:'name',
gender:'gender',
age:1,
readyToTransfer:'rtt',
notes:'notes',
},]
console.log( 'js' );

let nameIn = document.querySelector('#nameIn').value
let ageIn = document.querySelector('#ageIn').value
let genderIn = document.querySelector('#genderIn').value
let rFFIn = document.querySelector('#readyForTransferIn').value
let notesIn = document.querySelector('#notesIn').value


function submitKoala(event){
  console.log(nameIn,ageIn,genderIn,rFFIn,notesIn, 'input fields')
  writeTable()
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
  // axios call to server to get koalas
  
} // end getKoalas

function saveKoala(){
  console.log( 'in saveKoala' );
  // axios call to server to get koalas
}

getKoalas();

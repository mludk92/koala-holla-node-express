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
  let koalasForServer = [
    document.querySelector('#nameIn').value,
    document.querySelector('#genderIn').value,
    Number(document.querySelector('#ageIn').value),
    document.querySelector('#readyForTransferIn').value,
   document.querySelector('#notesIn').value,
    ]
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
    console.log(koalasFromServer.id,'response')
    let contentDiv = document.querySelector('#viewKoalas') 
    contentDiv.innerHTML = ''
    // let i = 0
    // console.log(i,'i current')
    for(let k in koalasFromServer){
      if(koalasFromServer[k].ready_to_transfer===true && koalasFromServer[k].transfered ===null){
        {document.querySelector('#viewKoalas').innerHTML += 
        `<tr>
          
          <td contenteditable="true">${koalasFromServer[k].name}</td>
          <td contenteditable="true">${koalasFromServer[k].age}</td>
          <td contenteditable="true">${koalasFromServer[k].gender}</td>
          <td> <input type="text" id="ready" list="mylist" maxlength ="5" onClick="clearValue(event)" value="${koalasFromServer[k].ready_to_transfer}" required></td>
          <td contenteditable="true">${koalasFromServer[k].notes}</td><span>
          <td id="buttonForTransfer"><button onClick=transfer(${koalasFromServer[k].id})>Ready to Transfer</button></td> 
          <td> <button onClick="deleteKoala(${koalasFromServer[k].id})"> Delete</button></td>
          <td> <button onClick="updateEdits(${koalasFromServer[k].id})" > Update Edits</button></td>        
        </tr>`}
        //going to need alter statment for db to update edits. 
        // if rft is changed to yes rerun the the rtt funciton on update edits
          //<td>${koalasFromServer[i].id} id not needed, ready if it is. 
        
      }
      else if(koalasFromServer[k].ready_to_transfer===true && koalasFromServer[k].transfered ===true){
        {document.querySelector('#viewKoalas').innerHTML += 
        `<tr>
          
          <td contenteditable="true">${koalasFromServer[k].name}</td>
          <td contenteditable="true">${koalasFromServer[k].age}</td>
          <td contenteditable="true">${koalasFromServer[k].gender}</td>
          <td> <input type="text" id="ready" list="mylist" maxlength ="5" onClick="clearValue(event)" value="${koalasFromServer[k].ready_to_transfer}" required></td>
          <td contenteditable="true">${koalasFromServer[k].notes}</td><span>
          <td id="buttonForTransfer">Transfered</button></td> 
          <td> <button onClick="deleteKoala(${koalasFromServer[k].id})"> Delete</button></td>
          <td> <button onClick="updateEdits(${koalasFromServer[k].id})" > Update Edits</button></td>        
        </tr>`}
        //going to need alter statment for db to update edits. 
        // if rft is changed to yes rerun the the rtt funciton on update edits
          //<td>${koalasFromServer[i].id} id not needed, ready if it is. 
        
      }
      else {
        {document.querySelector('#viewKoalas').innerHTML += 
        `<tr>
          <td contenteditable="true">${koalasFromServer[k].name}</td>
          <td contenteditable="true">${koalasFromServer[k].age}</td>
          <td contenteditable="true" id="gender">${koalasFromServer[k].gender}</td>
          <td contenteditable="true"> <input type="text" id="ready" list="mylist" maxlength ="5" onClick="clearValue(event)" value="${koalasFromServer[k].ready_to_transfer}" required></td>
          <td contenteditable="true">${koalasFromServer[k].notes}</td><span>
          <td>Not Ready </td>
          <td> <button onClick="deleteKoala(${koalasFromServer[k].id})"> Delete</td>
          <td> <button onClick="updateEdits(${koalasFromServer[k].id})" > Update Edits</button></td>          
        </tr>`}
         
      }
  
  }


}).catch((error)=> {
  console.log(error);
  alert('Something went wrong.');
}); 

}
getKoalas()

// function deleteKoala(index){
//   console.log(`Deleting Koala ${index}`)

//   axios.delete(`/koalas/${index}`).then((response)=>{
//       console.log(response)
//       getKoalas()
//   }).catch((error)=>{
//       console.log(error)
//       AudioListener('Something went wrong')
//   })
// }

function clearValue(event){
 event.target.value = ''
}

//updated delete funciton to use sweetalert swal 
function deleteKoala(index) {

  swal({
         title: "Are you sure?",
         text: "Once deleted, you will not be able to recover this record!",
         icon: "warning",
         buttons: true,
         dangerMode: true,
       })
      .then((willDelete) => {
           if (willDelete) {
              axios.delete(`/koalas/${index}`).then((response)=>{
              console.log(response)
              getKoalas()
          }).catch((error)=>{
              console.log(error)
              AudioListener('Something went wrong')
          })
           } else {
                  swal("Your record has not been delete!");
       }
    });
}



//search functions to filter by name and gender 
function searchFunctionName() {
  var input, filter, table, tr, td, i, txtValue;
  input = document.getElementById("myInput");
  filter = input.value.toUpperCase();
  table = document.getElementById("myTable");
  tr = table.getElementsByTagName("tr");
  for (i = 0; i < tr.length; i++) {
    console.log(td)
    td = tr[i].getElementsByTagName("td")[0];
    if (td) {
      txtValue = td.textContent || td.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }       
  }
}

function searchFunctionGender() {
  var input, filter, table, tr, td, i, txtValue;
  input = document.getElementById("myInput2");
  filter = input.value.toUpperCase();
  table = document.getElementById("myTable");
  tr = table.getElementsByTagName("tr");
  for (i = 0; i < tr.length; i++) {
    console.log(td)
    td = tr[i].getElementsByTagName("td")[2];
    if (td) {
      console.log(td)
      txtValue = td.textContent || td.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }       
  }
}


//cant figure out how to get the body populated with data from DOM
// //Put
// function updateEdits(index) {

//   swal({
//          title: "Are you sure?",
//          text: "Once update, this record will be changed for ever!",
//          icon: "warning",
//          buttons: true,
//          dangerMode: true,
//        })
//       .then((willUpdate) => {
//            if (willUpdate) {
//               axios.put(`/koalas/${index}`).then((response)=>{
//               console.log(response)
//               getKoalas()
//           }).catch((error)=>{
//               console.log(error)
//               AudioListener('Something went wrong')
//           })
//            } else {
//                   swal("Your record has not been updated!");
//        }
//     });
// }

function transfer(index){
  swal({
             title: "Are you sure?",
             text: "Once update, this record will be changed for ever!",
             icon: "warning",
             buttons: true,
             dangerMode: true,
           })
          .then((willTransfer) => {
               if (willTransfer) {
                  axios.put(`/koalas/${index}`).then((response)=>{
                  console.log(response)
                  getKoalas()
              }).catch((error)=>{
                  console.log(error)
                  AudioListener('Something went wrong')
              })
               } else {
                      swal("Your record has not been updated!");
           }
        });
    }

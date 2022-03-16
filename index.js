// da se kreira table so pomos na:
// korisnite so gender: male da se obojat zeleni: female - crveni
function loadUsers() {
    let request = new XMLHttpRequest();
    let res;
    request.onreadystatechange = function () {
        // Check if the request is completed and was successful
        if (this.readyState === 4 && this.status === 200) {
            // Logging the response from server into the console as object
            res = JSON.parse(this.response);
           
            showUsers(res);
            
        } else if (this.readyState === 4 && this.status !== 200){
            alert('Bad request');
        }
    };

    request.open('GET', 'https://gorest.co.in/public/v2/users')
    request.send();
}

function showUsers(array) {
    let tabela = document.getElementById('tabela');
    let className;
    array.forEach((item, index) => {
            
    if (item.gender === 'male') {
        className = 'male'
     }
     if (item.gender === 'female') {
         className = 'female'
     }
       tabela.innerHTML += 
       `<tr class="${className}">
       <td class="${index}">${item.email}</td>
       <td class="${index}">${item.name}</td>
       <td><button id="${index}" onclick="smeniInfo(this)">EDIT</button></td>
       </tr>`
   })
}

function smeniInfo(event) {
    let td1 = document.getElementsByClassName(event.id)[0]
    let td2 = document.getElementsByClassName(event.id)[1]

    let input1 = document.getElementById(`email-${event.id}`)
    let input2 = document.getElementById(`name-${event.id}`)

    if (event.textContent === 'EDIT') {
        event.textContent = 'SAVE'
        td1.innerHTML = `<input type="text" id="email-${event.id}" placeholder="${td1.innerHTML}">`
        td2.innerHTML = `<input type="text" id="name-${event.id}" placeholder="${td2.innerHTML}">`
    } else {
        event.textContent = 'EDIT'
        td1.innerHTML = input1.value
        td2.innerHTML = input2.value
    }
}


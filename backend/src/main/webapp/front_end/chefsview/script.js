function deleterow(button){
    let row = button.parentElement.parentElement; //this is to get the row based off of the button
    row.remove(); 
    fixnumbers(); 
}

//addrow will be connected to the database when a new order is submitted it will add a new row with the order info
function addrow(dishname, request, quantity, tablenum, timesubmitted){
    let parent = document.getElementById("orders"); 
    let newrow = document.createElement("tr"); 

    let rownumber = parent.rows.length + 1; 

    newrow.innerHTML =
        '<th scope="row">' + rownumber + '</th>' +
        '<td>' + dishname + '</td>' +
        '<td>' + request + '</td>' +
        '<td>' + quantity + '</td>' +
        '<td>' + tablenum + '</td>' +
        '<td>' + timesubmitted + '</td>' +
        '<td><button onclick="deleterow(this)">send</button></td>';
    parent.appendChild(newrow); 
    fixnumbers(); 
}

function fixnumbers(){
    let parent = document.getElementById("orders");
    let rows = parent.getElementsByTagName("tr"); //in the parent get all the tr's , we need parent cause there is a tr outside of tbody

    // Loop through each row and update its first <th>
    for (let i = 0; i < rows.length; i++) {
        // the first cell in each row / first child is the <th> with scope="row"
        rows[i].children[0].textContent = i + 1;
    }

}

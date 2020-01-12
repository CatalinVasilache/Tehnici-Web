var rIndex;
var table = document.getElementById("table");
let listOfFriends = [];
let id;

populateTable();

class Friend {
    constructor(firstName, lastName, age) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.age = age;
    }

    present() {
        return "Our new friend is: " + this.firstName + " " + this.lastName + ", aged " + this.age;
    }
}

function populateTable() {
    $.ajax('https://my-json-server.typicode.com/CatalinVasilache/Tehnici-Web/friend', {
        type: 'GET',
        dataType: 'json',
        complete: function (data) {

            listOfFriends = data.responseJSON;
            console.log(listOfFriends);

            for (var i = 1; i < table.rows.length; i++) {
                table.rows[i].cells[0].innerHTML = listOfFriends[i - 1].firstName;
                table.rows[i].cells[1].innerHTML = listOfFriends[i - 1].lastName;
                table.rows[i].cells[2].innerHTML = listOfFriends[i - 1].age;
            }
        }
    });
}

function checkEmptyInput() {
    var isEmpty = false,
        fname = document.getElementById("fname").value,
        lname = document.getElementById("lname").value,
        age = document.getElementById("age").value;

    if (fname === "") {
        alert("First Name Connot Be Empty");
        isEmpty = true;
    } else if (lname === "") {
        alert("Last Name Connot Be Empty");
        isEmpty = true;
    } else if (age === "") {
        alert("Age Connot Be Empty");
        isEmpty = true;
    }
    return isEmpty;
}

function addHtmlTableRow() {

    if (!checkEmptyInput()) {
        var newRow = table.insertRow(table.length),
            cell1 = newRow.insertCell(0),
            cell2 = newRow.insertCell(1),
            cell3 = newRow.insertCell(2),
            fname = document.getElementById("fname").value,
            lname = document.getElementById("lname").value,
            age = document.getElementById("age").value;

        cell1.innerHTML = fname;
        cell2.innerHTML = lname;
        cell3.innerHTML = age;
        let friend = new Friend(fname, lname, age);
        listOfFriends.push(friend);
        console.log(listOfFriends);
        id++;
        $.ajax({
            url: 'https://my-json-server.typicode.com/CatalinVasilache/Tehnici-Web/friend',
            type: 'POST',
            dataType: 'json',
            data: {
                firstName: fname,
                lastName: lname,
                age: age,
                id: id
            },
            complete: function (data) {
                console.log(data.responseJSON);
            }
        });

        document.getElementById("present-bar").innerHTML = friend.present();
        selectedRowToInput();
    }
}

function selectedRowToInput() {
    for (var i = 1; i < table.rows.length; i++) {
        table.rows[i].onclick = function () {
            document.getElementById("fname").value = this.cells[0].innerHTML;
            document.getElementById("lname").value = this.cells[1].innerHTML;
            document.getElementById("age").value = this.cells[2].innerHTML;
        };
    }
}

selectedRowToInput();


function removeSelectedRow() {
    table.deleteRow(rIndex);
    document.getElementById("fname").value = "";
    document.getElementById("lname").value = "";
    document.getElementById("age").value = "";
}







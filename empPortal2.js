let emp1 = {
    id: 1, ename: "Priya Singh", gender: "Female", salary: [50000, 5000], email: "alice@example.com", company: "ABC Corp", role: "Emps", pin: 1234
};
let emp2 = {
    id: 2, ename: "Rohit Raj", gender: "Male", salary: [60000, 1500], email: "bob@example.com", company: "XYZ Ltd", role: "Emps", pin: 2345
};
let emp3 = {
    id: 3, ename: "Swaraj Kumar", gender: "Male", salary: [55000, 1000], email: "charlie@example.com", company: "Tech Solutions", role: "Admin", pin: 1111
};
let emp4 = {
    id: 4, ename: "Ayush Kashyap", gender: "Male", salary: [70000, 2500], email: "david@example.com", company: "Innovate LLC", role: "Emps", pin: 3456
};
let emp5 = {
    id: 5, ename: "Kajal Aggarwal", gender: "Female", salary: [65000, 2000], email: "eve@example.com", company: "Global Tech", role: "Emps", pin: 4567
};

let employees = [emp1, emp2, emp3, emp4, emp5];
// Adding username dynamically
for (let val of employees) {
    let usn = "";
    val['usn'] = val.ename.toLowerCase().split(" ").map((ename) => ename[0]).join("");
}

let Controls = document.getElementById('controls')

// Login Credentials
let UsnEle = document.getElementById('usn-ele');
let PinEle = document.getElementById('pin-ele');
// Getting entered username's role
function getUserinfo() {
    let Uname = employees.find(function (emps) {
        if (emps.usn.includes(UsnEle.value.toLowerCase())) {
            return emps;
        }
    });
    return Uname
}
// Checking Username and Pin
PinEle.addEventListener('keyup', function (e) {
    if (e.key == 'Enter') {
        let enteredUname = getUserinfo();
        let Pin = PinEle.value;
        if (enteredUname.role == "Admin" && enteredUname.pin == Pin) Controls.classList.remove('hidden');
        else Controls.classList.add('hidden');
    }
});


// Buttons
let allBtn = document.getElementById('all-btn');
let maleBtn = document.getElementById('male-btn');
let femaleBtn = document.getElementById('female-btn');


let searchBox = document.getElementById('search-box');

allBtn.addEventListener('click', function () {
    displayList(employees);
})

let maleList = employees.filter(function (val) {
    return val.gender == "Male";
});
maleBtn.addEventListener('click', function () {
    displayList(maleList);
})

let femaleList = employees.filter(function (val) {
    return val.gender == "Female";
});
femaleBtn.addEventListener('click', function () {
    displayList(femaleList);
})

function displayList(emps) {
    let eachEmp = "";
    for (let emp of emps) {
        eachEmp +=
            `<tr>
             <td>${emp.id}</td>
             <td>${emp.ename}</td>
             <td>${emp.usn}</td>
             <td>${emp.gender}</td>
             <td>${emp.salary}</td>
             <td>${emp.email}</td>
             <td>${emp.company}</td>
         </tr>`;
    }
    document.getElementById('emp-field').innerHTML = eachEmp;
}

//Search

searchBox.addEventListener('keyup', function (e) {
    let enteredName = searchBox.value;
    let filteredEmps = searchEmps(enteredName, employees);
    if (enteredName.length >= 1 && searchBox.value != ' ')
        displayList(filteredEmps);
    else
        document.getElementById('emp-field').innerHTML = ""
});

function searchEmps(entName, emps) {
    entName = entName.toLowerCase().trim();
    let filteredEmps = [];
    for (let emp of emps) {
        let orgName = emp.ename.toLowerCase().trim();

        if (orgName.includes(entName)) {
            filteredEmps.push(emp);
        }
    }
    return filteredEmps;
}
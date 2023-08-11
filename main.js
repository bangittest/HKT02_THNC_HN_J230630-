const data = [
    {
        id: 1, name: "Nguyen Van a", email: "a@gmail.com", phone: "0938474233", city: "Ha Noi", gender: "nam"
    },
    {
        id: 2, name: "Nguyen Van b", email: "b@gmail.com", phone: "0938474312", city: "Ha Noi", gender: "nu"
    },
    {
        id: 3, name: "Nguyen Van c", email: "c@gmail.com", phone: "0938474393", city: "Ha Noi", gender: "nam"
    }
]
let idGlabal = 4
let indexUpdateSudent = null
const inputName = document.getElementById("name")
const inputEmail = document.getElementById("email")
const inputPhone = document.getElementById("phone")
const inputCity = document.getElementById("city")
const inputGerder = document.getElementById("gender")

function Table(c = data) {

    let stringHTML = "";
    c.forEach(e => stringHTML +=
        `
        <tr>
            <td>${e.id}</td>
            <td>${e.name}</td>
            <td>${e.email}</td>
            <td>${e.phone}</td>
            <td>${e.city}</td>
            <td>${e.gender}</td>
            <td>
                <div class="action_col">
                <button class="btn btn_sua" onclick="toggleForm(${e.id})">Edit</button>
                <button class="btn btn_xoa" onclick="deleteStudent(${e.id})">Delete</button>
            </div>
            </td>
        </tr>
        `)
    document.getElementById("table_body").innerHTML = stringHTML
}
Table()

function toggleForm(id) {
    document.getElementById("form_scope")
    if (id != undefined) {
        const indexUpdate = data.findIndex(e => e.id == id)
        indexUpdateSudent = indexUpdate
        inputName.value = data[indexUpdate].name
        inputPhone.value = data[indexUpdate].phone
        inputEmail.value = data[indexUpdate].email
        inputCity.value = data[indexUpdate].city
        inputGerder.value = data[indexUpdate].gender
    } else {
        indexUpdateSudent = null
        document.getElementById("form").reset()
    }
}
document.getElementById("form").addEventListener("submit", function (e) {
    e.preventDefault()
    let gender
    let radio = document.getElementsByName("nam");
    for (let i = 0; i < radio.length; i++) {
        if (radio[i].checked === true) {
            gender = radio[i].value
        }
    }
    console.log(gender);
    if (indexUpdateSudent != null) {
        data[indexUpdateSudent].name = inputName.value
        data[indexUpdateSudent].email = inputEmail.value
        data[indexUpdateSudent].phone = inputPhone.value
        data[indexUpdateSudent].city = inputCity.value
        data[indexUpdateSudent].gender = gender
        indexUpdateSudent = null
        this.reset()
        toggleForm()
        Table()
        return
    }
    const sudentus1 = {
        id: idGlabal,
        name: inputName.value,
        email: inputEmail.value,
        phone: inputPhone.value,
        city: inputCity.value,
        gender: gender
    }
    idGlabal++
    data.push(sudentus1)
    this.reset()
    toggleForm()
    Table()

})
//delete
function deleteStudent(id) {
    const indexDelete = data.findIndex(e => e.id == id)
    const result = confirm(`Delete ${data[indexDelete].name}`)
    if (result) {
        data.splice(indexDelete, 1)
        Table()
    }
}
//sắp xếp
function sortStudent() {
    data.sort((a, b) => a.name.localeCompare(b.name));
    Table();
}
//tìm kiếm
function checkSearch() {
    let text = document.getElementById("search").value;
    let foundStudent = data.filter(stu => stu.name.toLowerCase().includes(text.trim().toLowerCase()));
    Table(foundStudent);
}

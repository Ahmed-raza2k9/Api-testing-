let tableBody = document.getElementById('tbody');

async function getData() {
    tableBody.innerHTML = '';
    try {
        const response = await fetch("https://student-api-backend-production-39ee.up.railway.app/api/student");

        const data = await response.json();


        data.data.forEach(e => {
            tableBody.innerHTML += ` <tr>
            <td>${e.id}</td>
            <td>${e.name}</td>
            <td>${e.email}</td>
            <td>
            <button onclick="edit(${e.id})" class="edit-btn">Edit</button>
            <button onclick="confirm('Delete this student?') && deleteS(${e.id})" class="delete-btn">delete</button>
            </td>
            </tr>`
        });

    }
    catch (error) {
        console.error(error);
    }
}

let form = document.getElementById('studentForm');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    let data = new FormData(form);
    let student = {
        name: data.get('name'),
        email: data.get('email')
    }
    async function create() {


        const response = await fetch("https://student-api-backend-production-39ee.up.railway.app/api/student", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(student)
        })
        const data = await response.json();

        console.log(data);
        alert(data.message);

    }
    create();
    form.reset();
    setTimeout(() => {
        getData();
    }, 1000);
});

getData();

async function deleteS(id) {
    let response = await fetch(`https://student-api-backend-production-39ee.up.railway.app/api/student/${id}`, {
        method: "DELETE"
    });
    let data = await response.json();
    console.log(data);
    setTimeout(() => {
        getData();
    }, 1000);
    alert(data.message);

}
async function edit(id) {

    let response = await fetch(
        `https://student-api-backend-production-39ee.up.railway.app/api/student/get/${id}`
    );



    let data = await response.json();
    let student = data.data;

    openModal(student.id, student.name, student.email);
}
const modal = document.getElementById("editModal");

function openModal(id, name, email) {

    document.getElementById("editId").value = id;
    document.getElementById("editName").value = name;
    document.getElementById("editEmail").value = email;

    modal.classList.add("active");
}

function closeModal() {
    updateBtn.innerHTML = 'Update Student';

    modal.classList.remove("active");
}

window.addEventListener("click", (e) => {

    if (e.target === modal) {
        closeModal();
    }

});

let editForm = document.getElementById('editStudentForm');
let updateBtn = document.getElementById('updateBtn');
updateBtn.innerHTML = 'Update Student';
editForm.addEventListener('submit', (e) => {
    updateBtn.innerHTML = 'Loading....';
    e.preventDefault();
    let data = new FormData(editForm);
    let student = {
        id: data.get('id'),
        name: data.get('name'),
        email: data.get('email')
    }
    async function update() {


        const response = await fetch("https://student-api-backend-production-39ee.up.railway.app/api/student/update", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(student)
        })
        const data = await response.json();

        console.log(data);

        setTimeout(() => {
            getData();
            closeModal();
        }, 1000);
    }
    update();
});

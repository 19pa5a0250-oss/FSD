const loadButton = document.getElementById("btnLoad");
const addButton = document.getElementById("btnAdd");
const API_URL = "http://localhost:3000";

async function loadUsers() {
    const response = await fetch(`${API_URL}/users`);
    const users = await response.json();

    let html = `
        <table border="1" cellpadding="10">
            <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Action</th>
            </tr>
    `;

    users.forEach(user => {
        html += `
            <tr>
                <td>${user.id}</td>
                <td>${user.name}</td>
                <td>
                    <button onclick="deleteUser(${user.id})">Delete</button>
                </td>
            </tr>
        `;
    });

    html += "</table>";
    document.getElementById("result").innerHTML = html;
}

async function addUser() {
    const name = document.getElementById("name").value;

    if (name === "") {
        alert("Please enter a name");
        return;
    }

    await fetch(`${API_URL}/users`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ name })
    });

    document.getElementById("name").value = "";
    loadUsers();
}

async function deleteUser(id) {
    if (!confirm("Are you sure?")) {
        return;
    }

    await fetch(`${API_URL}/users/${id}`, {
        method: "DELETE"
    });

    loadUsers();
}

loadButton.addEventListener("click", loadUsers);
addButton.addEventListener("click", addUser);

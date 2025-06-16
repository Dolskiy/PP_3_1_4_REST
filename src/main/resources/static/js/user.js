document.addEventListener('DOMContentLoaded', function () {
    fetchCurrentUser();
    fetchUsers();
    loadRoles();
    setupCloseButtons();
});

function fetchCurrentUser() {
    console.log('Fetching current user info...');
    fetch('/user/currentUser')
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch current user info');
            }
            return response.json();
        })
        .then(user => {
            console.log('Current user fetched:', user);
            const emailSpan = document.getElementById('currentUserEmail');
            const roleSpan = document.getElementById('currentUserRole');
            emailSpan.textContent = user.email;
            roleSpan.textContent = user.roles.map(role => role.name).join(', '); // Преобразуем массив ролей в строку
        })
        .catch(error => {
            console.error('Error fetching current user info:', error);
        });
}

fetch('/user/currentUser')
    .then(r => r.json())
    .then(data => userTable(data))

const userInfoAdmin = document.getElementById('about-user')
let userInfoOutput = '';
const userTable = (user) => {
    role = '';
    if (user.roles) {
        user.roles.forEach((r) => role += r.name.substring(5) + " ");
    }
    userInfoOutput = `
        <tr>
            <td>${user.id}</td>
            <td>${user.firstName}</td>
            <td>${user.lastName}</td>
            <td>${user.age}</td>
            <td>${user.email}</td>
            <td>${role}</td>
        </tr>
     `
    userInfoAdmin.innerHTML = userInfoOutput;
}

function loadRoles() {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', rolesListUrl);
    xhr.onreadystatechange = () => {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                const data = JSON.parse(xhr.responseText);
                let options = '';
                for (const {id, name} of data) {
                    options += `<option value="${id}">${name}</option>`;
                }
                selectRoleForm.innerHTML = options;
            } else {
                console.error('Error:', xhr.status);
            }
        }
    };
    xhr.send();
}















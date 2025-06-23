document.addEventListener('DOMContentLoaded', function () {
    fetchCurrentUser();
    fetchUsers();
    loadRoles();
});

function fetchCurrentUser() {
    fetch('/admin/currentUser')
        .then(response => response.json())
        .then(user => {
            document.getElementById('currentUserEmail').textContent = user.email;
            document.getElementById('currentUserRole').textContent = user.roles.map(role => role.name).join(', ');
        })
        .catch(error => console.error('Error:', error));
}

function fetchUsers() {
    fetch('/admin/users')
        .then(response => response.json())
        .then(users => {
            const tableBody = document.getElementById('users-table-body');
            tableBody.innerHTML = '';
            users.forEach(user => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${user.id}</td>
                    <td>${user.firstName}</td>
                    <td>${user.lastName}</td>
                    <td>${user.age}</td>
                    <td>${user.email}</td>
                    <td>${user.roles.map(role => role.name).join(', ')}</td>
                    <td><button class="btn btn-info" onclick="editUser(${user.id})">Edit</button></td>
                    <td><button class="btn btn-danger" onclick="deleteUser(${user.id})">Delete</button></td>
                `;
                tableBody.appendChild(row);
            });
        })
        .catch(error => console.error('Error:', error));
}

function loadRoles() {
    fetch('/admin/users/roles')
        .then(response => response.json())
        .then(roles => {
            const roleSelect = document.getElementById('roles');
            const editRoleSelect = document.getElementById('editRoles');

            roleSelect.innerHTML = '';
            editRoleSelect.innerHTML = '';

            roles.forEach(role => {
                const option = document.createElement('option');
                option.value = role.id;
                option.textContent = role.name;
                roleSelect.appendChild(option.cloneNode(true));
                editRoleSelect.appendChild(option);
            });
        })
        .catch(error => console.error('Error:', error));
}

function editUser(userId) {
    fetch(`/admin/users/${userId}`)
        .then(response => response.json())
        .then(user => {
            document.getElementById('editUserId').value = user.id;
            document.getElementById('editFirstName').value = user.firstName;
            document.getElementById('editLastName').value = user.lastName;
            document.getElementById('editAge').value = user.age;
            document.getElementById('editEmail').value = user.email;

            const editRolesSelect = document.getElementById('editRoles');
            Array.from(editRolesSelect.options).forEach(option => {
                option.selected = user.roles.some(role => role.id === parseInt(option.value));
            });

            document.getElementById('editFormContainer').style.display = 'block';
            window.scrollTo(0, document.body.scrollHeight);
        })
        .catch(error => console.error('Error:', error));
}

function deleteUser(userId) {
    if (confirm('Are you sure you want to delete this user?')) {
        fetch(`/admin/users/${userId}`, { method: 'DELETE' })
            .then(response => {
                if (response.ok) {
                    fetchUsers();
                }
            })
            .catch(error => console.error('Error:', error));
    }
}

function cancelEdit() {
    document.getElementById('editFormContainer').style.display = 'none';
    document.getElementById('editUserForm').reset();
}

document.getElementById('new-user-form').addEventListener('submit', function (e) {
    e.preventDefault();
    const formData = new FormData(this);
    const roles = Array.from(document.getElementById('roles').selectedOptions)
        .map(option => ({ id: parseInt(option.value) }));

    const user = {
        firstName: formData.get('firstName'),
        lastName: formData.get('lastName'),
        age: parseInt(formData.get('age')),
        email: formData.get('email'),
        password: formData.get('password'),
        roles: roles
    };

    fetch('/admin/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    })
        .then(response => {
            if (response.ok) {
                this.reset();
                fetchUsers();
            }
        })
        .catch(error => console.error('Error:', error));
});

document.getElementById('editUserForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const formData = new FormData(this);
    const roles = Array.from(document.getElementById('editRoles').selectedOptions)
        .map(option => ({ id: parseInt(option.value) }));

    const user = {
        id: parseInt(formData.get('id')),
        firstName: formData.get('editFirstName'),
        lastName: formData.get('editLastName'),
        age: parseInt(formData.get('editAge')),
        email: formData.get('editEmail'),
        password: formData.get('editPassword') || undefined,
        roles: roles
    };

    fetch(`/admin/users/${user.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    })
        .then(response => {
            if (response.ok) {
                this.reset();
                document.getElementById('editFormContainer').style.display = 'none';
                fetchUsers();
            }
        })
        .catch(error => console.error('Error:', error));
});
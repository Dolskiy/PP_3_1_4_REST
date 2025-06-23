document.addEventListener('DOMContentLoaded', function () {
    fetchCurrentUser();
});

function fetchCurrentUser() {
    fetch('/user/currentUser')
        .then(response => response.json())
        .then(user => {
            document.getElementById('currentUserEmail').textContent = user.email;
            document.getElementById('currentUserRole').textContent = user.roles.map(role => role.name).join(', ');

            const roleNames = user.roles.map(role => role.name.substring(5)).join(' ');
            document.getElementById('about-user').innerHTML = `
                <tr>
                    <td>${user.id}</td>
                    <td>${user.firstName}</td>
                    <td>${user.lastName}</td>
                    <td>${user.age}</td>
                    <td>${user.email}</td>
                    <td>${roleNames}</td>
                </tr>
            `;
        })
        .catch(error => console.error('Error:', error));
}















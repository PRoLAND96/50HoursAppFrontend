function fetchUserData() {
    fetch(apiURL + 'users')
        .then(response => response.json())
        .then(data => {
            const user = data.find(user => user.id === currentUserID); // Itt az adott diák azonosítóját kell beírni
            if (user) {
                document.getElementById('username').textContent = `${user.username}`;
                document.getElementById('name').textContent = `${user.firstName}  ${user.lastName}`;
                document.getElementById('birthDate').textContent = `${user.birthDate}`;
                document.getElementById('email').textContent = `${user.email}`;
                document.getElementById('phoneNumber').textContent = `${user.phoneNumber}`;
                document.getElementById('ikszCoordinator').textContent = `${user.ikszcoordinator}`;
                document.getElementById('omid').textContent = `${user.omid}`;
                document.getElementById('address').textContent = `${user.location.country}, ${user.location.name} ${user.location.street}`;
                document.getElementById('coordinatorEmail').textContent =  `${user.coordinatorEmail}`;
                document.getElementById('coordinatorPhone').textContent =  `${user.coordinatorPhone}`;
            }
        })
        .catch(error => console.error('Error fetching user data:', error));
}

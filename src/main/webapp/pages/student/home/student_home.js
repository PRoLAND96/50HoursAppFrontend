function fetchUserData() {
    getCurrentUserID()
      .then(currentUserID => {
        fetch(apiURL + 'users')
          .then(response => {
            if (!response.ok) {
              throw new Error(`Failed to fetch users: ${response.status}`);
            }
            return response.json();
          })
          .then(data => {
            const user = data.find(user => user.id === currentUserID);
            if (user) {
              document.getElementById('username').textContent = `${user.username}`;
              document.getElementById('name').textContent = `${user.firstName} ${user.lastName}`;
              document.getElementById('birthDate').textContent = `${user.birthDate}`;
              document.getElementById('email').textContent = `${user.email}`;
              document.getElementById('phoneNumber').textContent = `${user.phoneNumber}`;
              document.getElementById('ikszCoordinator').textContent = `${user.ikszcoordinator}`;
              document.getElementById('omid').textContent = `${user.omid}`;
              document.getElementById('address').textContent = `${user.location.country}, ${user.location.name} ${user.location.street}`;
              document.getElementById('coordinatorEmail').textContent = `${user.coordinatorEmail}`;
              document.getElementById('coordinatorPhone').textContent = `${user.coordinatorPhone}`;
            } else {
              console.error('User not found for currentUser ID:', currentUserID);
            }
          })
          .catch(error => console.error('Error fetching user data:', error));
      })
      .catch(error => console.error('Error getting current user ID:', error));
}
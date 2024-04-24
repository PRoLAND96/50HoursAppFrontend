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
              document.getElementById('conactUsername').textContent = `${user.username}`;
              document.getElementById('conactName').textContent = `${user.firstName} ${user.lastName}`;
              document.getElementById('conactEmail').textContent = `${user.email}`;
              document.getElementById('conactPhoneNumber').textContent = `${user.phoneNumber}`;
            } else {
              console.error('User not found for currentUser ID:', currentUserID);
            }
          })
          .catch(error => console.error('Error fetching user data:', error));
      })
      .catch(error => console.error('Error getting current user ID:', error));
}

function fetchInstitutionData() {
    getCurrentUserID()
      .then(currentUserID => {
        fetch(apiURL + 'institutions')
          .then(response => {
            if (!response.ok) {
              throw new Error(`Failed to fetch institutions: ${response.status}`);
            }
            return response.json();
          })
          .then(data => {
            console.log('Fetched institutions:', data);
            const institution = data.find(inst => inst.contact === currentUserID);
            if (institution) {
              document.getElementById('instututionName').textContent = `${institution.name}`;
              document.getElementById('instututionType').textContent = `${institution.type}`;
              document.getElementById('instututionLocation').textContent = `${institution.location.country}, ${institution.location.name} ${institution.location.street}`;
              document.getElementById('instututionText').textContent = `${institution.description.text}`;
              document.getElementById('instututionLinks').textContent = `${institution.description.links.join(', ')}`;
            } else {
              console.error('Institution not found for current user ID:', currentUserID);
            }
          })
          .catch(error => console.error('Error fetching institution data:', error));
      })
      .catch(error => console.error('Error getting current user ID:', error));
}

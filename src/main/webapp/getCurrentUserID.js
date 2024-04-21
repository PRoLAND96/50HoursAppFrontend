function getCurrentUserID() {
    return fetch(apiURL + 'currentUser')
      .then(response => {
        if (!response.ok) {
          throw new Error(`Failed to fetch currentUser: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          const currentUserID = data[data.length - 1].currentUser;
          return currentUserID;
        } else {
          throw new Error('currentUser is not in the expected format');
        }
      })
      .catch(error => {
        console.error('Error fetching currentUser data:', error);
        throw error;  // Propagate the error
      });
}
function getCurrentID() {
  return fetch(apiURL + 'currentUser')
    .then(response => {
      if (!response.ok) {
        throw new Error(`Failed to fetch currentUser: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      if (Array.isArray(data) && data.length > 0) {
        const currentUserID = data[data.length - 1].id;
        return currentUserID;
      } else {
        throw new Error('currentUser is not in the expected format');
      }
    })
    .catch(error => {
      console.error('Error fetching currentUser data:', error);
      throw error;  // Propagate the error
    });
}
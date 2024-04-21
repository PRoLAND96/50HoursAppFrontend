document.addEventListener('DOMContentLoaded', function() {
    const logoutBtn = document.getElementById('logoutBtn');
    
    logoutBtn.addEventListener('click', function(event) {
        event.preventDefault(); // Prevent default anchor behavior
        
        // Jelenlegi felhasználó azonosítójának lekérése
        getCurrentID().then(currentUserID => {
            // Felhasználó törlése
            deleteUser(currentUserID).then(() => {
                console.log('Successfully logged out');
                window.location.href = '../../../index.html'; // Redirect to index.html
            });
        });
    });
});

function deleteUser(userId) {
    return fetch(`${apiURL}currentUser/${userId}`, {
        method: 'DELETE',
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`Failed to delete user with ID ${userId}: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        console.log(`User with ID ${userId} deleted successfully. Response:`, data);
    })
    .catch(error => {
        console.error(`Error deleting user with ID ${userId}:`, error);
    });
}
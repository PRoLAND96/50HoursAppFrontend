function saveCurrentUserToDB(currentUser) {
    const data = { currentUser };
    console.log('Sending data to server:', data);
  
    fetch(apiURL + 'currentUser', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(result => {
        console.log('User data saved successfully:', result);
      })
      .catch(error => {
        console.error('Error saving user data:', error);
      });
}

let currentUser = null;

document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');

    loginForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        loginUser(username, password);
    });
});

function loginUser(username, password) {
    fetch(apiURL + 'users')
        .then(response => response.json())
        .then(data => {
            const user = data.find(user => user.username === username && user.password === password);
            if (user) {
                currentUser = user.id;
                document.getElementById('loginMessage').textContent = 'Sikeres bejelentkezés!';
                
                saveCurrentUserToDB(currentUser);

                window.location.href = '../home/student_home.html';
            } else {
                document.getElementById('loginMessage').textContent = 'Hibás felhasználónév vagy jelszó!';
            }
        })
        .catch(error => {
            console.error('Error fetching user data:', error);
            document.getElementById('loginMessage').textContent = 'Hiba történt a bejelentkezés során.';
        });
}

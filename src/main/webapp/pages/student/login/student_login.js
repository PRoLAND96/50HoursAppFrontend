document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const loginMessage = document.getElementById('loginMessage');

    loginForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Megakadályozza az űrlap alapértelmezett beküldését

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        // Ellenőrizd a felhasználói adatokat
        loginUser(username, password);
    });
});

function loginUser(username, password) {
    fetch(apiURL + 'users')
        .then(response => response.json())
        .then(data => {
            const user = data.find(user => user.username === username && user.password === password);
            if (user) {
                // Sikeres bejelentkezés
                document.getElementById('loginMessage').textContent = 'Sikeres bejelentkezés!';
                
                // Beállítjuk a currentUserID-t a sikeresen bejelentkezett user id-jére
                let currentUserID = user.id;

                // Átirányítás a home oldalra
                window.location.href = '../home/student_home.html';
            } else {
                // Sikertelen bejelentkezés
                document.getElementById('loginMessage').textContent = 'Hibás felhasználónév vagy jelszó!';
            }
        })
        .catch(error => {
            console.error('Error fetching user data:', error);
            document.getElementById('loginMessage').textContent = 'Hiba történt a bejelentkezés során.';
        });
}

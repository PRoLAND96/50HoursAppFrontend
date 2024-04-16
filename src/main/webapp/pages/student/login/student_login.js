function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    fetch(apiURL + 'perform_login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: username,
            password: password
        })
    })
    .then(response => {
        if (!response.ok) {
            //throw new Error('Hiba történt a kérés során.');
        window.location.href = 'http://localhost:9090/50hours/pages/contact/home/contact_home.html';
        }
    })
    .catch(error => {
        console.error('Hiba:', error);
        alert('Hiba történt a bejelentkezés során.');
    });
}
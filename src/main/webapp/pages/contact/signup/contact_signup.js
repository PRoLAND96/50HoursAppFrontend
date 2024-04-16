function submitRegisterForm() {
    var username = document.getElementById('username').value;
    var lastName = document.getElementById('lastName').value;
    var firstName = document.getElementById('firstName').value;
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    var phoneNumber = document.getElementById('phoneNumber').value;
    var csrfToken = document.getElementById('csrf').value; // CSRF token from hidden input

    var registerData = {
        "username": username,
        "lastName": lastName,
        "firstName": firstName,
        "email": email,
        "password": password,
        "phoneNumber": phoneNumber
    };

    fetch(apiURL + 'users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(registerData)
    })
        .then(function(response) {
            if (response.ok) {
                alert("Sikeres regisztráció.")
            }
            throw new Error('Network response was not ok.');
        })
        .catch(function(error) {
            alert("Hiba történt a regisztráció során: " + error.message);
        });
}
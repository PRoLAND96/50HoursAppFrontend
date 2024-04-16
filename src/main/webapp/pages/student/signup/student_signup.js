
function submitRegisterForm() {
    // Űrlap adatok begyűjtése
    var username = document.getElementById('username').value;
    var lastName = document.getElementById('lastName').value;
    var firstName = document.getElementById('firstName').value;
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    var phoneNumber = document.getElementById('phoneNumber').value;
    var birthDate = document.getElementById('birthDate').value;
    var gender = document.getElementById('gender').value;
    var street = document.getElementById('street').value;
    var city = document.getElementById('city').value;
    var country = document.getElementById('country').value;
    var OMID = document.getElementById('OMID').value;
    var schoolName = document.getElementById('schoolName').value;
    var IKSZCoordinator = document.getElementById('IKSZCoordinator').value;
    var coordinatorEmail = document.getElementById('coordinatorEmail').value;
    var coordinatorPhone = document.getElementById('coordinatorPhone').value;

    var locationData = {
        "street": street,
        "name": city,
        "country": country
    };

    // JSON objektum létrehozása az adatokból
    var registerData = {
        "username": username,
        "lastName": lastName,
        "firstName": firstName,
        "email": email,
        "password": password,
        "phoneNumber": phoneNumber,
        "birthDate": birthDate,
        "gender": gender.charAt(0),
        "location": locationData,
        "OMID": OMID,
        "schoolName": schoolName,
        "IKSZCoordinator": IKSZCoordinator,
        "coordinatorEmail": coordinatorEmail,
        "coordinatorPhone": coordinatorPhone
    };

    // Fetch API használata az AJAX kérés elküldésére
    fetch('http://localhost:8080/users/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(registerData)
    })
        .then(function(response) {
            if (response.ok) {
                return response.json();
            }
            throw new Error('Network response was not ok.');
        })
        .then(function(data) {
            alert("Sikeres regisztráció.");
        })
        .catch(function(error) {
            // Sikertelen regisztráció esetén vagy hiba esetén
            alert("Hiba történt a regisztráció során: " + error.message);
        });
}

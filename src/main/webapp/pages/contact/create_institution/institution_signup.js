document.addEventListener("DOMContentLoaded", function() {
    fetch(apiURL + 'jobTypes', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
        .then(data => {
            const jobTypeSelect = document.getElementById('jobType');

            data.forEach(jobType => {
                const option = document.createElement('option');
                option.value = jobType.name;
                option.textContent = jobType.name;
                jobTypeSelect.appendChild(option);
            });
        })
        .catch(error => {
            console.error('Error fetching job types:', error);
        });
});

function submitRegisterForm() {
    var name = document.getElementById('name').value;
    var type = document.getElementById('type').value;
    var location = document.getElementById('location').value;
    var text = document.getElementById('text').value;
    var links = document.getElementById('links').value.split(',');
    var pictures = document.getElementById('pictures').value.split(',');

    var registerData = {
        "name": name,
        "type": type,
        "location": location,
        "description": {
            "text": text,
            "links": links,
            "pictures": pictures
        }
    };

    fetch(apiURL + 'institution', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
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
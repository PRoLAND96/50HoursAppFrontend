function fetchInstitutions() {
    fetch(apiURL + 'institutions')
        .then(response => response.json())
        .then(data => displayInstitutions(data))
        .catch(error => console.error('Error fetching institutions:', error));
}

function displayInstitutions(institutions) {
    const institutionList = document.getElementById('institutionList');
    institutionList.innerHTML = '';  // Clear previous list

    institutions.forEach(institution => {
        const listItem = document.createElement('li');

        const name = document.createElement('h2');
        name.textContent = `${institution.name}`;
        name.classList.add('name');
        listItem.appendChild(name);

        const type = document.createElement('p');
        type.textContent = institution.type ? `${institution.type}` : 'ismeretlen';
        type.classList.add('type');
        listItem.appendChild(type);

        const location = document.createElement('p');
        location.textContent = institution.location ? 
                               `${institution.location.country}, ${institution.location.street}` : 
                               'N/A';
        location.classList.add('location');
        listItem.appendChild(location);

        const description = document.createElement('p');
        description.textContent = `${institution.description.text}`;
        description.classList.add('description');
        listItem.appendChild(description);

        const applyButton = document.createElement('button');
        applyButton.textContent = 'Jelentkezés';
        applyButton.classList.add('apply-button');
        applyButton.addEventListener('click', async function() { // Make the function async
            try {
                const userId = await getCurrentUserID(); // Await the promise
                applyToInstitution(institution.id, userId, institution.contact);
            } catch (error) {
                console.error('Error getting current user ID:', error);
                alert('Hiba történt a felhasználó azonosítása során.');
            }
        });
        listItem.appendChild(applyButton);

        institutionList.appendChild(listItem);
    });
}

function applyToInstitution(institutionId, userId, contactId) {
    const formData = {
        institutionId: institutionId,
        userId: userId,
        contactId: contactId 
    };

    fetch(apiURL + 'apply', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`Failed to apply: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        console.log('Successfully applied:', data);
        alert('Sikeres jelentkezés!');
    })
    .catch(error => {
        console.error('Error applying:', error);
        alert('Hiba történt a jelentkezés során.');
    });
}
document.addEventListener('DOMContentLoaded', function() {
    fetchInstitutions();
});

function searchByType() {
    var input, filter, institutions, institution, type;
    input = document.getElementById("typeSearch");
    filter = input.value.toUpperCase();
    institutions = document.getElementById("institutionList").getElementsByTagName("li");

    for (var i = 0; i < institutions.length; i++) {
        institution = institutions[i];
        type = institution.querySelector('.type').textContent.toUpperCase();

        if (type.indexOf(filter) > -1) {
            institution.style.display = "";
        } else {
            institution.style.display = "none";
        }
    }
}

function fetchInstitutions() {
    fetch('http://localhost:8080/institutions')
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
        type.textContent = `${institution.type.name}`;
        type.classList.add('type');
        listItem.appendChild(type);

        const location = document.createElement('p');
        location.textContent = `${institution.location}`;
        location.classList.add('location');
        listItem.appendChild(location);

        const description = document.createElement('p');
        description.textContent = `${institution.description.text}`;
        description.classList.add('description');
        listItem.appendChild(description);

        const applyButton = document.createElement('button');
        applyButton.textContent = 'Jelentkezés';
        applyButton.classList.add('apply-button');
        listItem.appendChild(applyButton);

        institutionList.appendChild(listItem);
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
function loadApplication() {
    current_user().then(currentUserID => {
        Promise.all([
            fetch(apiURL + 'apply'),
            fetch(apiURL + 'users'),
            fetch(apiURL + 'contracts')  
        ])
        .then(responses => Promise.all(responses.map(response => response.json())))
        .then(([applies, users, contracts]) => {
            if (!Array.isArray(applies) || !Array.isArray(users) || !Array.isArray(contracts)) {
                throw new Error('Invalid data format');
            }
            
            const filteredApplication = applies.filter(apply => apply.contactId === currentUserID);
            displayApplication(filteredApplication, users);
            
            
            displayAppliedStudents(contracts, currentUserID);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
    });
}

function displayApplication(application, users) {
    const applicationSection = document.getElementById('applicationsList');  // A változó neve javítva
    if (!applicationSection) {
        console.error('Applications section not found');
        return;
    }

    applicationSection.innerHTML = '';  // Lista tartalmának törlése

    application.forEach(apply => {
        // Megkeressük a user-t az id alapján
        const user = users.find(user => user.id === apply.userId);
        
        if (!user) {
            console.error(`User not found for apply id: ${apply.id}`);
            return;
        }

        const listItem = document.createElement('li');
        listItem.classList.add('application-item');
        
        const name = document.createElement('h4');
        name.textContent = `${user.lastName} ${user.firstName}`;
        name.classList.add('user-name');
        listItem.appendChild(name);

        const email = document.createElement('p');  
        email.textContent = `Email: ${user.email}`;
        email.classList.add('user-email');
        listItem.appendChild(email);

        const phoneNumber = document.createElement('p');
        phoneNumber.textContent = `Telefonszám: ${user.phoneNumber}`;
        phoneNumber.classList.add('user-phone');
        listItem.appendChild(phoneNumber);

        const address = document.createElement('p');
        address.textContent = `Lakhely: ${user.location ? `${user.location.name}, ${user.location.street}` : 'N/A'}`;
        address.classList.add('user-address');
        listItem.appendChild(address);

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Törlés';
        deleteButton.classList.add('delete-button');
        deleteButton.addEventListener('click', () => {
            deleteApplication(apply.id);  
        });
        listItem.appendChild(deleteButton);

        const acceptButton = document.createElement('button');
        acceptButton.textContent = 'Elfogadás';
        acceptButton.dataset.applicationId = apply.id;
        acceptButton.dataset.userId = user.id;
        acceptButton.dataset.institutionId = apply.institutionId;
        acceptButton.classList.add('accept-button');  
        acceptButton.addEventListener('click', () => {
            createContract(user, apply.institutionId, apply.contactId);  
            loadApplication();
        });
        listItem.appendChild(acceptButton);

        applicationSection.appendChild(listItem);
    });
}



function createContract(user, institutionId, contactId) {
    console.log('Create contract function called');
    const contractData = {
        student: {
            id: user.id,
            username: user.username,
            lastName: user.lastName,
            firstName: user.firstName,
            email: user.email,
            phoneNumber: user.phoneNumber,
            birthDate: user.birthDate,
            gender: user.gender,
            location: {
                street: user.location.street,
                name: user.location.name,
                country: user.location.name
            },
            schoolName: user.schoolName,
            IKSZCoordinator: user.IKSZCoordinator,
            coordinatorEmail: user.coordinatorEmail,
            coordinatorPhone: user.coordinatorPhone
        },
        institution: institutionId,
        contactId: contactId,
        startDate: null,
        hours: null,
        endDate: null,
        completed: false
    };

    fetch(apiURL + 'contracts', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(contractData)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`Failed to create contract: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        console.log('Contract created successfully:', data);
        // Itt esetleg lehet valami visszajelzést adni a felhasználónak, hogy a szerződés sikeresen létrejött
    })
    .catch(error => {
        console.error('Error creating contract:', error);
    });
}

// Függvény a jelentkezés törlésére
function deleteApplication(applicationId) {
    fetch(apiURL + 'apply/' + applicationId, {
        method: 'DELETE'
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`Failed to delete application: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        console.log('Application deleted successfully:', data);
        loadApplication();  // Frissítjük az alkalmazott diákok listáját
    })
    .catch(error => {
        console.error('Error deleting application:', error);
    });
}

// Az alkalmazott diákok listájának betöltése az oldal betöltésekor
document.addEventListener('DOMContentLoaded', loadApplication);

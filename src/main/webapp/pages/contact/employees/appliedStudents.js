loadApplication()

function displayAppliedStudents(contracts, currentUserID) {
    const appliedStudentsSection = document.getElementById('appliedStudentsList');
    if (!appliedStudentsSection) {
        console.error('Applied students section not found');
        return;
    }

    appliedStudentsSection.innerHTML = '';  // Lista tartalmának törlése

    const filteredContracts = contracts.filter(contract => contract.contactId === currentUserID);
    
    if (filteredContracts.length === 0) {
        console.error('Contracts not found for current user');
        return;
    }

    filteredContracts.forEach(filteredContract => {
        const studentData = filteredContract.student;
        
        if (!studentData) {
            console.error('Student data not found for contract:', filteredContract.id);
            return;
        }

        const listItem = document.createElement('li');
        
        const name = document.createElement('h4');
        name.textContent = `Név: ${studentData.lastName} ${studentData.firstName}`;
        listItem.appendChild(name);

        const phoneNumber = document.createElement('p');
        phoneNumber.textContent = `Telefonszám: ${studentData.phoneNumber}`;
        listItem.appendChild(phoneNumber);

        const address = document.createElement('p');
        address.textContent = `Lakhely: ${studentData.location ? `${studentData.location.country}, ${studentData.location.street}` : 'N/A'}`;
        listItem.appendChild(address);

        const schoolName = document.createElement('p');
        schoolName.textContent = `Iskola: ${studentData.schoolName}`;
        listItem.appendChild(schoolName);

        const coordinator = document.createElement('p');
        coordinator.textContent = `IKSZ Koordinátor: ${studentData.IKSZCoordinator || 'N/A'}`;
        listItem.appendChild(coordinator);

        const coordinatorEmail = document.createElement('p');
        coordinatorEmail.textContent = `Koordinátor email: ${studentData.coordinatorEmail || 'N/A'}`;
        listItem.appendChild(coordinatorEmail);

        const coordinatorPhone = document.createElement('p');
        coordinatorPhone.textContent = `Koordinátor telefon: ${studentData.coordinatorPhone || 'N/A'}`;
        listItem.appendChild(coordinatorPhone);

        const startDate = document.createElement('p');
        startDate.textContent = `Kezdés dátuma: ${filteredContract.startDate || 'N/A'}`;
        listItem.appendChild(startDate);

        const hours = document.createElement('p');
        hours.textContent = `Óraszám: ${filteredContract.hours || 'N/A'}`;
        listItem.appendChild(hours);

        const endDate = document.createElement('p');
        endDate.textContent = `Befejezés dátuma: ${filteredContract.endDate || 'N/A'}`;
        listItem.appendChild(endDate);

        const completed = document.createElement('p');
        completed.textContent = `Befejezett: ${filteredContract.completed ? 'Igen' : 'Nem'}`;
        listItem.appendChild(completed);

        const editButton = document.createElement('button');
        editButton.textContent = 'Szerkesztés';
        editButton.addEventListener('click', () => openEditForm(filteredContract));
        listItem.appendChild(editButton);

        appliedStudentsSection.appendChild(listItem);
    });
}

function updateAndDisplayContract(contractId, updatedData, currentUserID) {
    updateContract(contractId, updatedData)
    .then(() => {
        loadApplication(currentUserID);  // Újra betöltjük az adatokat a frissített szerződés megjelenítéséhez
    })
    .catch(error => {
        console.error('Error updating and displaying contract:', error);
    });
}

function openEditForm(filteredContract) {
    const editForm = document.createElement('form');
    
    const startDateInput = createFormInput('date', 'startDate', filteredContract.startDate);
    const hoursInput = createFormInput('number', 'hours', filteredContract.hours);
    const endDateInput = createFormInput('date', 'endDate', filteredContract.endDate);
    const completedInput = createFormSelect('completed', ['Igen', 'Nem'], filteredContract.completed ? 'Igen' : 'Nem');

    const saveButton = document.createElement('button');
    saveButton.textContent = 'Mentés';
    saveButton.addEventListener('click', () => {
        const updatedData = {
            startDate: startDateInput.value,
            hours: parseFloat(hoursInput.value),
            endDate: endDateInput.value,
            completed: completedInput.value === 'Igen'
        };
        
        updateAndDisplayContract(filteredContract.id, updatedData);
    });

    editForm.appendChild(startDateInput);
    editForm.appendChild(hoursInput);
    editForm.appendChild(endDateInput);
    editForm.appendChild(completedInput);
    editForm.appendChild(saveButton);

    // Töröld az előző megjelenített elemeket és jelenítsd meg a szerkesztési űrlapot
    const appliedStudentsSection = document.getElementById('appliedStudentsList');
    appliedStudentsSection.innerHTML = '';
    appliedStudentsSection.appendChild(editForm);
}


function createFormInput(type, name, value) {
    const input = document.createElement('input');
    input.type = type;
    input.name = name;
    input.value = type === 'number' ? parseFloat(value) : value || '';
    if (type === 'number') {
        input.min = '0';  // opcionális, ha van minimális érték, amit elfogadsz
        input.step = '1'; // opcionális, lépés, pl. 1 óra
    }
    return input;
}

function createFormSelect(name, options, selectedValue) {
    const select = document.createElement('select');
    select.name = name;

    options.forEach(optionValue => {
        const option = document.createElement('option');
        option.value = option.textContent = optionValue;
        if (optionValue === selectedValue) {
            option.selected = true;
        }
        select.appendChild(option);
    });

    return select;
}
function updateContract(contractId, updatedData) {
    console.log('Updating contract:', contractId, 'with data:', updatedData);
    return fetch(apiURL + `contracts/${contractId}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Update failed');
        }
        return response.json();
    })
    .then(updatedContract => {
        console.log('Updated contract:', updatedContract);
        return updatedContract;  // visszaadja a frissített szerződést
    });
}


function displayStudentData(contracts, institutions) {
    var totalHours = 0;
    var institutionName = 'N/A';
    var startDate = 'N/A';
    var endDate = 'N/A';
    var status = 'N/A';

    contracts.forEach(contract => {
        if (contract.student.id === 1) {
            totalHours += contract.hours;

            const institution = findInstitutionById(institutions, contract.institution);
            if (institution) {
                institutionName = institution.name;
            }

            startDate = contract.startDate;
            endDate = contract.endDate;

            status = contract.completed ? 'teljesített' : 'folyamatban';
        }
    });

    document.getElementById('totalHours').textContent =  totalHours + " / 50";
    document.getElementById('institutionName').textContent = institutionName;
    document.getElementById('startDate').textContent = startDate;
    document.getElementById('endDate').textContent = endDate;

    const statusElement = document.getElementById('status');
    statusElement.textContent = status;
    statusElement.className = status;  // osztály beállítása a státusz alapján
}


function findInstitutionById(institutions, institutionId) {
    return institutions.find(institution => institution.id === institutionId);
}

document.addEventListener('DOMContentLoaded', function() {
    fetchStudentData();
});

function fetchStudentData() {
    Promise.all([
        fetch(apiURL + 'contracts').then(response => response.json()),
        fetch(apiURL + 'institutions').then(response => response.json())
    ])
    .then(([contracts, institutions]) => {
        displayStudentData(contracts, institutions);
    })
    .catch(error => console.error('Error fetching data:', error));
}

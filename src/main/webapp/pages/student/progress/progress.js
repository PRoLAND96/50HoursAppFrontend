function displayStudentData(contracts, institutions, currentUserID) {
    var totalHours = 0;
    var institutionName = 'N/A';
    var startDate = 'N/A';
    var endDate = 'N/A';
    var status = 'N/A';

    contracts.forEach(contract => {
        if (contract.student.id === currentUserID) {
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
    statusElement.className = status;  
}

function findInstitutionById(institutions, institutionId) {
    return institutions.find(institution => institution.id === institutionId);
}

document.addEventListener('DOMContentLoaded', function() {
    fetchStudentData();
});

function fetchStudentData() {
    current_user()
      .then(currentUserID => {
        Promise.all([
            fetch(apiURL + 'contracts').then(response => response.json()),
            fetch(apiURL + 'institutions').then(response => response.json())
        ])
        .then(([contracts, institutions]) => {
            displayStudentData(contracts, institutions, currentUserID);
        })
        .catch(error => console.error('Error fetching data:', error));
      })
      .catch(error => console.error('Error getting current user ID:', error));
}

$(document).ready(function() {
    $('#loginForm').submit(function(event) {
        // Prevent the default form submission behavior
        event.preventDefault();

        // Serialize the form data
        var formData = $(this).serialize();

        // Send an AJAX request to the backend
        $.ajax({
            type: 'POST',
            url: 'http://localhost:8080/perform_login',
            data: formData,
            success: function(response) {
                // Assuming the response contains a 'redirectUrl' field
                if (response === "Success") {
                    // Redirect to the specified URL
                    window.location.href = "http://localhost:9090/50hours/contact_home.html";
                } else {
                    // Handle login failure
                }
            },
            error: function(xhr, status, error) {
                // Handle error
                console.error(xhr.responseText);
                alert("Login failed. Please try again.");
            }
        });
    });
});
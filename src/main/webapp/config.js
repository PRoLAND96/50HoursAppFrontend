const urlBE = "http://localhost:8080/";

const urlMock = "http://localhost:3000/";

const isMock = true;

var apiUrl;
if (isMock) {
    apiUrl = urlMock;
} else{
    apiUrl = urlBE;
}
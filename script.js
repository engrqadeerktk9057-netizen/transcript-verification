// Student information
const student = {
    name: "Abdul Qadeer",
    university: "UET Peshawar",
    department: "Civil Engineering",
    registration: "22JZCIV0571",
    cgpa: "3.20",
    status: "Graduated"
};


// Get elements
const input = document.getElementById("registrationInput");
const verifyButton = document.getElementById("verifyButton");
const downloadButton = document.getElementById("downloadButton");
const message = document.getElementById("message");
const result = document.getElementById("result");
const qrContainer = document.getElementById("qrcode");


// Verify button
verifyButton.addEventListener("click", verifyStudent);


// Also allow ENTER key
input.addEventListener("keypress", function(event) {

    if (event.key === "Enter") {
        verifyStudent();
    }

});


// Verification function
function verifyStudent() {

    const registrationNumber =
        input.value.trim().toUpperCase();


    // Empty input
    if (registrationNumber === "") {

        message.innerHTML =
            "Please enter a registration number.";

        message.style.color = "red";

        result.classList.add("hidden");

        return;
    }


    // Correct registration number
    if (registrationNumber === student.registration) {

        message.innerHTML =
            "✓ Record found successfully.";

        message.style.color = "green";

        result.classList.remove("hidden");

        createQRCode();

        // Update URL
        const newURL =
            window.location.pathname +
            "?reg=" +
            student.registration;

        window.history.replaceState(
            {},
            "",
            newURL
        );

    }

    // Wrong registration number
    else {

        message.innerHTML =
            "✗ No record found.";

        message.style.color = "red";

        result.classList.add("hidden");

        qrContainer.innerHTML = "";
    }
}


// Create QR Code
function createQRCode() {

    qrContainer.innerHTML = "";


    // Website URL
    const verificationURL =
        window.location.origin +
        window.location.pathname +
        "?reg=" +
        student.registration;


    // Check QR library
    if (typeof QRCode === "undefined") {

        qrContainer.innerHTML =
            "<p style='color:red;'>QR library could not load.</p>";

        return;
    }


    // Generate QR
    new QRCode(qrContainer, {

        text: verificationURL,

        width: 200,

        height: 200,

        colorDark: "#000000",

        colorLight: "#ffffff",

        correctLevel: QRCode.CorrectLevel.H

    });

}


// Download QR
downloadButton.addEventListener("click", function() {

    const canvas =
        qrContainer.querySelector("canvas");

    const image =
        qrContainer.querySelector("img");


    if (canvas) {

        const link =
            document.createElement("a");

        link.download =
            "Abdul_Qadeer_Transcript_QR.png";

        link.href =
            canvas.toDataURL("image/png");

        link.click();

    }

    else if (image) {

        const link =
            document.createElement("a");

        link.download =
            "Abdul_Qadeer_Transcript_QR.png";

        link.href = image.src;

        link.click();

    }

    else {

        alert(
            "Please verify the registration number first."
        );

    }

});


// Automatically verify from QR URL
window.addEventListener("DOMContentLoaded", function() {

    const params =
        new URLSearchParams(window.location.search);

    const registration =
        params.get("reg");


    if (registration) {

        input.value = registration;

        verifyStudent();

    }

});
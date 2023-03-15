const startBtn = document.querySelector("#start-btn");
const stopBtn = document.querySelector("#stop-btn");
const copyBtn = document.querySelector("#copy-btn");
const resultDiv = document.querySelector("#result");
const errorDiv = document.querySelector("#error");
const recognition = new webkitSpeechRecognition();

recognition.continuous = true;
recognition.interimResults = true;
recognition.lang = "tr-TR";

startBtn.addEventListener("click", () => {
    recognition.start();
    startBtn.disabled = true;
    stopBtn.disabled = false;
});

stopBtn.addEventListener("click", () => {
    recognition.stop();
    startBtn.disabled = false;
    stopBtn.disabled = true;
});
// Display the converted text from speech 
recognition.addEventListener("result", (event) => {
    const transcript = Array.from(event.results)
        .map((result) => result[0])
        .map((result) => result.transcript)
        .join("");

    resultDiv.innerHTML = transcript;
});

//If microphone permission is denied, it gives error message
recognition.addEventListener("error", (event) => {
    errorDiv.innerHTML = `Error: ${event.error}`;
});

copyBtn.textContent = "Kopyala";
copyBtn.setAttribute("id", "copy-btn");

// Append copy button to DOM
resultDiv.parentNode.insertBefore(copyBtn, resultDiv.nextSibling);

// Add click event listener to copy button
copyBtn.addEventListener("click", () => {
    // Create a temporary textarea to copy text from
    const tempTextArea = document.createElement("textarea");
    tempTextArea.value = resultDiv.textContent;
    document.body.appendChild(tempTextArea);

    // Select and copy the text from the temporary textarea
    tempTextArea.select();
    document.execCommand("copy");

    // Remove the temporary textarea
    document.body.removeChild(tempTextArea);

    // Display a message to the user that the text has been copied
    copyBtn.textContent = "Kopyalandı!";
    setTimeout(() => {
        copyBtn.textContent = "Kopyala";
    }, 2000);
});
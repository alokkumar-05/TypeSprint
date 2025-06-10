const sampleTexts = [
    "The quick brown fox jumps over the lazy dog.",
    "Typing speed is an essential skill in the modern world.",
    "JavaScript makes websites interactive and dynamic."
];

let selectedText = "";
let startTime, timer;
let errors = 0;

function startTest() {
    selectedText = sampleTexts[Math.floor(Math.random() * sampleTexts.length)];
    document.getElementById("text-display").innerHTML = selectedText;
    document.getElementById("text-input").value = "";
    document.getElementById("time").innerText = "0";
    document.getElementById("wpm").innerText = "0";
    document.getElementById("errors").innerText = "0";
    errors = 0;
    clearInterval(timer);
    startTime = null;
}

document.getElementById("text-input").addEventListener("input", function () {
    if (!startTime) {
        startTime = new Date().getTime();
        timer = setInterval(updateTime, 1000);
    }

    const typedText = this.value;
    let errorCount = 0;

    for (let i = 0; i < typedText.length; i++) {
        if (typedText[i] !== selectedText[i]) {
            errorCount++;
        }
    }

    document.getElementById("errors").innerText = errorCount;
    errors = errorCount;

    if (typedText === selectedText) {
        clearInterval(timer);
        saveRecord();
    }
});

function updateTime() {
    const currentTime = new Date().getTime();
    const elapsedTime = Math.floor((currentTime - startTime) / 1000);
    document.getElementById("time").innerText = elapsedTime;

    const wordsTyped = document.getElementById("text-input").value.split(" ").length;
    const wpm = Math.floor((wordsTyped / elapsedTime) * 60);
    document.getElementById("wpm").innerText = wpm > 0 ? wpm : 0;
}

function saveRecord() {
    const record = {
        time: document.getElementById("time").innerText,
        wpm: document.getElementById("wpm").innerText,
        errors: document.getElementById("errors").innerText
    };

    let records = JSON.parse(localStorage.getItem("typingRecords")) || [];
    records.unshift(record);
    if (records.length > 5) records.pop();
    localStorage.setItem("typingRecords", JSON.stringify(records));

    displayRecords();
}

function displayRecords() {
    let records = JSON.parse(localStorage.getItem("typingRecords")) || [];
    let recordsContainer = document.getElementById("records");
    recordsContainer.innerHTML = "<h3>Previous Records</h3>";
    records.forEach((record, index) => {
        recordsContainer.innerHTML += `<p><strong>Attempt ${index + 1}:</strong> WPM: ${record.wpm}, Time: ${record.time}s, Errors: ${record.errors}</p>`;
    });
}

function restartTest() {
    startTest();
}

window.onload = function () {
    startTest();
    displayRecords();
};

const sampleTexts = [
    "Typing is a skill that improves with consistent practice. The more you type, the more comfortable you become with the keyboard. This reduces errors and boosts your speed over time. Even ten minutes a day can make a noticeable difference. Focusing on accuracy first helps build better habits. Once you're confident with accuracy, speed will naturally follow. Tracking your progress can also motivate you and help you see how far you’ve come.",
    
    "Many people underestimate the power of good typing. It’s not just about being fast—it’s about being efficient. Whether you’re coding, writing content, or chatting online, strong typing skills make everything smoother. Practicing full paragraphs helps develop flow and rhythm. Don’t rush through it; let your fingers get used to the layout. A little bit of daily effort goes a long way. Over time, you’ll notice your fingers moving with confidence and ease.",
    
    "A strong typist balances both speed and accuracy. Making fewer mistakes means less time correcting and more time moving forward. Try typing slowly at first, focusing on getting each word right. As your confidence builds, your speed will naturally increase. It’s not a race—it’s about building muscle memory. Using typing tools or games makes the learning process more fun. Stick with it, and your progress will surprise you sooner than you expect.",
    
    "The modern world relies heavily on digital communication. From sending emails to taking notes, typing is part of everyday life. Practicing with real sentences trains your brain and fingers to work together. It’s okay to make mistakes—what matters is how you respond to them. Take a breath, reset, and keep going. Don’t be discouraged by slow beginnings; even the fastest typists started at zero. Stay patient and consistent, and the results will come.",
    
    "Learning to type is like learning a musical instrument. At first, you’re slow and clumsy. But with repetition, you build rhythm and flow. Start by sitting properly and using the correct finger positions. Don’t develop shortcuts that may hurt your speed later. Proper form helps you avoid fatigue and errors. Keep your eyes on the screen, not the keyboard. That habit alone can significantly boost your typing speed over time.",
    
    "Typing isn’t just a mechanical skill—it boosts your productivity and confidence. Think about how much time you can save every day by typing faster. That adds up over weeks and months. Use tests that provide feedback, so you can spot patterns in your mistakes. Maybe you struggle with punctuation or certain keys—work on them intentionally. Gradual improvements are more sustainable than trying to make big jumps all at once. Stay focused and keep practicing.",
    
    "Discipline is the real secret behind typing mastery. Set a daily routine, even if it’s only five minutes. Use timers or challenges to stay engaged. Instead of typing random letters, use actual sentences so your brain learns spelling and sentence structure along with speed. Mix up the practice content to avoid boredom. The more varied your practice, the better your results. Treat every typing session as a step forward, and soon you’ll hit your speed goals."
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
